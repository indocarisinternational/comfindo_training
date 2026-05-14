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

interface ContactData {
  id?: string
  address: string
  phone: string
  phone2: string
  email: string
  office_hours: string
  maps_embed_url: string
  social_links: { name: string; url: string }[]
}

const defaultData: ContactData = {
  address: "Perkantoran Tanjung Mas Raya Blok B1 No.44 Tanjung Barat Jakarta Selatan",
  phone: "0858-7066-3856",
  phone2: "0821-1199-5378",
  email: "comfindo.management@gmail.com",
  office_hours: "Senin - Jumat, 08.00 - 17.00 WIB",
  maps_embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.6776!2d106.8441!3d-6.2892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f0000000000%3A0x0!2sTanjung%20Barat%20Jakarta%20Selatan!5e0!3m2!1sen!2sid",
  social_links: [
    { name: "Facebook", url: "https://www.facebook.com/profile.php?id=100083385664789" },
    { name: "Instagram", url: "https://www.instagram.com/comfindo.management/" },
    { name: "LinkedIn", url: "http://www.linkedin.com/company/comfindomanagement" },
    { name: "YouTube", url: "https://www.youtube.com/channel/UCIHuMFAhGwBsx-Q_1kRdWaQ" },
  ],
}

export default function ContactEditor() {
  const supabase = createClient()
  const [data, setData] = useState<ContactData>(defaultData)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => { loadData() }, [])

  async function loadData() {
    const { data: rows } = await supabase.from("contact_info").select("*").limit(1)
    if (rows && rows.length > 0) {
      const row = rows[0]
      const parseJsonArray = (val: any, defaultVal: any[]) => {
        if (Array.isArray(val)) return val;
        if (typeof val === 'string') {
          try { const parsed = JSON.parse(val); if (Array.isArray(parsed)) return parsed; } catch (e) {}
        }
        return defaultVal;
      }

      setData({
        ...defaultData,
        ...row,
        social_links: parseJsonArray(row.social_links, defaultData.social_links),
      })
    }
    setLoading(false)
  }

  async function handleSave() {
    setSaving(true)
    try {
      const payload = { address: data.address, phone: data.phone, phone2: data.phone2, email: data.email, office_hours: data.office_hours, maps_embed_url: data.maps_embed_url, social_links: data.social_links, updated_at: new Date().toISOString() }
      if (data.id) {
        const { error } = await supabase.from("contact_info").update(payload).eq("id", data.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("contact_info").insert([payload])
        if (error) throw error
      }
      toast.success("Contact info berhasil disimpan!")
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
          <h1 className="text-2xl font-bold text-gray-900">Contact Editor</h1>
          <p className="text-sm text-gray-500 mt-1">Edit informasi kontak perusahaan</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-comfindo-green hover:bg-comfindo-green-dark">
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Simpan
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Contact Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Address</Label>
            <Textarea value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} rows={2} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Phone 1</Label>
              <Input value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Phone 2</Label>
              <Input value={data.phone2} onChange={(e) => setData({ ...data, phone2: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Office Hours</Label>
              <Input value={data.office_hours} onChange={(e) => setData({ ...data, office_hours: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Google Maps Embed URL</Label>
            <Input value={data.maps_embed_url} onChange={(e) => setData({ ...data, maps_embed_url: e.target.value })} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Social Media Links</CardTitle>
            <Button size="sm" variant="outline" onClick={() => setData({ ...data, social_links: [...data.social_links, { name: "", url: "" }] })}>
              <Plus className="h-3 w-3 mr-1" /> Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {(data.social_links || []).map((link, i) => (
            <div key={i} className="flex gap-3 items-center">
              <Input placeholder="Name (Facebook, Instagram...)" value={link.name} className="w-44" onChange={(e) => { const arr = [...(data.social_links || [])]; arr[i] = { ...arr[i], name: e.target.value }; setData({ ...data, social_links: arr }) }} />
              <Input placeholder="URL" value={link.url} onChange={(e) => { const arr = [...(data.social_links || [])]; arr[i] = { ...arr[i], url: e.target.value }; setData({ ...data, social_links: arr }) }} />
              <Button size="icon" variant="ghost" className="text-red-500" onClick={() => setData({ ...data, social_links: (data.social_links || []).filter((_, j) => j !== i) })}>
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
