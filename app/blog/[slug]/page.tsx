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
      title: "Artikel Tidak Ditemukan - comfindo Management",
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

      <article className="py-12 md:py-16">
        <div className="container max-w-3xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20">
          <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <Badge className="bg-[hsl(152,69%,31%)]/10 text-[hsl(152,69%,31%)] border-0 hover:bg-[hsl(152,69%,31%)]/15">{blog.category}</Badge>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-[hsl(152,69%,31%)]" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-[hsl(152,69%,31%)]" />
              <span>{blog.author}</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-[hsl(152,69%,31%)]">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        </div>
      </article>
    </div>
  )
}
