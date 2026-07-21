import dotenv from 'dotenv';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const API_KEY = process.env.PRINTFUL_API_KEY;
const STORE_ID = process.env.PRINTFUL_STORE_ID || '18495276';

if (!API_KEY) {
  console.error('Missing PRINTFUL_API_KEY');
  process.exit(1);
}

const ITEMS = [
  {
    sku: 'CHPD-STK-001',
    productId: 358,
    variantId: 10163,
    placement: 'default',
    folder: 'chopped-sticker-pack',
    name: 'Guerrilla Sticker Pack'
  },
  {
    sku: 'CHPD-PAT-001',
    productId: 516,
    variantId: 12981,
    placement: 'embroidery_patch_front',
    folder: 'black-tape-patch',
    name: 'Black Tape Patch Set'
  },
  {
    sku: 'CHPD-MUG-001',
    productId: 300,
    variantId: 9323,
    placement: 'default',
    folder: 'the-god-hour-mug',
    name: 'God Hour Ceramic Mug'
  },
  {
    sku: 'CHPD-BTL-001',
    productId: 382,
    variantId: 16030,
    placement: 'default',
    folder: 'hydration-kit-bottle',
    name: 'Hydration Kit Water Bottle'
  }
];

// High resolution brand logo asset for mockups
const DESIGN_URL = 'https://choppeduncs.store/og-image.png';

async function createMockupTask(item) {
  const url = `https://api.printful.com/mockup-generator/create-task/${item.productId}`;
  const payload = {
    variant_ids: [item.variantId],
    format: 'jpg',
    files: [
      {
        placement: item.placement,
        image_url: DESIGN_URL,
        position: {
          area_width: 1000,
          area_height: 1000,
          width: 800,
          height: 800,
          top: 100,
          left: 100
        }
      }
    ]
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'X-PF-Store-ID': STORE_ID,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  if (!res.ok) {
    if (res.status === 429) {
      console.log('  ⚠️ Rate limit hit. Waiting 60s before retry...');
      await new Promise(r => setTimeout(r, 62000));
      return createMockupTask(item);
    }
    console.error(`[X] Error creating mockup task for ${item.sku}:`, JSON.stringify(data, null, 2));
    return null;
  }

  return data.result?.task_key;
}

async function pollMockupTask(taskKey, maxAttempts = 20) {
  const url = `https://api.printful.com/mockup-generator/task?task_key=${taskKey}`;

  for (let i = 0; i < maxAttempts; i++) {
    await new Promise(r => setTimeout(r, 3000));
    const res = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'X-PF-Store-ID': STORE_ID
      }
    });

    const data = await res.json();
    if (data.result?.status === 'completed') {
      return data.result.mockups;
    }
    if (data.result?.status === 'failed') {
      console.error('\n[X] Mockup task failed:', data.result.error);
      return null;
    }
    process.stdout.write('.');
  }

  return null;
}

async function downloadFile(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) return false;
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, buffer);
  return true;
}

async function run() {
  console.log('====================================================');
  console.log('  CHOPPED. — Printful Mockup Generator');
  console.log('====================================================\n');

  for (const [idx, item] of ITEMS.entries()) {
    if (idx > 0) {
      console.log('Pausing 15s to respect Printful API rate limits...');
      await new Promise(r => setTimeout(r, 15000));
    }

    console.log(`Generating mockups for ${item.name} (${item.sku})...`);
    const taskKey = await createMockupTask(item);
    if (!taskKey) {
      console.log(`  [X] Failed to initiate task for ${item.sku}`);
      continue;
    }

    process.stdout.write(`  Waiting for Printful rendering engine`);
    const mockups = await pollMockupTask(taskKey);
    console.log('');

    if (mockups && mockups.length > 0) {
      console.log(`  ✅ Generated ${mockups.length} mockup view(s):`);
      for (const [mIdx, m] of mockups.entries()) {
        console.log(`     - [${m.placement || 'view'}] ${m.mockup_url}`);
        
        // Save image to public/images/products/<folder>/black/
        const imgName = mIdx === 0 ? 'front.jpg' : `view${mIdx + 1}.jpg`;
        const localPath = path.join(__dirname, `../public/images/products/${item.folder}/black/${imgName}`);
        const downloaded = await downloadFile(m.mockup_url, localPath);
        if (downloaded) {
          console.log(`       -> Saved locally to public/images/products/${item.folder}/black/${imgName}`);
        }
      }
    } else {
      console.log(`  ⚠️ No mockups returned for ${item.sku}`);
    }
  }

  console.log('\n====================================================');
  console.log('✨ Mockup generation cycle complete!');
  console.log('====================================================\n');
}

run();
