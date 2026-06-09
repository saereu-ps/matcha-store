import type { SVGProps } from 'react';

/** Nishio, Aichi — coastal with waves and tea plant */
export function OriginNishioIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Sky gradient */}
      <rect x="0" y="0" width="200" height="80" fill="currentColor" className="text-[#dce8e4]/30" />
      {/* Waves */}
      <path d="M0 90 C20 85 40 92 60 87 C80 82 100 90 120 85 C140 80 160 88 180 83 C190 81 200 85 200 85" stroke="currentColor" strokeWidth="0.6" className="text-[#8aabbc]/30" />
      <path d="M0 100 C25 96 50 102 75 97 C100 92 125 100 150 95 C175 90 200 96 200 96" stroke="currentColor" strokeWidth="0.5" className="text-[#8aabbc]/20" />
      {/* Tea bushes (foreground) */}
      <path d="M20 120 C30 110 50 112 60 120 C70 112 90 110 100 120" stroke="currentColor" strokeWidth="1" className="text-matcha-accent/40" />
      <path d="M100 120 C110 112 130 110 140 120 C150 112 170 110 180 120" stroke="currentColor" strokeWidth="1" className="text-matcha-accent/35" />
      {/* Ground */}
      <path d="M0 130 L200 130" stroke="currentColor" strokeWidth="0.3" className="text-matcha-fg/10" />
    </svg>
  );
}
