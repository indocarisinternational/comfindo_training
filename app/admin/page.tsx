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
    { title: "Homepage", description: "Edit hero, features, FAQ", href: "/admin/cms/homepage", icon: Home, bg: "bg-tint-peach" },
    { title: "Services", description: "Manage service listings", href: "/admin/cms/services", icon: Briefcase, bg: "bg-tint-rose" },
    { title: "About", description: "Company profile & vision", href: "/admin/cms/about", icon: Building2, bg: "bg-tint-mint" },
    { title: "Blog", description: "Create & manage blog posts", href: "/admin/cms/blog", icon: PenTool, bg: "bg-tint-sky" },
  ]

  return (
    <div className="space-y-12">
      <AdminPageHeader 
        title="Command Center" 
        description="Real-time overview of Comfindo's performance and analytics." 
      />

      {/* Primary Emphasis Section */}
      <AdminCard className="bg-tint-yellow-bold border-none shadow-none">
        <AdminCardContent className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-[28px] font-semibold text-[#37352f] tracking-tight leading-[1.2]">Keep work moving 24/7</h2>
            <p className="text-[16px] text-[#5d5b54] mt-2">Your ecosystem is healthy. 142 new interactions this week.</p>
          </div>
          <Link href="/admin/registrations" className="bg-[var(--primary)] text-white px-6 py-3 rounded-md font-medium text-[14px] hover:bg-opacity-90 transition-colors shrink-0">
            View New Registrations
          </Link>
        </AdminCardContent>
      </AdminCard>

      {/* KPI Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Traffic Chart */}
        <AdminCard className="md:col-span-2">
          <AdminCardHeader>
            <AdminCardTitle className="text-[14px] font-semibold tracking-tight text-[var(--foreground)]">Traffic Overview</AdminCardTitle>
          </AdminCardHeader>
          <AdminCardContent>
            <AdminChart data={trafficData} type="line" dataKey="visitors" xAxisKey="day" height={320} />
          </AdminCardContent>
        </AdminCard>

        {/* Secondary Category Chart */}
        <AdminCard>
          <AdminCardHeader>
            <AdminCardTitle className="text-[14px] font-semibold tracking-tight text-[var(--foreground)]">Enrollment by Category</AdminCardTitle>
          </AdminCardHeader>
          <AdminCardContent>
            <AdminChart data={trainingData} type="bar" dataKey="enrollments" xAxisKey="category" height={320} />
          </AdminCardContent>
        </AdminCard>
      </div>

      {/* Quick Access & Recent Activity Split */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-[18px] font-semibold text-[var(--foreground)] mb-4 tracking-tight">Content Manager</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {cmsPages.map((page) => (
              <Link key={page.href} href={page.href}>
                <AdminCard hoverEffect className={`cursor-pointer ${page.bg} border-none`}>
                  <AdminCardContent className="p-6 flex flex-col gap-3">
                    <div className="p-2 w-fit rounded-md bg-white/50 text-[#37352f]">
                      <page.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#37352f] text-[16px] tracking-tight">{page.title}</h3>
                      <p className="text-[13px] text-[#5d5b54] mt-1">{page.description}</p>
                    </div>
                  </AdminCardContent>
                </AdminCard>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-[18px] font-semibold text-[var(--foreground)] mb-4 tracking-tight">Recent Registrations</h2>
          <AdminCard>
            <AdminCardContent className="p-0">
              <div className="flex flex-col divide-y divide-[var(--border)]">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-[var(--secondary)] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[var(--secondary)] flex items-center justify-center">
                        <Users className="h-4 w-4 text-[var(--muted-foreground)]" />
                      </div>
                      <div>
                        <p className="text-[14px] font-medium text-[var(--foreground)]">New Registration</p>
                        <p className="text-[13px] text-[var(--muted-foreground)]">2 hours ago</p>
                      </div>
                    </div>
                    <Link href="/admin/registrations" className="text-[13px] font-medium text-[var(--primary)] hover:underline flex items-center">
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
