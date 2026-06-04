import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function SeoAuditDetailPage({ params }: { params: { id: string } }) {
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
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/seo/audits">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">SEO Audit Details</h1>
          <p className="text-[var(--muted-foreground)]">ID: {audit.id}</p>
        </div>
      </div>

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
