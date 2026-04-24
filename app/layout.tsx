import { Inter, Roboto_Mono, Courier_Prime } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import type { Metadata, Viewport } from "next"

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const robotoMono = Roboto_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })
const courierPrime = Courier_Prime({ weight: ["400", "700"], subsets: ['latin'], variable: '--font-courier', display: 'swap' })

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://choppedunc.store'

export const viewport: Viewport = {
  themeColor: '#080808',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'CHOPPED. — High-Performance Ageless Streetwear',
    template: '%s — CHOPPED.',
  },
  description:
    'Engineered for the midnight shift. 500GSM French Terry armor, ORTH3-AGGR orthopedic support, industrial hardware. Limited drops at 02:00 AM PST. Austin, TX.',
  keywords: [
    'ageless streetwear',
    'high-performance workwear',
    'CHOPPED store',
    'industrial streetwear Austin',
    'utility vest duck canvas',
    'heavyweight hoodie 500gsm',
    'orthopedic sneakers',
    'limited drop streetwear',
    'nocturnal drop clothing',
    'adult streetwear',
  ],
  authors: [{ name: 'CHOPPED.', url: BASE_URL }],
  creator: 'CHOPPED.',
  publisher: 'CHOPPED.',
  category: 'shopping',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'CHOPPED.',
    title: 'CHOPPED. — High-Performance Ageless Streetwear',
    description:
      'Engineered for the midnight shift. 500GSM French Terry armor, hidden orthotic support, industrial hardware. Limited drops at 02:00 AM PST.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CHOPPED. — Function For The Friction.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CHOPPED. — Function For The Friction.',
    description:
      'High-Performance Ageless Streetwear. Limited nocturnal drops at 02:00 AM PST.',
    images: ['/og-image.png'],
    creator: '@choppedstore',
    site: '@choppedstore',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    // google: 'YOUR_GOOGLE_SITE_VERIFICATION_TOKEN',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased dark", robotoMono.variable, inter.variable, courierPrime.variable)}
    >
      <body>
        <ThemeProvider>
          <div className="grain-overlay" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
