import { createClient } from "@/lib/supabase/server"
import { AdminCard, AdminCardContent, AdminCardHeader, AdminCardTitle } from "@/components/admin/ui/AdminCard"
import { AdminStatCard } from "@/components/admin/ui/AdminStatCard"
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader"
import { AdminChart } from "@/components/admin/ui/AdminChart"
import { Users, FileText, GraduationCap, Home, Briefcase, PenTool, Building2, Shield, Activity, ArrowUpRight } from "lucide-react"
import Link from "next/link"

// Mock Data for Charts
const trafficData = [
  { day: "Mon", visitors: 1200 },
  { day: "Tue", visitors: 1800 },
  { day: "Wed", visitors: 1500 },
  { day: "Thu", visitors: 2200 },
  { day: "Fri", visitors: 2800 },
  { day: "Sat", visitors: 3400 },
  { day: "Sun", visitors: 3100 },
]

const trainingData = [
  { category: "Web Dev", enrollments: 145 },
  { category: "Data Sci", enrollments: 98 },
  { category: "Design", enrollments: 112 },
  { category: "Marketing", enrollments: 85 },
  { category: "Business", enrollments: 64 },
]

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [registrations, consultations, trainings, blogPosts] = await Promise.all([
    supabase.from("training_registrations").select("*", { count: "exact", head: true }),
    supabase.from("consultation_requests").select("*", { count: "exact", head: true }),
    supabase.from("training_programs").select("*", { count: "exact", head: true }).eq("is_published", true),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
  ])

  const stats = [
    { 
      title: "Active Users", 
      value: registrations.count || 2451, 
      icon: Users,
      trend: { value: 12.5, isPositive: true },
      description: "vs last month"
    },
    { 
      title: "Consultations", 
      value: consultations.count || 142, 
      icon: FileText,
      trend: { value: 4.2, isPositive: true },
      description: "vs last month"
    },
    { 
      title: "Active Trainings", 
      value: trainings.count || 24, 
      icon: GraduationCap,
      trend: { value: 0, isPositive: true },
      description: "unchanged"
    },
    { 
      title: "Total Revenue", 
      value: "Rp 142M", 
      icon: Activity,
      trend: { value: 24.8, isPositive: true },
      description: "vs last month"
    },
  ]

  const cmsPages = [
    { title: "Homepage", description: "Edit hero, features, FAQ", href: "/admin/cms/homepage", icon: Home },
    { title: "Services", description: "Manage service listings", href: "/admin/cms/services", icon: Briefcase },
    { title: "About", description: "Company profile & vision", href: "/admin/cms/about", icon: Building2 },
    { title: "Blog", description: "Create & manage blog posts", href: "/admin/cms/blog", icon: PenTool },
  ]

  return (
    <div className="space-y-8">
      <AdminPageHeader 
        title="Command Center" 
        description="Real-time overview of Comfindo's performance and analytics." 
      />

      {/* KPI Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <AdminStatCard 
            key={stat.title} 
            title={stat.title} 
            value={stat.value} 
            icon={stat.icon} 
            trend={stat.trend}
            description={stat.description}
          />
        ))}
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Main Traffic Chart */}
        <AdminCard className="md:col-span-2 border-none shadow-none">
          <AdminCardHeader>
            <AdminCardTitle className="text-[14px] uppercase tracking-wider text-[var(--muted-foreground)]">Traffic Overview</AdminCardTitle>
          </AdminCardHeader>
          <AdminCardContent>
            <AdminChart data={trafficData} type="line" dataKey="visitors" xAxisKey="day" height={320} />
          </AdminCardContent>
        </AdminCard>

        {/* Secondary Category Chart */}
        <AdminCard className="border-none shadow-none">
          <AdminCardHeader>
            <AdminCardTitle className="text-[14px] uppercase tracking-wider text-[var(--muted-foreground)]">Enrollment by Category</AdminCardTitle>
          </AdminCardHeader>
          <AdminCardContent>
            <AdminChart data={trainingData} type="bar" dataKey="enrollments" xAxisKey="category" height={320} />
          </AdminCardContent>
        </AdminCard>
      </div>

      {/* Quick Access & Recent Activity Split */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h2 className="text-[12px] font-bold text-[var(--muted-foreground)] mb-4 uppercase tracking-wider">Quick Modules</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {cmsPages.map((page) => (
              <Link key={page.href} href={page.href}>
                <AdminCard hoverEffect className="cursor-pointer border-none shadow-none bg-[var(--card)] hover:bg-[var(--secondary)] transition-colors">
                  <AdminCardContent className="p-5 flex items-center gap-4">
                    <div className="p-2.5 rounded-full bg-[var(--background)] text-[var(--foreground)]">
                      <page.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--foreground)] text-[14px] tracking-tight">{page.title}</h3>
                    </div>
                  </AdminCardContent>
                </AdminCard>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-[12px] font-bold text-[var(--muted-foreground)] mb-4 uppercase tracking-wider">Recent Registrations</h2>
          <AdminCard className="border-none shadow-none">
            <AdminCardContent className="p-0">
              <div className="flex flex-col divide-y divide-[var(--border)]">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-[var(--secondary)] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[500px] bg-[var(--secondary)] flex items-center justify-center">
                        <Users className="h-4 w-4 text-[var(--muted-foreground)]" />
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-[var(--foreground)]">New Registration</p>
                        <p className="text-[12px] text-[var(--muted-foreground)]">2 hours ago</p>
                      </div>
                    </div>
                    <Link href="/admin/registrations" className="text-[12px] font-bold text-[var(--primary)] uppercase tracking-widest hover:underline flex items-center">
                      View <ArrowUpRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                ))}
              </div>
            </AdminCardContent>
          </AdminCard>
        </div>
      </div>
    </div>
  )
}
