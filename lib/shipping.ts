// Shared shipping-country allowlist — imported by BOTH the client (PayPal popup
// rejection via onShippingAddressChange) and the server (capture-time guard in
// the capture route). Kept in its own module so the client bundle doesn't pull
// in the server-side PayPal client from lib/paypal.ts.
export const SUPPORTED_SHIPPING_COUNTRIES = ['US', 'CA', 'GB', 'AU'];
