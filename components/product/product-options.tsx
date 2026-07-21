'use client';

import { createContext, useContext, useState } from 'react';

// Shares the selected colorway between the PDP gallery (image swap) and the
// AcquireButton (cart payload). Optional by design: AcquireButton also renders
// standalone on /secure-gear where no provider exists — it falls back to
// internal state there.
type ProductOptionsValue = {
  color: string | null;
  setColor: (color: string) => void;
};

const ProductOptionsContext = createContext<ProductOptionsValue | null>(null);

export function ProductOptionsProvider({
  initialColor,
  children,
}: {
  initialColor?: string | null;
  children: React.ReactNode;
}) {
  const [color, setColor] = useState<string | null>(initialColor ?? null);
  return (
    <ProductOptionsContext.Provider value={{ color, setColor }}>
      {children}
    </ProductOptionsContext.Provider>
  );
}

// Returns null outside a provider (deliberate — see note above).
export function useProductOptions(): ProductOptionsValue | null {
  return useContext(ProductOptionsContext);
}
