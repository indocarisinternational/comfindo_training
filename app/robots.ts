import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin', '/admin/*', '/login'],
    },
    sitemap: 'https://comfindomanagement.com/sitemap.xml',
  }
}
