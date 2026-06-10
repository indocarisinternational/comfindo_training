import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { syncSafeCheckParentRuns } from "@/lib/admin/seo-safe-check-runs"
import { isAllowedWorkflowKey } from "@/lib/admin/seo-workflows"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function GET(req: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get("limit") || "20", 10)
    const workflowKey = searchParams.get("workflowKey")
    const status = searchParams.get("status")

    if (workflowKey && !isAllowedWorkflowKey(workflowKey)) {
      return NextResponse.json({ error: "Invalid workflowKey" }, { status: 400 })
    }

    let query = supabase
      .from("seo_workflow_runs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit)

    if (workflowKey) {
      query = query.eq("workflow_key", workflowKey)
    }
    if (status) {
      query = query.eq("status", status)
    }

    const { data: runs, error } = await query

    if (error) {
      console.error("Error fetching runs:", error)
      return NextResponse.json({ error: "Failed to fetch runs" }, { status: 500 })
    }

    if (!runs || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ data: runs || [] })
    }

    const supabaseAdmin = createSupabaseClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    const syncedRuns = await syncSafeCheckParentRuns(supabaseAdmin, runs)

    return NextResponse.json({ data: syncedRuns })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
