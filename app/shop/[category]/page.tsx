import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/ui/product-card';
import { products, getProductsByCategory } from '@/lib/products';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const CATEGORY_META: Record<string, { label: string; title: string; description: string }> = {
  footwear: {
    label: 'FOOTWEAR',
    title: 'Footwear — VOL.01 — CHOPPED.',
    description: 'Industrial-grade footwear. Hidden orthopedic support. Built for the 02:00 AM shift.',
  },
  outerwear: {
    label: 'OUTERWEAR',
    title: 'Outerwear — VOL.01 — CHOPPED.',
    description: '500GSM French Terry armor. 12oz Duck Canvas. Lumbar-Lock™ compression. No cosplay.',
  },
  essentials: {
    label: 'ESSENTIALS',
    title: 'Essentials — VOL.01 — CHOPPED.',
    description: 'Anti-uniform kit for the veteran. 300GSM tees. Hand-abraded hats. No decoration.',
  },
};

const CATEGORIES = [
  { label: 'ALL', slug: 'all' },
  { label: 'FOOTWEAR', slug: 'footwear' },
  { label: 'OUTERWEAR', slug: 'outerwear' },
  { label: 'ESSENTIALS', slug: 'essentials' },
];

type Props = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  return Object.keys(CATEGORY_META).map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const meta = CATEGORY_META[category];
  if (!meta) return {};
  
  const canonical = `/shop/${category}`;
  
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `CHOPPED. ${meta.label}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/og-image.png'],
    },
  };
}

import { ItemListSchema, BreadcrumbSchema } from '@/components/seo/schema';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://choppedunc.store'

export default async function ShopCategoryPage({ params }: Props) {
  const { category } = await params;

  // Only valid known categories — anything else 404s
  if (!CATEGORY_META[category]) notFound();

  const meta = CATEGORY_META[category];
  const filtered = getProductsByCategory(category);

  const itemListData = filtered.map((p, i) => ({
    name: p.name,
    url: `${BASE_URL}/shop/${p.categorySlug}/${p.slug}`,
    position: i + 1,
  }));

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col">
      <ItemListSchema name={`CHOPPED. ${meta.label} CATALOG`} items={itemListData} />
      <BreadcrumbSchema
        items={[
          { name: 'CHOPPED.', url: BASE_URL },
          { name: 'Museum', url: `${BASE_URL}/shop/all` },
          { name: meta.label, url: `${BASE_URL}/shop/${category}` },
        ]}
      />
      <Header />

      <main className="flex-1 pt-14">
        {/* Page header */}
        <div className="border-b border-border px-6 md:px-12 py-12 bg-black">
          <p className="text-xs font-mono text-muted-foreground tracking-[0.4em] mb-3">
            CATALOG // VOL.01 // {meta.label}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white font-sans uppercase tracking-tight">
            {meta.label}
          </h1>
          <p className="text-sm font-mono text-muted-foreground mt-3">
            {filtered.length} of {products.length} units. Drop: 02:00 AM PST.
          </p>
        </div>

        {/* Category filters */}
        <div className="border-b border-border px-6 md:px-12 flex gap-0 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.slug === 'all' ? '/shop/all' : `/shop/${cat.slug}`}
              className={`text-xs font-mono tracking-widest px-6 py-4 border-r border-border hover:bg-white hover:text-black transition-colors duration-0 whitespace-nowrap ${
                cat.slug === category ? 'text-white bg-white/10' : 'text-muted-foreground'
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Product grid */}
        <div className="px-6 md:px-12 py-12">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-xs font-mono text-muted-foreground tracking-widest mb-4">
                [REDACTED]
              </p>
              <p className="text-sm font-mono text-muted-foreground">
                NO UNITS IN THIS CATEGORY. RETURN AT 02:00 AM PST.
              </p>
              <Link
                href="/shop/all"
                className="inline-block mt-8 text-xs font-mono text-white border border-border px-6 py-3 hover:bg-white hover:text-black transition-colors duration-0 tracking-widest"
              >
                ← SCAN FULL MUSEUM
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
