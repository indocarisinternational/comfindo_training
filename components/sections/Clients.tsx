import Link from "next/link"

const clients = [
  "PT Pertamina Persero",
  "PT PLN (Persero)",
  "Telkom Indonesia",
  "Bank Mandiri",
  "PT Adaro Energy",
  "Astra International",
  "Unilever Indonesia",
  "PT KAI (Persero)", 
]

export function ClientsSection() {
  return (
    <section className="bg-muted/30 py-16">
      <div className="container">
        <h2 className="mb-8 text-center text-2xl font-semibold text-muted-foreground">
          Dipercaya oleh Perusahaan Terkemuka
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {clients.map((client) => (
            <div key={client} className="flex h-16 items-center justify-center grayscale transition-all hover:grayscale-0">
               {/* Placeholder for Client Logo */}
               <span className="text-xl font-bold text-muted-foreground/80">{client}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
