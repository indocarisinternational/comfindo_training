"use client"

import { useState } from "react"
import { createNewAdmin } from "./actions"
import { AdminPageHeader } from "@/components/admin/AdminPageHeader"
import { Button } from "@/components/ui/button"
import { AdminInput as Input } from "@/components/admin/ui/AdminInput"
import { toast } from "sonner"
import { Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react"

export default function UsersAdminPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return

    setLoading(true)
    const { error } = await createNewAdmin(email, password)
    
    if (error) {
      toast.error("Gagal menambahkan admin", { description: error })
    } else {
      toast.success("Admin berhasil didaftarkan!", { 
        description: `Silakan minta admin baru untuk memverifikasi email ${email}` 
      })
      setEmail("")
      setPassword("")
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Tambah Admin Baru"
        description="Daftarkan akun admin baru. Link verifikasi akan otomatis dikirimkan ke email yang didaftarkan."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Admin Users", href: "/admin/users" },
        ]}
      />

      <div className="max-w-xl">
        <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] shadow-none">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border)]">
            <div className="p-2.5 rounded-md bg-[var(--foreground)] text-[var(--background)]">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] tracking-tight">Registrasi Admin</h3>
              <p className="text-sm text-[var(--muted-foreground)]">Buat akun untuk pengelola website baru</p>
            </div>
          </div>
          
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[var(--foreground)] block mb-1.5">Alamat Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
                <Input
                  type="email"
                  required
                  placeholder="admin@comfindo.co.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 h-11"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--foreground)] block mb-1.5">Password Sementara</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-10 h-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-[var(--muted-foreground)] mt-2">
                Password ini akan digunakan untuk login pertama kali. Admin dapat mengubahnya nanti.
              </p>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-10 bg-[var(--foreground)] hover:opacity-90 text-[var(--background)] rounded-md mt-4 transition-colors"
            >
              {loading ? "Mendaftarkan..." : "Daftarkan Admin"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
