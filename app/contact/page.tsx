import { PageHeader } from "@/components/common/PageHeader"
import { ConsultationForm } from "@/components/forms/ConsultationForm"
import { RegistrationForm } from "@/components/forms/RegistrationForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Suspense } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hubungi Kami - MSI Consulting",
  description: "Hubungi MSI Consulting untuk konsultasi ISO dan pendaftaran training. Kantor kami berlokasi di Jakarta Selatan.",
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Hubungi Kami"
        description="Siap membantu kebutuhan sertifikasi dan peningkatan kompetensi perusahaan Anda."
        breadcrumbs={[{ label: "Contact", href: "/contact" }]}
      />

      <section className="py-16 md:py-24">
        <div className="container grid gap-12 lg:grid-cols-2">
          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-primary">Informasi Kontak</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Alamat Kantor</h3>
                    <p className="text-muted-foreground">
                      Jl. Jendral Sudirman No. Kav 52-53,<br />
                      Jakarta Selatan, DKI Jakarta 12190
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Telepon / WhatsApp</h3>
                    <p className="text-muted-foreground">+62 812-3456-7890</p>
                    <p className="text-muted-foreground text-sm">(Senin - Jumat, 08.00 - 17.00 WIB)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-muted-foreground">info@msiconsulting.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="aspect-video w-full rounded-xl overflow-hidden border bg-muted">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.299577543888!2d106.80806497355416!3d-6.224172661001409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f15037d00001%3A0x6b09328225576135!2sSudirman%20Central%20Business%20District!5e0!3m2!1sen!2sid!4v1709265000000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Forms */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Kirim Pesan</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="consultation" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="consultation">Konsultasi ISO</TabsTrigger>
                    <TabsTrigger value="registration">Registrasi Training</TabsTrigger>
                  </TabsList>
                  <TabsContent value="consultation">
                    <ConsultationForm />
                  </TabsContent>
                  <TabsContent value="registration">
                     <Suspense fallback={<div>Loading form...</div>}>
                        <RegistrationForm />
                     </Suspense>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
