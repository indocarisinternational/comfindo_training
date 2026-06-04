import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, FileEdit, ShieldAlert, CheckSquare } from "lucide-react"

export default async function SeoReportDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  
  const { data: report, error } = await supabase
    .from("seo_daily_reports")
    .select("*")
    .eq("id", params.id)
    .single()

  if (error || !report) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/seo/reports">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Daily Report Details</h1>
          <p className="text-[var(--muted-foreground)]">Date: {new Date(report.report_date).toLocaleDateString("id-ID")}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Articles Generated</CardTitle>
            <FileEdit className="h-4 w-4 text-[var(--muted-foreground)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{report.articles_generated}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Audits Created</CardTitle>
            <ShieldAlert className="h-4 w-4 text-[var(--muted-foreground)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{report.audits_created}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Created</CardTitle>
            <CheckSquare className="h-4 w-4 text-[var(--muted-foreground)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{report.tasks_created}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{report.summary || 'No summary available.'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{report.recommendations || 'No recommendations available.'}</p>
          </CardContent>
        </Card>

        {report.raw_report_json && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Raw Report (JSON)</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                {JSON.stringify(report.raw_report_json, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
