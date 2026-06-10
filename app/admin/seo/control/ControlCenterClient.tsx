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
import { Play, Loader2, CheckCircle2, XCircle, Clock } from "lucide-react"
import Link from "next/link"

function formatDateTime(dateString: string) {
  return new Intl.DateTimeFormat('en-GB', { 
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  }).format(new Date(dateString))
}

interface WorkflowRun {
  id: string
  workflow_key: string
  workflow_name: string
  trigger_source: string
  status: string
  started_at: string
  finished_at: string | null
  duration_ms: number | null
  summary: string | null
  created_at: string
}

export function ControlCenterClient() {
  const [runs, setRuns] = useState<WorkflowRun[]>([])
  const [loading, setLoading] = useState(true)
  const [runningKey, setRunningKey] = useState<string | null>(null)

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

  useEffect(() => {
    fetchRuns()
    // Poll every 10 seconds to update status
    const interval = setInterval(fetchRuns, 10000)
    return () => clearInterval(interval)
  }, [fetchRuns])

  const handleRunWorkflow = async (workflowKey: string) => {
    if (!confirm("Are you sure you want to run this workflow?")) return

    setRunningKey(workflowKey)
    try {
      const res = await fetch("/api/admin/seo-control/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workflowKey }),
      })

      if (res.ok) {
        toast.success("Workflow berhasil dikirim ke queue.")
        await fetchRuns()
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
      description: "Generate satu draft artikel SEO dari seo_topics pending ke seo_article_drafts.",
      relatedLinks: [
        { label: "Topics", href: "/admin/seo/topics" },
        { label: "Drafts", href: "/admin/seo/article-drafts" }
      ]
    },
    {
      key: "step6_crawl_audit",
      name: "Step 6 — SEO Crawl Audit",
      description: "Crawl halaman penting dan generate seo_audits, seo_tasks, internal link suggestions.",
      relatedLinks: [
        { label: "Audits", href: "/admin/seo/audits" },
        { label: "Tasks", href: "/admin/seo/tasks" },
        { label: "Links", href: "/admin/seo/internal-links" }
      ]
    },
    {
      key: "step7_gsc_opportunity",
      name: "Step 7 — GSC Opportunity Finder",
      description: "Ambil data Google Search Console dan generate topic/task berdasarkan keyword opportunity.",
      relatedLinks: [
        { label: "Topics", href: "/admin/seo/topics" },
        { label: "Tasks", href: "/admin/seo/tasks" },
        { label: "Reports", href: "/admin/seo/reports" }
      ]
    },
    {
      key: "step8_lighthouse_ci",
      name: "Step 8 — Lighthouse CI",
      description: "Audit performance dan SEO score via GitHub Actions / Lighthouse CI.",
      relatedLinks: [
        { label: "Tasks", href: "/admin/seo/tasks" },
        { label: "Reports", href: "/admin/seo/reports" }
      ]
    },
    {
      key: "step9_advanced_crawl_github",
      name: "Step 9 — Advanced Crawl + GitHub Issues",
      description: "Advanced crawl menggunakan Firecrawl/LibreCrawl, generate task, dan buat GitHub Issues.",
      relatedLinks: [
        { label: "Audits", href: "/admin/seo/audits" },
        { label: "Tasks", href: "/admin/seo/tasks" },
        { label: "Links", href: "/admin/seo/internal-links" }
      ]
    }
  ]

  const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
      case "queued":
      case "running":
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-[var(--foreground)]">Workflow Controls</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workflows.map((wf) => (
            <AdminCard key={wf.key} className="flex flex-col">
              <AdminCardHeader>
                <AdminCardTitle className="text-sm">{wf.name}</AdminCardTitle>
              </AdminCardHeader>
              <AdminCardContent className="flex flex-col flex-grow gap-4">
                <p className="text-xs text-[var(--muted-foreground)] flex-grow">{wf.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {wf.relatedLinks.map(link => (
                    <Link key={link.href} href={link.href} className="text-[10px] text-blue-500 hover:underline bg-blue-500/10 px-2 py-1 rounded">
                      {link.label}
                    </Link>
                  ))}
                </div>
                <AdminButton 
                  onClick={() => handleRunWorkflow(wf.key)} 
                  disabled={runningKey === wf.key || wf.key === "step8_lighthouse_ci"}
                  className="w-full text-xs h-8"
                >
                  {runningKey === wf.key ? (
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                  ) : (
                    <Play className="mr-2 h-3 w-3" />
                  )}
                  {wf.key === "step8_lighthouse_ci" ? "Run from GitHub Actions" : "Run Workflow"}
                </AdminButton>
              </AdminCardContent>
            </AdminCard>
          ))}
          
          <AdminCard className="flex flex-col bg-[var(--primary)] text-[var(--primary-foreground)] border-none">
            <AdminCardHeader>
              <AdminCardTitle className="text-sm text-[var(--primary-foreground)]">Run All Safe Workflows</AdminCardTitle>
            </AdminCardHeader>
            <AdminCardContent className="flex flex-col flex-grow gap-4">
              <p className="text-xs opacity-90 flex-grow">
                Trigger sequence: Step 6 &rarr; Step 9 &rarr; Step 5 &rarr; Step 7.
              </p>
              <AdminButton 
                variant="outline"
                onClick={() => handleRunWorkflow("run_safe_check")} 
                disabled={runningKey === "run_safe_check"}
                className="w-full text-xs h-8 bg-transparent border-white/20 hover:bg-white/10 text-white"
              >
                {runningKey === "run_safe_check" ? (
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                ) : (
                  <Play className="mr-2 h-3 w-3" />
                )}
                Run SEO Engine Check
              </AdminButton>
            </AdminCardContent>
          </AdminCard>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-[var(--foreground)]">Latest Workflow Runs</h2>
        <AdminTableWrapper>
          <AdminTable>
            <AdminTableHeader>
              <AdminTableRow>
                <AdminTableHead>Workflow</AdminTableHead>
                <AdminTableHead>Status</AdminTableHead>
                <AdminTableHead>Started</AdminTableHead>
                <AdminTableHead>Duration</AdminTableHead>
                <AdminTableHead>Summary</AdminTableHead>
                <AdminTableHead className="text-right">Actions</AdminTableHead>
              </AdminTableRow>
            </AdminTableHeader>
            <AdminTableBody>
              {loading ? (
                <AdminTableRow>
                  <AdminTableCell colSpan={6} className="text-center py-8 text-sm text-[var(--muted-foreground)]">
                    Loading runs...
                  </AdminTableCell>
                </AdminTableRow>
              ) : runs.length === 0 ? (
                <AdminTableRow>
                  <AdminTableCell colSpan={6} className="text-center py-8 text-sm text-[var(--muted-foreground)]">
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
                      <div className="flex items-center gap-2">
                        <StatusIcon status={run.status} />
                        <span className="text-xs capitalize">{run.status}</span>
                      </div>
                    </AdminTableCell>
                    <AdminTableCell className="text-xs text-[var(--muted-foreground)] whitespace-nowrap">
                      {run.started_at ? formatDateTime(run.started_at) : "Waiting..."}
                    </AdminTableCell>
                    <AdminTableCell className="text-xs text-[var(--muted-foreground)] whitespace-nowrap">
                      {run.duration_ms ? `${(run.duration_ms / 1000).toFixed(1)}s` : "-"}
                    </AdminTableCell>
                    <AdminTableCell className="text-xs max-w-[200px] truncate" title={run.summary || ""}>
                      {run.summary || "-"}
                    </AdminTableCell>
                    <AdminTableCell className="text-right">
                      <AdminButton variant="ghost" size="sm" asChild className="h-7 text-[10px] px-2">
                        <Link href={`/admin/seo/control/runs/${run.id}`}>View Details</Link>
                      </AdminButton>
                    </AdminTableCell>
                  </AdminTableRow>
                ))
              )}
            </AdminTableBody>
          </AdminTable>
        </AdminTableWrapper>
      </div>
    </div>
  )
}
