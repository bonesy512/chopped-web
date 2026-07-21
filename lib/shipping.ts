// Shipping — country allowlist + Printful Standard flat-rate calculation.
// Shared by client (PayPal popup) and server (order build + capture guard).
// Kept free of server-only imports so it's safe in the client bundle.
//
// Rates are Printful's published US-fulfillment Standard flat rates
// (docs/printful_shipping_rates.csv), verified against the live /shipping/rates
// API (2 tees to US = $4.75 + $2.20 = $6.95). We charge the customer this so
// they cover Printful's shipping cost to us. Amounts in integer cents.

import type { Product } from './products';

export const SUPPORTED_SHIPPING_COUNTRIES = ['US', 'CA', 'GB', 'AU'];

// Printful groups its catalog into shipping categories. We map each CHOPPED SKU
// to its category. Unknown/other SKUs fall back to 'shirts' (the cheapest, so we
// never over-promise a low rate on something heavier).
type ShippingCategory = 'shirts' | 'hoodies' | 'hats';

const SKU_CATEGORY: Record<string, ShippingCategory> = {
  'CHPD-TSH-004': 'shirts', // Anti Graphic Tee
  'CHPD-OUT-002': 'hoodies', // Heavyweight Hoodie
  'CHPD-ACC-005': 'hats', // Distressed Dad Hat (embroidered)
  'CHPD-ACC-009': 'hats', // Night-Shift Beanie (embroidered)
};

export function shippingCategory(product: Product): ShippingCategory {
  return SKU_CATEGORY[product.sku] ?? 'shirts';
}

// Printful shipping regions we serve (US/CA/GB/AU allowlist).
type Region = 'US' | 'UK' | 'CA' | 'ANZ';

export function shippingRegion(countryCode: string): Region {
  switch (countryCode) {
    case 'GB':
      return 'UK';
    case 'CA':
      return 'CA';
    case 'AU':
    case 'NZ':
      return 'ANZ';
    default:
      return 'US'; // US + safe default
  }
}

// [baseCents, additionalItemCents] per category per region — primary Standard
// rate rows from the CSV. Additional-item pricing applies to each extra unit
// within the same category.
const RATES: Record<ShippingCategory, Record<Region, [number, number]>> = {
  shirts: { US: [475, 220], UK: [459, 150], CA: [829, 195], ANZ: [769, 140] },
  hoodies: { US: [849, 250], UK: [699, 240], CA: [1019, 235], ANZ: [1199, 225] },
  hats: { US: [449, 200], UK: [439, 150], CA: [759, 195], ANZ: [779, 140] },
};

export type ShippingCartLine = { product: Product; quantity: number };

// Total shipping (cents) for a cart to a destination. Charges each category's
// base once + additional-item rate for extra units in that category, then sums
// across categories (>= Printful's combined charge, so we never undercharge).
export function calcShippingCents(lines: ShippingCartLine[], countryCode: string): number {
  const region = shippingRegion(countryCode);
  const qtyByCategory = new Map<ShippingCategory, number>();
  for (const line of lines) {
    const cat = shippingCategory(line.product);
    qtyByCategory.set(cat, (qtyByCategory.get(cat) ?? 0) + Math.max(1, line.quantity));
  }
  let total = 0;
  for (const [cat, qty] of qtyByCategory) {
    const [base, addl] = RATES[cat][region];
    total += base + addl * (qty - 1);
  }
  return total;
}
