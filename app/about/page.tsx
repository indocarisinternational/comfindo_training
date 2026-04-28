import type { Metadata } from "next"
import { PageHeader } from "@/components/common/PageHeader"
import { CTASection } from "@/components/sections/CTA"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Target, Eye, MapPin, Phone, Mail, Building } from "lucide-react"

export const metadata: Metadata = {
  title: "Profile - comfindo Management",
  description: "Profile comfindo Management - Lembaga Pelatihan dan Konsultan Manajemen. Visi, Misi, dan Legalitas comfindo Management.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Profile comfindo Management"
        description="Lembaga Pelatihan dan Konsultan Manajemen mendukung pengembangan kompetensi dan bisnis Perusahaan anda."
        breadcrumbs={[{ label: "Profil", href: "/about" }]}
      />

      {/* Company Profile Section */}
      <section className="py-14 md:py-20">
        <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-6">
              Tentang <span className="text-comfindo-green">comfindo Management</span>
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed">
              Comfindo Management adalah Lembaga Pelatihan dan Konsultan Manajemen yang berkomitmen mendukung pengembangan kompetensi sumber daya manusia sekaligus pertumbuhan bisnis perusahaan Anda.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4">
              Kami hadir bukan hanya sebagai penyelenggara pelatihan, tetapi sebagai mitra strategis yang membantu organisasi meningkatkan daya saing melalui program yang relevan, terukur, dan terpercaya.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            {[
              { value: "500+", label: "Alumni Bersertifikat" },
              { value: "50+", label: "Program Pelatihan" },
              { value: "10+", label: "Trainer Ahli" },
              { value: "4.9★", label: "Rating Kepuasan" },
            ].map((stat) => (
              <div key={stat.label} className="text-center bg-[hsl(152,15%,97%)] rounded-2xl p-6 border border-gray-100">
                <div className="text-3xl font-extrabold text-comfindo-green">{stat.value}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-14 bg-[hsl(152,15%,97%)]">
        <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
              <CardContent className="p-8 flex flex-col items-center text-center h-full">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-comfindo-green/10 text-comfindo-green">
                  <Eye className="h-8 w-8" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">Visi</h3>
                <p className="text-gray-500 leading-relaxed">
                  Menjadi lembaga pelatihan dan konsultan manajemen terpercaya yang mendukung pengembangan kompetensi sumber daya manusia serta pertumbuhan bisnis berkelanjutan bagi perusahaan di Indonesia.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
              <CardContent className="p-8 flex flex-col items-center text-center h-full">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-comfindo-green/10 text-comfindo-green">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">Misi</h3>
                <ul className="text-gray-500 text-left space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-comfindo-green mt-0.5 shrink-0" />
                    <span><b>Meningkatkan Keterampilan Kerja Karyawan.</b> Menyelenggarakan public training dan in-house training secara berkala, baik offline maupun online, untuk mendukung pengembangan kompetensi yang berkesinambungan.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-comfindo-green mt-0.5 shrink-0" />
                    <span><b>Mendukung Pertumbuhan Bisnis Perusahaan.</b> Memberikan layanan konsultasi manajemen yang membantu organisasi meningkatkan efektivitas, efisiensi, serta daya saing di pasar.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-comfindo-green mt-0.5 shrink-0" />
                    <span><b>Menyediakan Program Sertifikasi Kompetensi.</b> Menyelenggarakan pelatihan dan sertifikasi kompetensi bersertifikat BNSP maupun Non-BNSP sebagai pengakuan resmi atas kompetensi yang diakui secara nasional.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Legalitas Section */}
      <section className="py-14 md:py-20">
        <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
              Legalitas <span className="text-comfindo-green">comfindo Management</span>
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-5">
            {[
              { icon: Building, label: "Nama Lembaga", value: "comfindo Management" },
              { icon: MapPin, label: "Alamat", value: "Perkantoran Tanjung Mas Raya Blok B1 No.44, Tanjung Barat, Jakarta Selatan" },
              { icon: Phone, label: "Kontak", value: "0858-7066-3856 / 0821-1199-5378" },
              { icon: Mail, label: "Email", value: "comfindo.management@gmail.com" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-5 rounded-2xl bg-[hsl(152,15%,97%)] border border-gray-100">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-comfindo-green/10 text-comfindo-green shrink-0">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                  <p className="font-medium text-gray-900">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
