import { Zap, CheckCircle2, Users, Trophy } from "lucide-react"

const features = [
  {
    name: "Terjamin Lulus",
    description: "Garansi kelulusan sertifikasi ISO dengan pendampingan penuh hingga audit selesai.",
    icon: Trophy,
  },
  {
    name: "Konsultan Berpengalaman",
    description: "Tim ahli dengan pengalaman lebih dari 10 tahun di berbagai industri.",
    icon: Users,
  },
  {
    name: "Proses Cepat & Efisien",
    description: "Metodologi yang terstruktur untuk menghemat waktu dan biaya perusahaan Anda.",
    icon: Zap,
  },
  {
    name: "Legalitas Resmi",
    description: "Lembaga resmi dan terpercaya dengan legalitas yang jelas.",
    icon: CheckCircle2, // Corrected icon name
  },
]

export function WhyUsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">Mengapa Memilih Kami?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Komitmen kami untuk memberikan layanan terbaik bagi pertumbuhan bisnis Anda.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.name} className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold">{feature.name}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
