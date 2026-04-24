import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure Gear — CHOPPED.',
  description: 'System Offline. Returns at 02:00 AM PST.',
};

export default function SecureGearPage() {
  // In production: check server-side if current time is within the 02:00 AM PST window
  // For now, render the locked state — the nocturnal lockout
  const isSystemOnline = false;

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

            {/* Access code input */}
            <div className="border border-border flex mb-4">
              <input
                type="text"
                placeholder="> ENTER ACCESS CODE"
                className="flex-1 bg-transparent text-white text-xs font-mono px-4 py-3 placeholder:text-muted-foreground focus:outline-none"
              />
              <button className="border-l border-border bg-black text-muted-foreground text-xs font-mono px-4 hover:bg-white hover:text-black transition-colors duration-0">
              DEPLOY ACCESS
              </button>
            </div>

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
