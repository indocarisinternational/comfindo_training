import { PageHeader } from "@/components/common/PageHeader"
import { trainings } from "@/lib/data/trainings"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, CheckCircle2, FileText, User } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug
  const training = trainings.find((t) => t.slug === slug)

  if (!training) {
    return {
      title: "Training Not Found - MSI Consulting",
    }
  }

  return {
    title: training.seoTitle,
    description: training.seoDescription,
  }
}

export async function generateStaticParams() {
  return trainings.map((t) => ({
    slug: t.slug,
  }))
}

export default async function TrainingDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const training = trainings.find((t) => t.slug === params.slug)

  if (!training) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title={training.title}
        breadcrumbs={[
          { label: "Training", href: "/training" },
          { label: "Detail", href: "#" },
        ]}
      />

      <section className="py-16 md:py-24">
        <div className="container grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Meta Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-muted/30 p-6 rounded-xl border">
               <div className="flex items-center gap-3">
                 <Calendar className="h-5 w-5 text-primary" />
                 <div>
                   <p className="text-sm text-muted-foreground">Tangal</p>
                   <p className="font-semibold">{training.date}</p>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <Clock className="h-5 w-5 text-primary" />
                 <div>
                   <p className="text-sm text-muted-foreground">Waktu</p>
                   <p className="font-semibold">{training.time} ({training.duration})</p>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <MapPin className="h-5 w-5 text-primary" />
                 <div>
                   <p className="text-sm text-muted-foreground">Lokasi/Metode</p>
                   <p className="font-semibold">{training.method}</p>
                 </div>
               </div>
                <div className="flex items-center gap-3">
                 <User className="h-5 w-5 text-primary" />
                 <div>
                   <p className="text-sm text-muted-foreground">Investasi</p>
                   <p className="font-semibold text-primary">{training.price}</p>
                 </div>
               </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6 text-primary flex items-center gap-2">
                <FileText className="h-6 w-6" /> Materi Training
              </h2>
              <ul className="grid gap-3">
                {training.syllabus.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-background border hover:border-primary/50 transition-colors">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6 text-primary">Fasilitas</h2>
              <div className="flex flex-wrap gap-2">
                {training.facilities.map((facility, i) => (
                  <Badge key={i} variant="secondary" className="px-3 py-1 text-sm font-normal">
                    {facility}
                  </Badge>
                ))}
              </div>
            </div>
            
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1 space-y-8">
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 sticky top-24">
              <h3 className="text-xl font-semibold mb-2">Daftar Sekarang</h3>
              <p className="text-muted-foreground mb-6 text-sm">
                Amankan kursi Anda sekarang. Kuota terbatas untuk efektivitas training.
              </p>
              
              <div className="space-y-4">
                 <Button className="w-full" size="lg" asChild>
                   <a href="/contact?type=registration">Isi Form Registrasi</a>
                 </Button>
                 
                 <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Atau daftar via WA</span>
                    </div>
                  </div>

                 <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50" asChild>
                    <a 
                      href={`https://wa.me/6281234567890?text=Halo%20MSI%20Consulting%2C%20saya%20ingin%20daftar%20${encodeURIComponent(training.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp Admin
                    </a>
                 </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
