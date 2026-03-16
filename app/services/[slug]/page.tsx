import { PageHeader } from "@/components/common/PageHeader"
import { services } from "@/lib/data/services"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { CTASection } from "@/components/sections/CTA"
import { CheckCircle, ArrowRight, MessageCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    return {
      title: "Layanan Tidak Ditemukan - comfindo Management",
    }
  }

  return {
    title: service.seoTitle,
    description: service.seoDescription,
  }
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export default async function ServiceDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const service = services.find((s) => s.slug === params.slug)

  if (!service) {
    notFound()
  }

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
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-900">Deskripsi Layanan</h2>
              <p className="text-gray-500 leading-relaxed">
                {service.content}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-5 text-gray-900">Manfaat</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[hsl(152,15%,97%)] border border-gray-100">
                    <CheckCircle className="h-5 w-5 text-[hsl(152,69%,31%)] mt-0.5 shrink-0" />
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-5 text-gray-900">Proses</h2>
              <div className="space-y-3">
                {service.process.map((step, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex-none flex items-center justify-center w-8 h-8 rounded-lg bg-[hsl(152,69%,31%)] text-white font-bold text-sm">
                      {i + 1}
                    </div>
                    <div className="p-4 rounded-xl border border-gray-100 bg-white w-full hover:border-[hsl(152,69%,31%)]/30 transition-colors shadow-sm">
                      <span className="font-medium text-gray-700">{step}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-5 text-gray-900">FAQ</h2>
              <div className="space-y-3">
                {service.faq.map((item, i) => (
                  <div key={i} className="rounded-xl border border-gray-100 p-5 bg-white">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold mb-2 text-gray-900">Butuh Konsultasi?</h3>
              <p className="text-gray-500 text-sm mb-5">
                Diskusikan kebutuhan pelatihan dan sertifikasi Anda dengan tim comfindo.
              </p>
              <div className="space-y-3">
                <Button
                  asChild
                  className="w-full bg-[hsl(152,69%,31%)] hover:bg-[hsl(152,75%,22%)] text-white rounded-xl"
                >
                  <a
                    href="https://wa.me/6285870663856?text=Halo%20comfindo%20Management"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-[hsl(152,69%,31%)] text-[hsl(152,69%,31%)] hover:bg-[hsl(152,69%,31%)] hover:text-white rounded-xl"
                >
                  <Link href="/contact">
                    Isi Form Konsultasi
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl bg-[hsl(152,15%,97%)] p-6 border border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-3">Layanan Lainnya</h4>
              <ul className="space-y-2">
                {services.filter(s => s.slug !== params.slug).map(s => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="text-sm text-[hsl(152,69%,31%)] hover:underline flex items-center gap-2">
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
