import { ImageResponse } from 'next/og'
import { products, getProductBySlug } from '@/lib/products'

export const alt = 'CHOPPED. Product'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Props = {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  return products.map((p) => ({
    category: p.categorySlug,
    slug: p.slug,
  }))
}

export default async function Image({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  const name = product?.name ?? 'CHOPPED.'
  const desc = product?.shortDesc ?? 'High-Performance Ageless Streetwear'
  const price = product?.status === 'ACTIVE' ? `$${product.price.toFixed(2)}` : '[REDACTED]'
  const sku = product?.sku ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          background: '#080808',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 64, position: 'relative', zIndex: 1 }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 20, fontFamily: 'monospace', letterSpacing: '0.3em' }}>
            CHOPPED. // {sku}
          </span>
          <span style={{ color: '#FF0000', fontSize: 14, fontFamily: 'monospace', letterSpacing: '0.2em' }}>
            ▮ ACCESS RESTRICTED
          </span>
        </div>

        {/* Product name */}
        <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ color: '#FFFFFF', fontSize: 72, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: 32 }}>
            {name}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 22, fontFamily: 'monospace', marginBottom: 24 }}>
            {desc}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
            }}
          >
            <span style={{ color: price === '[REDACTED]' ? '#FF0000' : '#FFFFFF', fontSize: 36, fontFamily: 'monospace', fontWeight: 700 }}>
              {price}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 14, fontFamily: 'monospace', letterSpacing: '0.2em', border: '1px solid rgba(255,255,255,0.2)', padding: '4px 12px' }}>
              VOL.01
            </span>
          </div>
        </div>

        {/* Footer */}
        <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: 14, fontFamily: 'monospace', letterSpacing: '0.2em', position: 'relative', zIndex: 1 }}>
          choppedunc.store — DROP: JUNE 1, 2026 // 02:00 AM PST
        </div>
      </div>
    ),
    { ...size }
  )
}
