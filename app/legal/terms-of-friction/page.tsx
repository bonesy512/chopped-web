import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Friction — CHOPPED.',
  description: 'Legal terms and conditions for CHOPPED. By accessing this system, you acknowledge and accept all friction.',
  openGraph: {
    title: 'TERMS OF FRICTION — CHOPPED.',
    description: 'We build armor, not fashion. The nocturnal standard applies.',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CHOPPED. TERMS' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TERMS OF FRICTION — CHOPPED.',
    description: 'We build armor, not fashion.',
    images: ['/og-image.png'],
  },
};

export default function TermsOfFrictionPage() {
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col">
      <Header />

      <main className="flex-1 pt-14">
        <div className="border-b border-border px-6 md:px-12 py-16 bg-black relative overflow-hidden">
          <p className="text-xs font-mono text-muted-foreground tracking-[0.4em] mb-4 relative z-10">
            LEGAL // TERMS_OF_FRICTION
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold text-white font-sans uppercase tracking-tighter leading-none relative z-10">
            TERMS OF <br /> <span className="text-[#FF0000]">FRICTION.</span>
          </h1>
        </div>

        <div className="bg-white text-black px-6 md:px-16 py-20 selection:bg-black selection:text-white min-h-[50vh]">
          <div className="max-w-3xl mx-auto space-y-12">
            <article className="space-y-4">
              <h2 className="text-xl font-bold font-sans uppercase">01 // Acceptance of Friction</h2>
              <p className="font-mono text-sm leading-relaxed text-black/70">
                By accessing this system and acquiring CHOPPED. hardware, you acknowledge and accept all friction. 
                Our products are designed for the nocturnal standard. The street never left us, but the terms apply.
              </p>
            </article>

            <article className="space-y-4">
              <h2 className="text-xl font-bold font-sans uppercase">02 // Liability</h2>
              <p className="font-mono text-sm leading-relaxed text-black/70">
                CHOPPED. is not responsible for what you do while wearing our gear at 02:00 AM. 
                We build armor, not fashion.
              </p>
            </article>
            
            <article className="space-y-4">
              <h2 className="text-xl font-bold font-sans uppercase">03 // Intellectual Property</h2>
              <p className="font-mono text-sm leading-relaxed text-black/70">
                The CHOPPED. brand, identity, and designs are proprietary. Do not copy. Do not replicate. 
                Respect the history.
              </p>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
