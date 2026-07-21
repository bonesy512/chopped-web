/**
 * JSON-LD structured data components for CHOPPED.
 * Rendered as <script type="application/ld+json"> in RSC pages.
 * Aligned with Generative Engine Optimization (GEO) & W3C/Google standards.
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://chopped-web.vercel.app';

// ─── Organization schema (Knowledge Graph Entity) ───────────────────────────
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'CHOPPED.',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/og-image.png`,
      width: 1200,
      height: 630,
    },
    description:
      'High-Performance Ageless Streetwear engineered for the midnight shift. 13oz fleece armor, 6.5oz combed cotton, 100-wash stance guarantee. Austin, TX.',
    foundingDate: '2024',
    foundingLocation: {
      '@type': 'Place',
      name: 'Austin, Texas, USA',
    },
    sameAs: [
      'https://www.instagram.com/choppedstore',
      'https://twitter.com/choppedstore',
      'https://www.linkedin.com/company/chopped-streetwear',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: `${BASE_URL}/transmit`,
    },
    knowsAbout: [
      'Ageless Streetwear',
      'Heavyweight Fleece Apparel',
      'Industrial Apparel Manufacturing',
      'Print-on-Demand Zero-Inventory Production',
      'Austin TX Street Culture',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── WebSite schema (enables Sitelinks searchbox) ───────────────────────────
export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'CHOPPED.',
    description: 'High-Performance Ageless Streetwear. Nocturnal drops at 02:00 AM PST/CST.',
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/scan?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-US',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── FAQPage schema for GEO Q&A Retrieval ────────────────────────────────────
export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema({ items }: { items: FAQItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Product schema for PDPs ─────────────────────────────────────────────────
interface ProductSchemaProps {
  name: string;
  description: string;
  sku: string;
  price: number;
  slug: string;
  categorySlug: string;
  status: 'ACTIVE' | 'REDACTED';
  image?: string;
  features?: string[];
  specs?: { label: string; value: string }[];
}

export function ProductSchema({
  name,
  description,
  sku,
  price,
  slug,
  categorySlug,
  status,
  image,
  features,
  specs,
}: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${BASE_URL}/shop/${categorySlug}/${slug}`,
    name,
    description,
    sku,
    brand: {
      '@type': 'Brand',
      name: 'CHOPPED.',
    },
    manufacturer: {
      '@id': `${BASE_URL}/#organization`,
    },
    url: `${BASE_URL}/shop/${categorySlug}/${slug}`,
    image: image ? (image.startsWith('http') ? image : `${BASE_URL}${image}`) : `${BASE_URL}/og-image.png`,
    ...(specs && specs.length > 0 && {
      additionalProperty: specs.map((s) => ({
        '@type': 'PropertyValue',
        name: s.label,
        value: s.value,
      })),
    }),
    ...(status === 'ACTIVE' && {
      offers: {
        '@type': 'Offer',
        price: price.toFixed(2),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `${BASE_URL}/shop/${categorySlug}/${slug}`,
        seller: {
          '@id': `${BASE_URL}/#organization`,
        },
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'US',
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnPeriod',
          merchantReturnDays: 30,
          returnMethod: 'https://schema.org/ReturnByMail',
        },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '5.99',
            currency: 'USD',
          },
          shippingDestination: {
            '@type': 'DefinedRegion',
            addressCountry: 'US',
          },
        },
        priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
          .toISOString()
          .split('T')[0],
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── BreadcrumbList schema ────────────────────────────────────────────────────
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── ItemList schema for catalog pages ──────────────────────────────────────
interface ListItem {
  name: string;
  url: string;
  position: number;
}

export function ItemListSchema({ name, items }: { name: string; items: ListItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      url: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Person / Advisory Board schema ───────────────────────────────────────
interface PersonSchemaProps {
  name: string;
  jobTitle: string;
  description: string;
  url?: string;
  image?: string;
  sameAs?: string[];
}

export function PersonSchema({ name, jobTitle, description, url, image, sameAs }: PersonSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    description,
    worksFor: {
      '@id': `${BASE_URL}/#organization`,
    },
    ...(url && { url }),
    ...(image && { image: image.startsWith('http') ? image : `${BASE_URL}${image}` }),
    ...(sameAs && sameAs.length > 0 && { sameAs }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
