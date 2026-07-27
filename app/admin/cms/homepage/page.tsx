"use client"

import { useState, useTransition, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { AdminInput as Input } from "@/components/admin/ui/AdminInput"
import { AdminTextarea as Textarea } from "@/components/admin/ui/AdminTextarea"
import { AdminLabel as Label } from "@/components/admin/ui/AdminLabel"
import { AdminCard as Card, AdminCardContent as CardContent, AdminCardHeader as CardHeader, AdminCardTitle as CardTitle } from "@/components/admin/ui/AdminCard"
import { toast } from "sonner"
import { Save, Loader2, Plus, Trash2 } from "lucide-react"

interface HomepageData {
  id?: string
  hero_title: string
  hero_subtitle: string
  hero_cta_text: string
  hero_cta_link: string
  hero_image_url: string
  features: {
    stats: { value: string; label: string }[]
    hero_features: { title: string; description: string }[]
    why_us: { title: string; description: string }[]
    faq: { question: string; answer: string }[]
    testimonials: { name: string; role: string; content: string; rating: number }[]
    partners: string[]
    cta: { title: string; subtitle: string; phone: string; whatsapp_url: string }
  }
}

const defaultData: HomepageData = {
  hero_title: "Lembaga Pelatihan dan Konsultan Manajemen",
  hero_subtitle: "Standar Kompetensi Kerja Nasional Indonesia (SKKNI). Kompetensi Bersertifikat BNSP dan Non BNSP.",
  hero_cta_text: "Lihat Katalog",
  hero_cta_link: "/training",
  hero_image_url: "",
  features: {
    stats: [
      { value: "550+", label: "Alumni" },
      { value: "50+", label: "Program" },
      { value: "4.9★", label: "Rating" },
    ],
    hero_features: [
      { title: "Bersertifikat BNSP", description: "Pengakuan kompetensi nasional" },
      { title: "Silabus SKKNI", description: "Kurikulum berbasis standar nasional" },
      { title: "Trainer Berpengalaman", description: "Praktisi profesional di bidangnya" },
      { title: "Non BNSP", description: "Sertifikasi kompetensi comfindo" },
    ],
    why_us: [
      { title: "Bersertifikat BNSP", description: "Program sertifikasi diakui secara nasional oleh BNSP." },
      { title: "Silabus Berbasis SKKNI", description: "Kurikulum mengacu SKKNI." },
      { title: "Trainer Profesional", description: "Para praktisi berpengalaman." },
      { title: "Legalitas Resmi", description: "Lembaga terdaftar secara resmi." },
      { title: "Jadwal Fleksibel", description: "Program online dan offline." },
      { title: "Harga Terjangkau", description: "Investasi terbaik untuk kompetensi." },
    ],
    faq: [
      { question: "Apa itu comfindo Management?", answer: "comfindo Management adalah Lembaga Pelatihan dan Konsultan Manajemen." },
    ],
    testimonials: [
      { name: "Rina Amelia, S.Pd", role: "Guru / Pengajar", content: "Pelatihan sangat membantu.", rating: 5 },
    ],
    partners: ["BNSP", "Kemnaker RI", "BKSP", "LSP", "SKKNI", "Kemendikbud", "comfindo", "ISO 9001"],
    cta: {
      title: "Siap Meningkatkan Kompetensi Anda?",
      subtitle: "Bergabunglah dengan ratusan alumni comfindo Management.",
      phone: "0858-7066-3856",
      whatsapp_url: "https://wa.me/6287741929105",
    },
  },
}

export default function HomepageEditor() {
  const router = useRouter()
  const supabase = createClient()
  const [data, setData] = useState<HomepageData>(defaultData)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const { data: rows } = await supabase.from("homepage_content").select("*").limit(1)
    if (rows && rows.length > 0) {
      setData({
        ...defaultData,
        ...rows[0],
        features: { ...defaultData.features, ...(rows[0].features || {}) },
      })
    }
    setLoading(false)
  }

  async function handleSave() {
    setSaving(true)
    try {
      const payload = {
        hero_title: data.hero_title,
        hero_subtitle: data.hero_subtitle,
        hero_cta_text: data.hero_cta_text,
        hero_cta_link: data.hero_cta_link,
        hero_image_url: data.hero_image_url,
        features: data.features,
        updated_at: new Date().toISOString(),
      }

      if (data.id) {
        const { error } = await supabase.from("homepage_content").update(payload).eq("id", data.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("homepage_content").insert([payload])
        if (error) throw error
      }

      toast.success("Homepage berhasil disimpan!")
      
      startTransition(() => {
        router.refresh()
        loadData()
        setSaving(false)
      })
    } catch (error: any) {
      toast.error("Gagal menyimpan", { description: error.message })
      setSaving(false)
    }
  }

  const updateFeature = (key: string, value: any) => {
    setData((prev) => ({
      ...prev,
      features: { ...prev.features, [key]: value },
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Homepage Editor</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">Edit konten halaman utama website</p>
        </div>
        <Button onClick={handleSave} disabled={saving || isPending} className="">
          {(saving || isPending) ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Simpan
        </Button>
      </div>

      {/* Hero Section */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Hero Section</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={data.hero_title} onChange={(e) => setData({ ...data, hero_title: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Subtitle</Label>
            <Textarea value={data.hero_subtitle} onChange={(e) => setData({ ...data, hero_subtitle: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>CTA Text</Label>
              <Input value={data.hero_cta_text} onChange={(e) => setData({ ...data, hero_cta_text: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>CTA Link</Label>
              <Input value={data.hero_cta_link} onChange={(e) => setData({ ...data, hero_cta_link: e.target.value })} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Stats</CardTitle>
            <Button size="sm" variant="outline" onClick={() => updateFeature("stats", [...data.features.stats, { value: "", label: "" }])}>
              <Plus className="h-3 w-3 mr-1" /> Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.features.stats.map((stat, i) => (
            <div key={i} className="flex gap-3 items-center">
              <Input placeholder="Value" value={stat.value} onChange={(e) => {
                const arr = [...data.features.stats]; arr[i] = { ...arr[i], value: e.target.value }; updateFeature("stats", arr)
              }} className="w-32" />
              <Input placeholder="Label" value={stat.label} onChange={(e) => {
                const arr = [...data.features.stats]; arr[i] = { ...arr[i], label: e.target.value }; updateFeature("stats", arr)
              }} />
              <Button size="icon" variant="ghost" className="text-red-500 shrink-0" onClick={() => updateFeature("stats", data.features.stats.filter((_, j) => j !== i))}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Why Us */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Why Us / Keunggulan</CardTitle>
            <Button size="sm" variant="outline" onClick={() => updateFeature("why_us", [...data.features.why_us, { title: "", description: "" }])}>
              <Plus className="h-3 w-3 mr-1" /> Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.features.why_us.map((item, i) => (
            <div key={i} className="flex gap-3 items-start p-3 rounded-lg bg-[var(--secondary)] border">
              <div className="flex-1 space-y-2">
                <Input placeholder="Title" value={item.title} onChange={(e) => {
                  const arr = [...data.features.why_us]; arr[i] = { ...arr[i], title: e.target.value }; updateFeature("why_us", arr)
                }} />
                <Textarea placeholder="Description" value={item.description} onChange={(e) => {
                  const arr = [...data.features.why_us]; arr[i] = { ...arr[i], description: e.target.value }; updateFeature("why_us", arr)
                }} rows={2} />
              </div>
              <Button size="icon" variant="ghost" className="text-red-500 shrink-0" onClick={() => updateFeature("why_us", data.features.why_us.filter((_, j) => j !== i))}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">FAQ</CardTitle>
            <Button size="sm" variant="outline" onClick={() => updateFeature("faq", [...data.features.faq, { question: "", answer: "" }])}>
              <Plus className="h-3 w-3 mr-1" /> Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.features.faq.map((item, i) => (
            <div key={i} className="flex gap-3 items-start p-3 rounded-lg bg-[var(--secondary)] border">
              <div className="flex-1 space-y-2">
                <Input placeholder="Question" value={item.question} onChange={(e) => {
                  const arr = [...data.features.faq]; arr[i] = { ...arr[i], question: e.target.value }; updateFeature("faq", arr)
                }} />
                <Textarea placeholder="Answer" value={item.answer} onChange={(e) => {
                  const arr = [...data.features.faq]; arr[i] = { ...arr[i], answer: e.target.value }; updateFeature("faq", arr)
                }} rows={2} />
              </div>
              <Button size="icon" variant="ghost" className="text-red-500 shrink-0" onClick={() => updateFeature("faq", data.features.faq.filter((_, j) => j !== i))}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Testimonials */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Testimonials</CardTitle>
            <Button size="sm" variant="outline" onClick={() => updateFeature("testimonials", [...data.features.testimonials, { name: "", role: "", content: "", rating: 5 }])}>
              <Plus className="h-3 w-3 mr-1" /> Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.features.testimonials.map((item, i) => (
            <div key={i} className="flex gap-3 items-start p-3 rounded-lg bg-[var(--secondary)] border">
              <div className="flex-1 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Name" value={item.name} onChange={(e) => {
                    const arr = [...data.features.testimonials]; arr[i] = { ...arr[i], name: e.target.value }; updateFeature("testimonials", arr)
                  }} />
                  <Input placeholder="Role" value={item.role} onChange={(e) => {
                    const arr = [...data.features.testimonials]; arr[i] = { ...arr[i], role: e.target.value }; updateFeature("testimonials", arr)
                  }} />
                </div>
                <Textarea placeholder="Testimonial content" value={item.content} onChange={(e) => {
                  const arr = [...data.features.testimonials]; arr[i] = { ...arr[i], content: e.target.value }; updateFeature("testimonials", arr)
                }} rows={2} />
              </div>
              <Button size="icon" variant="ghost" className="text-red-500 shrink-0" onClick={() => updateFeature("testimonials", data.features.testimonials.filter((_, j) => j !== i))}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Partners */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Partners / Mitra</CardTitle>
            <Button size="sm" variant="outline" onClick={() => updateFeature("partners", [...data.features.partners, ""])}>
              <Plus className="h-3 w-3 mr-1" /> Add
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {data.features.partners.map((p, i) => (
              <div key={i} className="flex items-center gap-1 bg-[var(--secondary)] border rounded-lg px-2 py-1">
                <Input
                  value={p}
                  onChange={(e) => {
                    const arr = [...data.features.partners]; arr[i] = e.target.value; updateFeature("partners", arr)
                  }}
                  className="w-32 h-8 text-sm border-0 bg-transparent p-0"
                />
                <button className="text-red-400 hover:text-red-600" onClick={() => updateFeature("partners", data.features.partners.filter((_, j) => j !== i))}>
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card>
        <CardHeader><CardTitle className="text-lg">CTA Section</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>CTA Title</Label>
            <Input value={data.features.cta.title} onChange={(e) => updateFeature("cta", { ...data.features.cta, title: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>CTA Subtitle</Label>
            <Textarea value={data.features.cta.subtitle} onChange={(e) => updateFeature("cta", { ...data.features.cta, subtitle: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input value={data.features.cta.phone} onChange={(e) => updateFeature("cta", { ...data.features.cta, phone: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>WhatsApp URL</Label>
              <Input value={data.features.cta.whatsapp_url} onChange={(e) => updateFeature("cta", { ...data.features.cta, whatsapp_url: e.target.value })} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Save */}
      <div className="flex justify-end pb-8">
        <Button onClick={handleSave} disabled={saving || isPending} size="lg" className="">
          {(saving || isPending) ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Simpan Perubahan
        </Button>
      </div>
    </div>
  )
}
