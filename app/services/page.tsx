import { PageHeader } from "@/components/common/PageHeader"
import { services } from "@/lib/data/services"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Shield, Award, Building2, Search } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cek Sertifikat & Layanan - comfindo Management",
  description: "Cek sertifikat peserta pelatihan comfindo Management. Layanan sertifikasi BNSP, sertifikasi comfindo, dan In House Training.",
}

const serviceIcons: Record<string, typeof Shield> = {
  "sertifikasi-bnsp": Award,
  "sertifikasi-comfindo": Shield,
  "in-house-training": Building2,
  "cek-sertifikat": Search,
}

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Layanan & Cek Sertifikat"
        description="Verifikasi sertifikat peserta pelatihan dan jelajahi layanan comfindo Management."
        breadcrumbs={[{ label: "Cek Sertifikat", href: "/services" }]}
      />

      {/* Certificate Check Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container max-w-2xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[hsl(152,69%,31%)]/10 text-[hsl(152,69%,31%)] mb-4">
              <Search className="h-8 w-8" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Pencarian Sertifikat Peserta
            </h2>
            <p className="mt-3 text-gray-500">
              Lembaga pelatihan dan sertifikasi yang bertujuan untuk mencerdaskan kehidupan bangsa dan menciptakan alumni yang kompeten dibidangnya.
            </p>
          </div>

          <div className="bg-[hsl(152,15%,97%)] rounded-2xl p-6 md:p-8 border border-gray-100">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Masukkan nomor sertifikat atau nama peserta..."
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(152,69%,31%)]/20 focus:border-[hsl(152,69%,31%)] bg-white transition-all"
              />
              <Button className="bg-[hsl(152,69%,31%)] hover:bg-[hsl(152,75%,22%)] text-white rounded-xl px-6 whitespace-nowrap">
                <Search className="h-4 w-4 mr-2" />
                Cek Sertifikat
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Masukkan nomor sertifikat atau nama lengkap peserta untuk verifikasi.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-12 md:py-16 bg-[hsl(152,15%,97%)]">
        <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
              Layanan <span className="text-[hsl(152,69%,31%)]">Kami</span>
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Jelajahi berbagai layanan pelatihan dan sertifikasi dari comfindo Management.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = serviceIcons[service.slug] || Shield
              return (
                <Card key={service.slug} className="group flex flex-col border-0 shadow-md rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[hsl(152,69%,31%)]/10 text-[hsl(152,69%,31%)] mb-4 group-hover:bg-[hsl(152,69%,31%)] group-hover:text-white transition-all duration-300">
                      <Icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-lg text-gray-900 group-hover:text-[hsl(152,69%,31%)] transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                      {service.content}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-between hover:bg-[hsl(152,69%,31%)]/5 text-[hsl(152,69%,31%)] group/btn rounded-xl"
                    >
                      <Link href={`/services/${service.slug}`}>
                        Lihat Detail
                        <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
