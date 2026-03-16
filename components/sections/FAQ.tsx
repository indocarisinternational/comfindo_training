import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

const faqs = [
  {
    question: "Apa itu comfindo Management?",
    answer: "comfindo Management adalah lembaga pelatihan dan sertifikasi yang bertujuan untuk mencerdaskan kehidupan bangsa dan menciptakan alumni yang kompeten dibidangnya. Kami berfokus pada silabus berbasis Standar Kompetensi Kerja Nasional Indonesia (SKKNI).",
  },
  {
    question: "Apa perbedaan sertifikasi BNSP dan Non BNSP?",
    answer: "Sertifikasi BNSP adalah sertifikasi kompetensi yang diakui secara nasional oleh Badan Nasional Sertifikasi Profesi, sementara sertifikasi Non BNSP (Sertifikasi comfindo) adalah sertifikasi kompetensi yang dikeluarkan oleh comfindo Management sebagai bukti telah mengikuti pelatihan.",
  },
  {
    question: "Bagaimana cara mendaftar pelatihan?",
    answer: "Anda bisa mendaftar melalui website kami dengan memilih program pelatihan yang diminati, lalu klik tombol 'Daftar'. Anda juga bisa menghubungi kami melalui WhatsApp di 0858-7066-3856.",
  },
  {
    question: "Apakah pelatihan tersedia online?",
    answer: "Ya, sebagian besar program pelatihan kami tersedia secara online melalui platform Zoom, sehingga Anda bisa mengikuti pelatihan dari mana saja.",
  },
  {
    question: "Berapa lama proses mendapatkan sertifikat?",
    answer: "Sertifikat akan dikirimkan dalam waktu 7-14 hari kerja setelah program pelatihan selesai dan Anda dinyatakan kompeten.",
  },
  {
    question: "Apakah ada program In House Training?",
    answer: "Ya, kami menyediakan program In House Training untuk perusahaan atau instansi yang ingin melatih karyawannya secara khusus. Hubungi kami untuk penawaran khusus.",
  },
]

export function FAQSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container max-w-4xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20">
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-4 px-4 py-1 text-[hsl(152,69%,31%)] border-[hsl(152,69%,31%)]/30 bg-[hsl(152,69%,31%)]/5">
            FAQ
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Pertanyaan <span className="text-[hsl(152,69%,31%)]">Umum</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Jawaban untuk pertanyaan yang sering diajukan tentang comfindo Management.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-gray-100 rounded-xl px-6 data-[state=open]:border-[hsl(152,69%,31%)]/30 data-[state=open]:bg-[hsl(152,69%,31%)]/3 transition-all shadow-sm"
            >
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[hsl(152,69%,31%)] hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-500 leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
