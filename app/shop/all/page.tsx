import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/ui/product-card';
import { products } from '@/lib/products';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Museum — VOL.01: The Support System — CHOPPED.',
  description: 'Scan the full VOL.01 archive. 5 items. Drop: 02:00 AM PST.',
};

const CATEGORIES = [
  { label: 'ALL', slug: 'all' },
  { label: 'FOOTWEAR', slug: 'footwear' },
  { label: 'OUTERWEAR', slug: 'outerwear' },
  { label: 'ESSENTIALS', slug: 'essentials' },
];

export default function ShopAllPage() {
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col">
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
