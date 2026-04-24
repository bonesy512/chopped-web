// Central product data - all 5 VOL.01 products from choppedproducts.md

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
  image?: string;
};

export const products: Product[] = [
  {
    id: 'chpd-ftw-001',
    sku: 'CHPD-FTW-001',
    name: 'The "Ortho-Aggressor" Mid',
    slug: 'ortho-aggressor-mid',
    category: 'Footwear',
    categorySlug: 'footwear',
    price: 149.99,
    description: 'All-black Italian suede mid-top with hidden ORTH3-AGGR medical-grade support. Heavy-gauge suede chassis. Hidden orthotic sole. Built for the 02:00 AM shift.',
    shortDesc: 'All-black Italian suede mid-top. Hidden ORTH3-AGGR support.',
    features: [
      'Hidden Orthotic Sole',
      'High-Friction Pivot Sole',
      'Industrial Ankle Lockdown',
    ],
    specs: [
      { label: 'MATERIAL', value: 'Heavy-gauge Matte Suede' },
      { label: 'HARDWARE', value: '15mm Matte Steel Buckle' },
      { label: 'LOGO', value: 'Stencil C on Lateral Heel' },
    ],
    status: 'ACTIVE',
    image: '/images/products/ortho-aggressor-mid/hero.jpg',
  },
  {
    id: 'chpd-out-002',
    sku: 'CHPD-OUT-002',
    name: 'The "Chopped" Heavyweight Hoodie',
    slug: 'chopped-heavyweight-hoodie',
    category: 'Outerwear',
    categorySlug: 'outerwear',
    price: 99.99,
    description: '500GSM French Terry armor with internal lumbar support. Wear the armor. Respect the friction.',
    shortDesc: '500GSM French Terry armor. Internal Lumbar-Lock™ liner.',
    features: [
      'Lumbar-Lock™ Compression Liner',
      'Double-Layered Shield Hood',
      'Reinforced Tonal Stitching',
    ],
    specs: [
      { label: 'FABRIC', value: '500GSM French Terry' },
      { label: 'GRAPHIC', value: 'Reflective Crack-Ink "SUPER CHOPPED"' },
      { label: 'FIT', value: 'Structured Boxy' },
    ],
    status: 'ACTIVE',
    image: '/images/products/chopped-heavyweight-hoodie/hero.jpg',
  },
  {
    id: 'chpd-out-003',
    sku: 'CHPD-OUT-003',
    name: 'The "Unc" Utility Vest',
    slug: 'unc-utility-vest',
    category: 'Outerwear',
    categorySlug: 'outerwear',
    price: 99.99,
    description: '12oz Duck Canvas tactical vest stripped of cosplay aesthetics. Logical utility. No excess. Just capacity.',
    shortDesc: '12oz Duck Canvas. Stripped of cosplay aesthetics.',
    features: [
      'Fleece-lined Reader Pocket',
      'Concealed Car Fob Loop',
      'Ballistic Nylon Reinforcement',
    ],
    specs: [
      { label: 'MATERIAL', value: '12oz Duck Canvas' },
      { label: 'ZIPPER', value: '15mm Virgil-Grade Industrial' },
      { label: 'PATCH', value: 'Black-on-Black Tonal Velcro' },
    ],
    status: 'ACTIVE',
    image: '/images/products/unc-utility-vest/hero.png',
  },
  {
    id: 'chpd-tsh-004',
    sku: 'CHPD-TSH-004',
    name: 'The "Anti" Graphic Tee',
    slug: 'anti-graphic-tee',
    category: 'Essentials',
    categorySlug: 'essentials',
    price: 79.99,
    description: '300GSM "Anti Chopped Chopped Social Club" parody tee. Wear it without explanation.',
    shortDesc: '300GSM Dry-Hand Cotton. Anti-uniform for the veteran.',
    features: [
      '1-inch Reinforced Ribbed Collar',
      'Pre-shrunk Veteran Fit',
      'Reflective Silver Back Print',
    ],
    specs: [
      { label: 'FABRIC', value: '300GSM Dry-Hand Cotton' },
      { label: 'FRONT', value: 'Left-Chest Pocket Stencil' },
      { label: 'BACK', value: 'Wavy Distorted Typography' },
    ],
    status: 'ACTIVE',
    image: '/images/products/anti-graphic-tee/hero.png',
  },
  {
    id: 'chpd-acc-005',
    sku: 'CHPD-ACC-005',
    name: 'The "Chopped" Distressed Logo Hat',
    slug: 'distressed-logo-hat',
    category: 'Essentials',
    categorySlug: 'essentials',
    price: 39.99,
    description: 'Hand-abraded 6-panel dad hat in Midnight Charcoal. Low profile. High authority.',
    shortDesc: 'Hand-abraded 6-panel. Midnight Charcoal.',
    features: [
      'Low-profile Deconstructed Fit',
      'Frayed High-Density Embroidery',
      'Glare-reducing Black Under-brim',
    ],
    specs: [
      { label: 'COLOR', value: 'Midnight Charcoal (Washed Black)' },
      { label: 'HARDWARE', value: 'Antique Brass Slide' },
      { label: 'DISTRESS', value: 'Hand-abraded brim edges' },
    ],
    status: 'ACTIVE',
    image: '/images/products/distressed-logo-hat/hero.png',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.categorySlug === categorySlug);
}
