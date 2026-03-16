"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Award, Users, BookOpen, CheckCircle, ArrowRight, Calendar } from "lucide-react"
import { useState, useEffect } from "react"

export function Hero() {
  const [dateStr, setDateStr] = useState("")

  useEffect(() => {
    const today = new Date()
    const day = today.getDate()
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
    setDateStr(`${day} ${months[today.getMonth()]}`)
  }, [])

  return (
    <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center">
      {/* Background */}
      <div className="absolute inset-0 comfindo-hero-gradient" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE4YzEuNjU3IDAgMy0xLjM0MyAzLTNzLTEuMzQzLTMtMy0zLTMgMS4zNDMtMyAzIDEuMzQzIDMgMyAzem0wIDM2YzEuNjU3IDAgMy0xLjM0MyAzLTNzLTEuMzQzLTMtMy0zLTMgMS4zNDMtMyAzIDEuMzQzIDMgMyAzeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

      {/* Floating decorations */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-white/5 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-[hsl(152,50%,45%)]/10 blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-[hsl(45,100%,51%)]/5 blur-2xl animate-float" style={{ animationDelay: "1s" }} />

      <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20 relative z-10 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col text-white max-w-xl">
            {/* Date Badge */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                <Calendar className="h-4 w-4 text-[hsl(45,100%,60%)]" />
                <span className="text-sm font-medium text-white/90">{dateStr}</span>
              </div>
              <div className="bg-[hsl(45,100%,51%)] text-[hsl(210,50%,10%)] text-xs font-bold px-3 py-1.5 rounded-full">
                Sertifikasi comfindo
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              Lembaga{" "}
              <span className="text-[hsl(45,100%,60%)]">Pelatihan</span>
              <br />
              dan{" "}
              <span className="relative">
                Sertifikasi
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M1 5.5Q50 1 100 5.5T199 5.5" stroke="hsl(45,100%,60%)" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Standar Kompetensi Kerja Nasional Indonesia (SKKNI). Kompetensi Bersertifikat BNSP dan Non BNSP. Wujudkan SDM kompeten bersama comfindo Management.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                asChild
                size="lg"
                className="h-13 px-8 text-base font-semibold bg-[hsl(45,100%,51%)] text-[hsl(210,50%,10%)] hover:bg-[hsl(45,100%,58%)] shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl"
              >
                <Link href="/training">
                  Lihat Katalog
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-13 px-8 text-base font-semibold border-2 border-white/30 text-white bg-white/5 hover:bg-white/15 hover:border-white/50 backdrop-blur-sm rounded-xl"
              >
                <Link href="/contact">Hubungi Kami</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "500+", label: "Alumni" },
                { value: "50+", label: "Program" },
                { value: "4.9★", label: "Rating" },
              ].map((stat) => (
                <div key={stat.label} className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                  <div className="text-xl sm:text-2xl font-bold text-[hsl(45,100%,60%)]">{stat.value}</div>
                  <div className="text-xs text-white/60 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="hidden lg:grid grid-cols-2 auto-rows-fr gap-5">
            {[
              { icon: Award, title: "Bersertifikat BNSP", desc: "Pengakuan kompetensi nasional" },
              { icon: BookOpen, title: "Silabus SKKNI", desc: "Kurikulum berbasis standar nasional" },
              { icon: Users, title: "Trainer Berpengalaman", desc: "Praktisi profesional di bidangnya" },
              { icon: CheckCircle, title: "Non BNSP", desc: "Sertifikasi kompetensi comfindo" },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group flex flex-col bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(45,100%,51%)]/15 text-[hsl(45,100%,60%)] mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                <p className="text-white/60 text-sm flex-1">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
