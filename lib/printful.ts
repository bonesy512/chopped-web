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
  // F#&K CANCER fundraiser tee — Stanley/Stella SATU020 (sync product 449249937)
  'CHPD-FND-001': {
    'Black': {
      'S': 5405608962,
      'M': 5405608963,
      'L': 5405608964,
      'XL': 5405608965,
      '2XL': 5405608966,
      'XXL': 5405608966, // alias
    },
  },

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
  
  // The "Anti" Social Club Hoodie (Live Printful Sync Product ID: 448961780)
  'CHPD-OUT-005': {
    'Black': {
      'S': 5404658799,
      'M': 5404658800,
      'L': 5404658801,
      'XL': 5404658802,
      'XXL': 5404658803,
      '2XL': 5404658803, // alias
      '3XL': 5404658804,
    }
  },
  
  // Future launch expansions — replace 0s with real sync-variant IDs from
  // Printful after creating store products via dashboard.
  // Use: GET /store/products/{id} → sync_variants[].id
  'CHPD-OUT-002': { // Hoodie — Cotton Heritage M2580 (catalog 380)
    'Black': {
      'S': 0,
      'M': 0,
      'L': 0,
      'XL': 0,
      'XXL': 0,
      '2XL': 0, // alias
      '3XL': 0,
    }
  },
  'CHPD-ACC-005': { // Hat — Otto Cap 104-1018 (catalog 396; sync product 449015612)
    'Black': {
      'One Size': 5404771405,
      'OSFA': 5404771405, // alias — products.ts uses OSFA
    },
  },
  'CHPD-ACC-009': { // Beanie — Yupoong 1501KC (catalog 266; sync product 449029011)
    'Black': {
      'One Size': 5404798547,
      'OSFA': 5404798547, // alias — products.ts uses OSFA
    }
  },
  // Vol.02 Expansion Line (Catalog ID placeholders)
  'CHPD-STK-001': { 'Black': { '3X3': 0 } },   // Sticker (ID 358)
  'CHPD-MUG-001': { 'Black': { '11OZ': 5405110245, '15OZ': 5405110246 } }, // Mug — sync product 449140710 (It's 2AM Coffee Mug)
  'CHPD-PAT-001': { 'Black': { '3INCH': 0 } }, // Patch (ID 516)
  'CHPD-TSH-005': { 'Black': { 'S': 0, 'M': 0, 'L': 0, 'XL': 0, 'XXL': 0, '2XL': 0, '3XL': 0 } }, // LS Tee (ID 57)
  'CHPD-OUT-004': { 'Black': { 'S': 0, 'M': 0, 'L': 0, 'XL': 0, 'XXL': 0, '2XL': 0, '3XL': 0 } }, // Crewneck (ID 145)
  'CHPD-BAG-001': { 'Black': { 'OSFA': 0 } },  // Tote Bag (ID 84)
  'CHPD-BTL-001': { 'Black': { '17OZ': 0 } },  // Water Bottle (ID 382)
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
