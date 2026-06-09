# 🍵 Matchá — Premium Japanese Matcha E-Commerce

A full-featured, enterprise-grade matcha tea e-commerce platform built with a **Zen Japanese aesthetic**. Features SVG line-art illustrations, interactive tea ceremony game, AI-powered taste quiz, realtime cart with tax calculation, and multi-currency support.

---

## ✨ Features

### Customer Experience
- **22 matcha products** — Ceremonial, Premium, and Culinary grades from 5 Japanese regions
- **Interactive Taste Quiz** — 5 questions → personalized product recommendations with match %
- **Tea Ceremony Game** — Scoop, pour, whisk, serve — interactive browser game
- **Brewing Guides** — Step-by-step with real timers (Usucha, Koicha, Latte, Cold Brew)
- **Realtime Cart** — Add from product page, instant mini-toast with running total
- **Multi-currency** — THB, USD, JPY, EUR with live conversion
- **Promo codes** — MATCHA10, FIRST500, FREESHIP, ZEN20
- **Payment methods** — Credit card, PromptPay, TrueMoney, Bank transfer, COD
- **VAT 7% auto-calculation** — Thai tax included in every order
- **Subscription plans** — Explorer, Enthusiast, Connoisseur
- **Loyalty rewards** — Points, tiers (Novice → Master), achievements

### Design
- **Zen Japanese aesthetic** — Warm cream backgrounds, washi paper texture
- **SVG illustrations** — Hand-crafted line-art for every product and region
- **Falling sakura & tea leaves** — Subtle ambient animation
- **Japanese frames** — Ink brush borders with vermillion seal dots
- **Kinetic typography** — Text reveal animations, zen quotes rotator
- **Responsive** — Mobile-first with hamburger menu, touch-friendly
- **Dark/Light mode** — Toggle with smooth transition

### Technical
- **Monorepo** — Turborepo + pnpm workspaces
- **Frontend** — Next.js 14 (App Router), Tailwind CSS, Framer Motion
- **Backend** — 14 microservices (Express/TypeScript)
- **Design System** — @matcha/ui with animation primitives, 3D viewer, sound engine
- **Shared Kernel** — Value objects, domain events, RFC 7807 errors, JWT/RBAC auth
- **Database** — PostgreSQL per service (Prisma ORM)
- **Event Bus** — Kafka with Schema Registry, dead letter queue
- **Observability** — OpenTelemetry (tracing, metrics, structured logging)
- **CI/CD** — GitHub Actions, Turborepo affected detection, canary deployments
- **Docker** — Compose for local dev (PG, Redis, Kafka, Elasticsearch)

---

## 🚀 Quick Start

```bash
# Prerequisites: Node.js 20+, pnpm
git clone https://github.com/saereu-ps/matcha-store.git
cd matcha-store
pnpm install
pnpm --filter @matcha/web dev
```

Open **http://localhost:3000**

### Full Stack (with backend services)

```bash
# Start infrastructure
docker compose -f infrastructure/docker/docker-compose.yml up -d

# Start all services
pnpm turbo dev
```

---

## 📁 Project Structure

```
matcha/
├── apps/web/              → Next.js frontend (App Router)
├── packages/
│   ├── ui/                → Design system (animations, 3D, theming, sound)
│   ├── shared-kernel/     → Value objects, events, errors, auth
│   ├── contracts/         → OpenAPI + Avro schemas, codegen
│   ├── config/            → ESLint, TypeScript, Prettier presets
│   └── telemetry/         → OpenTelemetry instrumentation
├── services/
│   ├── gateway/           → API Gateway (routing, rate limiting)
│   ├── auth/              → OAuth2 + JWT
│   ├── event-bus/         → Kafka producer/consumer
│   ├── product/           → Product catalog + variants
│   ├── user/              → Profiles, reviews, referrals
│   ├── subscription/      → Smart cadence, skip/swap/pause
│   ├── ai/                → Taste quiz, recommendations
│   ├── education/         → Brewing guides, origin map
│   ├── loyalty/           → Points, tiers, achievements
│   ├── cart/              → Cart, checkout, payments
│   ├── i18n/              → Multi-currency, shipping, tax
│   └── admin/             → Dashboard, CMS, A/B testing
└── infrastructure/
    └── docker/            → Docker Compose (PG, Redis, Kafka, ES)
```

---

## 🎮 Interactive Features

| Feature | URL | Description |
|---------|-----|-------------|
| Tea Ceremony Game | `/education/ceremony` | Scoop, pour, whisk matcha — score points |
| Taste Quiz | `/education/taste-quiz` | 5 questions → matched products |
| Brewing Guides | `/education/usucha` | Step-by-step with timers |
| Matcha Whisking | Homepage | Move mouse in circles to froth |

---

## 🎨 Design System

Color palette: Warm cream (`#f7f4ef`) + Sage green (`#6b7f5e`) + Charcoal ink (`#2c2c2b`)

Components: Button, Card, Badge, FadeIn, StaggerChildren, ScaleOnHover, ThemeProvider, CursorProvider, SoundProvider, ProductViewer3D, CeremonyScene

---

## 💰 Demo Accounts

| Email | Password | Tier |
|-------|----------|------|
| demo@matcha.co | matcha123 | Enthusiast (847 pts) |
| admin@matcha.co | admin123 | Master (5200 pts) |

---

## 🏗️ Built With

- [Next.js 14](https://nextjs.org/) — React framework
- [Turborepo](https://turbo.build/) — Monorepo build system
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) — Animations
- [Prisma](https://www.prisma.io/) — Database ORM
- [Express](https://expressjs.com/) — Backend services
- [Zod](https://zod.dev/) — Schema validation

---

## 📜 License

MIT

---

*Built with intention, served with care.* 🍵
