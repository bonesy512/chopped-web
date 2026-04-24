import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Drop Log — CHOPPED.',
  description: 'Historical log of CHOPPED. drops. Track the evolution of industrial-grade hardware.',
  openGraph: {
    title: 'THE CHOPPED. DROP LOG',
    description: 'Archive of previous and upcoming hardware deployments.',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CHOPPED. DROP LOG' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CHOPPED. DROP LOG',
    description: 'The deployment history for the friction.',
    images: ['/og-image.png'],
  },
};

export default function DropLogPage() {
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col">
      <Header />

      <main className="flex-1 pt-14">
        <div className="border-b border-border px-6 md:px-12 py-16 bg-black relative overflow-hidden">
          <p className="text-xs font-mono text-muted-foreground tracking-[0.4em] mb-4 relative z-10">
            ARCHIVE // DROP_LOG
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold text-white font-sans uppercase tracking-tighter leading-none relative z-10">
            DROP <br /> <span className="text-[#FF0000]">LOG.</span>
          </h1>
        </div>

        <div className="bg-white text-black px-6 md:px-16 py-20 selection:bg-black selection:text-white min-h-[50vh]">
          <div className="max-w-3xl mx-auto space-y-12">
            
            <div className="border-l-2 border-black pl-6 space-y-8">
              
              <article className="space-y-2">
                <div className="flex items-center gap-4">
                  <span className="bg-black text-white px-2 py-1 text-xs font-mono font-bold tracking-widest">UPCOMING</span>
                  <span className="font-mono text-sm text-black/50">JUNE 1, 2026 // 02:00 AM</span>
                </div>
                <h2 className="text-2xl font-bold font-sans uppercase pt-2">THE NOCTURNAL STANDARD DROP</h2>
                <p className="font-mono text-sm leading-relaxed text-black/70">
                  The inaugural collection. Heavyweight French Terry base. Orthopedic support hardware. 
                  Built for the Unc. Acquire, deploy, clock out.
                </p>
              </article>

              <article className="space-y-2 opacity-50">
                <div className="flex items-center gap-4">
                  <span className="border border-black px-2 py-1 text-xs font-mono font-bold tracking-widest text-black">CLASSIFIED</span>
                  <span className="font-mono text-sm text-black/50">PRE-ALPHA // 2025</span>
                </div>
                <h2 className="text-2xl font-bold font-sans uppercase pt-2">PROTOTYPE PHASE</h2>
                <p className="font-mono text-sm leading-relaxed text-black/70">
                  Initial hardware testing. Closed circuit distribution only. Data expunged.
                </p>
              </article>

            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
