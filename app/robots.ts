import type { MetadataRoute } from 'next'
import { siteMetadata } from '@/lib/seo'

/** Search crawler policy: index public pages while excluding APIs and the CMS. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${siteMetadata.url}/sitemap.xml`,
    host: siteMetadata.url,
  }
}
