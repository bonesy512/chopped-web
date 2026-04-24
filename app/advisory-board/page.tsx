import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Advisory Board — CHOPPED.',
  description: 'The Unc Advisory Board. Veterans. Operators. Night-shift legends.',
};

const BOARD_MEMBERS = [
  {
    handle: 'THE_MECHANIC',
    role: 'Auto Fabricator',
    tenure: '28 years in friction',
    bio: 'Runs a full custom shop off Lamar. Built the first CHOPPED. chassis prototype from scratch.',
    status: 'STILL UP',
  },
  {
    handle: 'THE_ENGINEER',
    role: 'Structural Fabricator',
    tenure: '22 years in friction',
    bio: 'Aerospace background. Designed the internal lumbar support architecture for VOL.01.',
    status: 'STILL UP',
  },
  {
    handle: 'THE_SKATER',
    role: 'Veteran Rider / Shop Owner',
    tenure: '30 years in friction',
    bio: 'Still lands kickflips at 48. Tests the orthotic integration on concrete every morning.',
    status: 'STILL UP',
  },
  {
    handle: 'THE_PRODUCER',
    role: 'Studio Head / Operator',
    tenure: '25 years in friction',
    bio: 'Built three studios and two brands before 45. Wears the vest to every session.',
    status: 'STILL UP',
  },
  {
    handle: '[REDACTED]',
    role: '[REDACTED]',
    tenure: '[REDACTED] years',
    bio: 'Access restricted. Clearance level: [REDACTED].',
    status: 'CLASSIFIED',
  },
  {
    handle: '[REDACTED]',
    role: '[REDACTED]',
    tenure: '[REDACTED] years',
    bio: 'Access restricted. Identity withheld by protocol.',
    status: 'CLASSIFIED',
  },
];

export default function AdvisoryBoardPage() {
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col">
      <Header />

      <main className="flex-1 pt-14">
        {/* Header */}
        <div className="border-b border-border px-6 md:px-12 py-16 bg-black">
          <p className="text-xs font-mono text-muted-foreground tracking-[0.4em] mb-3">
            ADVISORY_BOARD // NODE_003
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold text-white font-sans uppercase tracking-tight">
            RESPECT THE<br />VETERANS.
          </h1>
          <p className="text-sm font-mono text-muted-foreground mt-6 max-w-xl leading-relaxed">
            We don&apos;t have influencers. We have an Advisory Board.
            Mechanics, engineers, skaters, and creators who have spent 20+ years in the friction.
            They don&apos;t model our clothes; they test the chassis.
          </p>
        </div>

        {/* Board grid */}
        <div className="px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-border">
            {BOARD_MEMBERS.map((member, i) => (
              <div
                key={i}
                className={`p-8 border-border flex flex-col gap-6 hover:bg-white/5 transition-colors group
                  ${i % 3 !== 2 ? 'border-r' : ''}
                  ${i < BOARD_MEMBERS.length - 3 ? 'border-b' : ''}
                  ${member.status === 'CLASSIFIED' ? 'opacity-60' : ''}
                `}
              >
                {/* Avatar */}
                <div className="w-14 h-14 border border-border bg-black flex items-center justify-center text-muted-foreground font-mono text-lg group-hover:border-white transition-colors">
                  {member.status === 'CLASSIFIED' ? '?' : '◉'}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-bold text-white font-mono text-base">
                    {member.handle}
                  </h3>
                  <p className="text-xs font-mono text-muted-foreground mt-1">{member.role}</p>
                  <p className="text-[10px] font-mono text-muted-foreground/50 mt-0.5">{member.tenure}</p>
                  <p className="text-sm font-mono text-muted-foreground mt-4 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Status badge */}
                <div>
                  <span
                    className={`text-[10px] font-mono tracking-widest px-2 py-1 border ${
                      member.status === 'STILL UP'
                        ? 'border-green-500/50 text-green-500'
                        : 'border-[#FF0000]/50 text-[#FF0000]'
                    }`}
                  >
                    {member.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <div className="border-t border-border bg-black px-6 md:px-12 py-16 text-center">
          <p className="text-xs font-mono text-muted-foreground tracking-widest mb-4">
            JOIN_ADVISORY_BOARD // PROTOCOL_ACTIVE
          </p>
          <h2 className="text-3xl font-bold text-white font-sans uppercase mb-6">
            STILL UP?
          </h2>
          <p className="text-sm font-mono text-muted-foreground max-w-md mx-auto mb-8">
            20+ years in the friction. A trade, a craft, or a grind that never stopped.
            Apply for access.
          </p>
          <a
            href="/transmit"
            className="inline-block border border-white bg-black text-white text-xs font-mono tracking-widest py-4 px-10 hover:bg-white hover:text-black transition-colors duration-0"
          >
            TRANSMIT APPLICATION
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
