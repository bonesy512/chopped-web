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
    id: 'chpd-fnd-001',
    sku: 'CHPD-FND-001',
    name: 'F#&K CANCER',
    slug: 'fck-cancer',
    category: 'Essentials',
    categorySlug: 'essentials',
    // FUNDRAISER — 100% of profits donated to Andy's cancer fight.
    // Live Printful POD: Stanley/Stella SATU020 "Blaster 2.0" oversized organic
    // cotton tee (sync product 449249937); Black S–2XL sync variants in
    // lib/printful.ts. Retail $50; Printful landed ~$21.10–$23.10.
    price: 50.00,
    description: "A fundraiser drop. 100% of profits from every F#&K CANCER tee go directly to Andy to support his fight against cancer. Printed on a premium Stanley/Stella \"Blaster 2.0\" heavyweight organic cotton oversized tee with a ribbed high-neck collar and a chopper-and-roses front graphic. Wear it loud. Stand with Andy.",
    shortDesc: "Fundraiser tee — 100% of profits to Andy's cancer fight.",
    features: [
      "100% of Profits Donated to Andy's Cancer Fight",
      'Stanley/Stella SATU020 "Blaster 2.0" Heavyweight Organic Cotton',
      'Unisex Oversized Boxy Fit + Ribbed High-Neck Collar',
      'High-Density Chopper-and-Roses DTG Front Graphic',
    ],
    specs: [
      { label: 'CAUSE', value: "100% Profits → Andy's Cancer Fight" },
      { label: 'FABRIC CHASSIS', value: 'Stanley/Stella Blaster 2.0 Organic Cotton' },
      { label: 'FIT PROFILE', value: 'Unisex Oversized / Ribbed High-Neck' },
      { label: 'COLORWAYS', value: 'Dead-Night Black' },
    ],
    status: 'ACTIVE',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Black'],
    image: '/images/products/fck-cancer/black/front.png',
    colorImages: {
      Black: [
        '/images/products/fck-cancer/black/front.png',
        '/images/products/fck-cancer/black/folded.png',
      ],
    },
  },
  {
    id: 'chpd-fnd-002',
    sku: 'CHPD-FND-002',
    name: 'F&#K CANCER Tank Top',
    slug: 'fck-cancer-tank',
    category: 'Essentials',
    categorySlug: 'essentials',
    // FUNDRAISER — 100% of profits donated to Andy's cancer fight.
    // Live Printful POD: Cotton Heritage MC1790 Men's Premium Tank Top
    // (sync product 449265307). Only Black / L is synced so far. Retail $40;
    // Printful landed ~$16.29.
    price: 40.00,
    description: "A fundraiser drop. 100% of profits from every F&#K CANCER tank go directly to Andy to support his fight against cancer. Printed on a Cotton Heritage MC1790 men's premium tank top with a left-chest chopper-and-roses graphic. Stand with Andy.",
    shortDesc: "Fundraiser tank — 100% of profits to Andy's cancer fight.",
    features: [
      "100% of Profits Donated to Andy's Cancer Fight",
      "Cotton Heritage MC1790 Men's Premium Tank Top",
      'Left-Chest Chopper-and-Roses DTG Graphic',
    ],
    specs: [
      { label: 'CAUSE', value: "100% Profits → Andy's Cancer Fight" },
      { label: 'FABRIC CHASSIS', value: 'Cotton Heritage MC1790 Premium Cotton' },
      { label: 'FIT PROFILE', value: "Men's Premium Tank" },
      { label: 'COLORWAYS', value: 'Dead-Night Black' },
    ],
    status: 'ACTIVE',
    sizes: ['L'],
    colors: ['Black'],
    image: '/images/products/fck-cancer-tank/black/front.png',
    colorImages: {
      Black: [
        '/images/products/fck-cancer-tank/black/front.png',
        '/images/products/fck-cancer-tank/black/hangar.png',
      ],
    },
  },
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
        '/images/products/night-shift-watch-cap/black/model1.png',
        '/images/products/night-shift-watch-cap/black/model2.png',
      ],
    },
  },
  {
    id: 'chpd-stk-001',
    sku: 'CHPD-STK-001',
    name: 'The "Guerrilla" Sticker Pack (3-Pack)',
    slug: 'chopped-sticker-pack',
    category: 'Accessories',
    categorySlug: 'accessories',
    price: 12.00,
    description: 'Heavyweight vinyl sticker 3-pack engineered with weatherproof UV coating for outdoor equipment, toolboxes, and urban stencil placement.',
    shortDesc: '3-Pack 3″×3″ kiss-cut vinyl stickers. Weatherproof UV coating.',
    features: [
      '3-Pack 3″×3″ Heavyweight Kiss-Cut Vinyl',
      'UV & Water-Resistant Industrial Shield',
      'Matte Finish Non-Glare Stencil Graphic',
    ],
    specs: [
      { label: 'PACK SIZE', value: '3 Unique Vinyl Stickers' },
      { label: 'COATING', value: 'Weatherproof UV Matte Shield' },
      { label: 'CATALOG_ID', value: 'Printful 358' },
    ],
    status: 'REDACTED',
    sizes: ['3X3'],
    colors: ['Black'],
    image: '/images/products/chopped-sticker-pack/black/front.jpg',
    colorImages: {
      Black: [
        '/images/products/chopped-sticker-pack/black/front.jpg',
      ],
    },
  },
  {
    id: 'chpd-mug-001',
    sku: 'CHPD-MUG-001',
    name: "It's 2AM Coffee Mug",
    slug: 'the-god-hour-mug',
    category: 'Accessories',
    categorySlug: 'accessories',
    price: 30.00,
    description: 'Solid black glossy ceramic mug with high-contrast white CHOPPED. stencil hardware. Built for the 02:00 AM coffee ritual — dishwasher and microwave proof. Available in 11oz and 15oz.',
    shortDesc: 'Black glossy ceramic mug. 02:00 AM coffee ritual. 11oz & 15oz.',
    features: [
      'Solid Black Glossy Ceramic Hardware',
      'High-Contrast White CHOPPED. Stencil',
      '100% Dishwasher & Microwave Proof',
    ],
    specs: [
      { label: 'VOLUME', value: '11 oz / 15 oz' },
      { label: 'MATERIAL', value: 'Solid Black Glossy Ceramic' },
      { label: 'CATALOG_ID', value: 'Printful 300' },
    ],
    status: 'ACTIVE',
    sizes: ['11OZ', '15OZ'],
    colors: ['Black'],
    image: '/images/products/the-god-hour-mug/black/front.jpg',
    colorImages: {
      Black: [
        '/images/products/the-god-hour-mug/black/front.jpg',
      ],
    },
  },
  {
    id: 'chpd-pat-001',
    sku: 'CHPD-PAT-001',
    name: 'The "Black Tape" Patch Set (2-Pack)',
    slug: 'black-tape-patch',
    category: 'Accessories',
    categorySlug: 'accessories',
    price: 18.00,
    description: '2-pack 3″ circular embroidered patch set with tonal black-on-black and industrial red status blocks. Designed for jacket sleeves, tool bags, and workwear customization.',
    shortDesc: '2-Pack 3″ circular embroidered patches.',
    features: [
      '2-Pack 3″ Circular High-Density Stitching',
      'Tonal Black Thread + Hazard Red Accents',
      'Dual Iron-On / Sew-On Backing',
    ],
    specs: [
      { label: 'PACK SIZE', value: '2 Embroidered Patches' },
      { label: 'THREAD', value: 'Tonal Black & Industrial Red' },
      { label: 'CATALOG_ID', value: 'Printful 516' },
    ],
    status: 'REDACTED',
    sizes: ['3INCH'],
    colors: ['Black'],
    image: '/images/products/black-tape-patch/black/front.jpg',
    colorImages: {
      Black: [
        '/images/products/black-tape-patch/black/front.jpg',
      ],
    },
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
    name: 'The "Hydration Kit" Steel Bottle (17oz)',
    slug: 'hydration-kit-bottle',
    category: 'Accessories',
    categorySlug: 'accessories',
    price: 28.00,
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
    image: '/images/products/hydration-kit-bottle/black/front.jpg',
    colorImages: {
      Black: [
        '/images/products/hydration-kit-bottle/black/front.jpg',
      ],
    },
  },
  {
    id: 'chpd-wmn-001',
    sku: 'CHPD-WMN-001',
    name: 'Auntie Boxy Heavyweight Crop Tee',
    slug: 'auntie-boxy-crop-tee',
    category: "Women's",
    categorySlug: 'women',
    price: 45.00,
    description: 'High-performance ageless streetwear engineered for women and night-shift legends. Printed on AS Colour 4062 100% combed cotton (5.3 oz) with a high-density embroidered CHOPPED. chest patch and technical DTG back grid.',
    shortDesc: 'Heavyweight boxy crop tee with front chest embroidery & DTG back spec.',
    features: [
      'AS Colour 4062 100% Combed Cotton (5.3 oz/yd²)',
      'Relaxed Boxy Crop Fit with Dropped Shoulders',
      'High-Density Chest Embroidery Patch',
      'Full Back Technical Grid DTG Print',
    ],
    specs: [
      { label: 'FABRIC CHASSIS', value: 'AS Colour 4062 (100% Cotton)' },
      { label: 'WEIGHT', value: '5.3 oz/yd² (Mid-Heavyweight)' },
      { label: 'FIT PROFILE', value: "Women's Boxy Crop" },
      { label: 'CATALOG_ID', value: 'Printful 636' },
    ],
    status: 'ACTIVE',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Charcoal'],
    image: '/images/products/auntie-boxy-crop-tee/black/front.png',
  },
  {
    id: 'chpd-wmn-002',
    sku: 'CHPD-WMN-002',
    name: 'Auntie Heavyweight Oversized Tee',
    slug: 'auntie-heavyweight-oversized-tee',
    category: "Women's",
    categorySlug: 'women',
    price: 48.00,
    description: 'Streetwear staple engineered with a 7.5 oz/yd² Shaka Wear heavyweight chassis. Features an embroidered [REDACTED] status badge on the sleeve and a full-back industrial schematic DTG print.',
    shortDesc: '7.5oz ultra-heavyweight drop-shoulder oversized tee.',
    features: [
      'Shaka Wear SHMHOS 7.5 oz/yd² Heavyweight Cotton',
      'Drop-Shoulder Streetwear Silhouette',
      'Left Sleeve Embroidered [REDACTED] Badge',
      'Full Back Industrial Schematic DTG Print',
    ],
    specs: [
      { label: 'FABRIC CHASSIS', value: 'Shaka Wear SHMHOS (7.5 oz Heavyweight)' },
      { label: 'FIT PROFILE', value: "Unisex / Women's Oversized" },
      { label: 'DECORATION', value: 'Sleeve Embroidery + Back DTG' },
      { label: 'CATALOG_ID', value: 'Printful 554' },
    ],
    status: 'ACTIVE',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Black'],
    image: '/images/products/auntie-heavyweight-oversized-tee/black/front.png',
  },
  {
    id: 'chpd-wmn-003',
    sku: 'CHPD-WMN-003',
    name: 'Auntie Raw-Edge Cropped Fleece Hoodie',
    slug: 'auntie-cropped-fleece-hoodie',
    category: "Women's",
    categorySlug: 'women',
    price: 78.00,
    description: 'Premium cropped pullover hoodie crafted from Bella + Canvas 7502 airlume combed cotton/poly fleece. Features a tonal embroidered CHOPPED. chest logo and a lower-back industrial timestamp barcode print.',
    shortDesc: 'Raw-edge cropped fleece hoodie with tonal embroidery & lower-back barcode.',
    features: [
      'Bella + Canvas 7502 Airlume Fleece (6.5 oz/yd²)',
      'Raw-Edge Bottom Hem & Dropped Shoulders',
      'Tonal Asphalt Chest Logo Embroidery',
      'Lower Back Hem Barcode & Timestamp DTG Print',
    ],
    specs: [
      { label: 'FABRIC CHASSIS', value: 'Bella + Canvas 7502 (52/48 Cotton-Poly Fleece)' },
      { label: 'FIT PROFILE', value: 'Cropped Raw-Hem Fleece' },
      { label: 'DECORATION', value: 'Chest Embroidery + Hem Barcode DTG' },
      { label: 'CATALOG_ID', value: 'Printful 374' },
    ],
    status: 'ACTIVE',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Deep Asphalt'],
    image: '/images/products/auntie-cropped-fleece-hoodie/black/front.png',
  },
  {
    id: 'chpd-wmn-004',
    sku: 'CHPD-WMN-004',
    name: 'Auntie Sleek Tapered Fleece Joggers',
    slug: 'auntie-sleek-fleece-joggers',
    category: "Women's",
    categorySlug: 'women',
    price: 68.00,
    description: 'Sleek, tapered fleece joggers built for late shifts and street movement. Crafted with Bella + Canvas 7501 ultra-soft fleece and vertical CHOPPED. INDUSTRIAL WEAR hip embroidery.',
    shortDesc: 'Tapered fleece joggers with vertical hip embroidery.',
    features: [
      'Bella + Canvas 7501 Soft Fleece Interior',
      'Tapered Athletic Leg with Ribbed Cuffs',
      'Vertical CHOPPED. INDUSTRIAL WEAR Hip Embroidery',
      'Elastic Waistband with Industrial Drawstring',
    ],
    specs: [
      { label: 'FABRIC CHASSIS', value: 'Bella + Canvas 7501 Premium Fleece' },
      { label: 'FIT PROFILE', value: "Women's Tapered Athletic" },
      { label: 'DECORATION', value: 'Vertical Hip Embroidery' },
      { label: 'CATALOG_ID', value: 'Printful 401' },
    ],
    status: 'ACTIVE',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black'],
    image: '/images/products/auntie-sleek-fleece-joggers/black/front.png',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.categorySlug === categorySlug);
}
