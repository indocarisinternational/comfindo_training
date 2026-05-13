import { PageHeader } from "@/components/common/PageHeader"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Shield, Award, Building2, Search } from "lucide-react"
import type { Metadata } from "next"

export const revalidate = 300

export const metadata: Metadata = {
  title: "Cek Sertifikat & Layanan - comfindo Management",
  description: "Cek sertifikat peserta pelatihan comfindo Management. Layanan sertifikasi BNSP, pelatihan comfindo, dan In House Training.",
}

const serviceIcons: Record<string, typeof Shield> = {
  "sertifikasi-bnsp": Award,
  "sertifikasi-comfindo": Shield,
  "in-house-training": Building2,
  "cek-sertifikat": Search,
}

export default async function ServicesPage() {
  const supabase = await createClient()
  const { data: services } = await supabase.from("services").select("*").eq("is_published", true).order("order_index")

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Layanan & Cek Sertifikat"
        description="Verifikasi Nomor Sertifikat Pelatihan."
        breadcrumbs={[{ label: "Cek Sertifikat", href: "/services" }]}
      />

      {/* Certificate Check Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container max-w-2xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-comfindo-green/10 text-comfindo-green mb-4">
              <Search className="h-8 w-8" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Pencarian Sertifikat Peserta</h2>
            <p className="mt-3 text-gray-500">
              Comfindo Manajemen menjamin sertifikat yang diterbitkan dapat dilakukan validasi untuk menjamin keabsahan sertifikat peserta pelatihan.
            </p>
          </div>
          <div className="bg-[hsl(152,15%,97%)] rounded-2xl p-6 md:p-8 border border-gray-100">
            <div className="flex flex-col sm:flex-row gap-3">
              <input type="text" placeholder="No Sertifikat atau Nama Peserta" className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-comfindo-green/20 focus:border-comfindo-green bg-white transition-all" />
              <Button className="bg-comfindo-green hover:bg-comfindo-green-dark text-white rounded-xl px-6 whitespace-nowrap">
                <Search className="h-4 w-4 mr-2" /> Cek Sertifikat
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-3">Pastikan anda telah login sebelum melakukan verifikasi Nomor Sertifikat</p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-12 md:py-16 bg-[hsl(152,15%,97%)]">
        <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
              Layanan <span className="text-comfindo-green">Kami</span>
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Jelajahi berbagai layanan pelatihan dan sertifikasi dari comfindo Management.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {(services || []).map((service) => {
              const Icon = serviceIcons[service.slug] || Shield
              return (
                <Card key={service.slug || service.id} className="group flex flex-col border-0 shadow-md rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-comfindo-green/10 text-comfindo-green mb-4 group-hover:bg-comfindo-green group-hover:text-white transition-all duration-300">
                      <Icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-lg text-gray-900 group-hover:text-comfindo-green transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">{service.content}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="ghost" className="w-full justify-between hover:bg-comfindo-green/5 text-comfindo-green group/btn rounded-xl">
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
