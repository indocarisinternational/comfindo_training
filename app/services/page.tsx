import { PageHeader } from "@/components/common/PageHeader"
import { services } from "@/lib/data/services"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Layanan Konsultasi ISO - MSI Consulting",
  description: "Daftar layanan konsultasi ISO kami: ISO 9001, 14001, 45001, 27001. Solusi sertifikasi terpercaya untuk bisnis Anda.",
}

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Layanan Kami"
        description="Solusi komprehensif untuk kebutuhan sertifikasi dan standar manajemen perusahaan Anda."
        breadcrumbs={[{ label: "Services", href: "/services" }]}
      />
      
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.slug} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground line-clamp-3">
                    {service.content}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="w-full justify-between hover:bg-primary/5 group">
                    <Link href={`/services/${service.slug}`}>
                      Lihat Detail
                      <ChevronRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
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
