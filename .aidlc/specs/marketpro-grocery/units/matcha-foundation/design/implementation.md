# Implementation Plan — matcha-foundation

## Summary
Step-by-step implementation order for the foundation unit. Each step produces a working increment that later steps build on.

## Implementation Sequence

### Wave 1: Monorepo Scaffold
1. Initialize pnpm workspace with `pnpm-workspace.yaml`
2. Create `turbo.json` with pipeline definitions (build, test, lint, dev, codegen)
3. Set up root `package.json` with workspace scripts
4. Create `packages/config/` with ESLint, TypeScript, Prettier, Vitest presets
5. Configure Husky + lint-staged + commitlint
6. Create `.editorconfig` and VS Code workspace settings

### Wave 2: Shared Kernel Package
1. Create `packages/shared-kernel/` with TypeScript setup extending @matcha/config
2. Implement value objects: Money, UserId, ProductId, SubscriptionId, OrderId, SKU
3. Implement value objects: FlavorVector, Locale, CurrencyCode, Email
4. Implement Result<T, E> type with Ok/Err helpers
5. Implement RFC 7807 ProblemDetail class with error factory functions
6. Implement shared error codes (MATCHA-001 through MATCHA-010)
7. Implement DomainEvent<T> base class with metadata
8. Implement base repository interface (Repository<T, ID>)
9. Implement JWT auth utilities (verify, extract claims, RBAC middleware)
10. Write unit tests for all value objects and utilities

### Wave 3: Contracts Package
1. Create `packages/contracts/` directory structure (openapi/, protobuf/, avro/, generated/)
2. Create placeholder OpenAPI specs for each service (minimal health endpoint)
3. Create base Protobuf definitions (common messages, service stubs)
4. Create base Avro schemas for core domain events (DomainEvent envelope)
5. Implement codegen script: openapi-typescript → generated/rest/
6. Implement codegen script: ts-proto → generated/grpc/
7. Implement codegen script: avro-ts → generated/events/
8. Create barrel exports and package.json with proper exports map
9. Add `codegen` pipeline to turbo.json

### Wave 4: Telemetry Package
1. Create `packages/telemetry/` with OpenTelemetry SDK setup
2. Implement tracer initialization (W3C Trace Context, Jaeger exporter)
3. Implement Prometheus metrics collector (HTTP duration, custom business metrics)
4. Implement structured JSON logger (pino with trace context injection)
5. Implement Express middleware for auto-instrumentation
6. Implement Kafka producer/consumer instrumentation hooks
7. Implement Prisma query span instrumentation
8. Write integration test with mock collector

### Wave 5: Service Template & Dev Tooling
1. Create `services/_template/` with standard service structure
2. Implement `scripts/new-service.ts` scaffolding script (prompts for name, creates from template)
3. Create `docker-compose.yml` (PostgreSQL, Redis, Kafka + Zookeeper, Schema Registry, Elasticsearch)
4. Create `docker-compose.test.yml` (Testcontainers-compatible)
5. Implement `scripts/seed.ts` (reads seed files per service, executes)
6. Implement `scripts/migrate.ts` (runs Prisma migrate for all services)
7. Create `.env.example` documenting all required env vars

### Wave 6: CI/CD Pipeline
1. Create `.github/workflows/ci.yml` with Turborepo affected detection
2. Add lint + type-check + unit test jobs (parallel per package)
3. Add contract test job (Pact)
4. Add integration test job (docker-compose.test + Testcontainers)
5. Add build job (Docker images for affected services)
6. Add security scan job (Snyk/Trivy)
7. Create `.github/workflows/deploy-canary.yml` stub
8. Configure Dependabot for automated dependency updates

## Dependencies

- No external unit dependencies (this is the foundation — all units depend on it)
- External tooling: Node.js 20+, pnpm 8+, Docker, Turborepo CLI

## Acceptance Criteria

- `pnpm install` succeeds from clean clone
- `pnpm turbo build` builds all packages
- `pnpm turbo test` passes all package tests
- `pnpm turbo lint` passes with zero warnings
- `pnpm turbo codegen` generates types from all schemas
- `docker compose up` brings up local dev environment
- `scripts/new-service.ts` scaffolds a working service skeleton
- CI pipeline runs green on PR with all checks passing
