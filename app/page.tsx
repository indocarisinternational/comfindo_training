import { createClient } from "@/lib/supabase/server"
import { Hero } from "@/components/sections/Hero"
import { ServicesSection } from "@/components/sections/Services"
import { WhyUsSection } from "@/components/sections/WhyUs"
import { LatestTrainingSection } from "@/components/sections/LatestTraining"
import { TestimonialsSection } from "@/components/sections/Testimonials"
import { FAQSection } from "@/components/sections/FAQ"
import { CTASection } from "@/components/sections/CTA"
import { ClientsSection } from "@/components/sections/Clients"

export const revalidate = 300

export default async function Home() {
  const supabase = await createClient()

  const [homepageRes, trainingsRes, faqsRes, testimonialsRes] = await Promise.all([
    supabase.from("homepage_content").select("*").limit(1).single(),
    supabase.from("training_programs").select("*").eq("is_published", true).eq("is_featured", true).order("created_at", { ascending: false }).limit(4),
    supabase.from("faqs").select("*").eq("is_published", true).order("sort_order"),
    supabase.from("testimonials").select("*").eq("is_published", true).order("sort_order"),
  ])

  const homepage = homepageRes.data
  const trainings = trainingsRes.data || []
  const faqs = faqsRes.data || []
  const testimonials = testimonialsRes.data || []
  const features = homepage?.features || {}

  return (
    <div className="flex flex-col min-h-screen">
      <Hero
        title={homepage?.hero_title}
        subtitle={homepage?.hero_subtitle}
        ctaText={homepage?.hero_cta_text}
        ctaLink={homepage?.hero_cta_link}
        stats={features.stats}
        heroFeatures={features.hero_features}
      />
      <ClientsSection partners={features.partners} />
      <ServicesSection trainings={trainings} />
      <WhyUsSection reasons={features.why_us} />
      <LatestTrainingSection trainings={trainings} />
      <TestimonialsSection testimonials={testimonials.length > 0 ? testimonials : features.testimonials} />
      <FAQSection faqs={faqs.length > 0 ? faqs : features.faq} />
      <CTASection
        title={features.cta?.title}
        subtitle={features.cta?.subtitle}
        phone={features.cta?.phone}
        whatsappUrl={features.cta?.whatsapp_url}
      />
    </div>
  )
}
