import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, MessageCircle } from "lucide-react"

interface CTAProps {
  title?: string
  subtitle?: string
  phone?: string
  whatsappUrl?: string
}

export function CTASection({
  title = "Siap Meningkatkan Kompetensi Anda?",
  subtitle = "Bergabunglah dengan ratusan alumni comfindo Management yang telah meningkatkan kompetensi dan karier mereka. Hubungi kami sekarang!",
  phone = "0858-7066-3856",
  whatsappUrl = "https://wa.me/62817210875",
}: CTAProps) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 comfindo-gradient" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE4YzEuNjU3IDAgMy0xLjM0MyAzLTNzLTEuMzQzLTMtMy0zLTMgMS4zNDMtMyAzIDEuMzQzIDMgMyAzem0wIDM2YzEuNjU3IDAgMy0xLjM0MyAzLTNzLTEuMzQzLTMtMy0zLTMgMS4zNDMtMyAzIDEuMzQzIDMgMyAzeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

      {/* Floating decoration */}
      <div className="absolute top-10 right-20 w-48 h-48 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute bottom-10 left-20 w-64 h-64 rounded-full bg-comfindo-gold/5 blur-3xl" />

      <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20 relative z-10 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
          {title.includes("Kompetensi") ? (
            <>Siap Meningkatkan <span className="text-comfindo-gold">Kompetensi</span> Anda?</>
          ) : (
            title
          )}
        </h2>
        <p className="text-lg text-white/75 max-w-2xl mx-auto mb-12 leading-relaxed">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="h-14 px-10 text-base font-semibold bg-comfindo-gold text-[hsl(210,50%,10%)] hover:bg-[#eab308] shadow-xl hover:shadow-2xl transition-all rounded-xl gap-2"
          >
            <Link href="/training">
              Lihat Program
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-14 px-10 text-base font-semibold border-2 border-white/30 text-white bg-white/5 hover:bg-white/15 hover:border-white/50 backdrop-blur-sm rounded-xl gap-2"
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" />
              WhatsApp Kami
            </a>
          </Button>
        </div>

        {/* Contact info */}
        <div className="mt-10 flex items-center justify-center gap-2 text-white/60">
          <Phone className="h-4 w-4" />
          <span className="text-sm">Atau hubungi: {phone}</span>
        </div>
      </div>
    </section>
  )
}
