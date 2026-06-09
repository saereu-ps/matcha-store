import type { SVGProps } from 'react';

/** Loyalty trophy/badge — zen minimal style */
export function TrophyIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Cup body */}
      <path d="M70 60 L75 130 C75 140 90 145 100 145 C110 145 125 140 125 130 L130 60" stroke="currentColor" strokeWidth="1.2" className="text-matcha-fg/50" />
      {/* Rim */}
      <ellipse cx="100" cy="60" rx="30" ry="6" stroke="currentColor" strokeWidth="1" className="text-matcha-fg/40" />
      {/* Left handle */}
      <path d="M70 75 C55 75 50 90 55 100 C60 110 70 105 70 105" stroke="currentColor" strokeWidth="1" className="text-matcha-fg/35" />
      {/* Right handle */}
      <path d="M130 75 C145 75 150 90 145 100 C140 110 130 105 130 105" stroke="currentColor" strokeWidth="1" className="text-matcha-fg/35" />
      {/* Base */}
      <path d="M85 145 L85 155 L115 155 L115 145" stroke="currentColor" strokeWidth="0.8" className="text-matcha-fg/40" />
      <ellipse cx="100" cy="157" rx="20" ry="4" stroke="currentColor" strokeWidth="0.8" className="text-matcha-fg/35" />
      {/* Star/leaf inside */}
      <path d="M100 80 C95 90 90 95 95 105 C100 95 100 95 100 95 C100 95 100 95 105 105 C110 95 105 90 100 80" fill="currentColor" className="text-matcha-accent/20" stroke="currentColor" strokeWidth="0.5" style={{ stroke: 'var(--matcha-accent)' }} strokeOpacity={0.3} />
    </svg>
  );
}
