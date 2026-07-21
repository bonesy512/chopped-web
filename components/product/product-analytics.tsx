'use client';

import { useEffect } from 'react';
import type { Product } from '@/lib/products';
import { trackViewItem } from '@/lib/analytics/ga';

// Render-only side-effect: fires GA4 `view_item` once per product view.
// Mounted from the (server) product detail page. Renders nothing.
export function ProductAnalytics({ product }: { product: Product }) {
  useEffect(() => {
    trackViewItem(product);
    // Re-fire only when the viewed product changes, not on unrelated re-renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  return null;
}
