-- ==============================================================================
-- Supabase Storage: Image Upload Bucket Setup
-- Jalankan script ini di Supabase SQL Editor
-- ==============================================================================

-- 1. Buat bucket "images" jika belum ada
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images',
  'images',
  true,           -- Public bucket agar URL bisa diakses tanpa auth
  5242880,        -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

-- 2. Policy: Public dapat melihat/mengunduh semua gambar
DROP POLICY IF EXISTS "Public can view images" ON storage.objects;
CREATE POLICY "Public can view images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'images');

-- 3. Policy: Anon dapat mengupload gambar (admin tidak butuh login)
DROP POLICY IF EXISTS "Anyone can upload images" ON storage.objects;
CREATE POLICY "Anyone can upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'images');

-- 4. Policy: Anon dapat update/replace gambar
DROP POLICY IF EXISTS "Anyone can update images" ON storage.objects;
CREATE POLICY "Anyone can update images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'images');

-- 5. Policy: Anon dapat hapus gambar
DROP POLICY IF EXISTS "Anyone can delete images" ON storage.objects;
CREATE POLICY "Anyone can delete images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'images');
