import { createClient } from "@/lib/supabase/server"
import { DataTable } from "@/dashboard/components/DataTable"
import { columns } from "./columns"
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader"
import { AdminErrorState } from "@/components/admin/ui/AdminErrorState"

export default async function Page() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("seo_article_drafts")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Article Drafts"
        description="Review generated article drafts and publishing status."
      />

      {error ? (
        <AdminErrorState
          title="Unable to load data"
          description="Gagal mengambil data article drafts. Pastikan tabel seo_article_drafts sudah ada."
        />
      ) : (
        <DataTable columns={columns} data={data || []} searchKey="title" />
      )}
    </div>
  )
}
