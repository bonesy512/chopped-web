import Link from 'next/link';
import Image from 'next/image';
import { type Product } from '@/lib/products';

const CATEGORY_GLYPHS: Record<string, string> = {
  footwear: '◈',
  outerwear: '◉',
  essentials: '◎',
};

export function ProductCard({ product }: { product: Product }) {
  const glyph = CATEGORY_GLYPHS[product.categorySlug] ?? '◌';

  return (
    <Link
      href={`/shop/${product.categorySlug}/${product.slug}`}
      className="group border border-border flex flex-col bg-black hover:border-white transition-colors duration-0 relative overflow-hidden"
    >
      {/* Product image area — terminal placeholder with identity glyph or actual image */}
      <div className="aspect-[4/5] bg-[#080808] flex flex-col items-center justify-center border-b border-border relative overflow-hidden select-none">
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-10 z-10 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Product Image */}
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300 z-0"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        ) : (
          /* Product visual glyph fallback */
          <span className="text-8xl text-white/10 group-hover:text-white/20 transition-opacity font-sans font-bold z-0">
            {glyph}
          </span>
        )}

        {/* SKU watermark */}
        <span className="absolute bottom-3 left-3 text-xs font-mono text-muted-foreground/50 tracking-wider">
          {product.sku}
        </span>

        {/* Hover glitch effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 bg-white transition-opacity pointer-events-none" />
      </div>

      {/* Product info bar */}
      <div className="p-4 bg-black group-hover:bg-white transition-colors duration-0 flex justify-between items-start gap-2">
        <div className="min-w-0">
          <h3 className="font-bold text-white group-hover:text-black font-sans text-sm uppercase tracking-tight truncate">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground group-hover:text-black/60 mt-0.5 font-mono uppercase">
            {product.category}
          </p>
        </div>
        <div className="shrink-0 text-right">
          {product.status === 'REDACTED' ? (
            <span className="text-[#FF0000] group-hover:text-black font-mono text-sm font-bold">
              [REDACTED]
            </span>
          ) : (
            <span className="text-white group-hover:text-black font-mono text-sm font-bold">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
