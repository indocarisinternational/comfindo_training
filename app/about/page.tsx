import type { Metadata } from "next"
import Image from "next/image"
import { PageHeader } from "@/components/common/PageHeader"
import { ClientsSection } from "@/components/sections/Clients"
import { CTASection } from "@/components/sections/CTA"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Target, Eye } from "lucide-react"

export const metadata: Metadata = {
  title: "Tentang Kami - MSI Consulting",
  description: "Profil perusahaan MSI Consulting, visi misi, dan pengalaman kami dalam jasa konsultasi ISO dan training profesional.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Tentang Kami"
        description="Mitra terpercaya Anda dalam meraih standar internasional dan keunggulan operasional."
        breadcrumbs={[{ label: "About", href: "/about" }]}
      />

      {/* Company Profile Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight text-primary">Siapa Kami?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                MSI Consulting adalah perusahaan konsultan manajemen bisnis dan pelatihan profesional yang berdedikasi untuk membantu organisasi mencapai potensi maksimalnya melalui penerapan standar internasional (ISO).
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Didirikan oleh para praktisi berpengalaman, kami menawarkan pendekatan praktis dan solutif yang tidak hanya fokus pada sertifikasi, tetapi juga pada peningkatan kinerja bisnis klien kami secara berkelanjutan.
              </p>
              <div className="space-y-4">
                {[
                  "Tim Konsultan Berpengalaman & Tersertifikasi",
                  "Pendampingan End-to-End hingga Lulus Audit",
                  "Metode Pelatihan Interaktif & Aplikatif",
                  "Jaringan Luas dengan Badan Sertifikasi Terakreditasi",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-muted-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[400px] w-full overflow-hidden rounded-xl bg-muted">
               {/* Placeholder for About Image */}
               <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400 font-bold text-xl">
                 Image: Team Meeting / Office
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-none shadow-md bg-background">
              <CardContent className="p-8 flex flex-col items-center text-center h-full">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Eye className="h-8 w-8" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-primary">Visi Kami</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Menjadi perusahaan konsultan dan pelatihan terdepan di Indonesia yang dipercaya karena integritas, profesionalisme, dan hasil nyata dalam mengembangkan mutu dan produktivitas klien.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md bg-background">
              <CardContent className="p-8 flex flex-col items-center text-center h-full">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-primary">Misi Kami</h3>
                <ul className="text-muted-foreground text-left space-y-3 list-disc list-inside">
                  <li>Memberikan layanan konsultasi yang solutif dan tepat sasaran.</li>
                  <li>Menyediakan program pelatihan yang relevan dengan kebutuhan industri.</li>
                  <li>Membangun kemitraan jangka panjang dengan klien berdasarkan kepercayaan.</li>
                  <li>Terus berinovasi dalam metode dan materi pembelajaran.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <ClientsSection />
      <CTASection />
    </div>
  )
}
