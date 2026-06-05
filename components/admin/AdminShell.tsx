"use client"

import { useState } from "react"
import { AdminThemeProvider, useAdminTheme } from "./AdminThemeProvider"
import { AdminSidebar } from "./Sidebar"
import { AdminTopbar } from "./AdminTopbar"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

function AdminShellContent({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const { theme } = useAdminTheme()

  return (
    <div id="admin-wrapper" className={cn("admin-ui min-h-screen", theme === "dark" && "dark")}>
      <style dangerouslySetInnerHTML={{ __html: `
        #public-navbar, #public-footer, #public-whatsapp { display: none !important; }
      `}} />

      <div className="admin-shell">
        <aside className="admin-sidebar-frame">
          <AdminSidebar />
        </aside>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="admin-mobile-sheet">
            <AdminSidebar />
          </SheetContent>
        </Sheet>

        <div className="admin-main-frame">
          <AdminTopbar onMenuClick={() => setOpen(true)} />
          <main className="admin-content">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AdminThemeProvider>
      <AdminShellContent>{children}</AdminShellContent>
    </AdminThemeProvider>
  )
}
