import { MetadataRoute } from 'next'
import { STATIC_SERVICES, STATIC_POSTS } from '@/lib/staticData'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://soultails.com'
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/book`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...STATIC_SERVICES.map(s => ({ url: `${base}/services/${s.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...STATIC_POSTS.map(p => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.publishedAt), changeFrequency: 'monthly' as const, priority: 0.6 })),
  ]
}
