import { type PayPalOrderResponse, type PayPalShipping } from './paypal';
import { createPrintfulOrder, getSyncVariantId } from './printful';
import { SUPPORTED_SHIPPING_COUNTRIES } from './shipping';

// Shared Printful dispatch for a PAID PayPal order — called by BOTH the
// capture route (primary path) and the PayPal webhook (retry backstop).
// Safe to call twice for the same order: createPrintfulOrder sends
// external_id + ?update_existing=true, so a re-dispatch UPDATES the existing
// draft instead of duplicating it.
//
// Returns true when a Printful order was created/updated; false when there was
// nothing fulfillable (no shipping, unsupported region, no mapped variants).
// THROWS on Printful API failure — callers decide retry semantics (the capture
// route logs and moves on; the webhook returns 500 so PayPal redelivers).
export async function dispatchPayPalFulfillment(
  order: PayPalOrderResponse,
  orderID: string,
  shippingOverride?: PayPalShipping,
  emailOverride?: string
): Promise<boolean> {
  const shipping = shippingOverride || order.purchase_units?.[0]?.shipping;
  const email = emailOverride || order.payer?.email_address || undefined;

  if (!shipping?.address || !shipping?.name?.full_name) {
    console.error('[CHOPPED. SYSTEM] No shipping details on paid order — manual fulfillment needed.');
    return false;
  }

  // Belt-and-braces: if a bad address slipped past the pre-capture guard,
  // flag for manual refund instead of shipping somewhere we can't.
  const country = shipping.address.country_code || '';
  if (!SUPPORTED_SHIPPING_COUNTRIES.includes(country)) {
    console.error(`[CHOPPED. SYSTEM] PAID order ${orderID} has unsupported country ${country} — MANUAL REFUND REQUIRED.`);
    return false;
  }

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

  if (printfulItems.length === 0) {
    console.warn('[CHOPPED. SYSTEM] No fulfillable items resolved on order.');
    return false;
  }

  console.log(`[CHOPPED. SYSTEM] Dispatching fulfillment for ${printfulItems.length} items to Printful...`);
  // external_id = PayPal order ID → payment↔fulfillment traceability + idempotency.
  const printfulOrder = await createPrintfulOrder(recipient, printfulItems, orderID);
  console.log(`[CHOPPED. SYSTEM] FULFILLMENT SUCCESSFUL. PRINTFUL ORDER ID: ${printfulOrder.id}`);
  return true;
}
