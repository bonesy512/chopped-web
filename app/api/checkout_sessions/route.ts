import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { products } from '@/lib/products';

export async function POST(request: NextRequest) {
  try {
    const { productId, quantity = 1 } = await request.json();

    const product = products.find(p => p.id === productId);
    if (!product) {
      return NextResponse.json({ error: 'PRODUCT_NOT_FOUND' }, { status: 404 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            ...(product.stripeProductId
              ? { product: product.stripeProductId }
              : {
                  product_data: {
                    name: product.name,
                    description: product.shortDesc,
                    metadata: {
                      sku: product.sku,
                    },
                  },
                }),
            unit_amount: Math.round(product.price * 100),
          },
          quantity,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/secure-gear/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/shop/${product.categorySlug}/${product.slug}`,
      metadata: {
        productId: product.id,
        sku: product.sku,
      },
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
