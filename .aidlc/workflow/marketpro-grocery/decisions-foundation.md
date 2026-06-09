# Foundation Decisions

## Context Summary
- **Feature**: Enterprise-grade premium matcha tea e-commerce platform
- **Architecture**: Microservices — independently deployable, event-driven
- **Units**: 10 domain units + shared kernel
- **Strategy**: Domain-Driven, fine granularity, maximum parallelism
- **Team**: Medium (4–8 developers)
- **Stack Pending**: TypeScript / Next.js 14 / Tailwind CSS / PostgreSQL / Redis / Elasticsearch recommended
- **Key Needs**: Event bus, API gateway, 3D rendering, ML pipeline, real-time WebSocket, multi-currency, PWA

---

## Decision Questions

### DF-1: Primary Language & Runtime
**Question**: What primary language and runtime will be used across all services?
- 1) TypeScript (Node.js) — Full-stack, strong typing, massive ecosystem **(Selected)**
- 2) Python — Great for ML/AI, weaker for frontend
- 3) Go — Excellent performance, weaker frontend story
- 4) Other (please specify): _______

**Answer**: 1) TypeScript (Node.js) — full-stack TypeScript for all services, shared type safety across frontend and backend

---

### DF-2: Package Manager & Monorepo Tooling
**Question**: What package manager and monorepo tooling?
- 1) pnpm workspaces — Fast, disk-efficient, strict dependency resolution
- 2) Turborepo + pnpm — pnpm workspaces + Turborepo for build orchestration and caching **(Selected — maximum tooling)**
- 3) Nx + pnpm — Full monorepo framework with computation caching and affected analysis
- 4) Other (please specify): _______

**Answer**: 2) Turborepo + pnpm — pnpm workspaces for dependency management, Turborepo for build orchestration, remote caching, and parallel task execution

---

### DF-3: Repository Strategy
**Question**: How should code be organized across repositories?
- 1) Monorepo — All services, packages, and apps in one repository **(Selected — maximum cohesion)**
- 2) Multi-repo — Each service in its own repository
- 3) Hybrid — Shared packages in monorepo, services in separate repos
- 4) Other (please specify): _______

**Answer**: 1) Monorepo — all 10 services, shared packages, infrastructure, and apps in a single Turborepo monorepo for maximum code sharing, atomic changes, and unified CI/CD

---

### DF-4: API Architecture
**Question**: How should services expose APIs to the frontend?
- 1) API Gateway — Single entry point routing to backend services
- 2) BFF (Backend for Frontend) — Dedicated aggregation layer per client type
- 3) Hybrid — API Gateway for routing + BFF for complex aggregation **(Selected — maximum architecture)**
- 4) Other (please specify): _______

**Answer**: 3) Hybrid — Kong/Express API Gateway for routing, rate limiting, and auth verification PLUS a Next.js BFF layer that aggregates data from multiple services for complex views (homepage, product pages)

---

### DF-5: Authentication & Authorization
**Question**: What authentication approach for the microservices architecture?
- 1) JWT — Stateless tokens, easy to verify at each service
- 2) OAuth2 + JWT — Full OAuth2 flows with JWT access tokens **(Selected — enterprise-grade)**
- 3) Session-based — Centralized sessions via Redis
- 4) Other (please specify): _______

**Answer**: 2) OAuth2 + JWT — Auth0/custom OAuth2 server issuing JWT access tokens with refresh token rotation, RBAC claims in token, token introspection for sensitive operations

---

### DF-6: Error Handling Format
**Question**: What error format should all services use?
- 1) RFC 7807 Problem Details — Standard HTTP problem format **(Selected — industry standard)**
- 2) Custom envelope — { success, data, error: { code, message, details } }
- 3) Framework default — Let each framework handle errors its own way
- 4) Other (please specify): _______

**Answer**: 1) RFC 7807 Problem Details — standard format with extensions for correlation IDs, validation errors array, and localized messages

---

### DF-7: Inter-Unit Communication
**Question**: How should services communicate with each other?
- 1) REST only — Synchronous HTTP between services
- 2) Events only — Fully asynchronous via message broker
- 3) Mixed — REST for queries, Events for commands/state changes **(Selected — maximum flexibility)**
- 4) Other (please specify): _______

**Answer**: 3) Mixed — REST/gRPC for synchronous queries (product lookup, user validation), domain events via message broker for asynchronous state changes (order placed, subscription renewed, behavior tracked)

---

### DF-8: Event Broker
**Question**: What message broker for domain events?
- 1) Redis Streams — Simple, already in stack for caching
- 2) RabbitMQ — Feature-rich, good for complex routing
- 3) Apache Kafka — Maximum throughput, event sourcing capable, log-based **(Selected — maximum scale)**
- 4) Other (please specify): _______

**Answer**: 3) Apache Kafka — event log for all domain events, enables event sourcing, replay, and stream processing for the AI/analytics pipeline. Schema Registry for contract enforcement.

---

### DF-9: Database Strategy
**Question**: How should databases be managed across services?
- 1) Shared DB, separate schemas — One PostgreSQL instance, schema-per-service
- 2) Database per service — Independent DB per service **(Selected — maximum isolation)**
- 3) Mixed — PostgreSQL per service + Redis shared cache + Elasticsearch shared search
- 4) Other (please specify): _______

**Answer**: 2) Database per service — each service owns its PostgreSQL instance/schema, Redis per-service for caching, shared Elasticsearch cluster for search (read-only cross-service), shared Kafka for events

---

### DF-10: Shared Types Strategy
**Question**: How should shared types/contracts be managed?
- 1) Shared TypeScript package — @matcha/shared-types imported by all services
- 2) Code generation from schemas — OpenAPI/Protobuf specs generate types **(Selected — maximum contract enforcement)**
- 3) Manual sync — Each service defines its own types
- 4) Other (please specify): _______

**Answer**: 2) Code generation — OpenAPI specs for REST contracts, Protobuf for events/gRPC, Avro schemas in Kafka Schema Registry. Types auto-generated into @matcha/contracts package. Breaking changes detected at build time.

---

### DF-11: Infrastructure Units Strategy
**Question**: How should infrastructure concerns be organized?
- 1) Combined — Single Foundation unit handles all shared infra
- 2) Separate — Individual infra units (Gateway, Event Bus, Auth Service) **(Selected — maximum separation)**
- 3) Minimal — Managed services only, no custom infra units
- 4) Other (please specify): _______

**Answer**: 2) Separate — Foundation (scaffold + shared packages + dev tooling), API Gateway (routing + rate limiting), Event Bus (Kafka + Schema Registry), Auth Service (OAuth2 + user management bridge)

---

### DF-12: CI/CD Pipeline
**Question**: What CI/CD tooling?
- 1) GitHub Actions — Native GitHub integration, marketplace actions **(Selected)**
- 2) GitLab CI — Built into GitLab, powerful pipelines
- 3) CircleCI — Fast, parallelism, Docker support
- 4) Other (please specify): _______

**Answer**: 1) GitHub Actions — monorepo-aware with Turborepo integration, parallel service builds, affected-only testing, automated canary deployments

---

### DF-13: Deployment Strategy
**Question**: How should services be deployed?
- 1) Blue-Green — Zero-downtime with full environment swap
- 2) Canary — Gradual rollout with traffic shifting **(Selected — safest for microservices)**
- 3) Rolling — Sequential instance replacement
- 4) Other (please specify): _______

**Answer**: 2) Canary — progressive deployment with 1% → 10% → 50% → 100% traffic shifting per service, automated rollback on error rate threshold, feature flags for fine-grained control

---

### DF-14: Observability & Logging
**Question**: What observability stack?
- 1) Basic — Structured logging + basic metrics
- 2) Standard — Structured logging + Prometheus metrics + basic tracing
- 3) Full — OpenTelemetry (traces + metrics + logs), distributed tracing across all services, Grafana dashboards, alerting **(Selected — enterprise observability)**
- 4) Other (please specify): _______

**Answer**: 3) Full OpenTelemetry — distributed tracing across all services, structured JSON logging with correlation IDs, Prometheus metrics, Grafana dashboards, PagerDuty alerting, Kafka consumer lag monitoring

---

### DF-15: Branch Strategy
**Question**: What branching strategy?
- 1) Trunk-based — Short-lived feature branches, merge to main daily **(Selected — best for CI/CD)**
- 2) GitFlow — Develop/release/hotfix branches
- 3) GitHub Flow — Feature branches, PR to main
- 4) Other (please specify): _______

**Answer**: 1) Trunk-based — short-lived feature branches (<1 day), merge to main via PR, feature flags for incomplete work, automated releases from main

---

## Decisions Summary
- DF-1 Language: TypeScript (Node.js) — full-stack
- DF-2 Package Manager: Turborepo + pnpm workspaces
- DF-3 Repository: Monorepo — all services in single repo
- DF-4 API Architecture: Hybrid — API Gateway + BFF aggregation layer
- DF-5 Auth: OAuth2 + JWT with RBAC, refresh token rotation
- DF-6 Errors: RFC 7807 Problem Details with extensions
- DF-7 Communication: Mixed — REST/gRPC sync + Kafka async events
- DF-8 Event Broker: Apache Kafka with Schema Registry
- DF-9 Database: Database per service (PostgreSQL) + shared Redis cache + shared Elasticsearch
- DF-10 Types: Code generation — OpenAPI + Protobuf + Avro, auto-generated @matcha/contracts
- DF-11 Infrastructure: Separate units — Foundation, API Gateway, Event Bus, Auth Service
- DF-12 CI/CD: GitHub Actions with Turborepo integration
- DF-13 Deployment: Canary — progressive traffic shifting with auto-rollback
- DF-14 Observability: Full OpenTelemetry — tracing, metrics, logging, alerting
- DF-15 Branch: Trunk-based with feature flags

---

**Instructions**: All answers filled — maximum complexity/enterprise-grade selections.
