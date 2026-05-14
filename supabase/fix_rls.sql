-- =====================================================
-- FIX RLS POLICIES FOR COMFINDO CMS
-- Run this script in the Supabase SQL Editor
-- =====================================================

-- 1. Enable RLS on all tables (in case it's not enabled)
ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing conflicting policies
DROP POLICY IF EXISTS "Public read homepage" ON homepage_content;
DROP POLICY IF EXISTS "Auth write homepage" ON homepage_content;
DROP POLICY IF EXISTS "Public read published trainings" ON training_programs;
DROP POLICY IF EXISTS "Auth full access trainings" ON training_programs;
DROP POLICY IF EXISTS "Public read published services" ON services;
DROP POLICY IF EXISTS "Auth full access services" ON services;
DROP POLICY IF EXISTS "Public read about" ON about_content;
DROP POLICY IF EXISTS "Auth write about" ON about_content;
DROP POLICY IF EXISTS "Public read contact" ON contact_info;
DROP POLICY IF EXISTS "Auth write contact" ON contact_info;
DROP POLICY IF EXISTS "Public read published posts" ON blog_posts;
DROP POLICY IF EXISTS "Auth full access posts" ON blog_posts;

-- 3. Create robust policies (SELECT for public, ALL for authenticated admins)

-- Homepage
CREATE POLICY "Public read homepage" ON homepage_content 
FOR SELECT USING (true);

CREATE POLICY "Auth write homepage" ON homepage_content 
FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Trainings
CREATE POLICY "Public read published trainings" ON training_programs 
FOR SELECT USING (true); -- Note: Changed to true so we can preview, or use (is_published = true)

CREATE POLICY "Auth full access trainings" ON training_programs 
FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Services
CREATE POLICY "Public read published services" ON services 
FOR SELECT USING (true);

CREATE POLICY "Auth full access services" ON services 
FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- About
CREATE POLICY "Public read about" ON about_content 
FOR SELECT USING (true);

CREATE POLICY "Auth write about" ON about_content 
FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Contact
CREATE POLICY "Public read contact" ON contact_info 
FOR SELECT USING (true);

CREATE POLICY "Auth write contact" ON contact_info 
FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Blog Posts
CREATE POLICY "Public read published posts" ON blog_posts 
FOR SELECT USING (true);

CREATE POLICY "Auth full access posts" ON blog_posts 
FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
