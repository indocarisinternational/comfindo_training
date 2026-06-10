-- ==============================================================================
-- SEO Control Center - Workflow Runs Table
-- ==============================================================================

-- Create table to track workflow runs from the SEO Control Center
CREATE TABLE IF NOT EXISTS public.seo_workflow_runs (
    id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
    workflow_key text NOT NULL,
    workflow_name text,
    trigger_source text,
    status text NOT NULL DEFAULT 'queued',
    started_at timestamp with time zone,
    finished_at timestamp with time zone,
    duration_ms integer,
    summary text,
    result jsonb,
    error_message text,
    triggered_by text,
    n8n_execution_id text,
    github_run_id text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT seo_workflow_runs_pkey PRIMARY KEY (id)
);

-- Enable RLS
ALTER TABLE public.seo_workflow_runs ENABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_seo_workflow_runs_workflow_key ON public.seo_workflow_runs USING btree (workflow_key);
CREATE INDEX IF NOT EXISTS idx_seo_workflow_runs_status ON public.seo_workflow_runs USING btree (status);
CREATE INDEX IF NOT EXISTS idx_seo_workflow_runs_created_at ON public.seo_workflow_runs USING btree (created_at DESC);

-- RLS Policies
-- Service Role has full access
CREATE POLICY "Enable full access for service role on seo_workflow_runs" ON public.seo_workflow_runs FOR ALL USING (true) WITH CHECK (true);

-- Admin users can select (assuming admin role or similar checks, but service role handles API)
-- Comfindo admin usually checks auth at application level, but we can allow authenticated reads if needed.
CREATE POLICY "Enable read access for authenticated users on seo_workflow_runs" ON public.seo_workflow_runs FOR SELECT TO authenticated USING (true);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_seo_workflow_runs_updated_at ON public.seo_workflow_runs;
CREATE TRIGGER set_seo_workflow_runs_updated_at
BEFORE UPDATE ON public.seo_workflow_runs
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();
