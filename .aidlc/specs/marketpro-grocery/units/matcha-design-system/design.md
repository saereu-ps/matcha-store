# Design — matcha-design-system

## Summary
- **Type**: Shared UI package (@matcha/ui)
- **Purpose**: Immersive component library — animation primitives, 3D viewer, theming, micro-interactions, sound engine, custom cursor, scroll effects
- **Stories**: US-028, US-029, US-030
- **Stack**: React 18, Tailwind CSS, Framer Motion, React Three Fiber, Howler.js
- **Components**: 8 modules
- **All customer-facing units depend on this**

## Architecture

```
@matcha/ui package structure:
├── components/     → Shared React components (buttons, cards, inputs, layout)
├── animations/     → Framer Motion primitives, page transitions, scroll reveals
├── three/          → React Three Fiber wrappers (3D viewer, product scene)
├── sound/          → Ambient sound engine (Howler.js, context-aware triggers)
├── cursor/         → Custom cursor system (context morphing, trail effects)
├── theme/          → Dark/light tokens, CSS variables, Tailwind presets
├── hooks/          → useReducedMotion, useTheme, useScrollProgress, useSoundEnabled
└── transitions/    → Page transition system (View Transitions API + fallback)
```

## Technology Choices

| Concern | Choice | Rationale |
|---------|--------|-----------|
| Animation | Framer Motion 11 | Best React animation lib — layout animations, gestures, scroll-linked, exit animations |
| 3D | React Three Fiber + Drei | Declarative Three.js — ecosystem for loaders, controls, post-processing |
| Sound | Howler.js | Lightweight, cross-browser, sprite support, volume/spatial audio |
| Theming | Tailwind CSS + CSS variables | Dark/light via CSS custom properties, Tailwind for utility composition |
| Transitions | View Transitions API | Native page transitions (Chrome), Framer Motion fallback for Safari/FF |
| Accessibility | prefers-reduced-motion | All animations respect OS setting via useReducedMotion hook |

## Traceability

| Component | Story | Acceptance Criteria |
|-----------|-------|-------------------|
| Page transitions | US-028 | AC1: fluid transitions <300ms, AC4: prefers-reduced-motion |
| Micro-interactions | US-028 | AC2: hover feedback within 50ms |
| Scroll animations | US-028 | AC3: 60fps scroll-driven animations |
| Dark/light theme | US-029 | AC1: system detection, AC2: smooth toggle 200ms |
| Ambient sound | US-029 | AC3: context-aware audio, AC4: never auto-play |
| Custom cursor | US-030 | AC1: context-morphing cursor, AC3: disabled on touch |
| Scroll reveals | US-030 | AC2: staggered fade-in |
| Reduced motion | US-028, US-029, US-030 | All AC4: disable animations when prefers-reduced-motion |

## Design Details

- [Components](design/components.md) — detailed module breakdown
- [Implementation Plan](design/implementation.md) — wave-by-wave sequence
