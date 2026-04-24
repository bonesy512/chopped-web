'use client';

import Link from 'next/link';
import { useState } from 'react';

const NAV_LINKS = [
  { label: 'MUSEUM', href: '/shop/all' },
  { label: 'MANIFESTO', href: '/manifesto' },
  { label: 'ADVISORY', href: '/advisory-board' },
  { label: 'TRANSMIT', href: '/transmit' },
];

import { useUncVoice } from '@/hooks/use-unc-voice';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { speak, isPlaying } = useUncVoice();

  return (
    <header className="fixed top-0 left-0 w-full border-b border-border bg-[#080808]/95 backdrop-blur-sm z-40 h-14 flex items-center px-4 md:px-6 justify-between font-mono text-xs">
      {/* Left: Logo */}
      <Link href="/" className="font-bold tracking-[0.3em] text-white text-sm hover:text-[#FF0000] transition-colors duration-0">
        CHOPPED.
      </Link>

      {/* Center: Nav (desktop) */}
      <nav className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-muted-foreground hover:text-white tracking-widest transition-colors duration-0 relative group"
          >
            {link.label}
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-150" />
          </Link>
        ))}
      </nav>

      {/* Right: CTA + scan */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => speak("The first move is what sets everything in motion.")}
          disabled={isPlaying}
          className={`hidden md:inline-block text-muted-foreground hover:text-white tracking-widest transition-colors duration-0 ${isPlaying ? 'animate-pulse text-[#FF0000]' : ''}`}
          title="LISTEN TO THE UNC"
        >
          {isPlaying ? '• SIGNAL •' : 'SIGNAL'}
        </button>
        <Link
          href="/scan"
          className="hidden md:inline-block text-muted-foreground hover:text-white tracking-widest transition-colors duration-0"
          title="SCAN SYSTEM"
        >
          ⌕
        </Link>
        <Link
          href="/secure-gear"
          className="border border-[#FF0000] text-[#FF0000] px-3 py-1 text-xs tracking-widest hover:bg-[#FF0000] hover:text-black transition-colors duration-0 hidden md:block"
        >
          SECURE GEAR
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white w-12 h-12 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
        >
          <div className="w-8 flex flex-col gap-1.5">
            <span className={`block h-px w-full bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
            <span className={`block h-px bg-white transition-all ${menuOpen ? 'opacity-0 w-0' : 'w-full'}`} />
            <span className={`block h-px w-full bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-14 left-0 w-full bg-[#080808] border-b border-border flex flex-col md:hidden z-50">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-6 py-4 border-b border-border text-white tracking-widest hover:bg-white hover:text-black transition-colors duration-0"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/secure-gear"
            onClick={() => setMenuOpen(false)}
            className="px-6 py-4 text-[#FF0000] tracking-widest hover:bg-[#FF0000] hover:text-black transition-colors duration-0"
          >
            SECURE GEAR
          </Link>
        </div>
      )}
    </header>
  );
}
