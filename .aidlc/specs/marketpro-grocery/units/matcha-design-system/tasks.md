# Tasks — matcha-design-system

## Summary
- **Total Tasks**: 28 across 4 phases
- **Execution Waves**: 4 waves (sequential — each builds on previous)
- **Coverage**: 8 modules, 3 stories (US-028, US-029, US-030)
- **Strategy**: Module-first, progressive complexity

---

- [ ] 1. Package Setup & Theme System
  - [ ] 1.1 Initialize @matcha/ui package
    - Create `packages/ui/package.json` with dependencies (react, framer-motion, tailwindcss, clsx)
    - Create `packages/ui/tsconfig.json` extending @matcha/config/react
    - Create directory structure: src/theme/, src/components/, src/animations/, src/hooks/, src/three/, src/sound/, src/cursor/, src/transitions/
    - Create barrel export `src/index.ts`
    - Files: `packages/ui/`
  - [ ] 1.2 Implement design tokens
    - Create `src/theme/tokens.css` with CSS custom properties (dark + light themes)
    - Define colors: bg, fg, accent (matcha greens), muted, border, ring
    - Define typography: display font (serif), body font (sans), font sizes, line heights
    - Define spacing, radii, shadows (3 elevations per theme), transitions
    - Files: `packages/ui/src/theme/tokens.css`
  - [ ] 1.3 Implement Tailwind preset
    - Create `src/theme/tailwind-preset.ts` extending Tailwind config with matcha tokens
    - Map CSS variables to Tailwind utilities (bg-matcha-bg, text-matcha-fg, etc.)
    - Add custom animation utilities (fade-in, scale-up, slide-in-left/right)
    - Add responsive breakpoints (sm: 640, md: 768, lg: 1024, xl: 1280, 2xl: 1536)
    - Files: `packages/ui/src/theme/tailwind-preset.ts`
  - [ ] 1.4 Implement ThemeProvider and useTheme
    - Create `src/theme/theme-provider.tsx` — React context, system preference detection, localStorage persistence
    - Create `src/hooks/use-theme.ts` — returns { theme, setTheme, toggleTheme, systemPreference }
    - Smooth transition on toggle (200ms CSS transition on :root)
    - Default to dark if no system preference detected
    - Files: `packages/ui/src/theme/`, `packages/ui/src/hooks/use-theme.ts`
  - [ ] 1.5 Write theme tests
    - Test system preference detection (mock matchMedia)
    - Test localStorage persistence
    - Test smooth transition class application
    - Test default to dark mode
    - Files: `packages/ui/src/theme/__tests__/`

- [ ] 2. Animation System & Base Components
  - [ ] 2.1 Implement useReducedMotion hook
    - Create `src/hooks/use-reduced-motion.ts` — listens to prefers-reduced-motion media query
    - Returns boolean, updates on system preference change
    - Files: `packages/ui/src/hooks/use-reduced-motion.ts`
  - [ ] 2.2 Implement FadeIn component
    - Create `src/animations/fade-in.tsx` — Framer Motion wrapper
    - Props: direction (up/down/left/right/none), delay, duration, once (trigger only first time)
    - Respects useReducedMotion (instant render if enabled)
    - Files: `packages/ui/src/animations/fade-in.tsx`
  - [ ] 2.3 Implement ScaleOnHover and StaggerChildren
    - Create `src/animations/scale-on-hover.tsx` — whileHover scale(1.02-1.05) + shadow elevation
    - Create `src/animations/stagger-children.tsx` — orchestrates staggeredChildren variant (50ms default stagger)
    - Both respect useReducedMotion
    - Files: `packages/ui/src/animations/`
  - [ ] 2.4 Implement ScrollReveal and ParallaxLayer
    - Create `src/animations/scroll-reveal.tsx` — IntersectionObserver triggers Framer Motion animate
    - Create `src/animations/parallax-layer.tsx` — useScrollProgress-based translateY offset
    - Configurable threshold, rootMargin, parallax speed
    - Files: `packages/ui/src/animations/`
  - [ ] 2.5 Implement KineticText
    - Create `src/animations/kinetic-text.tsx` — splits text into spans, staggers per-character animation
    - Props: as (h1-h6/p/span), animation (fadeUp/slideIn/wave), stagger, trigger (mount/inView)
    - Files: `packages/ui/src/animations/kinetic-text.tsx`
  - [ ] 2.6 Implement useScrollProgress and useInView hooks
    - Create `src/hooks/use-scroll-progress.ts` — returns 0-1 based on page scroll position
    - Create `src/hooks/use-in-view.ts` — IntersectionObserver wrapper, returns { ref, inView, entry }
    - Create `src/hooks/use-media-query.ts` — generic media query hook
    - Files: `packages/ui/src/hooks/`
  - [ ] 2.7 Implement base components (Button, Card, Input)
    - Create `src/components/button.tsx` — primary/secondary/ghost variants, sizes (sm/md/lg), loading state, ScaleOnHover integrated
    - Create `src/components/card.tsx` — hover elevation change, border glow on hover, responsive padding
    - Create `src/components/input.tsx` — floating label animation (framer-motion), focus ring, error state
    - All components use design tokens via Tailwind classes
    - Files: `packages/ui/src/components/`
  - [ ] 2.8 Implement Badge, Skeleton, Container, Grid
    - Create `src/components/badge.tsx` — variants: grade (ceremonial/premium/culinary), tier, status
    - Create `src/components/skeleton.tsx` — shimmer animation (CSS keyframes), respects reduced-motion
    - Create `src/components/container.tsx` — responsive max-width (1280px), horizontal padding
    - Create `src/components/grid.tsx` — CSS grid, responsive columns (1/2/3/4), gap prop
    - Files: `packages/ui/src/components/`
  - [ ] 2.9 Write animation and component tests
    - Test FadeIn renders correctly with/without reduced motion
    - Test ScrollReveal triggers on intersection
    - Test Button variants render correct classes
    - Test Card hover state
    - Mock IntersectionObserver for scroll tests
    - Files: `packages/ui/src/__tests__/`

- [ ] 3. Page Transitions & Custom Cursor
  - [ ] 3.1 Implement TransitionLayout
    - Create `src/transitions/transition-layout.tsx` — wraps children with AnimatePresence
    - Handles exit animations before new page enters
    - Integrates with Next.js App Router layout pattern
    - Files: `packages/ui/src/transitions/transition-layout.tsx`
  - [ ] 3.2 Implement PageTransition variants
    - Create `src/transitions/page-transition.tsx` — component with enter/exit variants
    - Variants: fade (opacity), slide (x-translate), crossfade (opacity + scale), none
    - Duration <300ms enforced
    - Attempts View Transitions API first, falls back to Framer Motion
    - Files: `packages/ui/src/transitions/page-transition.tsx`
  - [ ] 3.3 Implement SharedElement
    - Create `src/transitions/shared-element.tsx` — layoutId-based morphing between pages
    - Uses Framer Motion layout animations for smooth element movement
    - Registers element with unique ID, resolves on page enter
    - Files: `packages/ui/src/transitions/shared-element.tsx`
  - [ ] 3.4 Implement CursorProvider and CustomCursor
    - Create `src/cursor/cursor-provider.tsx` — tracks mouse position, manages cursor state (default/pointer/expand/text)
    - Create `src/cursor/custom-cursor.tsx` — renders matcha-green dot (12px) with trail (4 ghost dots, fading)
    - Morphs on context: pointer (scale up), expand (over images), text (vertical bar)
    - CSS: mix-blend-mode for visibility on any background
    - Files: `packages/ui/src/cursor/`
  - [ ] 3.5 Implement useCursorContext hook
    - Create `src/hooks/use-cursor-context.ts` — registers element ref with cursor type
    - On mouse enter/leave, updates CursorProvider state
    - Touch device detection: if (pointer: coarse), disable entirely
    - Files: `packages/ui/src/hooks/use-cursor-context.ts`
  - [ ] 3.6 Write transition and cursor tests
    - Test PageTransition renders exit then enter
    - Test CustomCursor disabled on touch devices
    - Test reduced-motion disables cursor trail
    - Files: `packages/ui/src/__tests__/`

- [ ] 4. 3D Viewer & Sound Engine
  - [ ] 4.1 Implement useWebGLCapability hook
    - Create `src/hooks/use-webgl-capability.ts` — creates test canvas, checks WebGL2 support
    - Returns { supported: boolean, tier: 'high' | 'low' | 'none' }
    - Tier based on: renderer.getParameter(gl.MAX_TEXTURE_SIZE), extension count
    - Files: `packages/ui/src/hooks/use-webgl-capability.ts`
  - [ ] 4.2 Implement ModelLoader and FallbackImage
    - Create `src/three/model-loader.tsx` — React.Suspense + useLoader(GLTFLoader)
    - Displays blur-up placeholder (low-res image → model) during load
    - Create `src/three/fallback-image.tsx` — high-res image gallery with swipe navigation
    - Auto-selects fallback when useWebGLCapability returns 'none'
    - Files: `packages/ui/src/three/`
  - [ ] 4.3 Implement ProductViewer3D
    - Create `src/three/product-viewer.tsx` — Canvas with OrbitControls, environment lighting
    - Props: modelUrl, autoRotate, enableZoom, onPartClick (for info tooltips)
    - Loads within 3s target (async model loading, progressive detail)
    - Ambient occlusion + environment map for realistic materials
    - Files: `packages/ui/src/three/product-viewer.tsx`
  - [ ] 4.4 Implement CeremonyScene
    - Create `src/three/ceremony-scene.tsx` — animated tea ceremony sequence
    - Scene: chawan, chasen, natsume, matcha powder, water
    - Play/pause control, step markers, narration sync via timestamps
    - Camera transitions between steps (smooth lerp)
    - Files: `packages/ui/src/three/ceremony-scene.tsx`
  - [ ] 4.5 Implement SoundProvider and hooks
    - Create `src/sound/sound-provider.tsx` — React context, manages Howler instance pool
    - Create `src/hooks/use-sound-enabled.ts` — { enabled, toggle, volume, setVolume }
    - Create `src/hooks/use-hover-sound.ts` — plays registered sound on element hover (debounced 100ms)
    - Create `src/hooks/use-transition-sound.ts` — plays on route change
    - Never auto-play on first visit — requires user interaction to enable
    - Stores preference in localStorage
    - Files: `packages/ui/src/sound/`, `packages/ui/src/hooks/`
  - [ ] 4.6 Write 3D and sound tests
    - Test useWebGLCapability returns correct tier (mock canvas context)
    - Test FallbackImage renders when WebGL unsupported
    - Test SoundProvider never auto-plays
    - Test useSoundEnabled persists preference
    - Files: `packages/ui/src/__tests__/`

---

## Execution Waves

### Wave 1 (Sequential)
- **Phase 1**: Package Setup & Theme System
  - Owns: `packages/ui/package.json`, `packages/ui/tsconfig.json`, `packages/ui/src/theme/`, `packages/ui/src/hooks/use-theme.ts`

### Wave 2 (Sequential — depends on Wave 1)
- **Phase 2**: Animation System & Base Components
  - Owns: `packages/ui/src/animations/`, `packages/ui/src/components/`, `packages/ui/src/hooks/use-reduced-motion.ts`, `packages/ui/src/hooks/use-scroll-progress.ts`, `packages/ui/src/hooks/use-in-view.ts`, `packages/ui/src/hooks/use-media-query.ts`

### Wave 3 (Sequential — depends on Wave 2)
- **Phase 3**: Page Transitions & Custom Cursor
  - Owns: `packages/ui/src/transitions/`, `packages/ui/src/cursor/`, `packages/ui/src/hooks/use-cursor-context.ts`

### Wave 4 (Sequential — depends on Wave 1)
- **Phase 4**: 3D Viewer & Sound Engine
  - Owns: `packages/ui/src/three/`, `packages/ui/src/sound/`, `packages/ui/src/hooks/use-webgl-capability.ts`, `packages/ui/src/hooks/use-sound-enabled.ts`, `packages/ui/src/hooks/use-hover-sound.ts`, `packages/ui/src/hooks/use-transition-sound.ts`

---

## Dependencies

| Phase | Depends On |
|-------|-----------|
| Phase 1 | @matcha/config (TS/ESLint presets) |
| Phase 2 | Phase 1 (theme tokens, useTheme) |
| Phase 3 | Phase 2 (animation primitives for transitions) |
| Phase 4 | Phase 1 (theme for 3D lighting) |
