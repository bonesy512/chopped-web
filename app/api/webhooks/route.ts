import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';
import { createPrintfulOrder, getSyncVariantId } from '@/lib/printful';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'INVALID_SIGNATURE' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as any;
      console.log(`[CHOPPED. SYSTEM] ORDER SECURED: ${session.id}`);

      const shipping = session.shipping_details;
      if (!shipping || !shipping.address || !shipping.name) {
        console.error('[CHOPPED. SYSTEM] No shipping details captured in Stripe session.');
        break;
      }

      const email = session.customer_details?.email || undefined;
      const recipient = {
        name: shipping.name,
        address1: shipping.address.line1!,
        city: shipping.address.city!,
        state_code: shipping.address.state || undefined,
        country_code: shipping.address.country!,
        zip: shipping.address.postal_code!,
        email: email,
      };

      const printfulItems: Array<{ sync_variant_id: number; quantity: number }> = [];
      const itemCountStr = session.metadata?.item_count;

      if (itemCountStr) {
        const itemCount = parseInt(itemCountStr, 10);
        for (let idx = 0; idx < itemCount; idx++) {
          const itemKey = `item_${idx}`;
          const itemData = session.metadata?.[itemKey];
          if (itemData) {
            // Split: SKU:color:size:quantity
            const [sku, color, size, qtyStr] = itemData.split(':');
            const qty = parseInt(qtyStr, 10) || 1;

            const syncVariantId = getSyncVariantId(sku, color, size);
            if (syncVariantId) {
              printfulItems.push({
                sync_variant_id: syncVariantId,
                quantity: qty,
              });
            } else {
              console.error(`[CHOPPED. SYSTEM] Failed to resolve Printful Sync Variant ID for SKU ${sku}, color ${color}, size ${size}`);
            }
          }
        }
      } else {
        // Fallback for single item metadata (legacy/direct buys)
        const sku = session.metadata?.sku;
        const size = session.metadata?.size || 'M';
        const color = session.metadata?.color || 'Black';

        if (sku) {
          const syncVariantId = getSyncVariantId(sku, color, size);
          if (syncVariantId) {
            printfulItems.push({
              sync_variant_id: syncVariantId,
              quantity: 1,
            });
          } else {
            console.error(`[CHOPPED. SYSTEM] Legacy fallback: Failed to resolve Printful Sync Variant ID for SKU ${sku}, color ${color}, size ${size}`);
          }
        }
      }

      if (printfulItems.length > 0) {
        try {
          console.log(`[CHOPPED. SYSTEM] Dispatching fulfillment for ${printfulItems.length} items to Printful...`);
          const printfulOrder = await createPrintfulOrder(recipient, printfulItems);
          console.log(`[CHOPPED. SYSTEM] FULFILLMENT SUCCESSFUL. PRINTFUL ORDER ID: ${printfulOrder.id}`);
        } catch (err) {
          console.error('[CHOPPED. SYSTEM] FULFILLMENT ATTEMPT FAILED:', err);
        }
      } else {
        console.warn('[CHOPPED. SYSTEM] No fulfillable items resolved in metadata.');
      }
      break;
    }
    case 'payment_intent.payment_failed': {
      console.log(`[CHOPPED. SYSTEM] PAYMENT FRICTION: ${event.data.object}`);
      break;
    }
    default:
      console.log(`[CHOPPED. SYSTEM] UNHANDLED EVENT: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
