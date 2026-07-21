import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TransmitForm } from '@/components/ui/transmit-form';
import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://choppedunc.store';

export const metadata: Metadata = {
  title: 'Transmit — CHOPPED.',
  description: 'Industrial inquiries. Direct channel only.',
  alternates: { canonical: `${BASE_URL}/transmit` },
  openGraph: {
    title: 'Transmit — CHOPPED.',
    description: 'Industrial inquiries. Direct channel only.',
    url: `${BASE_URL}/transmit`,
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CHOPPED. Transmit' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transmit — CHOPPED.',
    description: 'Industrial inquiries. Direct channel only.',
    images: ['/og-image.png'],
  },
};

export default function TransmitPage() {
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col">
      <Header />

      <main className="flex-1 pt-14">
        {/* Header */}
        <div className="border-b border-border px-6 md:px-12 py-16 bg-black">
          <p className="text-xs font-mono text-muted-foreground tracking-[0.4em] mb-3">
            COMMS // DIRECT_CHANNEL
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold text-white font-sans uppercase tracking-tight">
            TRANSMIT.
          </h1>
          <p className="text-sm font-mono text-muted-foreground mt-4 max-w-lg leading-relaxed">
            Direct customer support, press inquiries, wholesale protocols, and Advisory Board applications.
            Our team operates out of Austin, TX and reviews all transmissions within a strict 24-hour window.
          </p>
          <div className="flex flex-wrap gap-6 mt-6 text-xs font-mono text-muted-foreground/80 border-t border-border/50 pt-4">
            <div>HQ: <span className="text-white font-bold">Austin, TX</span></div>
            <div>SLA: <span className="text-white font-bold">&lt; 24 HR RESPONSE</span></div>
            <div>ENCRYPTION: <span className="text-white font-bold">256-BIT SSL</span></div>
          </div>
        </div>


        {/* Form — client component */}
        <div className="px-6 md:px-12 py-16 max-w-2xl">
          <TransmitForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
