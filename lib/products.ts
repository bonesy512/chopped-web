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
    description: 'Industrial-grade 13oz heavyweight fleece armor engineered for 12-hour concrete shifts and nocturnal garage ops. Features structured boxy stance retention, dual-layer hood warmth, and high-density "SUPER CHOPPED" silver-grey DTG graphics built to survive years of wear.',
    shortDesc: '13oz Heavyweight Fleece Armor. Structured boxy stance retention.',
    features: [
      '13oz Premium Heavyweight Fleece (Cotton Heritage M2580)',
      'Structured Boxy Ergonomic Silhouette (Zero Sag)',
      'High-Density Silver-Grey DTG Graphics (Front + Back)',
      '100-Wash Stance Guarantee (No Shrink, No Bacon Collar)',
    ],
    specs: [
      { label: 'FABRIC CHASSIS', value: '13oz Premium Heavyweight Fleece' },
      { label: 'GRAPHIC PRINT', value: 'High-Density Silver-Grey DTG' },
      { label: 'FIT PROFILE', value: 'Structured Boxy Ergonomic' },
      { label: 'COLORWAYS', value: 'Dead-Night Black' },
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
    description: 'Heavyweight 6.5oz combed ring-spun cotton chassis engineered for 38+ veterans who refuse to wear paper-thin teenager hype tees. Features left-chest pocket stencil and wavy "Anti Chopped Chopped Social Club" back graphic. Built to maintain its sharp stance through 100+ wash cycles.',
    shortDesc: '6.5oz Combed Cotton Chassis. Anti-hype uniform for veterans.',
    features: [
      '6.5oz Heavyweight Combed Ring-Spun Cotton (MC1086)',
      'Pre-Shrunk Veteran Fit (Zero Torso Shrinkage)',
      'Dual DTG Placements (Left-Chest Stencil + Wavy Back Print)',
      'Anti-Bacon Collar Reinforced Ribbing',
    ],
    specs: [
      { label: 'FABRIC CHASSIS', value: '6.5oz 100% Combed Ring-Spun Cotton' },
      { label: 'FRONT PRINT', value: 'Left-Chest Industrial Stencil' },
      { label: 'BACK PRINT', value: 'Wavy Parody Typography' },
      { label: 'COLORWAYS', value: 'Dead-Night Black / Pure White' },
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
    id: 'chpd-out-005',
    sku: 'CHPD-OUT-005',
    name: 'The "Anti" Social Club Hoodie',
    slug: 'anti-social-club-hoodie',
    category: 'Outerwear',
    categorySlug: 'outerwear',
    // Live Printful POD: Cotton Heritage M2580 (catalog ID 380); sync variants
    // live in lib/printful.ts for Black S–3XL. 13oz Cotton Heritage M2580
    // premium fleece — heaviest blank Printful produces. DTG left-chest stencil
    // + wavy "Anti Chopped Chopped Social Club" back graphic, white ink on black.
    price: 60.00,
    description: 'The tee started the club. The hoodie makes it official. Features the same wavy "Anti Chopped Chopped Social Club" back graphic and left-chest stencil — white ink on black — built onto 13oz premium fleece, the heaviest hoodie blank Printful produces. Built for the cold end of the shift.',
    shortDesc: '13oz Cotton Heritage M2580 premium fleece. Same club, heavier armor.',
    features: [
      '13oz Premium Heavyweight Fleece (Cotton Heritage M2580)',
      'Dual DTG Placements (Left-Chest Stencil + Wavy Back Print)',
      '3-Panel Hood with Matching Flat Drawstrings',
      '100-Wash Stance Guarantee (Pre-Shrunk Unisex Fit)',
    ],
    specs: [
      { label: 'FABRIC CHASSIS', value: '13oz 65/35 Cotton-Poly Fleece (100% Cotton Face)' },
      { label: 'FRONT PRINT', value: 'Left-Chest Industrial Stencil (White Ink)' },
      { label: 'BACK PRINT', value: 'Wavy "Anti Chopped Chopped Social Club"' },
      { label: 'COLORWAYS', value: 'Dead-Night Black' },
    ],
    status: 'ACTIVE',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: ['Black'],
    image: '/images/products/anti-heavyweight-hoodie/black/front.png',
    colorImages: {
      Black: [
        '/images/products/anti-heavyweight-hoodie/black/front.png',
        '/images/products/anti-heavyweight-hoodie/black/back.png',
        '/images/products/anti-heavyweight-hoodie/black/detail.png',
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
    // Live Printful POD: Otto Cap 104-1018 (catalog ID 396); sync variant
    // live in lib/printful.ts (ID 5404771405). Pre-distressed construction,
    // white high-density embroidery. $15.74 Printful cost, $45.00 retail.
    price: 45.00,
    description: 'Hand-abraded low-profile dad hat chassis engineered for 38+ veterans who refuse pristine hypewear. Features pre-distressed brim wear and high-density "CHOPPED." front embroidery built to maintain stance through years of concrete shift wear.',
    shortDesc: 'Pre-distressed washed cotton chassis. High-density white front embroidery.',
    features: [
      'Pre-Distressed Washed Cotton Chassis (Otto Cap 104-1018)',
      'High-Density White Front Embroidery',
      '6-Panel Low-Profile Unstructured Crown',
      'Adjustable Fabric Strap with Tri-Glide Buckle',
    ],
    specs: [
      { label: 'FABRIC CHASSIS', value: '100% Pre-Distressed Washed Cotton' },
      { label: 'FRONT EMBROIDERY', value: 'High-Density White Stitching' },
      { label: 'PROFILE / FIT', value: '6-Panel Low-Profile Unstructured' },
      { label: 'CLOSURE', value: 'Matching Fabric Strap with Metal Buckle' },
    ],
    status: 'ACTIVE',
    sizes: ['OSFA'],
    colors: ['Black'],
    image: '/images/products/distressed-logo-hat/black/front.png',
    colorImages: {
      Black: [
        '/images/products/distressed-logo-hat/black/front.png',
        '/images/products/distressed-logo-hat/black/back.png',
        '/images/products/distressed-logo-hat/black/side.png',
        '/images/products/distressed-logo-hat/black/detail.png',
      ],
    },
  },

  {
    id: 'chpd-acc-009',
    sku: 'CHPD-ACC-009',
    name: 'The "Night-Shift" Watch Cap',
    slug: 'night-shift-watch-cap',
    category: 'Essentials',
    categorySlug: 'essentials',
    // Live Printful POD: Yupoong 1501KC (catalog ID 266); sync variant
    // live in lib/printful.ts (ID 5404798547). Classic 12" cuffed beanie,
    // white high-density embroidery. $12.79 Printful cost, $35.00 retail.
    price: 35.00,
    description: 'Heavyweight ribbed knit cuffed beanie with high-contrast white "CHOPPED." stencil embroidery. Built for warmth during 02:00 AM garage shifts and cold night runs.',
    shortDesc: 'Ribbed knit watch cap. High-contrast white embroidery.',
    features: [
      'Heavy Ribbed Knit Insulation (Yupoong 1501KC)',
      'Wind-Resistant Double-Cuffed Fold',
      'Contrast White High-Density Stitching',
    ],
    specs: [
      { label: 'FABRIC CHASSIS', value: '100% Insulated Ribbed Acrylic' },
      { label: 'EMBROIDERY', value: 'White "CHOPPED." Stencil' },
      { label: 'FIT PROFILE', value: 'Snug Above-Ear Watch Cap' },
    ],
    status: 'ACTIVE',
    sizes: ['OSFA'],
    colors: ['Black'],
    image: '/images/products/night-shift-watch-cap/black/front.png',
    colorImages: {
      Black: [
        '/images/products/night-shift-watch-cap/black/front.png',
        '/images/products/night-shift-watch-cap/black/detail.png',
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
    description: '3″×3″ kiss-cut industrial vinyl sticker pack. Engineered with weatherproof UV coating for outdoor equipment, toolboxes, and urban stencil placement.',
    shortDesc: '3″×3″ kiss-cut vinyl stickers. Weatherproof UV coating.',
    features: [
      '3″×3″ Heavyweight Kiss-Cut Vinyl',
      'UV & Water-Resistant Industrial Shield',
      'Matte Finish Non-Glare Stencil Graphic',
    ],
    specs: [
      { label: 'MATERIAL', value: '3″×3″ Industrial Vinyl' },
      { label: 'COATING', value: 'Weatherproof UV Matte Shield' },
      { label: 'CATALOG_ID', value: 'Printful 358' },
    ],
    status: 'REDACTED',
    sizes: ['3X3'],
    colors: ['Black'],
    image: '/images/choppedgraffiti.jpg',
  },
  {
    id: 'chpd-mug-001',
    sku: 'CHPD-MUG-001',
    name: 'The "God Hour" Black Mug',
    slug: 'the-god-hour-mug',
    category: 'Essentials',
    categorySlug: 'essentials',
    price: 22.00,
    description: '11oz solid black ceramic mug featuring contrast white CHOPPED. stencil typography. Purpose-built for the 02:00 AM coffee ritual.',
    shortDesc: '11oz solid black ceramic mug. 02:00 AM coffee ritual.',
    features: [
      '11oz Solid Black Ceramic Hardware',
      'High-Contrast White Industrial Stencil',
      '100% Dishwasher & Microwave Proof',
    ],
    specs: [
      { label: 'VOLUME', value: '11 oz (325 ml)' },
      { label: 'MATERIAL', value: 'Solid Black Glossy Ceramic' },
      { label: 'CATALOG_ID', value: 'Printful 300' },
    ],
    status: 'REDACTED',
    sizes: ['11OZ'],
    colors: ['Black'],
    image: '/images/choppedgraffiti.jpg',
  },
  {
    id: 'chpd-pat-001',
    sku: 'CHPD-PAT-001',
    name: 'The "Black Tape" Embroidered Patch',
    slug: 'black-tape-patch',
    category: 'Essentials',
    categorySlug: 'essentials',
    price: 14.00,
    description: '3″ circular heavy embroidered patch with tonal black-on-black CHOPPED. emblem. Designed for jacket sleeves, tool bags, and workwear customization.',
    shortDesc: '3″ circular embroidered patch. Black-on-black emblem.',
    features: [
      '3″ Circular High-Density Stitching',
      'Tonal Black Thread Finish (#000000)',
      'Dual Iron-On / Sew-On Backing',
    ],
    specs: [
      { label: 'DIMENSIONS', value: '3″ Circle' },
      { label: 'THREAD', value: 'Tonal Dead-Night Black' },
      { label: 'CATALOG_ID', value: 'Printful 516' },
    ],
    status: 'REDACTED',
    sizes: ['3INCH'],
    colors: ['Black'],
    image: '/images/choppedgraffiti.jpg',
  },
  {
    id: 'chpd-tsh-005',
    sku: 'CHPD-TSH-005',
    name: 'The "Night-Shift" Long Sleeve',
    slug: 'night-shift-long-sleeve',
    category: 'Essentials',
    categorySlug: 'essentials',
    price: 50.00,
    description: 'Heavyweight 6.0oz long sleeve shirt featuring "STILL UP." back typography and left-chest stencil. Heavy ribbed cuffs for nocturnal shop layering.',
    shortDesc: '6.0oz Heavyweight long sleeve. "STILL UP." back typography.',
    features: [
      'Heavyweight 6.0oz 100% Cotton Chassis',
      'Heavy Ribbed Cuffs & Reinforced Collar',
      'Dual DTG Stencil + Back Typographic Print',
    ],
    specs: [
      { label: 'FABRIC CHASSIS', value: '6.0oz Heavyweight Cotton' },
      { label: 'GRAPHICS', value: '"STILL UP." Back + Chest Stencil' },
      { label: 'CATALOG_ID', value: 'Printful 57' },
    ],
    status: 'REDACTED',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: ['Black'],
    image: '/images/choppedgraffiti.jpg',
  },
  {
    id: 'chpd-out-004',
    sku: 'CHPD-OUT-004',
    name: 'The "Foreman" Crewneck',
    slug: 'foreman-crewneck',
    category: 'Outerwear',
    categorySlug: 'outerwear',
    price: 55.00,
    description: 'Industrial 8.0oz fleece crewneck featuring clean chest stencil print and double-needle stitching throughout. Built as a mid-weight layer for active shop work.',
    shortDesc: '8.0oz fleece crewneck. Clean chest stencil graphic.',
    features: [
      '8.0oz Durable Fleece Blend',
      'Double-Needle Reinforced Stitching',
      'Left-Chest Industrial Stencil Print',
    ],
    specs: [
      { label: 'FABRIC CHASSIS', value: '8.0oz Fleece Blend' },
      { label: 'FIT PROFILE', value: 'Classic Structured Unisex' },
      { label: 'CATALOG_ID', value: 'Printful 145' },
    ],
    status: 'REDACTED',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: ['Black'],
    image: '/images/choppedgraffiti.jpg',
  },
  {
    id: 'chpd-bag-001',
    sku: 'CHPD-BAG-001',
    name: 'The "Haul" Tactical Tote',
    slug: 'the-haul-tote',
    category: 'Accessories',
    categorySlug: 'accessories',
    price: 30.00,
    description: '15″×15″ heavy-duty tactical tote bag constructed from medium-weight polyester with boxed corners and industrial stencil graphic layout.',
    shortDesc: '15″×15″ heavy tote bag. Industrial stencil print.',
    features: [
      '100% Industrial Medium-Weight Polyester',
      'Dual Reinforced Handles & Boxed Corners',
      'High-Durability Stencil Layout Print',
    ],
    specs: [
      { label: 'DIMENSIONS', value: '15″ × 15″' },
      { label: 'CAPACITY', value: '2.6 US gal (10 Liters)' },
      { label: 'CATALOG_ID', value: 'Printful 84' },
    ],
    status: 'REDACTED',
    sizes: ['OSFA'],
    colors: ['Black'],
    image: '/images/choppedgraffiti.jpg',
  },
  {
    id: 'chpd-btl-001',
    sku: 'CHPD-BTL-001',
    name: 'The "Hydration Kit" Bottle',
    slug: 'hydration-kit-bottle',
    category: 'Accessories',
    categorySlug: 'accessories',
    price: 34.00,
    description: '17oz double-wall vacuum insulated stainless steel water bottle in matte black with white CHOPPED. stencil logo. Keeps liquids cold for 24h or hot for 12h.',
    shortDesc: '17oz matte black steel water bottle. Insulated EDC carry.',
    features: [
      '17oz Double-Wall Stainless Steel',
      'Vacuum Insulated (24h Cold / 12h Hot)',
      'Matte Black Finish with Stencil Print',
    ],
    specs: [
      { label: 'VOLUME', value: '17 oz (500 ml)' },
      { label: 'MATERIAL', value: 'Double-Wall Stainless Steel' },
      { label: 'CATALOG_ID', value: 'Printful 382' },
    ],
    status: 'REDACTED',
    sizes: ['17OZ'],
    colors: ['Black'],
    image: '/images/choppedgraffiti.jpg',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.categorySlug === categorySlug);
}
