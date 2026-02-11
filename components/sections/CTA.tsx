import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container text-center">
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Siap Meningkatkan Standar Bisnis Anda?</h2>
        <p className="mb-8 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
          Hubungi kami sekarang untuk mendapatkan penawaran spesial konsultasi dan training ISO.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
           <Button asChild size="lg" variant="secondary" className="text-primary font-bold">
            <Link href="/contact">Hubungi Kami</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
            <Link href="/training">Lihat Jadwal Training</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
