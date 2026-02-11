import { Hero } from "@/components/sections/Hero"
import { ServicesSection } from "@/components/sections/Services"
import { WhyUsSection } from "@/components/sections/WhyUs"
import { ClientsSection } from "@/components/sections/Clients"
import { TestimonialsSection } from "@/components/sections/Testimonials"
import { LatestTrainingSection } from "@/components/sections/LatestTraining"
import { FAQSection } from "@/components/sections/FAQ"
import { CTASection } from "@/components/sections/CTA"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ClientsSection />
      <ServicesSection />
      <WhyUsSection />
      <LatestTrainingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </div>
  )
}
