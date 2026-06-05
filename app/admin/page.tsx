import { createClient } from "@/lib/supabase/server"
import { AdminCard, AdminCardContent } from "@/components/admin/ui/AdminCard"
import { AdminStatCard } from "@/components/admin/ui/AdminStatCard"
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader"
import { Users, FileText, GraduationCap, Home, Briefcase, PenTool, Building2, Shield } from "lucide-react"
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
      <AdminPageHeader 
        title="Dashboard Overview" 
        description="Selamat datang di Comfindo Admin Panel" 
      />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <AdminStatCard key={stat.title} title={stat.title} value={stat.value} icon={stat.icon} />
        ))}
      </div>

      {/* CMS Quick Links */}
      <div>
        <h2 className="text-[14px] font-bold text-[var(--foreground)] mb-5 uppercase tracking-wider">Content Manager</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cmsPages.map((page) => (
            <Link key={page.href} href={page.href}>
              <AdminCard hoverEffect className="cursor-pointer">
                <AdminCardContent className="p-6 flex items-start gap-4">
                  <div className="p-3 rounded-full bg-[var(--secondary)] text-[var(--foreground)]">
                    <page.icon className="h-5 w-5" />
                  </div>
                  <div className="pt-0.5">
                    <h3 className="font-bold text-[var(--foreground)] text-[16px] tracking-tight">{page.title}</h3>
                    <p className="text-[14px] text-[var(--muted-foreground)] mt-1 leading-relaxed font-normal">{page.description}</p>
                  </div>
                </AdminCardContent>
              </AdminCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
