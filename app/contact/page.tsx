import { PageHeader } from "@/components/common/PageHeader"
import { ConsultationForm } from "@/components/forms/ConsultationForm"
import { createClient } from "@/lib/supabase/server"
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"

export const revalidate = 300

export const metadata: Metadata = {
  title: "Hubungi Kami - comfindo Management",
  description: "Hubungi comfindo Management untuk konsultasi, pelatihan, dan sertifikasi. Kami siap membantu Anda.",
}

export default async function ContactPage() {
  const supabase = await createClient()
  const { data: contact } = await supabase.from("contact_info").select("*").limit(1).single()

  const address = contact?.address || "Perkantoran Tanjung Mas Raya Blok B1 No.44 Tanjung Barat Jakarta Selatan"
  const phone = contact?.phone || "0858-7066-3856"
  const phone2 = contact?.phone2 || "0821-1199-5378"
  const email = contact?.email || "comfindo.management@gmail.com"
  const office_hours = contact?.office_hours || "Senin - Jumat, 08.00 - 17.00 WIB"

  const contactInfo = [
    { icon: MapPin, label: "Alamat", value: address },
    { icon: Phone, label: "Telepon", value: `${phone} / ${phone2}` },
    { icon: Mail, label: "Email", value: email },
    { icon: Clock, label: "Jam Operasional", value: office_hours },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Hubungi Kami"
        description="Konsultasikan kebutuhan pelatihan dan sertifikasi Anda dengan tim comfindo Management."
        breadcrumbs={[{ label: "Kontak", href: "/contact" }]}
      />

      <section className="py-12 md:py-16 bg-white">
        <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20 grid gap-10 lg:grid-cols-5">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Informasi Kontak</h2>
              <p className="text-gray-500 text-sm">Hubungi kami melalui salah satu channel berikut.</p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4 p-4 rounded-xl bg-[hsl(152,15%,97%)] border border-gray-100">
                  <div className="p-2.5 rounded-lg bg-comfindo-green/10 text-comfindo-green shrink-0">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium mb-0.5">{item.label}</p>
                    <p className="text-sm text-gray-700">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button asChild size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl">
              <a href={`https://wa.me/62${phone.replace(/[^0-9]/g, "").replace(/^0/, "")}?text=Halo%20comfindo%20Management`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" /> Chat via WhatsApp
              </a>
            </Button>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Form Konsultasi</h2>
              <p className="text-sm text-gray-500 mb-6">Isi formulir di bawah ini dan tim kami akan menghubungi Anda.</p>
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
