import type { SVGProps } from 'react';

/** Kagoshima — volcano (Sakurajima) silhouette with tea fields */
export function OriginKagoshimaIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Volcano */}
      <path d="M60 90 L100 30 L140 90" stroke="currentColor" strokeWidth="1" className="text-matcha-fg/30" />
      <path d="M70 90 L100 40 L130 90" fill="currentColor" className="text-matcha-fg/5" />
      {/* Smoke from volcano */}
      <path d="M100 30 C102 22 98 15 102 8" stroke="currentColor" strokeWidth="0.5" className="text-matcha-fg/10" />
      <path d="M103 28 C106 20 102 13 106 6" stroke="currentColor" strokeWidth="0.4" className="text-matcha-fg/8" />
      {/* Tea field rows */}
      <path d="M0 110 C40 107 80 109 120 106 C160 104 200 108 200 108" stroke="currentColor" strokeWidth="0.8" className="text-matcha-accent/35" />
      <path d="M0 120 C50 117 100 119 150 116 C180 115 200 118 200 118" stroke="currentColor" strokeWidth="0.7" className="text-matcha-accent/28" />
      <path d="M0 130 C60 128 120 129 180 127 L200 128" stroke="currentColor" strokeWidth="0.5" className="text-matcha-accent/20" />
      {/* Sun/moon */}
      <circle cx="160" cy="40" r="12" stroke="currentColor" strokeWidth="0.6" className="text-matcha-warm/25" />
    </svg>
  );
}
