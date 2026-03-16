import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, MessageCircle } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 comfindo-gradient" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE4YzEuNjU3IDAgMy0xLjM0MyAzLTNzLTEuMzQzLTMtMy0zLTMgMS4zNDMtMyAzIDEuMzQzIDMgMyAzem0wIDM2YzEuNjU3IDAgMy0xLjM0MyAzLTNzLTEuMzQzLTMtMy0zLTMgMS4zNDMtMyAzIDEuMzQzIDMgMyAzeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

      {/* Floating decoration */}
      <div className="absolute top-10 right-20 w-48 h-48 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute bottom-10 left-20 w-64 h-64 rounded-full bg-[hsl(45,100%,51%)]/5 blur-3xl" />

      <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20 relative z-10 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
          Siap Meningkatkan <span className="text-[hsl(45,100%,60%)]">Kompetensi</span> Anda?
        </h2>
        <p className="text-lg text-white/75 max-w-2xl mx-auto mb-12 leading-relaxed">
          Bergabunglah dengan ratusan alumni comfindo Management yang telah meningkatkan kompetensi dan karier mereka. Hubungi kami sekarang!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="h-14 px-10 text-base font-semibold bg-[hsl(45,100%,51%)] text-[hsl(210,50%,10%)] hover:bg-[hsl(45,100%,58%)] shadow-xl hover:shadow-2xl transition-all rounded-xl gap-2"
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
            <a href="https://wa.me/6285870663856" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" />
              WhatsApp Kami
            </a>
          </Button>
        </div>

        {/* Contact info */}
        <div className="mt-10 flex items-center justify-center gap-2 text-white/60">
          <Phone className="h-4 w-4" />
          <span className="text-sm">Atau hubungi: 0858-7066-3856</span>
        </div>
      </div>
    </section>
  )
}
