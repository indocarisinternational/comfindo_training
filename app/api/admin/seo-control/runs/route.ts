import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

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

    return NextResponse.json({ data: runs })
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
