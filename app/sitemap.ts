import { MetadataRoute } from 'next'
import { services } from '@/lib/data/services'
import { trainings } from '@/lib/data/trainings'
import { blogs } from '@/lib/data/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://comfindomanagement.com'

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
    priority: route === '' ? 1 : 0.8,
  }))

  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const trainingRoutes = trainings.map((training) => ({
    url: `${baseUrl}/training/${training.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const blogRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(), // Ideally use blog.date if formatted correctly
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...serviceRoutes, ...trainingRoutes, ...blogRoutes]
}
