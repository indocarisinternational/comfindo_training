import { createClient } from "@/lib/supabase/server"
import { DataTable } from "@/dashboard/components/DataTable"
import { columns } from "./columns"
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader"
import { AdminErrorState } from "@/components/admin/ui/AdminErrorState"

export default async function Page() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("seo_tasks")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="SEO Tasks"
        description="Track technical SEO tasks and operational follow-ups."
      />

      {error ? (
        <AdminErrorState
          title="Unable to load data"
          description="Gagal mengambil data SEO tasks. Pastikan tabel seo_tasks sudah ada."
        />
      ) : (
        <DataTable columns={columns} data={data || []} searchKey="title" />
      )}
    </div>
  )
}
