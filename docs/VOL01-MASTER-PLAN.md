# CHOPPED. — Vol.01 Marketing Execution Plan (Master)

**Version:** 1.1.0 · **Written:** 2026-07-21 · **Decisions locked:** 2026-07-21 (see §10)
**Supersedes and absorbs:** the standalone community, growth-experiments, and content-repurpose drafts,
plus the 2026 streetwear-market reconciliation. This is the single source of truth for Vol.01 marketing.
**Companion strategy context:** [.agents/product-marketing.md](../.agents/product-marketing.md), [HANDOFF.md](../HANDOFF.md)

---

## 0. Reality Guardrails (everything below obeys these)

These are the true constraints of the current build. The aspirational growth deck ignores several of them.

1. **Tee-only catalog.** Exactly one ACTIVE SKU (the "Anti" Graphic Tee, $45). Hoodie, cap, mug, etc. are
   `REDACTED` with `0` placeholder variant IDs. Selling them would charge with no Printful order created.
2. **Always-open store.** The `/clock-in` 02:00 lockout gate was deliberately removed. "02:00 AM" survives
   as **cultural identity**, not a site mechanic. Do not rebuild the gate for marketing's sake.
3. **Email-only backbone.** Resend is wired. There is **no SMS provider**. Any SMS plan is net-new infra.
4. **Small drop.** ~50–60 units, numbered, no restocks. This is a feature (see §1), not a limitation.
5. **Honest economics.** ~$27 contribution per tee. Paid acquisition barely pencils (see §8).
6. **Counter-positioned audience.** 38–55 veterans, not the under-25 mainstream. Steal market mechanics,
   reject market targeting (see §1).
7. **Voice is law.** Union ban list + terse imperative register (see Appendix B). Governs all member-facing copy.
8. **Canonical domain is `choppedunc.store`** (env default), not the `vercel.app` preview.

---

## 1. Positioning & Identity

**Thesis:** Streetwear didn't age with its audience. Youth chased neon logos and 4.2oz cotton. The 38+
veteran got left behind with decades of authority and a body that keeps score. CHOPPED builds the armor.

**Identity the community reinforces:** *"The street never left. My back just started keeping score. I still
build. I just build different now."* Status inside = years of friction, not follower count.

**The counter-position (this is the strategic edge).** The 2026 streetwear market is ~65% mass and skews
under-25. CHOPPED is a deliberate blue-ocean bet *away* from that crowd. So we adopt the category's proven
mechanics (scarcity, drops, waitlist, community, POD, SEO) and refuse its targeting (Gen-Z chase, resale hype).

**Proof point to use everywhere:** BAPE's Nigo made ~50 tees a week on a tight budget "because he disliked
the idea of everyone wearing the same thing." That is almost verbatim CHOPPED's ~55-unit numbered drop +
IYKYK ethos. It reframes the small drop as pedigree, not constraint.

**Tailwind:** Depop 2026 data (intentional wardrobes over microtrends, 67% prioritize quality) supports the
durable/heavyweight message even beyond the core demo.

---

## 2. North Star & Metric Model

**North Star (leading):** **Verified access-list size** (email + IG Broadcast subs) before the drop. It is
the only pre-launch metric that predicts a sold-out drop and is directly controllable.

**Access-list target, derived (not asserted).** Forecast the drop off the list: `waitlist × conversion = units`.
For a ~55-unit drop: at 8.5% conversion → **~650 signups**; at 12% (industry early-access benchmark) → **~460**.
So the ~500 target is correctly sized (500 × 11% ≈ 55). **Do not commit the final drop quantity until the list
clears ~500 verified subs.**

| Generic KPI (discard) | CHOPPED metric (use) | Target |
|---|---|---|
| MAU / DAU | Access-list size at T-0 | ~500+ verified subs |
| Activation (D7) | Callsign-claim rate within 7d | >40% |
| Viral K-factor >1 | UGC per buyer + referred signups per buyer | 15+ UGC from 15 boxes; 0.3+ ref/buyer |
| D7/D30/D90 retention | Sell-through + Vol.02 waitlist growth | 100% sell-through; 2× waitlist post-drop |
| LTV:CAC 3:1 | Contribution-per-buyer vs blended CAC | CAC <$12 via organic/seed |
| 10 experiments/month | 2–3 high-leverage experiments per drop cycle | see §7 |

---

## 3. The Funnel (physical drop, not SaaS)

```
REACH  →  CAPTURE  →  PRIME  →  CONVERT  →  AMPLIFY  →  REPEAT
IG/seed   email +     5-email   drop-day    UGC +       Vol.02
/GEO      IG Broad.   nurture   PayPal      Crew Pass   waitlist
```

**Bottleneck = CAPTURE.** Reach is cheap via seeding/organic. Conversion of a scarce drop to a warm list is
high. The list is what's missing. **Effort concentrates on CAPTURE and AMPLIFY** — most leverage, least
existing infrastructure.

---

## 4. Channel Bets (ranked for a 38–55 trade-identity audience)

1. **Subculture creator seed-boxes → tracked affiliate/UGC.** 15 boxes to skate podcasters, moto/auto
   fabricators, vinyl DJs. Highest-fit, already budgeted. Convert each into a referral link.
2. **Reddit / trade forums (underexploited seam).** Where older heads gather. Value-first, not spam.
3. **Local Austin physical presence.** Guerrilla stickers + shop partnerships (auto/skate/record). Near-zero cost.
   Later: use online-demand data to pick any physical footprint (the Scuffers method).
4. **GEO / SEO** (`/drop-log` + Product/FAQ JSON-LD + BLUF answer blocks). Slow-compounding long-tail capture.
5. **Paid (Meta/TikTok) — OFF for Vol.01 (locked 2026-07-21).** Economics don't support it (see §8).
   Revisit only post-drop with proven creative, as a retargeting-only test.

**Contrarian hook to weaponize:** the "Anti Chopped Chopped Social Club" parody — built-in IYKYK meme fuel.

---

## 5. Community System — "The Advisory Board"

The community frame already exists in the IA (`JOIN ADVISORY BOARD`, `/advisory-board`, `/callsign`,
`/drop-log`, `/transmit`). Operationalize it. Do not invent a new brand.

**Platform — LOCKED (2026-07-21): Instagram + email only for Vol.01.** No Discord now. A gated Discord
("THE BREAK ROOM") is deferred — revisit only post-drop, and only if 50+ buyers actively ask for a room. An
empty server is worse than none, and it can't be tended inside the time budget below.
- **The spine:** Email (Resend) + a private **Instagram Broadcast Channel ("NIGHT DISPATCH")**. Broadcast-first,
  near-zero moderation. This *is* the community through Vol.01.

**Operating budget — LOCKED: ~1 hr/week.** That buys broadcast, not high-touch management. Spend it as:
- **~30 min:** 2–3 Night Dispatch broadcasts (a spec story, a teaser, a countdown beat).
- **~20 min:** heart / repost incoming UGC and seed-box unboxings to story.
- **~10 min:** clear DMs and `transmit` replies.
Anything needing daily tending (Discord, live threads, per-member replies) is out of scope. The seed boxes and
Resend automations do the asynchronous heavy lifting, not the founder.

**Deferred — Break Room channel architecture (only if Discord is revisited post-drop):**

| Channel | Purpose | Rule |
|---|---|---|
| `# front-desk` | Callsign intros; one pinned "start here" | Every new member drops callsign + trade |
| `# the-clock-in` | The weekly ritual thread | Post the night's grind + gear |
| `# field-photos` | Gear in the wild (shop/garage/studio/street) | Photo/video only — the UGC engine |
| `# the-drop-log` | Drop intel, spec drops, Vol.02 dev | Staff-seeded, member Q&A |
| `# transmit` | Feedback, sizing, warranty | Answered <24h (hard SLA) |

**New-member journey ("Get Your Callsign"):** Signup (`JOIN ADVISORY BOARD`) → welcome email ("claim your
callsign", links `/callsign`) → callsign claim = status from minute one → first-week spec story + one reply
ask → post-drop, buyers get the Break Room invite keyed to callsign. **Activation metric:** callsign-claim
rate within 7d (>40%).

**Weekly ritual — "THE CLOCK-IN" (low-touch, IG-native):** One recurring Night Dispatch broadcast, same late
hour each week: *"Clock in. What are you building tonight?"* Members reply in-channel with grind + gear. You
heart a handful and repost the best to story. It's one broadcast, not a moderation job — it fits the hour and
makes the 02:00 identity real with zero site engineering.

---

## 6. Content Engine

**Method (per asset):** verbalized-sampling hooks (5 options → pick with reason) + PAS (Problem-Agitation-
Solution), platform-native structure, **CHOPPED voice as authority** (Appendix B).

**Channel scope:** Email, X/Twitter, Instagram (carousel + Reel), and the `/drop-log` SEO blog. Within the
~1 hr/week budget, **IG + email are primary** (owned, drive the list); the X thread and the `/drop-log` post
are publish-once organic/SEO assets — ship them, then leave them. LinkedIn and YouTube stay out.

**Through-thread across every asset:** the "Anti Chopped Chopped Social Club" IYKYK line, and every CTA points
to the same North Star action — `JOIN ADVISORY BOARD` (access-list), never a raw product link. Only the tee
appears anywhere. **Publish-ready pieces live in Appendix A.**

---

## 7. Experiment Backlog (2–3 per drop cycle; ICE = Impact·Confidence·Ease, 1–5)

| # | Experiment | Hypothesis | Metric | ICE |
|---|---|---|---|---|
| E1 | Access-page hook A/B — identity ("STREETWEAR FOR VETERANS.") vs proof ("13OZ ARMOR. 12-HOUR SHIFTS.") | Identity hook lifts opt-in | Email opt-in rate | 5·4·5 |
| E2 | Seed-box UGC ask — personalized callsign + explicit "post one unboxing" vs generic | A named ask converts more OGs to UGC | UGC per box | 5·4·4 |
| E3 | Two-tee bundle framing — Black+White pair vs single | Framing lifts units/order without REDACTED SKUs | AOV / units per order | 4·3·4 |
| E4 | Crew Protocol reward — embroidered patch vs early-access-only | Physical reward beats access | Referred signups/buyer | 4·3·4 |
| E5 | Channel probe — 2 weeks value-first in 2 Reddit/subculture communities | A trade community out-converts paid social | Referral traffic → signups | 4·2·4 |

**Run order:** E1 + E2 first (CAPTURE + UGC input). E3/E4 next (AMPLIFY + honest AOV). E5 as channel discovery.
**Sample-size honesty:** at ~55 units, on-site tests (E3/E4) rarely reach significance — treat as directional
for Vol.02. E1/E2 (measured on the larger signup/seed populations) can actually clear the bar.

**Status (2026-07-21): backlog queued, none started. E1 is on hold at founder's call — do not build yet.**

---

## 8. Unit Economics & the AOV Blocker

Per tee: $45 − blank/print (~$16.50) − PayPal fee (~$1.60) = **~$27 contribution** (customer pays shipping).
- **Max viable blended CAC ≈ $8–12.** Cold Meta/TikTok apparel CAC runs $20–50+. **Paid is OFF for Vol.01 (locked 2026-07-21).**
- LTV is drop-bound (1–2 purchases). The engine is organic + seeded + referral.

**The $68 AOV target is currently un-buildable — and it's a fulfillment problem, not a marketing one.** The
$159 Tee+Hoodie+Cap kit can't ship (hoodie/cap are REDACTED). Real AOV levers today:
1. **Two-colorway tee pair** (Black + White), ceiling ~$90 — the only bundle that ships.
2. **Unlock AOV by publishing SKUs, not selling phantom ones.** Moving hoodie/cap `REDACTED → ACTIVE` with
   real variant IDs is the true blocker on the $68 target. Flag it as engineering/ops, not campaign work.

---

## 9. 90-Day Timeline (mapped to the drop)

**T-30 → T-14 (Seed & Frame):** ship 15 OG seed boxes (each: callsign + personal "post one unboxing" ask);
open Night Dispatch, seed 5–10 modeling posts before inviting; recruit 20–50 founding members by DM (top email
subs + seeded OGs); submit sitemap + Product/FAQ JSON-LD.

**T-14 → Drop (Prime):** run the first weekly Clock-In; repost every piece of OG UGC and credit callsigns;
publish the `/drop-log` SEO post (Appendix A §5); run E1 (access-page A/B) to push the list toward ~500.

**Drop Day:** store is already live (no gate). Broadcast the moment on Night Dispatch + the drop email
(Appendix A §1). Orders run the verified PayPal Orders v2 → Printful pipeline.

**Drop → +30 (Graduate & Retain):** invite buyers into The Break Room by callsign; announce one member-driven
Vol.02 change and credit the members; run the Crew Protocol (2 invites/buyer).

---

## 10. Locked Decisions & Blockers

**Decisions — LOCKED 2026-07-21:**
1. **Platform:** Instagram + email only. Discord deferred (revisit post-drop only if buyers ask).
2. **Founder time:** ~1 hr/week — broadcast tier only (see §5 budget).
3. **Paid:** OFF for Vol.01. Engine is organic + seeded + referral.
4. **Experiments:** backlog queued, none building yet. E1 on hold at founder's call.

**Hard blockers (not marketing-solvable):**
- **A. Un-fulfillable SKUs** gate the $68 AOV. Publish hoodie/cap in Printful (real variant IDs) to open bundles.
- **B. No SMS provider** — any SMS sequence needs new infra, or route those touches through email/IG instead.
- **C. Domain** — align all CTAs on `choppedunc.store`; retire `vercel.app` references from copy.

---

---

# APPENDIX A — Publish-Ready Content Pack

Voice: CHOPPED brand bible. No em-dashes, no semicolons. Sentences short. Periods, not exclamation marks.
Every CTA → `JOIN ADVISORY BOARD` at `choppedunc.store`.

## A.1 EMAIL

**Selected hook:** "Streetwear quit on you at 38." (grievance sorts the list in five words). Preview text
carries the second hook.

**Subject options (10):**
1. Streetwear quit on you at 38.
2. Your back keeps score now.
3. Hype tees are cut for teenagers.
4. The Anti tee. 1 of [REDACTED].
5. You earned the Black Air Force energy.
6. 4.2oz is a costume. This is armor.
7. Vol.01 is loading. Get your callsign.
8. Built for the 02:00 shift.
9. No neon logos. No tissue-paper cotton.
10. The street never left you.

**Preview text:** Your back started keeping score. Read this.

**Body:**

Streetwear grew up and left you behind.

The heads who ran it at 22 are 42 now. The culture chased neon logos and 4.2oz cotton that tears in two
weeks. It stopped making gear for the veteran who still shows up. The one who works the midnight shift. The
one whose back started keeping score.

We built CHOPPED for that man.

The "Anti" Graphic Tee is the first piece. 6.5oz combed ring-spun cotton. A boxy stance that holds through
100-plus wash cycles. Tonal black-on-black. Water-based OEKO-TEX inks that stay put when the flaking
screen-prints have long since cracked. Made on demand in Austin. No overstock in a landfill. No teenager it
was designed for.

It reads "Anti Chopped Chopped Social Club." If you get it, you get it.

Here is the part that matters. Vol.01 is 1 of [REDACTED] units. No restocks. No pre-orders. When it clocks
out, it is gone.

We are not selling this on a shelf. We are handing it to the veterans first.

Claim your callsign. Get on the Advisory Board. You get the drop before anyone else, the spec breakdowns, and
a number that says you were here early.

The street never left. Prove you are still on it.

**[ JOIN ADVISORY BOARD → ]** choppedunc.store

Clock in. Deploy. Clock out.

**P.S.** Vol.01 is small on purpose. The list gets in first. Everyone else reads about it after.

## A.2 X / TWITTER THREAD

**Selected hook:** "your favorite hype tee is 4.2oz. that's a napkin with a logo." (most screenshot-able; picks
a fight with the category).

**1/** your favorite hype tee is 4.2oz.
that's a napkin with a logo on it.
here's what streetwear forgot when it left everyone over 38 behind. 🧵

**2/** the culture aged. the clothes didn't.
still cut for 19-year-olds. still thin enough to read a phone through. still flaking at the print after three
washes.
the veteran who built this culture got handed dad clothes as a consolation prize.

**3/** we did the opposite.
6.5oz combed ring-spun cotton. boxy stance that survives 100+ washes. tonal black on black. water-based inks
that don't crack.
it's not fashion. it's armor.

**4/** made on demand in austin. one at a time.
no warehouse of dead stock. no landfill. we don't take your money for anything we can't build to spec that day.
if it isn't ready, it stays [REDACTED].

**5/** the tee reads "anti chopped chopped social club."
if you know, you know. if you don't, you're not the one it's for.

**6/** here's the twist.
the strongest streetwear right now isn't made for the loudest 20-year-old in the room.
it's made for the 44-year-old who stopped trying to be seen and started buying things that last.

**7/** vol.01 is 1 of [REDACTED]. no restocks.
the list gets it first. everyone else reads about it.
claim your callsign → choppedunc.store

## A.3 INSTAGRAM CAROUSEL

**Selected hook:** "STREETWEAR QUIT ON YOU" (4 words, states the thesis in under a second).

- **Slide 1:** STREETWEAR QUIT ON YOU.
- **Slide 2:** The culture aged. The clothes stayed 19.
- **Slide 3:** 4.2oz is a costume. This is 6.5oz armor.
- **Slide 4:** Combed ring-spun cotton. 100-wash stance.
- **Slide 5:** Tonal black on black. No neon. IYKYK.
- **Slide 6:** Made on demand in Austin. Zero dead stock.
- **Slide 7:** If we can't build it to spec, it stays [REDACTED].
- **Slide 8:** "Anti Chopped Chopped Social Club." Get it or don't.
- **Slide 9:** Vol.01. 1 of [REDACTED]. No restocks.
- **Slide 10:** Claim your callsign. Link in bio. → JOIN ADVISORY BOARD

**Visual direction:** monochrome. #080808 fields, white Roboto Mono spec text, one red #FF0000 accent per
slide. Slides 3–4 over macro fabric texture. Slide 7 shows a real [REDACTED] bar over a product. Slide 10 is
the tee flat-lay.

**Caption:**
Streetwear grew up and left the people who built it.
Thin cotton. Teen cuts. Logos screaming for attention nobody over 38 wants anymore.
We went the other way. 6.5oz combed ring-spun cotton. A stance that holds through 100+ washes. Made one at a
time in Austin, so nothing rots in a warehouse.
Vol.01 is 1 of [REDACTED]. No restocks. The Advisory Board gets it first.
Claim your callsign. Link in bio.
.
.
#streetwearover40 #heavyweightstreetwear #agelessstreetwear #streetwearformen #ringspuncotton #austintexas
#ATXstreetwear #nightshift #midnightshift #printondemand #slowfashion #blackonblack #IYKYK #veteranowned
#industrialstyle #graphictee #streetwearveteran #mechaniclife #skateculture #dtcbrand

## A.4 TIKTOK / REEL SCRIPT (60–90s)

**Selected hook:** "Rip test. 4.2oz hype tee versus 6.5oz industrial." (visual proof stops the thumb in 1s).

- **0–3s | HOOK.** Two tees on a workbench under a shop light. "Rip test. 4.2oz hype tee. 6.5oz industrial."
  [text: THE RIP TEST]
- **3–15s | PROBLEM.** Pull the thin tee; it gives. "This is most streetwear now. Four-point-two ounces. Cut
  for a teenager. Gone in a season." [text: 4.2oz = napkin]
- **15–45s | VALUE.** Hold the Anti tee; snap the collar back. "This is 6.5oz combed ring-spun cotton. Boxy
  stance. Holds through a hundred-plus washes. Tonal black on black, no neon. Made on demand in Austin, so
  nothing rots in a warehouse." [text: 6.5oz · 100-WASH STANCE · MADE IN ATX]
- **45–60s | SOLUTION.** Flat-lay, red accent light. "It reads Anti Chopped Chopped Social Club. Built for the
  veteran, not the algorithm. Vol.01 is 1 of [REDACTED]. No restocks." [text: 1 OF [REDACTED]]
- **60–75s | CTA.** Founder to camera. "The list gets it first. Claim your callsign at choppedunc dot store.
  Then we clock out." [text: JOIN ADVISORY BOARD → choppedunc.store]

**B-roll:** shop light flicker, macro fabric weave, collar snap slow-mo, DTG print close-up, hands folding the
flat-lay, sodium-vapor garage exterior at night.

**Hashtags (18):** #streetwearover40 #heavyweightstreetwear #riptest #agelessstreetwear #ringspuncotton
#streetwearformen #ATXstreetwear #austintexas #nightshift #midnightshift #IYKYK #blackonblack #printondemand
#slowfashion #mechaniclife #skatetok #streetweartiktok #veteranowned

## A.5 SEO BLOG POST (/drop-log)

**Meta title (60):** Heavyweight Streetwear for Men Over 40 - CHOPPED.
**Meta description (155):** Streetwear cut for teenagers fails grown men. See why heavyweight streetwear for
men over 40 uses 6.5oz cotton, boxy stance, and industrial build.

# Heavyweight Streetwear for Men Over 40: Why the Culture Left You Behind

You can love streetwear at 44 and still refuse to dress like a teenager. For a long time, the culture did not
give you that option.

The average hype tee weighs 4.2oz. That is thin enough to read a phone screen through. It was cut for a
19-year-old frame, printed with a logo built to be seen from across a parking lot, and engineered to fall
apart before the next season so you would buy again.

That worked when the audience was 19. The audience is not 19 anymore. This is what heavyweight streetwear for
men over 40 is actually about, and why so few brands build it.

## Streetwear Aged. The Clothes Did Not

The people who built street culture in the 90s and 2000s are in their 40s and 50s now. They still care about
clean silhouette, real heritage, and gear that signals you were there. What changed is the body and the standard.

- Twelve-hour days on concrete floors punish thin, shapeless clothing.
- A 45-year-old fabricator does not want a neon logo screaming for attention.
- Decades of wear taught this buyer the difference between build quality and hype.

The industry answered weakly. It either kept selling teen-cut hype, or pushed grown men toward soft,
apologetic "dad" brands that strip out every trace of street authority. Neither respects the veteran.

## What "Heavyweight" Actually Means

- **Fabric weight.** A 6.5oz combed ring-spun cotton tee has real body. It drapes with structure instead of
  clinging. It reads as intentional, not disposable.
- **Stance.** A boxy, pre-shrunk cut holds shape through repeated washing. It does not shrink two sizes into a
  crop top by month two.
- **Print build.** High-density water-based inks stay bonded. Cheap plastisol screen prints crack and flake.

A heavier tee is about lasting. The difference between 4.2oz and 6.5oz is one season versus several years.

### The 100-Wash Standard

The honest test is simple. Does the collar hold. Does the torso keep its shape. Does the graphic survive. A
proper industrial tee passes that test past 100 wash cycles. That is the bar an over-40 buyer should hold
every brand to.

## Why Boxy Beats Slim for the Over-40 Frame

- It sits clean over a fuller or older frame without clinging.
- It layers over a hoodie or under a jacket without bunching.
- It reads as deliberate, the way workwear and military gear always have.

This is the quiet reason the boxy cut is central to ageless streetwear. It respects the wearer.

## Made on Demand: The Sustainability Angle Nobody Talks About

- Nothing is printed until it is ordered, so there is no dead stock to destroy.
- Water-based, OEKO-TEX certified inks cut the toxic runoff of traditional printing.
- Regional fulfillment shortens shipping distance and carbon.

For a buyer who values things built to last, buying from a brand that refuses to overproduce is part of the
appeal, not a footnote.

## How to Judge an Ageless Streetwear Brand

1. **Fabric weight is published.** If they hide the ounces, assume it is thin.
2. **The cut is described honestly.** Boxy and pre-shrunk, or slim and youth-cut.
3. **Print method is stated.** High-density water-based beats cheap plastisol.
4. **Production is transparent.** On-demand and low-waste, or warehouse overstock.
5. **The brand talks to you, not around you.** Veteran, not teenager.

Most brands fail on the first line.

## The CHOPPED. Position

CHOPPED. builds one thing. Heavyweight streetwear for the 38-plus veteran who still shows up.

The first piece is the "Anti" Graphic Tee. 6.5oz combed ring-spun cotton. A boxy stance built to hold past
100 washes. Tonal black on black, no neon. Printed on demand in Austin with water-based inks. The graphic
reads "Anti Chopped Chopped Social Club." If you get it, you get it.

Vol.01 is a small, numbered drop. No restocks. No pre-orders. The Advisory Board gets access first.

If streetwear left you behind somewhere after 38, this is the gear that came back for you.

**[ JOIN ADVISORY BOARD → choppedunc.store ]**

**Internal links:** "6.5oz combed ring-spun cotton" → Anti Tee PDP · "made-on-demand" → process page ·
"Advisory Board" → `/advisory-board` · manifesto reference → `/manifesto`.
**Keyword placement:** primary in H1, meta, intro, and position section. Secondary across H2s. Density ~2%.
Headers every ~250–300 words for skim readers and AI answer extraction. The buyer's checklist is the section
most likely to earn a snippet / LLM citation (the GEO play).

---

# APPENDIX B — Voice Guardrails

**Governing ban list (union of brand + content-framework):** launch, sale, discount, customer, shopper, user,
collection, season, trendy, must-have, stylish, fashionable, amazing, game-changer, unlock, leverage,
seamlessly, dive into, move the needle. No em-dashes. No semicolons.

**Approved vocab:** Veteran / OG / Unc, Callsign, Clock-In, Chassis / Armor / Gear / Hardware, Friction /
Grind / Midnight / Stance, Acquire / Secure / Deploy, 100-Wash, Zero-Waste, On-Demand. `[REDACTED]` for
quantities and locations.

**Register:** sentences ≤10 words where natural, imperative mood, periods not exclamation marks, monochrome
industrial IYKYK tone. Colors: `#080808` surface, `#000` base, white text, red `#FF0000` as the only accent.
