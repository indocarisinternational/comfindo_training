import Link from "next/link"
import { Calendar, MapPin, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const trainings = [
  {
    title: "Training Internal Audit ISO 9001:2015",
    date: "25-26 Oktober 2024",
    location: "Online Zoom",
    duration: "2 Hari",
    category: "ISO 9001",
    status: "Open",
  },
  {
    title: "Awareness ISO 27001:2022",
    date: "10 November 2024",
    location: "Jakarta",
    duration: "1 Hari",
    category: "ISO 27001",
    status: "Limited",
  },
  {
    title: "Lead Auditor ISO 45001:2018",
    date: "5-9 Desember 2024",
    location: "Bali",
    duration: "5 Hari",
    category: "ISO 45001",
    status: "Open",
  },
]

export function LatestTrainingSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">Jadwal Training Terbaru</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Tingkatkan kompetensi tim Anda dengan pelatihan bersertifikat.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/training">Lihat Semua Jadwal</Link>
          </Button>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trainings.map((training, i) => (
            <Card key={i} className="flex flex-col">
              <CardHeader>
                <div className="mb-2 flex justify-between">
                  <Badge variant="secondary">{training.category}</Badge>
                  <Badge variant={training.status === "Limited" ? "destructive" : "default"}>{training.status}</Badge>
                </div>
                <CardTitle className="line-clamp-2">{training.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{training.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{training.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{training.location}</span>
                </div>
              </CardContent>
              <CardFooter>
                 <Button className="w-full" asChild>
                    <Link href={`/training/detail`}>Daftar Sekarang</Link>
                 </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
