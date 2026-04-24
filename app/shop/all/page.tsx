import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/ui/product-card';
import { products } from '@/lib/products';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ItemListSchema, BreadcrumbSchema } from '@/components/seo/schema';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://choppedunc.store'

export const metadata: Metadata = {
  title: 'Museum — VOL.01: The Support System — CHOPPED.',
  description: 'Scan the full VOL.01 archive. Industrial-grade hardware and ageless streetwear. Drop: 02:00 AM PST.',
  openGraph: {
    title: 'THE MUSEUM — VOL.01 — CHOPPED.',
    description: 'The complete VOL.01 hardware archive. Engineered for the midnight shift.',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CHOPPED. MUSEUM' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'THE MUSEUM — CHOPPED.',
    description: 'The full hardware archive for the friction.',
    images: ['/og-image.png'],
  },
};

const CATEGORIES = [
  { label: 'ALL', slug: 'all' },
  { label: 'FOOTWEAR', slug: 'footwear' },
  { label: 'OUTERWEAR', slug: 'outerwear' },
  { label: 'BOTTOMS', slug: 'bottoms' },
  { label: 'ESSENTIALS', slug: 'essentials' },
  { label: 'HARDWARE', slug: 'hardware' },
  { label: 'SUPPORT', slug: 'support' },
];

export default function ShopAllPage() {
  const itemListData = products.map((p, i) => ({
    name: p.name,
    url: `${BASE_URL}/shop/${p.categorySlug}/${p.slug}`,
    position: i + 1,
  }));

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col">
      <ItemListSchema name="CHOPPED. VOL.01 CATALOG" items={itemListData} />
      <BreadcrumbSchema
        items={[
          { name: 'CHOPPED.', url: BASE_URL },
          { name: 'Museum', url: `${BASE_URL}/shop/all` },
        ]}
      />
      <Header />

      <main className="flex-1 pt-14">
        {/* Page header */}
        <div className="border-b border-border px-6 md:px-12 py-12 bg-black">
          <p className="text-xs font-mono text-muted-foreground tracking-[0.4em] mb-3">
            CATALOG // VOL.01
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white font-sans uppercase tracking-tight">
            THE MUSEUM
          </h1>
          <p className="text-sm font-mono text-muted-foreground mt-3">
            {products.length} items. All rights reserved. Drop: 02:00 AM PST.
          </p>
        </div>

        {/* Category filters */}
        <div className="border-b border-border px-6 md:px-12 flex gap-0 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.slug === 'all' ? '/shop/all' : `/shop/${cat.slug}`}
              className={`text-xs font-mono tracking-widest px-6 py-4 border-r border-border hover:bg-white hover:text-black transition-colors duration-0 whitespace-nowrap ${
                cat.slug === 'all' ? 'text-white bg-white/10' : 'text-muted-foreground'
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Product grid */}
        <div className="px-6 md:px-12 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
