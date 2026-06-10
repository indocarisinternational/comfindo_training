"use client"

import { useState, useEffect, useCallback } from "react"
import { AdminCard, AdminCardContent, AdminCardHeader, AdminCardTitle } from "@/components/admin/ui/AdminCard"
import { AdminButton } from "@/components/admin/AdminButton"
import {
  AdminTableWrapper,
  AdminTable,
  AdminTableHeader,
  AdminTableHead,
  AdminTableBody,
  AdminTableRow,
  AdminTableCell
} from "@/components/admin/ui/AdminTable"
import { toast } from "sonner"
import { Play, Loader2, CheckCircle2, XCircle, Clock, RefreshCw, ExternalLink } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function formatDateTime(dateString?: string | null) {
  if (!dateString) return "-"
  return new Intl.DateTimeFormat('en-GB', { 
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  }).format(new Date(dateString))
}

function formatDuration(durationMs?: number | null) {
  if (!durationMs) return "-"
  return `${(durationMs / 1000).toFixed(1)}s`
}

interface WorkflowRun {
  id: string
  workflow_key: string
  workflow_name: string
  trigger_source: string
  status: string
  started_at: string | null
  finished_at: string | null
  duration_ms: number | null
  summary: string | null
  error_message: string | null
  created_at: string
}

const terminalStatuses = new Set(["success", "failed", "cancelled"])

export function ControlCenterClient() {
  const [runs, setRuns] = useState<WorkflowRun[]>([])
  const [loading, setLoading] = useState(true)
  const [runningKey, setRunningKey] = useState<string | null>(null)
  const [pendingWorkflowKey, setPendingWorkflowKey] = useState<string | null>(null)

  const fetchRuns = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/seo-control/runs?limit=15")
      if (res.ok) {
        const json = await res.json()
        setRuns(json.data || [])
      }
    } catch (err) {
      console.error("Failed to fetch runs:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchRun = useCallback(async (runId: string) => {
    const res = await fetch(`/api/admin/seo-control/runs/${runId}`)
    if (!res.ok) return null
    const json = await res.json()
    return json.data as WorkflowRun
  }, [])

  useEffect(() => {
    const initialFetch = window.setTimeout(fetchRuns, 0)
    const interval = setInterval(fetchRuns, 10000)
    return () => {
      window.clearTimeout(initialFetch)
      clearInterval(interval)
    }
  }, [fetchRuns])

  const pollRunUntilDone = useCallback((runId: string) => {
    const startedAt = Date.now()
    const interval = window.setInterval(async () => {
      const run = await fetchRun(runId)
      await fetchRuns()

      if (run && terminalStatuses.has(run.status)) {
        window.clearInterval(interval)
        return
      }

      if (Date.now() - startedAt >= 5 * 60 * 1000) {
        window.clearInterval(interval)
        toast.info("Workflow masih berjalan. Cek kembali beberapa saat lagi.")
      }
    }, 5000)
  }, [fetchRun, fetchRuns])

  const handleRunWorkflow = async () => {
    const workflowKey = pendingWorkflowKey
    if (!workflowKey) return

    setPendingWorkflowKey(null)
    setRunningKey(workflowKey)
    try {
      const res = await fetch("/api/admin/seo-control/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workflowKey }),
      })

      if (res.ok) {
        const json = await res.json()
        toast.success("Workflow berhasil dikirim ke n8n.")
        await fetchRuns()
        if (json.runId) pollRunUntilDone(json.runId)
      } else {
        const json = await res.json()
        toast.error(`Error: ${json.error || "Failed to trigger workflow"}`)
      }
    } catch (err) {
      console.error(err)
      toast.error("An unexpected error occurred.")
    } finally {
      setRunningKey(null)
    }
  }

  const workflows = [
    {
      key: "step5_article_generator",
      name: "Step 5 — Article Draft Generator",
      description: "Generate satu draft artikel SEO dari topic pending.",
      buttonLabel: "Run Step 5",
      relatedLinks: [
        { label: "Topics", href: "/admin/seo/topics" },
        { label: "Drafts", href: "/admin/seo/article-drafts" }
      ]
    },
    {
      key: "step6_crawl_audit",
      name: "Step 6 — SEO Crawl Audit",
      description: "Audit halaman penting dan generate seo_audits / seo_tasks.",
      buttonLabel: "Run Step 6",
      relatedLinks: [
        { label: "Audits", href: "/admin/seo/audits" },
        { label: "Tasks", href: "/admin/seo/tasks" },
        { label: "Links", href: "/admin/seo/internal-links" }
      ]
    },
    {
      key: "step7_gsc_opportunity",
      name: "Step 7 — GSC Opportunity Finder",
      description: "Ambil data Google Search Console dan generate opportunity.",
      buttonLabel: "Run Step 7",
      relatedLinks: [
        { label: "Reports", href: "/admin/seo/reports" },
        { label: "Tasks", href: "/admin/seo/tasks" },
        { label: "Topics", href: "/admin/seo/topics" },
      ]
    },
    {
      key: "step9_advanced_crawl_github",
      name: "Step 9 — Advanced Crawl + GitHub Issues",
      description: "Advanced crawl, generate SEO tasks, internal links, dan GitHub Issues.",
      buttonLabel: "Run Step 9",
      relatedLinks: [
        { label: "Audits", href: "/admin/seo/audits" },
        { label: "Tasks", href: "/admin/seo/tasks" },
        { label: "Links", href: "/admin/seo/internal-links" }
      ]
    },
    {
      key: "run_safe_check",
      name: "Run SEO Engine Safe Check",
      description: "Menjalankan Step 6, Step 5, dan Step 7 secara berurutan. Step 9 tidak disertakan untuk menghindari GitHub issue spam.",
      buttonLabel: "Run Safe Check",
      relatedLinks: [
        { label: "Audits", href: "/admin/seo/audits" },
        { label: "Drafts", href: "/admin/seo/article-drafts" },
        { label: "Reports", href: "/admin/seo/reports" }
      ]
    }
  ]

  const getStatusClass = (status: string) => {
    if (status === "running") return "bg-blue-500/15 text-blue-700 dark:text-blue-200"
    if (status === "success") return "bg-green-500/15 text-green-700 dark:text-green-200"
    if (status === "failed") return "bg-red-500/15 text-red-700 dark:text-red-200"
    if (status === "cancelled") return "bg-yellow-500/20 text-yellow-800 dark:text-yellow-200"
    return "bg-slate-500/15 text-slate-700 dark:text-slate-200"
  }

  const getRelatedLinks = (workflowKey: string) => {
    return workflows.find((workflow) => workflow.key === workflowKey)?.relatedLinks || []
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-foreground">Workflow Controls</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workflows.map((wf) => (
            <AdminCard key={wf.key} className="flex flex-col">
              <AdminCardHeader>
                <AdminCardTitle className="text-sm">{wf.name}</AdminCardTitle>
              </AdminCardHeader>
              <AdminCardContent className="flex flex-col flex-grow gap-4">
                <p className="text-xs text-muted-foreground flex-grow">{wf.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {wf.relatedLinks.map(link => (
                    <Link key={link.href} href={link.href} className="rounded bg-blue-500/10 px-2 py-1 text-[10px] font-medium text-blue-700 hover:underline dark:text-blue-200">
                      {link.label}
                    </Link>
                  ))}
                </div>
                <AdminButton 
                  onClick={() => setPendingWorkflowKey(wf.key)}
                  disabled={runningKey === wf.key}
                  className="w-full text-xs h-8"
                >
                  {runningKey === wf.key ? (
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                  ) : (
                    <Play className="mr-2 h-3 w-3" />
                  )}
                  {wf.buttonLabel}
                </AdminButton>
              </AdminCardContent>
            </AdminCard>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-foreground">Latest Workflow Runs</h2>
          <AdminButton variant="outline" size="sm" onClick={fetchRuns} className="h-8 text-xs">
            <RefreshCw className="mr-2 h-3 w-3" />
            Refresh
          </AdminButton>
        </div>
        <AdminTableWrapper>
          <AdminTable>
            <AdminTableHeader>
              <AdminTableRow>
                <AdminTableHead>Workflow</AdminTableHead>
                <AdminTableHead>Status</AdminTableHead>
                <AdminTableHead>Trigger Source</AdminTableHead>
                <AdminTableHead>Started At</AdminTableHead>
                <AdminTableHead>Finished At</AdminTableHead>
                <AdminTableHead>Duration</AdminTableHead>
                <AdminTableHead>Summary</AdminTableHead>
                <AdminTableHead>Error</AdminTableHead>
                <AdminTableHead>Created At</AdminTableHead>
                <AdminTableHead className="text-right">Actions</AdminTableHead>
              </AdminTableRow>
            </AdminTableHeader>
            <AdminTableBody>
              {loading ? (
                <AdminTableRow>
                  <AdminTableCell colSpan={10} className="text-center py-8 text-sm text-muted-foreground">
                    Loading runs...
                  </AdminTableCell>
                </AdminTableRow>
              ) : runs.length === 0 ? (
                <AdminTableRow>
                  <AdminTableCell colSpan={10} className="text-center py-8 text-sm text-muted-foreground">
                    No workflow runs found.
                  </AdminTableCell>
                </AdminTableRow>
              ) : (
                runs.map((run) => (
                  <AdminTableRow key={run.id}>
                    <AdminTableCell className="font-medium text-xs">
                      {run.workflow_name || run.workflow_key}
                    </AdminTableCell>
                    <AdminTableCell>
                      <div className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium capitalize ${getStatusClass(run.status)}`}>
                        {run.status === "running" || run.status === "queued" ? (
                          <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
                        ) : run.status === "success" ? (
                          <CheckCircle2 className="mr-1.5 h-3 w-3" />
                        ) : run.status === "failed" ? (
                          <XCircle className="mr-1.5 h-3 w-3" />
                        ) : (
                          <Clock className="mr-1.5 h-3 w-3" />
                        )}
                        <span className="text-xs capitalize">{run.status}</span>
                      </div>
                    </AdminTableCell>
                    <AdminTableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {run.trigger_source || "-"}
                    </AdminTableCell>
                    <AdminTableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDateTime(run.started_at)}
                    </AdminTableCell>
                    <AdminTableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDateTime(run.finished_at)}
                    </AdminTableCell>
                    <AdminTableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDuration(run.duration_ms)}
                    </AdminTableCell>
                    <AdminTableCell className="text-xs max-w-[180px] truncate" title={run.summary || ""}>
                      {run.summary || "-"}
                    </AdminTableCell>
                    <AdminTableCell className="text-xs max-w-[180px] truncate text-red-700 dark:text-red-200" title={run.error_message || ""}>
                      {run.error_message || "-"}
                    </AdminTableCell>
                    <AdminTableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDateTime(run.created_at)}
                    </AdminTableCell>
                    <AdminTableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {getRelatedLinks(run.workflow_key)[0] ? (
                          <AdminButton variant="ghost" size="sm" asChild className="h-7 text-[10px] px-2">
                            <Link href={getRelatedLinks(run.workflow_key)[0].href}>
                              <ExternalLink className="mr-1 h-3 w-3" />
                              Related
                            </Link>
                          </AdminButton>
                        ) : null}
                        <AdminButton variant="ghost" size="sm" asChild className="h-7 text-[10px] px-2">
                          <Link href={`/admin/seo/control/runs/${run.id}`}>View Details</Link>
                        </AdminButton>
                      </div>
                    </AdminTableCell>
                  </AdminTableRow>
                ))
              )}
            </AdminTableBody>
          </AdminTable>
        </AdminTableWrapper>
      </div>

      <Dialog open={Boolean(pendingWorkflowKey)} onOpenChange={(open) => !open && setPendingWorkflowKey(null)}>
        <DialogContent className="bg-popover text-popover-foreground">
          <DialogHeader>
            <DialogTitle className="text-popover-foreground">Run workflow?</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Workflow akan dikirim ke n8n production dan dicatat sebagai run baru di SEO Control Center.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <AdminButton variant="outline" onClick={() => setPendingWorkflowKey(null)}>
              Cancel
            </AdminButton>
            <AdminButton onClick={handleRunWorkflow} disabled={!pendingWorkflowKey || runningKey === pendingWorkflowKey}>
              {runningKey === pendingWorkflowKey ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
              Confirm Run
            </AdminButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
