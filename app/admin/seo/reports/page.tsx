import { createClient } from "@/lib/supabase/server"
import { DataTable } from "@/dashboard/components/DataTable"
import { columns } from "./columns"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default async function SeoReportsPage() {
  const supabase = await createClient()
  
  const { data: reports, error } = await supabase
    .from("seo_daily_reports")
    .select("*")
    .order("report_date", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Daily Reports</h1>
        <p className="text-[var(--muted-foreground)]">View daily SEO engine reports.</p>
      </div>

      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Gagal mengambil data SEO Reports. Pastikan tabel <code>seo_daily_reports</code> sudah ada.
          </AlertDescription>
        </Alert>
      ) : (
        <DataTable columns={columns} data={reports || []} searchKey="report_date" />
      )}
    </div>
  )
}
