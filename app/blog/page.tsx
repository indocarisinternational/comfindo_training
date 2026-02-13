import { PageHeader } from "@/components/common/PageHeader"
import { blogs } from "@/lib/data/blog"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog & Artikel - comfindo Management",
  description: "Insight dan informasi terbaru seputar pelatihan, sertifikasi kompetensi, dan dunia kerja dari comfindo Management.",
}

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Blog & Wawasan"
        description="Artikel terbaru seputar pelatihan, sertifikasi, dan tips pengembangan karier."
        breadcrumbs={[{ label: "Blog", href: "/blog" }]}
      />

      <section className="py-12 md:py-16">
        <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <Card key={blog.slug} className="group flex flex-col overflow-hidden border-0 shadow-md rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-[hsl(152,40%,92%)] to-[hsl(152,30%,85%)] w-full flex items-center justify-center overflow-hidden">
                  <div className="text-[hsl(152,69%,31%)] opacity-15 text-4xl font-black">comfindo</div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="secondary" className="bg-[hsl(152,69%,31%)]/8 text-[hsl(152,69%,31%)] border-0 text-xs">
                      {blog.category}
                    </Badge>
                    <span className="text-xs text-gray-400">{blog.date}</span>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">
                    <Link href={`/blog/${blog.slug}`} className="hover:text-[hsl(152,69%,31%)] transition-colors">
                      {blog.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-gray-500 line-clamp-3 text-sm leading-relaxed">
                    {blog.excerpt}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    variant="ghost"
                    className="text-[hsl(152,69%,31%)] hover:bg-[hsl(152,69%,31%)]/5 px-0 group/btn"
                  >
                    <Link href={`/blog/${blog.slug}`}>
                      Baca Selengkapnya
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
