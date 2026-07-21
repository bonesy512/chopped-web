// Server-only GA4 Measurement Protocol sender.
//
// Backstops the client-side `purchase` event (CartDrawer) so revenue is still
// counted when gtag is ad-blocked or the buyer's tab dies during the PayPal
// redirect. GA4 deduplicates purchases that share a transaction_id, so firing
// from both client and server never double-counts. Fire-and-forget: failures
// are logged, never surfaced — analytics must not affect fulfillment or the
// response.
//
// Only import from server route handlers (Node runtime). Never import from a
// client component: it reads GA_API_SECRET, which must stay server-side.

import { randomUUID } from 'node:crypto';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const API_SECRET = process.env.GA_API_SECRET;

export interface MpItem {
  item_id: string;
  item_name?: string;
  item_variant?: string;
  price: number;
  quantity: number;
}

export async function sendPurchaseEvent(args: {
  transactionId: string;
  value: number;
  shipping?: number;
  items: MpItem[];
  clientId?: string;
}): Promise<void> {
  if (!GA_ID || !API_SECRET) return; // not configured → no-op

  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${GA_ID}&api_secret=${API_SECRET}`;
  const body = {
    // Reuse the browser's GA client_id when we can read it so the order ties to
    // the same session/attribution; otherwise a random id (still counts revenue).
    client_id: args.clientId || randomUUID(),
    events: [
      {
        name: 'purchase',
        params: {
          transaction_id: args.transactionId,
          currency: 'USD',
          value: args.value,
          ...(args.shipping != null ? { shipping: args.shipping } : {}),
          items: args.items,
        },
      },
    ],
  };

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    });
  } catch (err) {
    console.warn('[CHOPPED. GA4] Measurement Protocol purchase failed:', err);
  }
}

// Parse the GA client_id from the `_ga` cookie (value form: `GA1.1.<id>.<ts>`).
// GA4 wants just the `<id>.<ts>` tail as the client_id.
export function gaClientIdFromCookie(cookieHeader: string | null): string | undefined {
  if (!cookieHeader) return undefined;
  const match = cookieHeader.match(/(?:^|;\s*)_ga=GA\d\.\d\.([\d.]+)/);
  return match?.[1];
}
