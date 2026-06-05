-- Create the seo_lighthouse_reports table
CREATE TABLE IF NOT EXISTS public.seo_lighthouse_reports (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  page_url text NOT NULL,
  device text DEFAULT 'desktop',
  performance_score numeric,
  accessibility_score numeric,
  best_practices_score numeric,
  seo_score numeric,
  lcp numeric,
  cls numeric,
  tbt numeric,
  fcp numeric,
  speed_index numeric,
  report_json jsonb,
  created_at timestamptz DEFAULT now()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_seo_lighthouse_reports_page_url ON public.seo_lighthouse_reports(page_url);
CREATE INDEX IF NOT EXISTS idx_seo_lighthouse_reports_created_at ON public.seo_lighthouse_reports(created_at);

-- Enable RLS and restrict access to not expose publicly
ALTER TABLE public.seo_lighthouse_reports ENABLE ROW LEVEL SECURITY;

-- Note: No public access policies are created. 
-- Service role key (used by the GitHub Action) will bypass RLS.
