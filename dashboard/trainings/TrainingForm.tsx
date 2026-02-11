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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  slug: z.string().min(2),
  description: z.string().optional(),
  mode: z.enum(["Online", "Offline", "Hybrid"]),
  location: z.string().optional(),
  start_date: z.string(), // Input type date returns string YYYY-MM-DD
  end_date: z.string(),
  duration: z.string(),
  time: z.string(),
  price: z.string(),
  status: z.enum(["active", "inactive"]),
})

interface TrainingFormProps {
    initialData?: any
}

export function TrainingForm({ initialData }: TrainingFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  const defaultValues = initialData ? {
      ...initialData,
      start_date: initialData.start_date ? new Date(initialData.start_date).toISOString().split('T')[0] : '',
      end_date: initialData.end_date ? new Date(initialData.end_date).toISOString().split('T')[0] : '',
  } : {
    title: "",
    slug: "",
    description: "",
    mode: "Online",
    location: "",
    start_date: "",
    end_date: "",
    duration: "2 Hari",
    time: "09.00 - 16.00 WIB",
    price: "Rp ",
    status: "active",
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
        if (initialData) {
            // Update
            const { error } = await supabase
                .from('trainings')
                .update(values)
                .eq('id', initialData.id)
            
            if (error) throw error
            toast.success("Training updated successfully.")
        } else {
            // Create
            const { error } = await supabase
                .from('trainings')
                .insert([values])
            
            if (error) throw error
            toast.success("Training created successfully.")
        }
        router.refresh()
        router.push("/dashboard/trainings")
    } catch (error: any) {
        toast.error("Something went wrong.", { description: error.message })
    } finally {
        setLoading(false)
    }
  }

  // Slug generator helper
  const generateSlug = (value: string) => {
    const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    form.setValue("slug", slug)
  }

  return (
    <div className="space-y-6">
        <div className="flex items-center gap-4">
             <Button variant="outline" size="icon" asChild>
                <Link href="/dashboard/trainings">
                    <ArrowLeft className="h-4 w-4" />
                </Link>
             </Button>
             <h1 className="text-xl font-bold">{initialData ? "Edit Training" : "Create Training"}</h1>
        </div>
        
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
            <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
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
            )}
            />
            <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Slug (URL Friendly)</FormLabel>
                <FormControl>
                    <Input placeholder="training-iso-9001" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            
            <div className="grid grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="mode"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Mode</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select mode" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="Online">Online (Zoom)</SelectItem>
                        <SelectItem value="Offline">Offline</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            
             <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                        <Input placeholder="Hotel Ibis, Jakarta / Zoom Meeting..." {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

            <div className="grid grid-cols-2 gap-4">
                 <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                        <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                        <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
             <div className="grid grid-cols-2 gap-4">
                 <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                        <Input placeholder="2 Days" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                        <Input placeholder="09:00 - 16:00" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

             <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                    <Input placeholder="Rp 1.500.000" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                    <Textarea placeholder="Short description..." {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            
            <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : initialData ? "Update Training" : "Create Training"}
            </Button>
        </form>
        </Form>
    </div>
  )
}
