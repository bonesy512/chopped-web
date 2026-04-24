import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

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
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(`[CHOPPED. SYSTEM] ORDER SECURED: ${session.id}`);
      console.log(`[CHOPPED. SYSTEM] SKU: ${session.metadata?.sku}`);
      // TODO: Trigger fulfillment / inventory decrement
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
