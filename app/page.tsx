import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/ui/product-card';
import { DropTimer } from '@/components/ui/drop-timer';
import { products } from '@/lib/products';
import { OrganizationSchema, WebSiteSchema, ItemListSchema } from '@/components/seo/schema';
import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://chopped.store';

export const metadata: Metadata = {
  title: 'CHOPPED. — High-Performance Ageless Streetwear',
  description:
    'Engineered for the midnight shift. 500GSM French Terry armor, ORTH3-AGGR orthopedic support, industrial hardware. Limited drops at 02:00 AM PST. Austin, TX.',
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: 'CHOPPED. — Function For The Friction.',
    description: 'High-Performance Ageless Streetwear. Nocturnal drops 02:00 AM PST.',
    url: BASE_URL,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CHOPPED. — Function For The Friction.' }],
  },
};

export default function Home() {
  const productListItems = products.map((p, i) => ({
    name: p.name,
    url: `${BASE_URL}/shop/${p.categorySlug}/${p.slug}`,
    position: i + 1,
  }));

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col">
      <OrganizationSchema />
      <WebSiteSchema />
      <ItemListSchema name="CHOPPED. VOL.01 Collection" items={productListItems} />
      <Header />

      {/* ── HERO ── */}
      <section className="min-h-screen pt-14 border-b border-border flex flex-col relative overflow-hidden">
        {/* Grid lines background */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* HUD corner labels */}
        <div className="absolute top-16 left-4 text-[10px] text-muted-foreground font-mono">
          NODE: // CHK // 02:00_PST
        </div>
        <div className="absolute top-16 right-4 text-[10px] text-muted-foreground font-mono text-right">
          VOL.01 / THE_SUPPORT_SYSTEM
        </div>

        {/* Hero content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-20 gap-12 text-center relative z-10">
          {/* Main headline */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-mono text-muted-foreground tracking-[0.4em] uppercase">
              Austin, TX — Est. 02:00 AM
            </p>
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-white font-sans leading-none uppercase">
              FUNCTION<br />
              FOR THE<br />
              <span className="text-[#FF0000]">FRICTION.</span>
            </h1>
            <p className="text-sm sm:text-base font-mono text-muted-foreground max-w-md mx-auto leading-relaxed">
              High-Performance Ageless Streetwear engineered for the midnight shift.
              <br />
              We don&apos;t hide the grey. We wear it with all-black suede.
            </p>
          </div>

          {/* Drop timer */}
          <div className="border border-border bg-black/60 px-8 py-6 backdrop-blur-sm w-full max-w-lg">
            <p className="text-[10px] font-mono text-muted-foreground tracking-[0.3em] mb-4 border-b border-border pb-3">
              ▮ NEXT_DROP_SEQUENCE_ACTIVE
            </p>
            <DropTimer />
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-0 w-full max-w-sm">
            <a
              href="/shop/all"
              className="flex-1 border border-white bg-black text-white text-xs font-mono tracking-widest py-4 px-6 hover:bg-white hover:text-black transition-colors duration-0 text-center"
            >
              SCAN THE MUSEUM
            </a>
            <a
              href="/manifesto"
              className="flex-1 border border-border bg-transparent text-muted-foreground text-xs font-mono tracking-widest py-4 px-6 hover:border-white hover:text-white transition-colors duration-0 text-center"
            >
              READ THE MANIFESTO
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center pb-8 text-muted-foreground text-xs font-mono animate-bounce">
          ↓ SCROLL TO SCAN
        </div>
      </section>

      {/* ── MUSEUM GRID ── */}
      <section id="museum" className="border-b border-border py-20 bg-[#080808] relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 border-b border-border pb-8">
            <div>
              <p className="text-xs font-mono text-muted-foreground tracking-widest mb-2">
                CATALOG // 001
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-sans uppercase tracking-tight">
                VOL.01: THE ARCHIVE
              </h2>
              <p className="text-sm font-mono text-muted-foreground mt-2">
                The Support System. {products.length} items.
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono text-[#FF0000] animate-pulse">
                ▮ ACCESS RESTRICTED
              </div>
              <div className="text-xs font-mono text-muted-foreground mt-1">
                DROP: 02:00 AM PST NIGHTLY
              </div>
            </div>
          </div>

          {/* 2-col mobile / 3-col desktop grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Technical edge table */}
          <div className="mt-20 border border-border">
            <div className="border-b border-border px-4 py-3 text-xs font-mono text-muted-foreground tracking-widest">
              PRODUCT_PHILOSOPHY // THE CODE
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-mono">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="px-4 py-3 text-xs text-muted-foreground tracking-widest font-normal">THE CODE</th>
                    <th className="px-4 py-3 text-xs text-muted-foreground tracking-widest font-normal">THE REALITY</th>
                    <th className="px-4 py-3 text-xs text-muted-foreground tracking-widest font-normal">THE CHOP</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['STANCE', 'Back pain is the tax on a life lived at 100%.', 'Hidden Lumbar-Lock™ and Orthotic support.'],
                    ['CHASSIS', 'Cheap cotton doesn\'t survive the Austin sun.', '500GSM French Terry and 12oz Duck Canvas.'],
                    ['LOCKDOWN', 'Loose gear is a liability in the shop.', 'Industrial-grade zippers and brass hardware.'],
                    ['SCARCITY', 'If everyone has it, it\'s a uniform.', '[REDACTED] drops. 1 of 500. No pre-orders.'],
                  ].map(([code, reality, chop], i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-4 text-white font-bold">{code}</td>
                      <td className="px-4 py-4 text-muted-foreground">{reality}</td>
                      <td className="px-4 py-4 text-muted-foreground">
                        {code === 'SCARCITY' ? (
                          <>
                            <span className="bg-black text-black hover:text-white transition-colors cursor-pointer px-1">
                              [REDACTED]
                            </span>{' '}
                            drops. 1 of 500. No pre-orders.
                          </>
                        ) : chop}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── MANIFESTO PREVIEW ── */}
      <section className="border-b border-border bg-white text-black py-24 px-4 overflow-hidden relative">
        <div className="absolute top-6 right-6 text-xs font-mono text-black/30 font-bold select-none">
          PAGE // 01
        </div>
        <div className="max-w-3xl mx-auto relative z-10">
          <p className="text-xs font-mono tracking-[0.4em] text-black/50 mb-8">
            THE MANIFESTO // EXCERPT
          </p>
          <blockquote className="space-y-6 text-lg sm:text-xl font-bold font-sans leading-snug">
            <p className="border-l-4 border-black pl-6">
              STREETWEAR DIDN&apos;T AGE WITH US.
            </p>
            <p className="border-l-4 border-black pl-6 text-black/80">
              While the culture was busy chasing neon logos and teenage hype,
              we were in the shop, the studio, and the streets.
              Putting in the decades.
            </p>
            <p className="border-l-4 border-black pl-6">
              CHOPPED. WAS BORN IN AN AUSTIN ALLEYWAY AT 02:00 AM.
            </p>
            <p className="border-l-4 border-black pl-6 text-black/80">
              Built for the Unc who still wants to look dangerous but needs to feel human.
            </p>
          </blockquote>

          <div className="mt-12">
            <a
              href="/manifesto"
              className="inline-block border-2 border-black bg-transparent text-black text-xs font-mono tracking-widest py-3 px-6 hover:bg-black hover:text-white transition-colors duration-0"
            >
              READ FULL MANIFESTO →
            </a>
          </div>
        </div>
      </section>

      {/* ── ADVISORY BOARD ── */}
      <section className="border-b border-border py-20 bg-[#080808] px-4">
        <div className="max-w-7xl mx-auto">
          <div className="border-b border-border pb-8 mb-12">
            <p className="text-xs font-mono text-muted-foreground tracking-widest mb-2">
              COMMUNITY // 003
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-sans uppercase tracking-tight">
              RESPECT THE VETERANS.
            </h2>
            <p className="text-sm font-mono text-muted-foreground mt-3 max-w-xl">
              We don&apos;t have influencers. We have an Advisory Board.
              Mechanics, engineers, skaters, and creators who have spent 20+ years in the friction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { handle: 'THE_MECHANIC', role: 'Shop Owner / 28yrs', status: 'STILL UP' },
              { handle: 'THE_ENGINEER', role: 'Fabricator / 22yrs', status: 'STILL UP' },
              { handle: 'THE_SKATER', role: 'Veteran Rider / 30yrs', status: 'STILL UP' },
              { handle: '[REDACTED]', role: '[REDACTED]', status: 'CLASSIFIED' },
            ].map((member) => (
              <div
                key={member.handle}
                className="border border-border p-6 flex flex-col gap-4 bg-black hover:border-white transition-colors duration-0 group"
              >
                {/* Avatar placeholder */}
                <div className="w-12 h-12 border border-border bg-[#080808] group-hover:border-white transition-colors duration-0 flex items-center justify-center text-muted-foreground text-xs font-mono">
                  ◉
                </div>
                <div>
                  <p className="font-bold text-white font-mono text-sm">
                    {member.handle}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono mt-1">
                    {member.role}
                  </p>
                </div>
                <div className="mt-auto">
                  <span
                    className={`text-[10px] font-mono tracking-widest px-2 py-1 border ${
                      member.status === 'STILL UP'
                        ? 'border-green-500/50 text-green-500'
                        : 'border-[#FF0000]/50 text-[#FF0000]'
                    }`}
                  >
                    {member.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="/advisory-board"
              className="inline-block border border-border text-muted-foreground text-xs font-mono tracking-widest py-3 px-6 hover:border-white hover:text-white transition-colors duration-0"
            >
              VIEW FULL ADVISORY BOARD
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
