import { NextRequest, NextResponse } from 'next/server';
import { getOrder, verifyWebhookSignature } from '@/lib/paypal';
import { dispatchPayPalFulfillment } from '@/lib/fulfillment';

// PayPal webhook — the fulfillment BACKSTOP, not the primary path.
// Primary dispatch happens synchronously in the capture route; this exists for
// the "capture succeeded but Printful dispatch failed" case. PayPal redelivers
// events on non-2xx responses for up to 3 days, and dispatch is idempotent
// (Printful external_id + update_existing), so retries can never duplicate.
//
// Registered event types: PAYMENT.CAPTURE.COMPLETED (acted on),
// PAYMENT.CAPTURE.DENIED / DECLINED / REFUNDED (logged for ops visibility;
// DENIED is the Payments-v1 name, DECLINED the v2 name — PayPal is
// inconsistent, so both are covered).
export async function POST(request: NextRequest) {
  const bodyText = await request.text();

  let event: {
    id?: string;
    event_type?: string;
    resource?: {
      id?: string;
      status?: string;
      supplementary_data?: { related_ids?: { order_id?: string } };
    };
  };
  try {
    event = JSON.parse(bodyText);
  } catch {
    return NextResponse.json({ error: 'INVALID_BODY' }, { status: 400 });
  }

  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  if (!webhookId) {
    // Not configured — acknowledge so PayPal doesn't retry-loop, but log loudly.
    console.error('[CHOPPED. PAYPAL] PAYPAL_WEBHOOK_ID not set — webhook event ignored (unverified).');
    return NextResponse.json({ received: true, verified: false });
  }

  // Pass the RAW body — PayPal's verification requires the event byte-exact
  // as received (parse→re-stringify can fail verification; see
  // docs/integrate-webhooks.md). Note: simulator/mock events always fail
  // postback verification by design — only real events can pass.
  const verified = await verifyWebhookSignature(request.headers, bodyText, webhookId);
  if (!verified) {
    console.error(`[CHOPPED. PAYPAL] Webhook signature verification FAILED for event ${event.id} (${event.event_type}).`);
    return NextResponse.json({ error: 'INVALID_SIGNATURE' }, { status: 400 });
  }

  switch (event.event_type) {
    case 'PAYMENT.CAPTURE.COMPLETED': {
      const orderId = event.resource?.supplementary_data?.related_ids?.order_id;
      if (!orderId) {
        console.warn(`[CHOPPED. PAYPAL] Webhook ${event.id}: capture completed but no related order_id — skipping.`);
        break;
      }
      console.log(`[CHOPPED. PAYPAL] Webhook: capture COMPLETED for order ${orderId} — ensuring fulfillment.`);
      try {
        const order = await getOrder(orderId);
        // Idempotent: if the capture route already dispatched, Printful just
        // updates the existing draft (same external_id).
        await dispatchPayPalFulfillment(order, orderId);
      } catch (err) {
        console.error('[CHOPPED. PAYPAL] Webhook fulfillment failed — returning 500 so PayPal redelivers:', err);
        return NextResponse.json({ error: 'FULFILLMENT_FAILED' }, { status: 500 });
      }
      break;
    }
    // PayPal's docs list DENIED (Payments v1) and DECLINED (Payments v2) —
    // inconsistently used in practice, so we subscribe to and handle both.
    case 'PAYMENT.CAPTURE.DENIED':
    case 'PAYMENT.CAPTURE.DECLINED':
    case 'PAYMENT.CAPTURE.REFUNDED': {
      console.warn(`[CHOPPED. PAYPAL] Webhook: ${event.event_type} — capture ${event.resource?.id}. Review in dashboard.`);
      break;
    }
    default:
      console.log(`[CHOPPED. PAYPAL] Webhook: unhandled event ${event.event_type}.`);
  }

  return NextResponse.json({ received: true });
}
