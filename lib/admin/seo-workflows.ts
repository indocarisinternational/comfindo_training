export const WORKFLOWS = {
  step5_article_generator: {
    name: "Step 5 — Article Draft Generator",
    webhookEnv: "N8N_STEP5_WEBHOOK_URL",
  },
  step6_crawl_audit: {
    name: "Step 6 — SEO Crawl Audit",
    webhookEnv: "N8N_STEP6_WEBHOOK_URL",
  },
  step7_gsc_opportunity: {
    name: "Step 7 — GSC Opportunity Finder",
    webhookEnv: "N8N_STEP7_WEBHOOK_URL",
  },
  step9_advanced_crawl_github: {
    name: "Step 9 — Advanced Crawl + GitHub Issues",
    webhookEnv: "N8N_STEP9_WEBHOOK_URL",
  },
} as const

export const RUN_SAFE_CHECK_KEY = "run_safe_check"
export const RUN_SAFE_CHECK_NAME = "SEO Engine Safe Check"

export const SAFE_CHECK_WORKFLOW_KEYS: WorkflowKey[] = [
  "step6_crawl_audit",
  "step5_article_generator",
  "step7_gsc_opportunity",
]

export type WorkflowKey = keyof typeof WORKFLOWS
export type SeoWorkflowKey = WorkflowKey | typeof RUN_SAFE_CHECK_KEY

export const ALLOWED_WORKFLOW_KEYS = [
  ...Object.keys(WORKFLOWS),
  RUN_SAFE_CHECK_KEY,
] as SeoWorkflowKey[]

export function isAllowedWorkflowKey(value: unknown): value is SeoWorkflowKey {
  return typeof value === "string" && ALLOWED_WORKFLOW_KEYS.includes(value as SeoWorkflowKey)
}

export function getWorkflowName(workflowKey: SeoWorkflowKey) {
  if (workflowKey === RUN_SAFE_CHECK_KEY) return RUN_SAFE_CHECK_NAME
  return WORKFLOWS[workflowKey].name
}

export function getWorkflowWebhookUrl(workflowKey: WorkflowKey) {
  const envName = WORKFLOWS[workflowKey].webhookEnv
  return process.env[envName]
}
