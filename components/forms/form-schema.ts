import * as z from "zod"

export const consultationFormSchema = z.object({
  name: z.string().min(2, { message: "Nama harus diisi minimal 2 karakter." }),
  company: z.string().min(2, { message: "Nama perusahaan harus diisi." }),
  email: z.string().email({ message: "Email tidak valid." }),
  phone: z.string().min(10, { message: "Nomor WhatsApp tidak valid." }),
  service: z.string().min(1, { message: "Silakan pilih layanan." }),
  message: z.string().optional(),
})

export const registrationFormSchema = z.object({
  name: z.string().min(2, { message: "Nama harus diisi minimal 2 karakter." }),
  company: z.string().min(2, { message: "Nama perusahaan harus diisi." }),
  email: z.string().email({ message: "Email tidak valid." }),
  phone: z.string().min(10, { message: "Nomor WhatsApp tidak valid." }),
  training: z.string().min(1, { message: "Silakan pilih training." }),
  message: z.string().optional(),
})

export type ConsultationFormValues = z.infer<typeof consultationFormSchema>
export type RegistrationFormValues = z.infer<typeof registrationFormSchema>
