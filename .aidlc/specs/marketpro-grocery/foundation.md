# Foundation Specification

## Summary
- **Language**: TypeScript (Node.js) — full-stack
- **Monorepo**: Turborepo + pnpm workspaces
- **Architecture**: Microservices — API Gateway + BFF + Domain Services + Kafka Event Bus
- **Auth**: OAuth2 + JWT (RBAC, refresh rotation)
- **Communication**: Mixed — REST/gRPC sync + Kafka async events
- **Database**: PostgreSQL per service + Redis cache + Elasticsearch search
- **Contracts**: Code-generated from OpenAPI + Protobuf + Avro schemas
- **Observability**: Full OpenTelemetry (traces, metrics, logs, alerts)
- **Deployment**: Canary (1% → 10% → 50% → 100%) with auto-rollback
- **Infrastructure Units**: 4 — Foundation, API Gateway, Event Bus, Auth Service

## Repository Structure

```
matcha/                              # Turborepo monorepo root
├── turbo.json                       # Turborepo pipeline config
├── pnpm-workspace.yaml              # Workspace definitions
├── package.json                     # Root scripts, devDependencies
├── .github/
│   └── workflows/
│       ├── ci.yml                   # Lint, test, build (affected only)
│       ├── deploy-canary.yml        # Canary deployment pipeline
│       └── release.yml              # Production release
├── packages/
│   ├── contracts/                   # @matcha/contracts — auto-generated types
│   │   ├── openapi/                 # REST API specs per service
│   │   ├── protobuf/                # gRPC + event schemas
│   │   ├── avro/                    # Kafka event schemas (Schema Registry)
│   │   ├── generated/               # Auto-generated TypeScript types
│   │   └── package.json
│   ├── shared-kernel/               # @matcha/shared-kernel — core value objects
│   │   ├── src/
│   │   │   ├── value-objects/       # Money, UserId, ProductId, etc.
│   │   │   ├── events/             # Base event classes, event bus interface
│   │   │   ├── errors/             # RFC 7807 error classes
│   │   │   ├── auth/               # JWT types, RBAC roles, middleware
│   │   │   └── index.ts
│   │   └── package.json
│   ├── ui/                          # @matcha/ui — Design system components
│   │   ├── src/
│   │   │   ├── components/          # Shared React components
│   │   │   ├── animations/          # Animation primitives, hooks
│   │   │   ├── three/              # 3D viewer components (React Three Fiber)
│   │   │   ├── sound/              # Ambient sound engine
│   │   │   ├── theme/              # Dark/light tokens, CSS variables
│   │   │   └── index.ts
│   │   └── package.json
│   ├── config/                      # @matcha/config — shared configs
│   │   ├── eslint/                  # ESLint presets
│   │   ├── tsconfig/                # TypeScript presets
│   │   ├── prettier/                # Prettier config
│   │   └── vitest/                  # Vitest presets
│   └── telemetry/                   # @matcha/telemetry — OpenTelemetry setup
│       ├── src/
│       │   ├── tracer.ts            # Distributed tracing init
│       │   ├── metrics.ts           # Prometheus metrics
│       │   ├── logger.ts            # Structured JSON logger
│       │   └── index.ts
│       └── package.json
├── services/
│   ├── gateway/                     # API Gateway service
│   │   ├── src/
│   │   │   ├── routes/              # Route definitions → service proxying
│   │   │   ├── middleware/          # Rate limiting, auth verification, CORS
│   │   │   ├── aggregation/         # BFF aggregation for complex views
│   │   │   └── index.ts
│   │   ├── Dockerfile
│   │   └── package.json
│   ├── auth/                        # Auth Service (OAuth2 provider)
│   │   ├── src/
│   │   │   ├── oauth/               # OAuth2 flows, token issuance
│   │   │   ├── users/              # User credential management
│   │   │   ├── rbac/              # Role/permission management
│   │   │   └── index.ts
│   │   ├── Dockerfile
│   │   └── package.json
│   ├── event-bus/                   # Kafka management service
│   │   ├── src/
│   │   │   ├── producer.ts          # Shared producer with schema validation
│   │   │   ├── consumer.ts          # Consumer group management
│   │   │   ├── schema-registry.ts   # Avro schema registration
│   │   │   ├── dead-letter.ts       # DLQ handling
│   │   │   └── index.ts
│   │   ├── Dockerfile
│   │   └── package.json
│   ├── product/                     # matcha-product service
│   ├── user/                        # matcha-user service
│   ├── subscription/                # matcha-subscription service
│   ├── ai/                          # matcha-ai service
│   ├── education/                   # matcha-education service
│   ├── loyalty/                     # matcha-loyalty service
│   ├── cart/                        # matcha-cart service
│   ├── i18n/                        # matcha-i18n service
│   └── admin/                       # matcha-admin service
├── apps/
│   └── web/                         # Next.js 14 frontend (App Router)
│       ├── src/
│       │   ├── app/                 # Next.js App Router pages
│       │   ├── components/          # App-specific components
│       │   ├── hooks/               # Custom React hooks
│       │   ├── lib/                 # API clients, utilities
│       │   └── styles/              # Tailwind config, global styles
│       ├── public/                  # Static assets
│       ├── next.config.ts
│       └── package.json
├── infrastructure/
│   ├── docker/
│   │   ├── docker-compose.yml       # Local dev environment
│   │   └── docker-compose.test.yml  # Integration test environment
│   ├── k8s/                         # Kubernetes manifests
│   │   ├── base/                    # Base configs
│   │   └── overlays/               # Environment-specific (staging, prod)
│   └── terraform/                   # Cloud infrastructure (AWS)
│       ├── modules/
│       └── environments/
├── scripts/
│   ├── codegen.ts                   # Generate types from schemas
│   ├── seed.ts                      # Database seeding
│   └── migrate.ts                   # Run all service migrations
└── docs/
    ├── architecture.md              # System architecture overview
    ├── adr/                         # Architecture Decision Records
    └── runbooks/                    # Operational runbooks
```

## Authentication & Authorization

### OAuth2 + JWT Flow
```
Client → Auth Service (OAuth2)
  → Issues: Access Token (JWT, 15min) + Refresh Token (opaque, 7d)
  → Access Token claims: { sub, email, roles[], tier, locale, exp, iat, jti }

Client → API Gateway
  → Verifies JWT signature (RS256 public key)
  → Extracts claims, attaches to request context
  → Routes to service

Service → Service (internal)
  → Propagates JWT in Authorization header
  → Each service verifies independently (shared public key)
```

### RBAC Roles
| Role | Permissions |
|------|-------------|
| anonymous | Read products, content, categories |
| customer | anonymous + cart, orders, profile, reviews, journal |
| subscriber | customer + subscription management, loyalty dashboard |
| content_admin | customer + content CMS, product management |
| operations_admin | content_admin + analytics, A/B testing, forecasting, user management |

### Token Refresh
- Access token: 15 minutes, RS256 signed
- Refresh token: 7 days, opaque, stored in Redis, rotation on use (old token invalidated)
- Token introspection endpoint for sensitive operations (payment, subscription changes)

## Error Handling (RFC 7807)

### Standard Error Format
```typescript
interface ProblemDetail {
  type: string;          // URI reference to error documentation
  title: string;         // Short, human-readable summary
  status: number;        // HTTP status code
  detail: string;        // Human-readable explanation specific to this occurrence
  instance: string;      // URI identifying this specific occurrence
  // Extensions:
  correlationId: string; // Distributed tracing correlation ID
  timestamp: string;     // ISO-8601
  errors?: ValidationError[]; // For 422 validation errors
  localized?: {          // i18n support
    title: string;
    detail: string;
  };
}

interface ValidationError {
  field: string;
  code: string;
  message: string;
  params?: Record<string, unknown>;
}
```

### Shared Error Codes
| Code | HTTP | Usage |
|------|------|-------|
| MATCHA-001 | 400 | Invalid request body |
| MATCHA-002 | 401 | Authentication required |
| MATCHA-003 | 403 | Insufficient permissions |
| MATCHA-004 | 404 | Resource not found |
| MATCHA-005 | 409 | Conflict (duplicate, version mismatch) |
| MATCHA-006 | 422 | Validation failed (with errors array) |
| MATCHA-007 | 429 | Rate limited |
| MATCHA-008 | 500 | Internal server error |
| MATCHA-009 | 503 | Service unavailable (dependency down) |
| MATCHA-010 | 402 | Payment required/failed |

## Inter-Unit Communication

### Synchronous (REST/gRPC)
- **REST**: Service-to-service HTTP calls for queries (product lookup, user validation, stock check)
- **gRPC**: High-performance internal calls between tightly-coupled services (gateway ↔ services)
- **Circuit breaker**: Resilience4j pattern — 5 failures → open → 30s half-open → retry
- **Timeout**: 3s default, 10s for aggregation calls
- **Retry**: Exponential backoff, max 3 retries, idempotency key required

### Asynchronous (Kafka Domain Events)
- **Topics**: One topic per aggregate (e.g., `matcha.orders`, `matcha.subscriptions`, `matcha.users`)
- **Partitioning**: By aggregate ID (ensures ordering per entity)
- **Retention**: 7 days (14 days for AI training data topics)
- **Consumer groups**: One per consuming service
- **Schema enforcement**: Avro schemas registered in Confluent Schema Registry, backward-compatible evolution
- **Idempotency**: Every event handler checks `eventId` against processed events table before processing
- **Dead Letter Queue**: Failed events (3 retries) → DLQ topic → alerting → manual resolution

### Event Schema Standard
```typescript
interface DomainEvent<T = unknown> {
  eventId: string;           // UUID v4
  eventType: string;         // e.g., "order.completed"
  source: string;            // Service name
  timestamp: string;         // ISO-8601
  correlationId: string;     // Request correlation
  causationId: string;       // ID of event that caused this
  version: number;           // Schema version
  payload: T;                // Event-specific data
  metadata: {
    userId?: string;
    tenantId?: string;
    traceId: string;
  };
}
```

## Database Strategy

### Per-Service Isolation
| Service | Primary DB | Cache | Search |
|---------|-----------|-------|--------|
| product | PostgreSQL (products, variants, categories) | Redis (product listings, pricing) | Elasticsearch (product search, facets) |
| user | PostgreSQL (users, profiles, journal, reviews) | Redis (sessions, taste profiles) | — |
| subscription | PostgreSQL (subscriptions, schedules, billing) | Redis (cadence predictions) | — |
| ai | PostgreSQL (models, experiments) + ClickHouse (behavior events) | Redis (real-time features) | — |
| education | PostgreSQL (content, guides, progress) | Redis (PWA cache manifest) | Elasticsearch (content search) |
| loyalty | PostgreSQL (accounts, achievements, challenges) | Redis (leaderboard, streaks) | — |
| cart | PostgreSQL (carts, orders, payments) | Redis (cart sessions) | — |
| i18n | PostgreSQL (translations, rates, tax rules) | Redis (exchange rates, translations) | — |
| admin | Read replicas from other services | Redis (dashboard cache) | — |

### Migration Strategy
- Prisma ORM for schema management per service
- Migrations run independently per service
- No cross-service foreign keys (use event-driven eventual consistency)
- Admin service uses read replicas / materialized views, never writes to other service DBs

## Shared Types & Contracts

### Code Generation Pipeline
```
OpenAPI specs (services/*/openapi.yaml)
  → openapi-typescript → TypeScript interfaces (@matcha/contracts/rest)

Protobuf schemas (packages/contracts/protobuf/*.proto)
  → ts-proto → TypeScript types (@matcha/contracts/grpc)

Avro schemas (packages/contracts/avro/*.avsc)
  → avro-ts → TypeScript types (@matcha/contracts/events)

Run: `pnpm turbo codegen` → generates all contracts → type-checks all services
```

### Shared Value Objects (@matcha/shared-kernel)
```typescript
// Core value objects — immutable, validated at creation
class Money { constructor(amount: number, currency: CurrencyCode) }
class UserId { constructor(value: string) } // UUID
class ProductId { constructor(value: string) } // UUID
class SubscriptionId { constructor(value: string) }
class OrderId { constructor(value: string) }
class SKU { constructor(value: string) } // format: GRADE-ORIGIN-WEIGHT-GRIND
class FlavorVector { constructor(umami: number, sweet: number, vegetal: number, body: number) }
class Locale { constructor(language: LanguageCode, region?: RegionCode) }
```

## Observability (OpenTelemetry)

### Distributed Tracing
- Every request gets a `traceId` at the API Gateway
- Propagated via W3C Trace Context headers across all service calls and Kafka events
- Spans created for: HTTP handlers, DB queries, Kafka produce/consume, external API calls
- Exported to Jaeger/Tempo for visualization

### Structured Logging
```typescript
// Every log entry includes:
{
  level: "info" | "warn" | "error",
  message: string,
  service: string,
  traceId: string,
  spanId: string,
  correlationId: string,
  userId?: string,
  timestamp: string, // ISO-8601
  ...contextFields
}
```

### Metrics (Prometheus)
- HTTP request duration (histogram, by service/endpoint/status)
- Kafka consumer lag (gauge, by topic/group)
- DB connection pool usage (gauge)
- Business metrics: orders/min, subscription churn rate, recommendation latency
- Custom dashboards per service in Grafana

### Alerting
- Error rate >1% sustained 5min → PagerDuty critical
- Kafka consumer lag >1000 messages → PagerDuty warning
- Service response time p99 >3s → PagerDuty warning
- Canary deployment error rate >0.5% → auto-rollback + alert

## CI/CD Pipeline

### GitHub Actions Workflow
```yaml
# Triggered on PR to main:
1. Affected Detection (Turborepo) → only build/test changed services
2. Lint (ESLint + Prettier) → parallel per package
3. Type Check (tsc --noEmit) → parallel per package
4. Unit Tests (Vitest) → parallel per package
5. Contract Tests → verify schemas compatibility
6. Integration Tests → docker-compose test environment
7. Build (Docker images) → only affected services
8. Security Scan (Snyk/Trivy) → container images

# On merge to main:
1. Build + Push Docker images
2. Deploy to staging (full deployment)
3. Run E2E tests against staging
4. Canary deploy to production (1% traffic)
5. Monitor 15min → auto-promote or rollback
```

### Feature Flags (LaunchDarkly/Unleash)
- All incomplete features behind flags
- Canary: flag enabled for 1% → progressive rollout
- Kill switch: disable any feature instantly without deploy
- A/B test integration: feature flags drive experiment allocation

## Development Conventions

### Code Style
- ESLint: strict TypeScript rules + import sorting + no-unused
- Prettier: 2-space indent, single quotes, trailing commas
- Husky + lint-staged: pre-commit formatting
- Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:` — enforced by commitlint

### Testing Strategy
| Level | Tool | Coverage Target | Where |
|-------|------|----------------|-------|
| Unit | Vitest | >80% per service | `services/*/src/**/*.test.ts` |
| Integration | Vitest + Testcontainers | Critical paths | `services/*/tests/integration/` |
| Contract | Pact | All service interfaces | `packages/contracts/tests/` |
| E2E | Playwright | Core user flows | `apps/web/e2e/` |
| Performance | k6 | Latency budgets | `tests/performance/` |

### Service Template
Every new service scaffolded with:
```
services/{name}/
├── src/
│   ├── domain/          # Aggregates, entities, value objects, events
│   ├── application/     # Use cases, command/query handlers
│   ├── infrastructure/  # DB repos, external API clients, Kafka consumers
│   ├── api/            # REST/gRPC handlers, DTOs, validation
│   ├── config/         # Service-specific config
│   └── index.ts        # Service bootstrap
├── prisma/
│   └── schema.prisma    # Service-specific DB schema
├── tests/
│   ├── unit/
│   └── integration/
├── openapi.yaml         # REST API spec
├── Dockerfile
├── package.json
└── tsconfig.json
```
