import { NextRequest, NextResponse } from 'next/server';
import { getOrder, captureOrder } from '@/lib/paypal';
import { SUPPORTED_SHIPPING_COUNTRIES } from '@/lib/shipping';
import { dispatchPayPalFulfillment } from '@/lib/fulfillment';
import { sendPurchaseEvent, gaClientIdFromCookie, type MpItem } from '@/lib/analytics/mp';

// Captures an approved PayPal order, then dispatches Printful fulfillment.
// Guards (per docs/STRIPE-TO-PAYPAL-MIGRATION.md §4):
//  - shipping country checked BEFORE capture — no money moves for unsupported regions
//  - Printful dispatched only when OUR capture returns COMPLETED (idempotency)
//  - ORDER_ALREADY_CAPTURED → client success, no duplicate fulfillment
//  - INSTRUMENT_DECLINED → 422 passthrough so the client can actions.restart()
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ orderID: string }> }
) {
  const { orderID } = await params;

  try {
    // 1. Read the order — items[] (sku carriers) + shipping live here.
    const order = await getOrder(orderID);

    // Idempotency: a completed order was already captured + dispatched.
    if (order.status === 'COMPLETED') {
      return NextResponse.json({ status: 'COMPLETED', alreadyCaptured: true });
    }

    // 2. Shipping guard — refuse BEFORE capturing so no money moves.
    const preShipping = order.purchase_units?.[0]?.shipping;
    const preCountry = preShipping?.address?.country_code;
    if (preCountry && !SUPPORTED_SHIPPING_COUNTRIES.includes(preCountry)) {
      console.warn(`[CHOPPED. PAYPAL] Region not supported: ${preCountry} (order ${orderID})`);
      return NextResponse.json({ error: 'REGION_NOT_SUPPORTED' }, { status: 422 });
    }

    // 3. Capture.
    const { status, data } = await captureOrder(orderID);

    if (status >= 400) {
      const issue = data?.details?.[0]?.issue;
      if (issue === 'ORDER_ALREADY_CAPTURED') {
        return NextResponse.json({ status: 'COMPLETED', alreadyCaptured: true });
      }
      if (issue === 'INSTRUMENT_DECLINED') {
        // Client should call actions.restart() so the buyer picks another funding source.
        return NextResponse.json({ error: 'INSTRUMENT_DECLINED' }, { status: 422 });
      }
      console.error('[CHOPPED. PAYPAL] Capture failed:', JSON.stringify(data));
      return NextResponse.json({ error: 'CAPTURE_FAILED' }, { status: 502 });
    }

    if (data.status !== 'COMPLETED') {
      console.warn(`[CHOPPED. PAYPAL] Capture status ${data.status} for order ${orderID}`);
      return NextResponse.json({ status: data.status, id: data.id });
    }

    console.log(`[CHOPPED. SYSTEM] ORDER SECURED: ${orderID}`);

    // 4. Fulfillment — the PAID order is the source of truth, not the client cart.
    //    Shared with the webhook backstop (lib/fulfillment.ts); idempotent via
    //    Printful external_id + update_existing. Payment already succeeded, so
    //    failures are logged, not surfaced — the webhook redelivery retries them.
    try {
      const shipping = data.purchase_units?.[0]?.shipping || preShipping;
      const email = data.payer?.email_address || order.payer?.email_address || undefined;
      await dispatchPayPalFulfillment(order, orderID, shipping, email);
    } catch (err) {
      console.error('[CHOPPED. SYSTEM] FULFILLMENT ATTEMPT FAILED (webhook backstop will retry):', err);
    }

    // 5. GA4 purchase backstop — server-side, fire-and-forget. Dedupes with the
    //    client `purchase` on transaction_id. Sourced from the order WE priced
    //    (items + breakdown), not the client cart. Never throws into the response.
    try {
      const pu = order.purchase_units?.[0];
      const items: MpItem[] = (pu?.items ?? []).map((it) => {
        // sku carrier format: "{SKU}|{color}|{size}" (see lib/paypal.ts).
        const [sku, color, size] = (it.sku ?? '').split('|');
        return {
          item_id: sku || it.sku || 'UNKNOWN',
          item_name: it.name,
          item_variant: [color, size].filter(Boolean).join(' / ') || undefined,
          price: Number(it.unit_amount?.value ?? 0),
          quantity: Number(it.quantity ?? 1),
        };
      });
      const breakdown = pu?.amount?.breakdown;
      await sendPurchaseEvent({
        transactionId: orderID,
        value: Number(breakdown?.item_total?.value ?? 0),
        shipping: breakdown?.shipping?.value ? Number(breakdown.shipping.value) : undefined,
        items,
        clientId: gaClientIdFromCookie(request.headers.get('cookie')),
      });
    } catch (err) {
      console.warn('[CHOPPED. GA4] purchase backstop skipped:', err);
    }

    return NextResponse.json({ status: 'COMPLETED', id: data.id });
  } catch (err) {
    console.error('[CHOPPED. PAYPAL] Capture route error:', err);
    return NextResponse.json({ error: 'SYSTEM_FRICTION_DETECTED' }, { status: 500 });
  }
}
