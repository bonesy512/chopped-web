'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { type Product } from '@/lib/products';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export function AcquireButton({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : null
  );

  const handleAcquire = async () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setError('SELECT_SIZE_TO_PROCEED.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, size: selectedSize }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        setError('SYSTEM_FRICTION_DETECTED. RE-TRANSMIT.');
        return;
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch {
      setError('SYSTEM_FRICTION_DETECTED. RE-TRANSMIT.');
    } finally {
      setLoading(false);
    }
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
            SYSTEM UNLOCKS: 02:00 AM PST
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
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
          onClick={handleAcquire}
          disabled={loading}
          className="w-full border border-white bg-black text-white font-mono text-sm tracking-widest py-4 px-6 hover:bg-white hover:text-black transition-none cursor-pointer disabled:opacity-50"
        >
          {loading ? 'ACQUIRING...' : 'ACQUIRE'}
        </button>
        {error && (
          <p className="text-xs text-[#FF0000] mt-2 font-mono">{error}</p>
        )}
      </div>
    </div>
  );
}
