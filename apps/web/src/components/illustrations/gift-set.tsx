import type { SVGProps } from 'react';

/**
 * Gift set box with matcha items — line art.
 */
export function GiftSetIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Box */}
      <rect x="40" y="80" width="120" height="80" rx="2" stroke="currentColor" strokeWidth="1.5" className="text-matcha-fg/50" />
      {/* Box lid */}
      <path d="M35 80 L165 80 L165 65 L35 65 Z" stroke="currentColor" strokeWidth="1.5" className="text-matcha-fg/50" />
      {/* Ribbon vertical */}
      <rect x="95" y="65" width="10" height="95" fill="currentColor" className="text-matcha-warm/15" stroke="currentColor" strokeWidth="0.5" style={{ stroke: 'var(--matcha-warm)' }} strokeOpacity={0.3} />
      {/* Ribbon bow */}
      <path d="M85 65 C85 55 95 50 100 55 C105 50 115 55 115 65" stroke="currentColor" strokeWidth="1" className="text-matcha-warm/40" />
      <path d="M90 60 C90 50 100 45 100 50 C100 45 110 50 110 60" stroke="currentColor" strokeWidth="0.8" className="text-matcha-warm/30" />
      {/* Items peeking out */}
      {/* Mini chasen */}
      <path d="M60 100 L60 130" stroke="currentColor" strokeWidth="0.8" className="text-[#b8956b]/40" />
      <path d="M55 130 C57 128 63 128 65 130" stroke="currentColor" strokeWidth="0.5" className="text-[#b8956b]/30" />
      {/* Mini chawan */}
      <path d="M130 120 C130 120 135 135 145 135 C155 135 160 120 160 120" stroke="currentColor" strokeWidth="0.8" className="text-matcha-fg/30" />
      {/* Matcha tin */}
      <rect x="75" y="100" width="15" height="20" rx="2" stroke="currentColor" strokeWidth="0.8" className="text-matcha-accent/40" />
      <ellipse cx="82" cy="100" rx="7.5" ry="2" stroke="currentColor" strokeWidth="0.5" className="text-matcha-accent/30" />
    </svg>
  );
}
