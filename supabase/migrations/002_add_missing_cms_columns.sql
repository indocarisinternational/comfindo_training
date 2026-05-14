-- ============================================
-- COMFINDO CMS SCHEMA MIGRATION
-- Fix: Add missing columns to CMS tables
-- ============================================

-- TABLE: services — Add missing 'benefits' column
ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS benefits JSONB DEFAULT '[]'::jsonb;

-- TABLE: about_content — Add missing 'legalitas' column
ALTER TABLE public.about_content 
ADD COLUMN IF NOT EXISTS legalitas JSONB DEFAULT '[]'::jsonb;

-- TABLE: contact_info — Add missing 'office_hours' column
ALTER TABLE public.contact_info 
ADD COLUMN IF NOT EXISTS office_hours TEXT DEFAULT NULL;

-- TABLE: blog_posts — Add missing 'seo_description' column
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS seo_description TEXT DEFAULT NULL;
