import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Advisory Board — CHOPPED.',
  description: 'The Unc Advisory Board. Veterans. Operators. Night-shift legends.',
};

const BOARD_MEMBERS = [
  {
    handle: '@dances_with_disaster',
    role: 'Chopped CEO',
    tenure: '14 years in Design',
    bio: 'Lead visionary. Orchestrating the intersection of industrial utility and high-design friction.',
    status: 'STILL UP',
    link: 'https://instagram.com/dances_with_disaster',
    image: '/images/board/ceo.jpg',
  },
  {
    handle: '@eatingsnackswithstrippers_2.0',
    role: 'Chopped Producer',
    tenure: '15 years in Production',
    bio: 'Production powerhouse. Turning musical concepts into tracks with fire beats.',
    status: 'STILL UP',
    link: 'https://instagram.com/eatingsnackswithstrippers_2.0',
    image: '/images/board/producer.jpg',
  },
  {
    handle: '@abstract_andy_',
    role: 'Chopped Old Head Unc',
    tenure: '20 years in Marketing and Product Design',
    bio: 'The veteran operator. Decades of market friction distilled into the CHOPPED. ethos.',
    status: 'STILL UP',
    link: 'https://instagram.com/abstract_andy_',
    image: '/images/board/unc.jpg',
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
            Veterans, operators, and creators who have spent 15+ years in the friction.
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
                <div className="w-14 h-14 border border-border bg-black flex items-center justify-center overflow-hidden group-hover:border-white transition-colors relative">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.handle}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  ) : (
                    <span className="text-muted-foreground font-mono text-lg">
                      {member.status === 'CLASSIFIED' ? '?' : '◉'}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-bold text-white font-mono text-base">
                    {member.link ? (
                      <a
                        href={member.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-muted-foreground transition-colors inline-flex items-center gap-2"
                      >
                        {member.handle}
                        <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                      </a>
                    ) : (
                      member.handle
                    )}
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
                    className={`text-[10px] font-mono tracking-widest px-2 py-1 border ${member.status === 'STILL UP'
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
            15+ years in the friction. A trade, a craft, or a grind that never stopped.
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
