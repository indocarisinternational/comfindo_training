"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import type { ComponentType } from "react"
import {
  Activity,
  Building2,
  Briefcase,
  CheckSquare,
  ChevronDown,
  FileEdit,
  FileText,
  GraduationCap,
  Home,
  LayoutDashboard,
  Link2,
  LogOut,
  MessageSquare,
  PenTool,
  Phone,
  PieChart,
  ShieldAlert,
  UserCog,
  Users,
} from "lucide-react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { AdminButton } from "./AdminButton"

const mainRoutes = [
  { label: "Overview", icon: LayoutDashboard, href: "/admin" },
  { label: "Trainings", icon: GraduationCap, href: "/admin/trainings" },
  { label: "Registrations", icon: Users, href: "/admin/registrations" },
  { label: "Consultations", icon: MessageSquare, href: "/admin/consultations" },
  { label: "Admins", icon: UserCog, href: "/admin/users" },
]

const cmsRoutes = [
  { label: "Homepage", icon: Home, href: "/admin/cms/homepage" },
  { label: "Services", icon: Briefcase, href: "/admin/cms/services" },
  { label: "About", icon: Building2, href: "/admin/cms/about" },
  { label: "Contact", icon: Phone, href: "/admin/cms/contact" },
  { label: "Blog", icon: PenTool, href: "/admin/cms/blog" },
]

const seoRoutes = [
  { label: "Dashboard", icon: Activity, href: "/admin/seo" },
  { label: "Topics", icon: FileText, href: "/admin/seo/topics" },
  { label: "Article Drafts", icon: FileEdit, href: "/admin/seo/article-drafts" },
  { label: "SEO Tasks", icon: CheckSquare, href: "/admin/seo/tasks" },
  { label: "Internal Links", icon: Link2, href: "/admin/seo/internal-links" },
  { label: "Audits", icon: ShieldAlert, href: "/admin/seo/audits" },
  { label: "Reports", icon: PieChart, href: "/admin/seo/reports" },
]

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === href
  if (href === "/admin/seo") return pathname === href
  return pathname.startsWith(href)
}

function NavLink({ route }: { route: { label: string; href: string; icon: ComponentType<{ className?: string }> } }) {
  const pathname = usePathname()
  const active = isActive(pathname, route.href)

  return (
    <AdminButton
      variant="ghost"
      className={cn("admin-nav-item", active && "admin-nav-item-active")}
      asChild
    >
      <Link href={route.href}>
        <route.icon className="h-4 w-4" />
        <span>{route.label}</span>
      </Link>
    </AdminButton>
  )
}

function NavSection({ title, routes, open, onToggle }: {
  title: string
  routes: typeof mainRoutes
  open: boolean
  onToggle: () => void
}) {
  return (
    <section className="admin-nav-section">
      <button type="button" className="admin-nav-section-trigger" onClick={onToggle}>
        <span>{title}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>
      {open ? (
        <div className="admin-sidebar-nav mt-1 space-y-1">
          {routes.map((route) => <NavLink key={route.href} route={route} />)}
        </div>
      ) : null}
    </section>
  )
}

export function AdminSidebar() {
  const router = useRouter()
  const supabase = createClient()
  const [cmsOpen, setCmsOpen] = useState(true)
  const [seoOpen, setSeoOpen] = useState(true)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast.success("Logged out")
    router.push("/login")
    router.refresh()
  }

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-brand">
        <Link href="/admin" className="admin-brand-link">
          <span className="admin-brand-mark"><GraduationCap className="h-4 w-4" /></span>
          <span className="min-w-0">
            <span className="admin-brand-title">Comfindo</span>
            <span className="admin-brand-subtitle">Admin panel</span>
          </span>
        </Link>
      </div>

      <nav className="admin-sidebar-scroll" aria-label="Admin navigation">
        <div className="admin-sidebar-nav space-y-1">
          {mainRoutes.map((route) => <NavLink key={route.href} route={route} />)}
        </div>

        <NavSection title="SEO Engine" routes={seoRoutes} open={seoOpen} onToggle={() => setSeoOpen((value) => !value)} />
        <NavSection title="Content Manager" routes={cmsRoutes} open={cmsOpen} onToggle={() => setCmsOpen((value) => !value)} />
      </nav>

      <div className="admin-sidebar-footer">
        <AdminButton
          variant="ghost"
          className="admin-logout-button"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </AdminButton>
      </div>
    </div>
  )
}
