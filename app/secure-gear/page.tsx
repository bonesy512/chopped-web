'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { products } from '@/lib/products';
import { AcquireButton } from '@/components/ui/acquire-button';

import { VALID_ACCESS_CODES } from '@/lib/access-codes';

export default function SecureGearPage() {
  const [accessCode, setAccessCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAccess = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate a brief system check for aesthetic effect
    setTimeout(() => {
      const sanitizedCode = accessCode.trim().toUpperCase();
      if (VALID_ACCESS_CODES.includes(sanitizedCode)) {
        setIsUnlocked(true);
        setError(null);
      } else {
        setError('INVALID_PROTOCOL_CODE. ACCESS_DENIED.');
      }
      setLoading(false);
    }, 800);
  };

  if (isUnlocked) {
    return (
      <div className="min-h-screen bg-[#080808] flex flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-20 px-4 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 border-l-2 border-[#FF0000] pl-6">
              <span className="text-[#FF0000] text-xs font-mono tracking-[0.4em] uppercase">
                ▮ SYSTEM_UNLOCKED // VOL 01 PROTOCOL ACTIVE
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white font-sans uppercase tracking-tighter mt-4">
                SECURE<br />GEAR.
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {products.map((product) => (
                <div key={product.id} className="border border-border bg-black p-8 group">
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

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col">
      <Header />

      <main className="flex-1 pt-14 flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center border border-border p-12 bg-black relative overflow-hidden">
          {/* Grid bg */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative z-10">
            <span className="text-[#FF0000] text-xs font-mono tracking-[0.4em] border border-[#FF0000] px-3 py-1 animate-pulse inline-block">
              ▮ SYSTEM OFFLINE
            </span>

            <h1 className="text-4xl sm:text-5xl font-bold text-white font-sans uppercase tracking-tight mt-8 mb-4">
              NOCTURNAL<br />LOCKOUT.
            </h1>

            <p className="text-sm font-mono text-muted-foreground leading-relaxed mb-8">
              The checkout system activates at 02:00 AM PST.
              <br />
              Gear is released. First come. No holds. No pre-orders.
            </p>

            <form onSubmit={handleAccess} className="relative">
              <div className="border border-border flex mb-4">
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => {
                    setAccessCode(e.target.value);
                    setError(null);
                  }}
                  placeholder="> ENTER ACCESS CODE"
                  className="flex-1 bg-transparent text-white text-xs font-mono px-4 py-3 placeholder:text-muted-foreground focus:outline-none uppercase"
                />
                <button 
                  type="submit"
                  disabled={loading || !accessCode}
                  className="border-l border-border bg-black text-white text-xs font-mono px-4 hover:bg-white hover:text-black transition-colors duration-0 disabled:opacity-50"
                >
                  {loading ? 'CHECKING...' : 'DEPLOY ACCESS'}
                </button>
              </div>
              
              {error && (
                <p className="text-[10px] font-mono text-[#FF0000] mb-4 text-left animate-shake">
                  {error}
                </p>
              )}
            </form>

            <p className="text-[10px] font-mono text-muted-foreground">
              ACCESS CODES TRANSMITTED VIA THE 02:00 AM ADVISORY BOARD CHANNEL.
            </p>

            <div className="mt-12 pt-8 border-t border-border">
              <a
                href="/shop/all"
                className="text-xs font-mono text-muted-foreground hover:text-white tracking-widest transition-colors"
              >
                ← SCAN THE MUSEUM
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
