"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AdminInput as Input } from "@/components/admin/ui/AdminInput"
import { AdminTextarea as Textarea } from "@/components/admin/ui/AdminTextarea"
import { AdminLabel as Label } from "@/components/admin/ui/AdminLabel"
import { AdminCard as Card, AdminCardContent as CardContent, AdminCardHeader as CardHeader, AdminCardTitle as CardTitle } from "@/components/admin/ui/AdminCard"
import { toast } from "sonner"
import { Save, Loader2, ArrowLeft, Eye } from "lucide-react"
import Link from "next/link"
import { RichTextEditor } from "@/components/admin/RichTextEditor"
import { SEOAnalyzer } from "@/components/admin/SEOAnalyzer"

export default function NewBlogPost() {
  const supabase = createClient()
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [post, setPost] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image_url: "",
    author_name: "Tim comfindo",
    author_avatar_url: "",
    category: "",
    tags: "",
    seo_title: "",
    seo_description: "",
    focus_keyword: "",
    is_published: false,
  })

  function generateSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
  }

  function estimateReadTime(html: string) {
    const text = html.replace(/<[^>]*>/g, "")
    const words = text.split(/\s+/).length
    return Math.max(1, Math.ceil(words / 200))
  }

  async function handleSave(publish = false) {
    if (!post.title.trim()) { toast.error("Title is required"); return }
    setSaving(true)
    try {
      const payload = {
        title: post.title,
        slug: post.slug || generateSlug(post.title),
        excerpt: post.excerpt,
        content: post.content,
        cover_image_url: post.cover_image_url,
        author_name: post.author_name,
        author_avatar_url: post.author_avatar_url,
        category: post.category,
        tags: post.tags ? post.tags.split(",").map((t: string) => t.trim()) : [],
        seo_title: post.seo_title || post.title,
        seo_description: post.seo_description || post.excerpt,
        focus_keyword: post.focus_keyword,
        read_time_minutes: estimateReadTime(post.content),
        is_published: publish || post.is_published,
        published_at: publish ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      }

      const { error } = await supabase.from("blog_posts").insert([payload])
      if (error) throw error
      toast.success(publish ? "Post published!" : "Draft saved!")
      router.push("/admin/cms/blog")
    } catch (error: any) {
      toast.error("Error", { description: error.message })
    } finally { setSaving(false) }
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/cms/blog"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">New Blog Post</h1>
            <p className="text-sm text-[var(--muted-foreground)]">Tulis artikel baru untuk blog</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleSave(false)} disabled={saving}>
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Draft
          </Button>
          <Button onClick={() => handleSave(true)} disabled={saving} className="">
            <Eye className="mr-2 h-4 w-4" /> Publish
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value, slug: generateSlug(e.target.value) })}
                  placeholder="Judul artikel yang menarik..."
                  className="text-lg font-semibold h-12"
                />
              </div>
              <div className="space-y-2">
                <Label>Excerpt</Label>
                <Textarea
                  value={post.excerpt}
                  onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                  placeholder="Ringkasan singkat artikel (tampil di card blog)..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Content</CardTitle></CardHeader>
            <CardContent>
              <RichTextEditor
                content={post.content}
                onChange={(html) => setPost({ ...post, content: html })}
                placeholder="Mulai menulis artikel Anda di sini..."
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-lg">Post Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={post.slug} onChange={(e) => setPost({ ...post, slug: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input value={post.category} onChange={(e) => setPost({ ...post, category: e.target.value })} placeholder="Sertifikasi, Tips Karier..." />
              </div>
              <div className="space-y-2">
                <Label>Tags (comma separated)</Label>
                <Input value={post.tags} onChange={(e) => setPost({ ...post, tags: e.target.value })} placeholder="BNSP, sertifikasi, karier" />
              </div>
              <div className="space-y-2">
                <Label>Cover Image URL</Label>
                <Input value={post.cover_image_url} onChange={(e) => setPost({ ...post, cover_image_url: e.target.value })} placeholder="https://..." />
                {post.cover_image_url && (
                  <img src={post.cover_image_url} alt="Cover" className="w-full h-32 object-cover rounded-lg mt-2" />
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Author</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Author Name</Label>
                <Input value={post.author_name} onChange={(e) => setPost({ ...post, author_name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Avatar URL</Label>
                <Input value={post.author_avatar_url} onChange={(e) => setPost({ ...post, author_avatar_url: e.target.value })} placeholder="https://..." />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">SEO</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>SEO Title</Label>
                <Input value={post.seo_title} onChange={(e) => setPost({ ...post, seo_title: e.target.value })} placeholder="Default: post title" />
              </div>
              <div className="space-y-2">
                <Label>SEO Description</Label>
                <Textarea value={post.seo_description} onChange={(e) => setPost({ ...post, seo_description: e.target.value })} placeholder="Default: post excerpt" rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Focus Keyword</Label>
                <Input value={post.focus_keyword} onChange={(e) => setPost({ ...post, focus_keyword: e.target.value })} placeholder="Kata kunci utama..." />
              </div>
            </CardContent>
          </Card>
          
          <SEOAnalyzer 
            focusKeyword={post.focus_keyword}
            title={post.title}
            slug={post.slug}
            seoTitle={post.seo_title}
            seoDescription={post.seo_description}
            content={post.content}
          />
        </div>
      </div>
    </div>
  )
}
