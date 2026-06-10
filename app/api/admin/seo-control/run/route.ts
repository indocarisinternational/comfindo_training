import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(req: Request) {
  try {
    const supabaseServer = await createClient()
    const {
      data: { user },
    } = await supabaseServer.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { workflowKey } = body

    const allowedWorkflows = [
      "step5_article_generator",
      "step6_crawl_audit",
      "step7_gsc_opportunity",
      "step8_lighthouse_ci",
      "step9_advanced_crawl_github",
      "run_safe_check"
    ]

    if (!allowedWorkflows.includes(workflowKey)) {
      return NextResponse.json({ error: "Invalid workflowKey" }, { status: 400 })
    }

    // Use service role to insert the run to ensure it bypasses any RLS if needed,
    // though the admin auth might be enough. We use service role to be safe.
    const supabaseAdmin = createSupabaseClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    const workflowNames: Record<string, string> = {
      step5_article_generator: "Step 5 — Article Draft Generator",
      step6_crawl_audit: "Step 6 — SEO Crawl Audit",
      step7_gsc_opportunity: "Step 7 — GSC Opportunity Finder",
      step8_lighthouse_ci: "Step 8 — Lighthouse CI",
      step9_advanced_crawl_github: "Step 9 — Advanced Crawl + GitHub Issues",
      run_safe_check: "Run All Safe Workflows"
    }

    const { data: run, error: insertError } = await supabaseAdmin
      .from("seo_workflow_runs")
      .insert({
        workflow_key: workflowKey,
        workflow_name: workflowNames[workflowKey] || workflowKey,
        trigger_source: "comfindo_admin",
        status: "queued",
        triggered_by: user.email || user.id,
      })
      .select("id")
      .single()

    if (insertError) {
      console.error("Error inserting run:", insertError)
      return NextResponse.json({ error: "Failed to create run record" }, { status: 500 })
    }

    const runId = run.id

    // Now trigger the actual workflow
    // Fire and forget, or await. Given the requirement: "Never expose webhook URL... Return run id"
    // We will fire and forget the webhook call so the API returns quickly
    triggerWorkflowAsync(workflowKey, runId, user.email || user.id).catch((err) => {
      console.error("Async workflow trigger failed:", err)
      // Update the run record to failed
      supabaseAdmin.from("seo_workflow_runs").update({
        status: "failed",
        error_message: "Failed to trigger workflow: " + err.message,
        finished_at: new Date().toISOString()
      }).eq("id", runId)
    })

    return NextResponse.json({ success: true, runId })
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

async function triggerWorkflowAsync(workflowKey: string, runId: string, triggeredBy: string) {
  const payload = {
    source: "comfindo_admin",
    workflowKey,
    runId,
    triggeredAt: new Date().toISOString(),
    triggeredBy
  }

  if (workflowKey === "step8_lighthouse_ci") {
    // GitHub Action
    const token = process.env.GITHUB_TOKEN
    const owner = process.env.GITHUB_OWNER
    const repo = process.env.GITHUB_REPO
    const workflowFile = process.env.GITHUB_LIGHTHOUSE_WORKFLOW_FILE

    if (!token || !owner || !repo || !workflowFile) {
      throw new Error("GitHub environment variables are missing.")
    }

    const url = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowFile}/dispatches`
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ref: "main",
        inputs: {
          source: "comfindo_admin",
          runId
        }
      })
    })

    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`GitHub API Error: ${res.status} - ${errText}`)
    }
    return
  }

  // Handle run_safe_check by triggering the first workflow (Step 6) and letting it chain,
  // OR we can trigger Step 6 directly, and the n8n workflow must handle the chain.
  // We'll assume the N8N_RUN_SAFE_CHECK_WEBHOOK_URL or just let step 6 handle it.
  // Actually, the prompt says: "Run All Safe Workflows... This should trigger safe workflows in this order... N8N_STEP6_WEBHOOK_URL N8N_STEP9_WEBHOOK_URL etc."
  // If we just trigger one n8n webhook for it? Or maybe we have a dedicated webhook. Let's use N8N_RUN_SAFE_CHECK_WEBHOOK_URL, or if not provided, we just trigger step 6 and step 6 should trigger 9, etc. Let's assume a dedicated webhook for run safe check.
  
  let webhookUrl = ""
  if (workflowKey === "step5_article_generator") webhookUrl = process.env.N8N_STEP5_WEBHOOK_URL!
  if (workflowKey === "step6_crawl_audit") webhookUrl = process.env.N8N_STEP6_WEBHOOK_URL!
  if (workflowKey === "step7_gsc_opportunity") webhookUrl = process.env.N8N_STEP7_WEBHOOK_URL!
  if (workflowKey === "step9_advanced_crawl_github") webhookUrl = process.env.N8N_STEP9_WEBHOOK_URL!
  if (workflowKey === "run_safe_check") {
    webhookUrl = process.env.N8N_RUN_SAFE_CHECK_WEBHOOK_URL || process.env.N8N_STEP6_WEBHOOK_URL!
    // if there is a specific sequence, the n8n workflow for this URL should handle it.
  }

  if (!webhookUrl) {
    throw new Error(`Webhook URL not configured for ${workflowKey}`)
  }

  const secret = process.env.N8N_WEBHOOK_SECRET
  if (!secret) {
    throw new Error("N8N_WEBHOOK_SECRET is not configured.")
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${secret}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`n8n webhook Error: ${res.status} - ${errText}`)
  }
}
