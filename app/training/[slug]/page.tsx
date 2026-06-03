import { PageHeader } from "@/components/common/PageHeader"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, CheckCircle2, FileText, Tag, MessageCircle, ArrowRight, Target, Users, Award } from "lucide-react"
import Link from "next/link"

export const revalidate = 300

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params
  const supabase = await createClient()
  const { data: training } = await supabase.from("training_programs").select("seo_title, seo_description, title, image_url").eq("slug", params.slug).single()

  if (!training) return { title: "Program Tidak Ditemukan - comfindo Management" }
  return { 
    title: training.seo_title || training.title, 
    description: training.seo_description,
    openGraph: {
        title: training.seo_title || training.title,
        description: training.seo_description,
        images: training.image_url ? [{ url: training.image_url }] : [],
    }
  }
}

export default async function TrainingDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const supabase = await createClient()
  const { data: training } = await supabase.from("training_programs").select("*").eq("slug", params.slug).eq("is_published", true).single()

  if (!training) notFound()

  const materials = Array.isArray(training.materials) ? training.materials : []
  const benefits = Array.isArray(training.benefits) ? training.benefits : []
  const targetParticipants = Array.isArray(training.target_participants) ? training.target_participants : []
  const objectives = Array.isArray(training.objectives) ? training.objectives : []
  const output = Array.isArray(training.output) ? training.output : []

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": training.title,
    "description": training.seo_description || training.short_description || training.description,
    "provider": {
      "@type": "Organization",
      "name": "comfindo",
      "sameAs": "https://www.comfindo.co.id"
    },
    ...(training.image_url && { "image": training.image_url }),
    "coursePrerequisites": "None",
    "educationalCredentialAwarded": "Certificate",
    "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": training.method?.toLowerCase().includes("online") ? "Online" : "Onsite",
        "instructor": {
            "@type": "Person",
            "name": "Instruktur Profesional comfindo"
        }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
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
                { icon: Calendar, label: "Jadwal", value: training.date || "Setiap Bulan", color: "bg-blue-50 text-blue-600" },
                { icon: Clock, label: "Durasi", value: training.duration || "2 Hari", color: "bg-purple-50 text-purple-600" },
                { icon: MapPin, label: "Metode", value: training.method || "Online", color: "bg-orange-50 text-orange-600" },
                { icon: Tag, label: "Investasi", value: training.price || "Hubungi Kami", color: "bg-green-50 text-comfindo-green" },
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

            {(training.description || training.short_description) && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-900">Deskripsi Program</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{training.description || training.short_description}</p>
              </div>
            )}

            {objectives.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-5 text-gray-900 flex items-center gap-2">
                  <Target className="h-5 w-5 text-comfindo-green" /> Tujuan Pelatihan
                </h2>
                <ul className="space-y-3">
                  {objectives.map((obj: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-comfindo-green shrink-0 mt-0.5" />
                      <span className="text-gray-700">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {targetParticipants.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-5 text-gray-900 flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" /> Target Peserta
                </h2>
                <div className="flex flex-wrap gap-2">
                  {targetParticipants.map((p: string, i: number) => (
                    <Badge key={i} variant="secondary" className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 border-0">
                      {p}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {materials.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-5 text-gray-900 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-500" /> Materi Pelatihan (Silabus)
                </h2>
                <div className="grid gap-3">
                  {materials.map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-purple-50/50 border border-purple-100 hover:border-purple-200 transition-colors">
                      <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-100 text-purple-700 text-xs font-bold shrink-0 mt-0.5">{i + 1}</div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {output.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-5 text-gray-900 flex items-center gap-2">
                  <Award className="h-5 w-5 text-orange-500" /> Output / Hasil Pembelajaran
                </h2>
                <ul className="space-y-3">
                  {output.map((out: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <ArrowRight className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700">{out}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {benefits.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-5 text-gray-900">Fasilitas / Manfaat</h2>
                <div className="flex flex-wrap gap-2">
                  {benefits.map((facility: string, i: number) => (
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
                <p className="text-3xl font-extrabold text-comfindo-green">{training.price || "Hubungi Kami"}</p>
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
                <p>✅ Metode pelatihan interaktif</p>
                <p>✅ Sertifikat kelulusan</p>
                <p>✅ Trainer tersertifikasi & berpengalaman</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
