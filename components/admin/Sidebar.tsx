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
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useState } from "react"

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [cmsOpen, setCmsOpen] = useState(true)

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

  return (
    <div className="pb-12 min-h-screen border-r bg-white flex flex-col">
      <div className="space-y-4 py-4 flex-1">
        <div className="px-3 py-2">
          <Link href="/admin" className="flex items-center gap-2 px-4 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-comfindo-green to-comfindo-green-dark text-white">
              <GraduationCap className="h-4 w-4" />
            </div>
            <span className="text-base font-bold tracking-tight text-gray-900">
              comfindo Admin
            </span>
          </Link>

          {/* Main Routes */}
          <div className="space-y-1">
            {mainRoutes.map((route) => (
              <Button
                key={route.href}
                variant={route.active ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-sm",
                  route.active && "bg-comfindo-green/10 text-comfindo-green font-semibold"
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

          {/* CMS Section */}
          <div className="mt-6">
            <button
              onClick={() => setCmsOpen(!cmsOpen)}
              className="flex items-center justify-between w-full px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-gray-600 transition-colors"
            >
              <span>Content Manager</span>
              <ChevronDown className={cn("h-3 w-3 transition-transform", cmsOpen && "rotate-180")} />
            </button>
            {cmsOpen && (
              <div className="space-y-1 mt-1">
                {cmsRoutes.map((route) => (
                  <Button
                    key={route.href}
                    variant={route.active ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start text-sm",
                      route.active && "bg-comfindo-green/10 text-comfindo-green font-semibold"
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

      <div className="px-3 py-4 border-t">
        <Button
          variant="outline"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 text-sm"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}
