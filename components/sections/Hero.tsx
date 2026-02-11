import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      <div className="container relative z-10 flex flex-col items-center text-center">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Solusi <span className="text-primary">Sertifikasi ISO</span> & <br className="hidden sm:inline" />
          Training Profesional
        </h1>
        <p className="mb-8 max-w-[800px] text-lg text-muted-foreground sm:text-xl">
          MSI Consulting membantu perusahaan Anda mencapai standar internasional melalui layanan konsultasi dan pelatihan ISO yang terpercaya, cepat, dan terjangkau.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="h-12 px-8 text-lg">
            <Link href="/contact">Konsultasi Gratis</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 px-8 text-lg">
            <Link href="/services">Lihat Layanan Kami</Link>
          </Button>
        </div>
      </div>
      
      {/* Background Graphic Elements */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute top-0 right-0 -z-10 h-[400px] w-[400px] bg-blue-400/10 blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] bg-indigo-400/10 blur-3xl opacity-50" />
    </section>
  )
}
