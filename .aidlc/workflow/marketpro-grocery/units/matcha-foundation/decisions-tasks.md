# Tasks Decisions — matcha-foundation

## Context Summary
- **Unit**: matcha-foundation (infrastructure)
- **Components**: 7 (Scaffold, Shared Kernel, Contracts, Config, Telemetry, CI/CD, Dev Tooling)
- **Type**: Infrastructure — no user stories, all tech decisions settled in DF
- **Dependencies**: None (all other units depend on this)

---

## Decisions Summary
- D4-1 Breakdown: Component-first — each package/tool is a phase
- D4-2 Approach: Test-first for shared kernel, test-after for scaffold/tooling
- D4-3 Priority: Scaffold → Config → Shared Kernel → Contracts → Telemetry → Dev Tooling → CI/CD
- D4-4 Integration: Real services via Docker Compose for integration tests
- D4-5 Testing: Unit tests for shared kernel + contracts, integration for telemetry
- D4-6 Granularity: Standard (1-2 day tasks)
- D4-7 Parallel: Sequential phases (each builds on previous), parallel tasks within phases where possible
- D4-8 Estimates: None (infrastructure, predictable scope)
