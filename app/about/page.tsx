import { PageHeader } from "@/components/common/PageHeader"
import { CTASection } from "@/components/sections/CTA"
import { createClient } from "@/lib/supabase/server"
import { CheckCircle, Target, Users, GraduationCap, Star, Shield, Building2 } from "lucide-react"
import type { Metadata } from "next"

export const revalidate = 300

export const metadata: Metadata = {
  title: "Profil Perusahaan - comfindo Management",
  description: "Profil comfindo Management, lembaga pelatihan dan konsultan manajemen terpercaya di Indonesia.",
}

export default async function AboutPage() {
  const supabase = await createClient()
  const { data: about } = await supabase.from("about_content").select("*").limit(1).single()

  const parseJsonArray = (val: any, defaultVal: any[]) => {
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') {
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    return defaultVal;
  }

  const company_name = about?.company_name || "comfindo Management"
  const vision = about?.vision || "Menjadi lembaga pelatihan dan konsultan manajemen terpercaya yang mendukung pengembangan kompetensi sumber daya manusia serta pertumbuhan bisnis berkelanjutan bagi perusahaan di Indonesia."
  const mission = parseJsonArray(about?.mission, [
    { title: "Meningkatkan Keterampilan Kerja Karyawan", description: "Menyelenggarakan public training dan in-house training secara berkala untuk meningkatkan keterampilan kerja karyawan." },
    { title: "Mendukung Pertumbuhan Bisnis Perusahaan", description: "Memberikan layanan konsultasi manajemen yang membantu perusahaan mengoptimalkan operasional." },
    { title: "Menyediakan Program Sertifikasi Kompetensi", description: "Menyelenggarakan pelatihan dan sertifikasi kompetensi bersertifikat BNSP maupun Non-BNSP." },
  ])
  const stats = parseJsonArray(about?.stats, [
    { value: "500+", label: "Alumni Bersertifikat" },
    { value: "50+", label: "Program Pelatihan" },
    { value: "10+", label: "Trainer Ahli" },
    { value: "4.9★", label: "Rating Kepuasan" },
  ])
  const legalitas = parseJsonArray(about?.legalitas, [
    { label: "Nama Lembaga", value: "comfindo Management" },
    { label: "Alamat", value: "Perkantoran Tanjung Mas Raya Blok B1 No.44, Tanjung Barat, Jakarta Selatan" },
    { label: "Kontak", value: "0858-7066-3856 / 0821-1199-5378" },
    { label: "Email", value: "comfindo.management@gmail.com" },
  ])

  const statIcons = [GraduationCap, Users, Star, Shield]

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Profil Perusahaan"
        description="Mengenal lebih dekat comfindo Management sebagai mitra pengembangan SDM dan bisnis Anda."
        breadcrumbs={[{ label: "Profil", href: "/about" }]}
      />

      {/* Company Intro */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-comfindo-green/10 text-comfindo-green mb-6">
              <Building2 className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Tentang <span className="text-comfindo-green">{company_name}</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              {company_name} adalah Lembaga Pelatihan dan Konsultan Manajemen yang berkomitmen mendukung pengembangan kompetensi sumber daya manusia sekaligus pertumbuhan bisnis perusahaan Anda. Kami hadir bukan hanya sebagai penyelenggara pelatihan, tetapi sebagai mitra strategis yang membantu organisasi meningkatkan daya saing melalui program yang relevan, terukur, dan terpercaya.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-[hsl(152,20%,97%)]">
        <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat: any, i: number) => {
              const Icon = statIcons[i % statIcons.length]
              return (
                <div key={stat.label} className="text-center bg-white rounded-2xl p-6 shadow-md border border-gray-50">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-comfindo-green/10 text-comfindo-green mb-3">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-3xl font-extrabold text-comfindo-green">{stat.value}</div>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20 grid gap-12 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 rounded-xl bg-comfindo-green/10 text-comfindo-green">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Visi</h2>
            </div>
            <div className="bg-[hsl(152,15%,97%)] rounded-2xl p-6 border border-gray-100">
              <p className="text-gray-600 leading-relaxed italic text-lg">&ldquo;{vision}&rdquo;</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 rounded-xl bg-comfindo-green/10 text-comfindo-green">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Misi</h2>
            </div>
            <div className="space-y-4">
              {mission.map((item: any, i: number) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-comfindo-green text-white font-bold text-sm shrink-0">{i + 1}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Legalitas */}
      <section className="py-16 md:py-20 bg-[hsl(152,20%,97%)]">
        <div className="container max-w-4xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Legalitas <span className="text-comfindo-green">Perusahaan</span>
          </h2>
          <div className="bg-white rounded-2xl shadow-md border border-gray-50 overflow-hidden">
            {legalitas.map((item: any, i: number) => (
              <div key={i} className={`flex items-center gap-4 px-6 py-4 ${i < legalitas.length - 1 ? "border-b border-gray-100" : ""}`}>
                <span className="text-sm font-medium text-gray-400 w-40 shrink-0">{item.label}</span>
                <span className="text-sm text-gray-700">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
