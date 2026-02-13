import { PageHeader } from "@/components/common/PageHeader"
import { ConsultationForm } from "@/components/forms/ConsultationForm"
import { RegistrationForm } from "@/components/forms/RegistrationForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import { Suspense } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kontak - comfindo Management",
  description: "Hubungi comfindo Management untuk informasi pelatihan dan sertifikasi. Kantor kami berlokasi di Tanjung Barat, Jakarta Selatan.",
}

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=100083385664789", icon: Facebook },
  { name: "Instagram", href: "https://www.instagram.com/comfindo.management/", icon: Instagram },
  { name: "LinkedIn", href: "http://www.linkedin.com/company/comfindomanagement", icon: Linkedin },
  { name: "YouTube", href: "https://www.youtube.com/channel/UCIHuMFAhGwBsx-Q_1kRdWaQ", icon: Youtube },
]

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Kontak Kami"
        description="Hubungi kami untuk informasi lebih lanjut tentang pelatihan dan sertifikasi."
        breadcrumbs={[{ label: "Kontak", href: "/contact" }]}
      />

      <section className="py-12 md:py-16">
        <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20 grid gap-12 lg:grid-cols-2">
          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-6 text-gray-900">Informasi Kontak</h2>
              <div className="space-y-4">
                {[
                  {
                    icon: MapPin,
                    title: "Alamat Kantor",
                    content: "Perkantoran Tanjung Mas Raya Blok B1 No.44 Tanjung Barat Jakarta Selatan",
                  },
                  {
                    icon: Phone,
                    title: "Telepon / WhatsApp",
                    content: "0858-7066-3856\n0821-1199-5378",
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    content: "comfindo.management@gmail.com",
                  },
                  {
                    icon: Clock,
                    title: "Jam Operasional",
                    content: "Senin - Jumat, 08.00 - 17.00 WIB",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 p-4 rounded-2xl bg-[hsl(152,15%,97%)] border border-gray-100 hover:border-[hsl(152,69%,31%)]/20 transition-colors">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[hsl(152,69%,31%)]/10 text-[hsl(152,69%,31%)]">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-gray-900">{item.title}</h3>
                      <p className="text-gray-500 text-sm whitespace-pre-line">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-gray-900">Sosial Media</h3>
              <div className="flex gap-3">
                {socialLinks.map(({ name, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-11 h-11 rounded-xl bg-[hsl(152,69%,31%)]/10 text-[hsl(152,69%,31%)] hover:bg-[hsl(152,69%,31%)] hover:text-white transition-all duration-200 hover:scale-110"
                    title={name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Map Embed */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.6776!2d106.8441!3d-6.2892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f0000000000%3A0x0!2sTanjung%20Barat%20Jakarta%20Selatan!5e0!3m2!1sen!2sid"
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
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-gray-900">Kirim Pesan</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="consultation" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 rounded-xl p-1">
                    <TabsTrigger
                      value="consultation"
                      className="rounded-lg data-[state=active]:bg-[hsl(152,69%,31%)] data-[state=active]:text-white text-sm"
                    >
                      Konsultasi
                    </TabsTrigger>
                    <TabsTrigger
                      value="registration"
                      className="rounded-lg data-[state=active]:bg-[hsl(152,69%,31%)] data-[state=active]:text-white text-sm"
                    >
                      Registrasi
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="consultation">
                    <ConsultationForm />
                  </TabsContent>
                  <TabsContent value="registration">
                    <Suspense fallback={<div className="text-center py-8 text-gray-400">Loading form...</div>}>
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
