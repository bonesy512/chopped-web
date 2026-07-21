// Client-side Google Analytics 4 (GA4) helper for CHOPPED.
//
// Emits GA4-spec ecommerce events through @next/third-parties/google's
// `sendGAEvent`, with a `window.gtag` fallback. Every call is a safe no-op
// during SSR and whenever NEXT_PUBLIC_GA_ID is unset (local / preview builds
// that have no property attached), so these can be dropped into any client
// component without guarding the call site.
//
// GA4 event names (`add_to_cart`, `purchase`, ...) are a fixed Google spec —
// do NOT rename them to brand vocabulary. The prohibited-word list governs
// customer-facing copy, not these internal identifiers.

import { sendGAEvent } from '@next/third-parties/google';
import type { CartItem } from '@/components/cart/CartContext';
import type { Product } from '@/lib/products';

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>,
    ) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;
const CURRENCY = 'USD';

export interface GaItem {
  item_id: string;
  item_name: string;
  item_category?: string;
  item_variant?: string;
  price: number;
  quantity: number;
}

type GaParams = Record<string, string | number | boolean | GaItem[] | undefined>;

/** Low-level generic GA4 event dispatch. SSR- and no-GA-safe. */
export function trackGaEvent(action: string, params: GaParams = {}): void {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;
  try {
    sendGAEvent('event', action, params);
  } catch {
    window.gtag?.('event', action, params);
  }
}

// ─── GA4 item mappers ─────────────────────────────────────────────────────────

/** Map a bare product (no cart context) to a GA4 item — used for `view_item`. */
export function productToGaItem(
  product: Product,
  opts?: { variant?: string; quantity?: number },
): GaItem {
  return {
    item_id: product.sku,
    item_name: product.name,
    item_category: product.category,
    // Locked SKUs carry no colorway/size selection yet; tag them so REDACTED
    // views stay distinguishable from real, buyable product views.
    item_variant: opts?.variant ?? (product.status === 'REDACTED' ? 'REDACTED' : undefined),
    price: product.price,
    quantity: opts?.quantity ?? 1,
  };
}

/** Map a cart line (product + chosen colorway/size + qty) to a GA4 item. */
export function cartItemToGaItem(item: CartItem): GaItem {
  const variant = [item.color, item.size].filter(Boolean).join(' / ') || undefined;
  return {
    item_id: item.product.sku,
    item_name: item.product.name,
    item_category: item.product.category,
    item_variant: variant,
    price: item.product.price,
    quantity: item.quantity,
  };
}

const sumValue = (items: GaItem[]): number =>
  items.reduce((acc, i) => acc + i.price * i.quantity, 0);

// ─── Typed ecommerce event helpers ─────────────────────────────────────────────

export function trackViewItem(product: Product): void {
  const item = productToGaItem(product);
  trackGaEvent('view_item', { currency: CURRENCY, value: item.price, items: [item] });
}

export function trackAddToCart(item: CartItem): void {
  const gaItem = cartItemToGaItem(item);
  trackGaEvent('add_to_cart', {
    currency: CURRENCY,
    value: gaItem.price * gaItem.quantity,
    items: [gaItem],
  });
}

export function trackViewCart(items: CartItem[]): void {
  if (items.length === 0) return;
  const gaItems = items.map(cartItemToGaItem);
  trackGaEvent('view_cart', { currency: CURRENCY, value: sumValue(gaItems), items: gaItems });
}

export function trackBeginCheckout(items: CartItem[]): void {
  if (items.length === 0) return;
  const gaItems = items.map(cartItemToGaItem);
  trackGaEvent('begin_checkout', { currency: CURRENCY, value: sumValue(gaItems), items: gaItems });
}

export function trackAddShippingInfo(items: CartItem[], shippingTier: string): void {
  if (items.length === 0) return;
  const gaItems = items.map(cartItemToGaItem);
  trackGaEvent('add_shipping_info', {
    currency: CURRENCY,
    value: sumValue(gaItems),
    shipping_tier: shippingTier,
    items: gaItems,
  });
}

export function trackPurchase(args: {
  transactionId: string;
  items: CartItem[];
  shipping?: number;
  value?: number;
}): void {
  const gaItems = args.items.map(cartItemToGaItem);
  trackGaEvent('purchase', {
    transaction_id: args.transactionId,
    currency: CURRENCY,
    value: args.value ?? sumValue(gaItems),
    shipping: args.shipping,
    items: gaItems,
  });
}

export function trackGenerateLead(opts?: { method?: string }): void {
  trackGaEvent('generate_lead', { method: opts?.method ?? 'newsletter' });
}
