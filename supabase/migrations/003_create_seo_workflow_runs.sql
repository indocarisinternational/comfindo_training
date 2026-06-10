create table if not exists seo_workflow_runs (
  id uuid primary key default gen_random_uuid(),
  workflow_key text not null,
  workflow_name text not null,
  trigger_source text not null default 'admin',
  status text not null default 'queued',
  started_at timestamptz,
  finished_at timestamptz,
  duration_ms int,
  summary text,
  result jsonb default '{}'::jsonb,
  error_message text,
  triggered_by text,
  n8n_execution_id text,
  github_run_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists seo_workflow_runs_workflow_key_idx
  on seo_workflow_runs (workflow_key);

create index if not exists seo_workflow_runs_status_idx
  on seo_workflow_runs (status);

create index if not exists seo_workflow_runs_created_at_idx
  on seo_workflow_runs (created_at desc);
