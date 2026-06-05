"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  MessageSquare,
  LogOut,
  Home,
  Briefcase,
  Building2,
  Phone,
  PenTool,
  ChevronDown,
  UserCog,
  Activity,
  FileText,
  FileEdit,
  CheckSquare,
  Link2,
  ShieldAlert,
  PieChart
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useState } from "react"
import { ThemeToggle } from "./ThemeToggle"

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [cmsOpen, setCmsOpen] = useState(true)
  const [seoOpen, setSeoOpen] = useState(true)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast.success("Logout Berhasil")
    router.push("/login")
    router.refresh()
  }

  const mainRoutes = [
    {
      label: "Overview",
      icon: LayoutDashboard,
      href: "/admin",
      active: pathname === "/admin",
    },
    {
      label: "Trainings",
      icon: GraduationCap,
      href: "/admin/trainings",
      active: pathname.startsWith("/admin/trainings"),
    },
    {
      label: "Registrations",
      icon: Users,
      href: "/admin/registrations",
      active: pathname.startsWith("/admin/registrations"),
    },
    {
      label: "Consultations",
      icon: MessageSquare,
      href: "/admin/consultations",
      active: pathname.startsWith("/admin/consultations"),
    },
    {
      label: "Admins",
      icon: UserCog,
      href: "/admin/users",
      active: pathname.startsWith("/admin/users"),
    },
  ]

  const cmsRoutes = [
    {
      label: "Homepage",
      icon: Home,
      href: "/admin/cms/homepage",
      active: pathname.startsWith("/admin/cms/homepage"),
    },
    {
      label: "Services",
      icon: Briefcase,
      href: "/admin/cms/services",
      active: pathname.startsWith("/admin/cms/services"),
    },
    {
      label: "About",
      icon: Building2,
      href: "/admin/cms/about",
      active: pathname.startsWith("/admin/cms/about"),
    },
    {
      label: "Contact",
      icon: Phone,
      href: "/admin/cms/contact",
      active: pathname.startsWith("/admin/cms/contact"),
    },
    {
      label: "Blog",
      icon: PenTool,
      href: "/admin/cms/blog",
      active: pathname.startsWith("/admin/cms/blog"),
    },
  ]

  const seoRoutes = [
    {
      label: "Dashboard",
      icon: Activity,
      href: "/admin/seo",
      active: pathname === "/admin/seo",
    },
    {
      label: "Topics",
      icon: FileText,
      href: "/admin/seo/topics",
      active: pathname.startsWith("/admin/seo/topics"),
    },
    {
      label: "Article Drafts",
      icon: FileEdit,
      href: "/admin/seo/article-drafts",
      active: pathname.startsWith("/admin/seo/article-drafts"),
    },
    {
      label: "SEO Tasks",
      icon: CheckSquare,
      href: "/admin/seo/tasks",
      active: pathname.startsWith("/admin/seo/tasks"),
    },
    {
      label: "Internal Links",
      icon: Link2,
      href: "/admin/seo/internal-links",
      active: pathname.startsWith("/admin/seo/internal-links"),
    },
    {
      label: "Audits",
      icon: ShieldAlert,
      href: "/admin/seo/audits",
      active: pathname.startsWith("/admin/seo/audits"),
    },
    {
      label: "Reports",
      icon: PieChart,
      href: "/admin/seo/reports",
      active: pathname.startsWith("/admin/seo/reports"),
    },
  ]

  return (
    <div className="pb-12 min-h-screen border-r border-[var(--border)] bg-[var(--background)] flex flex-col transition-colors duration-300 overflow-y-auto">
      <div className="space-y-4 py-4 flex-1">
        <div className="px-3 py-2">
          <Link href="/admin" className="flex items-center gap-2 px-4 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[var(--foreground)] text-[var(--background)]">
              <GraduationCap className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
              Comfindo Admin
            </span>
          </Link>

          {/* Main Routes */}
          <div className="space-y-1">
            {mainRoutes.map((route) => (
              <Button
                key={route.href}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-sm h-9 px-3 transition-colors rounded-full uppercase tracking-wider text-[12px]",
                  route.active 
                    ? "bg-[var(--secondary)] text-[var(--primary)] font-bold" 
                    : "text-[var(--muted-foreground)] font-normal hover:text-[var(--foreground)] hover:bg-[var(--secondary)]"
                )}
                asChild
              >
                <Link href={route.href}>
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>

          {/* SEO Engine Section */}
          <div className="mt-6">
            <button
              onClick={() => setSeoOpen(!seoOpen)}
              className="flex items-center justify-between w-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.05em] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              <span>SEO Engine</span>
              <ChevronDown className={cn("h-3 w-3 transition-transform", seoOpen && "rotate-180")} />
            </button>
            {seoOpen && (
              <div className="space-y-1 mt-1">
                {seoRoutes.map((route) => (
                  <Button
                    key={route.href}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-sm h-9 px-3 transition-colors",
                      route.active 
                        ? "bg-[var(--secondary)] text-[var(--foreground)] font-medium" 
                        : "text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]"
                    )}
                    asChild
                  >
                    <Link href={route.href}>
                      <route.icon className="mr-2 h-4 w-4" />
                      {route.label}
                    </Link>
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* CMS Section */}
          <div className="mt-6">
            <button
              onClick={() => setCmsOpen(!cmsOpen)}
              className="flex items-center justify-between w-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.05em] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              <span>Content Manager</span>
              <ChevronDown className={cn("h-3 w-3 transition-transform", cmsOpen && "rotate-180")} />
            </button>
            {cmsOpen && (
              <div className="space-y-1 mt-1">
                {cmsRoutes.map((route) => (
                  <Button
                    key={route.href}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-sm h-9 px-3 transition-colors",
                      route.active 
                        ? "bg-[var(--secondary)] text-[var(--foreground)] font-medium" 
                        : "text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]"
                    )}
                    asChild
                  >
                    <Link href={route.href}>
                      <route.icon className="mr-2 h-4 w-4" />
                      {route.label}
                    </Link>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-3 py-4 border-t border-[var(--border)] flex flex-col gap-4">
        <ThemeToggle />
        <Button
          variant="ghost"
          className="w-full justify-start text-[var(--destructive)] hover:text-[var(--destructive)] hover:bg-red-100 h-9 transition-colors rounded-full uppercase tracking-wider text-[12px] font-bold"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}
