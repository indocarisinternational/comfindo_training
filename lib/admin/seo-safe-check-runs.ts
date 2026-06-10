import type { SupabaseClient } from "@supabase/supabase-js"

import { RUN_SAFE_CHECK_KEY, SAFE_CHECK_WORKFLOW_KEYS } from "@/lib/admin/seo-workflows"

const terminalStatuses = new Set(["success", "failed", "cancelled"])

type WorkflowRun = {
  id: string
  workflow_key: string
  status: string
  started_at: string | null
  finished_at: string | null
  created_at: string | null
  result: unknown
}

function getChildRunIds(result: unknown) {
  if (!result || typeof result !== "object" || !("childRunIds" in result)) return []

  const childRunIds = (result as { childRunIds?: unknown }).childRunIds
  if (!Array.isArray(childRunIds)) return []

  return childRunIds.filter((id): id is string => typeof id === "string" && id.length > 0)
}

function getRunStartTimestamp(run: WorkflowRun, children: WorkflowRun[]) {
  const timestamps = [run.started_at, run.created_at, ...children.map((child) => child.started_at || child.created_at)]
    .filter((value): value is string => Boolean(value))
    .map((value) => new Date(value).getTime())
    .filter((value) => Number.isFinite(value))

  return timestamps.length > 0 ? Math.min(...timestamps) : null
}

function getRunEndTimestamp(children: WorkflowRun[]) {
  const timestamps = children
    .map((child) => child.finished_at || child.started_at || child.created_at)
    .filter((value): value is string => Boolean(value))
    .map((value) => new Date(value).getTime())
    .filter((value) => Number.isFinite(value))

  return timestamps.length > 0 ? Math.max(...timestamps) : Date.now()
}

export async function syncSafeCheckParentRun(supabase: SupabaseClient, run: WorkflowRun) {
  if (run.workflow_key !== RUN_SAFE_CHECK_KEY || terminalStatuses.has(run.status)) return run

  const childRunIds = getChildRunIds(run.result)
  if (childRunIds.length < SAFE_CHECK_WORKFLOW_KEYS.length) return run

  const { data: children, error: childrenError } = await supabase
    .from("seo_workflow_runs")
    .select("id, workflow_key, status, started_at, finished_at, created_at, result")
    .in("id", childRunIds)

  if (childrenError || !children || children.length < childRunIds.length) return run

  const childStatuses = children.map((child) => child.status)
  const allChildrenTerminal = childStatuses.every((status) => terminalStatuses.has(status))
  if (!allChildrenTerminal) {
    if (run.status === "queued") {
      await supabase
        .from("seo_workflow_runs")
        .update({
          status: "running",
          summary: "Safe check is waiting for child workflows to finish.",
          updated_at: new Date().toISOString(),
        })
        .eq("id", run.id)

      return { ...run, status: "running" }
    }

    return run
  }

  const nextStatus = childStatuses.includes("failed")
    ? "failed"
    : childStatuses.includes("cancelled")
      ? "cancelled"
      : "success"
  const startTimestamp = getRunStartTimestamp(run, children)
  const endTimestamp = getRunEndTimestamp(children)
  const finishedAt = new Date(endTimestamp).toISOString()
  const durationMs = startTimestamp ? Math.max(0, endTimestamp - startTimestamp) : null
  const failedChildren = children.filter((child) => child.status === "failed")

  const updatePayload = {
    status: nextStatus,
    finished_at: finishedAt,
    duration_ms: durationMs,
    summary:
      nextStatus === "success"
        ? "Safe check completed Step 6, Step 5, and Step 7 successfully."
        : "Safe check finished with one or more child workflow failures.",
    error_message:
      failedChildren.length > 0
        ? `Failed child workflows: ${failedChildren.map((child) => child.workflow_key).join(", ")}`
        : null,
    result: {
      childRunIds,
      childStatuses: children.map((child) => ({
        id: child.id,
        workflowKey: child.workflow_key,
        status: child.status,
      })),
    },
    updated_at: new Date().toISOString(),
  }

  const { data: updatedRun, error: updateError } = await supabase
    .from("seo_workflow_runs")
    .update(updatePayload)
    .eq("id", run.id)
    .select("*")
    .single()

  if (updateError || !updatedRun) return run

  return updatedRun
}

export async function syncSafeCheckParentRuns(supabase: SupabaseClient, runs: WorkflowRun[]) {
  return Promise.all(runs.map((run) => syncSafeCheckParentRun(supabase, run)))
}
