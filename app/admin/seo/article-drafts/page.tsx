import { createClient } from "@/lib/supabase/server"
import { DataTable } from "@/dashboard/components/DataTable"
import { columns } from "./columns"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default async function SeoArticleDraftsPage() {
  const supabase = await createClient()
  
  const { data: drafts, error } = await supabase
    .from("seo_article_drafts")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Article Drafts</h1>
        <p className="text-[var(--muted-foreground)]">Review AI-generated SEO article drafts.</p>
      </div>

      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Gagal mengambil data Article Drafts. Pastikan tabel <code>seo_article_drafts</code> sudah ada.
          </AlertDescription>
        </Alert>
      ) : (
        <DataTable columns={columns} data={drafts || []} searchKey="title" />
      )}
    </div>
  )
}
