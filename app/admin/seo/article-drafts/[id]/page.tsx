import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { AdminCard as Card, AdminCardContent as CardContent, AdminCardHeader as CardHeader, AdminCardTitle as CardTitle } from "@/components/admin/ui/AdminCard"
import { Badge } from "@/components/ui/badge"
import { AdminButton } from "@/components/admin/AdminButton"
import Link from "next/link"
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader"
import { ArrowLeft } from "lucide-react"
import { SeoDraftActions } from "@/components/admin/SeoDraftActions"

export default async function SeoArticleDraftDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient()
  
  const { data: draft, error } = await supabase
    .from("seo_article_drafts")
    .select("*")
    .eq("id", params.id)
    .single()

  if (error || !draft) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Review Article Draft"
        description={`ID: ${draft.id}`}
        action={
          <AdminButton variant="outline" size="icon" asChild>
            <Link href="/admin/seo/article-drafts"><ArrowLeft className="h-4 w-4" /></Link>
          </AdminButton>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                {draft.content ? (
                  <div dangerouslySetInnerHTML={{ __html: draft.content }} />
                ) : (
                  <p className="text-muted-foreground italic">No content available.</p>
                )}
              </div>
            </CardContent>
          </Card>

          {(draft.faq_json || draft.internal_links_json) && (
             <div className="grid gap-6 md:grid-cols-2">
               {draft.faq_json && (
                 <Card>
                   <CardHeader>
                     <CardTitle className="text-lg">FAQ JSON</CardTitle>
                   </CardHeader>
                   <CardContent>
                     <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                       {JSON.stringify(draft.faq_json, null, 2)}
                     </pre>
                   </CardContent>
                 </Card>
               )}
               {draft.internal_links_json && (
                 <Card>
                   <CardHeader>
                     <CardTitle className="text-lg">Internal Links JSON</CardTitle>
                   </CardHeader>
                   <CardContent>
                     <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                       {JSON.stringify(draft.internal_links_json, null, 2)}
                     </pre>
                   </CardContent>
                 </Card>
               )}
             </div>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Status</div>
                <Badge variant={
                  draft.status === 'draft' ? 'secondary' : 
                  draft.status === 'approved' ? 'default' : 
                  draft.status === 'rejected' ? 'destructive' : 'default'
                }>{draft.status}</Badge>
              </div>
              {draft.status === 'rejected' && draft.rejection_reason && (
                <div>
                  <div className="text-sm font-medium text-destructive mb-1">Rejection Reason</div>
                  <div className="text-sm text-destructive">{draft.rejection_reason}</div>
                </div>
              )}
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Quality Score</div>
                <div className="font-medium">{draft.quality_score || '-'}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Title</div>
                <div className="font-medium">{draft.title}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Focus Keyword</div>
                <div>{draft.focus_keyword}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Target URL</div>
                <div className="break-all text-sm">{draft.target_url}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">SEO Title</div>
                <div className="text-sm">{draft.seo_title || '-'}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">SEO Description</div>
                <div className="text-sm">{draft.seo_description || '-'}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <SeoDraftActions 
                draftId={draft.id} 
                status={draft.status} 
                publishedBlogPostId={draft.published_blog_post_id} 
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
