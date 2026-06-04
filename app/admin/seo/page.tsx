import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, FileText, FileEdit, CheckSquare, Link2, ShieldAlert, PieChart } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

async function getCount(supabase: any, table: string, filter?: { col: string, val: string }): Promise<number> {
  try {
    let query = supabase.from(table).select('*', { count: 'exact', head: true })
    if (filter) {
      query = query.eq(filter.col, filter.val)
    }
    const { count, error } = await query
    if (error) {
      console.error(`Error fetching count for ${table}:`, error)
      return -1 // indicate error
    }
    return count || 0
  } catch (err) {
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
    reportsCount
  ] = await Promise.all([
    getCount(supabase, 'seo_topics', { col: 'status', val: 'pending' }),
    getCount(supabase, 'seo_article_drafts', { col: 'status', val: 'draft' }),
    getCount(supabase, 'seo_tasks', { col: 'status', val: 'open' }),
    getCount(supabase, 'seo_internal_link_suggestions', { col: 'status', val: 'pending' }),
    getCount(supabase, 'seo_audits'),
    getCount(supabase, 'seo_daily_reports')
  ])

  // If any query returns -1, it means the tables might not exist yet.
  const tablesMissing = [pendingTopicsCount, draftArticlesCount, openTasksCount, pendingLinksCount, auditsCount, reportsCount].some(c => c === -1)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">SEO Engine</h1>
        <p className="text-[var(--muted-foreground)]">
          Kelola hasil kerja Comfindo SEO Growth Engine: topik, draft artikel AI, audit SEO, task teknis, internal link, dan laporan harian.
        </p>
      </div>

      {tablesMissing && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Peringatan Database</AlertTitle>
          <AlertDescription>
            SEO Engine database tables belum tersedia atau terjadi error. Jalankan supabase-seo-growth-engine.sql terlebih dahulu.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Topics</CardTitle>
            <FileText className="h-4 w-4 text-[var(--muted-foreground)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTopicsCount === -1 ? 0 : pendingTopicsCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft Articles</CardTitle>
            <FileEdit className="h-4 w-4 text-[var(--muted-foreground)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftArticlesCount === -1 ? 0 : draftArticlesCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open SEO Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-[var(--muted-foreground)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openTasksCount === -1 ? 0 : openTasksCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Internal Links</CardTitle>
            <Link2 className="h-4 w-4 text-[var(--muted-foreground)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingLinksCount === -1 ? 0 : pendingLinksCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Audits</CardTitle>
            <ShieldAlert className="h-4 w-4 text-[var(--muted-foreground)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditsCount === -1 ? 0 : auditsCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Reports</CardTitle>
            <PieChart className="h-4 w-4 text-[var(--muted-foreground)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportsCount === -1 ? 0 : reportsCount}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
