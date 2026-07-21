import { NextRequest, NextResponse } from 'next/server';
import { patchOrderAmount } from '@/lib/paypal';
import { resolveCart } from '@/lib/order-build';
import { calcShippingCents, SUPPORTED_SHIPPING_COUNTRIES } from '@/lib/shipping';

// Called by the PayPal button's onShippingAddressChange: recomputes shipping for
// the buyer's actual destination and patches the order so the popup shows the
// real total. Prices/shipping are always recomputed server-side (never trusted
// from the client).
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ orderID: string }> },
) {
  const { orderID } = await params;
  try {
    const { items, countryCode } = await request.json();

    if (!countryCode || !SUPPORTED_SHIPPING_COUNTRIES.includes(countryCode)) {
      return NextResponse.json({ error: 'REGION_NOT_SUPPORTED' }, { status: 422 });
    }

    const resolved = resolveCart(items);
    if ('error' in resolved) {
      return NextResponse.json({ error: resolved.error }, { status: resolved.status });
    }

    const shippingCents = calcShippingCents(resolved.shippingLines, countryCode);
    const ok = await patchOrderAmount(orderID, resolved.itemTotalCents, shippingCents);
    if (!ok) {
      return NextResponse.json({ error: 'PATCH_FAILED' }, { status: 502 });
    }

    return NextResponse.json({
      shipping: (shippingCents / 100).toFixed(2),
      total: ((resolved.itemTotalCents + shippingCents) / 100).toFixed(2),
    });
  } catch (err) {
    console.error('[CHOPPED. PAYPAL] Shipping patch error:', err);
    return NextResponse.json({ error: 'SYSTEM_FRICTION_DETECTED' }, { status: 500 });
  }
}
