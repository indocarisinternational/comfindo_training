import { createClient } from "@/lib/supabase/server"
import { DataTable } from "@/dashboard/components/DataTable"
import { columns } from "./columns"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default async function SeoAuditsPage() {
  const supabase = await createClient()
  
  const { data: audits, error } = await supabase
    .from("seo_audits")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">SEO Audits</h1>
        <p className="text-[var(--muted-foreground)]">View technical and content SEO audit results.</p>
      </div>

      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Gagal mengambil data SEO Audits. Pastikan tabel <code>seo_audits</code> sudah ada.
          </AlertDescription>
        </Alert>
      ) : (
        <DataTable columns={columns} data={audits || []} searchKey="page_url" />
      )}
    </div>
  )
}
