-- =====================================================
-- Comfindo Management — Seed Data
-- Run this in Supabase SQL Editor to populate initial content
-- =====================================================

-- Seed Homepage Content
INSERT INTO homepage_content (hero_title, hero_subtitle, hero_cta_text, hero_cta_link, features) VALUES (
  'Lembaga Pelatihan dan Konsultan Manajemen',
  'Standar Kompetensi Kerja Nasional Indonesia (SKKNI). Kompetensi Bersertifikat BNSP dan Non BNSP. Wujudkan SDM kompeten bersama comfindo Management.',
  'Lihat Katalog',
  '/training',
  '{
    "stats": [
      {"value": "550+", "label": "Alumni"},
      {"value": "50+", "label": "Program"},
      {"value": "4.9★", "label": "Rating"}
    ],
    "hero_features": [
      {"title": "Bersertifikat BNSP", "description": "Pengakuan kompetensi nasional"},
      {"title": "Silabus SKKNI", "description": "Kurikulum berbasis standar nasional"},
      {"title": "Trainer Berpengalaman", "description": "Praktisi profesional di bidangnya"},
      {"title": "Non BNSP", "description": "Sertifikasi kompetensi comfindo"}
    ],
    "why_us": [
      {"title": "Bersertifikat BNSP", "description": "Program sertifikasi diakui secara nasional oleh Badan Nasional Sertifikasi Profesi."},
      {"title": "Silabus Berbasis SKKNI", "description": "Kurikulum disusun mengacu pada Standar Kompetensi Kerja Nasional Indonesia."},
      {"title": "Trainer Profesional", "description": "Para praktisi berpengalaman dan ahli di bidangnya masing-masing."},
      {"title": "Legalitas Resmi", "description": "Lembaga Pelatihan dan Konsultan Manajemen terdaftar secara resmi."},
      {"title": "Jadwal Fleksibel", "description": "Tersedia program online dan offline dengan jadwal yang beragam."},
      {"title": "Harga Terjangkau", "description": "Investasi terbaik untuk peningkatan kompetensi dan karier Anda."}
    ],
    "faq": [
      {"question": "Apa itu comfindo Management?", "answer": "comfindo Management adalah Lembaga Pelatihan dan Konsultan Manajemen yang bertujuan untuk mencerdaskan kehidupan bangsa dan menciptakan alumni yang kompeten dibidangnya."},
      {"question": "Apa perbedaan sertifikasi BNSP dan Non BNSP?", "answer": "Sertifikasi BNSP diakui secara nasional oleh Badan Nasional Sertifikasi Profesi, sementara Non BNSP adalah sertifikasi kompetensi yang dikeluarkan oleh comfindo Management."},
      {"question": "Bagaimana cara mendaftar pelatihan?", "answer": "Anda bisa mendaftar melalui website kami atau menghubungi kami melalui WhatsApp di 0858-7066-3856."},
      {"question": "Apakah pelatihan tersedia online?", "answer": "Ya, sebagian besar program pelatihan kami tersedia secara online melalui platform Zoom."},
      {"question": "Berapa lama proses mendapatkan sertifikat?", "answer": "Sertifikat akan dikirimkan dalam waktu 7-14 hari kerja setelah program pelatihan selesai."},
      {"question": "Apakah ada program In House Training?", "answer": "Ya, kami menyediakan program In House Training untuk perusahaan atau instansi."}
    ],
    "testimonials": [
      {"name": "Rina Amelia, S.Pd", "role": "Guru / Pengajar", "content": "Pelatihan di comfindo Management sangat membantu saya mendapatkan sertifikasi yang diakui secara nasional.", "rating": 5},
      {"name": "Ahmad Fauzi, S.E", "role": "Staff HRD", "content": "Proses sertifikasi BNSP berjalan lancar dengan bimbingan dari tim comfindo. Harganya juga sangat terjangkau.", "rating": 5},
      {"name": "Dewi Lestari, M.M", "role": "Manajer Operasional", "content": "Saya sangat puas dengan program In House Training dari comfindo Management.", "rating": 5}
    ],
    "partners": ["BNSP", "Kemnaker RI", "BKSP", "LSP", "SKKNI", "Kemendikbud", "comfindo", "ISO 9001", "Kemenkes RI", "BAN-PT"],
    "cta": {
      "title": "Siap Meningkatkan Kompetensi Anda?",
      "subtitle": "Bergabunglah dengan ratusan alumni comfindo Management yang telah meningkatkan kompetensi dan karier mereka.",
      "phone": "0858-7066-3856",
      "whatsapp_url": "https://wa.me/62817210875"
    }
  }'::jsonb
) ON CONFLICT DO NOTHING;

-- Seed About Content
INSERT INTO about_content (company_name, vision, mission, stats, legalitas) VALUES (
  'comfindo Management',
  'Menjadi lembaga pelatihan dan konsultan manajemen terpercaya yang mendukung pengembangan kompetensi sumber daya manusia serta pertumbuhan bisnis berkelanjutan bagi perusahaan di Indonesia.',
  '[
    {"title": "Meningkatkan Keterampilan Kerja Karyawan", "description": "Menyelenggarakan public training dan in-house training secara berkala untuk meningkatkan keterampilan kerja karyawan."},
    {"title": "Mendukung Pertumbuhan Bisnis Perusahaan", "description": "Memberikan layanan konsultasi manajemen yang membantu perusahaan mengoptimalkan operasional."},
    {"title": "Menyediakan Program Sertifikasi Kompetensi", "description": "Menyelenggarakan pelatihan dan sertifikasi kompetensi bersertifikat BNSP maupun Non-BNSP."}
  ]'::jsonb,
  '[
    {"value": "500+", "label": "Alumni Bersertifikat"},
    {"value": "50+", "label": "Program Pelatihan"},
    {"value": "10+", "label": "Trainer Ahli"},
    {"value": "4.9★", "label": "Rating Kepuasan"}
  ]'::jsonb,
  '[
    {"label": "Nama Lembaga", "value": "comfindo Management"},
    {"label": "Alamat", "value": "Perkantoran Tanjung Mas Raya Blok B1 No.44, Tanjung Barat, Jakarta Selatan"},
    {"label": "Kontak", "value": "0858-7066-3856 / 0821-1199-5378"},
    {"label": "Email", "value": "comfindo.management@gmail.com"}
  ]'::jsonb
) ON CONFLICT DO NOTHING;

-- Seed Contact Info
INSERT INTO contact_info (address, phone, phone2, email, office_hours, social_links) VALUES (
  'Perkantoran Tanjung Mas Raya Blok B1 No.44 Tanjung Barat Jakarta Selatan',
  '0858-7066-3856',
  '0821-1199-5378',
  'comfindo.management@gmail.com',
  'Senin - Jumat, 08.00 - 17.00 WIB',
  '[
    {"name": "Facebook", "url": "https://www.facebook.com/profile.php?id=100083385664789"},
    {"name": "Instagram", "url": "https://www.instagram.com/comfindo.management/"},
    {"name": "LinkedIn", "url": "http://www.linkedin.com/company/comfindomanagement"},
    {"name": "YouTube", "url": "https://www.youtube.com/channel/UCIHuMFAhGwBsx-Q_1kRdWaQ"}
  ]'::jsonb
) ON CONFLICT DO NOTHING;

-- Seed Services
INSERT INTO services (title, slug, seo_title, seo_description, content, icon, benefits, process, faq, order_index) VALUES
('Sertifikasi BNSP', 'sertifikasi-bnsp', 'Sertifikasi BNSP - comfindo Management', 'Program sertifikasi BNSP dari comfindo Management.', 'Program sertifikasi kompetensi yang diakui secara nasional oleh Badan Nasional Sertifikasi Profesi (BNSP). Sertifikat BNSP adalah bukti pengakuan tertulis yang diberikan oleh lembaga yang berwenang.', 'Award', '["Pengakuan kompetensi secara nasional", "Meningkatkan daya saing di dunia kerja", "Diakui oleh perusahaan", "Berlaku di seluruh Indonesia"]'::jsonb, '["Konsultasi program", "Registrasi peserta", "Pelaksanaan pelatihan", "Uji kompetensi", "Penerbitan sertifikat"]'::jsonb, '[{"q": "Apa itu sertifikasi BNSP?", "a": "Sertifikasi BNSP adalah sertifikasi kompetensi yang diakui secara nasional oleh Badan Nasional Sertifikasi Profesi."}]'::jsonb, 0),
('Sertifikasi comfindo', 'sertifikasi-comfindo', 'Sertifikasi comfindo - comfindo Management', 'Program sertifikasi kompetensi comfindo Management.', 'Program sertifikasi kompetensi yang dikeluarkan oleh comfindo Management sebagai bukti telah mengikuti pelatihan dan dinyatakan kompeten.', 'Shield', '["Sertifikat resmi comfindo Management", "Proses sertifikasi cepat", "Harga terjangkau", "Materi pelatihan lengkap"]'::jsonb, '["Pilih program pelatihan", "Registrasi online", "Ikuti pelatihan", "Evaluasi kompetensi", "Terima sertifikat"]'::jsonb, '[{"q": "Apa bedanya dengan BNSP?", "a": "Sertifikasi comfindo adalah sertifikasi internal yang dikeluarkan oleh comfindo Management."}]'::jsonb, 1),
('In House Training', 'in-house-training', 'In House Training - comfindo Management', 'Layanan In House Training dari comfindo Management.', 'Program pelatihan yang dirancang khusus untuk perusahaan atau instansi. Materi dan jadwal disesuaikan dengan kebutuhan spesifik organisasi Anda.', 'Building2', '["Materi disesuaikan kebutuhan", "Jadwal fleksibel", "Hemat biaya untuk grup besar", "Trainer datang ke lokasi"]'::jsonb, '["Diskusi kebutuhan pelatihan", "Penyusunan proposal", "Persetujuan program", "Pelaksanaan training", "Evaluasi dan sertifikasi"]'::jsonb, '[{"q": "Berapa minimum peserta?", "a": "Minimum 10 peserta untuk program In House Training."}]'::jsonb, 2),
('Cek Sertifikat', 'cek-sertifikat', 'Cek Sertifikat - comfindo Management', 'Verifikasi sertifikat pelatihan comfindo Management.', 'Layanan verifikasi keaslian sertifikat pelatihan yang diterbitkan oleh comfindo Management. Pastikan sertifikat Anda valid dan terdaftar.', 'Search', '["Verifikasi online 24/7", "Proses cepat dan mudah", "Gratis tanpa biaya", "Menjamin keaslian sertifikat"]'::jsonb, '["Masukkan nomor sertifikat", "Sistem memverifikasi data", "Hasil ditampilkan langsung"]'::jsonb, '[{"q": "Bagaimana cara cek sertifikat?", "a": "Masukkan nomor sertifikat di halaman Cek Sertifikat kami."}]'::jsonb, 3)
ON CONFLICT DO NOTHING;

-- Seed Training Programs (sample)
INSERT INTO training_programs (title, slug, description, seo_title, seo_description, category, date, time, duration, method, price, syllabus, facilities) VALUES
('Pelatihan dan Sertifikasi Manajemen Risiko Berbasis ISO 31000:2018', 'pelatihan-manajemen-risiko-iso-31000', 'Pelatihan manajemen risiko berbasis ISO 31000:2018 untuk memahami prinsip, kerangka kerja, dan proses manajemen risiko.', 'Pelatihan Manajemen Risiko ISO 31000 - comfindo', 'Pelatihan dan sertifikasi manajemen risiko berbasis ISO 31000:2018', 'Sertifikasi BNSP', 'Setiap Bulan', '09.00 - 16.00 WIB', '2 Hari', 'Online (Zoom) / Offline', 'Rp 4.500.000', '["Pengantar Manajemen Risiko", "Prinsip ISO 31000:2018", "Kerangka Kerja Manajemen Risiko", "Proses Manajemen Risiko", "Identifikasi Risiko", "Analisis dan Evaluasi Risiko", "Perlakuan Risiko", "Studi Kasus dan Simulasi"]'::jsonb, '["Sertifikat BNSP", "Modul Pelatihan", "Lunch & Coffee Break", "Akses Grup Alumni"]'::jsonb),
('Pelatihan dan Sertifikasi Internal Audit ISO 19011:2018', 'pelatihan-internal-audit-iso-19011', 'Pelatihan internal audit berdasarkan ISO 19011:2018 untuk memahami prinsip dan teknik audit.', 'Pelatihan Internal Audit ISO 19011 - comfindo', 'Pelatihan dan sertifikasi internal audit berdasarkan ISO 19011:2018', 'Sertifikasi BNSP', 'Setiap Bulan', '09.00 - 16.00 WIB', '2 Hari', 'Online (Zoom) / Offline', 'Rp 4.500.000', '["Pengantar Audit Internal", "Prinsip Audit ISO 19011:2018", "Perencanaan Audit", "Pelaksanaan Audit", "Teknik Wawancara dan Sampling", "Penulisan Laporan Audit", "Tindak Lanjut Audit", "Simulasi Audit"]'::jsonb, '["Sertifikat BNSP", "Modul Pelatihan", "Lunch & Coffee Break", "Akses Grup Alumni"]'::jsonb)
ON CONFLICT DO NOTHING;
