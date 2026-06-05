"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { AdminInput as Input } from "@/components/admin/ui/AdminInput"
import { AdminTextarea as Textarea } from "@/components/admin/ui/AdminTextarea"
import { AdminLabel as Label } from "@/components/admin/ui/AdminLabel"
import { AdminCard as Card, AdminCardContent as CardContent, AdminCardHeader as CardHeader, AdminCardTitle as CardTitle } from "@/components/admin/ui/AdminCard"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Save, Loader2, Plus, Trash2, GripVertical, Pencil, Eye, EyeOff } from "lucide-react"

interface Certificate {
  id: string
  title: string
  slug: string
  description: string
  issuer: string
  certificate_type: string
  image_url: string
  file_url: string
  is_published: boolean
  sort_order: number
  seo_title: string
  seo_description: string
}

export default function CertificatesManager() {
  const supabase = createClient()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Certificate | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => { loadCertificates() }, [])

  async function loadCertificates() {
    const { data } = await supabase.from("certificates").select("*").order("sort_order")
    if (data) {
      setCertificates(data as Certificate[])
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
        description: editing.description,
        issuer: editing.issuer,
        certificate_type: editing.certificate_type,
        image_url: editing.image_url,
        file_url: editing.file_url,
        is_published: editing.is_published,
        sort_order: editing.sort_order,
        seo_title: editing.seo_title,
        seo_description: editing.seo_description,
      }

      if (editing.id) {
        const { error } = await supabase.from("certificates").update(payload).eq("id", editing.id)
        if (error) throw error
        toast.success("Certificate updated!")
      } else {
        const { error } = await supabase.from("certificates").insert([payload])
        if (error) throw error
        toast.success("Certificate created!")
      }
      setEditing(null)
      loadCertificates()
    } catch (error: any) {
      toast.error("Error", { description: error.message })
    } finally { setSaving(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus sertifikat ini?")) return
    const { error } = await supabase.from("certificates").delete().eq("id", id)
    if (error) toast.error("Error", { description: error.message })
    else { toast.success("Certificate deleted!"); loadCertificates() }
  }

  async function togglePublish(id: string, current: boolean) {
    const { error } = await supabase.from("certificates").update({ is_published: !current }).eq("id", id)
    if (!error) loadCertificates()
  }

  function startNew() {
    setEditing({
      id: "",
      title: "",
      slug: "",
      description: "",
      issuer: "",
      certificate_type: "BNSP",
      image_url: "",
      file_url: "",
      is_published: true,
      sort_order: certificates.length,
      seo_title: "",
      seo_description: "",
    })
  }

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-comfindo-green" /></div>

  if (editing) {
    return (
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{editing.id ? "Edit" : "New"} Certificate</h1>
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
              <Label>Title / Nama Sertifikat</Label>
              <Input value={editing.title} onChange={(e) => { setEditing({ ...editing, title: e.target.value, slug: editing.id ? editing.slug : generateSlug(e.target.value) }) }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Sort Order</Label>
                <Input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Issuer / Penerbit</Label>
                <Input value={editing.issuer} onChange={(e) => setEditing({ ...editing, issuer: e.target.value })} placeholder="BNSP, Kemnaker, dll" />
              </div>
              <div className="space-y-2">
                <Label>Certificate Type</Label>
                <Input value={editing.certificate_type} onChange={(e) => setEditing({ ...editing, certificate_type: e.target.value })} placeholder="Nasional / Internasional" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={4} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Media & SEO</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Image URL (Thumbnail)</Label>
              <Input value={editing.image_url} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} />
              {editing.image_url && <img src={editing.image_url} alt="Preview" className="h-32 object-contain mt-2 rounded border" />}
            </div>
            <div className="space-y-2">
              <Label>File URL (Sertifikat asli/PDF opsional)</Label>
              <Input value={editing.file_url} onChange={(e) => setEditing({ ...editing, file_url: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
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
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Certificates Manager</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola sertifikat dan akreditasi lembaga</p>
        </div>
        <Button onClick={startNew} className="bg-comfindo-green hover:bg-comfindo-green-dark">
          <Plus className="mr-2 h-4 w-4" /> New Certificate
        </Button>
      </div>

      <div className="space-y-3">
        {certificates.map((cert) => (
          <Card key={cert.id} className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <GripVertical className="h-4 w-4 text-gray-300" />
                {cert.image_url && <img src={cert.image_url} alt={cert.title} className="w-12 h-12 object-cover rounded" />}
                <div>
                  <h3 className="font-semibold text-gray-900">{cert.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-1">{cert.issuer} - {cert.certificate_type}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={cert.is_published ? "default" : "secondary"} className={cert.is_published ? "bg-green-100 text-green-700" : ""}>
                  {cert.is_published ? "Published" : "Draft"}
                </Badge>
                <Button size="icon" variant="ghost" onClick={() => togglePublish(cert.id, cert.is_published)}>
                  {cert.is_published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
                <Button size="icon" variant="ghost" onClick={() => setEditing(cert)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-red-500" onClick={() => handleDelete(cert.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {certificates.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p>Belum ada sertifikat. Klik &quot;New Certificate&quot; untuk menambah.</p>
          </div>
        )}
      </div>
    </div>
  )
}
