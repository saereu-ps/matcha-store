import type { SVGProps } from 'react';

/** Yame, Fukuoka — mountain forest with fog and bamboo */
export function OriginYameIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Mountains */}
      <path d="M0 70 C30 50 60 55 90 45 C120 35 150 50 180 40 L200 45 L200 150 L0 150Z" fill="currentColor" className="text-matcha-accent/4" />
      {/* Bamboo stalks */}
      <path d="M30 30 L30 140" stroke="currentColor" strokeWidth="1" className="text-matcha-accent/25" />
      <path d="M33 50 L30 50" stroke="currentColor" strokeWidth="0.5" className="text-matcha-accent/20" />
      <path d="M33 80 L30 80" stroke="currentColor" strokeWidth="0.5" className="text-matcha-accent/20" />
      <path d="M45 40 L45 140" stroke="currentColor" strokeWidth="0.8" className="text-matcha-accent/20" />
      <path d="M48 60 L45 60" stroke="currentColor" strokeWidth="0.4" className="text-matcha-accent/15" />
      {/* Bamboo leaves */}
      <path d="M30 45 C25 40 20 42 18 38" stroke="currentColor" strokeWidth="0.5" className="text-matcha-accent/30" />
      <path d="M30 45 C35 42 38 38 42 35" stroke="currentColor" strokeWidth="0.5" className="text-matcha-accent/25" />
      <path d="M45 55 C40 50 37 52 34 48" stroke="currentColor" strokeWidth="0.4" className="text-matcha-accent/25" />
      {/* Fog layers */}
      <path d="M0 80 C40 75 80 82 120 77 C160 72 200 78 200 78" stroke="currentColor" strokeWidth="0.3" className="text-matcha-fg/8" />
      <path d="M0 95 C50 92 100 97 150 93 C180 91 200 94 200 94" stroke="currentColor" strokeWidth="0.3" className="text-matcha-fg/6" />
      {/* Tea bushes */}
      <path d="M80 120 C100 115 120 118 140 115 C160 112 180 116 200 114" stroke="currentColor" strokeWidth="0.7" className="text-matcha-accent/30" />
    </svg>
  );
}
