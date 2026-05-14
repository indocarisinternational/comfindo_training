import { PageHeader } from "@/components/common/PageHeader"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, CheckCircle2, FileText, Tag, MessageCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export const revalidate = 300

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params
  const supabase = await createClient()
  const { data: training } = await supabase.from("training_programs").select("seo_title, seo_description, title").eq("slug", params.slug).single()

  if (!training) return { title: "Program Tidak Ditemukan - comfindo Management" }
  return { title: training.seo_title || training.title, description: training.seo_description }
}

export default async function TrainingDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const supabase = await createClient()
  const { data: training } = await supabase.from("training_programs").select("*").eq("slug", params.slug).eq("is_published", true).single()

  if (!training) notFound()

  const syllabus = Array.isArray(training.syllabus) ? training.syllabus : []
  const facilities = Array.isArray(training.facilities) ? training.facilities : []

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title={training.title}
        breadcrumbs={[
          { label: "Pelatihan", href: "/training" },
          { label: "Detail", href: "#" },
        ]}
      />

      <section className="py-12 md:py-16">
        <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: Calendar, label: "Jadwal", value: training.date, color: "bg-blue-50 text-blue-600" },
                { icon: Clock, label: "Durasi", value: training.duration, color: "bg-purple-50 text-purple-600" },
                { icon: MapPin, label: "Metode", value: training.method, color: "bg-orange-50 text-orange-600" },
                { icon: Tag, label: "Investasi", value: training.price, color: "bg-green-50 text-comfindo-green" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${item.color} mb-3`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                  <p className="font-semibold text-sm text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>

            {training.description && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-900">Deskripsi</h2>
                <p className="text-gray-500 leading-relaxed">{training.description}</p>
              </div>
            )}

            {syllabus.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-5 text-gray-900 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-comfindo-green" /> Materi Pelatihan
                </h2>
                <div className="grid gap-3">
                  {syllabus.map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[hsl(152,15%,97%)] border border-gray-100 hover:border-comfindo-green/30 transition-colors">
                      <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-comfindo-green text-white text-xs font-bold shrink-0 mt-0.5">{i + 1}</div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {facilities.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-5 text-gray-900">Fasilitas</h2>
                <div className="flex flex-wrap gap-2">
                  {facilities.map((facility: string, i: number) => (
                    <Badge key={i} variant="secondary" className="px-4 py-2 text-sm font-medium bg-comfindo-green/8 text-comfindo-green border-0 rounded-xl">
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" /> {facility}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white shadow-lg p-6 sticky top-24">
              <div className="text-center mb-5">
                <p className="text-sm text-gray-400 mb-1">Investasi</p>
                <p className="text-3xl font-extrabold text-comfindo-green">{training.price}</p>
              </div>
              <div className="space-y-3">
                <Button className="w-full h-12 bg-comfindo-green hover:bg-comfindo-green-dark text-white rounded-xl shadow-md hover:shadow-lg text-sm font-semibold" size="lg" asChild>
                  <Link href={`/contact?type=registration&program=${encodeURIComponent(training.title)}`}>
                    Daftar Sekarang <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200" /></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">atau</span></div>
                </div>
                <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50 rounded-xl" asChild>
                  <a href={`https://wa.me/62817210875?text=Halo%20comfindo%20Management%2C%20saya%20ingin%20daftar%20${encodeURIComponent(training.title)}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp Admin
                  </a>
                </Button>
              </div>
              <div className="mt-5 pt-5 border-t border-gray-100 space-y-2 text-xs text-gray-400">
                <p>✅ Sertifikat resmi comfindo Management</p>
                <p>✅ Materi pelatihan digital</p>
                <p>✅ Akses grup alumni</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
