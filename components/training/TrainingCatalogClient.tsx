"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Tag, ArrowRight, Search, ChevronDown } from "lucide-react"
import { useState, useMemo } from "react"

const categories = ["Semua", "Sertifikasi BNSP", "Sertifikasi comfindo", "Public Training (Offline)", "Public Training (Online)", "In House Training"]
const months = [
  "Semua Bulan", "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
]

export function TrainingCatalogClient({ initialTrainings }: { initialTrainings: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [selectedMonth, setSelectedMonth] = useState("Semua Bulan")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTrainings = useMemo(() => {
    return initialTrainings.filter((t) => {
      const matchesCategory = selectedCategory === "Semua" || t.category === selectedCategory
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesMonth = selectedMonth === "Semua Bulan" || (t.date && t.date.toLowerCase().includes(selectedMonth.toLowerCase())) || t.date === "Setiap Bulan"
      return matchesCategory && matchesSearch && matchesMonth
    })
  }, [selectedCategory, selectedMonth, searchQuery, initialTrainings])

  return (
    <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20">
      {/* Filters */}
      <div className="space-y-8 mb-12">
        <div className="flex flex-col gap-4">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Kategori Program</label>
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${selectedCategory === cat
                  ? "bg-comfindo-green text-white shadow-lg shadow-comfindo-green/20 border border-comfindo-green"
                  : "bg-white text-gray-600 border border-gray-200 shadow-sm hover:border-comfindo-green/30 hover:shadow-md hover:text-gray-900"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5 items-stretch md:items-center pt-2 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="h-4.5 w-4.5" />
              </div>
              <input
                type="text"
                placeholder="Cari kursus atau sertifikasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-4 focus:ring-comfindo-green/5 focus:border-comfindo-green/50 placeholder:text-gray-300 transition-all shadow-sm"
              />
            </div>
            <div className="relative min-w-[180px]">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="appearance-none w-full pl-4 pr-10 py-3 rounded-2xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-4 focus:ring-comfindo-green/5 focus:border-comfindo-green/50 transition-all cursor-pointer shadow-sm"
              >
                {months.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-medium text-gray-400">
              <span className="text-gray-900">{filteredTrainings.length}</span> Program tersedia
            </p>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-400 mb-6">
        Menampilkan {filteredTrainings.length} program
      </p>

      {filteredTrainings.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTrainings.map((training) => (
            <Card key={training.slug || training.id} className="group flex flex-col overflow-hidden border-0 shadow-md rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-44 bg-linear-to-br from-[hsl(152,40%,92%)] to-[hsl(152,30%,85%)] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                <div className="text-comfindo-green opacity-15 text-5xl font-black">
                  {(training.category || "").split(" ").pop()}
                </div>
                <Badge className="absolute top-3 left-3 bg-comfindo-green text-white text-xs shadow-md">
                  {training.category}
                </Badge>
              </div>
              <CardContent className="flex-1 p-5 space-y-3">
                <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-[48px] text-sm group-hover:text-comfindo-green transition-colors">
                  {training.title}
                </h3>
                <div className="space-y-1.5 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3 text-comfindo-green" />
                    <span>{training.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-comfindo-green" />
                    <span>{training.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-comfindo-green" />
                    <span>{training.method}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  <Tag className="h-3.5 w-3.5 text-comfindo-green" />
                  <span className="font-bold text-sm text-comfindo-green">{training.price}</span>
                </div>
              </CardContent>
              <CardFooter className="p-5 pt-0">
                <Button asChild className="w-full bg-comfindo-green hover:bg-comfindo-green-dark text-white rounded-xl shadow-sm text-sm">
                  <Link href={`/training/${training.slug}`}>
                    Lihat Detail
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">Tidak ada program yang ditemukan.</p>
          <p className="text-gray-300 text-sm mt-2">Coba ubah filter atau kata kunci pencarian.</p>
        </div>
      )}
    </div>
  )
}
