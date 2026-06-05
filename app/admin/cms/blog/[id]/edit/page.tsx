"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AdminInput as Input } from "@/components/admin/ui/AdminInput"
import { AdminTextarea as Textarea } from "@/components/admin/ui/AdminTextarea"
import { AdminLabel as Label } from "@/components/admin/ui/AdminLabel"
import { AdminCard as Card, AdminCardContent as CardContent, AdminCardHeader as CardHeader, AdminCardTitle as CardTitle } from "@/components/admin/ui/AdminCard"
import { toast } from "sonner"
import { Save, Loader2, ArrowLeft, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { RichTextEditor } from "@/components/admin/RichTextEditor"

export default function EditBlogPost() {
  const supabase = createClient()
  const router = useRouter()
  const params = useParams()
  const postId = params.id as string
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
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
    is_published: false,
  })

  useEffect(() => { loadPost() }, [postId])

  async function loadPost() {
    const { data, error } = await supabase.from("blog_posts").select("*").eq("id", postId).single()
    if (error || !data) { toast.error("Post not found"); router.push("/admin/cms/blog"); return }
    setPost({
      title: data.title || "",
      slug: data.slug || "",
      excerpt: data.excerpt || "",
      content: data.content || "",
      cover_image_url: data.cover_image_url || "",
      author_name: data.author_name || "Tim comfindo",
      author_avatar_url: data.author_avatar_url || "",
      category: data.category || "",
      tags: (data.tags || []).join(", "),
      seo_title: data.seo_title || "",
      seo_description: data.seo_description || "",
      is_published: data.is_published || false,
    })
    setLoading(false)
  }

  function estimateReadTime(html: string) {
    const text = html.replace(/<[^>]*>/g, "")
    return Math.max(1, Math.ceil(text.split(/\s+/).length / 200))
  }

  async function handleSave(publish?: boolean) {
    if (!post.title.trim()) { toast.error("Title is required"); return }
    setSaving(true)
    try {
      const isPublished = publish !== undefined ? publish : post.is_published
      const payload: any = {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        cover_image_url: post.cover_image_url,
        author_name: post.author_name,
        author_avatar_url: post.author_avatar_url,
        category: post.category,
        tags: post.tags ? post.tags.split(",").map((t: string) => t.trim()) : [],
        seo_title: post.seo_title || post.title,
        seo_description: post.seo_description || post.excerpt,
        read_time_minutes: estimateReadTime(post.content),
        is_published: isPublished,
        updated_at: new Date().toISOString(),
      }
      if (publish === true) payload.published_at = new Date().toISOString()

      const { error } = await supabase.from("blog_posts").update(payload).eq("id", postId)
      if (error) throw error
      toast.success("Post updated!")
      setPost({ ...post, is_published: isPublished })
    } catch (error: any) {
      toast.error("Error", { description: error.message })
    } finally { setSaving(false) }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-comfindo-green" /></div>

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/cms/blog"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Post</h1>
            <p className="text-sm text-gray-500">{post.slug}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleSave()} disabled={saving}>
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save
          </Button>
          {post.is_published ? (
            <Button variant="outline" onClick={() => handleSave(false)} disabled={saving} className="text-orange-600 border-orange-300 hover:bg-orange-50">
              <EyeOff className="mr-2 h-4 w-4" /> Unpublish
            </Button>
          ) : (
            <Button onClick={() => handleSave(true)} disabled={saving} className="bg-comfindo-green hover:bg-comfindo-green-dark">
              <Eye className="mr-2 h-4 w-4" /> Publish
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} className="text-lg font-semibold h-12" />
              </div>
              <div className="space-y-2">
                <Label>Excerpt</Label>
                <Textarea value={post.excerpt} onChange={(e) => setPost({ ...post, excerpt: e.target.value })} rows={3} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Content</CardTitle></CardHeader>
            <CardContent>
              <RichTextEditor content={post.content} onChange={(html) => setPost({ ...post, content: html })} />
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
                <Input value={post.category} onChange={(e) => setPost({ ...post, category: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Tags (comma separated)</Label>
                <Input value={post.tags} onChange={(e) => setPost({ ...post, tags: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Cover Image URL</Label>
                <Input value={post.cover_image_url} onChange={(e) => setPost({ ...post, cover_image_url: e.target.value })} />
                {post.cover_image_url && <img src={post.cover_image_url} alt="Cover" className="w-full h-32 object-cover rounded-lg mt-2" />}
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
                <Input value={post.author_avatar_url} onChange={(e) => setPost({ ...post, author_avatar_url: e.target.value })} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">SEO</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>SEO Title</Label>
                <Input value={post.seo_title} onChange={(e) => setPost({ ...post, seo_title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>SEO Description</Label>
                <Textarea value={post.seo_description} onChange={(e) => setPost({ ...post, seo_description: e.target.value })} rows={3} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
