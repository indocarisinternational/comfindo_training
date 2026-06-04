-- ==============================================================================
-- Patch: SEO Publish Flow
-- Ensure seo_article_drafts has necessary columns for the publish workflow
-- ==============================================================================

-- Safely add columns to seo_article_drafts if it exists
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'seo_article_drafts') THEN
        ALTER TABLE seo_article_drafts ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft';
        ALTER TABLE seo_article_drafts ADD COLUMN IF NOT EXISTS rejection_reason TEXT;
        ALTER TABLE seo_article_drafts ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ;
        ALTER TABLE seo_article_drafts ADD COLUMN IF NOT EXISTS published_blog_post_id UUID;
        ALTER TABLE seo_article_drafts ADD COLUMN IF NOT EXISTS content TEXT;
        ALTER TABLE seo_article_drafts ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
    END IF;
END $$;
