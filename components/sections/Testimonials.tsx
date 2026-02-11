import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Budi Santoso",
    role: "HSE Manager, PT Konstruksi Jaya",
    content: "MSI Consulting sangat membantu kami dalam meraih sertifikasi ISO 45001. Prosesnya cepat dan konsultan sangat responsif.",
    rating: 5,
  },
  {
    name: "Siti Aminah",
    role: "Quality Control, PT Makanan Sehat",
    content: "Training Internal Audit ISO 9001 yang diadakan sangat insightful. Materi mudah dipahami dan aplikatif.",
    rating: 5,
  },
  {
    name: "Rahmat Wijaya",
    role: "IT Manager, Tech Solutions",
    content: "Pendampingan ISO 27001 berjalan lancar. Konsultan sangat menguasai teknis keamanan informasi.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-muted/50 py-16 md:py-24">
      <div className="container">
         <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">Apa Kata Klien Kami?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Testimoni jujur dari klien yang telah bekerjasama dengan kami.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="flex flex-col">
              <CardHeader>
                <div className="flex gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} />
                  ))}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>
              </CardContent>
              <CardFooter className="flex flex-col items-start pt-4 border-t">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
