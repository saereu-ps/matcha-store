import type { SVGProps } from 'react';

/** Matcha tin container — premium packaging */
export function MatchaTinIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Body */}
      <rect x="65" y="70" width="70" height="90" rx="3" stroke="currentColor" strokeWidth="1.2" className="text-matcha-fg/50" />
      {/* Lid top */}
      <ellipse cx="100" cy="70" rx="35" ry="8" stroke="currentColor" strokeWidth="1.2" className="text-matcha-fg/50" />
      {/* Lid ring */}
      <ellipse cx="100" cy="60" rx="35" ry="8" stroke="currentColor" strokeWidth="1" className="text-matcha-fg/40" />
      <rect x="65" y="56" width="70" height="14" stroke="currentColor" strokeWidth="0.8" className="text-matcha-fg/30" />
      {/* Lid knob */}
      <ellipse cx="100" cy="52" rx="8" ry="3" stroke="currentColor" strokeWidth="0.8" className="text-matcha-fg/40" />
      {/* Label area */}
      <rect x="75" y="95" width="50" height="40" rx="2" stroke="currentColor" strokeWidth="0.5" className="text-matcha-accent/30" />
      {/* Label text lines */}
      <path d="M85 105 L115 105" stroke="currentColor" strokeWidth="0.4" className="text-matcha-fg/15" />
      <path d="M90 112 L110 112" stroke="currentColor" strokeWidth="0.3" className="text-matcha-fg/10" />
      {/* Matcha green accent on label */}
      <rect x="90" y="118" width="20" height="8" rx="1" fill="currentColor" className="text-matcha-accent/15" />
    </svg>
  );
}
