import { NextRequest, NextResponse } from 'next/server';
import { createOrder } from '@/lib/paypal';
import { resolveCart } from '@/lib/order-build';
import { calcShippingCents } from '@/lib/shipping';

// Creates a PayPal order from the cart. Client sends ids/options/quantities only —
// prices are derived server-side from lib/products.ts.
//
// Shipping is seeded with a provisional US rate (buyer's real destination is
// unknown until the popup); the shipping route re-patches it on address change.
export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json();
    const resolved = resolveCart(items);
    if ('error' in resolved) {
      return NextResponse.json({ error: resolved.error }, { status: resolved.status });
    }

    const shippingCents = calcShippingCents(resolved.shippingLines, 'US');
    const order = await createOrder(resolved.lineItems, shippingCents);
    return NextResponse.json({ id: order.id });
  } catch (err) {
    console.error('[CHOPPED. PAYPAL] Order creation error:', err);
    return NextResponse.json({ error: 'SYSTEM_FRICTION_DETECTED' }, { status: 500 });
  }
}
