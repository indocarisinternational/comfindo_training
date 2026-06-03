import { AdminSidebar } from "@/components/admin/Sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen admin-ui font-sans text-[#111111] bg-[#FBFBFA]">
      <style dangerouslySetInnerHTML={{ __html: `
        #public-navbar, #public-footer, #public-whatsapp { display: none !important; }
      `}} />
      <div className="hidden w-64 md:block fixed h-full z-10">
        <AdminSidebar />
      </div>
      <div className="flex-1 md:ml-64 p-6 md:p-8 bg-[#FBFBFA] min-h-screen">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
