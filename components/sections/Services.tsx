import Link from "next/link"
import { ShieldCheck, Globe, Award, Lock, Leaf } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const services = [
  {
    title: "ISO 9001:2015",
    description: "Sistem Manajemen Mutu untuk meningkatkan kepuasan pelanggan dan efisiensi operasional.",
    icon: Award,
    href: "/services/iso-9001",
  },
  {
    title: "ISO 14001:2015",
    description: "Sistem Manajemen Lingkungan untuk meminimalkan dampak lingkungan dari operasional bisnis.",
    icon: Leaf,
    href: "/services/iso-14001",
  },
  {
    title: "ISO 45001:2018",
    description: "Sistem Manajemen K3 untuk menciptakan lingkungan kerja yang aman dan sehat.",
    icon: ShieldCheck,
    href: "/services/iso-45001",
  },
  {
    title: "ISO 27001:2022",
    description: "Sistem Manajemen Keamanan Informasi untuk melindungi data dan aset informasi perusahaan.",
    icon: Lock,
    href: "/services/iso-27001",
  },
]

export function ServicesSection() {
  return (
    <section className="bg-muted/50 py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">Layanan Unggulan Kami</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Kami membantu perusahaan Anda mendapatkan sertifikasi ISO dengan proses yang mudah dan terjamin.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card key={service.title} className="flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <service.icon className="h-6 w-6" />
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full justify-start pl-0 text-primary hover:bg-transparent hover:text-primary/80">
                  <Link href={service.href}>Pelajari Selengkapnya &rarr;</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/services">Lihat Semua Layanan</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
