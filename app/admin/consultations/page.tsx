import { createClient } from "@/lib/supabase/server"
import { DataTable } from "@/dashboard/components/DataTable"
import { columns } from "@/dashboard/consultations/columns"
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader"

export default async function AdminConsultationsPage() {
  const supabase = await createClient()
  const { data } = await supabase.from("consultation_requests").select("*").order("created_at", { ascending: false })
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Consultations"
        description="Track consultation requests and follow-up status."
      />
      <DataTable columns={columns} data={data || []} searchKey="name" />
    </div>
  )
}
