import { PageHeader } from "@/components/common/PageHeader"
import { blogs } from "@/lib/data/blog"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog & Artikel ISO - MSI Consulting",
  description: "Insight dan informasi terbaru seputar standar ISO, manajemen bisnis, dan training profesional.",
}

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Blog & Wawasan"
        description="Artikel terbaru seputar standar ISO, tips manajemen, dan berita industri."
        breadcrumbs={[{ label: "Blog", href: "/blog" }]}
      />

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <Card key={blog.slug} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                 {/* Placeholder Image */}
                 <div className="h-48 bg-muted w-full flex items-center justify-center text-muted-foreground">
                    Image Placeholder
                 </div>
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="secondary">{blog.category}</Badge>
                    <span className="text-xs text-muted-foreground">{blog.date}</span>
                  </div>
                  <CardTitle className="line-clamp-2">
                    <Link href={`/blog/${blog.slug}`} className="hover:text-primary transition-colors">
                      {blog.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground line-clamp-3 text-sm">
                    {blog.excerpt}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="link" className="px-0 text-primary">
                    <Link href={`/blog/${blog.slug}`}>
                      Baca Selengkapnya
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
