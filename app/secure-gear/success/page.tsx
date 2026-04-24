import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Secured — CHOPPED.',
  description: 'Gear secured. Deploy when ready.',
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col">
      <Header />

      <main className="flex-1 pt-14 flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center border border-border p-12 bg-black">
          <span className="text-green-500 text-xs font-mono tracking-[0.4em] border border-green-500/50 px-3 py-1 inline-block">
            ▮ ORDER SECURED
          </span>

          <h1 className="text-4xl font-bold text-white font-sans uppercase tracking-tight mt-8 mb-4">
            GEAR ACQUIRED.
          </h1>

          <p className="text-sm font-mono text-muted-foreground leading-relaxed mb-8">
            Hardware is in the system.
            <br />
            Deployment commences within{' '}
            <span className="bg-black text-black hover:text-white transition-colors cursor-pointer px-1">
              [REDACTED]
            </span>
            {' '}hours. Confirmation transmitted to your channel.
          </p>

          <div className="border border-border/50 p-4 text-left mb-8">
            <p className="text-xs font-mono text-muted-foreground tracking-widest">ORDER_STATUS</p>
            <p className="text-sm font-mono text-white mt-1">SECURED // DEPLOYMENT INITIATED</p>
            <p className="text-xs font-mono text-muted-foreground mt-1">SYS_STATUS: ACTIVE</p>
          </div>

          <a
            href="/shop/all"
            className="inline-block border border-white bg-black text-white text-xs font-mono tracking-widest py-3 px-8 hover:bg-white hover:text-black transition-colors duration-0"
          >
            SCAN MORE HARDWARE
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
