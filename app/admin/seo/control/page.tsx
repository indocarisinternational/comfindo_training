import { createClient } from "@/lib/supabase/server"
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader"
import { AdminStatCard } from "@/components/admin/ui/AdminStatCard"
import { AdminErrorState } from "@/components/admin/ui/AdminErrorState"
import { CheckSquare, FileEdit, FileText, Link2, PieChart, ShieldAlert, Activity } from "lucide-react"
import { ControlCenterClient } from "./ControlCenterClient"

async function getCount(supabase: Awaited<ReturnType<typeof createClient>>, table: string, filter?: { col: string, val: string }): Promise<number> {
  try {
    let query = supabase.from(table).select("*", { count: "exact", head: true })
    if (filter) {
      query = query.eq(filter.col, filter.val)
    }
    const { count, error } = await query
    if (error) {
      return -1
    }
    return count || 0
  } catch {
    return -1
  }
}

export default async function SeoControlCenterPage() {
  const supabase = await createClient()

  const [
    pendingTopicsCount,
    draftArticlesCount,
    openTasksCount,
    pendingLinksCount,
    auditsCount,
    reportsCount,
    runningWorkflowsCount,
  ] = await Promise.all([
    getCount(supabase, "seo_topics", { col: "status", val: "pending" }),
    getCount(supabase, "seo_article_drafts", { col: "status", val: "draft" }),
    getCount(supabase, "seo_tasks", { col: "status", val: "open" }),
    getCount(supabase, "seo_internal_link_suggestions", { col: "status", val: "pending" }),
    getCount(supabase, "seo_audits"),
    getCount(supabase, "seo_daily_reports"),
    getCount(supabase, "seo_workflow_runs", { col: "status", val: "running" }), // or queued
  ])

  // Count queued as well for a broader "active" metric if we want, but we will just stick to one for now or query them together.
  const activeWorkflowsCount = runningWorkflowsCount === -1 ? 0 : runningWorkflowsCount

  const tablesMissing = [pendingTopicsCount, draftArticlesCount, openTasksCount, pendingLinksCount, auditsCount, reportsCount].some((count) => count === -1)

  const statItems = [
    { title: "Pending Topics", value: pendingTopicsCount === -1 ? 0 : pendingTopicsCount, icon: FileText, description: "awaiting production" },
    { title: "Draft Articles", value: draftArticlesCount === -1 ? 0 : draftArticlesCount, icon: FileEdit, description: "ready for review" },
    { title: "Open SEO Tasks", value: openTasksCount === -1 ? 0 : openTasksCount, icon: CheckSquare, description: "active workload" },
    { title: "Latest Audits", value: auditsCount === -1 ? 0 : auditsCount, icon: ShieldAlert, description: "audit records" },
    { title: "Pending Links", value: pendingLinksCount === -1 ? 0 : pendingLinksCount, icon: Link2, description: "suggestions queued" },
    { title: "Active Workflows", value: activeWorkflowsCount, icon: Activity, description: "currently running" },
  ]

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="SEO Control Center"
        description="Pusat kontrol Comfindo SEO Growth Engine untuk menjalankan workflow, memantau hasil audit, draft artikel, task SEO, internal link, GSC report, dan GitHub issues."
      />

      {tablesMissing ? (
        <AdminErrorState
          title="SEO database tables unavailable"
          description="Jalankan supabase-seo-growth-engine.sql dan supabase-seo-control-center.sql terlebih dahulu."
        />
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {statItems.map((item) => (
          <AdminStatCard key={item.title} {...item} />
        ))}
      </div>

      <ControlCenterClient />
    </div>
  )
}
