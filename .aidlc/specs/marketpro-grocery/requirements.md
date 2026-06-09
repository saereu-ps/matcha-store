# Requirements

## Summary
- **Total Stories**: 38 across 10 functional areas
- **Priority**: 12 Must, 14 Should, 8 Could, 4 Won't (deferred)
- **User Types**: Yuki (Casual Browser), Kenji (Enthusiast), Emma (Subscriber), David (Gift Buyer), Priya (Admin)
- **Key Entities**: Product, ProductVariant, Category, Cart, Order, Subscription, TasteProfile, LoyaltyAccount, Content, GiftSet, Review, Achievement
- **Integrations**: Stripe, SendGrid, Cloudinary, Algolia, Segment, OpenAI, Shippo, Currency API, Mux, WebSocket
- **Core Flows**: Taste quiz → personalized browse → configure product → cart → checkout; Subscribe → smart cadence → manage; Learn → brew → journal

## Overview
User stories organized by functional area with EARS notation acceptance criteria. Prioritized using MoSCoW. Enterprise-grade scope covering 10 domains.

---

## Functional Area 1: Product Configuration Engine

### US-001: Multi-Dimensional Product Browsing
**As a** Matcha Enthusiast (Kenji)
**I want** to browse matcha products filterable by grade, origin, cultivar, harvest season, and flavor profile
**So that** I can discover products matching my specific preferences

**Priority**: Must

**Acceptance Criteria**:
1. **WHEN** user navigates to the catalog, **THEN** display products with faceted filters: grade (Ceremonial, Premium, Culinary), origin (Uji, Nishio, Kagoshima, Yame, Shizuoka), cultivar, harvest season, flavor profile (umami, sweet, vegetal, astringent)
2. **WHEN** user applies multiple filters simultaneously, **THEN** update results within 300ms using AND logic and display active filter count
3. **IF** no products match the applied filters, **THEN** display zero-state with "Closest matches" suggestions based on relaxed criteria
4. The system shall index all product dimensions in Algolia and return search results within 200ms

**Dependencies**: None
**Source**: D1-3 (Enterprise product config)

---

### US-002: Product Detail with Full Provenance
**As a** Matcha Enthusiast (Kenji)
**I want** to view comprehensive product information including origin farm, harvest date, elevation, processing method, cultivar, cupping notes, and recommended brewing method
**So that** I can make informed decisions about premium purchases

**Priority**: Must

**Acceptance Criteria**:
1. **WHEN** user opens a product page, **THEN** display: name, grade badge, origin with map pin, cultivar, harvest date, elevation, processing method, flavor wheel (radar chart), cupping notes, recommended brewing style (usucha/koicha), and stock status per variant
2. **WHEN** user scrolls product page, **THEN** trigger parallax effects on hero image and reveal content sections with scroll-triggered animations at 60fps
3. **IF** product has a 3D model, **THEN** display interactive 3D viewer (rotate, zoom) that loads within 3 seconds on 4G; **ELSE** display high-resolution image gallery with blur-up progressive loading
4. **WHILE** user is on product page, **THEN** show contextual educational links ("Learn about Uji terroir", "Brewing guide for this grade")

**Dependencies**: US-001
**Source**: D1-3, D1-6, D1-10

---

### US-003: Variant Configuration Wizard
**As a** Casual Browser (Yuki)
**I want** to configure my matcha selection through a guided step-by-step wizard (grade → grind → weight → packaging)
**So that** I'm not overwhelmed by the full variant matrix

**Priority**: Must

**Acceptance Criteria**:
1. **WHEN** user clicks "Configure" on a product, **THEN** display step-by-step wizard: Step 1 (Grade) → Step 2 (Grind: fine/standard) → Step 3 (Weight: 30g/50g/100g) → Step 4 (Packaging: pouch/tin/gift box)
2. **WHEN** user selects an option at each step, **THEN** update price in real-time, show stock availability for the selected combination, and animate transition to next step
3. **IF** a specific variant combination is out of stock, **THEN** display "Out of stock" with estimated restock date and "Notify me" option
4. **WHEN** user completes configuration, **THEN** display final summary with total price, variant details, and "Add to Cart" CTA with micro-interaction feedback

**Dependencies**: US-002
**Source**: D1-3 (Enterprise config), D1-10 (Immersive design)

---

### US-004: Product Comparison Tool
**As a** Matcha Enthusiast (Kenji)
**I want** to compare up to 4 products side-by-side across all dimensions (grade, origin, flavor profile, price, reviews)
**So that** I can make the best choice between similar options

**Priority**: Should

**Acceptance Criteria**:
1. **WHEN** user adds products to comparison (via "Compare" button on product cards), **THEN** display comparison tray at bottom of screen with count (max 4)
2. **WHEN** user opens comparison view, **THEN** display products in columns with rows for: grade, origin, cultivar, harvest, flavor wheel overlay, price per gram, rating, review count
3. **IF** user adds a 5th product, **THEN** prompt to remove one existing product before adding
4. **WHEN** user views comparison on mobile, **THEN** display as swipeable cards with sticky header row

**Dependencies**: US-001, US-002
**Source**: D1-3 (Enterprise — comparison tools)

---

## Functional Area 2: AI Personalization Engine

### US-005: Taste Profile Quiz
**As a** Casual Browser (Yuki)
**I want** to take an interactive taste profile quiz that determines my matcha preferences
**So that** I receive personalized product recommendations without needing matcha expertise

**Priority**: Must

**Acceptance Criteria**:
1. **WHEN** user starts the taste quiz, **THEN** present 5-7 interactive questions with visual choices (flavor preference sliders, brewing style images, usage context icons) with smooth animated transitions between questions
2. **WHEN** user completes the quiz, **THEN** generate a taste profile (umami: 0-100, sweet: 0-100, vegetal: 0-100, body: 0-100) and display results as an animated flavor wheel
3. **WHEN** taste profile is generated, **THEN** immediately show top 3 recommended products with match percentage and explanation ("87% match — high umami, medium body, matches your preference for smooth flavor")
4. **IF** user is not logged in, **THEN** store profile in localStorage and persist to account upon registration

**Dependencies**: None
**Source**: D1-4 (Advanced AI personalization)

---

### US-006: Adaptive Homepage Personalization
**As a** Subscriber (Emma)
**I want** the homepage to adapt to my taste profile, purchase history, and browsing behavior
**So that** I see relevant products and content without manual searching

**Priority**: Should

**Acceptance Criteria**:
1. **WHEN** a logged-in user with a taste profile visits the homepage, **THEN** display personalized sections: "Picked for You" (ML recommendations), "Based on Your Last Order", "New Arrivals in Your Flavor Profile"
2. **WHEN** personalization data is available, **THEN** recommendations shall load within 200ms using hybrid collaborative + content-based filtering via OpenAI embeddings
3. **IF** user has no purchase history, **THEN** use taste quiz profile + browsing behavior for recommendations
4. **WHILE** user browses, **THEN** track behavior events (views, hovers >2s, adds to cart) via Segment for model retraining (with explicit consent)

**Dependencies**: US-005
**Source**: D1-4 (Adaptive UI, behavior tracking)

---

### US-007: Predictive Restock Notifications
**As a** Subscriber (Emma)
**I want** the system to predict when I'll run out of matcha and notify me before it happens
**So that** I never experience a gap in my matcha supply

**Priority**: Could

**Acceptance Criteria**:
1. **WHEN** system calculates that a subscriber's matcha supply will deplete within 5 days (based on order frequency, quantity, and usage patterns), **THEN** send email notification: "Running low? Your next delivery is [date] — or order now"
2. **IF** subscriber has smart cadence enabled, **THEN** automatically adjust next delivery date to prevent gaps (with 48h advance notification)
3. **WHEN** prediction confidence is below 70%, **THEN** ask user to confirm usage rate rather than auto-adjusting

**Dependencies**: US-005, US-015
**Source**: D1-4 (Predictive restock), D1-5 (Smart cadence)

---

## Functional Area 3: Smart Subscription Engine

### US-008: Subscription Setup Flow
**As a** Subscriber (Emma)
**I want** to set up a recurring matcha subscription by choosing products, frequency, and delivery preferences
**So that** I receive automated deliveries without re-ordering

**Priority**: Must

**Acceptance Criteria**:
1. **WHEN** user clicks "Subscribe" on a product, **THEN** display subscription options: frequency (weekly, bi-weekly, monthly, custom days), quantity, and subscription discount (10% off)
2. **WHEN** user completes subscription setup, **THEN** create recurring billing schedule via Stripe Subscriptions, confirm first delivery date, and send confirmation email via SendGrid
3. **IF** user already has an active subscription, **THEN** offer to add the product to existing subscription delivery or create a separate one
4. **WHEN** first subscription order processes, **THEN** apply subscription discount and include a "Welcome to your subscription" insert with brewing guide

**Dependencies**: US-003, US-012
**Source**: D1-5 (Enterprise subscriptions)

---

### US-009: Subscription Dashboard (Skip/Swap/Pause)
**As a** Subscriber (Emma)
**I want** to manage my subscription with one-click skip, product swap, pause, and cadence adjustment
**So that** I have full control without needing to cancel and restart

**Priority**: Must

**Acceptance Criteria**:
1. **WHEN** subscriber opens subscription dashboard, **THEN** display: next delivery date, products, frequency, loyalty tier, total spend, and quick actions (Skip, Swap, Pause, Cancel)
2. **WHEN** subscriber clicks "Skip", **THEN** skip next delivery with one click, move delivery date forward by one cycle, and confirm with toast notification
3. **WHEN** subscriber clicks "Swap", **THEN** display alternative products matching their taste profile with "Recommended swap" badges; apply swap without price difference (within same tier)
4. **WHEN** subscriber pauses subscription, **THEN** maintain loyalty tier for 60 days, then begin tier decay; send win-back email at day 14 and day 30
5. **IF** subscriber cancels, **THEN** display retention offer (e.g., "Stay and get 20% off next 2 deliveries"), collect cancellation reason, and confirm cancellation only after retention step

**Dependencies**: US-008
**Source**: D1-5 (Enterprise — skip/swap/pause, win-back)

---

### US-010: Smart Cadence Adjustment
**As a** Subscriber (Emma)
**I want** the system to suggest optimal delivery frequency based on my actual consumption patterns
**So that** I don't receive too much or too little matcha

**Priority**: Should

**Acceptance Criteria**:
1. **WHEN** system detects subscriber consistently skips deliveries (2+ skips in a row), **THEN** suggest longer cadence: "Looks like every 3 weeks works better for you. Adjust?"
2. **WHEN** system detects subscriber reorders between deliveries (2+ ad-hoc orders), **THEN** suggest shorter cadence: "You're ordering extra between deliveries. Switch to bi-weekly?"
3. **WHEN** cadence suggestion is presented, **THEN** user can accept (1-click), dismiss, or set custom frequency
4. The system shall not make cadence suggestions more than once per billing cycle to avoid notification fatigue

**Dependencies**: US-009, US-007
**Source**: D1-5 (Smart cadence prediction, usage-based)

---

### US-011: Gift Subscriptions
**As a** Gift Buyer (David)
**I want** to purchase a subscription as a gift for someone else with a specific duration and personalized message
**So that** I can give a meaningful, recurring matcha experience

**Priority**: Should

**Acceptance Criteria**:
1. **WHEN** user selects "Gift this subscription", **THEN** display options: duration (1/3/6/12 months), start date, recipient email, personal message, and gift wrapping selection
2. **WHEN** gift subscription starts, **THEN** send recipient an onboarding email with: gift message, taste quiz invitation, and product selection for first delivery
3. **IF** gift subscription is about to expire, **THEN** notify both giver (offer renewal) and recipient (offer to self-subscribe at discounted rate) 14 days before end
4. **WHILE** gift subscription is active, **THEN** giver can view delivery status but cannot modify recipient's product selections

**Dependencies**: US-008
**Source**: D1-5 (Gift subscriptions), D1-9 (Social)

---

## Functional Area 4: Interactive Educational Platform

### US-012: Interactive Brewing Guides
**As a** Casual Browser (Yuki)
**I want** step-by-step interactive brewing guides with real-time timers and visual instructions
**So that** I can learn to prepare matcha correctly and confidently

**Priority**: Must

**Acceptance Criteria**:
1. **WHEN** user opens a brewing guide, **THEN** display step-by-step animated instructions with: water temperature, matcha amount, tool required, technique video/animation, and integrated timer
2. **WHEN** user starts the timer at a step, **THEN** display countdown with audio chime on completion and auto-advance to next step option
3. **WHERE** PWA is installed, **WHEN** user accesses brewing guide offline, **THEN** display cached guide content with full timer functionality
4. **WHEN** user completes a brewing guide for the first time, **THEN** award "First Brew" achievement (gamification integration)

**Dependencies**: None
**Source**: D1-6 (Immersive educational), D1-7 (Gamification)

---

### US-013: 3D Tea Ceremony Viewer
**As a** Matcha Enthusiast (Kenji)
**I want** to explore an interactive 3D tea ceremony scene showing traditional matcha preparation
**So that** I can appreciate the cultural significance and proper technique

**Priority**: Should

**Acceptance Criteria**:
1. **WHEN** user opens the 3D ceremony viewer, **THEN** load a Three.js scene within 3 seconds (4G) showing: chawan, chasen, natsume (tea caddy), and matcha with realistic materials and lighting
2. **WHEN** user interacts with the scene, **THEN** support: orbit rotation (drag), zoom (pinch/scroll), and click on tools to reveal information tooltips with smooth camera transitions
3. **WHEN** user clicks "Play Ceremony", **THEN** animate the traditional preparation sequence: sift → add water → whisk (W-motion) → serve, with narration audio (toggleable)
4. **IF** device has low GPU capability (detected via WebGL benchmarking), **THEN** fall back to high-quality video of ceremony instead of 3D scene

**Dependencies**: None
**Source**: D1-6 (3D tea ceremony viewer), D1-10 (Immersive)

---

### US-014: Interactive Origin Map
**As a** Matcha Enthusiast (Kenji)
**I want** to explore an interactive map of Japanese matcha-growing regions with terroir information
**So that** I can understand how origin affects flavor and discover new regions

**Priority**: Should

**Acceptance Criteria**:
1. **WHEN** user opens the origin map, **THEN** display an animated SVG map of Japan highlighting matcha regions (Uji, Nishio, Kagoshima, Yame, Shizuoka) with hover effects
2. **WHEN** user clicks a region, **THEN** expand to show: elevation, climate data, typical flavor profile (radar chart), cultivars grown, featured products from that region, and a brief origin story
3. **WHEN** user clicks "Shop this region", **THEN** navigate to catalog pre-filtered by that origin
4. **WHILE** user hovers over a region, **THEN** display quick tooltip with region name, product count, and signature flavor characteristic

**Dependencies**: US-001
**Source**: D1-6 (Animated origin map with terroir data)

---

### US-015: Video Masterclasses
**As a** Matcha Enthusiast (Kenji)
**I want** to watch expert-led video masterclasses on topics like grading, tasting technique, and Japanese tea culture
**So that** I can deepen my matcha knowledge

**Priority**: Could

**Acceptance Criteria**:
1. **WHEN** user browses masterclasses, **THEN** display video library with: thumbnail, title, instructor, duration, difficulty level, and completion status
2. **WHEN** user plays a video, **THEN** stream via Mux with adaptive bitrate, chapter markers, and playback speed controls
3. **WHEN** user completes a masterclass, **THEN** award achievement points and unlock next level content
4. **WHERE** user has a subscription, **THEN** provide access to exclusive masterclass content not available to non-subscribers

**Dependencies**: US-012
**Source**: D1-6 (Video masterclasses), D1-7 (Gamification)

---

## Functional Area 5: Loyalty & Gamification

### US-016: Loyalty Points System
**As a** Subscriber (Emma)
**I want** to earn points on every purchase and subscription payment that I can redeem for rewards
**So that** I feel valued and motivated to continue buying

**Priority**: Must

**Acceptance Criteria**:
1. **WHEN** user completes a purchase, **THEN** award points: 1 point per $1 spent (one-time), 1.5 points per $1 (subscription), 2x points during promotional events
2. **WHEN** user views loyalty dashboard, **THEN** display: current points, tier (Novice/Enthusiast/Connoisseur/Master), progress to next tier, available rewards, and points history
3. **WHEN** user redeems points, **THEN** deduct from balance and apply reward (free product, discount, exclusive access, free shipping)
4. The system shall process point awards within 5 minutes of order confirmation (eventually consistent)

**Dependencies**: US-012
**Source**: D1-7 (Full gamification — points system)

---

### US-017: Tier Progression & Achievements
**As a** Matcha Enthusiast (Kenji)
**I want** to progress through loyalty tiers (Novice → Enthusiast → Connoisseur → Master) and earn achievements
**So that** I feel a sense of progression and unlock exclusive benefits

**Priority**: Should

**Acceptance Criteria**:
1. **WHEN** user accumulates enough points for next tier, **THEN** display tier-up celebration animation (confetti + new badge reveal) and send congratulatory email with new benefits list
2. **WHEN** user reaches Connoisseur tier, **THEN** unlock: early access to seasonal harvests (48h before general release), exclusive products, priority customer support
3. **WHEN** user completes specific actions (first review, 10th order, tried all origins, completed all brewing guides), **THEN** award achievement badges with points bonus
4. **IF** user's annual spend drops below tier maintenance threshold, **THEN** notify 30 days before tier decay and offer re-qualification path

**Dependencies**: US-016
**Source**: D1-7 (Tier progression, achievements, exclusive access)

---

### US-018: Streak Rewards & Seasonal Challenges
**As a** Subscriber (Emma)
**I want** to maintain delivery streaks and participate in seasonal challenges for bonus rewards
**So that** I stay engaged and earn extra benefits for loyalty

**Priority**: Could

**Acceptance Criteria**:
1. **WHILE** subscriber maintains uninterrupted deliveries (no skips), **THEN** display streak counter and award streak bonuses at milestones (3 months: free sample, 6 months: exclusive blend, 12 months: Master tier fast-track)
2. **WHEN** a seasonal challenge is active (e.g., "Spring Harvest Challenge: try 3 first-flush matchas"), **THEN** display challenge card with progress tracker and reward preview
3. **IF** subscriber breaks streak (skip/pause), **THEN** reset streak counter but preserve tier and total points; display "Start a new streak" encouragement

**Dependencies**: US-016, US-009
**Source**: D1-7 (Streak rewards, seasonal challenges)

---

## Functional Area 6: Shopping Cart & Checkout

### US-019: Mixed Cart (One-Time + Subscription)
**As a** Subscriber (Emma)
**I want** to add both one-time purchases and subscription items to the same cart
**So that** I can checkout everything together without multiple transactions

**Priority**: Must

**Acceptance Criteria**:
1. **WHEN** user adds a one-time product and a subscription product to cart, **THEN** display both in cart with clear labels ("One-time" vs "Subscribing — every [frequency]") and separate line totals
2. **WHEN** user proceeds to checkout with mixed cart, **THEN** process one-time payment immediately and create subscription schedule for recurring items — single payment authorization
3. **IF** subscription item has a discount, **THEN** show both original price (struck through) and subscription price with savings highlighted
4. **WHEN** checkout completes, **THEN** send single confirmation email with both one-time order details and subscription confirmation

**Dependencies**: US-003, US-008
**Source**: D1-5, D1-1

---

### US-020: International Checkout with Multi-Currency
**As a** Casual Browser (Yuki)
**I want** to view prices and pay in my local currency with accurate shipping costs and tax
**So that** I can understand the total cost without manual conversion

**Priority**: Should

**Acceptance Criteria**:
1. **WHEN** user selects a locale/currency (USD, JPY, EUR, GBP), **THEN** update all displayed prices site-wide within 100ms using cached exchange rates (refreshed hourly)
2. **WHEN** user enters shipping address at checkout, **THEN** calculate region-specific shipping (via Shippo), import duties (if applicable), and local tax
3. **IF** exchange rate changes between cart addition and checkout (>1% shift), **THEN** notify user of price adjustment before confirming
4. **WHEN** payment is processed, **THEN** charge in user's selected currency with Stripe multi-currency support

**Dependencies**: US-019
**Source**: D1-8 (Full i18n — multi-currency)

---

### US-021: Gift Checkout Experience
**As a** Gift Buyer (David)
**I want** a dedicated gift checkout flow with wrapping options, personalized message, scheduled delivery, and unboxing preview
**So that** I can create a premium gifting experience

**Priority**: Should

**Acceptance Criteria**:
1. **WHEN** user enables "This is a gift" in cart, **THEN** display gift options: wrapping style (3 premium options), personal message (200 char), delivery date scheduling (up to 90 days ahead), and "Preview unboxing" button
2. **WHEN** user clicks "Preview unboxing", **THEN** display 3D animation of the gift box opening to reveal contents (Three.js)
3. **WHEN** gift order is placed, **THEN** hide pricing from packing slip, include printed gift message, and send delivery notification to buyer (not recipient until delivery day)
4. **IF** scheduled delivery date is a holiday, **THEN** warn user of potential delay and suggest alternative date

**Dependencies**: US-019, US-013
**Source**: D1-9 (Social), D1-10 (Immersive)

---

## Functional Area 7: User Identity & Social

### US-022: User Registration with Taste Profile
**As a** Casual Browser (Yuki)
**I want** to create an account that stores my taste profile, preferences, and order history
**So that** I get a personalized experience every time I return

**Priority**: Must

**Acceptance Criteria**:
1. **WHEN** user registers (email/password or OAuth — Google/Apple), **THEN** create account, prompt to complete taste quiz, and send welcome email series (3 emails over 7 days)
2. **IF** user took taste quiz before registering, **THEN** automatically associate stored profile with new account
3. **WHEN** user logs in, **THEN** restore: cart, taste profile, loyalty progress, subscription status, and personalized homepage within 500ms
4. **IF** registration fails (duplicate email, weak password), **THEN** display specific inline error without clearing other form fields

**Dependencies**: US-005
**Source**: D1-2, D1-4, D1-8

---

### US-023: Tasting Journal
**As a** Matcha Enthusiast (Kenji)
**I want** to log tasting notes for each matcha I try with a flavor wheel, rating, and personal notes
**So that** I can track my journey and compare experiences over time

**Priority**: Should

**Acceptance Criteria**:
1. **WHEN** user creates a journal entry (from order history or product page), **THEN** display tasting form: flavor wheel (interactive — drag to rate each axis), overall rating (1-5), brewing method used, notes (freetext), photo upload
2. **WHEN** user views their journal, **THEN** display entries chronologically with: product image, date, flavor wheel mini, rating, and expandable notes
3. **WHEN** user has 5+ journal entries, **THEN** display "Taste Evolution" chart showing how preferences have shifted over time
4. **WHERE** user consents to sharing, **THEN** publish anonymized tasting notes to product page as a verified review

**Dependencies**: US-022, US-002
**Source**: D1-9 (Tasting journal, verified reviews)

---

### US-024: Referral Program
**As a** Subscriber (Emma)
**I want** to refer friends and earn rewards when they make their first purchase
**So that** I can share my matcha discovery and benefit from it

**Priority**: Should

**Acceptance Criteria**:
1. **WHEN** user accesses referral program, **THEN** display: unique referral link/code, share buttons (email, WhatsApp, social), referral history, and earned rewards
2. **WHEN** referred friend makes first purchase using the link/code, **THEN** award referrer 500 loyalty points and give friend 15% off first order
3. **IF** referred friend starts a subscription within 30 days, **THEN** award referrer bonus 1000 points
4. The system shall prevent self-referral (same IP, email domain matching, same payment method)

**Dependencies**: US-016, US-022
**Source**: D1-9 (Referral program with rewards)

---

### US-025: Verified Reviews with Flavor Tags
**As a** Matcha Enthusiast (Kenji)
**I want** to read and write verified purchase reviews with structured flavor tags
**So that** I can see authentic opinions and contribute to the community

**Priority**: Should

**Acceptance Criteria**:
1. **WHEN** user with a verified purchase writes a review, **THEN** display "Verified Purchase" badge and allow: star rating, flavor tags selection (umami, sweet, vegetal, smooth, creamy, nutty, grassy), brewing method used, freetext review, photo
2. **WHEN** user browses reviews, **THEN** display filter by: rating, flavor tag, brewing method; sort by: most recent, most helpful, highest/lowest rating
3. **WHEN** user marks a review as "Helpful", **THEN** increment helpful count and factor into sort ranking
4. **IF** review contains profanity or spam patterns, **THEN** hold for admin moderation before publishing

**Dependencies**: US-022, US-002
**Source**: D1-9 (Verified reviews with flavor tags)

---

## Functional Area 8: Internationalization

### US-026: Multi-Language Support
**As a** Casual Browser (Yuki)
**I want** to view the entire platform in my preferred language (English or Japanese initially)
**So that** I can understand all content and navigate comfortably

**Priority**: Must

**Acceptance Criteria**:
1. **WHEN** user selects language (EN/JA), **THEN** translate all UI elements, navigation, product descriptions, and system messages without page reload
2. **WHEN** user visits for the first time, **THEN** auto-detect preferred language from browser settings and suggest: "View in [language]?"
3. **IF** product content is not yet translated, **THEN** display in original language with "[Translation pending]" indicator
4. The system shall support RTL layout architecture for future Arabic/Hebrew expansion (CSS logical properties, no hardcoded left/right)

**Dependencies**: None
**Source**: D1-8 (Full i18n — multi-language, RTL-ready)

---

### US-027: Region-Specific Shipping & Tax
**As a** Casual Browser (Yuki)
**I want** shipping costs and tax calculated accurately for my region before checkout
**So that** I'm not surprised by additional fees at payment

**Priority**: Should

**Acceptance Criteria**:
1. **WHEN** user sets their region (via location selector or address input), **THEN** display estimated shipping cost on product pages and cart (via Shippo rate calculation)
2. **WHEN** checkout calculates tax, **THEN** apply correct tax rate for destination (US state tax, EU VAT, Japan consumption tax) with tax line item shown separately
3. **IF** order qualifies for free shipping (threshold varies by region), **THEN** display progress bar: "Add $[X] more for free shipping"
4. **WHEN** shipping to EU, **THEN** display IOSS number and ensure VAT is pre-collected (no surprise customs fees for recipient)

**Dependencies**: US-020
**Source**: D1-8 (Region-specific shipping/tax)

---

## Functional Area 9: Immersive Design & Interactions

### US-028: Fluid Page Transitions & Micro-Interactions
**As a** Casual Browser (Yuki)
**I want** smooth, animated page transitions and responsive micro-interactions throughout the site
**So that** the browsing experience feels premium and engaging

**Priority**: Must

**Acceptance Criteria**:
1. **WHEN** user navigates between pages, **THEN** execute fluid transition animation (shared element transitions, crossfade, or slide) completing in <300ms with no content flash
2. **WHEN** user hovers over interactive elements (buttons, cards, links), **THEN** display micro-interaction feedback (scale, glow, color shift) within 50ms
3. **WHEN** user scrolls, **THEN** trigger scroll-driven animations (parallax layers, reveal effects, kinetic typography) at 60fps without layout shift
4. **WHERE** user has prefers-reduced-motion enabled, **THEN** disable all animations and transitions, display static content immediately

**Dependencies**: None
**Source**: D1-10 (Immersive luxury — micro-interactions, fluid transitions)

---

### US-029: Dark Mode & Ambient Sound
**As a** Matcha Enthusiast (Kenji)
**I want** a dark mode primary experience with optional ambient sound design
**So that** the browsing experience feels immersive and luxurious

**Priority**: Should

**Acceptance Criteria**:
1. **WHEN** user first visits, **THEN** detect system color scheme preference and apply dark/light mode accordingly; default to dark if no preference detected
2. **WHEN** user toggles theme, **THEN** smoothly transition all colors (200ms ease) without flash of unstyled content
3. **WHERE** ambient sound is enabled, **WHEN** user hovers over interactive elements, **THEN** play subtle audio feedback (soft tones, nature sounds) at low volume; **WHEN** user navigates, **THEN** play transition sound
4. The system shall remember sound preference and never auto-play audio on first visit (respect autoplay policies)

**Dependencies**: US-028
**Source**: D1-10 (Dark mode primary, ambient sound design)

---

### US-030: Custom Cursor & Scroll Effects
**As a** Casual Browser (Yuki)
**I want** a custom cursor that reacts to page context and scroll-triggered content reveals
**So that** the site feels like a crafted experience rather than a standard website

**Priority**: Could

**Acceptance Criteria**:
1. **WHEN** user moves cursor over the page, **THEN** display custom cursor (matcha-green dot with trail effect) that morphs on context: pointer over links, expand over images, text cursor over inputs
2. **WHEN** user scrolls into new content sections, **THEN** reveal content with staggered fade-in animations (elements appear sequentially, 50ms stagger)
3. **IF** user is on touch device (no cursor), **THEN** disable custom cursor entirely and use native touch interactions
4. **WHERE** user has prefers-reduced-motion, **THEN** disable custom cursor trail and scroll reveals

**Dependencies**: US-028
**Source**: D1-10 (Custom cursor, scroll-triggered animations)

---

## Functional Area 10: Admin & Operations

### US-031: Visual Product Configurator (Admin)
**As an** Admin (Priya)
**I want** a visual tool to define product variant matrices (dimensions, options, pricing rules, stock per variant)
**So that** I can manage complex product configurations without developer help

**Priority**: Must

**Acceptance Criteria**:
1. **WHEN** admin creates a product, **THEN** display visual matrix builder: define dimensions (grade, grind, weight, packaging), set options per dimension, and see generated variant grid with pricing cells
2. **WHEN** admin sets pricing rules, **THEN** support: base price + additive per option, percentage modifiers, and bulk pricing (100g cheaper per gram than 30g)
3. **WHEN** admin activates a product, **THEN** validate all variant combinations have: price, stock level, and at least one image; block activation if validation fails
4. **WHEN** admin imports products via CSV, **THEN** parse multi-dimensional variants, validate schema, and report errors by row with preview before commit

**Dependencies**: None
**Source**: D1-12 (Enterprise admin — product configurator)

---

### US-032: Subscription Analytics Dashboard (Admin)
**As an** Admin (Priya)
**I want** a real-time dashboard showing subscription health metrics (MRR, churn, LTV, retention cohorts)
**So that** I can identify trends and intervene on churn risks early

**Priority**: Must

**Acceptance Criteria**:
1. **WHEN** admin opens subscription dashboard, **THEN** display: MRR (monthly recurring revenue), active subscribers, churn rate (30-day rolling), average LTV, net subscriber growth — all with trend sparklines
2. **WHEN** admin views retention cohort chart, **THEN** display monthly cohorts with retention percentage at 1/3/6/12 month marks, color-coded (green >80%, yellow 60-80%, red <60%)
3. **WHEN** churn risk score for a subscriber exceeds threshold (skip pattern, reduced engagement), **THEN** flag in "At Risk" list with suggested intervention (discount offer, personal email, product recommendation)
4. The system shall update dashboard metrics within 5 minutes of data change (near real-time)

**Dependencies**: US-009
**Source**: D1-12 (Subscription analytics)

---

### US-033: Content CMS with Live Preview (Admin)
**As an** Admin (Priya)
**I want** to create and edit educational content (brewing guides, origin stories, blog posts) with live preview and SEO scoring
**So that** I can publish high-quality content without developer assistance

**Priority**: Should

**Acceptance Criteria**:
1. **WHEN** admin creates content, **THEN** display rich editor with: WYSIWYG blocks (text, images, video embed, interactive elements), live preview pane showing exactly how it renders on site
2. **WHEN** admin saves content, **THEN** calculate and display SEO score (title length, meta description, heading structure, keyword density, image alt text) with improvement suggestions
3. **WHEN** admin publishes content, **THEN** invalidate CDN cache for affected pages, update sitemap, and optionally schedule social media preview generation
4. **IF** content references products, **THEN** auto-link to product pages and display "Related products" sidebar in preview

**Dependencies**: None
**Source**: D1-12 (Content CMS with preview)

---

### US-034: A/B Testing Framework (Admin)
**As an** Admin (Priya)
**I want** to create and monitor A/B tests on pricing, UI elements, and recommendation algorithms without code changes
**So that** I can optimize conversion through data-driven experimentation

**Priority**: Could

**Acceptance Criteria**:
1. **WHEN** admin creates an A/B test, **THEN** configure: test name, variants (control + up to 3 treatments), traffic allocation percentage, target metric (conversion, AOV, subscription rate), and duration
2. **WHEN** test is running, **THEN** display real-time results: conversion per variant, statistical significance (p-value), confidence interval, and projected winner at current sample size
3. **WHEN** test reaches statistical significance (p<0.05 with minimum 1000 samples per variant), **THEN** notify admin: "Winner detected — [Variant B] improves [metric] by [X]%. Apply?"
4. **WHEN** admin applies winning variant, **THEN** roll out to 100% traffic and archive test results

**Dependencies**: US-032
**Source**: D1-12 (A/B testing framework)

---

### US-035: Inventory Forecasting (Admin)
**As an** Admin (Priya)
**I want** demand forecasting based on active subscriptions, seasonal trends, and promotional calendar
**So that** I can prevent stockouts and optimize ordering from suppliers

**Priority**: Could

**Acceptance Criteria**:
1. **WHEN** admin views inventory forecast, **THEN** display: projected demand per product/variant for next 30/60/90 days based on: active subscription commitments, historical one-time order rates, seasonal patterns, and scheduled promotions
2. **IF** forecast predicts stockout within 14 days, **THEN** display "⚠️ Stockout Risk" alert with: affected product, projected depletion date, and suggested reorder quantity
3. **WHEN** admin marks a product as "seasonal" (e.g., first-flush spring harvest), **THEN** factor limited availability window into forecast and subscriber notifications

**Dependencies**: US-031, US-032
**Source**: D1-12 (Inventory forecasting)

---

## Functional Area 11: Search & Discovery (Cross-Cutting)

### US-036: Intelligent Search with Algolia
**As a** Casual Browser (Yuki)
**I want** to search for matcha products with typo tolerance, synonym matching, and instant results
**So that** I can find what I need even without knowing exact product names

**Priority**: Must

**Acceptance Criteria**:
1. **WHEN** user types 2+ characters in search, **THEN** display instant results from Algolia within 200ms: product matches, category matches, and content matches (brewing guides, origin stories)
2. **WHEN** user misspells a search term, **THEN** apply typo tolerance and synonym matching ("ceremony" → "ceremonial", "green tea powder" → "matcha")
3. **WHEN** user submits search, **THEN** display results page with: product cards, faceted filters (same as catalog), and "Suggested for you" section based on taste profile
4. **WHEN** search returns no results, **THEN** display: spelling suggestions, popular searches, and taste-quiz CTA

**Dependencies**: US-001
**Source**: D1-3, D1-11 (Algolia integration)

---

### US-037: SEO-Optimized Educational Content
**As a** platform (system requirement)
**I want** all educational content pages to be server-side rendered with proper schema markup
**So that** they rank well in search engines and drive organic traffic

**Priority**: Must

**Acceptance Criteria**:
1. The system shall server-side render all educational content pages (brewing guides, origin stories, blog) with: proper heading hierarchy, meta descriptions, Open Graph tags, and JSON-LD structured data (Article, HowTo, FAQPage schemas)
2. **WHEN** content is published, **THEN** generate and update XML sitemap within 5 minutes
3. The system shall achieve Lighthouse SEO score >95 on all content pages
4. **WHEN** a content page references products, **THEN** include Product schema markup with price, availability, and aggregate rating

**Dependencies**: US-033
**Source**: D1-6 (SEO for educational content)

---

### US-038: PWA Offline Access for Educational Content
**As a** Matcha Enthusiast (Kenji)
**I want** to access brewing guides and tasting notes offline via the installed PWA
**So that** I can reference guides while brewing without needing internet

**Priority**: Could

**Acceptance Criteria**:
1. **WHEN** user installs the PWA, **THEN** pre-cache: all brewing guides, the user's tasting journal, and flavor wheel assets for offline use
2. **WHILE** device is offline, **WHEN** user opens a cached brewing guide, **THEN** display full guide with timers and animations (no network requests required)
3. **WHEN** user creates a journal entry offline, **THEN** queue for sync and upload when connection is restored with conflict resolution (server wins on conflicts)
4. **WHEN** new content is published, **THEN** update service worker cache on next online visit (background sync)

**Dependencies**: US-012, US-023
**Source**: D1-6 (PWA offline access)

---

## Story Summary

| ID | Title | Area | Priority | Dependencies |
|----|-------|------|----------|--------------|
| US-001 | Multi-Dimensional Product Browsing | Product Config | Must | None |
| US-002 | Product Detail with Full Provenance | Product Config | Must | US-001 |
| US-003 | Variant Configuration Wizard | Product Config | Must | US-002 |
| US-004 | Product Comparison Tool | Product Config | Should | US-001, US-002 |
| US-005 | Taste Profile Quiz | AI Personalization | Must | None |
| US-006 | Adaptive Homepage Personalization | AI Personalization | Should | US-005 |
| US-007 | Predictive Restock Notifications | AI Personalization | Could | US-005, US-015 |
| US-008 | Subscription Setup Flow | Subscription Engine | Must | US-003, US-012 |
| US-009 | Subscription Dashboard (Skip/Swap/Pause) | Subscription Engine | Must | US-008 |
| US-010 | Smart Cadence Adjustment | Subscription Engine | Should | US-009, US-007 |
| US-011 | Gift Subscriptions | Subscription Engine | Should | US-008 |
| US-012 | Interactive Brewing Guides | Educational Platform | Must | None |
| US-013 | 3D Tea Ceremony Viewer | Educational Platform | Should | None |
| US-014 | Interactive Origin Map | Educational Platform | Should | US-001 |
| US-015 | Video Masterclasses | Educational Platform | Could | US-012 |
| US-016 | Loyalty Points System | Loyalty & Gamification | Must | US-012 |
| US-017 | Tier Progression & Achievements | Loyalty & Gamification | Should | US-016 |
| US-018 | Streak Rewards & Seasonal Challenges | Loyalty & Gamification | Could | US-016, US-009 |
| US-019 | Mixed Cart (One-Time + Subscription) | Cart & Checkout | Must | US-003, US-008 |
| US-020 | International Checkout with Multi-Currency | Cart & Checkout | Should | US-019 |
| US-021 | Gift Checkout Experience | Cart & Checkout | Should | US-019, US-013 |
| US-022 | User Registration with Taste Profile | User & Social | Must | US-005 |
| US-023 | Tasting Journal | User & Social | Should | US-022, US-002 |
| US-024 | Referral Program | User & Social | Should | US-016, US-022 |
| US-025 | Verified Reviews with Flavor Tags | User & Social | Should | US-022, US-002 |
| US-026 | Multi-Language Support | Internationalization | Must | None |
| US-027 | Region-Specific Shipping & Tax | Internationalization | Should | US-020 |
| US-028 | Fluid Page Transitions & Micro-Interactions | Design & Interactions | Must | None |
| US-029 | Dark Mode & Ambient Sound | Design & Interactions | Should | US-028 |
| US-030 | Custom Cursor & Scroll Effects | Design & Interactions | Could | US-028 |
| US-031 | Visual Product Configurator (Admin) | Admin & Operations | Must | None |
| US-032 | Subscription Analytics Dashboard (Admin) | Admin & Operations | Must | US-009 |
| US-033 | Content CMS with Live Preview (Admin) | Admin & Operations | Should | None |
| US-034 | A/B Testing Framework (Admin) | Admin & Operations | Could | US-032 |
| US-035 | Inventory Forecasting (Admin) | Admin & Operations | Could | US-031, US-032 |
| US-036 | Intelligent Search with Algolia | Search & Discovery | Must | US-001 |
| US-037 | SEO-Optimized Educational Content | Search & Discovery | Must | US-033 |
| US-038 | PWA Offline Access | Search & Discovery | Could | US-012, US-023 |

---

## Story-Persona Matrix

| Story | Yuki (Browser) | Kenji (Enthusiast) | Emma (Subscriber) | David (Gift) | Priya (Admin) |
|-------|---------------|-------------------|-------------------|--------------|---------------|
| US-001 | ✓ Primary | ✓ Primary | ✓ Secondary | — | — |
| US-002 | ✓ Secondary | ✓ Primary | ✓ Secondary | — | — |
| US-003 | ✓ Primary | ✓ Secondary | ✓ Secondary | ✓ Secondary | — |
| US-004 | — | ✓ Primary | — | — | — |
| US-005 | ✓ Primary | ✓ Secondary | ✓ Secondary | — | — |
| US-006 | ✓ Secondary | ✓ Secondary | ✓ Primary | — | — |
| US-007 | — | — | ✓ Primary | — | — |
| US-008 | — | ✓ Secondary | ✓ Primary | — | — |
| US-009 | — | — | ✓ Primary | — | — |
| US-010 | — | — | ✓ Primary | — | — |
| US-011 | — | — | — | ✓ Primary | — |
| US-012 | ✓ Primary | ✓ Primary | ✓ Secondary | — | — |
| US-013 | ✓ Secondary | ✓ Primary | — | — | — |
| US-014 | ✓ Secondary | ✓ Primary | — | — | — |
| US-015 | — | ✓ Primary | ✓ Secondary | — | — |
| US-016 | — | ✓ Primary | ✓ Primary | — | — |
| US-017 | — | ✓ Primary | ✓ Secondary | — | — |
| US-018 | — | — | ✓ Primary | — | — |
| US-019 | — | ✓ Secondary | ✓ Primary | ✓ Secondary | — |
| US-020 | ✓ Primary | ✓ Secondary | ✓ Secondary | ✓ Secondary | — |
| US-021 | — | — | — | ✓ Primary | — |
| US-022 | ✓ Primary | ✓ Primary | ✓ Primary | ✓ Secondary | — |
| US-023 | — | ✓ Primary | ✓ Secondary | — | — |
| US-024 | — | ✓ Secondary | ✓ Primary | — | — |
| US-025 | ✓ Secondary | ✓ Primary | ✓ Secondary | — | — |
| US-026 | ✓ Primary | ✓ Primary | ✓ Primary | ✓ Primary | — |
| US-027 | ✓ Secondary | ✓ Secondary | ✓ Secondary | ✓ Primary | — |
| US-028 | ✓ Primary | ✓ Primary | ✓ Primary | ✓ Primary | — |
| US-029 | ✓ Secondary | ✓ Primary | ✓ Secondary | — | — |
| US-030 | ✓ Secondary | ✓ Secondary | — | — | — |
| US-031 | — | — | — | — | ✓ Primary |
| US-032 | — | — | — | — | ✓ Primary |
| US-033 | — | — | — | — | ✓ Primary |
| US-034 | — | — | — | — | ✓ Primary |
| US-035 | — | — | — | — | ✓ Primary |
| US-036 | ✓ Primary | ✓ Primary | ✓ Secondary | ✓ Secondary | — |
| US-037 | ✓ Secondary | ✓ Secondary | — | — | ✓ Secondary |
| US-038 | — | ✓ Primary | ✓ Secondary | — | — |

---

## Non-Functional Considerations

- **Performance**: 3D viewer load <3s (4G), page transitions <300ms, search <200ms, personalization <200ms, 60fps animations, Core Web Vitals (LCP <2.5s, FID <100ms, CLS <0.1)
- **Security**: PCI DSS for subscription billing (Stripe handles), OAuth2 + JWT, rate limiting, CSRF, XSS prevention, GDPR consent management, data encryption at rest
- **Scalability**: Event-driven subscription processing, Redis caching for personalization, Elasticsearch/Algolia for search, CDN for assets, connection pooling, horizontal scaling for API layer
- **SEO**: SSR for all public pages, structured data (JSON-LD), dynamic sitemap, canonical URLs, hreflang for i18n, Core Web Vitals optimization
- **Accessibility**: WCAG 2.1 AA, reduced-motion support, keyboard navigation, screen reader compatible (even with 3D/animation — graceful degradation), color contrast in both themes
- **Internationalization**: RTL-ready CSS architecture, ICU message format, locale-aware date/currency/number formatting, translation management workflow
- **Reliability**: Subscription billing retry logic (Stripe dunning), webhook idempotency, graceful degradation for 3rd-party services (Algolia down → fallback search)

---

## External References

| Source | Stories Derived | What was used |
|--------|----------------|---------------|
| Marketpro template screenshot | US-001, US-003, US-019, US-028, US-036 | E-commerce layout structure, navigation patterns, product card design — adapted for matcha specialty |
| User direction (matcha + highest complexity) | All stories | Premium matcha focus, enterprise-grade features, immersive design direction |
