import type { SVGProps } from 'react';

/**
 * Matcha latte in glass — anime-style line art.
 */
export function MatchaLatteIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Glass body */}
      <path
        d="M70 50 L65 160 C65 165 75 170 100 170 C125 170 135 165 135 160 L130 50"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-matcha-fg/50"
      />
      {/* Glass bottom */}
      <ellipse cx="100" cy="165" rx="33" ry="6" stroke="currentColor" strokeWidth="1" className="text-matcha-fg/30" />
      {/* Milk layer (bottom) */}
      <path
        d="M67 130 L65 160 C65 165 75 170 100 170 C125 170 135 165 135 160 L133 130"
        fill="currentColor"
        className="text-[#f5f0e8]/80"
      />
      {/* Matcha layer (top) */}
      <path
        d="M69 80 L67 130 L133 130 L131 80"
        fill="currentColor"
        className="text-matcha-accent/20"
      />
      {/* Layer separation line */}
      <path d="M67 130 C67 130 80 127 100 127 C120 127 133 130 133 130" stroke="currentColor" strokeWidth="0.5" className="text-matcha-accent/30" />
      {/* Top surface */}
      <ellipse cx="100" cy="55" rx="30" ry="6" stroke="currentColor" strokeWidth="1" className="text-matcha-fg/40" />
      {/* Latte art swirl */}
      <path d="M90 55 C92 52 98 52 100 55 C102 52 108 52 110 55" stroke="currentColor" strokeWidth="0.6" className="text-matcha-accent/40" />
      {/* Ice cubes (subtle squares) */}
      <rect x="85" y="90" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="0.5" className="text-matcha-fg/15" />
      <rect x="100" y="100" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="0.5" className="text-matcha-fg/15" />
      <rect x="110" y="88" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="0.5" className="text-matcha-fg/15" />
    </svg>
  );
}
