import { createClient } from "@/lib/supabase/server"
import { Registration, columns } from "@/dashboard/registrations/columns"
import { DataTable } from "@/dashboard/components/DataTable"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default async function RegistrationsPage() {
  const supabase = await createClient()
  const { data: registrations } = await supabase
    .from("training_registrations")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <div>
                 <h2 className="text-3xl font-bold tracking-tight">Registrations</h2>
                 <p className="text-muted-foreground">List of all training registrations.</p>
            </div>
            {/* Export button would trigger a client side CSV download logic, kept simple here */}
            <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
        </div>
      
      <DataTable columns={columns} data={registrations as Registration[] || []} searchKey="name" />
    </div>
  )
}
