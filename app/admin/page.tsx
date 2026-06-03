import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, GraduationCap, BarChart3, Home, Briefcase, PenTool, Building2, Shield } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [registrations, consultations, trainings, blogPosts] = await Promise.all([
    supabase.from("training_registrations").select("*", { count: "exact", head: true }),
    supabase.from("consultation_requests").select("*", { count: "exact", head: true }),
    supabase.from("training_programs").select("*", { count: "exact", head: true }).eq("is_published", true),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
  ])

  const stats = [
    { title: "Total Registrasi", value: registrations.count || 0, icon: Users },
    { title: "Konsultasi", value: consultations.count || 0, icon: FileText },
    { title: "Training Aktif", value: trainings.count || 0, icon: GraduationCap },
    { title: "Blog Posts", value: blogPosts.count || 0, icon: PenTool },
  ]

  const cmsPages = [
    { title: "Homepage", description: "Edit hero, features, FAQ, testimonials", href: "/admin/cms/homepage", icon: Home },
    { title: "Services", description: "Manage service listings", href: "/admin/cms/services", icon: Briefcase },
    { title: "About", description: "Company profile, vision & mission", href: "/admin/cms/about", icon: Building2 },
    { title: "Certificates", description: "Kelola lisensi & sertifikat BNSP", href: "/admin/cms/certificates", icon: Shield },
    { title: "Contact", description: "Address, phone, social links", href: "/admin/cms/contact", icon: FileText },
    { title: "Blog", description: "Create & manage blog posts", href: "/admin/cms/blog", icon: PenTool },
    { title: "Trainings", description: "Manage training programs", href: "/admin/trainings", icon: GraduationCap },
    { title: "Admin Users", description: "Undang dan kelola akses admin", href: "/admin/users", icon: Users },
  ]

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-[28px] font-semibold tracking-tight text-[#111111]">Dashboard Overview</h1>
        <p className="text-[#787774] mt-1 text-[15px]">Selamat datang di Comfindo Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border border-[#EAEAEA] shadow-none bg-white rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-5 px-5">
              <CardTitle className="text-[13px] font-medium text-[#787774]">{stat.title}</CardTitle>
              <div className="text-[#111111] opacity-50">
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="text-3xl font-semibold text-[#111111] tracking-tight">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CMS Quick Links */}
      <div>
        <h2 className="text-[15px] font-semibold text-[#111111] mb-5 uppercase tracking-[0.05em]">Content Manager</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cmsPages.map((page) => (
            <Link key={page.href} href={page.href}>
              <Card className="border border-[#EAEAEA] shadow-none bg-white hover:bg-[#FBFBFA] transition-colors duration-200 cursor-pointer rounded-xl">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="p-2 rounded-md bg-[#111111] text-white">
                    <page.icon className="h-4 w-4" />
                  </div>
                  <div className="pt-0.5">
                    <h3 className="font-semibold text-[#111111] text-sm tracking-tight">{page.title}</h3>
                    <p className="text-[13px] text-[#787774] mt-1 leading-relaxed">{page.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
