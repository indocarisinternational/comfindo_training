"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
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
import { registrationFormSchema, type RegistrationFormValues } from "./form-schema"
import { trainings } from "@/lib/data/trainings"

import { createClient } from "@/lib/supabase/client"

export function RegistrationForm() {
    const searchParams = useSearchParams()
    const supabase = createClient()
    // In a real app we might want to wrap this in Suspense if used in page, but here it's a client component.
    // However, consuming useSearchParams makes the page dynamic.

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      training: "",
      message: "",
    },
  })

  // Prefill training if passed in URL
  useEffect(() => {
    const trainingSlug = searchParams.get("training")
    if (trainingSlug) {
        const training = trainings.find(t => t.slug === trainingSlug)
        if (training) {
            form.setValue("training", training.title)
        }
    }
  }, [searchParams, form])


  async function onSubmit(data: RegistrationFormValues) {
    try {
        // Ideally we should lookup the training_id based on the title or pass it in hidden field
        // For now we'll just store the title as a snapshot or loose link
        const { error } = await supabase.from('training_registrations').insert([{
            name: data.name,
            company: data.company,
            email: data.email,
            phone: data.phone,
            training_title: data.training, // Storing title for simplicity as per schema
            message: data.message,
        }])

        if (error) throw error

        toast.success("Registrasi berhasil!", {
        description: "Kami telah menerima pendaftaran Anda. Cek email untuk detail pembayaran.",
        })
        form.reset()
    } catch (error: any) {
         toast.error("Gagal melakukan registrasi", {
            description: error.message
        })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input placeholder="Budi Santoso" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Perusahaan</FormLabel>
              <FormControl>
                <Input placeholder="PT Maju Mundur" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input placeholder="budi@company.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Nomor WhatsApp</FormLabel>
                <FormControl>
                    <Input placeholder="081234567890" type="tel" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        
        <FormField
          control={form.control}
          name="training"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Training yang Dipilih</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Jadwal Training" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {trainings.map((training) => (
                    <SelectItem key={training.slug} value={training.title}>{training.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pesan Tambahan (Opsional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ada kebutuhan khusus?"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" size="lg">Daftar Training</Button>
      </form>
    </Form>
  )
}
