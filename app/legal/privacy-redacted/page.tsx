import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy [REDACTED] — CHOPPED.',
  description: 'Your transmission data is strictly confidential. Information sharing is disabled by default. Become invisible.',
  openGraph: {
    title: 'PRIVACY [REDACTED] — CHOPPED.',
    description: 'We respect your right to operate in the shadows. Transactions are encrypted.',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CHOPPED. PRIVACY' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PRIVACY [REDACTED] — CHOPPED.',
    description: 'Information sharing is disabled by default.',
    images: ['/og-image.png'],
  },
};

export default function PrivacyRedactedPage() {
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col">
      <Header />

      <main className="flex-1 pt-14">
        <div className="border-b border-border px-6 md:px-12 py-16 bg-black relative overflow-hidden">
          <p className="text-xs font-mono text-muted-foreground tracking-[0.4em] mb-4 relative z-10">
            LEGAL // PRIVACY
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold text-white font-sans uppercase tracking-tighter leading-none relative z-10">
            PRIVACY <br /> <span className="text-[#FF0000]">[REDACTED].</span>
          </h1>
        </div>

        <div className="bg-white text-black px-6 md:px-16 py-20 selection:bg-black selection:text-white min-h-[50vh]">
          <div className="max-w-3xl mx-auto space-y-12">
            <article className="space-y-4">
              <h2 className="text-xl font-bold font-sans uppercase">01 // Data Collection</h2>
              <p className="font-mono text-sm leading-relaxed text-black/70">
                We collect what we need to process your drop. Nothing more. We operate in the shadows,
                and respect your right to do the same. Become invisible.
              </p>
            </article>

            <article className="space-y-4">
              <h2 className="text-xl font-bold font-sans uppercase">02 // The [REDACTED] Policy</h2>
              <p className="font-mono text-sm leading-relaxed text-black/70">
                Your transmission data is strictly confidential. Information sharing is disabled by default.
                Transactions are encrypted. Addresses are cleared from memory when the mission is accomplished.
              </p>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
