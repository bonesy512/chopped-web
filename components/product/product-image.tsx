'use client';

import Image from 'next/image';
import { useState } from 'react';
import { type Product } from '@/lib/products';
import { useProductOptions } from './product-options';

const VIEW_LABELS = ['FRONT', 'BACK', 'DETAIL'];

// PDP gallery: swaps mockups with the selected colorway (via ProductOptions
// context) and offers FRONT / BACK / DETAIL views when the colorway has them.
export function ProductImage({ product }: { product: Product }) {
  const options = useProductOptions();
  const color = options?.color ?? product.colors?.[0] ?? null;
  const [view, setView] = useState(0);

  // New colorway → snap back to the front view (render-time reset pattern,
  // per react.dev "You Might Not Need an Effect").
  const [prevColor, setPrevColor] = useState(color);
  if (prevColor !== color) {
    setPrevColor(color);
    setView(0);
  }

  const images =
    (color && product.colorImages?.[color]) ||
    (product.image ? [product.image] : []);
  const src = images[Math.min(view, images.length - 1)];

  if (!src) {
    return (
      <div className="relative z-0 text-center select-none">
        <span className="text-[180px] leading-none text-white/5 font-bold font-sans block">
          ◈
        </span>
        <span className="text-xs font-mono text-muted-foreground/40 tracking-wider">
          {product.sku}
        </span>
      </div>
    );
  }

  return (
    <>
      <Image
        key={src}
        src={src}
        alt={`${product.name}${color ? ` — ${color}` : ''} — ${VIEW_LABELS[view] ?? 'VIEW'}`}
        fill
        className="object-cover opacity-90 z-0"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />

      {/* View switcher — only when multiple mockups exist */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-4 z-20 flex gap-0 border border-border bg-black/80 backdrop-blur-sm">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setView(i)}
              className={`text-[10px] font-mono tracking-widest px-3 py-2 border-r border-border last:border-r-0 transition-colors duration-0 ${
                view === i
                  ? 'bg-white text-black'
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              {VIEW_LABELS[i] ?? `VIEW_${i + 1}`}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
