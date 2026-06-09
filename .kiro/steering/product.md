---
inclusion: always
---

# Product Context

## Summary
- **Product**: Matchá — enterprise-grade premium matcha tea platform with AI personalization, subscription engine, interactive educational content, gamification, and immersive modern design
- **Users**: Casual Browsers, Matcha Enthusiasts, Subscribers, Gift Buyers, Content/Operations Admins
- **Type**: Greenfield — New product (highest complexity)

## Overview

Matchá is an enterprise-grade premium matcha tea e-commerce platform that pushes the boundaries of modern web commerce. It features a multi-dimensional product configuration engine (grade × origin × harvest season × grind × weight × packaging), an AI-powered personalization system that learns taste preferences, a smart subscription engine with predictive cadence, interactive 3D educational experiences, a loyalty/gamification system, full internationalization, and an immersive design language with kinetic typography, parallax photography, micro-interactions, and fluid page transitions.

## Problem Statement

The premium matcha market lacks a digital experience that matches the sophistication of the product. Current tea e-commerce sites are generic storefronts that fail to: educate consumers on the nuances between grades and origins, provide personalized recommendations based on taste profiles, offer flexible subscription management, create an emotional connection through immersive design, or build community through gamification and social features. This platform creates a world-class digital experience for matcha culture.

## Target Users

- **Casual Browser**: Discovering matcha for the first time — goal: understand what matcha is, find an entry point
- **Matcha Enthusiast**: Knowledgeable buyer exploring premium options — goal: discover rare origins, compare grades, deep-dive into terroir
- **Subscriber**: Regular drinker optimizing convenience — goal: automated deliveries, discover variety, never run out
- **Gift Buyer**: Shopping for someone else — goal: find curated sets, personalize gifting, schedule delivery
- **Content/Operations Admin**: Managing platform — goal: curate catalog, create educational content, monitor subscriptions, run A/B tests

## Key Features

- **Product Configuration Engine**: Multi-dimensional variant matrix with real-time pricing, stock per SKU, comparison tools
- **AI Personalization**: Taste profile quiz, behavior-based recommendations, adaptive homepage, personalized email cadence
- **Smart Subscription Engine**: Predictive cadence, skip/swap/pause, gift subscriptions, loyalty tier integration, usage tracking
- **Interactive Educational Platform**: 3D tea ceremony viewer, step-by-step brewing with timers, interactive origin map, video masterclasses, knowledge quizzes
- **Loyalty & Gamification**: Points per purchase, tier progression (Novice → Enthusiast → Connoisseur → Master), achievements, exclusive product access, leaderboard
- **Social & Community**: Tasting journal, verified reviews with flavor tags, social sharing with OG images, referral program with rewards
- **Gift Experience**: Curated sets, custom gift messages, scheduled delivery, digital gift cards, unboxing experience preview
- **Internationalization**: Multi-currency (USD, EUR, GBP, JPY), multi-language, region-specific shipping/tax calculations
- **Immersive Design**: 3D product viewer, kinetic typography, parallax, micro-interactions, fluid transitions, ambient sound, custom cursor
- **Admin Platform**: Product configurator, subscription analytics, content CMS, A/B testing, inventory forecasting, customer insights

## Domain Language

| Term | Definition | Example |
|------|-----------|---------|
| Ceremonial Grade | Highest quality matcha — first harvest, stone-ground, vibrant umami | "Uji Ceremonial Okumidori 30g — Spring 2026 First Flush" |
| Terroir | How climate, soil, and cultivation affect flavor | "Uji's misty mountains produce sweeter, more umami-forward matcha" |
| Cultivar | Specific tea plant variety affecting flavor profile | "Okumidori — known for mild sweetness and low astringency" |
| First Flush (Ichibancha) | First spring harvest — most prized, delicate | Grade indicator + price premium |
| Tencha | Shade-grown tea leaves before grinding into matcha | Educational content on production |
| Chasen | Traditional bamboo whisk (80-prong or 120-prong) | Accessory product, gift set component |
| Chawan | Traditional matcha bowl | Accessory product, gift set component |
| Koicha | Thick-style matcha preparation (ceremonial only) | Brewing guide content, product suitability tag |
| Usucha | Thin-style matcha preparation (most common) | Brewing guide content |
| Smart Cadence | AI-predicted optimal delivery frequency based on usage | "Based on your usage, we suggest delivery every 18 days" |
| Taste Profile | User's flavor preferences (umami, sweet, vegetal, astringent) | Personalization input, recommendation driver |
| Tier | Loyalty level unlocking exclusive benefits | "Connoisseur tier — early access to seasonal harvests" |

## Success Criteria

- Product configuration wizard completion rate >80%
- Subscription activation within 2nd visit for enthusiast persona
- Educational content drives 30% of product page visits (contextual linking)
- 3D viewer loads within 3 seconds on 4G connection
- Page transitions complete in <300ms with no jank
- Lighthouse performance score >90 on key pages
- Subscription churn <4% monthly
- Referral program generates 15% of new subscribers
- Multi-currency pricing updates within 1 hour of exchange rate changes
- WCAG 2.1 AA compliance across all customer-facing flows

## Constraints & Assumptions

**Constraints**:
- Must achieve 60fps on animations/transitions (performance budget enforced)
- 3D viewer must degrade gracefully on low-end devices (fallback to high-res images)
- Subscription billing must be PCI DSS compliant
- Educational content must be SEO-crawlable (SSR mandatory)
- PWA support for offline educational content access
- Must support RTL languages for future Arabic/Hebrew expansion
- Image assets budget: <200KB per product hero, <50KB per thumbnail
- Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1

**Assumptions**:
- Target audience has modern devices and fast connections (but graceful degradation required)
- Initial languages: English, Japanese — expandable
- Initial currencies: USD, JPY — expandable
- AI personalization uses collaborative filtering + content-based hybrid approach
- 3-month runway before launch with dedicated team of 6-8 developers
- Products sourced from 5-8 Japanese regions with seasonal availability
- Video content hosted externally (Mux or similar)

## Project Type

- **Type**: Greenfield
- **Scope**: New product — enterprise-grade, highest complexity
