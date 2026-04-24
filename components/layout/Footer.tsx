'use client';

import Link from 'next/link';

const LEGAL_LINKS = [
  { label: 'TERMS OF FRICTION', href: '/legal/terms-of-friction' },
  { label: 'PRIVACY [REDACTED]', href: '/legal/privacy-redacted' },
  { label: 'DROP LOG', href: '/drop-log' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-black">
      {/* Newsletter bar */}
      <div className="border-b border-border px-6 md:px-12 py-10 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
        <div>
          <p className="font-bold text-lg text-white tracking-widest font-sans uppercase">
            CLOCKING OUT IS NOT AN OPTION.
          </p>
          <p className="text-xs text-muted-foreground font-mono mt-1 max-w-sm">
            Get the 02:00 AM access code. No spam. Just the drop.
          </p>
        </div>
        <form className="flex w-full md:w-auto gap-0" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="> ENTER EMAIL"
            className="bg-transparent border border-border border-r-0 px-4 py-3 text-xs font-mono text-white placeholder:text-muted-foreground focus:outline-none focus:border-white w-full md:w-64 transition-colors"
          />
          <button
            type="submit"
            className="border border-white bg-black text-white px-4 py-3 text-xs font-mono tracking-widest hover:bg-white hover:text-black transition-colors duration-0 shrink-0"
          >
            CLOCK IN
          </button>
        </form>
      </div>

      {/* Bottom bar */}
      <div className="px-6 md:px-12 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-bold tracking-[0.3em] text-white text-sm">CHOPPED.</span>
          <span className="text-xs text-muted-foreground font-mono">
            © {new Date().getFullYear()} CHOPPED. INDUSTRIAL WEAR. AUSTIN, TX.{' '}
            <span className="bg-black text-black hover:text-white transition-colors cursor-pointer px-1">
              [REDACTED]
            </span>
          </span>
        </div>

        <nav className="flex flex-wrap gap-6">
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-muted-foreground hover:text-white font-mono tracking-wider transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <span className="w-2 h-2 bg-green-500 inline-block animate-pulse" />
          SYS_STATUS: ONLINE
        </div>
      </div>
    </footer>
  );
}
