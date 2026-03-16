import { StatsCard } from "@/dashboard/components/StatsCard"
import { createClient } from "@/lib/supabase/server"
import { Users, FileText, GraduationCap, BarChart3 } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()

  // Parallel data fetching
  const [registrations, consultations, trainings] = await Promise.all([
    supabase.from("training_registrations").select("*", { count: "exact", head: true }),
    supabase.from("consultation_requests").select("*", { count: "exact", head: true }),
    supabase.from("trainings").select("*", { count: "exact", head: true }).eq("status", "active"),
  ])

  // Mock data for chart (in a real app, aggregation would be done via SQL or edge function)
  // For now we'll just show the cards as requested.

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Registrasi" 
          value={registrations.count || 0} 
          description="Total peserta training"
          icon={Users}
        />
        <StatsCard 
          title="Request Konsultasi" 
          value={consultations.count || 0} 
          description="Total permintaan masuk"
          icon={FileText}
        />
        <StatsCard 
          title="Training Aktif" 
          value={trainings.count || 0} 
          description="Jadwal training tersedia"
          icon={GraduationCap}
        />
        <StatsCard 
          title="Conversion Rate" 
          value="--%" 
          description="Belum tersedia"
          icon={BarChart3}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6">
                <h3 className="font-semibold">Grafik Registrasi (Dummy)</h3>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground bg-muted/20 rounded-md mt-4">
                    Chart Integration Placeholder
                </div>
            </div>
        </div>
        <div className="col-span-3 rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6">
                <h3 className="font-semibold">Registrasi Terbaru (Dummy)</h3>
                <div className="space-y-4 mt-4">
                    <div className="text-sm text-muted-foreground text-center py-8">
                        Belum ada data registrasi terbaru.
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
