# Components — matcha-design-system

## Module 1: Theme System
**Purpose**: Dark/light mode with CSS custom properties, system detection, smooth transitions
**Exports**:
- `ThemeProvider` — React context wrapping the app, detects system preference
- `useTheme()` → `{ theme, setTheme, toggleTheme, systemPreference }`
- `theme.css` — CSS custom properties (colors, shadows, borders per theme)
- Tailwind preset extending default theme with matcha design tokens

**Design Tokens**:
- Colors: `--matcha-bg`, `--matcha-fg`, `--matcha-accent` (green shades), `--matcha-muted`
- Typography: `--font-display` (serif for headings), `--font-body` (sans-serif)
- Spacing: 4px base grid
- Radii: `--radius-sm` (4px), `--radius-md` (8px), `--radius-lg` (16px)
- Shadows: 3 elevation levels per theme
- Transitions: `--transition-fast` (150ms), `--transition-normal` (300ms), `--transition-slow` (500ms)

## Module 2: Animation Primitives
**Purpose**: Reusable Framer Motion components and hooks for common animation patterns
**Exports**:
- `FadeIn` — fade + translate on mount (configurable direction, delay, stagger)
- `ScaleOnHover` — wrapper adding scale + glow on hover
- `StaggerChildren` — orchestrates staggered reveal of children (50ms default)
- `ScrollReveal` — intersection-observer-triggered reveal with animation variants
- `ParallaxLayer` — scroll-speed-based parallax effect
- `KineticText` — per-character/word animation for headings
- `useReducedMotion()` → boolean (respects prefers-reduced-motion)
- `useScrollProgress()` → number 0-1 (page scroll progress)

## Module 3: Page Transitions
**Purpose**: Smooth navigation transitions between pages (no hard reloads)
**Exports**:
- `TransitionLayout` — wraps Next.js layout, handles exit/enter animations
- `PageTransition` — component with enter/exit variants (fade, slide, crossfade)
- `SharedElement` — element that morphs between pages (product image → detail)
- Uses View Transitions API where supported, Framer Motion AnimatePresence fallback

## Module 4: 3D Viewer
**Purpose**: React Three Fiber components for product visualization and tea ceremony
**Exports**:
- `ProductViewer3D` — orbit controls, zoom, click-to-info, loads GLTF models
- `CeremonyScene` — animated tea ceremony with play/pause, narration sync
- `ModelLoader` — suspense-based model loading with blur-up placeholder
- `FallbackImage` — high-res image gallery when WebGL unavailable
- `useWebGLCapability()` → `{ supported: boolean, tier: 'high' | 'low' | 'none' }`

## Module 5: Sound Engine
**Purpose**: Context-aware ambient audio with hover/transition sounds
**Exports**:
- `SoundProvider` — context managing sound state, Howler instance pool
- `useSoundEnabled()` → `{ enabled, toggle, volume, setVolume }`
- `useHoverSound(soundId)` — plays sound on element hover
- `useTransitionSound(soundId)` — plays on page navigation
- Sound assets: soft tones (hover), nature/zen ambients (background), transition whooshes
- Never auto-plays on first visit (respects browser autoplay policies)

## Module 6: Custom Cursor
**Purpose**: Matcha-green custom cursor with context morphing and trail
**Exports**:
- `CursorProvider` — manages cursor state, position tracking, context
- `useCursorContext(type)` — registers element for cursor morphing (pointer, expand, text)
- `CustomCursor` — rendered cursor element (dot + trail + morphing)
- Auto-disabled on touch devices (detects pointer: coarse)
- Respects prefers-reduced-motion (disables trail)

## Module 7: Base Components
**Purpose**: Foundational UI components styled with design tokens
**Exports**:
- `Button` — primary, secondary, ghost variants with micro-interaction
- `Card` — product card shell with hover effect
- `Input` — text input with floating label animation
- `Badge` — grade badge, tier badge, status indicators
- `Skeleton` — loading placeholder with shimmer animation
- `Container` — responsive max-width wrapper
- `Grid` — product grid with responsive breakpoints

## Module 8: Hooks Collection
**Purpose**: Utility hooks used across all components
**Exports**:
- `useReducedMotion()` — prefers-reduced-motion media query
- `useTheme()` — current theme + toggle
- `useSoundEnabled()` — sound preference
- `useScrollProgress()` — scroll position 0-1
- `useInView(ref, options)` — intersection observer
- `useMediaQuery(query)` — responsive breakpoint detection
- `usePrefersColorScheme()` — system dark/light preference
