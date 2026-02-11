import { DashboardSidebar } from "@/dashboard/components/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-64 md:block fixed h-full z-10">
        <DashboardSidebar />
      </div>
      <div className="flex-1 md:ml-64 p-8 bg-gray-50/50 min-h-screen">
        {children}
      </div>
    </div>
  )
}
