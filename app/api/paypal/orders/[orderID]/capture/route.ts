import { NextRequest, NextResponse } from 'next/server';
import { getOrder, captureOrder, SUPPORTED_SHIPPING_COUNTRIES } from '@/lib/paypal';
import { createPrintfulOrder, getSyncVariantId } from '@/lib/printful';

// Captures an approved PayPal order, then dispatches Printful fulfillment.
// Guards (per docs/STRIPE-TO-PAYPAL-MIGRATION.md §4):
//  - shipping country checked BEFORE capture — no money moves for unsupported regions
//  - Printful dispatched only when OUR capture returns COMPLETED (idempotency)
//  - ORDER_ALREADY_CAPTURED → client success, no duplicate fulfillment
//  - INSTRUMENT_DECLINED → 422 passthrough so the client can actions.restart()
export async function POST(
  _request: NextRequest,
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
    //    Payment already succeeded, so fulfillment failures are logged, not surfaced.
    try {
      const shipping = data.purchase_units?.[0]?.shipping || preShipping;
      const email = data.payer?.email_address || order.payer?.email_address || undefined;

      if (!shipping?.address || !shipping?.name?.full_name) {
        console.error('[CHOPPED. SYSTEM] No shipping details on captured order — manual fulfillment needed.');
      } else {
        // Post-capture belt-and-braces: if a bad address slipped through, flag for manual refund.
        const country = shipping.address.country_code || '';
        if (!SUPPORTED_SHIPPING_COUNTRIES.includes(country)) {
          console.error(`[CHOPPED. SYSTEM] CAPTURED order ${orderID} has unsupported country ${country} — MANUAL REFUND REQUIRED.`);
        } else {
          const recipient = {
            name: shipping.name.full_name,
            address1: shipping.address.address_line_1 || '',
            city: shipping.address.admin_area_2 || '',
            state_code: shipping.address.admin_area_1 || undefined,
            country_code: country,
            zip: shipping.address.postal_code || '',
            email,
          };

          const printfulItems: Array<{ sync_variant_id: number; quantity: number; retail_price?: string }> = [];
          for (const it of order.purchase_units?.[0]?.items || []) {
            // Carrier format: "{SKU}|{color}|{size}"
            const [sku, color, size] = String(it.sku || '').split('|');
            const qty = parseInt(it.quantity || '1', 10) || 1;
            const syncVariantId = getSyncVariantId(sku, color, size);
            if (syncVariantId) {
              printfulItems.push({
                sync_variant_id: syncVariantId,
                quantity: qty,
                // What the buyer actually paid — shows on the Printful order.
                ...(it.unit_amount?.value && { retail_price: it.unit_amount.value }),
              });
            } else {
              console.error(`[CHOPPED. SYSTEM] Failed to resolve Printful Sync Variant ID for SKU ${sku}, color ${color}, size ${size}`);
            }
          }

          if (printfulItems.length > 0) {
            console.log(`[CHOPPED. SYSTEM] Dispatching fulfillment for ${printfulItems.length} items to Printful...`);
            // external_id = PayPal order ID → payment↔fulfillment traceability,
            // and (with update_existing) idempotent against dispatch retries.
            const printfulOrder = await createPrintfulOrder(recipient, printfulItems, orderID);
            console.log(`[CHOPPED. SYSTEM] FULFILLMENT SUCCESSFUL. PRINTFUL ORDER ID: ${printfulOrder.id}`);
          } else {
            console.warn('[CHOPPED. SYSTEM] No fulfillable items resolved on order.');
          }
        }
      }
    } catch (err) {
      console.error('[CHOPPED. SYSTEM] FULFILLMENT ATTEMPT FAILED:', err);
    }

    return NextResponse.json({ status: 'COMPLETED', id: data.id });
  } catch (err) {
    console.error('[CHOPPED. PAYPAL] Capture route error:', err);
    return NextResponse.json({ error: 'SYSTEM_FRICTION_DETECTED' }, { status: 500 });
  }
}
