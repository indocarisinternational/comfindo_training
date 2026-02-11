import { Badge } from "@/components/ui/badge"

const partners = [
  "BNSP", "Kemnaker RI", "BKSP", "LSP", "SKKNI", "Kemendikbud"
]

export function ClientsSection() {
  return (
    <section className="py-12 md:py-16 bg-[hsl(152,15%,96%)] border-y border-gray-100">
      <div className="container">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Mitra & Afiliasi</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {partners.map((partner) => (
            <div
              key={partner}
              className="flex items-center justify-center px-8 py-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <span className="text-base font-bold text-gray-400 hover:text-[hsl(152,69%,31%)] transition-colors">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
