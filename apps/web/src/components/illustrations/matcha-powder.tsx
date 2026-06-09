import type { SVGProps } from 'react';

/**
 * Matcha powder pile with chashaku (scoop) — line art.
 */
export function MatchaPowderIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Powder pile */}
      <path
        d="M60 140 C60 140 75 100 100 100 C125 100 140 140 140 140"
        fill="currentColor"
        className="text-matcha-accent/15"
      />
      <path
        d="M60 140 C60 140 75 100 100 100 C125 100 140 140 140 140"
        stroke="currentColor"
        strokeWidth="1.2"
        className="text-matcha-accent/50"
      />
      {/* Base plate */}
      <ellipse cx="100" cy="145" rx="50" ry="8" stroke="currentColor" strokeWidth="1" className="text-matcha-fg/40" />
      {/* Chashaku (bamboo scoop) */}
      <path
        d="M130 90 L155 70 C158 68 160 70 158 73 L140 100 C138 103 135 102 135 100 L130 90Z"
        stroke="currentColor"
        strokeWidth="1"
        className="text-[#b8956b]/60"
      />
      {/* Powder on scoop */}
      <ellipse cx="148" cy="72" rx="5" ry="3" fill="currentColor" className="text-matcha-accent/25" />
      {/* Scattered powder particles */}
      <circle cx="75" cy="130" r="0.8" fill="currentColor" className="text-matcha-accent/20" />
      <circle cx="120" cy="128" r="0.6" fill="currentColor" className="text-matcha-accent/20" />
      <circle cx="90" cy="135" r="0.5" fill="currentColor" className="text-matcha-accent/15" />
      <circle cx="112" cy="138" r="0.7" fill="currentColor" className="text-matcha-accent/20" />
    </svg>
  );
}
