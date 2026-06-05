import { createClient } from "@/lib/supabase/server"
import { DataTable } from "@/dashboard/components/DataTable"
import { columns } from "@/dashboard/registrations/columns"
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader"

export default async function AdminRegistrationsPage() {
  const supabase = await createClient()
  const { data } = await supabase.from("training_registrations").select("*").order("created_at", { ascending: false })
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Registrations"
        description="Review incoming training registrations and participant details."
      />
      <DataTable columns={columns} data={data || []} searchKey="name" />
    </div>
  )
}
