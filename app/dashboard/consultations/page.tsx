import { createClient } from "@/lib/supabase/server"
import { Consultation, columns } from "@/dashboard/consultations/columns"
import { DataTable } from "@/dashboard/components/DataTable"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default async function ConsultationsPage() {
  const supabase = await createClient()
  const { data: consultations } = await supabase
    .from("consultation_requests")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <div>
                 <h2 className="text-3xl font-bold tracking-tight">Consultation Requests</h2>
                 <p className="text-muted-foreground">Inquiries for ISO consultation services.</p>
            </div>
            <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
        </div>
      
      <DataTable columns={columns} data={consultations as Consultation[] || []} searchKey="name" />
    </div>
  )
}
