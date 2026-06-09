---
inclusion: always
---

# Technology Context

## Summary
- **Stack**: TypeScript / Next.js 14 / Node.js / Tailwind CSS / PostgreSQL / Redis / Elasticsearch / Kafka
- **Architecture**: Microservices — API Gateway + BFF + Domain Services + Kafka Event Bus
- **Infra**: Turborepo monorepo, Docker/K8s, GitHub Actions, Canary deployments

## Stack

- **Languages**: TypeScript (full-stack)
- **Frameworks**: Next.js 14 (App Router) for frontend, Express/Fastify for services
- **Build System**: Turborepo (build orchestration + remote caching)
- **Package Manager**: pnpm workspaces
- **Testing**: Vitest (unit), Testcontainers (integration), Pact (contract), Playwright (E2E), k6 (performance)

## Architecture

- **Pattern**: Microservices — independently deployable domain services
- **API Style**: Mixed — REST for external, gRPC for internal, Kafka for events
- **Frontend**: Next.js 14 SSR + client hydration, BFF aggregation layer

## Infrastructure

- **Cloud Provider**: AWS (EKS, RDS, ElastiCache, MSK, OpenSearch)
- **Compute**: Kubernetes (EKS) with canary deployments
- **Database**: PostgreSQL per service + Redis per service + shared Elasticsearch
- **IaC Tool**: Terraform
- **Event Broker**: Apache Kafka with Confluent Schema Registry

## Shared Conventions (from Foundation)

- **Authentication**: OAuth2 + JWT (RS256), RBAC in token claims, 15min access + 7d refresh rotation
- **Error Handling**: RFC 7807 Problem Details with correlationId, validation errors array, localized messages
- **Communication**: REST/gRPC sync for queries, Kafka async for state changes; circuit breaker (5 failures → open); 3s timeout default
- **Database**: Per-service PostgreSQL (Prisma ORM), no cross-service foreign keys, eventual consistency via events
- **Shared Types**: Code-generated from OpenAPI + Protobuf + Avro schemas → @matcha/contracts package
- **Observability**: Full OpenTelemetry — distributed tracing (Jaeger), structured JSON logging, Prometheus metrics, Grafana dashboards, PagerDuty alerting
- **Code Style**: ESLint strict + Prettier, Conventional Commits, Husky pre-commit hooks
- **Testing**: >80% unit coverage, Pact contract tests for all service interfaces, E2E for core flows

## CI/CD Pipeline

- **Tool**: GitHub Actions with Turborepo affected detection
- **Stages**: lint → type-check → unit test → contract test → integration test → build → security scan → deploy canary
- **Deploy target**: Kubernetes (EKS) via canary (1% → 10% → 50% → 100%), auto-rollback on error rate >0.5%

## Dependency Management

- **Lockfile**: pnpm-lock.yaml committed
- **Version strategy**: Exact versions for production deps, caret for devDependencies
- **Monorepo tooling**: Turborepo + pnpm workspaces
