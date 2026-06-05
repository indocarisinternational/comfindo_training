import { createClient } from "@/lib/supabase/server"
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader"
import { AdminStatCard } from "@/components/admin/ui/AdminStatCard"
import { AdminErrorState } from "@/components/admin/ui/AdminErrorState"
import { AdminCard, AdminCardContent } from "@/components/admin/ui/AdminCard"
import { AlertCircle, CheckSquare, FileEdit, FileText, Link2, PieChart, ShieldAlert } from "lucide-react"

async function getCount(supabase: Awaited<ReturnType<typeof createClient>>, table: string, filter?: { col: string, val: string }): Promise<number> {
  try {
    let query = supabase.from(table).select("*", { count: "exact", head: true })
    if (filter) {
      query = query.eq(filter.col, filter.val)
    }
    const { count, error } = await query
    if (error) {
      console.error(`Error fetching count for ${table}:`, error)
      return -1
    }
    return count || 0
  } catch {
    return -1
  }
}

export default async function SeoEngineDashboardPage() {
  const supabase = await createClient()

  const [
    pendingTopicsCount,
    draftArticlesCount,
    openTasksCount,
    pendingLinksCount,
    auditsCount,
    reportsCount,
  ] = await Promise.all([
    getCount(supabase, "seo_topics", { col: "status", val: "pending" }),
    getCount(supabase, "seo_article_drafts", { col: "status", val: "draft" }),
    getCount(supabase, "seo_tasks", { col: "status", val: "open" }),
    getCount(supabase, "seo_internal_link_suggestions", { col: "status", val: "pending" }),
    getCount(supabase, "seo_audits"),
    getCount(supabase, "seo_daily_reports"),
  ])

  const tablesMissing = [pendingTopicsCount, draftArticlesCount, openTasksCount, pendingLinksCount, auditsCount, reportsCount].some((count) => count === -1)
  const statItems = [
    { title: "Pending Topics", value: pendingTopicsCount === -1 ? 0 : pendingTopicsCount, icon: FileText, description: "awaiting production" },
    { title: "Draft Articles", value: draftArticlesCount === -1 ? 0 : draftArticlesCount, icon: FileEdit, description: "ready for review" },
    { title: "Open SEO Tasks", value: openTasksCount === -1 ? 0 : openTasksCount, icon: CheckSquare, description: "active workload" },
    { title: "Pending Links", value: pendingLinksCount === -1 ? 0 : pendingLinksCount, icon: Link2, description: "suggestions queued" },
    { title: "Latest Audits", value: auditsCount === -1 ? 0 : auditsCount, icon: ShieldAlert, description: "audit records" },
    { title: "Daily Reports", value: reportsCount === -1 ? 0 : reportsCount, icon: PieChart, description: "report snapshots" },
  ]

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="SEO Engine"
        description="Kelola topik, draft artikel, audit SEO, task teknis, internal link, dan laporan harian."
      />

      {tablesMissing ? (
        <AdminErrorState
          title="SEO database tables unavailable"
          description="Jalankan supabase-seo-growth-engine.sql terlebih dahulu, lalu refresh halaman ini."
        />
      ) : null}

      <AdminCard className="bg-tint-lavender border-none shadow-none">
        <AdminCardContent className="grid gap-4 p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[1px] text-[#391c57]">Growth engine</p>
            <h2 className="mt-2 text-[28px] font-semibold leading-[1.2] text-[#37352f]">Content operations in one workspace</h2>
            <p className="mt-2 text-[15px] leading-[1.55] text-[#5d5b54]">Review generated assets, prioritize technical tasks, and keep internal recommendations moving.</p>
          </div>
          <div className="hidden h-20 w-20 place-items-center rounded-[12px] bg-white/60 text-[#391c57] md:grid">
            <AlertCircle className="h-8 w-8" />
          </div>
        </AdminCardContent>
      </AdminCard>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {statItems.map((item) => (
          <AdminStatCard key={item.title} {...item} />
        ))}
      </div>
    </div>
  )
}
