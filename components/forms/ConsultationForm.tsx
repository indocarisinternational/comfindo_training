"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
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
import { consultationFormSchema, type ConsultationFormValues } from "./form-schema"
import { services } from "@/lib/data/services"

import { createClient } from "@/lib/supabase/client"

export function ConsultationForm() {
  const supabase = createClient()
  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  })

  async function onSubmit(data: ConsultationFormValues) {
    try {
        const { error } = await supabase.from('consultation_requests').insert([{
            name: data.name,
            company: data.company,
            email: data.email,
            phone: data.phone,
            service_name: data.service,
            message: data.message,
        }])

        if (error) throw error

        toast.success("Formulir berhasil dikirim!", {
        description: "Tim kami akan segera menghubungi Anda via WhatsApp.",
        })
        form.reset()
    } catch (error: any) {
        toast.error("Gagal mengirim formulir", {
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
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Layanan yang Diminati</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Layanan ISO" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.slug} value={service.title}>{service.title}</SelectItem>
                  ))}
                  <SelectItem value="Other">Lainnya</SelectItem>
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
                  placeholder="Ceritakan kebutuhan spesifik Anda..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" size="lg">Kirim Konsultasi</Button>
      </form>
    </Form>
  )
}
