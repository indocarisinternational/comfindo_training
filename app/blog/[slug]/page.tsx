import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { PageHeader } from "@/components/common/PageHeader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowLeft, Share2, Facebook, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

export const revalidate = 60

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params
  const supabase = await createClient()
  const { data: post } = await supabase.from("blog_posts").select("seo_title, seo_description, title, excerpt").eq("slug", params.slug).eq("is_published", true).single()
  if (!post) return { title: "Artikel Tidak Ditemukan - comfindo Management" }
  return { title: post.seo_title || post.title, description: post.seo_description || post.excerpt }
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const supabase = await createClient()
  const { data: post } = await supabase.from("blog_posts").select("*").eq("slug", params.slug).eq("is_published", true).single()

  if (!post) notFound()

  // Get related posts
  const { data: relatedPosts } = await supabase
    .from("blog_posts")
    .select("title, slug, excerpt, cover_image_url, read_time_minutes, author_name, published_at")
    .eq("is_published", true)
    .neq("slug", params.slug)
    .order("published_at", { ascending: false })
    .limit(3)

  const tags = Array.isArray(post.tags) ? post.tags : []
  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
    : ""

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": post.cover_image_url ? [post.cover_image_url] : [],
    "datePublished": post.published_at || new Date().toISOString(),
    "dateModified": post.updated_at || post.published_at || new Date().toISOString(),
    "author": [{
      "@type": "Person",
      "name": post.author_name || "Admin comfindo",
      "url": "https://comfindomanagement.com/about"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "comfindo Management",
      "logo": {
        "@type": "ImageObject",
        "url": "https://comfindomanagement.com/logo.png"
      }
    },
    "description": post.seo_description || post.excerpt
  }

  return (
    <div className="flex flex-col min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {/* Hero with cover image */}
      {post.cover_image_url ? (
        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
          <img src={post.cover_image_url} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="container max-w-4xl mx-auto px-5 sm:px-8 py-12">
              <Button asChild variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10 mb-4">
                <Link href="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Blog</Link>
              </Button>
              {post.category && <Badge className="bg-comfindo-green text-white mb-3">{post.category}</Badge>}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-5 text-sm text-white/70">
                <span className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xs">
                    {post.author_name?.charAt(0) || "C"}
                  </div>
                  {post.author_name}
                </span>
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {publishedDate}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {post.read_time_minutes} min read</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PageHeader
          title={post.title}
          breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: "Artikel", href: "#" }]}
        />
      )}

      {/* Content */}
      <article className="py-12 md:py-16">
        <div className="container max-w-4xl mx-auto px-5 sm:px-8">
          {/* Author info if no cover */}
          {!post.cover_image_url && (
            <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-comfindo-green/10 flex items-center justify-center text-comfindo-green font-bold text-xs">
                  {post.author_name?.charAt(0) || "C"}
                </div>
                {post.author_name}
              </span>
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {publishedDate}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {post.read_time_minutes} min read</span>
              {post.category && <Badge variant="outline" className="text-comfindo-green border-comfindo-green/30">{post.category}</Badge>}
            </div>
          )}

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed mb-8 pb-8 border-b border-gray-100 font-medium">
              {post.excerpt}
            </p>
          )}

          {/* Rich content */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-comfindo-green prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-blockquote:border-l-comfindo-green prose-blockquote:bg-comfindo-green/5 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-strong:text-gray-900 prose-code:text-comfindo-green prose-code:bg-comfindo-green/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-100">
              {tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-comfindo-green/10 hover:text-comfindo-green transition-colors cursor-default">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Share */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <Share2 className="h-4 w-4" /> Share:
              </span>
              <div className="flex gap-2">
                {[
                  { label: "Twitter", color: "bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white" },
                  { label: "Facebook", color: "bg-[#4267B2]/10 text-[#4267B2] hover:bg-[#4267B2] hover:text-white" },
                  { label: "LinkedIn", color: "bg-[#0077B5]/10 text-[#0077B5] hover:bg-[#0077B5] hover:text-white" },
                ].map((social) => (
                  <button key={social.label} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${social.color}`}>
                    {social.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="py-12 md:py-16 bg-[hsl(152,15%,97%)] border-t border-gray-100">
          <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Artikel Lainnya</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((rp: any) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group">
                  <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5">
                    <div className="relative h-40 bg-gradient-to-br from-comfindo-green/15 to-comfindo-green/5 flex items-center justify-center overflow-hidden">
                      {rp.cover_image_url ? (
                        <img src={rp.cover_image_url} alt={rp.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="text-comfindo-green/15 text-6xl font-black">{rp.title.charAt(0)}</div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-comfindo-green transition-colors">{rp.title}</h3>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-3">{rp.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{rp.author_name}</span>
                        <span>{rp.read_time_minutes} min</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
