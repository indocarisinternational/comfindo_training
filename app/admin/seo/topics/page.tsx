import { createClient } from "@/lib/supabase/server"
import { DataTable } from "@/dashboard/components/DataTable"
import { columns } from "./columns"
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader"
import { AdminErrorState } from "@/components/admin/ui/AdminErrorState"

export default async function Page() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("seo_topics")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="SEO Topics"
        description="Manage article and topic queue for the SEO engine."
      />

      {error ? (
        <AdminErrorState
          title="Unable to load data"
          description="Gagal mengambil data SEO Topics. Pastikan tabel seo_topics sudah ada."
        />
      ) : (
        <DataTable columns={columns} data={data || []} searchKey="title" />
      )}
    </div>
  )
}
