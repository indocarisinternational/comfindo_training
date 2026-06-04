import { createClient } from "@/lib/supabase/server"
import { DataTable } from "@/dashboard/components/DataTable"
import { columns } from "./columns"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default async function SeoTopicsPage() {
  const supabase = await createClient()
  
  const { data: topics, error } = await supabase
    .from("seo_topics")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">SEO Topics</h1>
        <p className="text-[var(--muted-foreground)]">Manage article/topic queue for SEO engine.</p>
      </div>

      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Gagal mengambil data SEO Topics. Pastikan tabel <code>seo_topics</code> sudah ada.
          </AlertDescription>
        </Alert>
      ) : (
        <DataTable columns={columns} data={topics || []} searchKey="title" />
      )}
    </div>
  )
}
