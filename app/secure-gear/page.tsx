import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { products } from '@/lib/products';
import { AcquireButton } from '@/components/ui/acquire-button';
import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://choppedunc.store';

export const metadata: Metadata = {
  title: 'SECURE GEAR — CHOPPED.',
  description: 'The complete VOL.01 hardware and streetwear system. Always active.',
  alternates: { canonical: `${BASE_URL}/secure-gear` },
  openGraph: {
    title: 'SECURE GEAR — CHOPPED.',
    description: 'The complete VOL.01 hardware and streetwear system. Always active.',
    url: `${BASE_URL}/secure-gear`,
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CHOPPED. SECURE GEAR' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SECURE GEAR — CHOPPED.',
    description: 'The complete VOL.01 hardware and streetwear system. Always active.',
    images: ['/og-image.png'],
  },
};

export default function SecureGearPage() {
  // Render all active products
  const activeProducts = products.filter(p => p.status === 'ACTIVE');

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-20 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 border-l-2 border-[#FF0000] pl-6">
            <span className="text-[#FF0000] text-xs font-mono tracking-[0.4em] uppercase">
              ▮ SYSTEM_ONLINE // VOL 01 CATALOG ACTIVE
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white font-sans uppercase tracking-tighter mt-4">
              SECURE<br />GEAR.
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {activeProducts.map((product) => (
              <div key={product.id} className="border border-border bg-black p-4 sm:p-8 group">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-1/2 aspect-[4/5] bg-[#111] relative overflow-hidden border border-border">
                    {product.image && (
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    )}
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm border border-border px-3 py-1">
                      <span className="text-[10px] font-mono text-white tracking-widest uppercase">
                        {product.sku}
                      </span>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white uppercase font-sans mb-2 tracking-tight">
                        {product.name}
                      </h2>
                      <p className="text-xs font-mono text-muted-foreground mb-6 uppercase tracking-wider">
                        {product.shortDesc}
                      </p>
                      <div className="space-y-2 mb-8">
                        {product.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <span className="text-[#FF0000] text-[10px]">▮</span>
                            <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-white font-mono mb-4">
                        ${product.price.toFixed(2)}
                      </p>
                      <AcquireButton product={product} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
