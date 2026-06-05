import { createClient } from "@/lib/supabase/server"
import { DataTable } from "@/dashboard/components/DataTable"
import { columns } from "./columns"
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader"
import { AdminErrorState } from "@/components/admin/ui/AdminErrorState"

export default async function Page() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("seo_daily_reports")
    .select("*")
    .order("report_date", { ascending: false })

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Daily Reports"
        description="Browse generated SEO performance reports."
      />

      {error ? (
        <AdminErrorState
          title="Unable to load data"
          description="Gagal mengambil data daily reports. Pastikan tabel seo_daily_reports sudah ada."
        />
      ) : (
        <DataTable columns={columns} data={data || []} searchKey="report_date" />
      )}
    </div>
  )
}
