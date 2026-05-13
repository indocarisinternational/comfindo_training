"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Save, Loader2, Plus, Trash2 } from "lucide-react"

interface AboutData {
  id?: string
  company_name: string
  vision: string
  mission: { title: string; description: string }[]
  history: string
  stats: { value: string; label: string }[]
  legalitas: { label: string; value: string }[]
  team_members: { name: string; role: string; image_url: string }[]
}

const defaultData: AboutData = {
  company_name: "comfindo Management",
  vision: "Menjadi lembaga pelatihan dan konsultan manajemen terpercaya yang mendukung pengembangan kompetensi sumber daya manusia serta pertumbuhan bisnis berkelanjutan bagi perusahaan di Indonesia.",
  mission: [
    { title: "Meningkatkan Keterampilan Kerja Karyawan", description: "Menyelenggarakan public training dan in-house training secara berkala." },
    { title: "Mendukung Pertumbuhan Bisnis Perusahaan", description: "Memberikan layanan konsultasi manajemen." },
    { title: "Menyediakan Program Sertifikasi Kompetensi", description: "Menyelenggarakan pelatihan dan sertifikasi kompetensi bersertifikat BNSP maupun Non-BNSP." },
  ],
  history: "",
  stats: [
    { value: "500+", label: "Alumni Bersertifikat" },
    { value: "50+", label: "Program Pelatihan" },
    { value: "10+", label: "Trainer Ahli" },
    { value: "4.9★", label: "Rating Kepuasan" },
  ],
  legalitas: [
    { label: "Nama Lembaga", value: "comfindo Management" },
    { label: "Alamat", value: "Perkantoran Tanjung Mas Raya Blok B1 No.44, Tanjung Barat, Jakarta Selatan" },
    { label: "Kontak", value: "0858-7066-3856 / 0821-1199-5378" },
    { label: "Email", value: "comfindo.management@gmail.com" },
  ],
  team_members: [],
}

export default function AboutEditor() {
  const supabase = createClient()
  const [data, setData] = useState<AboutData>(defaultData)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => { loadData() }, [])

  async function loadData() {
    const { data: rows } = await supabase.from("about_content").select("*").limit(1)
    if (rows && rows.length > 0) {
      setData({ ...defaultData, ...rows[0] })
    }
    setLoading(false)
  }

  async function handleSave() {
    setSaving(true)
    try {
      const payload = { company_name: data.company_name, vision: data.vision, mission: data.mission, history: data.history, stats: data.stats, legalitas: data.legalitas, team_members: data.team_members, updated_at: new Date().toISOString() }
      if (data.id) {
        const { error } = await supabase.from("about_content").update(payload).eq("id", data.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("about_content").insert([payload])
        if (error) throw error
      }
      toast.success("About page berhasil disimpan!")
      loadData()
    } catch (error: any) {
      toast.error("Gagal menyimpan", { description: error.message })
    } finally { setSaving(false) }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-comfindo-green" /></div>

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">About Page Editor</h1>
          <p className="text-sm text-gray-500 mt-1">Edit halaman profil perusahaan</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-comfindo-green hover:bg-comfindo-green-dark">
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Simpan
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Company Info</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Company Name</Label>
            <Input value={data.company_name} onChange={(e) => setData({ ...data, company_name: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>History / Description</Label>
            <Textarea value={data.history} onChange={(e) => setData({ ...data, history: e.target.value })} rows={4} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Vision</CardTitle></CardHeader>
        <CardContent>
          <Textarea value={data.vision} onChange={(e) => setData({ ...data, vision: e.target.value })} rows={4} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Mission</CardTitle>
            <Button size="sm" variant="outline" onClick={() => setData({ ...data, mission: [...data.mission, { title: "", description: "" }] })}>
              <Plus className="h-3 w-3 mr-1" /> Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.mission.map((m, i) => (
            <div key={i} className="flex gap-3 items-start p-3 rounded-lg bg-gray-50 border">
              <div className="flex-1 space-y-2">
                <Input placeholder="Title" value={m.title} onChange={(e) => { const arr = [...data.mission]; arr[i] = { ...arr[i], title: e.target.value }; setData({ ...data, mission: arr }) }} />
                <Textarea placeholder="Description" value={m.description} onChange={(e) => { const arr = [...data.mission]; arr[i] = { ...arr[i], description: e.target.value }; setData({ ...data, mission: arr }) }} rows={2} />
              </div>
              <Button size="icon" variant="ghost" className="text-red-500" onClick={() => setData({ ...data, mission: data.mission.filter((_, j) => j !== i) })}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Stats</CardTitle>
            <Button size="sm" variant="outline" onClick={() => setData({ ...data, stats: [...data.stats, { value: "", label: "" }] })}>
              <Plus className="h-3 w-3 mr-1" /> Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.stats.map((s, i) => (
            <div key={i} className="flex gap-3 items-center">
              <Input placeholder="Value" value={s.value} className="w-32" onChange={(e) => { const arr = [...data.stats]; arr[i] = { ...arr[i], value: e.target.value }; setData({ ...data, stats: arr }) }} />
              <Input placeholder="Label" value={s.label} onChange={(e) => { const arr = [...data.stats]; arr[i] = { ...arr[i], label: e.target.value }; setData({ ...data, stats: arr }) }} />
              <Button size="icon" variant="ghost" className="text-red-500" onClick={() => setData({ ...data, stats: data.stats.filter((_, j) => j !== i) })}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Legalitas</CardTitle>
            <Button size="sm" variant="outline" onClick={() => setData({ ...data, legalitas: [...data.legalitas, { label: "", value: "" }] })}>
              <Plus className="h-3 w-3 mr-1" /> Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.legalitas.map((l, i) => (
            <div key={i} className="flex gap-3 items-center">
              <Input placeholder="Label" value={l.label} className="w-40" onChange={(e) => { const arr = [...data.legalitas]; arr[i] = { ...arr[i], label: e.target.value }; setData({ ...data, legalitas: arr }) }} />
              <Input placeholder="Value" value={l.value} onChange={(e) => { const arr = [...data.legalitas]; arr[i] = { ...arr[i], value: e.target.value }; setData({ ...data, legalitas: arr }) }} />
              <Button size="icon" variant="ghost" className="text-red-500" onClick={() => setData({ ...data, legalitas: data.legalitas.filter((_, j) => j !== i) })}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end pb-8">
        <Button onClick={handleSave} disabled={saving} size="lg" className="bg-comfindo-green hover:bg-comfindo-green-dark">
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Simpan Perubahan
        </Button>
      </div>
    </div>
  )
}
