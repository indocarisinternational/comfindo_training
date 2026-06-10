import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import type { SupabaseClient } from "@supabase/supabase-js"
import {
  getWorkflowName,
  getWorkflowWebhookUrl,
  isAllowedWorkflowKey,
  RUN_SAFE_CHECK_KEY,
  SAFE_CHECK_WORKFLOW_KEYS,
  type SeoWorkflowKey,
  type WorkflowKey,
} from "@/lib/admin/seo-workflows"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

type SupabaseAdminClient = SupabaseClient

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

    if (!isAllowedWorkflowKey(workflowKey)) {
      return NextResponse.json({ error: "Invalid workflowKey" }, { status: 400 })
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: "Server Supabase admin env is not configured" }, { status: 500 })
    }

    const supabaseAdmin = createSupabaseClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    const triggeredBy = user.email || user.id

    if (workflowKey === RUN_SAFE_CHECK_KEY) {
      return await runSafeCheck(supabaseAdmin, triggeredBy)
    }

    return await runSingleWorkflow(supabaseAdmin, workflowKey, triggeredBy)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

async function createRun(
  supabaseAdmin: SupabaseAdminClient,
  workflowKey: SeoWorkflowKey,
  triggeredBy: string,
  result: Record<string, unknown> = {}
) {
  return supabaseAdmin
    .from("seo_workflow_runs")
    .insert({
      workflow_key: workflowKey,
      workflow_name: getWorkflowName(workflowKey),
      trigger_source: "admin",
      status: "queued",
      triggered_by: triggeredBy,
      result,
    })
    .select("id")
    .single()
}

async function runSingleWorkflow(
  supabaseAdmin: SupabaseAdminClient,
  workflowKey: WorkflowKey,
  triggeredBy: string
) {
  const { data: run, error: insertError } = await createRun(supabaseAdmin, workflowKey, triggeredBy)

  if (insertError || !run) {
    console.error("Error inserting run:", insertError)
    return NextResponse.json({ error: "Failed to create run record" }, { status: 500 })
  }

  const result = await triggerN8nWorkflow(workflowKey, run.id, workflowKey, triggeredBy)

  if (!result.ok) {
    await markRunFailed(supabaseAdmin, run.id, result.message, result.status)
    return NextResponse.json(
      { ok: false, runId: run.id, workflowKey, error: result.message },
      { status: result.status || 502 }
    )
  }

  return NextResponse.json({
    ok: true,
    runId: run.id,
    workflowKey,
    status: "queued",
    message: "Workflow sent to n8n.",
  })
}

async function runSafeCheck(supabaseAdmin: SupabaseAdminClient, triggeredBy: string) {
  const { data: parentRun, error: parentInsertError } = await createRun(
    supabaseAdmin,
    RUN_SAFE_CHECK_KEY,
    triggeredBy,
    { childRunIds: [] }
  )

  if (parentInsertError || !parentRun) {
    console.error("Error inserting safe check parent run:", parentInsertError)
    return NextResponse.json({ error: "Failed to create run record" }, { status: 500 })
  }

  const childRunIds: string[] = []

  for (const childWorkflowKey of SAFE_CHECK_WORKFLOW_KEYS) {
    const { data: childRun, error: childInsertError } = await createRun(
      supabaseAdmin,
      childWorkflowKey,
      triggeredBy,
      { parentRunId: parentRun.id, parentWorkflowKey: RUN_SAFE_CHECK_KEY }
    )

    if (childInsertError || !childRun) {
      const message = `Failed to create child run for ${childWorkflowKey}`
      await markRunFailed(supabaseAdmin, parentRun.id, message)
      return NextResponse.json({ ok: false, runId: parentRun.id, error: message }, { status: 500 })
    }

    childRunIds.push(childRun.id)

    const result = await triggerN8nWorkflow(childWorkflowKey, childRun.id, childWorkflowKey, triggeredBy)

    if (!result.ok) {
      await markRunFailed(supabaseAdmin, childRun.id, result.message, result.status)
      await markRunFailed(supabaseAdmin, parentRun.id, result.message, result.status, { childRunIds })
      return NextResponse.json(
        { ok: false, runId: parentRun.id, workflowKey: RUN_SAFE_CHECK_KEY, error: result.message },
        { status: result.status || 502 }
      )
    }
  }

  await supabaseAdmin
    .from("seo_workflow_runs")
    .update({
      status: "running",
      started_at: new Date().toISOString(),
      result: { childRunIds },
      summary: "Safe check triggered Step 6, Step 5, and Step 7. Waiting for child workflows to finish.",
      updated_at: new Date().toISOString(),
    })
    .eq("id", parentRun.id)

  return NextResponse.json({
    ok: true,
    runId: parentRun.id,
    workflowKey: RUN_SAFE_CHECK_KEY,
    status: "running",
    message: "Workflow sent to n8n.",
    childRunIds,
  })
}

async function triggerN8nWorkflow(
  targetWorkflowKey: WorkflowKey,
  runId: string,
  requestedWorkflowKey: SeoWorkflowKey,
  triggeredBy: string
) {
  const payload = {
    source: "comfindo_admin",
    workflowKey: requestedWorkflowKey,
    runId,
    triggeredAt: new Date().toISOString(),
    triggeredBy,
  }

  const webhookUrl = getWorkflowWebhookUrl(targetWorkflowKey)
  if (!webhookUrl) {
    return { ok: false, status: 500, message: `Webhook URL not configured for ${targetWorkflowKey}` }
  }

  const secret = process.env.N8N_WEBHOOK_SECRET
  if (!secret) {
    return { ok: false, status: 500, message: "N8N_WEBHOOK_SECRET is not configured." }
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
    return { ok: false, status: res.status, message: `n8n webhook Error: ${res.status} - ${errText}` }
  }

  return { ok: true, status: res.status, message: "Workflow sent to n8n." }
}

async function markRunFailed(
  supabaseAdmin: SupabaseAdminClient,
  runId: string,
  message: string,
  statusCode = 500,
  extraResult: Record<string, unknown> = {}
) {
  await supabaseAdmin
    .from("seo_workflow_runs")
    .update({
      status: "failed",
      finished_at: new Date().toISOString(),
      error_message: message,
      result: {
        ...extraResult,
        webhook_error: true,
        status: statusCode,
      },
      updated_at: new Date().toISOString(),
    })
    .eq("id", runId)
}
