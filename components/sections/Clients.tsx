"use client"

const partners = [
  "BNSP", "Kemnaker RI", "BKSP", "LSP", "SKKNI", "Kemendikbud",
  "comfindo", "ISO 9001", "Kemenkes RI", "BAN-PT"
]

export function ClientsSection() {
  // Duplicate for seamless loop
  const marqueeItems = [...partners, ...partners]

  return (
    <section className="py-14 md:py-20 bg-[hsl(152,15%,96%)] border-y border-gray-100 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Mitra & Afiliasi</p>
        </div>
      </div>

      {/* Marquee Wrapper with limited width */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-2xl border border-gray-100/50">
          {/* Fade edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, hsl(152,15%,96%), transparent)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, hsl(152,15%,96%), transparent)" }}
          />

          {/* Scrolling track - using global animate-marquee class */}
          <div className="flex items-center gap-6 animate-marquee pause-hover w-max py-4">
            {marqueeItems.map((partner, i) => (
              <div
                key={`${partner}-${i}`}
                className="flex-shrink-0 flex items-center justify-center px-8 py-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-comfindo-green/20 transition-all duration-300 hover:-translate-y-1 cursor-default"
              >
                <span className="text-base font-bold text-gray-400 hover:text-comfindo-green transition-colors whitespace-nowrap">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

