import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Plus } from "lucide-react"
import { DataTable } from "@/dashboard/components/DataTable"
import { columns } from "@/dashboard/trainings/columns"
import { AdminButton } from "@/components/admin/AdminButton"
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader"

export default async function AdminTrainingsPage() {
  const supabase = await createClient()
  const { data: trainings } = await supabase.from("training_programs").select("*").order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Trainings"
        description="Manage published and draft training programs."
        action={
          <AdminButton asChild>
            <Link href="/admin/trainings/create"><Plus className="h-4 w-4" /> Create Training</Link>
          </AdminButton>
        }
      />
      <DataTable columns={columns} data={trainings || []} searchKey="title" />
    </div>
  )
}
