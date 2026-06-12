# Matchá — Premium Japanese Matcha E-Commerce Platform

> **Live:** [matcha-store-web.vercel.app](https://matcha-store-web.vercel.app)
> **Repo:** [github.com/saereu-ps/matcha-store](https://github.com/saereu-ps/matcha-store)

An enterprise-grade, full-stack matcha tea e-commerce platform featuring a zen Japanese aesthetic, interactive experiences, realtime shopping cart, AI-powered product recommendations, multi-currency support, and a complete microservices backend architecture.

---

## Table of Contents

1. [Overview](#overview)
2. [Live Demo](#live-demo)
3. [Features](#features)
4. [Pages & Routes](#pages--routes)
5. [Design System](#design-system)
6. [Technical Architecture](#technical-architecture)
7. [Product Catalog](#product-catalog)
8. [Interactive Experiences](#interactive-experiences)
9. [Shopping & Commerce](#shopping--commerce)
10. [User System](#user-system)
11. [Animations & Effects](#animations--effects)
12. [Accessibility & Performance](#accessibility--performance)
13. [Getting Started](#getting-started)
14. [Project Structure](#project-structure)
15. [Deployment](#deployment)
16. [Tech Stack](#tech-stack)
17. [Environment Variables](#environment-variables)
18. [Contributing](#contributing)
19. [License](#license)

---

## Overview

Matchá is a fictional premium matcha tea brand built as a comprehensive web application showcasing modern frontend development, microservices architecture, and immersive user experience design. The platform serves as both a functional e-commerce store and a technical demonstration of enterprise-grade web development.

**Key Highlights:**
- 22 matcha products across 3 grade tiers from 5 Japanese regions
- Full shopping flow: browse → filter → add to cart → promo → payment → checkout
- Interactive tea ceremony game with scoring
- AI-powered taste quiz with personalized recommendations
- Multi-currency support (THB, USD, JPY, EUR) with realtime conversion
- Email integration via Web3Forms (forms send to real email)
- Responsive design optimized for mobile, tablet, and desktop
- PWA-ready (installable as mobile app)
- Deployed on Vercel with auto-deploy from GitHub

---

## Live Demo

**URL:** https://matcha-store-web.vercel.app

**Demo Accounts:**
| Email | Password | Tier | Points |
|-------|----------|------|--------|
| demo@matcha.co | matcha123 | Enthusiast | 847 |
| admin@matcha.co | admin123 | Master | 5,200 |

**Promo Codes:**
| Code | Discount |
|------|----------|
| MATCHA10 | 10% off |
| FIRST500 | ฿500 off |
| FREESHIP | Free shipping |
| ZEN20 | 20% off |

---

## Features

### Commerce
- **22 Products** — Ceremonial (฿1,290-5,990), Premium (฿790-2,990), Culinary (฿350-890)
- **Realtime Cart** — Add/remove/quantity instantly, persistent across pages
- **VAT Calculation** — 7% Thai VAT auto-calculated on every change
- **Free Shipping** — Threshold ฿1,500, progress bar shows how much more needed
- **Promo Codes** — 4 working codes with percentage and fixed discounts
- **Multi-Payment** — Credit card, PromptPay, TrueMoney, Bank Transfer, COD
- **Payment Forms** — Each method shows its relevant input fields
- **Multi-Currency** — THB, USD, JPY, EUR with realtime conversion switcher
- **Subscription Plans** — Explorer (฿28/mo), Enthusiast (฿42/bi-weekly), Connoisseur (฿78/mo)
- **Product Filtering** — By grade (Ceremonial/Premium/Culinary) with counts
- **Product Sorting** — Recommended, Price ascending, Price descending
- **Stock States** — In stock, Low stock (with warning), Out of stock (with Sold Out overlay)

### Interactive
- **Tea Ceremony Game** — 4-step interactive: Scoop → Pour → Whisk → Serve with scoring
- **Taste Quiz** — 5 questions → algorithm matches to top 3 products with % score
- **Brewing Guides** — 4 guides (Usucha, Koicha, Latte, Cold Brew) with real timers
- **Matcha Whisking** — Mouse/touch circular motion = froth generation
- **Interactive Teacup** — 3D tilt follows mouse, click to sip, count sips

### User Experience
- **Cookie Consent** — GDPR-style popup, Accept All / Essential Only, remembers choice
- **Welcome Banner** — Promo code popup with blur backdrop, auto-dismiss timer
- **Cart Toast** — Mini popup after adding item: shows product + running total + free shipping progress
- **Search (Cmd+K)** — Realtime product search modal with keyboard shortcut
- **Back to Top** — Floating button appears on scroll
- **Scroll Progress** — Green progress bar at top of page
- **Page Transitions** — Smooth fade+slide between every page
- **Social Proof** — "X viewing now" + "Sold Y this week" (simulated)
- **Countdown Timer** — "Spring First Flush drops in X days" with live ticking
- **Newsletter Signup** — Email input with success state
- **FAQ Accordion** — 8 questions with animated expand/collapse
- **Testimonials** — 4 customer reviews with star ratings
- **Live Chat Button** — Floating chat bubble with mock chat window
- **Zen Quotes** — Rotating Japanese proverbs with translations (6 second cycle)

### Content Pages
- **About** — Brand story, partner regions with illustrations
- **Branches** — 5 Bangkok locations with features, hours, addresses
- **Careers** — 10 job positions, salary ranges, department filters, apply form
- **Contact** — Support info + contact form (sends real email)
- **Privacy Policy** — PDPA-compliant, 6 sections
- **Terms of Service** — 7 sections covering orders, shipping, returns, subscriptions
- **FAQ** — 8 commonly asked questions
- **Loyalty Rewards** — Points, tiers (Novice→Master), achievements, progress
- **Order History** — Past orders with product thumbnails
- **Profile** — Taste profile, subscription, addresses, preferences
- **Education Hub** — Brewing guides, ceremony, origin map, masterclasses

### Design
- **Zen Japanese Aesthetic** — Warm cream backgrounds, washi paper texture
- **SVG Line Art** — Custom illustrations for every product and region
- **Japanese Frames** — Ink brush borders with vermillion seal dots
- **Falling Sakura** — Ambient falling petals + tea leaves across all pages
- **Dark/Light Mode** — Toggle with smooth 400ms transition
- **Cursor Trail** — Matcha-green dust particles follow mouse (desktop only)
- **Mouse Parallax** — Hero content shifts with mouse movement for depth
- **Floating Particles** — Green dots drift up like tea steam in hero
- **Marquee Banners** — Infinite scrolling brand messages
- **Animated Stats** — Numbers count up when scrolled into view

### Email Integration
- **Job Applications** → Pilan.s112@gmail.com (via Web3Forms)
- **Contact Form** → Pilan.s112@gmail.com (via Web3Forms)
- Includes: name, email, phone, message, position ID, expected salary, LinkedIn, portfolio

---

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Homepage | Hero, products, stats, quiz, origins, countdown, testimonials, newsletter |
| `/products` | Collection | 22 products, filter, sort, add to cart |
| `/products/[id]` | Product Detail | Illustration, flavor profile, provenance, configuration |
| `/checkout` | Cart & Payment | 2-step: Cart (items + promo) → Payment (method + form) |
| `/subscriptions` | Subscribe | 3 plans with features, how-it-works |
| `/education` | Learn Hub | Brewing guides, ceremony, origin map, masterclasses |
| `/education/[id]` | Brewing Guide | Step-by-step with timers (usucha, koicha, latte, cold-brew) |
| `/education/ceremony` | Tea Ceremony Game | Interactive 4-step game with scoring |
| `/education/taste-quiz` | Taste Quiz | 5 questions → personalized product matches |
| `/loyalty` | Rewards | Points, tiers, achievements, progress |
| `/profile` | My Profile | Taste profile, subscription, addresses |
| `/orders` | Order History | Past orders with thumbnails |
| `/about` | Our Story | Brand values, partner regions |
| `/branches` | Locations | 5 Bangkok branches with details |
| `/careers` | Jobs | 10 positions, filters, salary ranges |
| `/careers/[id]` | Apply | Full application form → email |
| `/contact` | Contact Us | Support info + message form → email |
| `/faq` | FAQ | 8 questions, animated accordion |
| `/privacy` | Privacy Policy | PDPA-compliant, 6 sections |
| `/terms` | Terms of Service | 7 sections |

---

## Design System

**Color Palette:**
| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--matcha-bg` | `#f7f4ef` | `#1a1a18` | Page background |
| `--matcha-fg` | `#2c2c2b` | `#f0ece4` | Primary text |
| `--matcha-accent` | `#6b7f5e` | `#8fa67c` | Buttons, links, highlights |
| `--matcha-warm` | `#c75c2c` | `#d4734a` | Warnings, urgent badges |
| `--matcha-border` | `#d4cfc6` | `#3a3a36` | Card borders, dividers |

**Typography:**
- Display: Playfair Display (serif) — headings, prices
- Body: Inter (sans-serif) — paragraphs, UI
- Mono: JetBrains Mono — promo codes, data

**Components (packages/ui):**
Button, Card, Badge, FadeIn, ScaleOnHover, StaggerChildren, ThemeProvider

**SVG Illustrations (16 custom):**
MatchaBowl, MatchaLatte, MatchaPowder, Chasen, Teapot, GiftSet, TeaLeaf, MatchaTin, BrewingScene, OriginUji, OriginNishio, OriginKagoshima, OriginYame, Trophy, SubscriptionBox

---

## Technical Architecture

```
Turborepo Monorepo
├── apps/web          → Next.js 14 (App Router) — Frontend
├── packages/
│   ├── ui            → Design system (React + Framer Motion)
│   ├── shared-kernel → Value objects, events, errors, auth
│   ├── contracts     → OpenAPI + Avro schemas
│   ├── config        → ESLint, TypeScript, Prettier configs
│   └── telemetry     → OpenTelemetry instrumentation
├── services/         → 12 Express microservices
│   ├── gateway       → API Gateway (routing, rate limiting)
│   ├── auth          → OAuth2 + JWT
│   ├── event-bus     → Kafka producer/consumer
│   ├── product       → Catalog + Prisma schema
│   ├── user          → Profiles, reviews, referrals
│   ├── subscription  → Smart cadence, billing
│   ├── ai            → Recommendations, taste quiz
│   ├── education     → Guides, origins, masterclasses
│   ├── loyalty       → Points, tiers, achievements
│   ├── cart          → Cart, checkout, payments
│   ├── i18n          → Multi-currency, tax
│   └── admin         → Dashboard, CMS, analytics
└── infrastructure/   → Docker Compose, CI/CD
```

---

## Product Catalog

**22 products across 3 grades:**

### Ceremonial (8 products) — ฿1,290 - ฿5,990
Highest quality, first-flush, stone-ground. For traditional whisking.

### Premium (7 products) — ฿790 - ฿2,990
Daily drinking quality, versatile for traditional and lattes.

### Culinary (6 products) — ฿350 - ฿890
Optimized for lattes, baking, smoothies, and cooking.

**Origins:** Uji (Kyoto), Kagoshima, Nishio (Aichi), Yame (Fukuoka), Shizuoka

---

## Getting Started

**Prerequisites:** Node.js 20+, pnpm

```bash
git clone https://github.com/saereu-ps/matcha-store.git
cd matcha-store
pnpm install
pnpm --filter @matcha/web dev
```

Open http://localhost:3000

**Full stack (with backend):**
```bash
docker compose -f infrastructure/docker/docker-compose.yml up -d
pnpm turbo dev
```

**Build:**
```bash
pnpm turbo build   # builds all packages
```

---

## Project Structure

```
matcha-store/
├── apps/web/src/
│   ├── app/                    # Next.js App Router pages (20+ routes)
│   ├── components/             # 40+ React components
│   │   ├── illustrations/      # 16 custom SVG illustrations
│   │   └── ...                 # UI components
│   ├── lib/                    # Contexts: auth, cart, currency, wishlist, recently-viewed
│   └── styles/                 # Tailwind + CSS variables
├── packages/
│   ├── ui/                     # Design system package
│   ├── shared-kernel/          # Domain logic
│   ├── contracts/              # API schemas
│   ├── config/                 # Tooling configs
│   └── telemetry/              # Observability
├── services/                   # 12 microservices
├── infrastructure/             # Docker, K8s
├── .aidlc/                     # AI-DLC spec documents
└── .kiro/                      # Kiro IDE configuration
```

---

## Deployment

**Frontend (Vercel):**
- Auto-deploys on push to `main`
- Build command: `pnpm --filter @matcha/web build`
- Framework: Next.js (auto-detected)

**Backend:** Docker Compose for local, Kubernetes for production (specs included)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18, TypeScript |
| Styling | Tailwind CSS, CSS Variables, Framer Motion |
| State | React Context (cart, auth, currency, wishlist) |
| Backend | Express, TypeScript, Prisma, Zod |
| Database | PostgreSQL (per service), Redis |
| Events | Apache Kafka, Avro schemas |
| Search | Algolia (planned) |
| Auth | JWT, OAuth2, bcrypt |
| Payments | Stripe (planned), PromptPay, TrueMoney |
| Email | Web3Forms API |
| CI/CD | GitHub Actions, Turborepo |
| Deploy | Vercel (frontend), Docker/K8s (backend) |
| Monorepo | Turborepo, pnpm workspaces |
| Observability | OpenTelemetry, Prometheus, structured logging |

---

## Environment Variables

See `.env.example` for all required variables:
- Database URLs (per service)
- Redis, Kafka, Elasticsearch URLs
- JWT keys
- Stripe, SendGrid, Cloudinary keys
- Web3Forms access key

---

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feat/my-feature`)
3. Commit with conventional commits (`feat:`, `fix:`, `docs:`)
4. Push and create PR

---

## License

MIT

---

*Built with intention, served with care.* 🍵

**Matchá Co., Ltd.** — Bangkok, Thailand
