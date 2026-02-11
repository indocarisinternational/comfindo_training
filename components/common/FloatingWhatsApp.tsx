"use client"

import { MessageCircle } from "lucide-react"

export function FloatingWhatsApp() {
  const phoneNumber = "6281234567890" // Replace with actual number
  const message = encodeURIComponent("Halo MSI Consulting, saya ingin konsultasi ISO")
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-8 w-8" />
    </a>
  )
}
