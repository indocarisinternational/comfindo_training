import { createClient } from "@/lib/supabase/server"
import { DataTable } from "@/dashboard/components/DataTable"
import { columns } from "./columns"
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader"
import { AdminErrorState } from "@/components/admin/ui/AdminErrorState"

export default async function Page() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("seo_internal_link_suggestions")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Internal Links"
        description="Review internal link suggestions and target pages."
      />

      {error ? (
        <AdminErrorState
          title="Unable to load data"
          description="Gagal mengambil data internal links. Pastikan tabel seo_internal_link_suggestions sudah ada."
        />
      ) : (
        <DataTable columns={columns} data={data || []} searchKey="source_url" />
      )}
    </div>
  )
}
