import { PageHeader } from "@/components/common/PageHeader"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Blog - comfindo Management",
  description: "Artikel, tips, dan insight seputar pelatihan, sertifikasi, dan pengembangan kompetensi dari comfindo Management.",
}

export default async function BlogPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false })

  const allPosts = posts || []
  const featuredPost = allPosts[0]
  const remainingPosts = allPosts.slice(1)

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Blog"
        description="Artikel, tips, dan insight seputar pelatihan dan pengembangan kompetensi."
        breadcrumbs={[{ label: "Blog", href: "/blog" }]}
      />

      <section className="py-12 md:py-16 bg-white">
        <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20">

          {allPosts.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum ada artikel</h3>
              <p className="text-gray-500">Artikel terbaru akan ditampilkan di sini.</p>
            </div>
          )}

          {/* Featured Post */}
          {featuredPost && (
            <Link href={`/blog/${featuredPost.slug}`} className="block group mb-12">
              <div className="grid lg:grid-cols-2 gap-8 bg-[hsl(152,15%,97%)] rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 lg:h-auto bg-gradient-to-br from-comfindo-green/20 to-comfindo-green/5 flex items-center justify-center overflow-hidden">
                  {featuredPost.cover_image_url ? (
                    <img src={featuredPost.cover_image_url} alt={featuredPost.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="text-comfindo-green/20 text-8xl font-black">{featuredPost.title.charAt(0)}</div>
                  )}
                  <Badge className="absolute top-4 left-4 bg-comfindo-green text-white shadow-md">Featured</Badge>
                </div>
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  {featuredPost.category && (
                    <Badge variant="outline" className="w-fit mb-3 text-comfindo-green border-comfindo-green/30">
                      {featuredPost.category}
                    </Badge>
                  )}
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 group-hover:text-comfindo-green transition-colors line-clamp-2">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-5 line-clamp-3">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" /> {featuredPost.author_name}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {featuredPost.published_at ? new Date(featuredPost.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : ""}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> {featuredPost.read_time_minutes} min read
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Post Grid */}
          {remainingPosts.length > 0 && (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {remainingPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                  <article className="flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-48 bg-gradient-to-br from-comfindo-green/15 to-comfindo-green/5 flex items-center justify-center overflow-hidden">
                      {post.cover_image_url ? (
                        <img src={post.cover_image_url} alt={post.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="text-comfindo-green/15 text-7xl font-black">{post.title.charAt(0)}</div>
                      )}
                      {post.category && (
                        <Badge className="absolute top-3 left-3 bg-white/90 text-gray-700 text-xs shadow-sm">{post.category}</Badge>
                      )}
                    </div>
                    <div className="flex-1 p-5 flex flex-col">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-comfindo-green transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <div className="w-5 h-5 rounded-full bg-comfindo-green/10 flex items-center justify-center text-[10px] font-bold text-comfindo-green">
                              {post.author_name?.charAt(0) || "C"}
                            </div>
                            {post.author_name}
                          </span>
                        </div>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {post.read_time_minutes} min
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
