import type { Metadata } from "next"
import { PageHeader } from "@/components/common/PageHeader"
import { CTASection } from "@/components/sections/CTA"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Target, Eye, MapPin, Phone, Mail, Building } from "lucide-react"

export const metadata: Metadata = {
  title: "Profile - comfindo Management",
  description: "Profile comfindo Management - Lembaga pelatihan dan sertifikasi. Visi, Misi, dan Legalitas comfindo Management.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Profile comfindo Management"
        description="Lembaga pelatihan dan sertifikasi yang bertujuan untuk mencerdaskan kehidupan bangsa."
        breadcrumbs={[{ label: "Profil", href: "/about" }]}
      />

      {/* Company Profile Section */}
      <section className="py-14 md:py-20">
        <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-6">
              Tentang <span className="text-[hsl(152,69%,31%)]">comfindo Management</span>
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed">
              comfindo Management adalah lembaga pelatihan dan sertifikasi yang bertujuan untuk mencerdaskan kehidupan bangsa dan menciptakan alumni yang kompeten dibidangnya. Kami berfokus pada silabus berbasis Standar Kompetensi Kerja Nasional Indonesia (SKKNI).
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4">
              Program unggulan kami adalah Pelatihan & Sertifikasi Kompetensi Bersertifikat BNSP dan Non BNSP.
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
                <div className="text-3xl font-extrabold text-[hsl(152,69%,31%)]">{stat.value}</div>
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
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[hsl(152,69%,31%)]/10 text-[hsl(152,69%,31%)]">
                  <Eye className="h-8 w-8" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">Visi</h3>
                <p className="text-gray-500 leading-relaxed">
                  Menjadi Pusat Lembaga Pendidikan, Pelatihan dan Sertifikasi &ldquo;Terbesar&rdquo; dengan jadwal &ldquo;Terbanyak&rdquo; yang memberikan keterampilan dan pengetahuan berkualitas untuk menghasilkan SDM Kompeten.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
              <CardContent className="p-8 flex flex-col items-center text-center h-full">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[hsl(152,69%,31%)]/10 text-[hsl(152,69%,31%)]">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">Misi</h3>
                <ul className="text-gray-500 text-left space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[hsl(152,69%,31%)] mt-0.5 shrink-0" />
                    <span>Melaksanakan pelatihan keterampilan yang berbasis kompetensi.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[hsl(152,69%,31%)] mt-0.5 shrink-0" />
                    <span>Menyediakan program pelatihan yang relevan dan terkini sesuai dengan kebutuhan dunia kerja.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[hsl(152,69%,31%)] mt-0.5 shrink-0" />
                    <span>Menyediakan lingkungan belajar yang mendukung dan menginspirasi peserta pelatihan.</span>
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
              Legalitas <span className="text-[hsl(152,69%,31%)]">comfindo Management</span>
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
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[hsl(152,69%,31%)]/10 text-[hsl(152,69%,31%)] shrink-0">
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
