import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TransmitForm } from '@/components/ui/transmit-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transmit — CHOPPED.',
  description: 'Industrial inquiries. Direct channel only.',
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
          <p className="text-sm font-mono text-muted-foreground mt-4 max-w-md">
            Industrial inquiries only. Press, wholesale, and advisory board applications accepted.
            We respond at [REDACTED].
          </p>
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
