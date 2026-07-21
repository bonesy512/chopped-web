// GA4 Ecommerce Web Traffic Simulator for CHOPPED
//
// Simulates user journeys and ecommerce events sent to Google Analytics 4 (GA_ID: G-THQQMK7W7Z).
// Includes `_dbg: 1` and `debug_mode: 1` on all events so they stream live into GA4 DebugView!

import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-THQQMK7W7Z';
const API_SECRET = process.env.GA_API_SECRET || '';

console.log('====================================================');
console.log('  CHOPPED — GA4 Ecommerce Traffic Simulator');
console.log('====================================================');
console.log(`Target Measurement ID: ${GA_ID}`);
console.log(`GA API Secret set?    : ${API_SECRET ? 'YES' : 'NO (Client v2 collect mode)'}`);
console.log('====================================================\n');

// Sample real products from CHOPPED catalog
const PRODUCTS = [
  {
    sku: 'CHPD-TSH-004',
    name: 'The "Anti" Graphic Tee',
    category: 'Essentials',
    price: 45.00,
    variant: 'Black / L'
  },
  {
    sku: 'CHPD-OUT-002',
    name: 'The "Chopped" Heavyweight Hoodie',
    category: 'Outerwear',
    price: 79.99,
    variant: 'Black / XL'
  },
  {
    sku: 'CHPD-ACC-001',
    name: 'Industrial Beanie',
    category: 'Accessories',
    price: 28.00,
    variant: 'Charcoal / One Size'
  }
];

function generateClientId() {
  const rand = Math.floor(Math.random() * 899999999 + 100000000);
  const ts = Math.floor(Date.now() / 1000);
  return `${rand}.${ts}`;
}

async function sendGa4EventMP(clientId, sessionId, eventName, params) {
  if (API_SECRET) {
    const url = `https://www.google-analytics.com/mp/collect?measurement_id=${GA_ID}&api_secret=${API_SECRET}`;
    const payload = {
      client_id: clientId,
      events: [
        {
          name: eventName,
          params: {
            ...params,
            session_id: sessionId,
            debug_mode: true
          }
        }
      ]
    };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return res.status === 204 || res.status === 200;
    } catch (err) {
      console.error(`  [X] Failed sending ${eventName} via MP:`, err.message);
      return false;
    }
  }

  return sendGa4CollectHTTP(clientId, sessionId, eventName, params);
}

async function sendGa4CollectHTTP(clientId, sessionId, eventName, params) {
  // GA4 Client v2 Collect Protocol payload format (matches browser gtag.js)
  const url = new URL('https://www.google-analytics.com/g/collect');

  url.searchParams.append('v', '2');
  url.searchParams.append('tid', GA_ID);
  url.searchParams.append('gtm', '45je57i0v91234567');
  url.searchParams.append('_p', Math.floor(Math.random() * 1000000000).toString());
  url.searchParams.append('sr', '1920x1080');
  url.searchParams.append('ul', 'en-us');
  url.searchParams.append('cid', clientId);
  url.searchParams.append('sid', sessionId);
  url.searchParams.append('sct', '1');
  url.searchParams.append('seg', '1');
  url.searchParams.append('dl', params.page_location || 'https://choppeduncs.store/');
  url.searchParams.append('dt', params.page_title || 'CHOPPED — Official Apparel');
  url.searchParams.append('en', eventName);

  // Force into GA4 DebugView
  url.searchParams.append('_dbg', '1');
  url.searchParams.append('ep.debug_mode', '1');
  url.searchParams.append('epn.debug_mode', '1');
  url.searchParams.append('_ee', '1');

  if (params.currency) url.searchParams.append('ep.currency', params.currency);
  if (params.value !== undefined) url.searchParams.append('epn.value', params.value.toString());
  if (params.transaction_id) url.searchParams.append('ep.transaction_id', params.transaction_id);
  if (params.shipping_tier) url.searchParams.append('ep.shipping_tier', params.shipping_tier);
  if (params.method) url.searchParams.append('ep.method', params.method);

  // Format GA4 ecommerce items
  if (Array.isArray(params.items)) {
    params.items.forEach((item, idx) => {
      const prefix = `pr${idx + 1}`;
      if (item.item_id) url.searchParams.append(`${prefix}id`, item.item_id);
      if (item.item_name) url.searchParams.append(`${prefix}nm`, item.item_name);
      if (item.item_category) url.searchParams.append(`${prefix}ca`, item.item_category);
      if (item.item_variant) url.searchParams.append(`${prefix}va`, item.item_variant);
      if (item.price !== undefined) url.searchParams.append(`${prefix}pr`, item.price.toString());
      if (item.quantity !== undefined) url.searchParams.append(`${prefix}qt`, item.quantity.toString());
    });
  }

  try {
    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Origin': 'https://choppeduncs.store'
      }
    });
    return res.status === 204 || res.status === 200;
  } catch (err) {
    console.error(`  [X] Failed sending ${eventName} via HTTP Collect:`, err.message);
    return false;
  }
}

async function simulateSingleSession(sessionNum, delayMs = 800) {
  const clientId = generateClientId();
  const sessionId = Math.floor(Date.now() / 1000).toString();
  console.log(`\n--- Starting Simulated Session #${sessionNum} (Client ID: ${clientId}, Session ID: ${sessionId}) ---`);

  const prod = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
  const txId = `CHPD-SIM-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const steps = [
    {
      name: 'page_view',
      params: { page_title: 'CHOPPED — Official Apparel', page_location: 'https://choppeduncs.store/' },
      log: 'Visited Homepage'
    },
    {
      name: 'view_item',
      params: {
        page_title: `${prod.name} — CHOPPED`,
        page_location: `https://choppeduncs.store/shop/${prod.category.toLowerCase()}/${prod.sku.toLowerCase()}`,
        currency: 'USD',
        value: prod.price,
        items: [{
          item_id: prod.sku,
          item_name: prod.name,
          item_category: prod.category,
          item_variant: prod.variant,
          price: prod.price,
          quantity: 1
        }]
      },
      log: `Viewed Product: "${prod.name}" ($${prod.price})`
    },
    {
      name: 'add_to_cart',
      params: {
        currency: 'USD',
        value: prod.price,
        items: [{
          item_id: prod.sku,
          item_name: prod.name,
          item_category: prod.category,
          item_variant: prod.variant,
          price: prod.price,
          quantity: 1
        }]
      },
      log: `Added to Cart: "${prod.name}" (${prod.variant})`
    },
    {
      name: 'view_cart',
      params: {
        currency: 'USD',
        value: prod.price,
        items: [{
          item_id: prod.sku,
          item_name: prod.name,
          item_category: prod.category,
          item_variant: prod.variant,
          price: prod.price,
          quantity: 1
        }]
      },
      log: `Opened Cart Drawer`
    },
    {
      name: 'begin_checkout',
      params: {
        currency: 'USD',
        value: prod.price,
        items: [{
          item_id: prod.sku,
          item_name: prod.name,
          item_category: prod.category,
          item_variant: prod.variant,
          price: prod.price,
          quantity: 1
        }]
      },
      log: `Began Checkout process`
    },
    {
      name: 'add_shipping_info',
      params: {
        currency: 'USD',
        value: prod.price,
        shipping_tier: 'Standard Insured ground',
        items: [{
          item_id: prod.sku,
          item_name: prod.name,
          item_category: prod.category,
          item_variant: prod.variant,
          price: prod.price,
          quantity: 1
        }]
      },
      log: `Added Shipping Info (Standard Ground)`
    },
    {
      name: 'purchase',
      params: {
        transaction_id: txId,
        currency: 'USD',
        value: prod.price + 5.00,
        shipping: 5.00,
        items: [{
          item_id: prod.sku,
          item_name: prod.name,
          item_category: prod.category,
          item_variant: prod.variant,
          price: prod.price,
          quantity: 1
        }]
      },
      log: `Completed Purchase! Order Transaction: ${txId}`
    }
  ];

  for (const step of steps) {
    process.stdout.write(`  Firing event: [${step.name.padEnd(18)}] -> ${step.log} ... `);
    const ok = await sendGa4EventMP(clientId, sessionId, step.name, step.params);
    if (ok) {
      console.log('✅ Sent (debug_mode: 1)');
    } else {
      console.log('⚠️ Failed/Queued');
    }
    await new Promise(r => setTimeout(r, delayMs));
  }
}

async function runTrafficSimulation(sessionsCount = 3) {
  console.log(`Simulating ${sessionsCount} complete customer purchase journeys...`);
  for (let i = 1; i <= sessionsCount; i++) {
    await simulateSingleSession(i);
  }
  console.log('\n====================================================');
  console.log('✨ Traffic simulation complete!');
  console.log('👉 Check GA4 Reports -> Realtime & Admin -> DebugView.');
  console.log('   Note: In DebugView, check the top-left "DEBUG DEVICE" dropdown!');
  console.log('====================================================\n');
}

const sessionsArg = parseInt(process.argv[2], 10) || 3;
runTrafficSimulation(sessionsArg);
