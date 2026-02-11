import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Berapa lama proses sertifikasi ISO?",
    answer: "Durasi proses sertifikasi bervariasi tergantung pada ukuran dan kompleksitas organisasi Anda, serta jenis standar ISO yang diterapkan. Umumnya berkisar antara 3 hingga 6 bulan.",
  },
  {
    question: "Apakah sertifikat ISO diakui secara internasional?",
    answer: "Ya, sertifikat ISO yang kami bantu proseskan diterbitkan oleh Badan Sertifikasi yang terakreditasi KAN (Komite Akreditasi Nasional) atau badan akreditasi internasional lainnya, sehingga diakui secara global.",
  },
  {
    question: "Apa perbedaan konsultasi dan training?",
    answer: "Konsultasi berfokus pada pendampingan penerapan sistem manajemen hingga sertifikasi, sedangkan training berfokus pada peningkatan kompetensi personel dalam memahami dan menjalankan standar ISO.",
  },
  {
    question: "Apakah tersedia training online?",
    answer: "Ya, kami menyediakan training secara online (via Zoom) maupun offline (in-house atau public training) sesuai kebutuhan perusahaan Anda.",
  },
]

export function FAQSection() {
  return (
    <section className="bg-muted/30 py-16">
      <div className="container max-w-3xl">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-primary">Pertanyaan yang Sering Diajukan</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
