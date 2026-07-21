// Shared cart → PayPal line-item resolver, used by both the create-order route
// and the shipping-patch route so they price identically. Prices are ALWAYS
// derived server-side from lib/products.ts — the client only sends ids/options/qty.
import { products, type Product } from './products';
import { type PayPalLineItem } from './paypal';
import { type ShippingCartLine } from './shipping';

export type CartRequestItem = {
  productId: string;
  size?: string;
  color?: string;
  quantity?: number | string;
};

export type ResolvedCart = {
  lineItems: PayPalLineItem[];
  shippingLines: ShippingCartLine[];
  itemTotalCents: number;
};

// Returns a string error code on failure, or the resolved cart.
export function resolveCart(items: unknown): ResolvedCart | { error: string; status: number } {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return { error: 'ITEMS_REQUIRED', status: 400 };
  }

  const lineItems: PayPalLineItem[] = [];
  const shippingLines: ShippingCartLine[] = [];
  let itemTotalCents = 0;

  for (const raw of items as CartRequestItem[]) {
    const product: Product | undefined = products.find((p) => p.id === raw.productId);
    if (!product) {
      return { error: `PRODUCT_NOT_FOUND: ${raw.productId}`, status: 404 };
    }
    const quantity = Math.min(99, Math.max(1, parseInt(String(raw.quantity), 10) || 1));
    const color = raw.color || 'Black';
    const size = raw.size || 'M';
    const optionsString = [raw.color, raw.size].filter(Boolean).join(' / ');
    const unitPriceCents = Math.round(product.price * 100);

    lineItems.push({
      name: optionsString ? `${product.name} (${optionsString})` : product.name,
      skuCarrier: `${product.sku}|${color}|${size}`,
      unitPriceCents,
      quantity,
    });
    shippingLines.push({ product, quantity });
    itemTotalCents += unitPriceCents * quantity;
  }

  return { lineItems, shippingLines, itemTotalCents };
}
