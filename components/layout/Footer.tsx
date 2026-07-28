import Link from "next/link"
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, GraduationCap, MessageCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "Pelatihan", href: "/training" },
  { name: "Cek Sertifikat", href: "/services" },
  { name: "Profil", href: "/about" },
  { name: "Kontak", href: "/contact" },
  { name: "Blog", href: "/blog" },
]

const socialIconMap: Record<string, any> = {
  Facebook, Instagram, LinkedIn: Linkedin, YouTube: Youtube, WhatsApp: MessageCircle
}

export async function Footer() {
  const supabase = await createClient()
  const { data: contact } = await supabase.from("contact_info").select("*").limit(1).single()

  const address = contact?.address || "Perkantoran Tanjung Mas Raya Blok B1 No.44 Tanjung Barat Jakarta Selatan"
  const phone = contact?.phone || "0858-7066-3856"
  const phone2 = contact?.phone2 || "0821-1199-5378"
  const email = contact?.email || "comfindo.management@gmail.com"

  let waPhone = phone.replace(/\D/g, '');
  if (waPhone.startsWith("0")) {
    waPhone = "62" + waPhone.slice(1);
  } else if (!waPhone.startsWith("62")) {
    waPhone = "62" + waPhone;
  }
  const waUrl = `https://wa.me/${waPhone}`;

  const socialLinks = Array.isArray(contact?.social_links) && contact.social_links.length > 0 ? contact.social_links : [
    { name: "Instagram", url: "https://www.instagram.com/comfindo.co.id/" },
    { name: "YouTube", url: "https://www.youtube.com/@comfindo" },
    { name: "WhatsApp", url: waUrl },
  ]

  return (
    <footer id="public-footer" className="relative overflow-hidden">
      {/* Main Footer */}
      <div className="bg-[hsl(210,50%,12%)] text-white">
        <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20 py-14 md:py-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand Column */}
            <div className="space-y-5 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-linear-to-br from-comfindo-green to-comfindo-green-light text-white shadow-md">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span className="text-lg font-bold tracking-tight text-white">
                  comfindo Management
                </span>
              </Link>
              <p className="text-sm text-gray-300 leading-relaxed">
                Lembaga Pelatihan dan Konsultan Manajemen yang berkomitmen mendukung pengembangan kompetensi sumber daya manusia sekaligus pertumbuhan bisnis perusahaan Anda.
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                Kami hadir bukan hanya sebagai penyelenggara pelatihan, tetapi sebagai mitra strategis yang membantu organisasi meningkatkan daya saing melalui program yang relevan, terukur, dan terpercaya.
              </p>
            </div>

            {/* Address Column */}
            <div className="space-y-5">
              <h4 className="text-sm font-semibold text-[hsl(152,50%,55%)] uppercase tracking-wider">
                Alamat Perusahaan
              </h4>
              <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[hsl(152,50%,55%)]" />
                  <span>Office Center : {address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-[hsl(152,50%,55%)]" />
                  <div>
                    <span>{phone}</span>
                    <br />
                    <span>{phone2}</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-[hsl(152,50%,55%)]" />
                  <span>{email}</span>
                </li>
              </ul>
            </div>

            {/* Pages Column */}
            <div className="space-y-5">
              <h4 className="text-sm font-semibold text-[hsl(152,50%,55%)] uppercase tracking-wider">
                Halaman
              </h4>
              <ul className="space-y-3 text-sm text-gray-300">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-[hsl(152,50%,55%)] transition-colors duration-200 inline-flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-comfindo-green inline-block" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Column */}
            <div className="space-y-5">
              <h4 className="text-sm font-semibold text-[hsl(152,50%,55%)] uppercase tracking-wider">
                Sosial Media
              </h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social: any) => {
                  const Icon = socialIconMap[social.name] || Facebook
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-gray-300 hover:bg-comfindo-green hover:text-white transition-all duration-200 hover:scale-110"
                      title={social.name}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="sr-only">{social.name}</span>
                    </a>
                  )
                })}
              </div>
              <div className="pt-3">
                <p className="text-xs text-gray-400">Ikuti kami di sosial media untuk informasi terbaru seputar pelatihan dan Konsultasi Manajemen.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[hsl(210,50%,8%)]">
        <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            Copyright © {new Date().getFullYear()} | www.comfindo.co.id . All right reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Home", "Pelatihan", "Sertifikat", "Akun"].map((item) => (
              <Link
                key={item}
                href={
                  item === "Home" ? "/" :
                    item === "Pelatihan" ? "/training" :
                      item === "Sertifikat" ? "/services" :
                        "/login"
                }
                className="text-xs text-gray-400 hover:text-[hsl(152,50%,55%)] transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
