import { PageHeader } from "@/components/common/PageHeader"
import { blogs } from "@/lib/data/blog"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Calendar, User } from "lucide-react"

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug
  const blog = blogs.find((b) => b.slug === slug)

  if (!blog) {
    return {
      title: "Article Not Found - MSI Consulting",
    }
  }

  return {
    title: blog.seoTitle,
    description: blog.seoDescription,
  }
}

export async function generateStaticParams() {
  return blogs.map((b) => ({
    slug: b.slug,
  }))
}

export default async function BlogDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const blog = blogs.find((b) => b.slug === params.slug)

  if (!blog) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title={blog.title}
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: "Artikel", href: "#" },
        ]}
      />

      <article className="py-16 md:py-24">
        <div className="container max-w-3xl">
           <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
             <Badge>{blog.category}</Badge>
             <div className="flex items-center gap-1">
               <Calendar className="h-4 w-4" />
               <span>{blog.date}</span>
             </div>
             <div className="flex items-center gap-1">
               <User className="h-4 w-4" />
               <span>{blog.author}</span>
             </div>
           </div>

           <div className="prose prose-lg dark:prose-invert max-w-none">
             <div dangerouslySetInnerHTML={{ __html: blog.content }} />
           </div>
        </div>
      </article>
    </div>
  )
}
