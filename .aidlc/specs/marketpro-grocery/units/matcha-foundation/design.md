# Design — matcha-foundation

## Summary
- **Type**: Infrastructure unit (no user stories)
- **Purpose**: Monorepo scaffold, shared packages, dev tooling, CI/CD
- **Components**: 7 — Monorepo Scaffold, @matcha/shared-kernel, @matcha/contracts, @matcha/config, @matcha/telemetry, CI/CD Pipeline, Dev Tooling
- **Waves**: 6 implementation waves
- **Stack**: TypeScript, Turborepo, pnpm, Node.js 20, Docker, GitHub Actions
- **All downstream units depend on this**

## Architecture

This is a foundational infrastructure unit. It produces shared packages and tooling that all 13 other units (3 infra + 10 domain) import and build upon.

```
matcha-foundation produces:
  @matcha/shared-kernel  → imported by ALL services
  @matcha/contracts      → imported by ALL services  
  @matcha/config         → imported by ALL packages
  @matcha/telemetry      → imported by ALL services
  Service template       → used by scripts/new-service.ts
  CI/CD workflows        → triggered by ALL PRs
  Docker Compose         → used by ALL developers locally
```

## Traceability

| Component | Justified By |
|-----------|-------------|
| Monorepo Scaffold | DF-2 (Turborepo + pnpm), DF-3 (Monorepo) |
| @matcha/shared-kernel | DF-10 (Shared types), D2-4 (Shared kernel module) |
| @matcha/contracts | DF-10 (Code generation from schemas) |
| @matcha/config | Foundation spec (Development Conventions) |
| @matcha/telemetry | DF-14 (Full OpenTelemetry) |
| CI/CD Pipeline | DF-12 (GitHub Actions), DF-15 (Trunk-based) |
| Dev Tooling | Foundation spec (Service Template) |

## Design Details

- [Components](design/components.md) — detailed component breakdown
- [Implementation Plan](design/implementation.md) — wave-by-wave implementation sequence
