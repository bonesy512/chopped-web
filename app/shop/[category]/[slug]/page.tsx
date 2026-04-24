// Add next/image to imports
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AcquireButton } from '@/components/ui/acquire-button';
import { ProductCard } from '@/components/ui/product-card';
import { products, getProductBySlug } from '@/lib/products';
import { ProductSchema, BreadcrumbSchema } from '@/components/seo/schema';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://choppedunc.store';

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateStaticParams() {
  return products.map((p) => ({
    category: p.categorySlug,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, category } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Not Found — CHOPPED.' };
  const canonical = `${BASE_URL}/shop/${category}/${slug}`;
  return {
    title: `${product.name} — CHOPPED.`,
    description: product.description,
    alternates: { canonical },
    openGraph: {
      title: `${product.name} — CHOPPED.`,
      description: product.description,
      url: canonical,
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: product.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} — CHOPPED.`,
      description: product.shortDesc,
      images: ['/og-image.png'],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col">
      <ProductSchema
        name={product.name}
        description={product.description}
        sku={product.sku}
        price={product.price}
        slug={product.slug}
        categorySlug={product.categorySlug}
        status={product.status}
      />
      <BreadcrumbSchema
        items={[
          { name: 'CHOPPED.', url: BASE_URL },
          { name: 'Museum', url: `${BASE_URL}/shop/all` },
          { name: product.category, url: `${BASE_URL}/shop/all` },
          { name: product.name, url: `${BASE_URL}/shop/${product.categorySlug}/${product.slug}` },
        ]}
      />
      <Header />

      <main className="flex-1 pt-14">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          {/* Breadcrumb */}
          <div className="text-xs font-mono text-muted-foreground mb-8 flex gap-2 items-center">
            <a href="/shop/all" className="hover:text-white transition-colors">MUSEUM</a>
            <span>/</span>
            <span className="uppercase">{product.category}</span>
            <span>/</span>
            <span className="text-white uppercase truncate">{product.name}</span>
          </div>

          {/* Main product layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border">
            {/* Image pane */}
            <div className="aspect-square bg-[#080808] border-b md:border-b-0 md:border-r border-border flex items-center justify-center relative overflow-hidden">
              {/* Noise overlay */}
              <div
                className="absolute inset-0 opacity-10 z-10 pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
              />

              {product.status === 'REDACTED' && (
                <div className="absolute top-4 left-4 bg-black text-[#FF0000] text-xs font-mono px-3 py-1 border border-[#FF0000] tracking-widest z-20">
                  [REDACTED]
                </div>
              )}

              {/* Product Image */}
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover opacity-90 z-0"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                /* Visual glyph fallback */
                <div className="relative z-0 text-center select-none">
                  <span className="text-[180px] leading-none text-white/5 font-bold font-sans block">
                    ◈
                  </span>
                  <span className="text-xs font-mono text-muted-foreground/40 tracking-wider">
                    {product.sku}
                  </span>
                </div>
              )}

              {/* HUD corner */}
              <div className="absolute bottom-4 right-4 text-[10px] font-mono text-muted-foreground/40">
                RENDER_NODE_01 / {product.sku}
              </div>
            </div>

            {/* Info pane */}
            <div className="p-8 md:p-12 flex flex-col gap-8 bg-black">
              {/* SKU & category */}
              <div className="flex justify-between items-start border-b border-border pb-6">
                <div>
                  <p className="text-xs font-mono text-muted-foreground tracking-widest">{product.sku}</p>
                  <p className="text-xs font-mono text-muted-foreground">{product.category}</p>
                </div>
                {product.status === 'REDACTED' && (
                  <span className="text-[10px] font-mono text-[#FF0000] border border-[#FF0000] px-2 py-1 animate-pulse">
                    ▮ ACCESS LOCKED
                  </span>
                )}
              </div>

              {/* Name & price */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white font-sans uppercase tracking-tight leading-tight">
                  {product.name}
                </h1>
                <p className="text-2xl font-mono font-bold mt-3">
                  {product.status === 'REDACTED' ? (
                    <span className="text-[#FF0000]">[REDACTED]</span>
                  ) : (
                    <span className="text-white">${product.price.toFixed(2)}</span>
                  )}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm font-mono text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              <div>
                <p className="text-xs font-mono text-muted-foreground tracking-widest mb-3 border-b border-border pb-2">
                  HARDWARE_SPECS
                </p>
                <ul className="space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm font-mono text-white">
                      <span className="text-muted-foreground mt-0.5">▸</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical specs table */}
              <div className="border border-border">
                <div className="border-b border-border px-3 py-2 text-[10px] font-mono text-muted-foreground tracking-widest">
                  TECH_MANIFEST
                </div>
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex border-b border-border/50 last:border-0">
                    <span className="text-xs font-mono text-muted-foreground px-3 py-2 border-r border-border/50 w-28 shrink-0">
                      {spec.label}
                    </span>
                    <span className="text-xs font-mono text-white px-3 py-2">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-auto">
                <AcquireButton product={product} />
              </div>
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div className="mt-20">
              <div className="border-b border-border pb-6 mb-8">
                <p className="text-xs font-mono text-muted-foreground tracking-widest">
                  RELATED // {product.category.toUpperCase()}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
