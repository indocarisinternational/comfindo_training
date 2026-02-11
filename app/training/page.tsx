"use client"

import { PageHeader } from "@/components/common/PageHeader"
import { trainings } from "@/lib/data/trainings"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Tag, ArrowRight, Search, ChevronDown } from "lucide-react"
import { useState, useMemo } from "react"

const categories = ["Semua", "Sertifikasi BNSP", "Sertifikasi ESAS", "In House Training"]
const months = [
  "Semua Bulan", "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
]

export default function TrainingPage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [selectedMonth, setSelectedMonth] = useState("Semua Bulan")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTrainings = useMemo(() => {
    return trainings.filter((t) => {
      const matchesCategory = selectedCategory === "Semua" || t.category === selectedCategory
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesMonth = selectedMonth === "Semua Bulan" || t.date.toLowerCase().includes(selectedMonth.toLowerCase()) || t.date === "Setiap Bulan"
      return matchesCategory && matchesSearch && matchesMonth
    })
  }, [selectedCategory, selectedMonth, searchQuery])

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Katalog Pelatihan"
        description="Pilih program pelatihan dan sertifikasi terbaik untuk meningkatkan kompetensi Anda."
        breadcrumbs={[{ label: "Pelatihan", href: "/training" }]}
      />

      <section className="py-12 md:py-16">
        <div className="container">
          {/* Filters */}
          <div className="flex flex-col gap-4 mb-10">
            {/* Top row: Category Tabs + Month + Search */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${selectedCategory === cat
                      ? "bg-[hsl(152,69%,31%)] text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex gap-3 md:ml-auto">
                {/* Month Filter */}
                <div className="relative">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(152,69%,31%)]/20 focus:border-[hsl(152,69%,31%)] transition-all cursor-pointer min-w-[150px]"
                  >
                    {months.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Search */}
                <div className="relative md:w-60">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari program..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(152,69%,31%)]/20 focus:border-[hsl(152,69%,31%)] transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-gray-400 mb-6">
            Menampilkan {filteredTrainings.length} program
          </p>

          {/* Product Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTrainings.map((training) => (
              <Card key={training.slug} className="group flex flex-col overflow-hidden border-0 shadow-md rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Image area */}
                <div className="relative h-44 bg-gradient-to-br from-[hsl(152,40%,92%)] to-[hsl(152,30%,85%)] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="text-[hsl(152,69%,31%)] opacity-15 text-5xl font-black">
                    {training.category.split(" ").pop()}
                  </div>
                  <Badge className="absolute top-3 left-3 bg-[hsl(152,69%,31%)] text-white text-xs shadow-md">
                    {training.category}
                  </Badge>
                </div>

                <CardContent className="flex-1 p-5 space-y-3">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-[48px] text-sm group-hover:text-[hsl(152,69%,31%)] transition-colors">
                    {training.title}
                  </h3>
                  <div className="space-y-1.5 text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3 text-[hsl(152,69%,31%)]" />
                      <span>{training.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3 text-[hsl(152,69%,31%)]" />
                      <span>{training.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 text-[hsl(152,69%,31%)]" />
                      <span>{training.method}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 pt-1">
                    <Tag className="h-3.5 w-3.5 text-[hsl(152,69%,31%)]" />
                    <span className="font-bold text-sm text-[hsl(152,69%,31%)]">{training.price}</span>
                  </div>
                </CardContent>

                <CardFooter className="p-5 pt-0">
                  <Button
                    asChild
                    className="w-full bg-[hsl(152,69%,31%)] hover:bg-[hsl(152,75%,22%)] text-white rounded-xl shadow-sm text-sm"
                  >
                    <Link href={`/training/${training.slug}`}>
                      Lihat Detail
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredTrainings.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">Tidak ada program yang ditemukan.</p>
              <p className="text-gray-300 text-sm mt-2">Coba ubah filter atau kata kunci pencarian.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
