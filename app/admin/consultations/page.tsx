import { createClient } from "@/lib/supabase/server"
import { DataTable } from "@/dashboard/components/DataTable"
import { columns } from "@/dashboard/consultations/columns"

export default async function AdminConsultationsPage() {
  const supabase = await createClient()
  const { data } = await supabase.from("consultation_requests").select("*").order("created_at", { ascending: false })
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Consultations</h1>
      <DataTable columns={columns} data={data || []} searchKey="name" />
    </div>
  )
}
