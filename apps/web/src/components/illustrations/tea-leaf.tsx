import type { SVGProps } from 'react';

/**
 * Tea leaf — delicate line art with veins.
 */
export function TeaLeafIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Main leaf shape */}
      <path
        d="M100 30 C60 60 50 100 60 130 C70 160 100 170 100 170 C100 170 130 160 140 130 C150 100 140 60 100 30Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="currentColor"
        className="text-matcha-accent/10"
        style={{ stroke: 'var(--matcha-accent)' }}
        strokeOpacity={0.5}
      />
      {/* Center vein */}
      <path d="M100 40 L100 165" stroke="currentColor" strokeWidth="0.8" className="text-matcha-accent/40" />
      {/* Side veins */}
      <path d="M100 60 L78 75" stroke="currentColor" strokeWidth="0.5" className="text-matcha-accent/25" />
      <path d="M100 60 L122 75" stroke="currentColor" strokeWidth="0.5" className="text-matcha-accent/25" />
      <path d="M100 85 L72 100" stroke="currentColor" strokeWidth="0.5" className="text-matcha-accent/25" />
      <path d="M100 85 L128 100" stroke="currentColor" strokeWidth="0.5" className="text-matcha-accent/25" />
      <path d="M100 110 L75 125" stroke="currentColor" strokeWidth="0.5" className="text-matcha-accent/25" />
      <path d="M100 110 L125 125" stroke="currentColor" strokeWidth="0.5" className="text-matcha-accent/25" />
      <path d="M100 135 L80 145" stroke="currentColor" strokeWidth="0.5" className="text-matcha-accent/25" />
      <path d="M100 135 L120 145" stroke="currentColor" strokeWidth="0.5" className="text-matcha-accent/25" />
    </svg>
  );
}
