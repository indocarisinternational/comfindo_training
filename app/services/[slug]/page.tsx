import { PageHeader } from "@/components/common/PageHeader"
import { services } from "@/lib/data/services"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { CTASection } from "@/components/sections/CTA"
import { CheckCircle, ArrowRight } from "lucide-react"

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug // Correctly await params in Next 15 if needed, or treated as plain obj in 14. 
  // Note: Next.js 15 treats params as a Promise in some contexts, but usually Page props are async.
  // Ideally, 'params' in current stable Next.js 14 is synchronous object in generateMetadata but types might say otherwise.
  // Safe approach: access directly.
  
  const service = services.find((s) => s.slug === slug) // Accessing slug directly
  
  if (!service) {
    return {
      title: "Service Not Found - MSI Consulting",
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
          { label: "Services", href: "/services" },
          { label: service.slug, href: `/services/${params.slug}` },
        ]}
      />

      <section className="py-16 md:py-24">
        <div className="container grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-primary">Deskripsi Layanan</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {service.content}
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                 Kami menyediakan pendekatan komprehensif untuk membantu organisasi Anda tidak hanya mendapatkan sertifikat, tetapi juga membangun sistem manajemen yang efektif dan berkelanjutan.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6 text-primary">Manfaat Penerapan</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-muted/40">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6 text-primary">Proses Konsultasi</h2>
              <div className="space-y-4">
                {service.process.map((step, i) => (
                    <div key={i} className="flex items-center gap-4">
                       <div className="flex-none flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                         {i + 1}
                       </div>
                       <div className="p-4 rounded-lg border w-full hover:bg-muted/20 transition-colors">
                          <span className="font-medium">{step}</span>
                       </div>
                    </div>
                ))}
              </div>
            </div>

             <div>
              <h2 className="text-2xl font-bold mb-6 text-primary">FAQ</h2>
               <div className="space-y-4">
                {service.faq.map((item, i) => (
                  <div key={i} className="rounded-lg border p-4">
                    <h3 className="font-semibold text-lg mb-2">{item.q}</h3>
                    <p className="text-muted-foreground">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 sticky top-24">
              <h3 className="text-xl font-semibold mb-4">Butuh Konsultasi?</h3>
              <p className="text-muted-foreground mb-6">
                Diskusikan kebutuhan sertifikasi perusahaan Anda dengan ahli kami.
              </p>
              <div className="space-y-3">
                 <a 
                   href="https://wa.me/6281234567890?text=Halo%20MSI%20Consulting" 
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center justify-center w-full h-10 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium transition-colors"
                 >
                   Chat WhatsApp
                 </a>
                  <a 
                   href="/contact" 
                   className="flex items-center justify-center w-full h-10 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md font-medium transition-colors"
                 >
                   Isi Form Konsultasi
                 </a>
              </div>
            </div>
            
             <div className="rounded-xl bg-muted p-6">
               <h4 className="font-semibold mb-2">Layanan Lainnya</h4>
               <ul className="space-y-2">
                 {services.filter(s => s.slug !== params.slug).map(s => (
                   <li key={s.slug}>
                     <a href={`/services/${s.slug}`} className="text-sm text-primary hover:underline flex items-center gap-2">
                       <ArrowRight className="h-3 w-3" /> {s.title}
                     </a>
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
