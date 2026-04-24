import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Node Not Found — CHOPPED.',
  description: 'Signal lost. System cannot locate this node.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col">
      <Header />

      <main className="flex-1 pt-14 flex items-center justify-center px-4">
        <div className="max-w-lg w-full border border-border p-12 bg-black relative overflow-hidden">
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
            {/* HUD label */}
            <span className="text-[#FF0000] text-xs font-mono tracking-[0.4em] border border-[#FF0000] px-3 py-1 inline-block">
              ▮ NODE_NOT_FOUND
            </span>

            {/* 404 glyph */}
            <div className="mt-8 mb-2 select-none">
              <span className="text-[120px] font-bold text-white/5 leading-none font-sans block">
                404
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl font-bold text-white font-sans uppercase tracking-tight leading-tight mb-4">
              SIGNAL LOST.
            </h1>

            {/* Body */}
            <p className="text-sm font-mono text-muted-foreground leading-relaxed mb-2">
              System cannot locate this node.
            </p>
            <p className="text-sm font-mono text-muted-foreground leading-relaxed mb-10">
              It never existed. Or it's been{' '}
              <span className="bg-black text-black hover:text-white transition-colors cursor-pointer px-1">
                [REDACTED]
              </span>
              .
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-0 border border-border">
              <a
                href="/"
                className="flex-1 text-center border-b sm:border-b-0 sm:border-r border-border py-3 px-4 text-xs font-mono text-muted-foreground hover:text-white hover:bg-white/5 tracking-widest transition-colors"
              >
                ← RETURN TO BASE
              </a>
              <a
                href="/shop/all"
                className="flex-1 text-center py-3 px-4 text-xs font-mono text-white bg-black hover:bg-white hover:text-black tracking-widest transition-colors duration-0"
              >
                SCAN THE MUSEUM →
              </a>
            </div>

            {/* HUD footer */}
            <p className="text-[10px] font-mono text-muted-foreground/40 mt-8">
              ERROR_CODE: 404 // NODE_OFFLINE // SYS_STATUS: DEGRADED
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
