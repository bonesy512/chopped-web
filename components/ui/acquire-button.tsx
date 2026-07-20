'use client';

import { useState } from 'react';
import { type Product } from '@/lib/products';
import { useCart } from '@/components/cart/CartContext';

export function AcquireButton({ product }: { product: Product }) {
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : null
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );

  const { addItem, setIsOpen } = useCart();

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setError('SELECT_SIZE_TO_PROCEED.');
      return;
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      setError('SELECT_COLOR_TO_PROCEED.');
      return;
    }

    setError(null);
    addItem({
      product,
      size: selectedSize || 'One Size',
      color: selectedColor || undefined,
      quantity: 1,
    });
    
    // Auto-open cart drawer
    setIsOpen(true);
  };

  if (product.status === 'REDACTED') {
    return (
      <div className="w-full flex flex-col gap-4">
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-xs font-mono text-muted-foreground tracking-widest border-b border-[#FF0000]/30 pb-2">
              SELECT_SIZE
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  disabled
                  className="font-mono text-xs border border-[#FF0000]/30 bg-black text-[#FF0000]/50 py-2 px-4 cursor-not-allowed"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="w-full">
          <button
            disabled
            className="w-full border border-[#FF0000] bg-black text-[#FF0000] font-mono text-sm tracking-widest py-4 px-6 cursor-not-allowed opacity-70"
          >
            [REDACTED] — SYSTEM OFFLINE
          </button>
          <p className="text-xs text-muted-foreground mt-2 font-mono">
            SYSTEM UNLOCKS: 02:00 AM
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {product.colors && product.colors.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-xs font-mono text-muted-foreground tracking-widest border-b border-border pb-2">
            SELECT_COLOR
          </p>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => {
                  setSelectedColor(color);
                  setError(null);
                }}
                className={`font-mono text-xs border py-3 px-5 transition-colors uppercase min-w-[5rem] h-[2.75rem] flex items-center justify-center ${
                  selectedColor === color
                    ? 'border-white bg-white text-black font-bold'
                    : 'border-border bg-black text-muted-foreground hover:border-white hover:text-white'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.sizes && product.sizes.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-xs font-mono text-muted-foreground tracking-widest border-b border-border pb-2">
            SELECT_SIZE
          </p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => {
                  setSelectedSize(size);
                  setError(null);
                }}
                className={`font-mono text-xs border py-3 px-5 transition-colors uppercase min-w-[3rem] h-[2.75rem] flex items-center justify-center ${
                  selectedSize === size
                    ? 'border-white bg-white text-black font-bold'
                    : 'border-border bg-black text-muted-foreground hover:border-white hover:text-white'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="w-full">
        <button
          onClick={handleAddToCart}
          className="w-full border border-white bg-black text-white font-mono text-sm tracking-widest py-4 px-6 hover:bg-white hover:text-black transition-none cursor-pointer"
        >
          ADD TO CART
        </button>
        {error && (
          <p className="text-xs text-[#FF0000] mt-2 font-mono">{error}</p>
        )}
      </div>
    </div>
  );
}
