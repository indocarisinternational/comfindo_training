import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">MSI Consulting</h3>
            <p className="text-sm text-muted-foreground w-[90%]">
              Trusted partner for ISO Certification and Professional Training services. Elevate your business standards with us.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/services/iso-9001" className="hover:text-primary">ISO 9001 Consultation</Link></li>
              <li><Link href="/services/iso-27001" className="hover:text-primary">ISO 27001 Consultation</Link></li>
              <li><Link href="/services/iso-45001" className="hover:text-primary">ISO 45001 Consultation</Link></li>
              <li><Link href="/services/iso-14001" className="hover:text-primary">ISO 14001 Consultation</Link></li>
              <li><Link href="/services" className="hover:text-primary">All Services</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
             <h4 className="text-sm font-semibold">Company</h4>
             <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-primary">Blog & Insights</Link></li>
              <li><Link href="/training" className="hover:text-primary">Training Schedule</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
             </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Jl. Jendral Sudirman No. Kav 52-53, Jakarta Selatan, 12190</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>info@msiconsulting.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MSI Consulting. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
