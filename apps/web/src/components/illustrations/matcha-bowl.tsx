import type { SVGProps } from 'react';

/**
 * Matcha bowl (chawan) — line art illustration.
 * Elegant brush-style with steam rising.
 */
export function MatchaBowlIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Bowl body */}
      <path
        d="M40 120 C40 120 45 160 100 160 C155 160 160 120 160 120"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="text-matcha-fg/70"
      />
      {/* Bowl rim */}
      <ellipse cx="100" cy="120" rx="60" ry="12" stroke="currentColor" strokeWidth="1.5" className="text-matcha-fg/70" />
      {/* Matcha liquid surface */}
      <ellipse cx="100" cy="120" rx="55" ry="10" fill="currentColor" className="text-matcha-accent/20" />
      {/* Foam dots */}
      <circle cx="85" cy="118" r="1.5" fill="currentColor" className="text-matcha-accent/30" />
      <circle cx="95" cy="116" r="1" fill="currentColor" className="text-matcha-accent/25" />
      <circle cx="108" cy="117" r="1.5" fill="currentColor" className="text-matcha-accent/30" />
      <circle cx="115" cy="119" r="1" fill="currentColor" className="text-matcha-accent/25" />
      {/* Steam lines */}
      <path d="M85 105 C85 100 88 95 85 88" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" className="text-matcha-fg/20" />
      <path d="M100 102 C100 97 103 92 100 85" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" className="text-matcha-fg/20" />
      <path d="M115 104 C115 99 118 94 115 87" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" className="text-matcha-fg/20" />
    </svg>
  );
}
