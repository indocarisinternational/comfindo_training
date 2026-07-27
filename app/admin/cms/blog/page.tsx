"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AdminCard as Card, AdminCardContent as CardContent } from "@/components/admin/ui/AdminCard"
import { toast } from "sonner"
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2, Calendar } from "lucide-react"
import Link from "next/link"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  author_name: string
  is_published: boolean
  published_at: string | null
  created_at: string
}

export default function BlogManager() {
  const supabase = createClient()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadPosts() }, [])

  async function loadPosts() {
    const { data } = await supabase.from("blog_posts").select("id, title, slug, excerpt, category, author_name, is_published, published_at, created_at").order("created_at", { ascending: false })
    if (data) setPosts(data)
    setLoading(false)
  }

  async function togglePublish(id: string, current: boolean) {
    const update: any = { is_published: !current }
    if (!current) update.published_at = new Date().toISOString()
    
    toast.promise(
      (async () => {
        const { error } = await supabase.from("blog_posts").update(update).eq("id", id)
        if (error) throw error
        loadPosts()
      })(),
      {
        loading: current ? 'Menyembunyikan...' : 'Mempublikasi...',
        success: current ? "Post unpublished" : "Post published!",
        error: 'Gagal memproses'
      }
    )
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus blog post ini?")) return
    
    toast.promise(
      (async () => {
        const { error } = await supabase.from("blog_posts").delete().eq("id", id)
        if (error) throw error
        loadPosts()
      })(),
      {
        loading: 'Menghapus...',
        success: 'Post deleted!',
        error: 'Gagal menghapus'
      }
    )
  }

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Blog Manager</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">{posts.length} total posts</p>
        </div>
        <Button asChild className="">
          <Link href="/admin/cms/blog/new"><Plus className="mr-2 h-4 w-4" /> New Post</Link>
        </Button>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <Card key={post.id} className="border border-[var(--border)] shadow-sm transition-shadow hover:shadow-md">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex-1 min-w-0 mr-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-[var(--foreground)] truncate">{post.title}</h3>
                  <Badge variant={post.is_published ? "default" : "secondary"} className={post.is_published ? "bg-tint-mint text-[var(--primary)] shrink-0" : "shrink-0"}>
                    {post.is_published ? "Published" : "Draft"}
                  </Badge>
                </div>
                <p className="text-sm text-[var(--muted-foreground)] truncate">{post.excerpt || "No excerpt"}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-[var(--muted-foreground)]">
                  {post.category && <Badge variant="outline" className="text-xs">{post.category}</Badge>}
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.created_at).toLocaleDateString("id-ID")}
                  </span>
                  <span>{post.author_name}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button size="icon" variant="ghost" onClick={() => togglePublish(post.id, post.is_published)} title={post.is_published ? "Unpublish" : "Publish"}>
                  {post.is_published ? <Eye className="h-4 w-4 text-[var(--primary)]" /> : <EyeOff className="h-4 w-4" />}
                </Button>
                <Button size="icon" variant="ghost" asChild>
                  <Link href={`/admin/cms/blog/${post.id}/edit`}><Pencil className="h-4 w-4" /></Link>
                </Button>
                <Button size="icon" variant="ghost" className="text-red-500" onClick={() => handleDelete(post.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {posts.length === 0 && (
          <div className="text-center py-16 text-[var(--muted-foreground)]">
            <PenIcon className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="text-lg font-medium">Belum ada blog post</p>
            <p className="text-sm mt-1">Klik &quot;New Post&quot; untuk mulai menulis.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function PenIcon(props: any) {
  return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
}
