import type { Metadata } from 'next';
import CallsignGeneratorPage from './callsign-generator';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://choppedunc.store';

export const metadata: Metadata = {
  title: 'TERMINAL ACCESS — The Midnight Callsign Generator',
  description: 'Initialize Operator Protocol. Generate your CHOPPED. callsign and unit assignment.',
  alternates: { canonical: `${BASE_URL}/callsign` },
  openGraph: {
    title: 'TERMINAL ACCESS — The Midnight Callsign',
    description: 'Generate your CHOPPED. callsign and unit assignment.',
    url: `${BASE_URL}/callsign`,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CHOPPED. TERMINAL ACCESS' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TERMINAL ACCESS — The Midnight Callsign',
    description: 'Generate your CHOPPED. callsign and unit assignment.',
  }
};

export default function Page() {
  return <CallsignGeneratorPage />;
}
