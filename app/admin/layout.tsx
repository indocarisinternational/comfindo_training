import { AdminSidebar } from "@/components/admin/Sidebar"
import { AdminThemeProvider } from "@/components/admin/AdminThemeProvider"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminThemeProvider>
      <div id="admin-wrapper" className="flex min-h-screen admin-ui font-sans bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var theme = localStorage.getItem('admin-theme');
              var system = window.matchMedia('(prefers-color-scheme: dark)').matches;
              if (theme === 'dark' || (!theme && system)) {
                document.getElementById('admin-wrapper').classList.add('dark');
              }
            } catch (e) {}
          })();
        `}} />
        <style dangerouslySetInnerHTML={{ __html: `
          #public-navbar, #public-footer, #public-whatsapp { display: none !important; }
        `}} />
        <div className="hidden w-64 md:block fixed h-full z-10 border-r border-[var(--border)] bg-[var(--background)]">
          <AdminSidebar />
        </div>
        <div className="flex-1 md:ml-64 p-6 md:p-8 bg-[var(--background)] min-h-screen transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </div>
    </AdminThemeProvider>
  )
}
