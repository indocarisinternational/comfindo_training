"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { toast } from "sonner"
import { GraduationCap, Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast.error("Login Gagal", {
        description: error.message,
      })
      setLoading(false)
    } else {
      toast.success("Login Berhasil", {
        description: "Mengalihkan ke dashboard...",
      })
      router.push("/dashboard")
      router.refresh()
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    })

    if (error) {
      toast.error("Registrasi Gagal", {
        description: error.message,
      })
      setLoading(false)
    } else {
      toast.success("Registrasi Berhasil", {
        description: "Silakan cek email Anda untuk verifikasi.",
      })
      setLoading(false)
      setIsRegister(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[hsl(152,20%,97%)] via-white to-[hsl(152,15%,95%)] px-4 py-16">
      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-20 -right-20 w-96 h-96 rounded-full bg-[hsl(152,69%,31%)]/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-[hsl(152,50%,45%)]/5 blur-3xl" />
      </div>

      <Card className="w-full max-w-md relative z-10 border-0 shadow-xl rounded-2xl">
        <CardHeader className="space-y-1 text-center pb-2">
          <Link href="/" className="inline-flex items-center justify-center gap-2 mb-4 group">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(152,69%,31%)] to-[hsl(152,75%,22%)] text-white shadow-lg group-hover:shadow-xl transition-shadow">
              <GraduationCap className="h-6 w-6" />
            </div>
          </Link>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {isRegister ? "Buat Akun Baru" : "Akun Saya"}
          </CardTitle>
          <CardDescription className="text-gray-500">
            {isRegister
              ? "Daftarkan akun untuk mengakses program pelatihan."
              : "Masukkan email dan password untuk masuk."}
          </CardDescription>
        </CardHeader>

        <form onSubmit={isRegister ? handleRegister : handleLogin}>
          <CardContent className="space-y-4 pt-4">
            {/* Toggle tabs */}
            <div className="grid grid-cols-2 bg-gray-100 rounded-xl p-1 mb-2">
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className={`py-2.5 rounded-lg text-sm font-medium transition-all ${!isRegister
                  ? "bg-[hsl(152,69%,31%)] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                Masuk
              </button>
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className={`py-2.5 rounded-lg text-sm font-medium transition-all ${isRegister
                  ? "bg-[hsl(152,69%,31%)] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                Daftar
              </button>
            </div>

            {isRegister && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">Nama Lengkap</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nama lengkap Anda"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-11 rounded-xl border-gray-200 focus:border-[hsl(152,69%,31%)] focus:ring-[hsl(152,69%,31%)]/20"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="email@anda.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 rounded-xl border-gray-200 focus:border-[hsl(152,69%,31%)] focus:ring-[hsl(152,69%,31%)]/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11 rounded-xl border-gray-200 focus:border-[hsl(152,69%,31%)] focus:ring-[hsl(152,69%,31%)]/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 pt-2">
            <Button
              className="w-full h-12 bg-[hsl(152,69%,31%)] hover:bg-[hsl(152,75%,22%)] text-white rounded-xl shadow-md hover:shadow-lg font-semibold transition-all"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Memproses..."
                : isRegister
                  ? "Daftar Sekarang"
                  : "Masuk"}
              {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
            <p className="text-xs text-gray-400 text-center">
              {isRegister
                ? "Sudah punya akun? "
                : "Belum punya akun? "}
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-[hsl(152,69%,31%)] font-medium hover:underline"
              >
                {isRegister ? "Masuk di sini" : "Daftar di sini"}
              </button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
