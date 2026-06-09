import type { SVGProps } from 'react';

/** Uji, Kyoto — tea terraces with torii gate silhouette */
export function OriginUjiIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Mountains background */}
      <path d="M0 80 C30 60 60 70 100 55 C140 40 170 50 200 65 L200 150 L0 150Z" fill="currentColor" className="text-matcha-accent/5" />
      {/* Tea rows */}
      <path d="M10 110 C40 105 80 108 130 105 C160 103 190 107 200 110" stroke="currentColor" strokeWidth="0.8" className="text-matcha-accent/30" />
      <path d="M0 120 C50 115 100 118 150 115 C180 113 200 117 200 120" stroke="currentColor" strokeWidth="0.8" className="text-matcha-accent/25" />
      <path d="M10 130 C60 127 110 128 160 126 C185 125 200 128 200 130" stroke="currentColor" strokeWidth="0.6" className="text-matcha-accent/20" />
      {/* Torii gate */}
      <path d="M85 60 L85 100" stroke="currentColor" strokeWidth="1.2" className="text-matcha-warm/40" />
      <path d="M115 60 L115 100" stroke="currentColor" strokeWidth="1.2" className="text-matcha-warm/40" />
      <path d="M80 63 L120 63" stroke="currentColor" strokeWidth="1.5" className="text-matcha-warm/40" />
      <path d="M78 58 L122 58" stroke="currentColor" strokeWidth="1" className="text-matcha-warm/35" />
      {/* Mist */}
      <path d="M0 85 C30 82 60 88 100 83 C140 78 170 84 200 80" stroke="currentColor" strokeWidth="0.3" className="text-matcha-fg/8" />
    </svg>
  );
}
