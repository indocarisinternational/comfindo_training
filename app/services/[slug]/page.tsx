import { PageHeader } from "@/components/common/PageHeader"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { CTASection } from "@/components/sections/CTA"
import { CheckCircle, ArrowRight, MessageCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const revalidate = 300

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params
  const supabase = await createClient()
  const { data: service } = await supabase.from("services").select("seo_title, seo_description, title").eq("slug", params.slug).single()
  if (!service) return { title: "Layanan Tidak Ditemukan - comfindo Management" }
  return { title: service.seo_title || service.title, description: service.seo_description }
}

export default async function ServiceDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const supabase = await createClient()
  const { data: service } = await supabase.from("services").select("*").eq("slug", params.slug).single()
  if (!service) notFound()

  const { data: allServices } = await supabase.from("services").select("slug, title").eq("is_published", true).order("order_index")

  const benefits = Array.isArray(service.benefits) ? service.benefits : []
  const process = Array.isArray(service.process) ? service.process : []
  const faq = Array.isArray(service.faq) ? service.faq : []

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title={service.title}
        breadcrumbs={[
          { label: "Layanan", href: "/services" },
          { label: service.title, href: `/services/${params.slug}` },
        ]}
      />

      <section className="py-12 md:py-16">
        <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-900">Deskripsi Layanan</h2>
              <p className="text-gray-500 leading-relaxed">{service.content}</p>
            </div>

            {benefits.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-5 text-gray-900">Manfaat</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {benefits.map((benefit: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[hsl(152,15%,97%)] border border-gray-100">
                      <CheckCircle className="h-5 w-5 text-comfindo-green mt-0.5 shrink-0" />
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {process.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-5 text-gray-900">Proses</h2>
                <div className="space-y-3">
                  {process.map((step: string, i: number) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="flex-none flex items-center justify-center w-8 h-8 rounded-lg bg-comfindo-green text-white font-bold text-sm">{i + 1}</div>
                      <div className="p-4 rounded-xl border border-gray-100 bg-white w-full hover:border-comfindo-green/30 transition-colors shadow-sm">
                        <span className="font-medium text-gray-700">{step}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {faq.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-5 text-gray-900">FAQ</h2>
                <div className="space-y-3">
                  {faq.map((item: any, i: number) => (
                    <div key={i} className="rounded-xl border border-gray-100 p-5 bg-white">
                      <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold mb-2 text-gray-900">Butuh Konsultasi?</h3>
              <p className="text-gray-500 text-sm mb-5">Diskusikan kebutuhan pelatihan dan Konsultan Manajemen Anda dengan tim comfindo.</p>
              <div className="space-y-3">
                <Button asChild className="w-full bg-comfindo-green hover:bg-comfindo-green-dark text-white rounded-xl">
                  <a href="https://wa.me/62817210875?text=Halo%20comfindo%20Management" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" /> Chat WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full border-comfindo-green text-comfindo-green hover:bg-comfindo-green hover:text-white rounded-xl">
                  <Link href="/contact">Isi Form Konsultasi</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl bg-[hsl(152,15%,97%)] p-6 border border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-3">Layanan Lainnya</h4>
              <ul className="space-y-2">
                {(allServices || []).filter(s => s.slug !== params.slug).map(s => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="text-sm text-comfindo-green hover:underline flex items-center gap-2">
                      <ArrowRight className="h-3 w-3" /> {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
