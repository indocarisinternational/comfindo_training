import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import { DataTable } from "@/dashboard/components/DataTable"
import { columns } from "@/dashboard/trainings/columns"

export default async function AdminTrainingsPage() {
  const supabase = await createClient()
  const { data: trainings } = await supabase.from("trainings").select("*").order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Trainings</h1>
        <Button asChild className="bg-comfindo-green hover:bg-comfindo-green-dark">
          <Link href="/admin/trainings/create"><Plus className="mr-2 h-4 w-4" /> Create Training</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={trainings || []} searchKey="title" />
    </div>
  )
}
