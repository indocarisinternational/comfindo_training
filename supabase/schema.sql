-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Trainings Table
CREATE TABLE trainings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    mode TEXT NOT NULL CHECK (mode IN ('Online', 'Offline', 'Hybrid')),
    location TEXT, -- Can be null if Online
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    duration TEXT, -- e.g. "2 Days"
    time TEXT, -- e.g. "09:00 - 16:00 WIB"
    price TEXT, -- Stored as text to allow "Call for Price" or formatted currency
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    image_url TEXT,
    syllabus JSONB DEFAULT '[]', -- Array of strings
    facilities JSONB DEFAULT '[]', -- Array of strings
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Training Registrations Table
CREATE TABLE training_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    training_id UUID REFERENCES trainings(id) ON DELETE SET NULL,
    training_title TEXT, -- Snapshot of title in case training is deleted/changed
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Consultation Requests Table
CREATE TABLE consultation_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_name TEXT NOT NULL, -- e.g. "ISO 9001", "ISO 27001", "Other"
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexing for performance
CREATE INDEX idx_trainings_slug ON trainings(slug);
CREATE INDEX idx_registrations_training_id ON training_registrations(training_id);
CREATE INDEX idx_consultations_created_at ON consultation_requests(created_at DESC);

-- Row Level Security (RLS)

-- Enable RLS on all tables
ALTER TABLE trainings ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

-- Policies for 'trainings'
-- Public can READ active trainings (for website display)
CREATE POLICY "Public can view active trainings" 
ON trainings FOR SELECT 
USING (status = 'active');

-- Admins can do ALL on trainings
CREATE POLICY "Admins can manage trainings" 
ON trainings FOR ALL 
USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'email' LIKE '%@msiconsulting.com'); 
-- NOTE: Ideally use a custom claim or roles table. For simplicity, we assume authenticated users are admins or check email domain.
-- Better approach for generic auth:
-- USING (auth.role() = 'authenticated'); -- Assuming only admins have accounts in this Supabase project.

-- Let's stick to: Authenticated users = Admins for this scope.
DROP POLICY IF EXISTS "Admins can manage trainings" ON trainings;
CREATE POLICY "Admins can manage trainings" 
ON trainings FOR ALL 
USING (auth.role() = 'authenticated');


-- Policies for 'training_registrations'
-- Public can INSERT (Submit form)
CREATE POLICY "Public can register training" 
ON training_registrations FOR INSERT 
WITH CHECK (true);

-- Admins can SELECT/UPDATE/DELETE
CREATE POLICY "Admins can view registrations" 
ON training_registrations FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can update registrations" 
ON training_registrations FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete registrations" 
ON training_registrations FOR DELETE 
USING (auth.role() = 'authenticated');


-- Policies for 'consultation_requests'
-- Public can INSERT
CREATE POLICY "Public can request consultation" 
ON consultation_requests FOR INSERT 
WITH CHECK (true);

-- Admins can SELECT/UPDATE/DELETE
CREATE POLICY "Admins can view consultations" 
ON consultation_requests FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can update consultations" 
ON consultation_requests FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete consultations" 
ON consultation_requests FOR DELETE 
USING (auth.role() = 'authenticated');
