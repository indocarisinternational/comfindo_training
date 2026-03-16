import Link from "next/link"
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, GraduationCap } from "lucide-react"

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "Pelatihan", href: "/training" },
  { name: "Cek Sertifikat", href: "/services" },
  { name: "Profil", href: "/about" },
  { name: "Kontak", href: "/contact" },
  { name: "Blog", href: "/blog" },
]

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=100083385664789", icon: Facebook },
  { name: "Instagram", href: "https://www.instagram.com/comfindo.management/", icon: Instagram },
  { name: "LinkedIn", href: "http://www.linkedin.com/company/comfindomanagement", icon: Linkedin },
  { name: "YouTube", href: "https://www.youtube.com/channel/UCIHuMFAhGwBsx-Q_1kRdWaQ", icon: Youtube },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Main Footer */}
      <div className="bg-[hsl(210,50%,12%)] text-white">
        <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20 py-14 md:py-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand Column */}
            <div className="space-y-5 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-[hsl(152,69%,31%)] to-[hsl(152,50%,45%)] text-white shadow-md">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span className="text-lg font-bold tracking-tight text-white">
                  comfindo Management
                </span>
              </Link>
              <p className="text-sm text-gray-300 leading-relaxed">
                Lembaga pelatihan dan sertifikasi yang bertujuan untuk mencerdaskan kehidupan bangsa dan menciptakan alumni yang kompeten dibidangnya.
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                Kami berfokus pada silabus berbasis Standar Kompetensi Kerja Nasional Indonesia (SKKNI). Program unggulan kami adalah Pelatihan & Sertifikasi Kompetensi Bersertifikat BNSP dan Non BNSP.
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
                  <span>
                    Office Center : Perkantoran Tanjung Mas Raya Blok B1 No.44 Tanjung Barat Jakarta Selatan
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-[hsl(152,50%,55%)]" />
                  <div>
                    <span>0858-7066-3856</span>
                    <br />
                    <span>0821-1199-5378</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-[hsl(152,50%,55%)]" />
                  <span>comfindo.management@gmail.com</span>
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
                      <span className="w-1.5 h-1.5 rounded-full bg-[hsl(152,69%,31%)] inline-block" />
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
                {socialLinks.map(({ name, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-gray-300 hover:bg-[hsl(152,69%,31%)] hover:text-white transition-all duration-200 hover:scale-110"
                    title={name}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="sr-only">{name}</span>
                  </a>
                ))}
              </div>
              <div className="pt-3">
                <p className="text-xs text-gray-400">Ikuti kami di sosial media untuk informasi terbaru seputar pelatihan dan sertifikasi.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[hsl(210,50%,8%)]">
        <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            Copyright © {new Date().getFullYear()} | comfindomanagement.com . All right reserved.
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
