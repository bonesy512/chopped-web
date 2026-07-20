import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { products } from '@/lib/products';

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'ITEMS_REQUIRED' }, { status: 400 });
    }

    const stripeLineItems = [];
    const sessionMetadata: Record<string, string> = {
      item_count: items.length.toString(),
    };

    for (let idx = 0; idx < items.length; idx++) {
      const item = items[idx];
      const product = products.find(p => p.id === item.productId);
      
      if (!product) {
        return NextResponse.json({ error: `PRODUCT_NOT_FOUND: ${item.productId}` }, { status: 404 });
      }

      const optionsString = [item.color, item.size].filter(Boolean).join(' / ');

      stripeLineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: optionsString ? `${product.name} (${optionsString})` : product.name,
            description: product.shortDesc,
            metadata: {
              sku: product.sku,
              ...(item.size && { size: item.size }),
              ...(item.color && { color: item.color }),
            },
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: item.quantity,
      });

      // Encode variant info into metadata for webhook digestion
      // Format: SKU:color:size:quantity
      sessionMetadata[`item_${idx}`] = `${product.sku}:${item.color || 'Black'}:${item.size || 'M'}:${item.quantity}`;
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU'],
      },
      line_items: stripeLineItems,
      mode: 'payment',
      success_url: `${baseUrl}/secure-gear/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/shop/all`,
      metadata: sessionMetadata,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error('Checkout session error:', err);
    return NextResponse.json(
      { error: 'SYSTEM_FRICTION_DETECTED' },
      { status: 500 }
    );
  }
}
