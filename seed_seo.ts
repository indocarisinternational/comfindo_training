import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zzzhcaolumbumjtzcvkp.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6emhjYW9sdW1idW1qdHpjdmtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0NjIxMTcsImV4cCI6MjA4NDAzODExN30.dN7-R0dqJ4RTM0VFcH7JUVfZYk3TZqCUometdRAi4lw' // fallback to anon if role key not set

const supabase = createClient(supabaseUrl, supabaseKey)

const iso9001Content = {
  seo_title: 'Pelatihan ISO 9001 Jakarta | Training Sistem Manajemen Mutu',
  seo_description: 'Ikuti pelatihan ISO 9001 bersama comfindo untuk memahami sistem manajemen mutu, audit internal, dokumentasi, dan implementasi ISO 9001 di perusahaan atau organisasi Anda.',
  focus_keyword: 'ISO 9001',
  description: `<h2>Apa Itu ISO 9001?</h2>
<p>ISO 9001 adalah standar internasional yang menetapkan kriteria untuk Sistem Manajemen Mutu (Quality Management System). Standar ini dirancang untuk membantu organisasi memastikan bahwa mereka dapat secara konsisten memenuhi kebutuhan pelanggan dan mematuhi regulasi yang berlaku, sekaligus berupaya terus-menerus meningkatkan kepuasan pelanggan melalui perbaikan proses operasional.</p>

<h2>Mengapa ISO 9001 Penting untuk Perusahaan?</h2>
<p>Di era bisnis yang kompetitif, ISO 9001 bukan hanya sekadar sertifikat, melainkan fondasi untuk membangun kepercayaan klien dan mitra bisnis. Perusahaan yang menerapkan ISO 9001 menunjukkan komitmen yang kuat terhadap kualitas, efisiensi, dan tata kelola manajemen yang baik.</p>

<h2>Manfaat ISO 9001 untuk Organisasi</h2>
<ul>
<li><strong>Meningkatkan Kepuasan Pelanggan</strong>: Dengan alur kerja yang terstandar, produk dan layanan yang dihasilkan memiliki kualitas yang lebih konsisten.</li>
<li><strong>Efisiensi Operasional</strong>: Membantu mengidentifikasi inefisiensi, mengurangi pemborosan, dan menekan biaya operasional.</li>
<li><strong>Peluang Ekspansi</strong>: Banyak tender pemerintah dan BUMN yang mewajibkan vendornya memiliki sertifikasi ISO 9001.</li>
<li><strong>Peningkatan Moral Karyawan</strong>: Sistem kerja yang jelas dan terstruktur membuat karyawan lebih mudah memahami tugas dan tanggung jawab mereka.</li>
</ul>

<h2>Mengapa Memilih comfindo?</h2>
<p>comfindo Management memiliki pengalaman panjang dalam mendampingi berbagai perusahaan dari berbagai sektor industri untuk meraih sertifikasi ISO 9001. Trainer dan konsultan kami adalah praktisi berlisensi yang memberikan pendekatan aplikatif dan mudah diterapkan, bukan sekadar teori.</p>`,
  objectives: [
    "Memahami konsep dasar dan klausul-klausul dalam standar ISO 9001.",
    "Mampu merencanakan dan menyusun dokumen Sistem Manajemen Mutu yang efektif.",
    "Memahami peran dan tanggung jawab dalam implementasi ISO 9001.",
    "Mempersiapkan organisasi untuk menghadapi audit sertifikasi eksternal."
  ],
  materials: [
    "Pengenalan Sistem Manajemen Mutu (SMM)",
    "Interpretasi Klausul ISO 9001",
    "Konteks Organisasi & Manajemen Risiko (Risk-Based Thinking)",
    "Kepemimpinan & Komitmen Manajemen",
    "Perencanaan, Dukungan, dan Operasional",
    "Evaluasi Kinerja & Audit Internal",
    "Tindakan Perbaikan Berkelanjutan (Continual Improvement)"
  ],
  target_participants: [
    "Manajer Kualitas (Quality Manager)",
    "Management Representative (MR)",
    "Internal Auditor",
    "Tim Implementasi ISO",
    "Direktur/Pemilik Usaha"
  ],
  benefits: [
    "Sertifikat Pelatihan",
    "Modul Materi (Hardcopy/Softcopy)",
    "Format Template Dokumen ISO 9001",
    "Grup Konsultasi Alumni",
    "Coffee Break & Lunch (Offline)"
  ],
  output: [
    "Peserta memahami penuh persyaratan standar ISO 9001.",
    "Peserta mampu melakukan gap analysis di perusahaan masing-masing.",
    "Peserta siap menjadi pilar utama dalam proyek sertifikasi perusahaan."
  ]
}

const blogs = [
  {
    title: 'ISO 9001 Adalah: Pengertian, Manfaat, dan Penerapannya',
    slug: 'iso-9001-adalah-pengertian-manfaat-penerapannya',
    excerpt: 'Memahami apa itu ISO 9001, mengapa standar sistem manajemen mutu ini sangat penting bagi perusahaan, dan bagaimana langkah awal penerapannya.',
    content: '<h2>Apa Itu ISO 9001?</h2><p>ISO 9001 adalah standar internasional untuk Sistem Manajemen Mutu...</p><p>Jika perusahaan Anda berencana untuk mengimplementasikan sistem ini, Anda bisa memulainya dengan mengikuti <a href="/training/sertifikasi-iso-9001">Pelatihan ISO 9001</a> bersama kami.</p>',
    author_name: 'Admin comfindo',
    category: 'Manajemen Mutu',
    published_at: new Date().toISOString(),
    is_published: true,
    read_time_minutes: 5,
    seo_title: 'ISO 9001 Adalah: Pengertian, Manfaat, dan Penerapannya | comfindo',
    seo_description: 'Pelajari secara lengkap apa itu ISO 9001, manfaatnya untuk bisnis, dan bagaimana cara menerapkannya di perusahaan Anda.',
    focus_keyword: 'ISO 9001 adalah',
  },
  {
    title: 'Training ISO 9001 Awareness: Tujuan, Materi, dan Manfaat',
    slug: 'training-iso-9001-awareness-tujuan-materi-manfaat',
    excerpt: 'Membangun kesadaran (awareness) karyawan terhadap mutu sangat penting sebelum perusahaan melangkah ke sertifikasi ISO 9001. Simak panduannya.',
    content: '<h2>Pentingnya Awareness ISO 9001</h2><p>Training ISO 9001 Awareness dirancang untuk memberikan pemahaman dasar kepada seluruh karyawan...</p><p>Untuk konsultasi lebih lanjut terkait In-House Training, silakan <a href="/contact">hubungi kami</a>.</p>',
    author_name: 'Tim Konsultan comfindo',
    category: 'Pelatihan',
    published_at: new Date(Date.now() - 86400000).toISOString(),
    is_published: true,
    read_time_minutes: 4,
    seo_title: 'Training ISO 9001 Awareness: Panduan dan Manfaat | comfindo',
    seo_description: 'Apa yang dipelajari dalam Training ISO 9001 Awareness? Temukan tujuan, materi, dan manfaatnya bagi perusahaan di sini.',
    focus_keyword: 'training ISO 9001 awareness',
  },
  {
    title: 'Internal Auditor ISO 9001: Tugas, Kompetensi, dan Alur Pelatihan',
    slug: 'internal-auditor-iso-9001-tugas-kompetensi-pelatihan',
    excerpt: 'Seorang internal auditor memiliki peran krusial dalam menjaga agar Sistem Manajemen Mutu ISO 9001 berjalan efektif. Apa saja tugas mereka?',
    content: '<h2>Tugas Internal Auditor ISO 9001</h2><p>Auditor internal bertugas mengevaluasi kepatuhan proses operasional terhadap standar...</p><p>Ingin menjadi auditor andal? Ikuti <a href="/training/sertifikasi-iso-9001">pelatihan sertifikasi auditor internal ISO 9001</a> di comfindo.</p>',
    author_name: 'Admin comfindo',
    category: 'Sertifikasi Profesi',
    published_at: new Date(Date.now() - 172800000).toISOString(),
    is_published: true,
    read_time_minutes: 6,
    seo_title: 'Tugas dan Kompetensi Internal Auditor ISO 9001 | comfindo',
    seo_description: 'Pelajari tugas pokok, kompetensi yang dibutuhkan, dan alur pelatihan untuk menjadi seorang Internal Auditor ISO 9001 profesional.',
    focus_keyword: 'internal auditor ISO 9001',
  },
  {
    title: 'Biaya Sertifikasi ISO 9001: Faktor yang Perlu Diperhatikan',
    slug: 'biaya-sertifikasi-iso-9001-faktor-yang-diperhatikan',
    excerpt: 'Berapa investasi yang harus disiapkan perusahaan untuk mendapatkan sertifikat ISO 9001? Simak rincian komponen biayanya di artikel ini.',
    content: '<h2>Komponen Biaya Sertifikasi ISO 9001</h2><p>Biaya sertifikasi sangat bervariasi bergantung pada ukuran perusahaan, jumlah karyawan, dan kompleksitas proses bisnis...</p><p>Butuh estimasi biaya pendampingan? Segera <a href="/contact">hubungi tim konsultan comfindo</a> untuk mendapatkan penawaran terbaik.</p>',
    author_name: 'Tim Konsultan comfindo',
    category: 'Konsultasi Bisnis',
    published_at: new Date(Date.now() - 259200000).toISOString(),
    is_published: true,
    read_time_minutes: 5,
    seo_title: 'Berapa Biaya Sertifikasi ISO 9001? Ini Rinciannya | comfindo',
    seo_description: 'Cari tahu estimasi biaya sertifikasi ISO 9001 untuk perusahaan Anda dan faktor-faktor penentu harga dari badan sertifikasi.',
    focus_keyword: 'sertifikasi ISO 9001',
  },
  {
    title: 'Cara Implementasi ISO 9001 di Perusahaan',
    slug: 'cara-implementasi-iso-9001-di-perusahaan',
    excerpt: 'Panduan langkah demi langkah menerapkan Sistem Manajemen Mutu ISO 9001, mulai dari gap analysis hingga proses audit eksternal.',
    content: '<h2>Tahapan Implementasi ISO 9001</h2><p>Penerapan ISO 9001 membutuhkan komitmen dari manajemen puncak dan pemahaman dari seluruh lini...</p><p>Banyak perusahaan menggunakan <a href="/training/sertifikasi-iso-9001">jasa pelatihan ISO 9001</a> dan konsultan untuk mempercepat proses ini.</p>',
    author_name: 'Admin comfindo',
    category: 'Manajemen Mutu',
    published_at: new Date(Date.now() - 345600000).toISOString(),
    is_published: true,
    read_time_minutes: 7,
    seo_title: '7 Langkah Praktis Cara Implementasi ISO 9001 | comfindo',
    seo_description: 'Panduan lengkap cara mengimplementasikan standar ISO 9001 dari nol hingga sukses mendapatkan sertifikasi mutu.',
    focus_keyword: 'konsultan ISO 9001',
  }
]

async function runSeoSeed() {
  console.log("Updating ISO 9001 training program...")
  const { data: updateData, error: updateError } = await supabase
    .from('training_programs')
    .update(iso9001Content)
    .eq('slug', 'sertifikasi-iso-9001')
  
  if (updateError) {
    console.error("Failed to update training program:", updateError)
  } else {
    console.log("Successfully updated ISO 9001 training program.")
  }

  console.log("Inserting Blog Posts...")
  for (const post of blogs) {
    const { error: insertError } = await supabase
      .from('blog_posts')
      .upsert({ ...post, updated_at: new Date().toISOString() }, { onConflict: 'slug' })
    
    if (insertError) {
      console.error(`Failed to insert post ${post.slug}:`, insertError)
    } else {
      console.log(`Inserted post: ${post.slug}`)
    }
  }

  console.log("Seeding complete.")
}

runSeoSeed()
