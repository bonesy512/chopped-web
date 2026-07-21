// PayPal Orders v2 client — plain fetch, no server SDK (mirrors lib/printful.ts).
// Auth: OAuth2 client_credentials, token cached in module scope until near expiry.
// Base URL comes from PAYPAL_API_BASE (sandbox default) so cutover is an env flip.

// Re-exported from lib/shipping.ts (shared with the client-side popup guard).
export { SUPPORTED_SHIPPING_COUNTRIES } from './shipping';

function getApiBase(): string {
  return process.env.PAYPAL_API_BASE || 'https://api-m.sandbox.paypal.com';
}

// ─── OAuth token (cached) ───────────────────────────────────────────────────
let _token: { accessToken: string; expiresAt: number } | null = null;

export async function getAccessToken(): Promise<string> {
  // Refresh 60s before expiry to avoid using a token that dies mid-request.
  if (_token && Date.now() < _token.expiresAt - 60_000) {
    return _token.accessToken;
  }

  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    console.error('[CHOPPED. PAYPAL] Missing PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET.');
    throw new Error('PAYPAL_CREDENTIALS_MISSING');
  }

  const response = await fetch(`${getApiBase()}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  });

  const data = await response.json();
  if (!response.ok || !data.access_token) {
    console.error('[CHOPPED. PAYPAL] OAuth failed:', JSON.stringify(data));
    throw new Error('PAYPAL_OAUTH_FAILED');
  }

  _token = {
    accessToken: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return _token.accessToken;
}

// ─── Orders v2 ──────────────────────────────────────────────────────────────

// One purchasable line, already validated + priced server-side from lib/products.ts.
// skuCarrier format: "{SKU}|{color}|{size}" — parsed back at capture for Printful.
export type PayPalLineItem = {
  name: string;
  skuCarrier: string;
  unitPriceCents: number;
  quantity: number;
};

// Loose shapes for the PayPal JSON we actually read — everything optional.
export type PayPalShipping = {
  name?: { full_name?: string };
  address?: {
    address_line_1?: string;
    address_line_2?: string;
    admin_area_1?: string; // state
    admin_area_2?: string; // city
    postal_code?: string;
    country_code?: string;
  };
};

export type PayPalOrderResponse = {
  id?: string;
  status?: string;
  details?: Array<{ issue?: string; description?: string }>;
  payer?: { email_address?: string };
  purchase_units?: Array<{
    amount?: {
      value?: string;
      breakdown?: {
        item_total?: { currency_code?: string; value?: string };
        shipping?: { currency_code?: string; value?: string };
      };
    };
    shipping?: PayPalShipping;
    items?: Array<{
      name?: string;
      sku?: string;
      quantity?: string;
      unit_amount?: { currency_code?: string; value?: string };
    }>;
  }>;
};

export const centsToValue = (cents: number) => (cents / 100).toFixed(2);

// `shippingCents` is a provisional estimate (buyer's real region is unknown
// until the popup); it's re-patched by the shipping route on address change.
export async function createOrder(items: PayPalLineItem[], shippingCents = 0) {
  const token = await getAccessToken();

  // Sum in integer cents to avoid float drift; PayPal 422s on breakdown mismatch.
  const itemTotalCents = items.reduce((sum, i) => sum + i.unitPriceCents * i.quantity, 0);
  const toValue = centsToValue;

  const payload = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: toValue(itemTotalCents + shippingCents),
          breakdown: {
            item_total: { currency_code: 'USD', value: toValue(itemTotalCents) },
            shipping: { currency_code: 'USD', value: toValue(shippingCents) },
          },
        },
        items: items.map((i) => ({
          name: i.name.slice(0, 127),
          sku: i.skuCarrier.slice(0, 127),
          quantity: String(i.quantity),
          unit_amount: { currency_code: 'USD', value: toValue(i.unitPriceCents) },
          category: 'PHYSICAL_GOODS',
        })),
      },
    ],
    payment_source: {
      paypal: {
        experience_context: {
          brand_name: 'CHOPPED.',
          shipping_preference: 'GET_FROM_FILE', // buyer's PayPal address; guarded at capture
          user_action: 'PAY_NOW',
        },
      },
    },
  };

  const response = await fetch(`${getApiBase()}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  const data = await response.json();
  if (!response.ok || !data.id) {
    console.error('[CHOPPED. PAYPAL] Create order failed:', JSON.stringify(data));
    throw new Error('PAYPAL_CREATE_ORDER_FAILED');
  }
  return data;
}

export async function getOrder(orderID: string): Promise<PayPalOrderResponse> {
  const token = await getAccessToken();
  const response = await fetch(`${getApiBase()}/v2/checkout/orders/${orderID}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  const data = await response.json();
  if (!response.ok) {
    console.error('[CHOPPED. PAYPAL] Get order failed:', JSON.stringify(data));
    throw new Error('PAYPAL_GET_ORDER_FAILED');
  }
  return data;
}

// Replaces the order's amount + breakdown (used to set real shipping once the
// buyer's destination is known, via onShippingAddressChange). Returns true on
// success. PayPal reflects the new total in the popup after this succeeds.
export async function patchOrderAmount(
  orderID: string,
  itemTotalCents: number,
  shippingCents: number,
): Promise<boolean> {
  const token = await getAccessToken();
  const v = centsToValue;
  const patch = [
    {
      op: 'replace',
      path: "/purchase_units/@reference_id=='default'/amount",
      value: {
        currency_code: 'USD',
        value: v(itemTotalCents + shippingCents),
        breakdown: {
          item_total: { currency_code: 'USD', value: v(itemTotalCents) },
          shipping: { currency_code: 'USD', value: v(shippingCents) },
        },
      },
    },
  ];
  const response = await fetch(`${getApiBase()}/v2/checkout/orders/${orderID}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
    cache: 'no-store',
  });
  if (response.status === 204) return true; // PayPal returns 204 No Content on success
  const data = await response.json().catch(() => ({}));
  console.error('[CHOPPED. PAYPAL] Patch order amount failed:', response.status, JSON.stringify(data));
  return false;
}

// Verifies a webhook event's signature via PayPal's verification endpoint
// (postback method per docs/integrate-webhooks.md).
//
// CRITICAL: `rawBody` is the UNMODIFIED request body string, spliced into the
// postback payload verbatim. PayPal's docs warn that parse→re-stringify can
// alter formatting (e.g. `1.0`→`1`, unicode escapes) and fail verification —
// so we never re-serialize the event.
export async function verifyWebhookSignature(
  headers: Headers,
  rawBody: string,
  webhookId: string
): Promise<boolean> {
  const token = await getAccessToken();
  const j = (v: string | null) => JSON.stringify(v);
  const payload =
    `{"auth_algo":${j(headers.get('paypal-auth-algo'))},` +
    `"cert_url":${j(headers.get('paypal-cert-url'))},` +
    `"transmission_id":${j(headers.get('paypal-transmission-id'))},` +
    `"transmission_sig":${j(headers.get('paypal-transmission-sig'))},` +
    `"transmission_time":${j(headers.get('paypal-transmission-time'))},` +
    `"webhook_id":${j(webhookId)},` +
    `"webhook_event":${rawBody}}`;

  const response = await fetch(`${getApiBase()}/v1/notifications/verify-webhook-signature`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: payload,
    cache: 'no-store',
  });
  const data = await response.json();
  if (!response.ok) {
    console.error('[CHOPPED. PAYPAL] Webhook verification call failed:', JSON.stringify(data));
    return false;
  }
  return data.verification_status === 'SUCCESS';
}

// Returns { status, data } instead of throwing so the route can branch on
// PayPal issues (INSTRUMENT_DECLINED, ORDER_ALREADY_CAPTURED) per the plan.
export async function captureOrder(
  orderID: string
): Promise<{ status: number; data: PayPalOrderResponse }> {
  const token = await getAccessToken();
  const response = await fetch(`${getApiBase()}/v2/checkout/orders/${orderID}/capture`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });
  const data = await response.json();
  return { status: response.status, data };
}
