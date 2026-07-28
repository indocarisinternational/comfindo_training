"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowLeft, Plus, Trash2, Loader2, Globe, EyeOff, Star } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader"
import { ImageUploader } from "@/components/admin/ImageUploader"

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  slug: z.string().min(2),
  short_description: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  level: z.string().optional(),
  date: z.string().optional(),
  duration: z.string().optional(),
  method: z.string().optional(),
  location: z.string().optional(),
  price_offline: z.string().optional(),
  price_online: z.string().optional(),
  image_url: z.string().optional(),
  target_participants: z.array(z.string()),
  objectives: z.array(z.string()),
  materials: z.array(z.string()),
  benefits: z.array(z.string()),
  output: z.array(z.string()),
  is_featured: z.boolean(),
  is_published: z.boolean(),
  sort_order: z.number(),
  focus_keyword: z.string().optional(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  canonical_url: z.string().optional(),
}).refine(
  (data) => !!(data.price_offline?.trim() || data.price_online?.trim()),
  {
    message: "Minimal satu harga harus diisi (Online atau Offline).",
    path: ["price_offline"],
  }
)

type TrainingFormValues = z.infer<typeof formSchema>
type TrainingRecord = Partial<TrainingFormValues> & { id?: string; [key: string]: unknown }

interface TrainingFormProps {
    initialData?: TrainingRecord
}

export function TrainingForm({ initialData }: TrainingFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [isPending, startTransition] = useTransition()

  const parseJsonArray = (val: unknown, defaultVal: string[]) => {
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') {
        try { const parsed = JSON.parse(val); if (Array.isArray(parsed)) return parsed; } catch {}
    }
    return defaultVal;
  }

  const defaultValues = initialData ? {
      title: String(initialData.title ?? ''),
      slug: String(initialData.slug ?? ''),
      short_description: String(initialData.short_description ?? ''),
      description: String(initialData.description ?? ''),
      category: String(initialData.category ?? ''),
      level: String(initialData.level ?? ''),
      date: String(initialData.date ?? ''),
      duration: String(initialData.duration ?? ''),
      method: String(initialData.method ?? ''),
      location: String(initialData.location ?? ''),
      price_offline: String(initialData.price_offline ?? ''),
      price_online: String(initialData.price_online ?? ''),
      image_url: String(initialData.image_url ?? ''),
      target_participants: parseJsonArray(initialData.target_participants, []),
      objectives: parseJsonArray(initialData.objectives, []),
      materials: parseJsonArray(initialData.materials, []),
      benefits: parseJsonArray(initialData.benefits, []),
      output: parseJsonArray(initialData.output, []),
      is_featured: initialData.is_featured ?? false,
      is_published: initialData.is_published ?? false,
      sort_order: Number(initialData.sort_order ?? 0),
      focus_keyword: String(initialData.focus_keyword ?? ''),
      seo_title: String(initialData.seo_title ?? ''),
      seo_description: String(initialData.seo_description ?? ''),
      canonical_url: String(initialData.canonical_url ?? ''),
  } : {
    title: "",
    slug: "",
    short_description: "",
    description: "",
    category: "",
    level: "",
    date: "Setiap Bulan",
    duration: "2 Hari",
    method: "Online",
    location: "Zoom Meeting",
    price_offline: "Rp ",
    price_online: "Rp ",
    image_url: "",
    target_participants: [],
    objectives: [],
    materials: [],
    benefits: [],
    output: [],
    is_featured: false,
    is_published: false,
    sort_order: 0,
    focus_keyword: "",
    seo_title: "",
    seo_description: "",
    canonical_url: "",
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  async function onSubmit(values: z.infer<typeof formSchema>, overridePublish?: boolean) {
    setLoading(true)
    try {
        const payload = {
            ...values,
            price_offline: values.price_offline || null,
            price_online: values.price_online || null,
            // override publish if explicitly triggered
            is_published: overridePublish !== undefined ? overridePublish : values.is_published,
        }
        if (initialData?.id) {
            const { error } = await supabase
                .from('training_programs')
                .update(payload)
                .eq('id', initialData.id)
            
            if (error) throw error
            toast.success(overridePublish ? "Training berhasil dipublikasi!" : "Training berhasil diperbarui!")
        } else {
            const { error } = await supabase
                .from('training_programs')
                .insert([payload])
            
            if (error) throw error
            toast.success(overridePublish ? "Training berhasil dipublikasi!" : "Training berhasil dibuat sebagai draft!")
        }
        
        startTransition(() => {
            router.refresh()
            router.push("/admin/trainings")
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            toast.error("Gagal menyimpan", { description: error.message })
        } else {
            toast.error("Terjadi kesalahan")
        }
        setLoading(false)
    }
  }

  async function handlePublish() {
    const valid = await form.trigger()
    if (!valid) return
    onSubmit(form.getValues(), true)
  }

  async function handleSaveDraft() {
    const valid = await form.trigger()
    if (!valid) return
    onSubmit(form.getValues(), false)
  }

  const generateSlug = (value: string) => {
    const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    form.setValue("slug", slug)
  }

  const formatRupiah = (value: string) => {
    const number = value.replace(/\D/g, "");
    if (!number) return "";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseInt(number));
  };

  const renderArrayInput = (fieldName: keyof z.infer<typeof formSchema>, label: string) => {
    const values = form.watch(fieldName) as string[];
    return (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">{label}</CardTitle>
              <Button type="button" size="sm" variant="outline" onClick={() => form.setValue(fieldName, [...values, ""] as never)}>
                <Plus className="h-3 w-3 mr-1" /> Add
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {values.map((val: string, i: number) => (
              <div key={i} className="flex gap-2">
                <Input value={val} onChange={(e) => {
                  const arr = [...values]; arr[i] = e.target.value; form.setValue(fieldName, arr as never);
                }} />
                <Button type="button" size="icon" variant="ghost" className="text-red-500 shrink-0" onClick={() => {
                  form.setValue(fieldName, values.filter((_, j) => j !== i) as never);
                }}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
    );
  };

  return (
    <div className="space-y-6">
        <AdminPageHeader
          title={initialData ? "Edit Training Program" : "Create Training Program"}
          description="Update training content, schedule, publishing status, and SEO metadata."
          action={
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" asChild>
                <Link href="/admin/trainings"><ArrowLeft className="h-4 w-4" /></Link>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleSaveDraft}
                disabled={loading || isPending}
              >
                {(loading || isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <EyeOff className="mr-2 h-4 w-4" />
                Simpan Draft
              </Button>
              <Button
                type="button"
                onClick={handlePublish}
                disabled={loading || isPending}
              >
                {(loading || isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Globe className="mr-2 h-4 w-4" />
                {initialData?.is_published ? "Update & Publish" : "Publish Sekarang"}
              </Button>
            </div>
          }
        />
        
        <Form {...form}>
        <form onSubmit={form.handleSubmit((v) => onSubmit(v))} className="space-y-6">
            
            <Card>
                <CardHeader><CardTitle className="text-lg">Basic Information</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <FormField control={form.control} name="title" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Training ISO 9001..." {...field} onChange={(e) => {
                                    field.onChange(e)
                                    if (!initialData) generateSlug(e.target.value)
                                }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="slug" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Slug (URL Friendly)</FormLabel>
                            <FormControl><Input placeholder="training-iso-9001" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="short_description" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Short Description</FormLabel>
                            <FormControl><Textarea placeholder="Short excerpt for cards..." {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="description" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Description</FormLabel>
                            <FormControl><Textarea rows={5} placeholder="Full detailed description..." {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle className="text-lg">Details & Scheduling</CardTitle></CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <FormField control={form.control} name="category" render={({ field }) => (
                        <FormItem><FormLabel>Category</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="level" render={({ field }) => (
                        <FormItem><FormLabel>Level</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="date" render={({ field }) => (
                        <FormItem><FormLabel>Date / Schedule</FormLabel><FormControl><Input placeholder="Setiap Bulan" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="duration" render={({ field }) => (
                        <FormItem><FormLabel>Duration</FormLabel><FormControl><Input placeholder="2 Hari" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="method" render={({ field }) => (
                        <FormItem><FormLabel>Method</FormLabel><FormControl><Input placeholder="Online / Offline / Hybrid" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="location" render={({ field }) => (
                        <FormItem><FormLabel>Location</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="col-span-2 grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="price_offline" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Biaya Offline <span className="text-[var(--muted-foreground)] font-normal text-xs">(opsional jika ada Online)</span></FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="Rp 1.500.000" 
                                    {...field} 
                                    value={field.value || ""}
                                    onChange={(e) => field.onChange(formatRupiah(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                      )} />
                      <FormField control={form.control} name="price_online" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Biaya Online <span className="text-[var(--muted-foreground)] font-normal text-xs">(opsional jika ada Offline)</span></FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="Rp 1.000.000" 
                                    {...field} 
                                    value={field.value || ""}
                                    onChange={(e) => field.onChange(formatRupiah(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="sort_order" render={({ field }) => (
                        <FormItem><FormLabel>Sort Order</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))}/></FormControl><FormMessage /></FormItem>
                    )} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle className="text-lg">Gambar Training</CardTitle></CardHeader>
                <CardContent>
                    <FormField control={form.control} name="image_url" render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <ImageUploader
                                    value={field.value || ""}
                                    onChange={field.onChange}
                                    bucket="images"
                                    folder="trainings"
                                    label="Gambar Training"
                                    previewHeight="h-52"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderArrayInput("objectives", "Objectives (Tujuan)")}
                {renderArrayInput("materials", "Materials (Materi / Silabus)")}
                {renderArrayInput("target_participants", "Target Participants")}
                {renderArrayInput("benefits", "Benefits (Fasilitas / Manfaat)")}
                {renderArrayInput("output", "Output (Hasil Pembelajaran)")}
            </div>

            <Card>
                <CardHeader><CardTitle className="text-lg">SEO & Publishing</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <FormField control={form.control} name="focus_keyword" render={({ field }) => (
                        <FormItem><FormLabel>Focus Keyword</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="seo_title" render={({ field }) => (
                        <FormItem><FormLabel>SEO Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="seo_description" render={({ field }) => (
                        <FormItem><FormLabel>SEO Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                        <FormField control={form.control} name="is_published" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    {/* div bukan button agar tidak nested button-in-button (React error #185) */}
                                    <div
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => field.onChange(!field.value)}
                                        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && field.onChange(!field.value)}
                                        className={`w-full flex flex-row items-center gap-3 rounded-md border p-4 shadow-sm transition-colors cursor-pointer select-none ${
                                            field.value
                                                ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                                                : "border-[var(--border)] hover:border-[var(--primary)]"
                                        }`}
                                    >
                                        <Globe className={`h-5 w-5 shrink-0 ${field.value ? "text-green-600" : "text-[var(--muted-foreground)]"}`} />
                                        <div className="text-left space-y-0.5 flex-1">
                                            <p className={`text-sm font-medium ${field.value ? "text-green-700 dark:text-green-400" : "text-[var(--foreground)]"}`}>
                                                {field.value ? "Dipublikasi" : "Draft (Tidak Publik)"}
                                            </p>
                                            <p className="text-xs text-[var(--muted-foreground)]">
                                                {field.value ? "Terlihat oleh publik" : "Klik untuk publish"}
                                            </p>
                                        </div>
                                        {/* Visual indicator - bukan Checkbox (button) agar tidak nested */}
                                        <span className={`ml-auto h-4 w-4 rounded-sm border-2 flex items-center justify-center shrink-0 transition-colors ${
                                            field.value ? "bg-green-500 border-green-500" : "border-[var(--border)] bg-transparent"
                                        }`}>
                                            {field.value && (
                                                <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </span>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="is_featured" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => field.onChange(!field.value)}
                                        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && field.onChange(!field.value)}
                                        className={`w-full flex flex-row items-center gap-3 rounded-md border p-4 shadow-sm transition-colors cursor-pointer select-none ${
                                            field.value
                                                ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30"
                                                : "border-[var(--border)] hover:border-[var(--primary)]"
                                        }`}
                                    >
                                        <Star className={`h-5 w-5 shrink-0 ${field.value ? "text-amber-500" : "text-[var(--muted-foreground)]"}`} />
                                        <div className="text-left space-y-0.5 flex-1">
                                            <p className={`text-sm font-medium ${field.value ? "text-amber-700 dark:text-amber-400" : "text-[var(--foreground)]"}`}>
                                                {field.value ? "Featured (Unggulan)" : "Tidak Featured"}
                                            </p>
                                            <p className="text-xs text-[var(--muted-foreground)]">
                                                {field.value ? "Ditampilkan di homepage" : "Klik untuk jadikan unggulan"}
                                            </p>
                                        </div>
                                        <span className={`ml-auto h-4 w-4 rounded-sm border-2 flex items-center justify-center shrink-0 transition-colors ${
                                            field.value ? "bg-amber-400 border-amber-400" : "border-[var(--border)] bg-transparent"
                                        }`}>
                                            {field.value && (
                                                <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </span>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button type="button" variant="outline" size="lg" onClick={handleSaveDraft} disabled={loading || isPending} className="flex-1">
                  {(loading || isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <EyeOff className="mr-2 h-4 w-4" />
                  {initialData ? "Update sebagai Draft" : "Simpan sebagai Draft"}
              </Button>
              <Button type="button" size="lg" onClick={handlePublish} disabled={loading || isPending} className="flex-1">
                  {(loading || isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Globe className="mr-2 h-4 w-4" />
                  {initialData ? "Update & Publish" : "Publish Sekarang"}
              </Button>
            </div>
        </form>
        </Form>
    </div>
  )
}
