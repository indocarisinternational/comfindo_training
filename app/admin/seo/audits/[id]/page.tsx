import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { AdminCard as Card, AdminCardContent as CardContent, AdminCardHeader as CardHeader, AdminCardTitle as CardTitle } from "@/components/admin/ui/AdminCard"
import { AdminButton } from "@/components/admin/AdminButton"
import Link from "next/link"
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader"
import { ArrowLeft } from "lucide-react"

export default async function SeoAuditDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient()
  
  const { data: audit, error } = await supabase
    .from("seo_audits")
    .select("*")
    .eq("id", params.id)
    .single()

  if (error || !audit) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="SEO Audit Details"
        description={`ID: ${audit.id}`}
        action={
          <AdminButton variant="outline" size="icon" asChild>
            <Link href="/admin/seo/audits"><ArrowLeft className="h-4 w-4" /></Link>
          </AdminButton>
        }
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Page URL</div>
              <div className="break-all">{audit.page_url}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Audit Type</div>
              <div>{audit.audit_type}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Score</div>
              <div className="text-2xl font-bold">{audit.score || '-'}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>On-Page Elements Found</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Title</div>
              <div>{audit.title_found || '-'}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Meta Description</div>
              <div>{audit.meta_description_found || '-'}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">H1 Tag</div>
              <div>{audit.h1_found || '-'}</div>
            </div>
          </CardContent>
        </Card>

        {audit.issues_json && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Issues Found (JSON)</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                {JSON.stringify(audit.issues_json, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}

        {audit.recommendations_json && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recommendations (JSON)</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                {JSON.stringify(audit.recommendations_json, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
