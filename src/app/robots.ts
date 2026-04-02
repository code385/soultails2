import { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://soultails.com'
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin/', '/api/', '/studio/'] }],
    sitemap: `${base}/sitemap.xml`,
  }
}
