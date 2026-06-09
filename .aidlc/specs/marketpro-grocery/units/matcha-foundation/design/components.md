# Components — matcha-foundation

## Summary
Infrastructure unit providing the monorepo scaffold, shared packages, dev tooling, and CI/CD pipeline that all other units depend on.

## Components

### 1. Monorepo Scaffold
**Purpose**: Turborepo + pnpm workspace configuration, root scripts, dev environment setup
**Responsibilities**:
- `turbo.json` pipeline definitions (build, test, lint, codegen, dev)
- `pnpm-workspace.yaml` workspace definitions
- Root `package.json` with workspace-level scripts
- Docker Compose for local dev (PostgreSQL, Redis, Kafka, Elasticsearch)
- `.env.example` with required environment variables

### 2. @matcha/shared-kernel
**Purpose**: Core value objects, event base classes, error handling, auth middleware
**Responsibilities**:
- Value objects: Money, UserId, ProductId, SubscriptionId, OrderId, SKU, FlavorVector, Locale, CurrencyCode
- Base event class implementing DomainEvent<T> interface
- RFC 7807 error classes (ProblemDetail, ValidationError, error factory functions)
- Auth middleware (JWT verification, RBAC decorator, token extraction)
- Base repository interface
- Result<T, E> type for error handling

### 3. @matcha/contracts
**Purpose**: Auto-generated TypeScript types from API specs and event schemas
**Responsibilities**:
- OpenAPI spec directory structure (one per service)
- Protobuf schema directory (gRPC service definitions)
- Avro schema directory (Kafka event schemas)
- Code generation scripts (openapi-typescript, ts-proto, avro-ts)
- Generated output directory with barrel exports
- Schema validation utilities

### 4. @matcha/config
**Purpose**: Shared tooling configurations ensuring consistency across all packages
**Responsibilities**:
- ESLint preset (strict TypeScript rules, import sorting, no-unused)
- TypeScript base configs (strict, paths, composite references)
- Prettier config (2-space, single quotes, trailing commas)
- Vitest preset (test utilities, coverage thresholds)
- Commitlint config (conventional commits)

### 5. @matcha/telemetry
**Purpose**: OpenTelemetry instrumentation shared across all services
**Responsibilities**:
- Tracer initialization (W3C Trace Context propagation)
- Metrics collector (Prometheus format)
- Structured JSON logger (with traceId, spanId, correlationId injection)
- Express/Fastify instrumentation middleware
- Kafka producer/consumer instrumentation
- Prisma query instrumentation

### 6. CI/CD Pipeline
**Purpose**: GitHub Actions workflows for the monorepo
**Responsibilities**:
- `ci.yml`: Turborepo affected detection → lint → type-check → unit test → contract test → integration test → build
- `deploy-canary.yml`: Build Docker images → deploy staging → E2E → canary production
- `release.yml`: Promote canary → full production rollout
- Reusable workflow fragments for common steps
- Dependabot configuration for dependency updates

### 7. Dev Tooling
**Purpose**: Developer experience scripts and local environment
**Responsibilities**:
- `scripts/codegen.ts`: Run all code generation pipelines
- `scripts/seed.ts`: Seed all service databases with dev data
- `scripts/migrate.ts`: Run Prisma migrations for all services
- `scripts/new-service.ts`: Scaffold a new service from template
- Husky pre-commit hooks (lint-staged)
- VS Code workspace settings and recommended extensions
