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

  const handleAcquire = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id }),
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
    );
  }

  return (
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
  );
}
