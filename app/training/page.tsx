import { PageHeader } from "@/components/common/PageHeader"
import { createClient } from "@/lib/supabase/server"
import { Metadata } from "next"
import { TrainingCatalogClient } from "@/components/training/TrainingCatalogClient"

export const revalidate = 300

export const metadata: Metadata = {
  title: "Katalog Pelatihan ISO 9001 dan Sertifikasi | comfindo Management",
  description: "Temukan program pelatihan ISO 9001, training sistem manajemen mutu, in-house training, dan sertifikasi kompetensi bersama comfindo Management.",
}

export default async function TrainingPage() {
  const supabase = await createClient()
  const { data: trainings } = await supabase
    .from("training_programs")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })

  const initialTrainings = trainings || []

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Beranda",
                "item": "https://www.comfindo.co.id"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Pelatihan",
                "item": "https://www.comfindo.co.id/training"
              }
            ]
          })
        }}
      />
      <PageHeader
        title="Katalog Pelatihan"
        description="Pilih program pelatihan dan sertifikasi terbaik untuk meningkatkan kompetensi Anda."
        breadcrumbs={[{ label: "Pelatihan", href: "/training" }]}
      />

      <section className="py-12 md:py-16">
        <TrainingCatalogClient initialTrainings={initialTrainings} />
      </section>
    </div>
  )
}
