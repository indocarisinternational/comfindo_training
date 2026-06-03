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
    { title: "Total Registrasi", value: registrations.count || 0, icon: Users, color: "text-blue-600 bg-blue-50" },
    { title: "Konsultasi", value: consultations.count || 0, icon: FileText, color: "text-purple-600 bg-purple-50" },
    { title: "Training Aktif", value: trainings.count || 0, icon: GraduationCap, color: "text-comfindo-green bg-comfindo-green/10" },
    { title: "Blog Posts", value: blogPosts.count || 0, icon: PenTool, color: "text-orange-600 bg-orange-50" },
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Selamat datang di comfindo Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CMS Quick Links */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Manager</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cmsPages.map((page) => (
            <Link key={page.href} href={page.href}>
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-comfindo-green/10 text-comfindo-green group-hover:bg-comfindo-green group-hover:text-white transition-all">
                    <page.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-comfindo-green transition-colors">{page.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{page.description}</p>
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
