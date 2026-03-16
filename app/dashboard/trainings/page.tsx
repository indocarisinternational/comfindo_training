import { createClient } from "@/lib/supabase/server"
import { Training, columns } from "@/dashboard/trainings/columns"
import { DataTable } from "@/dashboard/components/DataTable"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export default async function TrainingsPage() {
  const supabase = await createClient()
  const { data: trainings } = await supabase
    .from("trainings")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <div>
                 <h2 className="text-3xl font-bold tracking-tight">Manage Trainings</h2>
                 <p className="text-muted-foreground">List of all available training programs.</p>
            </div>
            <Button asChild>
                <Link href="/dashboard/trainings/create">
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Link>
            </Button>
        </div>
      
      <DataTable columns={columns} data={trainings as Training[] || []} searchKey="title" />
    </div>
  )
}
