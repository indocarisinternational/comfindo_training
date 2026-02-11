import { PageHeader } from "@/components/common/PageHeader"
import { trainings } from "@/lib/data/trainings"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Jadwal Training ISO Terbaru - MSI Consulting",
  description: "Dapatkan jadwal training ISO terbaru: ISO 9001, 14001, 45001, 27001. Training online dan offline dengan sertifikat resmi.",
}

export default function TrainingPage() {
  return (
    <div className="flex flex-col min-h-screen">
       <PageHeader
        title="Jadwal Training"
        description="Tingkatkan kompetensi Anda dan tim dengan mengikuti pelatihan bersertifikat dari MSI Consulting."
        breadcrumbs={[{ label: "Training", href: "/training" }]}
      />

      <section className="py-16 md:py-24">
        <div className="container">
          {/* Optional Filter UI could go here */}
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trainings.map((training) => (
              <Card key={training.slug} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="mb-2">{training.category}</Badge>
                    <Badge variant={training.method.includes("Online") ? "secondary" : "default"}>
                        {training.method.includes("Online") ? "Online" : "Offline"}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl line-clamp-2 min-h-[56px]">{training.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 space-y-3 text-sm text-muted-foreground">
                   <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{training.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{training.duration} | {training.time}</span>
                  </div>
                   <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{training.method}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/training/${training.slug}`}>
                      Lihat Detail & Daftar
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
