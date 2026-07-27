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
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowLeft, Plus, Trash2, Loader2 } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader"

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
})

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
      ...initialData,
      target_participants: parseJsonArray(initialData.target_participants, []),
      objectives: parseJsonArray(initialData.objectives, []),
      materials: parseJsonArray(initialData.materials, []),
      benefits: parseJsonArray(initialData.benefits, []),
      output: parseJsonArray(initialData.output, []),
      is_featured: initialData.is_featured ?? false,
      is_published: initialData.is_published ?? false,
      sort_order: initialData.sort_order ?? 0,
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
        if (initialData) {
            const { error } = await supabase
                .from('training_programs')
                .update(values)
                .eq('id', initialData.id)
            
            if (error) throw error
            toast.success("Training updated successfully.")
        } else {
            const { error } = await supabase
                .from('training_programs')
                .insert([values])
            
            if (error) throw error
            toast.success("Training created successfully.")
        }
        
        startTransition(() => {
            router.refresh()
            router.push("/admin/trainings")
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            toast.error(error.message)
        } else {
            toast.error("An unknown error occurred")
        }
        setLoading(false)
    }
  }

  const generateSlug = (value: string) => {
    const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    form.setValue("slug", slug)
  }

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
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin/trainings"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
          }
        />
        
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
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
                    <FormField control={form.control} name="price_offline" render={({ field }) => (
                        <FormItem><FormLabel>Biaya Offline</FormLabel><FormControl><Input placeholder="Rp 1.500.000" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="price_online" render={({ field }) => (
                        <FormItem><FormLabel>Biaya Online</FormLabel><FormControl><Input placeholder="Rp 1.000.000" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="sort_order" render={({ field }) => (
                        <FormItem><FormLabel>Sort Order</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))}/></FormControl><FormMessage /></FormItem>
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
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm w-full">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Published</FormLabel>
                                    <FormDescription>Make this training visible to the public.</FormDescription>
                                </div>
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="is_featured" render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm w-full">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Featured</FormLabel>
                                    <FormDescription>Show this training on the homepage.</FormDescription>
                                </div>
                            </FormItem>
                        )} />
                    </div>
                </CardContent>
            </Card>

            <Button type="submit" size="lg" disabled={loading || isPending} className="w-full text-white">
                {(loading || isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {initialData ? "Update Training Program" : "Create Training Program"}
            </Button>
        </form>
        </Form>
    </div>
  )
}
