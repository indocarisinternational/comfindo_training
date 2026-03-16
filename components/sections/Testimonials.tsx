import { Star, Quote } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const testimonials = [
  {
    name: "Rina Amelia, S.Pd",
    role: "Guru / Pengajar",
    content: "Pelatihan di comfindo Management sangat membantu saya mendapatkan sertifikasi yang diakui secara nasional. Materinya relevan dan trainer sangat kompeten.",
    rating: 5,
    initial: "R",
  },
  {
    name: "Ahmad Fauzi, S.E",
    role: "Staff HRD",
    content: "Proses sertifikasi BNSP berjalan lancar dengan bimbingan dari tim comfindo. Harganya juga sangat terjangkau dibanding lembaga lain.",
    rating: 5,
    initial: "A",
  },
  {
    name: "Dewi Lestari, M.M",
    role: "Manajer Operasional",
    content: "Saya sangat puas dengan program In House Training dari comfindo Management. Tim kami sekarang lebih kompeten dan tersertifikasi.",
    rating: 5,
    initial: "D",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-[hsl(152,20%,97%)]">
      <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20">
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-4 px-4 py-1 text-[hsl(152,69%,31%)] border-[hsl(152,69%,31%)]/30 bg-[hsl(152,69%,31%)]/5">
            Testimoni
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Apa Kata <span className="text-[hsl(152,69%,31%)]">Alumni</span> Kami?
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Dengarkan pengalaman para alumni comfindo Management yang telah meningkatkan kompetensinya.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative bg-white rounded-2xl p-7 shadow-md border border-gray-50 hover:shadow-lg transition-all duration-300 group"
            >
              {/* Quote icon */}
              <div className="absolute top-5 right-5 text-[hsl(152,69%,31%)]/10">
                <Quote className="h-10 w-10" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[hsl(45,100%,51%)] text-[hsl(45,100%,51%)]" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-[hsl(152,69%,31%)] to-[hsl(152,50%,40%)] text-white font-bold text-sm shadow-md">
                  {t.initial}
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
