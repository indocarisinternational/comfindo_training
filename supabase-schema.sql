-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ==============================================================================
-- 1. site_settings (Replaces/extends contact_info for global settings)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    site_name TEXT DEFAULT 'comfindo',
    site_description TEXT,
    logo_url TEXT,
    favicon_url TEXT,
    whatsapp_number TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    instagram_url TEXT,
    linkedin_url TEXT,
    youtube_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ==============================================================================
-- 2. services
-- ==============================================================================
CREATE TABLE IF NOT EXISTS services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    short_description TEXT,
    content TEXT,
    icon TEXT,
    image_url TEXT,
    benefits JSONB DEFAULT '[]',
    process JSONB DEFAULT '[]',
    faq JSONB DEFAULT '[]',
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure columns exist if table was previously created
ALTER TABLE services ADD COLUMN IF NOT EXISTS short_description TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS content TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS icon TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS benefits JSONB DEFAULT '[]';
ALTER TABLE services ADD COLUMN IF NOT EXISTS process JSONB DEFAULT '[]';
ALTER TABLE services ADD COLUMN IF NOT EXISTS faq JSONB DEFAULT '[]';
ALTER TABLE services ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE services ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT true;
ALTER TABLE services ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;
ALTER TABLE services ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS seo_description TEXT;
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
DROP TRIGGER IF EXISTS update_services_updated_at ON services;
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ==============================================================================
-- 3. blog_posts
-- ==============================================================================
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT,
    cover_image_url TEXT,
    author_name TEXT DEFAULT 'Tim comfindo',
    author_avatar_url TEXT,
    category TEXT,
    tags JSONB DEFAULT '[]',
    status TEXT DEFAULT 'draft',
    is_published BOOLEAN DEFAULT false,
    focus_keyword TEXT,
    seo_title TEXT,
    seo_description TEXT,
    canonical_url TEXT,
    read_time_minutes INTEGER DEFAULT 1,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure columns exist if table was previously created
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS excerpt TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS cover_image_url TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author_name TEXT DEFAULT 'Tim comfindo';
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author_avatar_url TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS tags JSONB DEFAULT '[]';
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft';
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT false;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS focus_keyword TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS canonical_url TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS read_time_minutes INTEGER DEFAULT 1;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON blog_posts(is_published);
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ==============================================================================
-- 4. certificates
-- ==============================================================================
CREATE TABLE IF NOT EXISTS certificates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    issuer TEXT,
    certificate_type TEXT,
    image_url TEXT,
    file_url TEXT,
    is_published BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_certificates_slug ON certificates(slug);
DROP TRIGGER IF EXISTS update_certificates_updated_at ON certificates;
CREATE TRIGGER update_certificates_updated_at BEFORE UPDATE ON certificates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ==============================================================================
-- 5. training_programs (Consolidated schema)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS training_programs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT,
    description TEXT,
    category TEXT,
    level TEXT,
    date TEXT, 
    duration TEXT,
    method TEXT,
    location TEXT,
    price TEXT,
    image_url TEXT,
    target_participants JSONB DEFAULT '[]',
    objectives JSONB DEFAULT '[]',
    materials JSONB DEFAULT '[]',
    benefits JSONB DEFAULT '[]',
    output JSONB DEFAULT '[]',
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    focus_keyword TEXT,
    seo_title TEXT,
    seo_description TEXT,
    canonical_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure columns exist if table was previously created
ALTER TABLE training_programs ADD COLUMN IF NOT EXISTS short_description TEXT;
ALTER TABLE training_programs ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE training_programs ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE training_programs ADD COLUMN IF NOT EXISTS level TEXT;
ALTER TABLE training_programs ADD COLUMN IF NOT EXISTS date TEXT;
ALTER TABLE training_programs ADD COLUMN IF NOT EXISTS duration TEXT;
ALTER TABLE training_programs ADD COLUMN IF NOT EXISTS method TEXT;
ALTER TABLE training_programs ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE training_programs ADD COLUMN IF NOT EXISTS price TEXT;
ALTER TABLE training_programs ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE training_programs ADD COLUMN IF NOT EXISTS target_participants JSONB DEFAULT '[]';
ALTER TABLE training_programs ADD COLUMN IF NOT EXISTS objectives JSONB DEFAULT '[]';
ALTER TABLE training_programs ADD COLUMN IF NOT EXISTS materials JSONB DEFAULT '[]';
ALTER TABLE training_programs ADD COLUMN IF NOT EXISTS benefits JSONB DEFAULT '[]';
ALTER TABLE training_programs ADD COLUMN IF NOT EXISTS output JSONB DEFAULT '[]';
ALTER TABLE training_programs ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE training_programs ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT false;
ALTER TABLE training_programs ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;
ALTER TABLE training_programs ADD COLUMN IF NOT EXISTS focus_keyword TEXT;
ALTER TABLE training_programs ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE training_programs ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE training_programs ADD COLUMN IF NOT EXISTS canonical_url TEXT;
CREATE INDEX IF NOT EXISTS idx_training_programs_slug ON training_programs(slug);
CREATE INDEX IF NOT EXISTS idx_training_programs_is_published ON training_programs(is_published);
DROP TRIGGER IF EXISTS update_training_programs_updated_at ON training_programs;
CREATE TRIGGER update_training_programs_updated_at BEFORE UPDATE ON training_programs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ==============================================================================
-- 6. faqs
-- ==============================================================================
CREATE TABLE IF NOT EXISTS faqs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_key TEXT DEFAULT 'home',
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    is_published BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
DROP TRIGGER IF EXISTS update_faqs_updated_at ON faqs;
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ==============================================================================
-- 7. testimonials
-- ==============================================================================
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    company TEXT,
    content TEXT NOT NULL,
    avatar_url TEXT,
    rating INTEGER DEFAULT 5,
    is_published BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ==============================================================================
-- 8. landing_sections
-- ==============================================================================
CREATE TABLE IF NOT EXISTS landing_sections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    section_key TEXT NOT NULL UNIQUE,
    title TEXT,
    subtitle TEXT,
    content TEXT,
    image_url TEXT,
    cta_label TEXT,
    cta_url TEXT,
    is_published BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_landing_sections_key ON landing_sections(section_key);
DROP TRIGGER IF EXISTS update_landing_sections_updated_at ON landing_sections;
CREATE TRIGGER update_landing_sections_updated_at BEFORE UPDATE ON landing_sections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- Legacy / Forms
-- ==============================================================================
CREATE TABLE IF NOT EXISTS training_registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    training_title TEXT,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS consultation_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    service_name TEXT,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- RLS (Row Level Security) Policies
-- ==============================================================================

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE landing_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (so frontend works without service_role)
DROP POLICY IF EXISTS "Public can insert training_registrations" ON training_registrations;
CREATE POLICY "Public can insert training_registrations" ON training_registrations FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can insert consultation_requests" ON consultation_requests;
CREATE POLICY "Public can insert consultation_requests" ON consultation_requests FOR INSERT WITH CHECK (true);

-- Public Reads
DROP POLICY IF EXISTS "Public can view site settings" ON site_settings;
CREATE POLICY "Public can view site settings" ON site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view published services" ON services;
CREATE POLICY "Public can view published services" ON services FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public can view published blog_posts" ON blog_posts;
CREATE POLICY "Public can view published blog_posts" ON blog_posts FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public can view published certificates" ON certificates;
CREATE POLICY "Public can view published certificates" ON certificates FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public can view published training programs" ON training_programs;
CREATE POLICY "Public can view published training programs" ON training_programs FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public can view published faqs" ON faqs;
CREATE POLICY "Public can view published faqs" ON faqs FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public can view published testimonials" ON testimonials;
CREATE POLICY "Public can view published testimonials" ON testimonials FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public can view published landing_sections" ON landing_sections;
CREATE POLICY "Public can view published landing_sections" ON landing_sections FOR SELECT USING (is_published = true);

-- Admin full access (Anon/Auth depending on implementation, defaulting to true for development)
DROP POLICY IF EXISTS "Admin full access" ON site_settings;
CREATE POLICY "Admin full access" ON site_settings FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access" ON services;
CREATE POLICY "Admin full access" ON services FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access" ON blog_posts;
CREATE POLICY "Admin full access" ON blog_posts FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access" ON certificates;
CREATE POLICY "Admin full access" ON certificates FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access" ON training_programs;
CREATE POLICY "Admin full access" ON training_programs FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access" ON faqs;
CREATE POLICY "Admin full access" ON faqs FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access" ON testimonials;
CREATE POLICY "Admin full access" ON testimonials FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access" ON landing_sections;
CREATE POLICY "Admin full access" ON landing_sections FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access" ON training_registrations;
CREATE POLICY "Admin full access" ON training_registrations FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access" ON consultation_requests;
CREATE POLICY "Admin full access" ON consultation_requests FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- SEED DATA (Target SEO: ISO 9001)
-- ==============================================================================

-- Seed ISO 9001 Training Program
INSERT INTO training_programs (
    title, slug, category, method, price, is_published, is_featured, focus_keyword, seo_title, seo_description,
    target_participants, objectives, materials, benefits, output
) VALUES (
    'Pelatihan ISO 9001',
    'iso-9001',
    'Sistem Manajemen Mutu',
    'Online, Offline, In-House',
    'Rp 2.500.000',
    true,
    true,
    'pelatihan ISO 9001',
    'Pelatihan ISO 9001 Jakarta | Training Sistem Manajemen Mutu',
    'Ikuti pelatihan ISO 9001 bersama comfindo untuk memahami sistem manajemen mutu, audit internal, dokumentasi, dan implementasi ISO 9001 di perusahaan atau organisasi Anda.',
    '["Manajer Mutu", "Internal Auditor", "Tim Implementasi ISO", "Pimpinan Perusahaan"]',
    '["Memahami persyaratan standar ISO 9001:2015", "Mampu menyusun dokumentasi sistem manajemen mutu", "Mampu melakukan audit internal"]',
    '["Pengenalan ISO 9001:2015", "Klausul 1-10", "Pendekatan Proses dan Manajemen Risiko", "Audit Internal"]',
    '["Sertifikat Pelatihan", "Modul Materi Lengkap", "Konsultasi Pasca Pelatihan"]',
    '["Pemahaman komprehensif ISO 9001", "Kesiapan sertifikasi organisasi"]'
) ON CONFLICT (slug) DO UPDATE SET 
    seo_title = EXCLUDED.seo_title,
    seo_description = EXCLUDED.seo_description;

-- Seed FAQs
INSERT INTO faqs (question, answer, sort_order) VALUES
('Apa itu pelatihan ISO 9001?', 'Pelatihan ISO 9001 adalah program yang dirancang untuk memberikan pemahaman menyeluruh tentang standar Sistem Manajemen Mutu (SMM) internasional, dari pengenalan hingga audit internal.', 1),
('Siapa yang cocok mengikuti training ISO 9001?', 'Training ini cocok untuk Manajer Mutu (QMR), Internal Auditor, Tim Implementasi ISO, staf document control, dan pimpinan perusahaan yang ingin mensertifikasi perusahaannya.', 2),
('Apakah pelatihan bisa dilakukan secara in-house?', 'Ya, comfindo menyediakan layanan In-House Training untuk ISO 9001 yang dapat disesuaikan dengan waktu dan lokasi perusahaan Anda.', 3),
('Apakah comfindo membantu pendampingan implementasi ISO 9001?', 'Tentu, selain pelatihan, kami juga menyediakan layanan konsultasi dan pendampingan implementasi ISO 9001 hingga perusahaan Anda siap menghadapi audit sertifikasi.', 4),
('Bagaimana cara konsultasi jadwal dan biaya pelatihan?', 'Anda dapat langsung menghubungi tim kami melalui tombol WhatsApp yang tersedia atau mengisi form konsultasi di website ini.', 5);

-- Seed Blog Posts (Drafts)
INSERT INTO blog_posts (title, slug, focus_keyword, seo_title, status, is_published) VALUES
('ISO 9001 Adalah: Pengertian, Manfaat, dan Penerapannya', 'iso-9001-adalah-pengertian-manfaat-penerapannya', 'ISO 9001 adalah', 'ISO 9001 Adalah: Pengertian & Panduan Lengkap Penerapannya', 'draft', false),
('Training ISO 9001 Awareness: Tujuan, Materi, dan Manfaat', 'training-iso-9001-awareness', 'training ISO 9001 awareness', 'Training ISO 9001 Awareness: Tujuan dan Manfaat untuk Perusahaan', 'draft', false),
('Internal Auditor ISO 9001: Tugas, Kompetensi, dan Alur Pelatihan', 'internal-auditor-iso-9001-tugas-kompetensi', 'internal auditor ISO 9001', 'Tugas & Kompetensi Internal Auditor ISO 9001', 'draft', false),
('Biaya Sertifikasi ISO 9001: Faktor yang Perlu Diperhatikan', 'biaya-sertifikasi-iso-9001', 'biaya sertifikasi ISO 9001', 'Estimasi Biaya Sertifikasi ISO 9001 untuk Perusahaan Anda', 'draft', false)
ON CONFLICT (slug) DO NOTHING;

-- Seed Landing Sections
INSERT INTO landing_sections (section_key, title, subtitle, cta_label, cta_url, metadata) VALUES
('hero', 'Lembaga Pelatihan dan Konsultan Manajemen', 'Standar Kompetensi Kerja Nasional Indonesia (SKKNI). Kompetensi Bersertifikat BNSP dan Non BNSP.', 'Lihat Katalog', '/training', '{"stats": [{"label": "Alumni", "value": "550+"}]}');

-- Seed Site Settings
INSERT INTO site_settings (site_name, whatsapp_number, email, phone, address) VALUES
('comfindo', '62817210875', 'comfindo.management@gmail.com', '0858-7066-3856', 'Perkantoran Tanjung Mas Raya Blok B1 No.44 Tanjung Barat Jakarta Selatan');

