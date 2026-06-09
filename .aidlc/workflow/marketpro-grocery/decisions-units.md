# Decomposition Decisions

## Context Summary
- **Feature**: Enterprise-grade premium matcha tea e-commerce platform
- **Complexity**: Very High — 38 stories, 10+ domains, 5 user types, 10+ integrations
- **Type**: Greenfield — no existing codebase or conventions
- **Team**: Medium (4–8 developers)
- **Key Domains**: Product Configuration, AI Personalization, Subscription Engine, Educational Platform, Loyalty & Gamification, Cart & Checkout, User & Social, Internationalization, Design System, Admin & Operations, Search & Discovery
- **Architecture needs**: Event-driven subscription processing, ML pipeline, real-time WebSocket, 3D rendering, PWA offline, SSR + hydration

---

## Decision Questions

### D2-1: Architecture Pattern
**Question**: What high-level architecture pattern should structure this system?
- 1) Monolith — Single deployable unit, simple operations but limited scalability
- 2) Modular Monolith — Single deployment with strongly bounded internal modules, event-driven communication between modules
- 3) Microservices — Independently deployable services, maximum scalability but high operational complexity **(Selected — maximum complexity)**
- 4) Other (please specify): _______

**Answer**: 3) Microservices — independently deployable services with event-driven communication, maximum scalability and isolation per domain

---

### D2-2: Decomposition Strategy
**Question**: How should the system be decomposed into units of work?
- 1) Domain-Driven — Group by business domain/bounded context (Product, Subscription, User, etc.) **(Selected)**
- 2) Layer-Based — Group by technical layer (API, Business Logic, Data, Infrastructure)
- 3) User Journey-Based — Group by end-to-end user flows (Onboarding, Shopping, Subscribing)
- 4) Hybrid — Domain-driven for backend modules + user-journey for frontend experiences

**Answer**: 1) Domain-Driven — each unit maps to a bounded context with its own data store, domain events, and API surface

---

### D2-3: Unit Granularity
**Question**: How many units should the system be decomposed into given 38 stories and a medium team?
- 1) Coarse (4-5 units) — Fewer boundaries, less coordination, faster to deliver, larger units
- 2) Medium (6-8 units) — Balanced boundaries, manageable coordination, good parallelism
- 3) Fine (9-12 units) — Maximum separation, high coordination overhead, maximum parallelism **(Selected — maximum complexity)**
- 4) Other (please specify): _______

**Answer**: 3) Fine (10 units) — maximum separation with each bounded context fully isolated, enabling maximum parallel development

---

### D2-4: Shared Kernel Approach
**Question**: How should shared concepts (User identity, Product references, i18n, design tokens) be managed across units?
- 1) Shared types package — Common TypeScript types/interfaces imported by all units
- 2) Domain events only — Units communicate exclusively through events, no shared code
- 3) Shared kernel module — Small shared module with core entities and value objects used by all units **(Selected — maximum structure)**
- 4) Other (please specify): _______

**Answer**: 3) Shared kernel module — core value objects (Money, UserId, ProductId, Locale), event schemas, and API contracts shared via internal package; each unit owns its own aggregates

---

### D2-5: Frontend/Backend Split
**Question**: Should frontend and backend be separate units or co-located within domain units?
- 1) Separate — Dedicated frontend unit(s) consuming backend APIs (BFF pattern)
- 2) Co-located — Each domain unit includes its own frontend pages/components and backend logic
- 3) Hybrid — Shared design system unit + domain units with co-located full-stack features **(Selected — maximum complexity)**
- 4) Other (please specify): _______

**Answer**: 3) Hybrid — Dedicated design system unit provides component library/animation framework/3D utilities; each domain unit owns its full-stack slice (pages + API + data); BFF gateway aggregates for complex views

---

### D2-6: Design System & Interactions
**Question**: The immersive design (3D, animations, micro-interactions) is a cross-cutting concern. How should it be organized?
- 1) Embedded — Design/interaction code lives within each domain unit's components
- 2) Dedicated Design System unit — Centralized component library, animation framework, 3D utilities used by all units **(Selected — maximum separation)**
- 3) Split — Core design tokens shared, complex interactions (3D, animations) owned by the units that use them
- 4) Other (please specify): _______

**Answer**: 2) Dedicated Design System unit — full component library with animation primitives, 3D viewer components, kinetic typography system, micro-interaction hooks, theming (dark/light), custom cursor, and ambient sound engine. All domain units consume this.

---

### D2-7: Development Sequence Priority
**Question**: Which units should be developed first?
- 1) Foundation → Product → Cart → User → then Subscription, Educational, Loyalty in parallel
- 2) Foundation → User → Product → Subscription → then Cart, Educational, Loyalty
- 3) Foundation → All units in parallel (maximum parallelism, higher coordination risk) **(Selected — maximum complexity)**
- 4) Other (please specify): _______

**Answer**: 3) Foundation → then ALL domain units in parallel — maximum parallelism. Foundation defines contracts/events/shared kernel, then each unit develops independently against those contracts. High coordination but fastest delivery.

---

### D2-8: AI/ML Pipeline Isolation
**Question**: The AI personalization engine involves ML models, data pipelines, and real-time inference. How should it be isolated?
- 1) Embedded in User unit — Personalization logic lives inside the user management unit
- 2) Dedicated AI/Personalization unit — Separate unit with its own data pipeline, model serving, and API **(Selected — maximum isolation)**
- 3) External service — AI handled entirely by external APIs (OpenAI only), no internal ML infrastructure
- 4) Other (please specify): _______

**Answer**: 2) Dedicated AI/Personalization unit — fully isolated with its own data lake, feature store, model training pipeline, real-time inference API, and A/B experimentation framework. Consumes events from all other units for behavior tracking.

---

## Decisions Summary
- D2-1 Architecture: Microservices — independently deployable, event-driven, maximum scalability
- D2-2 Strategy: Domain-Driven — each unit is a bounded context with own data store
- D2-3 Granularity: Fine (10 units) — maximum separation and parallelism
- D2-4 Shared Kernel: Shared kernel module — core value objects, event schemas, API contracts
- D2-5 Frontend/Backend: Hybrid — design system unit + domain units with full-stack slices + BFF gateway
- D2-6 Design System: Dedicated unit — component library, animation framework, 3D, theming, sound
- D2-7 Sequence: Foundation → all units in parallel (maximum parallelism)
- D2-8 AI Pipeline: Dedicated unit — isolated ML pipeline, feature store, inference API, experimentation

---

**Instructions**: All answers filled — maximum complexity selections across all decisions.
