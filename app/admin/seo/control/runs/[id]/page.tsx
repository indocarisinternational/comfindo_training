import { createClient } from "@/lib/supabase/server"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { syncSafeCheckParentRun } from "@/lib/admin/seo-safe-check-runs"
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader"
import { AdminCard, AdminCardContent, AdminCardHeader, AdminCardTitle } from "@/components/admin/ui/AdminCard"
import { AdminButton } from "@/components/admin/AdminButton"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Clock, Activity, AlertCircle, FileJson } from "lucide-react"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

function formatDateTime(dateString: string) {
  return new Intl.DateTimeFormat('en-GB', { 
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
  }).format(new Date(dateString))
}

export default async function WorkflowRunDetailsPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient()

  const { data: run, error } = await supabase
    .from("seo_workflow_runs")
    .select("*")
    .eq("id", params.id)
    .single()

  if (error || !run) {
    return notFound()
  }

  const displayRun = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
    ? await syncSafeCheckParentRun(createSupabaseClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY), run)
    : run

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "text-green-700 bg-green-500/15 dark:text-green-200"
      case "failed": return "text-red-700 bg-red-500/15 dark:text-red-200"
      case "running": return "text-blue-700 bg-blue-500/15 dark:text-blue-200"
      case "cancelled": return "text-yellow-800 bg-yellow-500/20 dark:text-yellow-200"
      default: return "text-slate-700 bg-slate-500/15 dark:text-slate-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <AdminButton variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
          <Link href="/admin/seo/control">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </AdminButton>
        <AdminPageHeader
          title={`Run Details: ${displayRun.workflow_name || displayRun.workflow_key}`}
          description={`ID: ${displayRun.id}`}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AdminCard>
          <AdminCardHeader>
            <AdminCardTitle className="text-sm flex items-center gap-2">
              <Activity className="h-4 w-4 text-[var(--muted-foreground)]" />
              Execution Info
            </AdminCardTitle>
          </AdminCardHeader>
          <AdminCardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
              <span className="text-xs text-[var(--muted-foreground)]">Status</span>
              <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${getStatusColor(displayRun.status)}`}>
                {displayRun.status}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
              <span className="text-xs text-[var(--muted-foreground)]">Trigger Source</span>
              <span className="text-xs">{displayRun.trigger_source}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
              <span className="text-xs text-[var(--muted-foreground)]">Triggered By</span>
              <span className="text-xs">{displayRun.triggered_by || "-"}</span>
            </div>
            {displayRun.summary && (
              <div className="pt-2">
                <span className="text-xs text-[var(--muted-foreground)] block mb-1">Summary</span>
                <p className="text-sm bg-[var(--secondary)] p-3 rounded-md">{displayRun.summary}</p>
              </div>
            )}
          </AdminCardContent>
        </AdminCard>

        <AdminCard>
          <AdminCardHeader>
            <AdminCardTitle className="text-sm flex items-center gap-2">
              <Clock className="h-4 w-4 text-[var(--muted-foreground)]" />
              Timing
            </AdminCardTitle>
          </AdminCardHeader>
          <AdminCardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
              <span className="text-xs text-[var(--muted-foreground)]">Started At</span>
              <span className="text-xs">
                {displayRun.started_at ? formatDateTime(displayRun.started_at) : "Waiting..."}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
              <span className="text-xs text-[var(--muted-foreground)]">Finished At</span>
              <span className="text-xs">
                {displayRun.finished_at ? formatDateTime(displayRun.finished_at) : "-"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
              <span className="text-xs text-[var(--muted-foreground)]">Duration</span>
              <span className="text-xs">
                {displayRun.duration_ms ? `${(displayRun.duration_ms / 1000).toFixed(2)} seconds` : "-"}
              </span>
            </div>
          </AdminCardContent>
        </AdminCard>
      </div>

      {displayRun.error_message && (
        <AdminCard className="border-red-500/20 bg-red-500/5">
          <AdminCardHeader>
            <AdminCardTitle className="text-sm text-red-500 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Error Message
            </AdminCardTitle>
          </AdminCardHeader>
          <AdminCardContent>
            <pre className="text-xs bg-red-500/10 text-red-700 p-4 rounded-md overflow-x-auto whitespace-pre-wrap dark:text-red-200">
              {displayRun.error_message}
            </pre>
          </AdminCardContent>
        </AdminCard>
      )}

      {displayRun.result && (
        <AdminCard>
          <AdminCardHeader>
            <AdminCardTitle className="text-sm flex items-center gap-2">
              <FileJson className="h-4 w-4 text-[var(--muted-foreground)]" />
              Result Output
            </AdminCardTitle>
          </AdminCardHeader>
          <AdminCardContent>
            <pre className="text-xs bg-[var(--secondary)] p-4 rounded-md overflow-x-auto text-[var(--foreground)]">
              {JSON.stringify(displayRun.result, null, 2)}
            </pre>
          </AdminCardContent>
        </AdminCard>
      )}
    </div>
  )
}
