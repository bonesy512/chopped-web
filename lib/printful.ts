// Service for interacting with Printful API v1 orders
export type PrintfulRecipient = {
  name: string;
  address1: string;
  city: string;
  state_code?: string;
  country_code: string;
  zip: string;
  email?: string;
};

export type PrintfulOrderItem = {
  sync_variant_id: number;
  quantity: number;
  // What the customer actually paid per unit (shows on order/packing slip).
  retail_price?: string;
};

// Map of SKU + Color + Size to Printful Sync Variant ID
export const PRINTFUL_VARIANT_MAP: Record<string, Record<string, Record<string, number>>> = {
  // The "Anti" Graphic Tee
  'CHPD-TSH-004': {
    'Black': {
      'S': 5403563057,
      'M': 5403563062,
      'L': 5403563066,
      'XL': 5403563067,
      'XXL': 5403563068,
      '2XL': 5403563068, // support both notations
      '3XL': 5403563069,
      '4XL': 5403563070,
    },
    'White': {
      'S': 5403562104,
      'M': 5403562105,
      'L': 5403562106,
      'XL': 5403562108,
      'XXL': 5403562109,
      '2XL': 5403562109, // support both notations
      '3XL': 5403562110,
      '4XL': 5403562111,
    }
  },
  
  // Future launch expansions (Placeholders)
  'CHPD-OUT-002': { // Hoodie
    'Black': {
      'S': 0, // Swap with published Printful M2580 Sync Variant IDs
      'M': 0,
      'L': 0,
      'XL': 0,
      'XXL': 0,
      '3XL': 0
    }
  },
  'CHPD-ACC-005': { // Hat
    'Black': {
      'One Size': 0 // Swap with published Otto Cap 104-1018 Sync Variant ID
    }
  },
  'CHPD-ACC-009': { // Watch Cap
    'Black': {
      'One Size': 0 // Swap with published Yupoong 1501KC Sync Variant ID
    }
  }
};

/**
 * Resolves the Printful Sync Variant ID based on SKU, color, and size options.
 */
export function getSyncVariantId(sku: string, color: string = 'Black', size: string = 'M'): number | null {
  const productColors = PRINTFUL_VARIANT_MAP[sku];
  if (!productColors) return null;
  
  const sizes = productColors[color] || productColors['Black']; // Fallback to black if color not found
  if (!sizes) return null;
  
  const variantId = sizes[size];
  return variantId && variantId !== 0 ? variantId : null;
}

/**
 * Creates a draft order in the Printful store.
 *
 * `externalId` (the PayPal order ID) makes the Printful order traceable to its
 * payment, and — combined with `?update_existing=true` (per docs/openapi.json)
 * — makes fulfillment idempotent: a re-fired dispatch UPDATES the existing
 * draft with that external_id instead of creating a duplicate.
 */
export async function createPrintfulOrder(
  recipient: PrintfulRecipient,
  items: PrintfulOrderItem[],
  externalId?: string
) {
  const apiKey = process.env.PRINTFUL_API_KEY;
  const storeId = process.env.PRINTFUL_STORE_ID || '18495276';

  if (!apiKey) {
    console.error('[CHOPPED. PRINTFUL] Missing PRINTFUL_API_KEY env variable.');
    throw new Error('PRINTFUL_API_KEY_MISSING');
  }

  const payload = {
    ...(externalId && { external_id: externalId }),
    recipient,
    items,
  };

  console.log('[CHOPPED. PRINTFUL] Creating order payload:', JSON.stringify(payload, null, 2));

  const url = `https://api.printful.com/orders${externalId ? '?update_existing=true' : ''}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'X-PF-Store-ID': storeId,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('[CHOPPED. PRINTFUL] API Error Response:', JSON.stringify(data, null, 2));
    // Per openapi.json the error body carries error.message and/or result (string).
    throw new Error(data.error?.message || data.result || 'PRINTFUL_API_FAILED');
  }

  return data.result;
}
