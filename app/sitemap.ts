import { MetadataRoute } from 'next'
import { products } from '@/lib/products'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://chopped.store'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/manifesto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/shop/all`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/advisory-board`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/scan`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/transmit`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  const productPages: MetadataRoute.Sitemap = products
    .filter((p) => p.status !== 'REDACTED')
    .map((product) => ({
      url: `${BASE_URL}/shop/${product.categorySlug}/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  // Include all products in sitemap (even REDACTED) — Googlebot can still discover the URL structure
  const allProductPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/shop/${product.categorySlug}/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: product.status === 'REDACTED' ? 0.6 : 0.8,
  }))

  return [...staticPages, ...allProductPages]
}
