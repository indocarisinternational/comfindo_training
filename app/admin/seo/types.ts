export type SeoTopic = {
  id: string
  title: string
  focus_keyword: string
  intent: string
  target_url: string
  priority: string
  status: 'pending' | 'generated' | 'archived'
  created_at: string
}

export type SeoArticleDraft = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  focus_keyword: string
  seo_title: string | null
  seo_description: string | null
  target_url: string
  content_preview: string | null
  faq_json: any | null
  internal_links_json: any | null
  quality_score: number | null
  rejection_reason: string | null
  status: 'draft' | 'approved' | 'rejected' | 'published'
  created_at: string
}

export type SeoTask = {
  id: string
  title: string
  task_type: 'technical' | 'content' | 'internal_link' | 'schema' | 'pagespeed' | 'conversion' | 'backlink'
  priority: string
  page_url: string
  status: 'open' | 'in_progress' | 'done' | 'ignored'
  created_at: string
}

export type SeoInternalLinkSuggestion = {
  id: string
  source_url: string
  target_url: string
  anchor_text: string
  reason: string | null
  status: 'pending' | 'approved' | 'rejected' | 'implemented'
  created_at: string
}

export type SeoAudit = {
  id: string
  page_url: string
  audit_type: string
  title_found: string | null
  meta_description_found: string | null
  h1_found: string | null
  issues_json: any | null
  recommendations_json: any | null
  score: number | null
  created_at: string
}

export type SeoDailyReport = {
  id: string
  report_date: string
  summary: string | null
  articles_generated: number
  audits_created: number
  tasks_created: number
  recommendations: string | null
  raw_report_json: any | null
  created_at: string
}
