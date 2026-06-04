-- =====================================================
-- FIX RLS POLICIES FOR SEO TABLES (Admin Dashboard)
-- Run this script in the Supabase SQL Editor
-- =====================================================

-- 1. Enable RLS on all SEO tables (in case it's not enabled)
ALTER TABLE seo_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_article_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_internal_link_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_daily_reports ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing conflicting policies (if any exist)
DROP POLICY IF EXISTS "Auth full access seo_topics" ON seo_topics;
DROP POLICY IF EXISTS "Auth full access seo_article_drafts" ON seo_article_drafts;
DROP POLICY IF EXISTS "Auth full access seo_audits" ON seo_audits;
DROP POLICY IF EXISTS "Auth full access seo_tasks" ON seo_tasks;
DROP POLICY IF EXISTS "Auth full access seo_internal_link_suggestions" ON seo_internal_link_suggestions;
DROP POLICY IF EXISTS "Auth full access seo_daily_reports" ON seo_daily_reports;

-- 3. Create robust policies (ALL access for authenticated admins)

-- seo_topics
CREATE POLICY "Auth full access seo_topics" ON seo_topics 
FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- seo_article_drafts
CREATE POLICY "Auth full access seo_article_drafts" ON seo_article_drafts 
FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- seo_audits
CREATE POLICY "Auth full access seo_audits" ON seo_audits 
FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- seo_tasks
CREATE POLICY "Auth full access seo_tasks" ON seo_tasks 
FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- seo_internal_link_suggestions
CREATE POLICY "Auth full access seo_internal_link_suggestions" ON seo_internal_link_suggestions 
FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- seo_daily_reports
CREATE POLICY "Auth full access seo_daily_reports" ON seo_daily_reports 
FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
