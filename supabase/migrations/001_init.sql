-- =====================================================
-- Comfindo Management CMS — Supabase Schema
-- Reference file — tables already created in Supabase
-- =====================================================

-- Homepage content (single-row, all homepage sections)
CREATE TABLE IF NOT EXISTS homepage_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_title text,
  hero_subtitle text,
  hero_cta_text text,
  hero_cta_link text,
  hero_image_url text,
  features jsonb DEFAULT '[]'::jsonb,
  updated_at timestamptz DEFAULT now()
);

-- Training programs
CREATE TABLE IF NOT EXISTS training_programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE,
  description text,
  seo_title text,
  seo_description text,
  category text,
  date text,
  time text,
  duration text,
  method text,
  price text,
  syllabus jsonb DEFAULT '[]'::jsonb,
  facilities jsonb DEFAULT '[]'::jsonb,
  image_url text,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Services
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE,
  seo_title text,
  seo_description text,
  content text,
  icon text,
  image_url text,
  benefits jsonb DEFAULT '[]'::jsonb,
  process jsonb DEFAULT '[]'::jsonb,
  faq jsonb DEFAULT '[]'::jsonb,
  order_index int DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- About page
CREATE TABLE IF NOT EXISTS about_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text,
  vision text,
  mission jsonb DEFAULT '[]'::jsonb,
  history text,
  stats jsonb DEFAULT '[]'::jsonb,
  legalitas jsonb DEFAULT '[]'::jsonb,
  team_members jsonb DEFAULT '[]'::jsonb,
  updated_at timestamptz DEFAULT now()
);

-- Contact info
CREATE TABLE IF NOT EXISTS contact_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  address text,
  phone text,
  phone2 text,
  email text,
  office_hours text,
  maps_embed_url text,
  social_links jsonb DEFAULT '[]'::jsonb,
  updated_at timestamptz DEFAULT now()
);

-- Blog posts (Medium-style)
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text,
  cover_image_url text,
  author_name text DEFAULT 'Tim comfindo',
  author_avatar_url text,
  read_time_minutes int DEFAULT 5,
  category text,
  tags text[] DEFAULT '{}',
  seo_title text,
  seo_description text,
  is_published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Admin profiles (linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS admin_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  created_at timestamptz DEFAULT now()
);

-- =====================================================
-- RLS Policies
-- =====================================================

-- Homepage content
ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read homepage" ON homepage_content FOR SELECT USING (true);
CREATE POLICY "Auth write homepage" ON homepage_content FOR ALL USING (auth.role() = 'authenticated');

-- Training programs
ALTER TABLE training_programs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published trainings" ON training_programs FOR SELECT USING (is_published = true);
CREATE POLICY "Auth full access trainings" ON training_programs FOR ALL USING (auth.role() = 'authenticated');

-- Services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published services" ON services FOR SELECT USING (is_published = true);
CREATE POLICY "Auth full access services" ON services FOR ALL USING (auth.role() = 'authenticated');

-- About content
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read about" ON about_content FOR SELECT USING (true);
CREATE POLICY "Auth write about" ON about_content FOR ALL USING (auth.role() = 'authenticated');

-- Contact info
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read contact" ON contact_info FOR SELECT USING (true);
CREATE POLICY "Auth write contact" ON contact_info FOR ALL USING (auth.role() = 'authenticated');

-- Blog posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published posts" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Auth full access posts" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');

-- Admin profiles
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own profile" ON admin_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON admin_profiles FOR UPDATE USING (auth.uid() = id);
