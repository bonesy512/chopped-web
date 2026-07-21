import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const API_KEY = process.env.PRINTFUL_API_KEY;
const STORE_ID = process.env.PRINTFUL_STORE_ID || '18495276';
if (!API_KEY) { console.error('Missing PRINTFUL_API_KEY'); process.exit(1); }
const headers = { Authorization: `Bearer ${API_KEY}`, 'X-PF-Store-ID': STORE_ID };
const NEEDLE = process.argv[2] || 'cancer';

async function main() {
  const listRes = await fetch('https://api.printful.com/store/products?limit=100', { headers });
  const list = await listRes.json();
  if (!listRes.ok) { console.error('List failed:', JSON.stringify(list)); process.exit(1); }
  const matches = (list.result || []).filter(p => new RegExp(NEEDLE, 'i').test(p.name));
  for (const p of matches) {
    const dRes = await fetch(`https://api.printful.com/store/products/${p.id}`, { headers });
    const d = await dRes.json();
    if (!dRes.ok) { console.error(`Detail failed ${p.id}:`, JSON.stringify(d)); continue; }
    console.log(`\n=== "${d.result.sync_product.name}" (store product ${p.id}) ===`);
    for (const v of d.result.sync_variants) {
      const preview = (v.files || []).find(f => f.type === 'preview' && f.preview_url);
      console.log(`  sync_variant_id=${v.id}  size="${v.size}"  color="${v.color}"  external_id=${v.external_id}  price=${v.retail_price}`);
      if (preview) console.log(`      preview=${preview.preview_url}`);
    }
  }
  if (!matches.length) console.log(`No store products matched /${NEEDLE}/i`);
}
main().catch(e => { console.error(e); process.exit(1); });
