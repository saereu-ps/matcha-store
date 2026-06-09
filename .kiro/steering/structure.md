---
inclusion: always
---

# Project Structure

## Summary
- **Repo**: Monorepo (Turborepo + pnpm workspaces)
- **Source**: packages/ (shared), services/ (microservices), apps/ (frontend)
- **Entry**: apps/web (Next.js), services/gateway (API entry)

## Repository

- **Type**: Monorepo
- **Root**: Turborepo workspace containing all services, packages, and apps

## Key Directories

| Directory | Purpose | Key Contents |
|-----------|---------|-------------|
| packages/contracts/ | Auto-generated API types | OpenAPI specs, Protobuf, Avro schemas, generated TS |
| packages/shared-kernel/ | Core value objects & events | Money, UserId, ProductId, event base classes |
| packages/ui/ | Design system components | React components, animations, 3D, theming, sound |
| packages/telemetry/ | Observability setup | OpenTelemetry tracing, metrics, structured logger |
| packages/config/ | Shared tooling configs | ESLint, TypeScript, Prettier, Vitest presets |
| services/ | Domain microservices | product/, user/, subscription/, ai/, etc. |
| services/gateway/ | API Gateway | Route proxying, rate limiting, auth verification |
| services/auth/ | OAuth2 Auth Service | Token issuance, RBAC, user credentials |
| services/event-bus/ | Kafka management | Producer/consumer utils, Schema Registry, DLQ |
| apps/web/ | Next.js 14 frontend | App Router pages, components, API clients |
| infrastructure/ | Deployment configs | Docker, Kubernetes (k8s/), Terraform |

## Entry Points

| Entry Point | Type | Description |
|-------------|------|-------------|
| apps/web/src/app/ | Next.js App Router | SSR frontend, BFF aggregation |
| services/gateway/src/index.ts | API Gateway | Single entry for all client requests |
| services/auth/src/index.ts | Auth Service | OAuth2 token provider |
| services/event-bus/src/index.ts | Event Bus | Kafka producer/consumer management |
| services/{domain}/src/index.ts | Domain Service | One per bounded context |

## Module Dependencies

```
apps/web → packages/ui, packages/contracts
services/gateway → packages/shared-kernel, packages/contracts, packages/telemetry
services/{domain} → packages/shared-kernel, packages/contracts, packages/telemetry
packages/ui → packages/config (build tooling)
packages/contracts → openapi/*.yaml, protobuf/*.proto, avro/*.avsc (source of truth)
```

## Service Template Structure

```
services/{name}/
├── src/
│   ├── domain/          # Aggregates, entities, value objects, events
│   ├── application/     # Use cases, command/query handlers
│   ├── infrastructure/  # DB repos, external APIs, Kafka consumers
│   ├── api/            # REST/gRPC handlers, DTOs, validation
│   └── index.ts        # Bootstrap
├── prisma/schema.prisma # DB schema
├── tests/              # unit/ + integration/
├── openapi.yaml        # REST contract
├── Dockerfile
└── package.json
```
