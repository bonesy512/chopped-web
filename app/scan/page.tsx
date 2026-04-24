import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/ui/product-card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Scan System — CHOPPED.',
  description: 'Scan the CHOPPED. system. Search the full VOL.01 archive.',
};

export default function ScanPage() {
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col">
      <Header />

      <main className="flex-1 pt-14">
        {/* Search header */}
        <div className="border-b border-border px-6 md:px-12 py-8 bg-black">
          <p className="text-xs font-mono text-muted-foreground tracking-[0.4em] mb-4">
            SCAN_SYSTEM // ACTIVE
          </p>
          <div className="flex gap-0 border border-border max-w-2xl">
            <span className="text-muted-foreground font-mono text-sm px-4 flex items-center border-r border-border">
              ⌕
            </span>
            <input
              type="text"
              placeholder="> SCAN SYSTEM — ENTER QUERY"
              className="flex-1 bg-transparent text-white text-sm font-mono px-4 py-4 placeholder:text-muted-foreground focus:outline-none focus:bg-white/5 transition-colors"
              autoFocus
            />
          </div>
        </div>

        {/* Results — show all products as default */}
        <div className="px-6 md:px-12 py-12">
          <p className="text-xs font-mono text-muted-foreground tracking-widest mb-8">
            RESULTS // VOL.01 — FIELD SCAN ACTIVE — {products.length} UNITS
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
