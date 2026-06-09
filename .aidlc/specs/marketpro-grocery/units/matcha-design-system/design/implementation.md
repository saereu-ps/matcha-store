# Implementation Plan — matcha-design-system

## Implementation Sequence

### Wave 1: Package Setup + Theme
1. Initialize `packages/ui/` with package.json, tsconfig, Tailwind config
2. Implement design tokens as CSS custom properties (dark + light)
3. Implement `ThemeProvider` + `useTheme` hook
4. Implement Tailwind preset with matcha tokens
5. Write theme toggle tests

### Wave 2: Animation System + Base Components
1. Implement `useReducedMotion` hook
2. Implement `FadeIn`, `ScaleOnHover`, `StaggerChildren` components
3. Implement `ScrollReveal` with IntersectionObserver
4. Implement `ParallaxLayer` (scroll-speed offset)
5. Implement `KineticText` (per-character stagger)
6. Implement base components: Button, Card, Input, Badge, Skeleton, Container, Grid
7. Write unit tests for animation components (mock IntersectionObserver)

### Wave 3: Page Transitions + Cursor
1. Implement `TransitionLayout` with Framer Motion AnimatePresence
2. Implement `PageTransition` variants (fade, slide, crossfade)
3. Implement `SharedElement` for morphing transitions
4. Implement `CursorProvider` + `CustomCursor` component
5. Implement `useCursorContext` hook for context morphing
6. Add touch device detection (disable cursor on mobile)
7. Write integration tests

### Wave 4: 3D Viewer + Sound
1. Implement `useWebGLCapability` detection hook
2. Implement `ModelLoader` with Suspense + blur-up fallback
3. Implement `ProductViewer3D` (orbit controls, click-to-info)
4. Implement `CeremonyScene` (animated sequence, play/pause)
5. Implement `FallbackImage` gallery for low-capability devices
6. Implement `SoundProvider` + `useSoundEnabled`
7. Implement `useHoverSound` + `useTransitionSound`
8. Write unit tests (mock WebGL context, mock Howler)

## Dependencies
- Wave 1: @matcha/config (TS/ESLint presets)
- Wave 2: Wave 1 (theme tokens)
- Wave 3: Wave 2 (animation primitives)
- Wave 4: Wave 1 (theme for 3D lighting)

## External Dependencies
- framer-motion: ^11.0.0
- @react-three/fiber: ^8.15.0
- @react-three/drei: ^9.90.0
- three: ^0.160.0
- howler: ^2.2.4
- tailwindcss: ^3.4.0
- clsx: ^2.1.0
