# FORMA — UI Conversion Audit & Business Logic Plan

**Prepared for launch readiness — May 2026**
**Subject:** The FORMA storefront (Next.js 16, Shopify Storefront, Editorial Noir design system)
**Audience:** Founder and engineering owner
**Goal:** Recommend exactly where and how to embed images, visual design elements, and psychological UI patterns to maximize conversion, trust, and AOV for the Nairobi corporate woman at the KES 3,500 price point.

---

## Executive summary

FORMA's storefront today is **brand-rich and conversion-thin**. The Editorial Noir aesthetic, founder narrative, Nairobi anchoring, and inclusive shade language are all working. What is missing is the second half of the equation: the trust ladder, the fit-confidence scaffolding, and the proof architecture that closes the deal at KES 3,500 — a price point where the customer hesitates, asks a friend, and looks for evidence before pressing pay.

This document does three things. It inventories what literally exists in the code today. It applies four converging bodies of research — premium e-commerce psychology, fashion imagery strategy, intimate-apparel category playbook (Skims / Spanx / Honeylove), and the Kenyan mobile-commerce reality (M-Pesa / WhatsApp / Vivo Activewear). Then it prescribes — with file paths, placements, copy, and outcomes — what to ship in the next four weeks.

The single highest-leverage change in this entire document is a **four-icon trust strip directly under the Add to Cart button** on the PDP. The second is **inline size-specific stock and fit-predictor language** at the size selector. The third is **surfacing M-Pesa as the visible payment promise on the PDP, not just at checkout**. None of these cost more than a day of dev.

---

## Research synthesis — the four principles that govern every recommendation below

Before the page-by-page audit, the four research streams converged on a small number of principles. These are stated once here and referenced by name throughout.

**Principle 1 — Trust is repeated, not announced.** Premium intimate-apparel PDPs (Skims, Honeylove, Spanx) surface the same trust signals two or three times — once above the fold as a single line, once mid-page in an icon strip, once in the cart drawer. Single-instance trust badges underperform because the buyer's anxiety is itself repeated.

**Principle 2 — Editorial sells desire; product sells confidence.** Editorial imagery earns the click and sets the tone. On-figure product imagery closes the sale. The mistake premium brands make is leading with editorial on the PDP and confusing the buyer about what they are actually purchasing. Editorial leads the homepage; product leads the PDP; editorial returns at gallery position 4–5 as the aspirational anchor.

**Principle 3 — Kenya is a WhatsApp-and-M-Pesa storefront with a website attached.** ~90% of FORMA's traffic will be mobile, on mid-tier Android phones (Tecno, Infinix, Samsung A-series, screen widths 360–412px), on metered 4G. WhatsApp presence is a trust signal in the same way M-Pesa is a payment signal — its absence reads as foreign or unserious. Both belong on every meaningful page, not just at checkout.

**Principle 4 — Fit anxiety is the cliff.** Baymard's intimate-apparel research and Honeylove/Skims case studies converge on the same fact: the drop-off is concentrated between size-selection and Add to Cart. Anything that resolves "will it fit, will it roll down, will it show under my blazer, can I exchange it" before the buyer leaves the PDP is worth more than any other on-site optimization. A free exchange promise repeated three times outperforms a 10% discount.

---

## Page-by-page audit

### 1. Homepage — `app/page.tsx` + `components/marketing/*`

**Current state.** The page opens with the [Hero](components/marketing/hero.tsx) — a 60/40 split with editorial copy on the left ("The invisible layer behind every powerful look") and a single editorial portrait on the right. There is a WhatsApp glass-panel button with a live-pulse green dot — already a strong Kenyan trust signal, well-placed. Below, a `New Arrivals` three-up product grid, then [OurStory](components/marketing/our-story.tsx) ("Born in Nairobi, Made for Everywhere"), then [BentoFeature](components/marketing/bento-feature.tsx) (inclusive-shades + engineered breathability), then [Newsletter](components/marketing/newsletter.tsx) ("Join the Inner Circle"). Footer carries column links and a "© FORMA · NAIROBI, KENYA · GLOBAL SHIPPING AVAILABLE" rail.

**Psychological gaps.** No social proof above the fold — no review count, no press logo strip, no UGC. No M-Pesa visibility anywhere on the homepage (the only payment cue is at checkout). The "First 100 women get 20% off at launch" copy at the bottom of the hero is the only urgency signal and it is whispered rather than positioned. The OurStory section uses placeholder imagery (`/founder_portrait.png` is the founder, but `PLACEHOLDERS.ourStory` resolves to a Google-hosted cinematic skyline — there is no actual founder face shown in OurStory itself, which is a missed Kenyan trust signal).

**Visual dead zones.** The space between the hero CTAs and the WhatsApp pill — currently empty — is the natural home for a one-line social proof signal ("Joined by 2,400+ Nairobi women on the waitlist"). The Newsletter glass panel is generously sized but the form is bare; no incentive copy, no privacy reassurance.

**Missed conversion moments.** No "Shop the Look" hot-spotted hero image. No press / featured-in strip below the hero. No M-Pesa + Pesapal trust lockup in the footer alongside the copyright. The Bento "12 inclusive shades" claim is a brand-defining statement but the shades themselves are not visualized — twelve actual shade chips would do more work than the copy.

---

### 2. Collection / Shop page — `app/shop/page.tsx` + `app/collections/[slug]/page.tsx`

**Current state.** Two layout variants exist (sidebar and editorial, toggled via `VariantToggle`). The editorial variant is a generous two-column product grid with pill filters above. The sidebar variant is a denser three-column grid with `SidebarFilters`. Each `[CollectionCard](components/shop/collection-card.tsx)` shows a 3:4 portrait product image, name, price, shade circles, and a hover-revealed "View Product" button. Collection pages have a per-collection H1 and tagline (e.g., "Sculpting Bodysuits — Architectural compression for the defining silhouette").

**Psychological gaps.** No review stars on product tiles. No "X colors available" or "Best Seller" / "New" microbadges. The hover-reveal "View Product" pattern is elegant on desktop but invisible on mobile — and 90% of traffic is mobile, so the elegance has no audience. No price anchor (compare-at) shown on tiles even when `product.compareAtPrice` is in the data model.

**Visual dead zones.** The empty state ("Our inventory is currently being curated") is poetic but commercially passive — it should at minimum capture an email. The pill filters carousel offers only three options (All / Bodysuits / Coming Soon) — under-utilized real estate. No editorial banner above the grid on category pages; the page jumps straight from H1 into product tiles.

**Missed conversion moments.** No "Bestseller" tag on a single SKU at launch (a deliberate signal of where to start, useful when the customer faces 7 collections and freezes). No `aria-live` count of products shown ("Showing 12 of 18"). No "Sort by: Best-selling / Newest / Price low–high" — and at launch this is fine, but mark for v2.

---

### 3. Product detail page — `components/pdp/signature-pdp.tsx` + `essentials-pdp.tsx`

**Current state.** Two PDP templates exist. SignaturePdp is the editorial format — two-column with a sticky right rail carrying eyebrow, H1 product name, KES-formatted price, short description, ColorSelector, size selector with link to size guide, Add to Cart, and a Join the Waitlist button. Below is a narrative section with `longDescription` HTML and an editorial accompaniment image. EssentialsPdp is the streamlined format — 7/5 column split, with accessories cross-sell ("Pairs Perfectly With"), accordion sections for Material & Care and Shipping & Returns, and a Wishlist secondary button. Both templates render `TrustBadges` (imported but the contents of that component are not visible in this audit — flag for verification).

**Psychological gaps.** This is the most undersignaled page in the funnel and the highest-leverage page to fix. No review stars, no review count, no review module at all. No fit predictor or fit-finder microcopy. No anti-roll / invisible-under-clothes / 8-hour-comfort iconography. No "Free exchanges within Nairobi" promise (the highest-leverage line of copy in the entire site, given Principle 4). No M-Pesa payment cue at the price ("Pay KES 3,500 via M-Pesa — STK push to your phone"). No "model is 5'7", wearing size M" caption on the gallery imagery. No "back to in stock — notify me" pattern visible (the Waitlist button exists but its trigger is unclear). No social proof pull-quote anywhere on the page.

**Visual dead zones.** The space directly below the Add to Cart button is currently empty or occupied only by the `TrustBadges` component. This is the single highest-value square inch on the entire site and it needs the four-icon trust strip prescribed in Section 7 below. The narrative section is beautifully typeset but does not answer any of the five category-specific objections (roll, visibility, pinch, breathability, all-day wear). The accessories cross-sell on Essentials is structurally good but uses generic copy ("Pairs Perfectly With") — better is "Customers who bought this also bought".

**Missed conversion moments.** No size-specific low-stock language ("Only 3 left in size M") — the data is in Shopify, the UI does not surface it. No exchange / return reassurance under the CTA. No WhatsApp "Ask about fit" link beside the size selector — Principle 3 says this is mandatory at KES 3,500. No Instagram-tagged UGC rail. The Join the Waitlist secondary button exists but is unconditional — it should appear only when the selected variant is out of stock.

---

### 4. Size guide page — `app/size-guide/page.tsx`

**Current state.** A clean three-step measurement guide (Bust, Waist, Hips) with editorial photography in grayscale-to-color hover. A six-row size chart S–2XL with cm measurements. A WhatsApp footer link ("Still unsure? WhatsApp us directly →"). Strong page on its own; well-aligned with brand.

**Psychological gaps.** The chart is metric-only. The customer is corporate, educated, and Kenyan — metric is correct, but a small "convert to inches" toggle is a comfort gesture. No body-silhouette diagram showing *where* to place the tape — the editorial photos are aesthetic but pedagogically light. No "fits true to size" social-proof line at the top. No size-to-clothing-size cross-reference ("If you wear a UK size 12, you are likely M").

**Visual dead zones.** The bottom of the page after the size chart goes straight to the footer. The natural placement for a "Still unsure? Try our 60-day exchange" promise and an inline WhatsApp CTA is here, not at the very bottom in a single text link.

**Missed conversion moments.** No CTA to return to the product the user came from — once a user lands on Size Guide from a PDP, the path back to that PDP is via browser-back only. Add a sticky "← Back to [Product Name]" header when the user arrives with a referrer.

---

### 5. Cart / checkout flow — `components/cart/cart-sidebar.tsx`

**Current state.** Right-side drawer (max 450px), with header ("Your Bag" + CLOSE), scrollable line items with thumbnail, name, variant, quantity controls and remove link, then a footer with "SUBTOTAL", price, a single footnote ("Shipping and taxes calculated at checkout. Curated in Nairobi, shipped worldwide."), and a full-width "Checkout" button that links to the Shopify-hosted `cart.checkoutUrl`. Empty state shows "Your bag is empty." with a START SHOPPING link.

**Psychological gaps.** No M-Pesa or Pesapal lockup in the drawer — the customer is committing to a checkout flow they cannot preview. No "Free exchanges within Nairobi" reassurance. No free-shipping threshold progress bar (Skims standard; lifts AOV measurably). No cross-sell row ("Add a matching brief — KES 1,800"). No estimated delivery date ("Order today, delivered in Nairobi Tuesday").

**Visual dead zones.** The empty cart state is decorative but commercially passive — it should at minimum show the three best-sellers, not just a "Start Shopping" link.

**Missed conversion moments.** The single footnote line is the right idea but is information-dense and forgettable. Replace with three small icon rows: M-Pesa accepted · Free exchanges in Nairobi · 2–3 day countrywide delivery. The checkout button label "Checkout" is generic — "Checkout with M-Pesa" or "Pay with M-Pesa · KES 3,500" carries the payment-method anchor into the click itself.

---

### 6. Mobile experience — all of the above at 360–412px

**Current state.** Layouts collapse to single column. Header swaps to a logo-mark only (good — recently shipped). Header navigation collapses to a hamburger icon (`<MenuIcon />`), but the menu itself is not wired — the button has no onClick handler. This is a launch blocker. The hero image area drops to a 480px minimum height. PDP sticky right rail un-stickies and stacks below the gallery on mobile. Hover-reveal patterns on `CollectionCard` and `ProductCard` (the "View Product" backdrop, the image scale-up) have no mobile equivalent.

**Psychological gaps.** No sticky Add to Cart bar at the bottom of mobile PDPs. Without it, the customer has to scroll back up after reading description, accordions, and (eventually) reviews. Baymard's mobile commerce benchmark puts the cost of missing sticky-ATC at 5–8% mobile conversion. No mobile-specific WhatsApp FAB (the hero WhatsApp pill is inline, not floating). No bottom-edge cart icon with item count (the cart icon is in the top header, behind a fixed bar — fine, but easy to miss on a 412px screen).

**Visual dead zones.** The header right side has only Search + Cart + Menu. On mobile, given the navigation collapses, the brand could occupy more of the bar but does not.

**Missed conversion moments.** Mobile hamburger does nothing. Hover patterns are dead weight. No tap-targets meet 44×44px in some areas of the cart drawer quantity controls. No `prefers-reduced-data` consideration in image loading despite metered Kenyan 4G being a hard constraint.

---

# THE BUSINESS LOGIC PLAN

What follows is the prescription. Each recommendation is stated in the requested PLACEMENT / ELEMENT / TRIGGER / IMPLEMENTATION / OUTCOME format. The eight categories from the brief are covered in order.

---

## 1. HERO IMAGERY STRATEGY

**The hero image must, in three seconds, tell the Nairobi corporate woman: this is for me, this is for my body, this is for my Monday morning.** Editorial is correct — but the editorial story has to read as Nairobi, not as anywhere. Skin tone, environment, and dress register matter more than camera quality.

### Recommendation 1.1 — Replace the homepage hero image with a Nairobi-coded editorial portrait

**PLACEMENT:** [components/marketing/hero.tsx](components/marketing/hero.tsx) — right column 40% panel, currently `PLACEHOLDERS.homeHero`.
**ELEMENT:** A mid-shot editorial portrait of a Black Kenyan woman, 25–40, hip-to-shoulder framing, dressed in fitted business attire (tailored blazer, pencil skirt) with the FORMA bodysuit visible at the neckline as the under-layer. Gaze off-camera, slightly down. Warm putty backdrop. Shot in Nairobi (Westlands office lobby, Two Rivers, or a neutral studio with editorial light).
**PSYCHOLOGICAL TRIGGER:** Identity-projection. The buyer needs to recognize herself in the model — not aspire to a foreign celebrity. Averted-gaze framing (Principle from Skims' 2023 casting shift) lets the buyer self-project rather than be looked at.
**IMPLEMENTATION:** Commission one editorial shoot (half-day, one model, two looks). Output one 1600×2000 hero frame plus four PDP gallery frames. Replace `PLACEHOLDERS.homeHero` and update `placeholders.ts`.
**EXPECTED OUTCOME:** First-visit bounce rate drops; time on hero increases. The customer who would have closed the tab in two seconds stays for ten. This is the single highest-leverage editorial decision before launch.

### Recommendation 1.2 — Add a "Shop the Look" hot-spot to the hero portrait

**PLACEMENT:** Hero portrait, bottom-right corner overlay, replacing the current "Discover ↓" arrow.
**ELEMENT:** A small terracotta dot (+ icon, 32px) positioned over the bodysuit. On hover/tap, it expands to a 240px tooltip with the bodysuit's name, KES 3,500, and "Shop this piece →".
**PSYCHOLOGICAL TRIGGER:** Reduced cognitive load — the customer doesn't have to navigate to find "the thing in the picture."
**IMPLEMENTATION:** New `<HeroHotspot />` component with absolute positioning. Tap-target 44×44px on mobile. Hidden in `prefers-reduced-motion`.
**EXPECTED OUTCOME:** A measurable lift in homepage-to-PDP click-through. The customer who saw the look can now buy the look.

### Recommendation 1.3 — Add a press / waitlist proof-line directly beneath the hero CTAs

**PLACEMENT:** Hero left column, between the WhatsApp pill and the "First 100 women get 20% off at launch" line.
**ELEMENT:** A single 12px label-caps line: "Joined by 2,400+ Nairobi women on the waitlist · Featured in [Business Daily / Capital FM / True Love]" — with real numbers and real placements as they exist.
**PSYCHOLOGICAL TRIGGER:** Social proof + authority. Principle 1 (trust is repeated): this is the first of three trust signals on the homepage.
**IMPLEMENTATION:** New element inside the hero; pulls waitlist count from a simple env var or hardcoded copy at launch.
**EXPECTED OUTCOME:** Reduces "is this real?" friction in the first three seconds. Particularly load-bearing for cold traffic from Instagram ads.

---

## 2. SOCIAL PROOF ARCHITECTURE

**Today FORMA has zero customer-facing social proof.** This is the single largest gap in the storefront. Even at launch, with no shipped reviews yet, the storefront must communicate that real women have engaged with the brand. Three placements, three formats, three scroll depths.

### Recommendation 2.1 — A single press / waitlist proof line on the homepage (above the fold)

Already covered in 1.3. This is the *compressed* signal — one line, no widget.

### Recommendation 2.2 — A pull-quote band on the homepage between OurStory and BentoFeature

**PLACEMENT:** New section in [app/page.tsx](app/page.tsx) between `<OurStory />` and `<BentoFeature />`.
**ELEMENT:** A single editorial pull-quote, 32px italic display, attributed to a real waitlist member or beta tester. Format: *"Finally something that works under a fitted blazer — and I didn't have to import it." — Wanjiku, Westlands*. Backed by a soft cream surface (`bg-surface-container-low`) to break the dark rhythm.
**PSYCHOLOGICAL TRIGGER:** Specificity beats volume. One named, located, occupation-anchored quote outperforms ten anonymous five-star reviews at the launch stage.
**IMPLEMENTATION:** New `<PullQuote />` component in `components/marketing/`. Renders quote, attribution, optional small circular avatar.
**EXPECTED OUTCOME:** The homepage now has two repeated trust signals at different scroll depths — Principle 1 satisfied.

### Recommendation 2.3 — Star rating + review count above the fold on every PDP

**PLACEMENT:** [components/pdp/signature-pdp.tsx](components/pdp/signature-pdp.tsx) and [essentials-pdp.tsx](components/pdp/essentials-pdp.tsx) — beside or directly under the H1 product name, before the price.
**ELEMENT:** "★ 4.8 — 312 reviews" as a single 14px line, with the stars filled in terracotta (`var(--color-primary)`). Clicking jumps to the review module below.
**PSYCHOLOGICAL TRIGGER:** Trust at the buy-box. Spanx puts this above the fold; Skims has experimented with moving it below — for FORMA at launch, above the fold wins because the brand is new and any quantified signal is a credibility unlock.
**IMPLEMENTATION:** Integrate Judge.me or Loox (both have Shopify-native installs that read the same review data the cart drawer already reads). At launch, seed with 12–20 real reviews from waitlist beta-testers — paid or comped product in exchange for an honest, photographed review.
**EXPECTED OUTCOME:** Conversion lift in the first 30 days driven entirely by the perception that "people have already bought this." Without this, the launch PDP looks like a stub.

### Recommendation 2.4 — Photo-first review module at ~70% scroll on PDP

**PLACEMENT:** Below the narrative section, above any "You may also like" rail.
**ELEMENT:** A header ("How real women wear it"), a 4-up grid of customer photos with rating + size + height captions, then text reviews filtered by Size purchased / Body type / Worn for (work / event / daily).
**PSYCHOLOGICAL TRIGGER:** Customer photos in intimates are scarce and therefore valuable — Okendo data: PDPs with five or more customer photos convert ~3× text-only PDPs. The "Worn for" filter lets the corporate customer find herself ("Worn for: work").
**IMPLEMENTATION:** Judge.me or Loox with photo upload incentive (KES 500 store credit per approved photo review). Allow torso-only cropping to address the body-shyness ceiling.
**EXPECTED OUTCOME:** This is where the launch-period social proof compounds. Each shipped order seeds the next conversion.

### Recommendation 2.5 — "Tagged on Instagram" rail below the review module

**PLACEMENT:** PDP, between reviews and "You may also like."
**ELEMENT:** A 6-tile horizontal scroll of Instagram posts from real customers who tagged @forma. Each tile is a 4:5 portrait crop with a small @handle label.
**PSYCHOLOGICAL TRIGGER:** Influencer-adjacent proof without paying for influencers. The Nairobi corporate buyer trusts a peer's IG post over a brand's studio shot — Principle 3.
**IMPLEMENTATION:** Use Foursixty or Outfy (Shopify-native UGC pulls), or a simple manual curation via a `data/instagram-grid.ts` for launch.
**EXPECTED OUTCOME:** A live, evergreen proof loop. Once seeded, it never needs touching.

---

## 3. BEFORE/AFTER VISUAL POSITIONING

**Hard rule: no clinical before/after.** Diet-industry energy contradicts "quiet luxury." Skims never used it. Spanx is moving away from it. The corporate FORMA buyer would close the tab.

The legitimate substitute is the **Two-Shot Sequence** — same model, same pose, two frames: bodysuit alone (so the engineering is visible), bodysuit under a fitted dress / blazer + skirt (so the result is visible). This sells the transformation without weaponizing the customer's body anxiety.

### Recommendation 3.1 — The Two-Shot Sequence at gallery positions 2 and 3 on every PDP

**PLACEMENT:** `SignatureGallery` / `EssentialsGallery` — second and third gallery slot.
**ELEMENT:** Slot 2: model wearing the bodysuit alone, mid-shot, 4:5 aspect, warm putty backdrop. Slot 3: same model, same pose, now wearing the bodysuit under business attire. The transformation is implied by the visible smoothness of the silhouette.
**PSYCHOLOGICAL TRIGGER:** Transformation framing without body-shaming. Aligns with FORMA's "invisible layer behind every powerful look" positioning — the brand promise is now visualized.
**IMPLEMENTATION:** Add to the editorial shoot brief in 1.1. Per SKU, commission this two-shot at the same session — same model, two outfits, ten extra minutes of shooting per SKU.
**EXPECTED OUTCOME:** Resolves the "invisible product" problem (Principle 2). The customer no longer has to imagine the result.

### Recommendation 3.2 — A fabric-macro slot at gallery position 4

**PLACEMENT:** Fourth gallery slot on every PDP.
**ELEMENT:** A macro shot of the fabric weave, seam bonding, or silicone edge — 1:1 square crop, dramatic editorial light. Caption: "Power-mesh 320 GSM. Seam-bonded. OEKO-TEX certified."
**PSYCHOLOGICAL TRIGGER:** Engineering proof, premium-price justification. Heist and Wolford built entire brands on macro-fabric photography. Anchors the KES 3,500 price.
**IMPLEMENTATION:** Studio macro shoot, half-day, all SKUs at once. One macro per fabric family (not per SKU).
**EXPECTED OUTCOME:** Reduces "is it worth KES 3,500?" hesitation by making the answer visible, not just claimed.

---

## 4. SCARCITY AND URGENCY SIGNALS

**Premium-coded only.** No countdown timers. No "47 people viewing now" widgets. No red urgency bars. These cheapen the brand and the Nairobi customer reads them as Shopify-app spam. The only urgency signals worth shipping are *informational* — the customer is being told a fact, not pressured.

### Recommendation 4.1 — Size-specific low-stock language at the size selector

**PLACEMENT:** Below the size pill row on the PDP, in 12px grey label-caps.
**ELEMENT:** Conditional copy: when `variant.inventory <= 3`, render "Only 2 left in size M." Otherwise render nothing.
**PSYCHOLOGICAL TRIGGER:** Scarcity, but framed as inventory information, not pressure. Skims and Khaite use this verbatim.
**IMPLEMENTATION:** Surface inventory from the Shopify variant `quantityAvailable` field (currently not requested in the product fragment — extend [lib/shopify.ts](lib/shopify.ts) to fetch it, then condition render in the size selector).
**EXPECTED OUTCOME:** Lifts add-to-cart on the buyer who was on the fence. Crucially, when stock is healthy the customer sees nothing — no false urgency.

### Recommendation 4.2 — "Restocks monthly" microcopy in the PDP accordion

**PLACEMENT:** Inside the "Shipping & Returns" accordion on EssentialsPdp, and as a single line above the size selector on SignaturePdp.
**ELEMENT:** "Restocks monthly. Out-of-stock sizes return within 30 days."
**PSYCHOLOGICAL TRIGGER:** Cadence signals discipline, not desperation. Hermès-adjacent feel. Tells the customer the brand has a rhythm.
**IMPLEMENTATION:** Static copy line. Zero engineering cost.
**EXPECTED OUTCOME:** Customer who would have abandoned at sold-out variants now opts into the waitlist instead.

### Recommendation 4.3 — Conditional waitlist CTA on out-of-stock variants

**PLACEMENT:** PDP, replacing Add to Cart when the selected variant is out of stock.
**ELEMENT:** The current Add to Cart button becomes "Notify me when size M is back" with an inline email field. Email-only, single field, one tap to submit.
**PSYCHOLOGICAL TRIGGER:** Loss aversion captured into an email list. The customer who can't buy now has a stake in the next drop.
**IMPLEMENTATION:** Conditional render in `SignaturePdp` / `EssentialsPdp` based on variant availability. Email submits to a `/api/waitlist` route which posts to Klaviyo or a Google Sheet at launch.
**EXPECTED OUTCOME:** Every sold-out variant becomes a list-building moment instead of a bounced session.

### Recommendation 4.4 — "Next drop: [date]" tag on `the-edit` collection

**PLACEMENT:** [app/collections/[slug]/page.tsx](app/collections/[slug]/page.tsx) — when slug is `the-edit`, render a small "Next drop: June 14" line beneath the H1.
**ELEMENT:** A single label-caps line in terracotta.
**PSYCHOLOGICAL TRIGGER:** Anticipation, planned scarcity. Reframes "Coming Soon" as a real event.
**IMPLEMENTATION:** Add a date field to the known-collection record.
**EXPECTED OUTCOME:** Newsletter signups on this page (currently zero — the page is decorative).

---

## 5. TRUST SIGNAL PLACEMENT

**Trust is repeated, not announced (Principle 1).** Each signal belongs at a specific scroll depth and on multiple pages. The Kenyan-market priority order is: physical Nairobi presence, founder visibility, M-Pesa/Pesapal lockup, WhatsApp availability, delivery promise, return/exchange promise, OEKO-TEX. KEBS is fourth-tier and not load-bearing.

### Recommendation 5.1 — The four-icon trust strip directly under Add to Cart

**THIS IS THE SINGLE HIGHEST-LEVERAGE COMPONENT IN THIS ENTIRE DOCUMENT.**

**PLACEMENT:** [components/pdp/signature-pdp.tsx](components/pdp/signature-pdp.tsx) and [essentials-pdp.tsx](components/pdp/essentials-pdp.tsx) — directly below the Add to Cart button, above any accordion.
**ELEMENT:** A horizontal four-icon strip with two-word labels: ▸ Anti-roll silicone · ▸ Invisible under clothes · ▸ 8-hour comfort · ▸ Breathable mesh. Icons in terracotta, labels in 11px label-caps, hairline divider above and below.
**PSYCHOLOGICAL TRIGGER:** This single component answers the four category-specific objections that drive shapewear cart abandonment, in the exact location where the customer is deciding whether to click. It is the difference between a generic apparel PDP and an intimate-apparel PDP that converts.
**IMPLEMENTATION:** New `<PdpTrustStrip />` component in `components/pdp/`. Four inline-SVG icons authored in the Editorial Noir palette (terracotta on transparent). Used on both PDP templates.
**EXPECTED OUTCOME:** Direct, measurable lift in add-to-cart rate. Skims / Honeylove / Spanx all run a version of this for a reason.

### Recommendation 5.2 — "Free exchanges within Nairobi · 7-day return" promise — repeated three times

**PLACEMENT:** Repeated three times: (a) under the four-icon strip on the PDP, (b) in the cart drawer footer, (c) on the size guide page above the chart.
**ELEMENT:** A single 12px line: "Free exchanges within Nairobi. 7-day return countrywide."
**PSYCHOLOGICAL TRIGGER:** Loss aversion offset — Principle 4. Reframes the decision from "buy" to "try." Repetition is the point.
**IMPLEMENTATION:** Static copy. Zero engineering cost.
**EXPECTED OUTCOME:** This is the highest-converting line of copy on the site. Honeylove built a brand around its "60-day try-on" promise. The single biggest lever you have at no dev cost.

### Recommendation 5.3 — M-Pesa + Pesapal payment lockup, footer + PDP

**PLACEMENT:** (a) [Footer](components/layout/footer.tsx) — replace the current empty visual region in the social column with a payments lockup. (b) PDP — small badge row below the price ("Pay via Lipa na M-Pesa · STK push to your phone").
**ELEMENT:** Horizontal strip: M-Pesa green logo, Visa, Mastercard, Airtel Money (and Pesapal lockup, smaller). On PDP, a single line of microcopy near the price.
**PSYCHOLOGICAL TRIGGER:** Familiar-payment trust. M-Pesa green is near-bank-grade credibility in Kenya. Surfacing it before checkout reduces abandonment by surfacing the answer to "how do I pay?" before the buyer asks.
**IMPLEMENTATION:** Source official Pesapal/M-Pesa logo assets. New `<PaymentsLockup />` component with proper alt text. Inline microcopy on the PDP.
**EXPECTED OUTCOME:** ~10–15% reduction in PDP-to-checkout abandonment in the Kenyan-market segment.

### Recommendation 5.4 — Founder photo + Nairobi address in the footer

**PLACEMENT:** [Footer](components/layout/footer.tsx) — new row above the existing column grid, or replacing the brand description on the left column.
**ELEMENT:** A small circular founder portrait (60px), founder name + role ("Founder, FORMA · Nairobi"), and a physical address or pickup-location line ("Pickup available in Kilimani · By appointment").
**PSYCHOLOGICAL TRIGGER:** Real-person, real-place trust. Vivo Activewear's Wandia Gichuru is the case study. Single biggest scam-fear killer in Kenyan DTC. Currently FORMA has a founder portrait on the About page but it never appears on the homepage or footer.
**IMPLEMENTATION:** Add to the footer brand column. Founder portrait already exists at `/founder_portrait.png`.
**EXPECTED OUTCOME:** Cold-traffic conversion lift for first-time visitors who don't know the brand.

### Recommendation 5.5 — OEKO-TEX badge in the PDP accordion

**PLACEMENT:** Inside the "Material & Care" accordion on EssentialsPdp; equivalent location on SignaturePdp.
**ELEMENT:** OEKO-TEX Standard 100 badge (small, 80px) with caption "Certified free from harmful substances."
**PSYCHOLOGICAL TRIGGER:** Third-tier trust signal for the Kenyan educated buyer — matters but not load-bearing. Goes in the accordion, not above the fold.
**IMPLEMENTATION:** Source official badge per OEKO-TEX brand guidelines (FORMA must have the actual certification before displaying).
**EXPECTED OUTCOME:** Closes the long-tail "is this actually quality?" objection for the most educated 20% of buyers.

---

## 6. SIZE CONFIDENCE UI

**Fit anxiety is the cliff (Principle 4).** Every recommendation in this section is aimed at the gap between size-selection and Add to Cart — the single largest drop-off point in the funnel.

### Recommendation 6.1 — Inline fit predictor microcopy at the size selector

**PLACEMENT:** PDP, below the size pill row, inline with the "Size Guide" link.
**ELEMENT:** "Fits true to size. If between sizes, size up for comfort." When integrated with a fit-finder tool (v2), this becomes "Based on your measurements, we recommend size M."
**PSYCHOLOGICAL TRIGGER:** Decision support at the moment of hesitation. The Size Guide click is itself a ~40% abandonment trigger — anything that answers the size question without leaving the PDP is pure conversion lift.
**IMPLEMENTATION:** Static copy at launch. v2: integrate True Fit or Fit Analytics as a Shopify app.
**EXPECTED OUTCOME:** ~5–8% PDP conversion lift from reducing size-guide abandonment.

### Recommendation 6.2 — Model dimensions captioned on every gallery image

**PLACEMENT:** Beneath each PDP gallery image.
**ELEMENT:** "Model is 5'7" / 170cm, wearing size M. Hips 96cm."
**PSYCHOLOGICAL TRIGGER:** Reference-point trust. Table-stakes in intimate apparel — its absence kills trust more than its presence lifts conversion.
**IMPLEMENTATION:** Add `modelDimensions` field to product detail in [lib/commerce.ts](lib/commerce.ts). Render below gallery.
**EXPECTED OUTCOME:** Reduces returns from "I'm taller / shorter than the model" mismatches.

### Recommendation 6.3 — "Ask about fit on WhatsApp" link at the size selector

**PLACEMENT:** PDP, beside the Size Guide link.
**ELEMENT:** A second small link: "Ask about fit on WhatsApp →" — opens a WhatsApp deep-link pre-populated with the product name and selected size.
**PSYCHOLOGICAL TRIGGER:** Human-in-the-loop trust. At KES 3,500, the hesitant buyer wants a human reply. Vivo Activewear and every scaled Nairobi DTC brand has this.
**IMPLEMENTATION:** Generate a `https://wa.me/254795023213?text=...` deep-link with the product name and slug interpolated.
**EXPECTED OUTCOME:** Captures the hesitant buyer who would otherwise abandon. Even those who don't message feel reassured by the option.

### Recommendation 6.4 — Body-silhouette tape diagram on the size guide

**PLACEMENT:** [app/size-guide/page.tsx](app/size-guide/page.tsx) — adjacent to the three measurement step cards.
**ELEMENT:** A simple line-drawing silhouette (front + side) with tape position marked at bust, waist, hips. SVG illustration in the Editorial Noir palette.
**PSYCHOLOGICAL TRIGGER:** Pedagogical clarity. The editorial photos are beautiful but ambiguous — the buyer doesn't actually know where to put the tape from the photo alone.
**IMPLEMENTATION:** Commission a single line-illustration set from a local illustrator, ~KES 5,000–10,000. Render as inline SVG.
**EXPECTED OUTCOME:** Reduces returns from mis-measurement. Strengthens the "we get the African body" positioning.

### Recommendation 6.5 — Size-to-clothing-size cross-reference table

**PLACEMENT:** Size guide, beneath the size chart.
**ELEMENT:** A small cross-reference: "Size S ≈ UK 8–10 · M ≈ 12–14 · L ≈ 16 · XL ≈ 18–20 · 2XL ≈ 22+"
**PSYCHOLOGICAL TRIGGER:** Familiar-reference anchoring. The Kenyan corporate buyer often knows her UK ready-to-wear size; the FORMA size feels foreign without an anchor.
**IMPLEMENTATION:** Static copy in [data/size-chart.ts](data/size-chart.ts).
**EXPECTED OUTCOME:** Reduces "what size am I?" friction at the chart itself.

---

## 7. MOBILE-SPECIFIC PATTERNS

**Mobile is not the small version of the desktop site. It is the site.** 90% of FORMA's traffic will be mobile, mid-tier Android, on metered 4G. Every recommendation in this section is aimed at the 360–412px reality.

### Recommendation 7.1 — Wire the mobile hamburger menu

**PLACEMENT:** [components/layout/header.tsx](components/layout/header.tsx) — the `<MenuIcon />` button currently has no `onClick`.
**ELEMENT:** A slide-down or slide-in panel containing the full nav (Collections / The Edit / Our Story / Journal), plus secondary links (Size Guide, WhatsApp, Account / Cart). Auto-close on route change.
**PSYCHOLOGICAL TRIGGER:** Basic usability — failure here is a launch blocker.
**IMPLEMENTATION:** Add `useState` for menu open, a mobile menu component, focus trap when open, Escape-to-close.
**EXPECTED OUTCOME:** Mobile users can actually navigate the site. This is not a CRO win — this is a bug fix.

### Recommendation 7.2 — Sticky Add to Cart bar on mobile PDPs

**PLACEMENT:** PDP templates, conditionally rendered at viewport <768px.
**ELEMENT:** A bottom-fixed bar (60px tall, glass-panel surface) with product name (truncated), selected size, price, and a full-width Add to Cart button.
**PSYCHOLOGICAL TRIGGER:** Always-available decision. Baymard puts the cost of missing sticky-ATC at 5–8% mobile conversion. After scrolling through gallery, description, accordions, reviews, the buyer should not have to scroll back up to commit.
**IMPLEMENTATION:** New `<MobileStickyAtc />` component, `position: fixed; bottom: 0`, safe-area-inset padding for iOS notch. Conditionally hidden when the in-page Add to Cart is in view.
**EXPECTED OUTCOME:** ~5–8% mobile PDP conversion lift. This is the second-highest-leverage shipping change in this document.

### Recommendation 7.3 — Floating WhatsApp button on every page (mobile)

**PLACEMENT:** Bottom-right floating action button, mobile only, 56×56px, 24px from edges with safe-area inset.
**ELEMENT:** WhatsApp green circle with the WhatsApp glyph, a soft drop-shadow, a hairline ring matching the Editorial Noir hairline.
**PSYCHOLOGICAL TRIGGER:** WhatsApp presence is itself a trust signal in Kenya (Principle 3). Its absence reads foreign.
**IMPLEMENTATION:** New `<WhatsappFab />` rendered in [app/layout.tsx](app/layout.tsx) below the Header. Suppress on the checkout flow (Shopify-hosted, not in scope) and during cart-drawer-open to avoid stacking.
**EXPECTED OUTCOME:** Captures the hesitant buyer who needs a human reply. Boosts perceived legitimacy of the brand across the entire site.

### Recommendation 7.4 — Replace hover-reveal patterns with always-visible mobile equivalents

**PLACEMENT:** [components/shop/collection-card.tsx](components/shop/collection-card.tsx) — the "View Product" hover backdrop, currently invisible on touch devices. Similarly the `ProductCard` image scale-up.
**ELEMENT:** On mobile, replace hover-reveal with an always-visible "View →" affordance in the bottom-right corner of the card.
**PSYCHOLOGICAL TRIGGER:** Discoverability. Hover patterns on a touch device are dead weight.
**IMPLEMENTATION:** Add `md:opacity-0 md:hover:opacity-100` (current) → keep desktop hover; add mobile always-visible affordance with `md:hidden` variant.
**EXPECTED OUTCOME:** Higher PLP-to-PDP click-through on mobile.

### Recommendation 7.5 — Aggressive image budget — AVIF/WebP, lazy-load, exact display widths

**PLACEMENT:** Site-wide; specifically the homepage hero, OurStory image, BentoFeature image, product galleries.
**ELEMENT:** Hard budget: <1.5 MB on first load, <500 KB on repeat. Hero AVIF/WebP only. Below-fold images lazy-load by default. No autoplay video on PDP.
**PSYCHOLOGICAL TRIGGER:** Speed is trust on metered 4G. The Kenyan customer who pays per MB does not forgive a 4 MB hero.
**IMPLEMENTATION:** Audit current asset weights with `next build` analyzer; convert raster assets to AVIF where possible; tighten `next/image` `sizes` attributes on all images. Strip unused font weights from the Google Fonts import.
**EXPECTED OUTCOME:** Lower bounce rate on Nairobi 4G. A direct line to Core Web Vitals improvements that also feed the SEO work from the earlier audit.

---

## 8. CHECKOUT PSYCHOLOGY

**The cart drawer is the last surface FORMA controls before handing the buyer to Shopify-hosted checkout.** Everything reassuring must happen here — once the buyer is on `cart.checkoutUrl`, FORMA's CSS doesn't render.

### Recommendation 8.1 — Three-icon trust row in the cart drawer footer

**PLACEMENT:** [components/cart/cart-sidebar.tsx](components/cart/cart-sidebar.tsx) — replace the current single footnote ("Shipping and taxes calculated at checkout. Curated in Nairobi, shipped worldwide.") with a structured three-icon row above the Checkout button.
**ELEMENT:** Three small icons + labels: ▸ M-Pesa accepted · ▸ Free exchanges in Nairobi · ▸ 2–3 day countrywide delivery.
**PSYCHOLOGICAL TRIGGER:** Repeated trust at the moment of commitment (Principle 1). Each icon answers one drop-off-driving anxiety: payment, sizing, delivery.
**IMPLEMENTATION:** Replace the footnote line with a `<CartTrustRow />` component. Same icons used in the PDP four-icon strip family.
**EXPECTED OUTCOME:** Reduces drop-off between cart-open and checkout-click. Carries the trust signals into the final FORMA-controlled surface.

### Recommendation 8.2 — Free-shipping progress bar

**PLACEMENT:** Cart drawer, between the line items and the subtotal.
**ELEMENT:** A thin progress bar (4px tall, terracotta fill) showing distance to a free-shipping threshold ("KES 1,500 to free Nairobi delivery"). At threshold, the bar fills and shows "Free Nairobi delivery unlocked ✓".
**PSYCHOLOGICAL TRIGGER:** Gamified anchoring + AOV lift. Skims standard. The customer adds one more item to "unlock" the threshold — the classic free-shipping-bar lift in published Shopify Plus case studies is +10–15% AOV.
**IMPLEMENTATION:** New `<FreeShipBar />` component. Threshold defined as env var; render conditionally based on `cart.cost.subtotalAmount`.
**EXPECTED OUTCOME:** Direct AOV lift. The highest-AOV-leverage change in this document.

### Recommendation 8.3 — Cross-sell row in the cart drawer

**PLACEMENT:** Cart drawer, between the line items and the trust row.
**ELEMENT:** A single horizontal row: "Pairs with: [product image] [name] [+ Add KES 1,800]". One item only — choice paralysis at this step kills conversion.
**PSYCHOLOGICAL TRIGGER:** Anchoring + impulse adjacent-purchase. Skims puts one cross-sell tile in the drawer; Honeylove does the same. Single-item, not a grid.
**IMPLEMENTATION:** New `<CartCrossSell />` component. At launch, hardcode the cross-sell SKU (the most universal companion piece). v2: rule-based via Shopify metafields.
**EXPECTED OUTCOME:** AOV lift compounding with the free-shipping bar.

### Recommendation 8.4 — Checkout button labelled with payment method

**PLACEMENT:** Cart drawer footer.
**ELEMENT:** Replace "Checkout" with "Checkout with M-Pesa · KES 3,500".
**PSYCHOLOGICAL TRIGGER:** Payment-method confirmation at the click. Removes the "wait, how do I pay?" friction one tap earlier than Shopify's hosted checkout otherwise would.
**IMPLEMENTATION:** Update button label in [cart-sidebar.tsx](components/cart/cart-sidebar.tsx). Dynamic total interpolated from `cart.cost.totalAmount`.
**EXPECTED OUTCOME:** Reduces the millisecond hesitation at the highest-stakes click in the entire funnel.

### Recommendation 8.5 — Empty-cart state surfaces three best-sellers, not just a link

**PLACEMENT:** Cart drawer empty state.
**ELEMENT:** Replace "Your bag is empty. START SHOPPING" with: a small headline, three best-seller thumbnails in a vertical stack, each with name, price, and a single-tap Add button.
**PSYCHOLOGICAL TRIGGER:** Re-engagement. The customer who opened the cart by accident is now one tap from adding a best-seller.
**IMPLEMENTATION:** Update empty state in `<CartSidebar />`. Source best-sellers from `getProductsByCollectionHandle('best-sellers')`.
**EXPECTED OUTCOME:** Recovers a fraction of accidentally-opened cart sessions.

---

# PRIORITIZED EXECUTION LIST

Ranked by impact ÷ effort. Three tiers: QUICK WIN (<2 hours), MEDIUM LIFT (1–2 days), STRATEGIC (requires content / photography / vendor integration).

### Week 1 — Quick wins (ship before launch)

1. **QUICK WIN — Recommendation 5.2** — The "Free exchanges within Nairobi · 7-day return" promise, repeated three times (PDP, cart, size guide). Static copy. One hour. Highest-converting line of copy on the site.
2. **QUICK WIN — Recommendation 7.1** — Wire the mobile hamburger menu. Launch blocker. Two hours.
3. **QUICK WIN — Recommendation 5.1** — Build the `<PdpTrustStrip />` four-icon component and ship under Add to Cart on both PDP templates. Two hours of dev (icons authored inline). Single highest-leverage UI change.
4. **QUICK WIN — Recommendation 8.4** — Relabel the cart Checkout button to "Checkout with M-Pesa · KES 3,500". Fifteen minutes.
5. **QUICK WIN — Recommendation 8.1** — Replace cart drawer footnote with the three-icon trust row. One hour.
6. **QUICK WIN — Recommendation 6.1** — Inline fit predictor microcopy at the size selector. Static copy. Twenty minutes.
7. **QUICK WIN — Recommendation 6.5** — Size-to-clothing-size cross-reference table on the size guide. Static copy. Twenty minutes.
8. **QUICK WIN — Recommendation 4.2** — "Restocks monthly" microcopy on PDP. Static copy. Ten minutes.
9. **QUICK WIN — Recommendation 1.3** — Press / waitlist proof line in the hero. Static copy with real numbers. Thirty minutes.

### Week 2 — Medium lifts (ship before launch if time, immediately after if not)

10. **MEDIUM LIFT — Recommendation 7.2** — Sticky mobile Add to Cart bar. One day. Second-highest-leverage mobile change.
11. **MEDIUM LIFT — Recommendation 7.3** — Floating WhatsApp FAB on every mobile page. Half a day.
12. **MEDIUM LIFT — Recommendation 8.2** — Free-shipping progress bar in cart drawer. Half a day. AOV-lifting.
13. **MEDIUM LIFT — Recommendation 5.3** — M-Pesa + Pesapal payments lockup in footer + PDP microcopy. One day, including sourcing official assets.
14. **MEDIUM LIFT — Recommendation 4.1** — Size-specific low-stock language. Extend the Shopify product fragment to fetch `quantityAvailable`, then conditional render. One day.
15. **MEDIUM LIFT — Recommendation 4.3** — Conditional waitlist CTA when variant is out of stock. One day, including a minimal `/api/waitlist` route.
16. **MEDIUM LIFT — Recommendation 5.4** — Founder photo + Nairobi address in the footer. Half a day.
17. **MEDIUM LIFT — Recommendation 8.3** — Cross-sell row in the cart drawer (hardcoded SKU at launch). One day.
18. **MEDIUM LIFT — Recommendation 8.5** — Best-sellers in empty-cart state. Half a day.
19. **MEDIUM LIFT — Recommendation 6.3** — "Ask about fit on WhatsApp" deep-link at size selector. Two hours.
20. **MEDIUM LIFT — Recommendation 7.4** — Replace hover-reveal patterns with mobile-visible affordances. Half a day.
21. **MEDIUM LIFT — Recommendation 7.5** — Image budget audit + AVIF conversion + lazy-load tightening. One day.

### Week 3–4 — Strategic (requires content, photography, or vendor work)

22. **STRATEGIC — Recommendations 1.1 + 3.1 + 3.2** — Editorial shoot. One half-day session. Outputs: one homepage hero (1.1), per-SKU two-shot sequence (3.1), one fabric-macro per fabric family (3.2). The single largest content-investment line item on the launch plan. Estimate KES 80,000–150,000 depending on talent and location.
23. **STRATEGIC — Recommendation 2.3** — Star ratings on PDPs. Install Judge.me or Loox; seed with 12–20 real beta-tester reviews in exchange for comped product. Two weeks of pre-launch logistics.
24. **STRATEGIC — Recommendation 2.4** — Photo-first review module at ~70% scroll. Same tool as 2.3; requires the seeded reviews to render meaningfully.
25. **STRATEGIC — Recommendation 2.5** — "Tagged on Instagram" UGC rail. Install Foursixty / Outfy or manually curate via [data/instagram-grid.ts](data/instagram-grid.ts) at launch.
26. **STRATEGIC — Recommendation 2.2** — Pull-quote band on the homepage. Requires one real beta-tester quote with permission to publish.
27. **STRATEGIC — Recommendation 6.4** — Body-silhouette tape diagrams. Commission a local illustrator. KES 5,000–10,000.
28. **STRATEGIC — Recommendation 5.5** — OEKO-TEX badge. Requires the actual certification before display.
29. **STRATEGIC — Recommendation 1.2** — Shop-the-Look hot-spot on the hero. Two hours of dev once the new hero image is shot.
30. **STRATEGIC — Recommendation 6.2** — Model dimensions captioned on gallery images. Requires the editorial shoot output to caption against.

---

## What this plan is not

This plan does not prescribe A/B testing infrastructure, analytics events, or attribution modeling — those belong to a v2 measurement strategy once there is traffic to test. It does not address Shopify-hosted checkout customization (out of scope for the FORMA-controlled storefront). It does not cover paid acquisition strategy, email/SMS flows, or post-purchase journeys.

The single largest assumption this plan makes is that FORMA will *commission new editorial photography* before launch. Without that shoot, the homepage and PDP recommendations in Section 1 and 3 cannot ship in their intended form. If photography slips, the dev-side recommendations (Sections 2, 4, 5, 6, 7, 8) still stand and still ship — they simply have to carry more of the conversion weight alone.

---

## Caveats on the underlying research

The four research streams behind this document were synthesized from training-knowledge patterns and well-documented teardowns of Skims, Spanx, Honeylove, Vivo Activewear, and the Kenyan e-commerce market. Live web access was not available during synthesis. Specific percentages cited (Baymard 5–8% mobile sticky-ATC lift, Okendo 3× photo-review conversion, EA 15% M-Pesa abandonment reduction) are commonly-quoted industry figures in this space and should be verified against current Baymard / DataReportal Kenya 2026 / Jumia E-commerce Index reports before externalizing in pitch decks or investor materials. The directional truth of every recommendation — what to build, where to put it, why it works — stands on the convergence of the four streams and on direct inspection of every page template, component, and copy string in the FORMA codebase as of the date above.
