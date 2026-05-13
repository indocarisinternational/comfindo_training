import { createClient } from "@/lib/supabase/server"
import { DataTable } from "@/dashboard/components/DataTable"
import { columns } from "@/dashboard/registrations/columns"

export default async function AdminRegistrationsPage() {
  const supabase = await createClient()
  const { data } = await supabase.from("training_registrations").select("*").order("created_at", { ascending: false })
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Registrations</h1>
      <DataTable columns={columns} data={data || []} searchKey="name" />
    </div>
  )
}
