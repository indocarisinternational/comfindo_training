import { createClient } from "@/lib/supabase/server"
import { DataTable } from "@/dashboard/components/DataTable"
import { columns } from "./columns"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default async function SeoInternalLinksPage() {
  const supabase = await createClient()
  
  const { data: links, error } = await supabase
    .from("seo_internal_link_suggestions")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Internal Links</h1>
        <p className="text-[var(--muted-foreground)]">Review internal link recommendations.</p>
      </div>

      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Gagal mengambil data Internal Links. Pastikan tabel <code>seo_internal_link_suggestions</code> sudah ada.
          </AlertDescription>
        </Alert>
      ) : (
        <DataTable columns={columns} data={links || []} searchKey="source_url" />
      )}
    </div>
  )
}
