import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Tag, ArrowRight } from "lucide-react"
import { TrainingCardImage } from "@/components/training/TrainingCardImage"

interface LatestTrainingProps {
  trainings?: any[]
}

export function LatestTrainingSection({ trainings = [] }: LatestTrainingProps) {
  const latestTrainings = trainings.slice(0, 3)

  const getLowestPrice = (training: any) => {
    const parsePrice = (p: string) => {
      if (!p) return Infinity;
      const num = parseInt(p.replace(/\D/g, ''));
      return isNaN(num) ? Infinity : num;
    };
    
    const online = parsePrice(training.price_online);
    const offline = parsePrice(training.price_offline);
    const lowest = Math.min(online, offline);
    
    if (lowest === Infinity) {
      if (!training.price) return "Hubungi Kami";
      const oldPrice = parsePrice(training.price);
      if (oldPrice === Infinity) return training.price;
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(oldPrice);
    }
    
    const formatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(lowest);
    return `Mulai ${formatted}`;
  }

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20">
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-4 px-4 py-1 text-comfindo-green border-comfindo-green/30 bg-comfindo-green/5">
            Jadwal Terbaru
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Program <span className="text-comfindo-green">Pelatihan</span> Mendatang
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Jangan lewatkan program pelatihan dan sertifikasi terbaru dari comfindo Management.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latestTrainings.map((training) => (
            <Card key={training.slug || training.id} className="group flex flex-col overflow-hidden border-0 shadow-md rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-44 overflow-hidden bg-gradient-to-br from-[hsl(152,40%,90%)] to-[hsl(152,30%,82%)]">
                <TrainingCardImage
                  imageUrl={training.image_url}
                  title={training.title}
                  category={training.category}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge className="bg-comfindo-green text-white text-xs shadow-md">
                    {training.category}
                  </Badge>
                  <Badge variant="secondary" className="text-xs bg-white/90 text-gray-700 shadow-sm">
                    {(training.method || "").includes("Online") ? "Online" : "Offline"}
                  </Badge>
                </div>
              </div>


              <CardContent className="flex-1 p-5 space-y-3">
                <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-[48px] group-hover:text-comfindo-green transition-colors">
                  {training.title}
                </h3>
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-comfindo-green" />
                    <span>{training.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-comfindo-green" />
                    <span>{training.duration} | {training.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-comfindo-green" />
                    <span>{training.method}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 pt-1 text-comfindo-green">
                  <Tag className="h-3.5 w-3.5" />
                  <span className="font-bold text-sm">
                    {getLowestPrice(training)}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="p-5 pt-0">
                <Button
                  asChild
                  className="w-full bg-comfindo-green hover:bg-comfindo-green-dark text-white rounded-xl shadow-sm"
                >
                  <Link href={`/training/${training.slug}`}>
                    Lihat Detail & Daftar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-comfindo-green text-comfindo-green hover:bg-comfindo-green hover:text-white rounded-xl h-12 px-8 transition-all"
          >
            <Link href="/training">
              Lihat Semua Jadwal
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
