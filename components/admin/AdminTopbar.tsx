"use client"

import { Menu, Moon, Search, Sun } from "lucide-react"
import { usePathname } from "next/navigation"
import { AdminButton } from "./AdminButton"
import { useAdminTheme } from "./AdminThemeProvider"

const titleMap: Record<string, string> = {
  "/admin": "Command Center",
  "/admin/trainings": "Trainings",
  "/admin/registrations": "Registrations",
  "/admin/consultations": "Consultations",
  "/admin/users": "Admins",
  "/admin/seo": "SEO Engine",
  "/admin/cms/homepage": "Homepage",
  "/admin/cms/services": "Services",
  "/admin/cms/about": "About",
  "/admin/cms/contact": "Contact",
  "/admin/cms/blog": "Blog",
  "/admin/cms/certificates": "Certificates",
}

function resolveTitle(pathname: string) {
  const exact = titleMap[pathname]
  if (exact) return exact
  if (pathname.startsWith("/admin/seo/article-drafts")) return "Article Drafts"
  if (pathname.startsWith("/admin/seo/internal-links")) return "Internal Links"
  if (pathname.startsWith("/admin/seo/reports")) return "Daily Reports"
  if (pathname.startsWith("/admin/seo/audits")) return "SEO Audits"
  if (pathname.startsWith("/admin/seo/tasks")) return "SEO Tasks"
  if (pathname.startsWith("/admin/seo/topics")) return "SEO Topics"
  return "Admin"
}

export function AdminTopbar({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname()
  const { theme, toggleTheme } = useAdminTheme()

  return (
    <header className="admin-topbar">
      <div className="flex min-w-0 items-center gap-3">
        <AdminButton
          type="button"
          variant="ghost"
          size="icon"
          className="admin-icon-button md:hidden"
          onClick={onMenuClick}
          aria-label="Open admin menu"
        >
          <Menu className="h-4 w-4" />
        </AdminButton>
        <div className="min-w-0">
          <p className="admin-topbar-kicker">Admin workspace</p>
          <h2 className="admin-topbar-title">{resolveTitle(pathname)}</h2>
        </div>
      </div>

      <div className="admin-topbar-actions">
        <div className="admin-search-pill">
          <Search className="h-4 w-4" />
          <span>Search workspace</span>
        </div>
        <AdminButton
          type="button"
          variant="ghost"
          size="icon"
          className="admin-icon-button"
          onClick={toggleTheme}
          aria-label="Toggle admin theme"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </AdminButton>
      </div>
    </header>
  )
}
