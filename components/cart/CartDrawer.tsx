'use client';

import { useCart } from './CartContext';
import { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { SUPPORTED_SHIPPING_COUNTRIES } from '@/lib/shipping';
import { getProductImage } from '@/lib/products';

// 'test' is PayPal's sandbox-demo client id — keeps local dev working before env setup.
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test';

export function CartDrawer() {
  const {
    cartItems,
    isOpen,
    toggleCart,
    setIsOpen,
    updateQuantity,
    removeItem,
    clearCart,
    cartSubtotal,
  } = useCart();

  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Cart payload sent to the server, which re-derives all prices + shipping.
  const cartPayload = () =>
    cartItems.map((item) => ({
      productId: item.product.id,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
    }));

  // Server derives all prices + provisional shipping from lib/products.ts.
  const createOrder = async (): Promise<string> => {
    setError(null);
    const res = await fetch('/api/paypal/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cartPayload() }),
    });
    const data = await res.json();
    if (!res.ok || !data.id) {
      setError('SYSTEM_FRICTION_DETECTED. RE-TRANSMIT.');
      throw new Error(data.error || 'ORDER_CREATE_FAILED');
    }
    return data.id;
  };

  // Buyer picked/changed their address in the popup: reject unsupported regions,
  // otherwise patch real Printful shipping for that destination so PayPal shows
  // the correct total before approval. Server is the pricing authority.
  const onShippingAddressChange = async (
    data: { orderID?: string; shippingAddress?: { countryCode?: string } },
    actions: { reject: () => Promise<void> }
  ) => {
    const country = data.shippingAddress?.countryCode;
    if (!country || !SUPPORTED_SHIPPING_COUNTRIES.includes(country)) {
      return actions.reject();
    }
    const res = await fetch(`/api/paypal/orders/${data.orderID}/shipping`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cartPayload(), countryCode: country }),
    });
    if (!res.ok) {
      // Patch failed — refuse the address rather than charge a wrong total.
      return actions.reject();
    }
  };

  const onApprove = async (
    data: { orderID: string },
    actions: { restart: () => void }
  ) => {
    const res = await fetch(`/api/paypal/orders/${data.orderID}/capture`, {
      method: 'POST',
    });
    const details = await res.json();

    // Buyer's funding source failed — PayPal standard recovery: restart the flow.
    if (details.error === 'INSTRUMENT_DECLINED') {
      actions.restart();
      return;
    }
    if (details.error === 'REGION_NOT_SUPPORTED') {
      setError('REGION_NOT_SUPPORTED. TRANSMIT FOR MANUAL PROTOCOL.');
      return;
    }
    if (!res.ok || details.status !== 'COMPLETED') {
      setError('SYSTEM_FRICTION_DETECTED. RE-TRANSMIT.');
      return;
    }

    // Success only: clear the kit, route to confirmation.
    clearCart();
    window.location.href = '/secure-gear/success';
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end font-mono">
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md h-full bg-[#080808] border-l border-border shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Grain overlay for aesthetic continuity */}
        <div className="grain-overlay pointer-events-none" />

        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between bg-black relative z-10">
          <div>
            <span className="text-[#FF0000] text-[10px] tracking-widest block mb-1">
              ▮ CART // SYSTEM ACTIVE
            </span>
            <h2 className="text-sm font-bold text-white tracking-widest">
              YOUR CHASSIS
            </h2>
          </div>
          <button
            onClick={toggleCart}
            className="text-xs text-muted-foreground hover:text-white border border-border px-3 py-1.5 hover:border-white transition-colors duration-0"
          >
            [X] CLOSE
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <span className="text-muted-foreground text-xs uppercase tracking-widest mb-4">
                CHASSIS_EMPTY
              </span>
              <p className="text-xs text-muted-foreground max-w-[200px] leading-relaxed">
                Scan the catalog to secure gear.
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-6 border border-white text-white bg-black hover:bg-white hover:text-black text-[10px] tracking-widest uppercase px-4 py-2 transition-colors duration-0"
              >
                BROWSE_GEAR
              </button>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={`${item.product.id}-${item.color}-${item.size}-${index}`}
                className="flex gap-4 border border-border p-3 bg-black relative group"
              >
                {/* Thumbnail — colorway-aware */}
                <div className="w-20 h-20 bg-[#111] border border-border flex-shrink-0 relative overflow-hidden">
                  {getProductImage(item.product, item.color) && (
                    <img
                      src={getProductImage(item.product, item.color)}
                      alt={`${item.product.name}${item.color ? ` — ${item.color}` : ''}`}
                      className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-tight line-clamp-1">
                      {item.product.name}
                    </h3>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">
                      {item.product.sku}
                    </p>
                    <p className="text-[9px] text-[#FF0000] uppercase tracking-widest mt-1">
                      {[item.color, item.size].filter(Boolean).join(' / ')}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-border bg-black">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.color,
                            item.quantity - 1
                          )
                        }
                        className="px-2 py-1 text-muted-foreground hover:text-white transition-colors text-[10px]"
                      >
                        -
                      </button>
                      <span className="px-2 py-1 text-[10px] text-white select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.color,
                            item.quantity + 1
                          )
                        }
                        className="px-2 py-1 text-muted-foreground hover:text-white transition-colors text-[10px]"
                      >
                        +
                      </button>
                    </div>

                    {/* Price and remove */}
                    <div className="text-right">
                      <p className="text-xs font-bold text-white">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() =>
                          removeItem(item.product.id, item.size, item.color)
                        }
                        className="text-[9px] text-muted-foreground hover:text-[#FF0000] underline mt-1 block"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer (Subtotal & Checkout) */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-border bg-black relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-muted-foreground tracking-widest uppercase">
                SUBTOTAL
              </span>
              <span className="text-sm font-bold text-white">
                ${cartSubtotal.toFixed(2)}
              </span>
            </div>

            <p className="text-[9px] text-muted-foreground mb-4 leading-relaxed">
              + SHIPPING, SET BY DESTINATION AT CHECKOUT. US / CA / GB / AU. ALL SALES FINAL.
            </p>

            {/* PayPal buttons (includes card guest checkout). Script loads lazily
                on first drawer open; provider dedupes across re-opens. */}
            <PayPalScriptProvider
              options={{ clientId: PAYPAL_CLIENT_ID, currency: 'USD', intent: 'capture' }}
            >
              <PayPalButtons
                style={{ layout: 'vertical', color: 'black', shape: 'rect', label: 'paypal', height: 48 }}
                createOrder={createOrder}
                onApprove={onApprove}
                onShippingAddressChange={onShippingAddressChange}
                onError={() => setError('SYSTEM_FRICTION_DETECTED. RE-TRANSMIT.')}
                onCancel={() => setError(null)}
              />
            </PayPalScriptProvider>

            {error && (
              <p className="text-[10px] text-[#FF0000] mt-2 text-center">
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
