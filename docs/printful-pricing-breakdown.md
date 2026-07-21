# CHOPPED. × Printful — Landed Cost & Retail Pricing

> **VERIFIED against the live Printful API on 2026-07-21.** All USD.
> **Method:** product costs pulled from `POST /orders/estimate-costs` (real Printful
> pricing incl. print), **validated to the penny against real order #168039099** — the tee
> estimate ($22.80/unit, front+back DTG) exactly matched what Printful charged on the actual
> 2-tee order. Base variant prices from `GET /products/{id}`. Shipping/tax shown are
> **single-unit-to-CA estimates** (both are order-level in reality — see §2 note).
>
> ⚠️ **This supersedes the 2026-07-20 estimates**, which had two material errors:
> (1) **double-counted embroidery** on the hat & beanie (added $3.50 on top of a base that
> already includes the first placement), and (2) over-counted the tee (assumed base + 2 prints
> + label = $29.74; real is $22.80, no inside label configured). Real costs are **lower and
> margins higher** across the board. See the corrections table in §2.

---

## 1. LAUNCH SKUs (VOL.01 — 4 Products) — VERIFIED

Product cost = garment **+ print**, from Printful. For DTG/embroidery the **first (front)
placement is included in the catalog base price**; a **back** DTG print adds ~$5.95.

### 🔥 "Anti" Graphic Tee — `CHPD-TSH-004` — ✅ LIVE IN STORE
| Detail | Value |
|---|---|
| **Printful blank** | Men's Premium Heavyweight Tee \| Cotton Heritage MC1086 (ID 508), 6.5 oz combed cotton |
| **Store products** | Antigraphic Black Tee (`448528103`) · Antigraphic White Tee (`448527824`) |
| **Rep variant (Black/M)** | catalog `12757` · sync `5403563062` |
| **Technique** | DTG front (chest stencil) + back (wavy graphic) |
| **Product cost (Black/M, front+back)** | **$22.80** ✓ *matches real order #168039099* |
| Size upcharge | 2XL +$2.00 → $24.80 · 3XL +$4.00 → $26.80 · 4XL +$6.00 → $28.80 |

### 🔥 "Chopped" Heavyweight Hoodie — `CHPD-OUT-002`
| Detail | Value |
|---|---|
| **Printful blank** | Unisex Premium Pullover Hoodie \| Cotton Heritage M2580 (ID 380) |
| **Rep variant (Black/M)** | catalog `10780` · 138 variants, 23 colors (incl. Black, Vintage Black, White), S–3XL |
| **Technique** | DTG front + back ("SUPER CHOPPED") |
| **Product cost (Black/M, front+back)** | **$33.24** (garment+front $27.29 + back $5.95) |
| Size upcharge | 2XL +$2.00 → $35.24 |

### 🔥 "Distressed Logo" Hat — `CHPD-ACC-005`
| Detail | Value |
|---|---|
| **Printful blank** | Distressed Dad Hat \| Otto Cap 104-1018 (ID 396) |
| **Rep variant (Black/OS)** | catalog `10990` · **4 colors: Black, Charcoal Grey, Khaki, Navy** (both Black + charcoal confirmed) |
| **Technique** | Embroidery, front, tonal black thread (`#000000`) |
| **Product cost (Black/OS, emb front)** | **$15.74** *(embroidery included in base — NOT +$3.50 as the old doc had)* |

### 🔥 "Night-Shift" Watch Cap — `CHPD-ACC-009`
| Detail | Value |
|---|---|
| **Printful blank** | Cuffed Beanie \| Yupoong 1501KC (ID 266), 100% acrylic |
| **Rep variant (Black/OS)** | catalog `8936` · 12 colors (incl. Black, White), One size |
| **Technique** | Embroidery, front, white thread (`#FFFFFF`) for contrast |
| **Product cost (Black/OS, emb front)** | **$12.79** *(embroidery included in base)* |

---

## 2. LAUNCH SUMMARY — VERIFIED COST & MARGIN

**Item margin** = retail − product cost (scales per unit). Shipping + tax are **order-level**
costs currently absorbed (we charge customers $0 shipping) — see the order-economics note.

| Product | Retail | Product cost | **Item margin $** | **Item margin %** | 1-unit all-in¹ | 1-unit margin % |
|---|---|---|---|---|---|---|
| "Anti" Tee | $45.00 | $22.80 | **$22.20** | **49.3%** | $30.06 | 33.2% |
| "Chopped" Hoodie | $79.99 | $33.24 | **$46.75** | **58.4%** | $45.39 | 43.3% |
| Distressed Hat | $45.00 | $15.74 | **$29.26** | **65.0%** | $29.18 | 35.2% |
| Night-Shift Beanie | $40.00 | $12.79 | **$27.21** | **68.0%** | $25.91 | 35.2% |

¹ *1-unit all-in = product + single-unit shipping + tax to a CA address (tee $4.75/$2.51,
hoodie $8.49/$3.66, hat $4.49/$2.45, beanie $4.49/$2.13). Worst case — shipping is shared
across a multi-item order.*

> **Blended item margin across the launch lineup: ~57%** (was reported as 36.2% on the old,
> over-counted estimates).

> [!IMPORTANT]
> ### Order economics — the real 2-tee order (#168039099)
> Customer paid **$90.00** (2×$45, $0 shipping charged). Printful charged us **$61.55**
> = product $45.60 + shipping $6.95 + **tax $9.00**. Real gross = **$28.45 (31.6%)**.
> Two levers close the gap between item margin (57%) and realized margin (32%):
> - **Sales tax ($9 here) is avoidable** — file a **resale / exemption certificate** with
>   Printful and it drops to $0. Biggest single margin lever; the old doc never mentioned it.
> - **Shipping** — we currently eat it. Pass Printful's shipping rate through to the PayPal
>   `breakdown.shipping` (the deferred "real shipping calc" task) or bake a flat rate into price.

### Cost corrections vs. 2026-07-20 estimates
| Product | Old "cost" | **Verified cost** | Why the old number was wrong |
|---|---|---|---|
| Tee | $29.74 | **$22.80** | Added front+back+label to base; real base already includes front, no label configured |
| Hoodie | $43.75 | **$33.24** | Same over-count on placements |
| Hat | $23.00 | **$15.74** | **Double-counted embroidery** — base already includes it |
| Beanie | $19.45 | **$12.79** | **Double-counted embroidery** |

### Revenue projection (target 40–60 units, verified item margins)
| Scenario | Units | Revenue | Product COGS | **Item gross** | Realized¹ |
|---|---|---|---|---|---|
| Conservative (40, even split) | 40 | ~$2,100 | ~$850 | **~$1,250** | ~$700 |
| Target (50, tee-heavy) | 50 | ~$2,400 | ~$1,050 | **~$1,350** | ~$780 |
| Optimistic (60, hoodie-heavy) | 60 | ~$3,400 | ~$1,600 | **~$1,800** | ~$1,050 |

¹ *Realized ≈ item gross minus shipping + tax absorbed; collapses toward item gross once a
resale certificate is on file.*

---

## 3. EXPANSION CANDIDATES — VERIFIED BASE PRICES

Base = garment **+ first (front) placement** for DTG apparel; single-print items (patch,
sticker, mug, bottle, tote) are all-in for the one print. Add ~$5.95 for a back DTG print,
plus shipping + tax. Retail = suggested.

| CHOPPED. Concept | Printful Product | ID | Rep variant | **Verified base** | Base range | Suggested Retail |
|---|---|---|---|---|---|---|
| "Night-Shift" Long Sleeve | Gildan 2400 LS Tee | 57 | Black/2XL `3460` | **$16.79** | $14.79–$22.79 | $50 |
| "Foreman" Crewneck | Gildan 18000 Crew | 145 | Black/2XL `5438` | **$20.79** | $18.79–$26.79 | $55 |
| "Advisory Board" Premium Crew | Cotton Heritage M2480 | 411 | Black/2XL `11258` | **$26.05** | $24.05–$28.05 | $70 |
| "Black Tape" Patch | Embroidered Patches | 516 | 3″ circle `12981` | **$8.95** | $8.95–$9.13 | $14 |
| CHOPPED. Sticker | Kiss-Cut Stickers | 358 | 3″×3″ `10163` | **$2.29** | $2.29–$5.36 | $5 |
| "Hydration Kit" Bottle | Steel Water Bottle | 382 | Black 17oz `16030` | **$23.91** | flat | $34 |
| "The God Hour" Mug | Black Glossy Mug | 300 | Black 11oz `9323` | **$7.95** | $7.95–$8.95 (15oz) | $22 |
| "The Haul" Tote | AOP Tote Bag | 84 | 15″×15″ `4533` | **$17.25** | flat | $30 |

> Expansion base prices came in **at or slightly below** the old doc's estimates (water bottle
> and tote matched exactly; mug $7.95 vs $9.50; sticker $2.29 vs $2.75; patch $8.95 vs $9.50).

---

## 4. DESIGN PLACEMENT SPECIFICATIONS

### Print Areas (DTG)
| Product | Front | Back | Sleeves | Inside Label |
|---|---|---|---|---|
| Heavyweight Tee (508) | 12″ × 16″ | 12″ × 16″ | 2.49″ (short) | 3″ × 3″ (optional, +cost) |
| Hoodie (380) | full front | full back | 6.75″ (long) | optional |
| Long Sleeve (57) | full front | full back | 6.75″ (long) | optional |
| Crewneck (145) / Premium Crew (411) | full front | full back | 6.75″ (long) | optional |

### Embroidery Areas
| Product | Front | Back | Thread |
|---|---|---|---|
| Distressed Hat (396) | 4.0″ × 1.75″ | 3.5″ × 1.6″ | tonal black `#000000` |
| Cuffed Beanie (266) | 5.0″ × 1.75″ | — | white `#FFFFFF` |
| Patches (516) | 3″ ⌀ circle | — | tonal |

> **Note:** the inside brand label ($0.99–$1.50) is **not currently on the synced tees**.
> Add it as a placement if you want the custom neck tag — it raises product cost accordingly.
> Reflective/metallic ink is unavailable (DTG) — use light grey `#D1D5DB` for the "crack-ink" look.

---

## 5. NEXT STEPS
- [x] **Pull verified Printful pricing + variant IDs** for launch products (508/380/396/266) — done 2026-07-21.
- [x] **Tee live in store** (Black + White, S–4XL) with confirmed sync-variant IDs.
- [ ] **File a resale/exemption certificate with Printful** — zeroes the ~15% sales-tax drag (top margin lever).
- [ ] **Confirm retail prices** with verified margins (all comfortably ≥ target; room to hold or nudge up).
- [ ] **Build the hoodie / hat / beanie as store products** (needs finalized DTG/embroidery design files) → get their sync-variant IDs → replace the `0` placeholders in `lib/printful.ts`.
- [ ] **Order samples** to your own address (Printful sample flow, ~20% off) — never confirm a customer draft.
- [ ] **Real shipping pass-through** (charge Printful's shipping rate at checkout) — deferred task from the PayPal migration.
