import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manifesto — CHOPPED.',
  description: 'Function for the Friction. The philosophical core of CHOPPED. Industrial Wear.',
};

export default function ManifestoPage() {
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col">
      <Header />

      <main className="flex-1 pt-14">
        {/* Hero bar */}
        <div className="border-b border-border px-6 md:px-12 py-16 bg-black relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          <p className="text-xs font-mono text-muted-foreground tracking-[0.4em] mb-4 relative z-10">
            CLASSIFIED // THE_CHOPPED_MANIFESTO
          </p>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-white font-sans uppercase tracking-tighter leading-none relative z-10">
            FUNCTION<br />FOR THE<br />
            <span className="text-[#FF0000]">FRICTION.</span>
          </h1>
        </div>

        {/* Manifesto body — white section */}
        <div className="bg-white text-black px-6 md:px-16 py-20 selection:bg-black selection:text-white">
          <div className="max-w-3xl mx-auto space-y-20">

            <article className="space-y-6">
              <h2 className="text-xs font-mono tracking-[0.4em] text-black/40 border-b border-black/20 pb-3">
                01 // THE FRICTION
              </h2>
              <p className="text-2xl sm:text-3xl font-bold font-sans leading-tight">
                Life is a series of frictions.
              </p>
              <p className="text-base font-mono leading-relaxed text-black/70">
                We don&apos;t avoid the friction; we function for it. The street never left us.
                Our backs just started keeping score.
              </p>
            </article>

            <article className="space-y-6 border-l-4 border-black pl-8">
              <h2 className="text-xs font-mono tracking-[0.4em] text-black/40 border-b border-black/20 pb-3">
                02 // THE UNC. IDENTITY
              </h2>
              <p className="text-2xl sm:text-3xl font-bold font-sans leading-tight">
                The Unc is the midnight-shift legend.
              </p>
              <p className="text-base font-mono leading-relaxed text-black/70">
                He is the studio head and shop owner. He earned the Black Air Force energy.
                Respect his history. Reinforce his stance.
              </p>
            </article>

            <article className="space-y-6">
              <h2 className="text-xs font-mono tracking-[0.4em] text-black/40 border-b border-black/20 pb-3">
                03 // THE HARDWARE
              </h2>
              <p className="text-2xl sm:text-3xl font-bold font-sans leading-tight">
                We build armor, not fashion.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                {[
                  { stat: '500GSM', label: 'FRENCH TERRY BASE' },
                  { stat: 'ORTH3', label: 'AGGR SUPPORT SYSTEM' },
                  { stat: '15mm', label: 'VIRGIL-GRADE HARDWARE' },
                ].map((item) => (
                  <div key={item.stat} className="border border-black/20 p-4">
                    <p className="text-3xl font-bold font-mono">{item.stat}</p>
                    <p className="text-xs font-mono text-black/50 mt-1 tracking-widest">{item.label}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="space-y-6 border-l-4 border-black pl-8">
              <h2 className="text-xs font-mono tracking-[0.4em] text-black/40 border-b border-black/20 pb-3">
                04 // THE NOCTURNAL STANDARD
              </h2>
              <p className="text-2xl sm:text-3xl font-bold font-sans leading-tight">
                We don&apos;t move during business hours.
              </p>
              <p className="text-base font-mono leading-relaxed text-black/70">
                The world sleeps; the veterans work. 02:00 AM is the clock-in.
                Acquire. Deploy. Clock out.
              </p>
              <p className="text-4xl font-bold font-sans tracking-tighter mt-8">
                BECOME INVISIBLE.
              </p>
            </article>

            {/* The Gap in the Concrete — from BRANDBIBLE */}
            <article className="space-y-6 bg-black text-white p-8">
              <h2 className="text-xs font-mono tracking-[0.4em] text-white/40 border-b border-white/20 pb-3">
                05 // THE GAP IN THE CONCRETE
              </h2>
              <p className="text-xl sm:text-2xl font-bold font-sans leading-tight">
                Streetwear didn&apos;t age with us.
              </p>
              <p className="text-sm font-mono leading-relaxed text-white/70">
                While the culture was busy chasing neon logos and teenage hype, we were in the shop,
                the studio, and the streets, putting in the decades. We earned the &ldquo;Black Air Force&rdquo;
                energy, but our backs started feeling the friction.
              </p>
              <p className="text-sm font-mono leading-relaxed text-white/70">
                <strong className="text-white">CHOPPED.</strong> was born in an Austin alleyway at 02:00 AM.
                Built for the Unc who still wants to look dangerous but needs to feel human.
              </p>
            </article>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
