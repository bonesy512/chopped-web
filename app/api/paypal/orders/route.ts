import { NextRequest, NextResponse } from 'next/server';
import { createOrder, type PayPalLineItem } from '@/lib/paypal';
import { products } from '@/lib/products';

// Creates a PayPal order from the cart. Client sends ids/options/quantities only —
// prices are derived server-side from lib/products.ts (client is never trusted).
export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'ITEMS_REQUIRED' }, { status: 400 });
    }

    const lineItems: PayPalLineItem[] = [];

    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `PRODUCT_NOT_FOUND: ${item.productId}` },
          { status: 404 }
        );
      }

      const quantity = Math.min(99, Math.max(1, parseInt(item.quantity, 10) || 1));
      const color = item.color || 'Black';
      const size = item.size || 'M';
      const optionsString = [item.color, item.size].filter(Boolean).join(' / ');

      lineItems.push({
        name: optionsString ? `${product.name} (${optionsString})` : product.name,
        // Carrier parsed back at capture for Printful: "{SKU}|{color}|{size}"
        skuCarrier: `${product.sku}|${color}|${size}`,
        unitPriceCents: Math.round(product.price * 100),
        quantity,
      });
    }

    const order = await createOrder(lineItems);
    return NextResponse.json({ id: order.id });
  } catch (err) {
    console.error('[CHOPPED. PAYPAL] Order creation error:', err);
    return NextResponse.json({ error: 'SYSTEM_FRICTION_DETECTED' }, { status: 500 });
  }
}
