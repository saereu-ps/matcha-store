import type { SVGProps } from 'react';

/** Subscription delivery box with matcha items */
export function SubscriptionBoxIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Open box */}
      <path d="M40 100 L40 160 L160 160 L160 100" stroke="currentColor" strokeWidth="1.2" className="text-matcha-fg/50" />
      {/* Box flaps (open) */}
      <path d="M40 100 L20 80" stroke="currentColor" strokeWidth="1" className="text-matcha-fg/30" />
      <path d="M160 100 L180 80" stroke="currentColor" strokeWidth="1" className="text-matcha-fg/30" />
      {/* Items inside */}
      {/* Matcha tin */}
      <rect x="55" y="110" width="25" height="40" rx="2" stroke="currentColor" strokeWidth="0.8" className="text-matcha-accent/40" />
      <ellipse cx="67" cy="110" rx="12" ry="3" stroke="currentColor" strokeWidth="0.5" className="text-matcha-accent/30" />
      {/* Tasting card */}
      <rect x="90" y="115" width="20" height="30" rx="1" stroke="currentColor" strokeWidth="0.6" className="text-matcha-fg/25" />
      <path d="M94 122 L106 122" stroke="currentColor" strokeWidth="0.3" className="text-matcha-fg/15" />
      <path d="M94 126 L104 126" stroke="currentColor" strokeWidth="0.3" className="text-matcha-fg/10" />
      {/* Tissue paper */}
      <path d="M120 105 C130 95 145 98 150 105 C155 95 160 100 155 108" stroke="currentColor" strokeWidth="0.5" className="text-matcha-fg/15" />
      {/* Repeat indicator (calendar icon) */}
      <circle cx="100" cy="75" r="12" stroke="currentColor" strokeWidth="0.8" className="text-matcha-accent/30" />
      <path d="M95 75 L100 75 L100 70" stroke="currentColor" strokeWidth="0.6" className="text-matcha-accent/40" />
      {/* Arrow (recurring) */}
      <path d="M110 68 C118 65 120 72 116 77" stroke="currentColor" strokeWidth="0.5" className="text-matcha-accent/30" />
    </svg>
  );
}
