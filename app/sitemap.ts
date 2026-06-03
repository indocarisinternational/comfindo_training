import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'
import { services } from '@/lib/data/services'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://comfindomanagement.com'
  const supabase = await createClient()

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/training',
    '/blog',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : (route === '/training' ? 0.9 : 0.8),
  }))

  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const { data: trainingData } = await supabase
    .from("training_programs")
    .select("slug, updated_at, created_at")
    .eq("is_published", true)

  const trainingRoutes = (trainingData || []).map((training) => ({
    url: `${baseUrl}/training/${training.slug}`,
    lastModified: new Date(training.updated_at || training.created_at || Date.now()),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const { data: blogData } = await supabase
    .from("blog_posts")
    .select("slug, updated_at, published_at")
    .eq("is_published", true)

  const blogRoutes = (blogData || []).map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.updated_at || blog.published_at || Date.now()),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...serviceRoutes, ...trainingRoutes, ...blogRoutes]
}
