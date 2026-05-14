-- FIX 1: Add missing 'benefits' column to services table
ALTER TABLE services
ADD COLUMN IF NOT EXISTS benefits jsonb DEFAULT '[]'::jsonb;

-- FIX 2: Add missing 'legalitas' column to about_content table
ALTER TABLE about_content
ADD COLUMN IF NOT EXISTS legalitas text DEFAULT '';

-- FIX 3: Add missing 'office_hours' column to contact_info table
ALTER TABLE contact_info
ADD COLUMN IF NOT EXISTS office_hours jsonb DEFAULT '{}'::jsonb;
