// Central product data - all 9 VOL.01 products from choppedproducts.md

export type Product = {
  id: string;
  sku: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  price: number;
  description: string;
  shortDesc: string;
  features: string[];
  specs: { label: string; value: string }[];
  status: 'REDACTED' | 'ACTIVE';
  sizes: string[];
  image?: string;
  colors?: string[];
  // Per-colorway mockups (first entry = primary view). Falls back to `image`.
  colorImages?: Record<string, string[]>;
};

// Primary image for a product, colorway-aware.
export function getProductImage(product: Product, color?: string): string | undefined {
  if (color && product.colorImages?.[color]?.length) {
    return product.colorImages[color][0];
  }
  return product.image;
}

export const products: Product[] = [
  {
    id: 'chpd-out-002',
    sku: 'CHPD-OUT-002',
    name: 'The "Chopped" Heavyweight Hoodie',
    slug: 'chopped-heavyweight-hoodie',
    category: 'Outerwear',
    categorySlug: 'outerwear',
    // Live Printful POD: Cotton Heritage M2580 (catalog ID 380); sync variants
    // pending — status stays REDACTED until IDs replace the 0s in lib/printful.ts.
    // Blank is 13oz (~440GSM) premium fleece. DTG front+back. $33.24 cost (Black/M).
    price: 79.99,
    description: 'Premium 13oz fleece pullover. "SUPER CHOPPED" front and back. Structured boxy fit. Wear the armor.',
    shortDesc: 'Premium 13oz fleece. "SUPER CHOPPED" front + back DTG.',
    features: [
      '13oz Premium Heavyweight Fleece',
      'Structured Boxy Fit',
      'Silver-Grey Distressed DTG Print',
    ],
    specs: [
      { label: 'FABRIC', value: '13oz Premium Fleece' },
      { label: 'GRAPHIC', value: 'Silver-Grey DTG "SUPER CHOPPED"' },
      { label: 'FIT', value: 'Structured Boxy' },
      { label: 'COLORWAYS', value: 'Black' },
    ],
    status: 'REDACTED',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: ['Black'],
    image: '/images/products/chopped-heavyweight-hoodie/black/front.png',
    colorImages: {
      Black: [
        '/images/products/chopped-heavyweight-hoodie/black/front.png',
      ],
    },
  },

  {
    id: 'chpd-tsh-004',
    sku: 'CHPD-TSH-004',
    name: 'The "Anti" Graphic Tee',
    slug: 'anti-graphic-tee',
    category: 'Essentials',
    categorySlug: 'essentials',
    // Live Printful POD: Cotton Heritage MC1086 (catalog ID 508); sync variants
    // for Black + White S–4XL live in lib/printful.ts. Copy is POD-honest per
    // printful-product-mapping.md §5 — the blank is 6.5oz (~220GSM) and DTG has
    // no reflective ink, so no 300GSM / reflective claims. Retail $45 per
    // printful-pricing-breakdown.md (landed ~$34.23, ~24% margin).
    price: 45.00,
    description: 'Heavyweight combed cotton. "Anti Chopped Chopped Social Club" parody. Black or White chassis. Wear it without explanation.',
    shortDesc: 'Heavyweight cotton parody tee. Anti-uniform for the veteran.',
    features: [
      '6.5oz Heavyweight Combed Ring-Spun Cotton',
      'Pre-shrunk Veteran Fit',
      'Wavy Silver-Grey Back Print',
    ],
    specs: [
      { label: 'FABRIC', value: '6.5oz Combed Ring-Spun Cotton' },
      { label: 'FRONT', value: 'Left-Chest Pocket Stencil' },
      { label: 'BACK', value: 'Wavy Distorted Typography' },
      { label: 'COLORWAYS', value: 'Black / White' },
    ],
    status: 'ACTIVE',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'],
    colors: ['Black', 'White'],
    // Black = white print; White = black print (Printful mockups, 2000×2000)
    image: '/images/products/anti-graphic-tee/black/front.jpg',
    colorImages: {
      Black: [
        '/images/products/anti-graphic-tee/black/front.jpg',
        '/images/products/anti-graphic-tee/black/back.jpg',
        '/images/products/anti-graphic-tee/black/detail.jpg',
      ],
      White: [
        '/images/products/anti-graphic-tee/white/front.jpg',
        '/images/products/anti-graphic-tee/white/back.jpg',
        '/images/products/anti-graphic-tee/white/detail.jpg',
      ],
    },
  },
  {
    id: 'chpd-acc-005',
    sku: 'CHPD-ACC-005',
    name: 'The "Chopped" Distressed Logo Hat',
    slug: 'distressed-logo-hat',
    category: 'Essentials',
    categorySlug: 'essentials',
    // Live Printful POD: Otto Cap 104-1018 (catalog ID 396); sync variants
    // pending — status stays REDACTED until IDs replace the 0s in lib/printful.ts.
    // Pre-distressed construction. Embroidery front. $15.74 cost (Black/OS).
    price: 45.00,
    description: 'Pre-distressed 6-panel dad hat. Tonal black-on-black embroidery. Low profile. High authority.',
    shortDesc: 'Pre-distressed 6-panel. Tonal black embroidery.',
    features: [
      'Pre-distressed Construction',
      'Low-profile Deconstructed Fit',
      'Tonal Black-on-Black Embroidery',
    ],
    specs: [
      { label: 'COLOR', value: 'Washed Black' },
      { label: 'EMBROIDERY', value: 'Tonal Black "CHOPPED." Stencil' },
      { label: 'FIT', value: 'Adjustable Slide Closure' },
    ],
    status: 'REDACTED',
    sizes: ['OSFA'],
    colors: ['Black'],
    image: '/images/products/distressed-logo-hat/black/front.png',
    colorImages: {
      Black: [
        '/images/products/distressed-logo-hat/black/front.png',
      ],
    },
  },

  {
    id: 'chpd-acc-009',
    sku: 'CHPD-ACC-009',
    name: 'The "Night-Shift" Watch Cap',
    slug: 'night-shift-watch-cap',
    category: 'Accessories',
    categorySlug: 'accessories',
    // Live Printful POD: Yupoong 1501KC (catalog ID 266); sync variants
    // pending — status stays REDACTED until IDs replace the 0s in lib/printful.ts.
    // Classic cuffed beanie, 100% acrylic. Embroidery front. $12.79 cost (Black/OS).
    price: 40.00,
    description: 'Classic cuffed beanie. White "CHOPPED." embroidery on black. Heat retention for the god hour.',
    shortDesc: 'Cuffed beanie. White embroidery on black.',
    features: [
      'Ribbed Knit Construction',
      'Wind-resistant Cuffed Fold',
      'Contrast White Embroidery',
    ],
    specs: [
      { label: 'FABRIC', value: 'Ribbed Knit Acrylic' },
      { label: 'EMBROIDERY', value: 'White "CHOPPED." Stencil' },
      { label: 'FIT', value: 'Snug, above-ear profile' },
    ],
    status: 'REDACTED',
    sizes: ['OSFA'],
    colors: ['Black'],
    image: '/images/products/night-shift-watch-cap/black/front.png',
    colorImages: {
      Black: [
        '/images/products/night-shift-watch-cap/black/front.png',
      ],
    },
  },
  {
    id: 'chpd-stk-001',
    sku: 'CHPD-STK-001',
    name: 'CHOPPED. Guerrilla Sticker Pack',
    slug: 'chopped-sticker-pack',
    category: 'Essentials',
    categorySlug: 'essentials',
    price: 5.00,
    description: '3″×3″ kiss-cut vinyl sticker. High-durability waterproof coating. Stencil logo for Austin guerrilla placement.',
    shortDesc: '3″×3″ kiss-cut vinyl sticker. Weatherproof stencil logo.',
    features: [
      '3″×3″ Kiss-Cut Heavyweight Vinyl',
      'UV & Water Resistant Coating',
      'Matte Finish Stencil Print',
    ],
    specs: [
      { label: 'MATERIAL', value: '3″×3″ Kiss-Cut Vinyl' },
      { label: 'FINISH', value: 'Weatherproof Matte' },
      { label: 'CATALOG_ID', value: 'Printful 358' },
    ],
    status: 'REDACTED',
    sizes: ['3X3'],
    colors: ['Black'],
    image: '/images/chopped_art.jpg',
  },
  {
    id: 'chpd-mug-001',
    sku: 'CHPD-MUG-001',
    name: 'The "God Hour" Black Mug',
    slug: 'the-god-hour-mug',
    category: 'Essentials',
    categorySlug: 'essentials',
    price: 22.00,
    description: '11oz glossy black ceramic mug. White stencil CHOPPED. logo. 02:00 AM coffee ritual companion.',
    shortDesc: '11oz glossy black ceramic mug. 02:00 AM coffee ritual.',
    features: [
      '11oz Solid Black Ceramic',
      'High-Contrast White Stencil Print',
      'Dishwasher & Microwave Safe',
    ],
    specs: [
      { label: 'VOLUME', value: '11 oz' },
      { label: 'MATERIAL', value: 'Black Glossy Ceramic' },
      { label: 'CATALOG_ID', value: 'Printful 300' },
    ],
    status: 'REDACTED',
    sizes: ['11OZ'],
    colors: ['Black'],
    image: '/images/chopped_art.jpg',
  },
  {
    id: 'chpd-pat-001',
    sku: 'CHPD-PAT-001',
    name: 'The "Black Tape" Embroidered Patch',
    slug: 'black-tape-patch',
    category: 'Essentials',
    categorySlug: 'essentials',
    price: 14.00,
    description: '3″ circular embroidered patch. Tonal black-on-black CHOPPED. emblem. Industrial DIY utility add-on.',
    shortDesc: '3″ circular embroidered patch. Black-on-black emblem.',
    features: [
      '3″ Circular Heavy Stitching',
      'Tonal Black Thread Finish',
      'Iron-On / Sew-On Backing',
    ],
    specs: [
      { label: 'DIMENSIONS', value: '3″ Circle' },
      { label: 'THREAD', value: 'Tonal Black (#000000)' },
      { label: 'CATALOG_ID', value: 'Printful 516' },
    ],
    status: 'REDACTED',
    sizes: ['3INCH'],
    colors: ['Black'],
    image: '/images/chopped_art.jpg',
  },
  {
    id: 'chpd-tsh-005',
    sku: 'CHPD-TSH-005',
    name: 'The "Night-Shift" Long Sleeve',
    slug: 'night-shift-long-sleeve',
    category: 'Essentials',
    categorySlug: 'essentials',
    price: 50.00,
    description: 'Heavyweight long sleeve shirt (Gildan 2400). "STILL UP." back graphic + chest stencil. Layering piece for nocturnal ops.',
    shortDesc: 'Heavyweight long sleeve. "STILL UP." back graphic.',
    features: [
      'Heavyweight 6.0oz Cotton',
      'Ribbed Cuffs & Collar',
      'DTG Front Stencil + Back Graphic',
    ],
    specs: [
      { label: 'FABRIC', value: '6.0oz 100% Cotton' },
      { label: 'GRAPHIC', value: '"STILL UP." Back Graphic' },
      { label: 'CATALOG_ID', value: 'Printful 57' },
    ],
    status: 'REDACTED',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: ['Black'],
    image: '/images/chopped_art.jpg',
  },
  {
    id: 'chpd-out-004',
    sku: 'CHPD-OUT-004',
    name: 'The "Foreman" Crewneck',
    slug: 'foreman-crewneck',
    category: 'Outerwear',
    categorySlug: 'outerwear',
    price: 55.00,
    description: 'Classic fleece crewneck (Gildan 18000). Clean industrial silhouette with chest stencil. Mid-weight garage layer.',
    shortDesc: 'Classic fleece crewneck. Chest stencil graphic.',
    features: [
      '8.0oz 50/50 Cotton Poly Blend',
      'Double-Needle Stitching',
      'DTG Chest Stencil',
    ],
    specs: [
      { label: 'FABRIC', value: '8.0oz Fleece' },
      { label: 'FIT', value: 'Classic Unsex' },
      { label: 'CATALOG_ID', value: 'Printful 145' },
    ],
    status: 'REDACTED',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: ['Black'],
    image: '/images/chopped_art.jpg',
  },
  {
    id: 'chpd-bag-001',
    sku: 'CHPD-BAG-001',
    name: 'The "Haul" Tactical Tote',
    slug: 'the-haul-tote',
    category: 'Accessories',
    categorySlug: 'accessories',
    price: 30.00,
    description: '15″×15″ all-over print tote bag. Heavy-duty polyester fabric with industrial CHOPPED. stencil layout.',
    shortDesc: '15″×15″ heavy tote bag. Industrial stencil print.',
    features: [
      '100% Medium-Weight Polyester',
      'Dual Handles & Boxed Corners',
      'High-Durability AOP Print',
    ],
    specs: [
      { label: 'DIMENSIONS', value: '15″ × 15″' },
      { label: 'CAPACITY', value: '2.6 US gal (10l)' },
      { label: 'CATALOG_ID', value: 'Printful 84' },
    ],
    status: 'REDACTED',
    sizes: ['OSFA'],
    colors: ['Black'],
    image: '/images/chopped_art.jpg',
  },
  {
    id: 'chpd-btl-001',
    sku: 'CHPD-BTL-001',
    name: 'The "Hydration Kit" Bottle',
    slug: 'hydration-kit-bottle',
    category: 'Accessories',
    categorySlug: 'accessories',
    price: 34.00,
    description: '17oz stainless steel water bottle. Matte black finish with white CHOPPED. stencil logo. Industrial EDC carry.',
    shortDesc: '17oz matte black steel water bottle. Industrial EDC carry.',
    features: [
      '17oz Double-Wall Stainless Steel',
      'Vacuum Insulated for Hot/Cold',
      'Leak-Proof Screw Cap',
    ],
    specs: [
      { label: 'VOLUME', value: '17 oz (500 ml)' },
      { label: 'MATERIAL', value: 'Stainless Steel' },
      { label: 'CATALOG_ID', value: 'Printful 382' },
    ],
    status: 'REDACTED',
    sizes: ['17OZ'],
    colors: ['Black'],
    image: '/images/chopped_art.jpg',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.categorySlug === categorySlug);
}
