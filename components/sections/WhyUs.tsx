import { Badge } from "@/components/ui/badge"
import { Award, Shield, Users, BookOpen, TrendingUp, CheckCircle } from "lucide-react"

const defaultReasons = [
  { title: "Bersertifikat BNSP", description: "Program sertifikasi diakui secara nasional oleh Badan Nasional Sertifikasi Profesi." },
  { title: "Silabus Berbasis SKKNI", description: "Kurikulum disusun mengacu pada Standar Kompetensi Kerja Nasional Indonesia." },
  { title: "Trainer Profesional", description: "Para praktisi berpengalaman dan ahli di bidangnya masing-masing." },
  { title: "Legalitas Resmi", description: "Lembaga Pelatihan dan Konsultan Manajemen terdaftar secara resmi." },
  { title: "Jadwal Fleksibel", description: "Tersedia program online dan offline dengan jadwal yang beragam." },
  { title: "Harga Terjangkau", description: "Investasi terbaik untuk peningkatan kompetensi dan karier Anda." },
]

const icons = [Award, BookOpen, Users, Shield, TrendingUp, CheckCircle]

interface WhyUsProps {
  reasons?: { title: string; description: string }[]
}

export function WhyUsSection({ reasons }: WhyUsProps) {
  const displayReasons = reasons?.length ? reasons : defaultReasons

  return (
    <section className="py-20 md:py-28 bg-[hsl(152,20%,97%)]">
      <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20">
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-4 px-4 py-1 text-comfindo-green border-comfindo-green/30 bg-comfindo-green/5">
            Mengapa comfindo?
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Keunggulan <span className="text-comfindo-green">comfindo Management</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Kami berkomitmen menghadirkan pelatihan dan sertifikasi terbaik untuk menciptakan SDM yang kompeten.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayReasons.map((reason, i) => {
            const Icon = icons[i % icons.length]
            return (
              <div
                key={reason.title}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-comfindo-green/10 text-comfindo-green mb-5 group-hover:bg-comfindo-green group-hover:text-white transition-all duration-300">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{reason.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{reason.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
