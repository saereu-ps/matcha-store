# Tasks — matcha-foundation

## Summary
- **Total Tasks**: 32 across 6 phases
- **Execution Waves**: 4 waves (2 parallel)
- **Coverage**: 7 components, 0 entities, 0 endpoints, 0 integrations (infrastructure unit)
- **Strategy**: Component-first, sequential phases

---

- [x] 1. Monorepo Scaffold & Configuration
  - [x] 1.1 Initialize pnpm workspace
  - [x] 1.2 Create shared configuration package (@matcha/config)
  - [x] 1.3 Configure commit tooling
  - [x] 1.4 VS Code workspace setup
  - [x] 1.5 Create .gitignore and repository config

- [x] 2. Shared Kernel Package (@matcha/shared-kernel)
  - [x] 2.1 Initialize shared-kernel package structure
  - [x] 2.2 Implement core value objects
  - [x] 2.3 Implement domain-specific value objects
  - [x] 2.4 Implement Result type and error handling
  - [x] 2.5 Implement domain event base
  - [x] 2.6 Implement auth utilities
  - [x] 2.7 Implement base repository interface
    - Create `packages/shared-kernel/package.json` with exports map
    - Create `packages/shared-kernel/tsconfig.json` extending @matcha/config base
    - Create directory structure: `src/value-objects/`, `src/events/`, `src/errors/`, `src/auth/`
    - Create barrel export `src/index.ts`
    - Files: `packages/shared-kernel/`
  - [ ] 2.2 Implement core value objects
    - Implement `Money` (amount + currency, arithmetic methods, formatting)
    - Implement `UserId`, `ProductId`, `SubscriptionId`, `OrderId` (UUID-based, validation)
    - Implement `SKU` (format: GRADE-ORIGIN-WEIGHT-GRIND, parsing, validation)
    - Implement `Email` (validation, normalization)
    - Write unit tests for all value objects (immutability, equality, validation)
    - Files: `packages/shared-kernel/src/value-objects/`
  - [ ] 2.3 Implement domain-specific value objects
    - Implement `FlavorVector` (umami/sweet/vegetal/body scores 0-100, distance calculation)
    - Implement `Locale` (language + region, formatting helpers)
    - Implement `CurrencyCode` (ISO 4217 validation)
    - Implement `Grade` enum (Ceremonial, Premium, Culinary)
    - Write unit tests
    - Files: `packages/shared-kernel/src/value-objects/`
  - [ ] 2.4 Implement Result type and error handling
    - Implement `Result<T, E>` with `Ok<T>` and `Err<E>` variants
    - Implement `ProblemDetail` class (RFC 7807 structure)
    - Implement `ValidationError` with field-level errors
    - Implement error factory functions for MATCHA-001 through MATCHA-010
    - Implement `toHttpResponse()` serialization method
    - Write unit tests
    - Files: `packages/shared-kernel/src/errors/`
  - [ ] 2.5 Implement domain event base
    - Implement `DomainEvent<T>` interface with metadata (eventId, timestamp, correlationId, causationId, version)
    - Implement `EventBus` interface (publish, subscribe, unsubscribe)
    - Implement `InMemoryEventBus` for testing
    - Implement event serialization/deserialization helpers
    - Write unit tests
    - Files: `packages/shared-kernel/src/events/`
  - [ ] 2.6 Implement auth utilities
    - Implement JWT verification function (RS256, public key validation)
    - Implement token claims extraction (sub, email, roles, tier, locale)
    - Implement RBAC middleware factory (`requireRole('admin')`, `requirePermission('write:products')`)
    - Implement `AuthContext` type and request enrichment
    - Write unit tests with mock tokens
    - Files: `packages/shared-kernel/src/auth/`
  - [ ] 2.7 Implement base repository interface
    - Define `Repository<T, ID>` interface (findById, findMany, save, delete)
    - Define `PagedResult<T>` type for pagination
    - Define `QueryFilter` types for flexible querying
    - Write interface documentation
    - Files: `packages/shared-kernel/src/repository/`

- [x] 3. Contracts Package (@matcha/contracts)
  - [x] 3.1 Initialize contracts package structure
  - [x] 3.2 Create base OpenAPI schemas
  - [x] 3.3 Create base Protobuf definitions
  - [x] 3.4 Create base Avro event schemas
  - [x] 3.5 Implement code generation pipeline
  - [ ] 3.1 Initialize contracts package structure
    - Create `packages/contracts/package.json` with exports map
    - Create directory structure: `openapi/`, `protobuf/`, `avro/`, `generated/`
    - Create `packages/contracts/tsconfig.json`
    - Files: `packages/contracts/`
  - [ ] 3.2 Create base OpenAPI schemas
    - Create shared components schema (`openapi/shared/components.yaml`) — error responses, pagination, common parameters
    - Create per-service stub specs with health endpoint (`openapi/product.yaml`, `openapi/user.yaml`, etc.)
    - Define reusable schemas for value objects (Money, Locale, etc.)
    - Files: `packages/contracts/openapi/`
  - [ ] 3.3 Create base Protobuf definitions
    - Create common messages (`protobuf/common/money.proto`, `user_id.proto`, `pagination.proto`)
    - Create service stubs for gRPC interfaces
    - Create health check proto
    - Files: `packages/contracts/protobuf/`
  - [ ] 3.4 Create base Avro event schemas
    - Create DomainEvent envelope schema (`avro/common/domain-event.avsc`)
    - Create core event schemas (UserRegistered, OrderPlaced, SubscriptionCreated — minimal fields)
    - Configure schema compatibility settings (BACKWARD)
    - Files: `packages/contracts/avro/`
  - [ ] 3.5 Implement code generation pipeline
    - Install and configure `openapi-typescript` for REST type generation
    - Install and configure `ts-proto` for gRPC type generation
    - Install and configure `avro-ts` for event type generation
    - Create `scripts/codegen.ts` orchestrating all generators
    - Create barrel exports in `generated/rest/`, `generated/grpc/`, `generated/events/`
    - Add `codegen` script to turbo.json pipeline
    - Verify generated types compile without errors
    - Files: `packages/contracts/scripts/`, `packages/contracts/generated/`

- [x] 4. Telemetry Package (@matcha/telemetry)
  - [x] 4.1 Initialize telemetry package
  - [x] 4.2 Implement distributed tracing
  - [x] 4.3 Implement metrics collector
  - [x] 4.4 Implement structured logger
  - [x] 4.5 Implement middleware integrations
  - [ ] 4.1 Initialize telemetry package
    - Create `packages/telemetry/package.json` with OpenTelemetry SDK dependencies
    - Create `packages/telemetry/tsconfig.json`
    - Create directory structure: `src/`
    - Files: `packages/telemetry/`
  - [ ] 4.2 Implement distributed tracing
    - Implement tracer initialization with W3C Trace Context propagation
    - Configure Jaeger/OTLP exporter (configurable via env vars)
    - Implement span creation helpers for common operations
    - Implement context propagation for Kafka headers
    - Write unit tests with mock exporter
    - Files: `packages/telemetry/src/tracer.ts`
  - [ ] 4.3 Implement metrics collector
    - Implement Prometheus metrics registry
    - Create standard HTTP metrics (request duration histogram, request count, error rate)
    - Create business metric helpers (counter, gauge, histogram factories)
    - Implement metrics endpoint handler (`/metrics`)
    - Write unit tests
    - Files: `packages/telemetry/src/metrics.ts`
  - [ ] 4.4 Implement structured logger
    - Implement pino-based JSON logger with trace context auto-injection
    - Implement log level configuration via env vars
    - Implement correlation ID extraction from request headers
    - Implement child logger factory (per-request context)
    - Write unit tests
    - Files: `packages/telemetry/src/logger.ts`
  - [ ] 4.5 Implement middleware integrations
    - Implement Express auto-instrumentation middleware (spans + metrics + logging)
    - Implement Kafka consumer/producer instrumentation hooks
    - Implement Prisma query span instrumentation
    - Create unified `initTelemetry()` bootstrap function
    - Write integration test with mock collectors
    - Files: `packages/telemetry/src/middleware/`, `packages/telemetry/src/index.ts`

- [x] 5. Dev Tooling & Local Environment
  - [x] 5.1 Create Docker Compose for local development
  - [x] 5.2 Create service template
  - [x] 5.3 Implement scaffolding script
  - [x] 5.4 Implement database scripts
  - [x] 5.5 Create environment configuration
  - [ ] 5.1 Create Docker Compose for local development
    - Define PostgreSQL service (port 5432, persistent volume)
    - Define Redis service (port 6379)
    - Define Kafka + Zookeeper services (port 9092)
    - Define Confluent Schema Registry (port 8081)
    - Define Elasticsearch (port 9200)
    - Define health check scripts for all services
    - Create `docker-compose.test.yml` variant for CI (ephemeral, no volumes)
    - Files: `infrastructure/docker/`
  - [ ] 5.2 Create service template
    - Create `services/_template/` with standard directory structure (domain/, application/, infrastructure/, api/)
    - Create template `package.json` with common dependencies
    - Create template `tsconfig.json` extending @matcha/config
    - Create template `Dockerfile` (multi-stage build: build → production)
    - Create template `prisma/schema.prisma` with base config
    - Create template health endpoint and tests
    - Files: `services/_template/`
  - [ ] 5.3 Implement scaffolding script
    - Implement `scripts/new-service.ts` — interactive prompts for service name, description
    - Copy template, replace placeholders, add to workspace
    - Register in turbo.json pipelines
    - Create initial Prisma migration
    - Verify the new service builds and tests pass
    - Files: `scripts/new-service.ts`
  - [ ] 5.4 Implement database scripts
    - Implement `scripts/migrate.ts` — discover all services with prisma/, run `prisma migrate deploy`
    - Implement `scripts/seed.ts` — read `prisma/seed.ts` from each service, execute
    - Implement `scripts/reset.ts` — drop all databases, recreate, migrate, seed
    - Files: `scripts/migrate.ts`, `scripts/seed.ts`, `scripts/reset.ts`
  - [ ] 5.5 Create environment configuration
    - Create `.env.example` documenting all required env vars per service
    - Create `packages/shared-kernel/src/config/env.ts` — type-safe env var loader with validation
    - Document local setup instructions in `docs/getting-started.md`
    - Files: `.env.example`, `packages/shared-kernel/src/config/`, `docs/getting-started.md`

- [x] 6. CI/CD Pipeline
  - [x] 6.1 Create CI workflow
  - [x] 6.2 Create deployment workflow stubs
  - [x] 6.3 Configure dependency management
  - [ ] 6.1 Create CI workflow
    - Create `.github/workflows/ci.yml` triggered on PR to main
    - Implement Turborepo affected detection (`turbo run build --filter=...[HEAD^]`)
    - Add parallel jobs: lint, type-check, unit test (per affected package)
    - Add contract test job (verify schema compatibility)
    - Add integration test job (docker-compose.test + service tests)
    - Add build job (Docker images for affected services only)
    - Files: `.github/workflows/ci.yml`
  - [ ] 6.2 Create deployment workflow stubs
    - Create `.github/workflows/deploy-canary.yml` (triggered on merge to main)
    - Define stages: build → push images → deploy staging → E2E → canary prod
    - Add auto-rollback step (monitor error rate 15min, rollback if >0.5%)
    - Create `.github/workflows/release.yml` (manual promote canary → full)
    - Files: `.github/workflows/deploy-canary.yml`, `.github/workflows/release.yml`
  - [ ] 6.3 Configure dependency management
    - Create `.github/dependabot.yml` for automated dependency updates
    - Configure update schedule (weekly), group minor updates
    - Add security scan job to CI (Snyk or Trivy on Docker images)
    - Files: `.github/dependabot.yml`

---

## Execution Waves

### Wave 1 (Sequential — foundation)
- **Phase 1**: Monorepo Scaffold & Configuration
  - Owns: `pnpm-workspace.yaml`, `package.json`, `turbo.json`, `packages/config/`, `.husky/`, `.vscode/`, `.gitignore`, `.nvmrc`, `.npmrc`, `commitlint.config.js`, `.editorconfig`

### Wave 2 (Parallel — core packages)
- **Phase 2**: Shared Kernel Package
  - Owns: `packages/shared-kernel/`
- **Phase 3**: Contracts Package
  - Owns: `packages/contracts/`

### Wave 3 (Parallel — tooling)
- **Phase 4**: Telemetry Package
  - Owns: `packages/telemetry/`
- **Phase 5**: Dev Tooling & Local Environment
  - Owns: `infrastructure/docker/`, `services/_template/`, `scripts/`, `docs/getting-started.md`, `.env.example`

### Wave 4 (Sequential — depends on all above)
- **Phase 6**: CI/CD Pipeline
  - Owns: `.github/`

---

## Dependencies

| Phase | Depends On |
|-------|-----------|
| Phase 1 | None |
| Phase 2 | Phase 1 (needs config package) |
| Phase 3 | Phase 1 (needs config package) |
| Phase 4 | Phase 2 (imports shared-kernel for types) |
| Phase 5 | Phase 2 (template uses shared-kernel), Phase 3 (template uses contracts) |
| Phase 6 | Phase 1-5 (CI runs all packages) |
