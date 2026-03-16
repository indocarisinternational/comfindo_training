import { Award, Shield, Users, BookOpen, TrendingUp, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const reasons = [
  {
    icon: Award,
    title: "Bersertifikat BNSP",
    description: "Program sertifikasi diakui secara nasional oleh Badan Nasional Sertifikasi Profesi.",
  },
  {
    icon: BookOpen,
    title: "Silabus Berbasis SKKNI",
    description: "Kurikulum disusun mengacu pada Standar Kompetensi Kerja Nasional Indonesia.",
  },
  {
    icon: Users,
    title: "Trainer Profesional",
    description: "Para praktisi berpengalaman dan ahli di bidangnya masing-masing.",
  },
  {
    icon: Shield,
    title: "Legalitas Resmi",
    description: "Lembaga pelatihan dan sertifikasi terdaftar secara resmi.",
  },
  {
    icon: TrendingUp,
    title: "Jadwal Fleksibel",
    description: "Tersedia program online dan offline dengan jadwal yang beragam.",
  },
  {
    icon: CheckCircle,
    title: "Harga Terjangkau",
    description: "Investasi terbaik untuk peningkatan kompetensi dan karier Anda.",
  },
]

export function WhyUsSection() {
  return (
    <section className="py-20 md:py-28 bg-[hsl(152,20%,97%)]">
      <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20">
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-4 px-4 py-1 text-[hsl(152,69%,31%)] border-[hsl(152,69%,31%)]/30 bg-[hsl(152,69%,31%)]/5">
            Mengapa comfindo?
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Keunggulan <span className="text-[hsl(152,69%,31%)]">comfindo Management</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Kami berkomitmen menghadirkan pelatihan dan sertifikasi terbaik untuk menciptakan SDM yang kompeten.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[hsl(152,69%,31%)]/10 text-[hsl(152,69%,31%)] mb-5 group-hover:bg-[hsl(152,69%,31%)] group-hover:text-white transition-all duration-300">
                <reason.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{reason.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
