"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AdminCard as Card, AdminCardContent as CardContent, AdminCardHeader as CardHeader, AdminCardTitle as CardTitle } from "@/components/admin/ui/AdminCard"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Save, Loader2, Plus, Trash2, GripVertical, Pencil, Eye, EyeOff } from "lucide-react"

interface Service {
  id: string
  title: string
  slug: string
  seo_title: string
  seo_description: string
  content: string
  icon: string
  benefits: string[]
  process: string[]
  faq: { q: string; a: string }[]
  order_index: number
  is_published: boolean
}

export default function ServicesManager() {
  const supabase = createClient()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Service | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => { loadServices() }, [])

  async function loadServices() {
    const { data } = await supabase.from("services").select("*").order("order_index")
    if (data) {
      const parseJsonArray = (val: any, defaultVal: any[]) => {
        if (Array.isArray(val)) return val;
        if (typeof val === 'string') {
          try { const parsed = JSON.parse(val); if (Array.isArray(parsed)) return parsed; } catch (e) {}
        }
        return defaultVal;
      }
      
      const parsedData = (data as Service[]).map(service => ({
        ...service,
        benefits: parseJsonArray(service.benefits, [""]),
        process: parseJsonArray(service.process, [""]),
        faq: parseJsonArray(service.faq, [{ q: "", a: "" }])
      }))
      setServices(parsedData)
    }
    setLoading(false)
  }

  function generateSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
  }

  async function handleSave() {
    if (!editing) return
    setSaving(true)
    try {
      const payload = {
        title: editing.title,
        slug: editing.slug,
        seo_title: editing.seo_title,
        seo_description: editing.seo_description,
        content: editing.content,
        icon: editing.icon,
        benefits: editing.benefits,
        process: editing.process,
        faq: editing.faq,
        order_index: editing.order_index,
        is_published: editing.is_published,
      }

      if (editing.id) {
        const { error } = await supabase.from("services").update(payload).eq("id", editing.id)
        if (error) throw error
        toast.success("Service updated!")
      } else {
        const { error } = await supabase.from("services").insert([payload])
        if (error) throw error
        toast.success("Service created!")
      }
      setEditing(null)
      loadServices()
    } catch (error: any) {
      toast.error("Error", { description: error.message })
    } finally { setSaving(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus service ini?")) return
    const { error } = await supabase.from("services").delete().eq("id", id)
    if (error) toast.error("Error", { description: error.message })
    else { toast.success("Service deleted!"); loadServices() }
  }

  async function togglePublish(id: string, current: boolean) {
    const { error } = await supabase.from("services").update({ is_published: !current }).eq("id", id)
    if (!error) loadServices()
  }

  function startNew() {
    setEditing({
      id: "",
      title: "",
      slug: "",
      seo_title: "",
      seo_description: "",
      content: "",
      icon: "Shield",
      benefits: [""],
      process: [""],
      faq: [{ q: "", a: "" }],
      order_index: services.length,
      is_published: true,
    })
  }

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-comfindo-green" /></div>

  if (editing) {
    return (
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{editing.id ? "Edit" : "New"} Service</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving} className="bg-comfindo-green hover:bg-comfindo-green-dark">
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader><CardTitle className="text-lg">Basic Info</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={editing.title} onChange={(e) => { setEditing({ ...editing, title: e.target.value, slug: editing.id ? editing.slug : generateSlug(e.target.value) }) }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Icon Name</Label>
                <Input value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} placeholder="Shield, Award, Building2..." />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description / Content</Label>
              <Textarea value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} rows={4} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>SEO Title</Label>
                <Input value={editing.seo_title} onChange={(e) => setEditing({ ...editing, seo_title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>SEO Description</Label>
                <Input value={editing.seo_description} onChange={(e) => setEditing({ ...editing, seo_description: e.target.value })} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Benefits</CardTitle>
              <Button size="sm" variant="outline" onClick={() => setEditing({ ...editing, benefits: [...editing.benefits, ""] })}>
                <Plus className="h-3 w-3 mr-1" /> Add
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {(editing.benefits || []).map((b, i) => (
              <div key={i} className="flex gap-2">
                <Input value={b} onChange={(e) => { const arr = [...(editing.benefits || [])]; arr[i] = e.target.value; setEditing({ ...editing, benefits: arr }) }} />
                <Button size="icon" variant="ghost" className="text-red-500 shrink-0" onClick={() => setEditing({ ...editing, benefits: (editing.benefits || []).filter((_, j) => j !== i) })}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Process Steps</CardTitle>
              <Button size="sm" variant="outline" onClick={() => setEditing({ ...editing, process: [...editing.process, ""] })}>
                <Plus className="h-3 w-3 mr-1" /> Add
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {(editing.process || []).map((p, i) => (
              <div key={i} className="flex gap-2 items-center">
                <span className="text-sm font-bold text-gray-400 w-6">{i + 1}.</span>
                <Input value={p} onChange={(e) => { const arr = [...(editing.process || [])]; arr[i] = e.target.value; setEditing({ ...editing, process: arr }) }} />
                <Button size="icon" variant="ghost" className="text-red-500 shrink-0" onClick={() => setEditing({ ...editing, process: (editing.process || []).filter((_, j) => j !== i) })}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">FAQ</CardTitle>
              <Button size="sm" variant="outline" onClick={() => setEditing({ ...editing, faq: [...editing.faq, { q: "", a: "" }] })}>
                <Plus className="h-3 w-3 mr-1" /> Add
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {(editing.faq || []).map((f, i) => (
              <div key={i} className="flex gap-3 items-start p-3 rounded-lg bg-gray-50 border">
                <div className="flex-1 space-y-2">
                  <Input placeholder="Question" value={f.q} onChange={(e) => { const arr = [...(editing.faq || [])]; arr[i] = { ...arr[i], q: e.target.value }; setEditing({ ...editing, faq: arr }) }} />
                  <Textarea placeholder="Answer" value={f.a} onChange={(e) => { const arr = [...(editing.faq || [])]; arr[i] = { ...arr[i], a: e.target.value }; setEditing({ ...editing, faq: arr }) }} rows={2} />
                </div>
                <Button size="icon" variant="ghost" className="text-red-500" onClick={() => setEditing({ ...editing, faq: (editing.faq || []).filter((_, j) => j !== i) })}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services Manager</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola layanan yang ditampilkan di halaman Services</p>
        </div>
        <Button onClick={startNew} className="bg-comfindo-green hover:bg-comfindo-green-dark">
          <Plus className="mr-2 h-4 w-4" /> New Service
        </Button>
      </div>

      <div className="space-y-3">
        {services.map((service) => (
          <Card key={service.id} className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <GripVertical className="h-4 w-4 text-gray-300" />
                <div>
                  <h3 className="font-semibold text-gray-900">{service.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-1">{service.content}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={service.is_published ? "default" : "secondary"} className={service.is_published ? "bg-green-100 text-green-700" : ""}>
                  {service.is_published ? "Published" : "Draft"}
                </Badge>
                <Button size="icon" variant="ghost" onClick={() => togglePublish(service.id, service.is_published)}>
                  {service.is_published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
                <Button size="icon" variant="ghost" onClick={() => setEditing(service)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-red-500" onClick={() => handleDelete(service.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {services.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p>Belum ada service. Klik &quot;New Service&quot; untuk menambah.</p>
          </div>
        )}
      </div>
    </div>
  )
}
