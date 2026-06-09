# Personas

## Summary
- **User Types**: 5 personas
- **Key Roles**: Yuki (Casual Browser), Kenji (Matcha Enthusiast), Emma (Subscriber), David (Gift Buyer), Priya (Admin)
- **Design Implications**: Complex RBAC, taste-profile-driven adaptive UI, subscription lifecycle management, gift flow isolation, enterprise admin dashboard

## Overview
The platform serves 5 distinct user types with vastly different journeys, technical requirements, and value propositions.

---

## Yuki — The Curious Newcomer

**Role**: Casual browser, first-time matcha explorer

**Goals**:
- Understand what matcha is and why it's special
- Find an approachable entry point without feeling overwhelmed by options
- Learn enough to make a confident first purchase

**Pain Points**:
- Matcha grades and terminology are intimidating
- Most tea sites assume prior knowledge
- Hard to know which product suits a beginner's palate
- Premium pricing feels risky without understanding the value

**User Journey**: Land on homepage → Drawn into educational content → Take taste quiz → Receive personalized starter recommendation → First purchase with beginner guide included

**Implications**: Onboarding flow must be educational, not transactional. Taste quiz as entry point. Beginner-friendly product tags. Contextual tooltips for terminology. 3D viewer creates wow-factor for engagement.

---

## Kenji — The Matcha Connoisseur

**Role**: Knowledgeable enthusiast, quality-driven buyer

**Goals**:
- Discover rare, seasonal, single-origin matcha from specific cultivars
- Compare products across terroir, harvest, and processing dimensions
- Track tasting experiences in a personal journal
- Achieve mastery tier in loyalty program for exclusive access

**Pain Points**:
- Generic stores don't provide enough detail about origin, harvest date, cultivar
- No way to compare products systematically across multiple dimensions
- Tasting notes are lost after each purchase
- Premium loyalty customers get no differentiated experience

**User Journey**: Browse by origin/cultivar → Deep-dive product pages with full provenance → Compare variants side-by-side → Purchase → Log in tasting journal → Earn mastery points → Access exclusive seasonal releases

**Implications**: Product pages need maximum detail (harvest date, elevation, processing method, cupping notes). Comparison tool is essential. Tasting journal with flavor wheel. Loyalty tiers unlock real value (early access, exclusive products). Community features for sharing notes.

---

## Emma — The Subscription Optimizer

**Role**: Regular matcha drinker, convenience-focused subscriber

**Goals**:
- Never run out of daily matcha — automated deliveries at the right frequency
- Discover new varieties without effort (curated rotation)
- Manage subscription easily — skip, swap, adjust cadence
- Maximize value through loyalty rewards

**Pain Points**:
- Fixed subscription frequencies don't match actual usage patterns
- No way to know when she'll run out
- Swapping products in a subscription is usually cumbersome
- Loyalty programs rarely offer meaningful matcha-specific rewards

**User Journey**: Sign up via recommendation → Set initial cadence → System learns usage patterns → Smart cadence adjustment suggestions → Easy swap/skip via dashboard → Tier progression → Exclusive subscriber benefits

**Implications**: Smart cadence prediction is high-value differentiator. Subscription dashboard must be frictionless (1-click skip/swap). Usage tracking (optional) for better predictions. Subscriber-exclusive products and early access. Win-back flows for at-risk subscribers.

---

## David — The Thoughtful Gift Buyer

**Role**: Purchasing for someone else, values presentation and experience

**Goals**:
- Find a curated gift that feels premium and personal
- Schedule delivery for a specific date (birthday, holiday)
- Include personal message and premium packaging
- Preview what the recipient will experience

**Pain Points**:
- Most tea sites have generic gift options with no curation
- Can't preview the unboxing experience
- No way to schedule gifts for future dates
- Digital gift cards feel impersonal

**User Journey**: Browse gift sets → Preview unboxing experience (3D) → Customize (message, wrapping) → Schedule delivery date → Track delivery → Recipient gets onboarding into platform

**Implications**: Gift flow is a distinct journey (separate from personal shopping). Unboxing preview via 3D viewer. Scheduling system for future deliveries. Gift recipient account activation flow. Gift subscriptions (give 3 months of matcha). Premium packaging configurator.

---

## Priya — The Platform Operator

**Role**: Admin managing catalog, content, subscriptions, and business operations

**Goals**:
- Keep product catalog accurate with all variant dimensions
- Create and schedule educational content and promotional campaigns
- Monitor subscription health metrics and intervene on churn risks
- Run A/B tests on pricing, UI, and recommendations
- Forecast inventory needs based on subscription commitments

**Pain Points**:
- Managing multi-dimensional product variants is error-prone
- No visibility into which content drives conversions
- Subscription churn detected too late to intervene
- A/B testing requires developer involvement
- Inventory forecasting is manual and inaccurate

**User Journey**: Dashboard → Monitor KPIs (subscription health, CLV, churn risk) → Manage product variants via visual configurator → Create content with live preview → Set up A/B test → Review results → Adjust inventory forecasts

**Implications**: Visual variant matrix builder (not spreadsheet-style). Real-time subscription analytics with churn prediction alerts. Content CMS with live preview and SEO scoring. No-code A/B testing framework. Demand forecasting based on active subscriptions + seasonal patterns.

---

## Design Implications

- **Architecture**: Complex RBAC (6 roles with granular permissions). Event-driven subscription engine. ML pipeline for personalization. Real-time WebSocket layer for live pricing/inventory.
- **UI/UX**: Adaptive UI based on user type and taste profile. Mobile-first with gesture navigation for customers. Desktop-optimized dashboard for admin. Dark mode primary. Accessibility must coexist with immersive interactions (reduced-motion support).
- **Data & Privacy**: Taste profiles and behavior tracking require explicit consent (GDPR-ready). Payment data via Stripe (never stored locally). Subscription billing PCI compliant. Analytics data pseudonymized. Gift recipient data minimal until they opt-in.
- **Performance**: 3D viewer must degrade gracefully. Personalization responses <200ms. Subscription operations eventually consistent. Admin dashboard can tolerate 2-3s load for analytics.
