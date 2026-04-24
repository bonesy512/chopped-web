import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'CHOPPED. — Function For The Friction.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#080808',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '80px',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Grid lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Top label */}
        <div
          style={{
            position: 'absolute',
            top: 48,
            left: 80,
            color: 'rgba(255,255,255,0.3)',
            fontSize: 14,
            letterSpacing: '0.3em',
            fontFamily: 'monospace',
          }}
        >
          Austin, TX — Est. 02:00 AM
        </div>

        {/* Drop indicator */}
        <div
          style={{
            position: 'absolute',
            top: 48,
            right: 80,
            color: '#FF0000',
            fontSize: 12,
            letterSpacing: '0.3em',
            fontFamily: 'monospace',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          ▮ NEXT DROP: 02:00 AM PST
        </div>

        {/* Main headline */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              color: 'rgba(255,255,255,0.08)',
              fontSize: 200,
              fontWeight: 900,
              lineHeight: 1,
              position: 'absolute',
              bottom: 80,
              right: -20,
              letterSpacing: '-0.04em',
              fontFamily: 'sans-serif',
            }}
          >
            C.
          </div>

          <div
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: 13,
              letterSpacing: '0.4em',
              fontFamily: 'monospace',
              marginBottom: 24,
            }}
          >
            CHOPPED. // VOL.01
          </div>

          <div
            style={{
              color: '#FFFFFF',
              fontSize: 88,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              fontFamily: 'sans-serif',
              textTransform: 'uppercase',
            }}
          >
            FUNCTION
            <br />
            FOR THE
          </div>
          <div
            style={{
              color: '#FF0000',
              fontSize: 88,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              fontFamily: 'sans-serif',
              textTransform: 'uppercase',
            }}
          >
            FRICTION.
          </div>

          <div
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: 16,
              fontFamily: 'monospace',
              marginTop: 32,
              letterSpacing: '0.05em',
            }}
          >
            High-Performance Ageless Streetwear — choppedunc.store
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
