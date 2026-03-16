import Link from "next/link"
import { trainings } from "@/lib/data/trainings"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Tag } from "lucide-react"

export function ServicesSection() {
  const featured = trainings.slice(0, 4)

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20">
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-4 px-4 py-1 text-[hsl(152,69%,31%)] border-[hsl(152,69%,31%)]/30 bg-[hsl(152,69%,31%)]/5">
            Produk Unggulan
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Program <span className="text-[hsl(152,69%,31%)]">Sertifikasi</span> Terbaru
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Tingkatkan kompetensi Anda dengan program pelatihan dan sertifikasi berkualitas dari comfindo Management.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item) => (
            <Card key={item.slug} className="group flex flex-col overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl">
              {/* Image placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-[hsl(152,40%,92%)] to-[hsl(152,30%,85%)] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="text-[hsl(152,69%,31%)] opacity-20 text-6xl font-black">
                  {item.category.charAt(0)}
                </div>
                <Badge className="absolute top-3 left-3 bg-[hsl(152,69%,31%)] text-white text-xs shadow-md">
                  {item.category}
                </Badge>
              </div>
              <CardContent className="flex-1 p-5">
                <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-[48px] group-hover:text-[hsl(152,69%,31%)] transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1.5 mt-3 text-[hsl(152,69%,31%)]">
                  <Tag className="h-3.5 w-3.5" />
                  <span className="font-bold text-sm">{item.price}</span>
                </div>
              </CardContent>
              <CardFooter className="p-5 pt-0">
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-between text-[hsl(152,69%,31%)] hover:bg-[hsl(152,69%,31%)]/5 group/btn rounded-xl"
                >
                  <Link href={`/training/${item.slug}`}>
                    Lihat Detail
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="bg-[hsl(152,69%,31%)] hover:bg-[hsl(152,75%,22%)] text-white rounded-xl h-12 px-8 shadow-md hover:shadow-lg transition-all"
          >
            <Link href="/training">
              Lihat Semua Program
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
