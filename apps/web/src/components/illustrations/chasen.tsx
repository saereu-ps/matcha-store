import type { SVGProps } from 'react';

/**
 * Chasen (bamboo whisk) — line art illustration.
 */
export function ChasenIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Handle */}
      <path
        d="M95 60 L95 120 Q95 125 100 125 Q105 125 105 120 L105 60"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-matcha-fg/70"
      />
      {/* Handle rings */}
      <path d="M95 75 L105 75" stroke="currentColor" strokeWidth="0.8" className="text-matcha-fg/40" />
      <path d="M95 85 L105 85" stroke="currentColor" strokeWidth="0.8" className="text-matcha-fg/40" />
      {/* Whisk tines (fanned out) */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = -50 + (i * 100) / 11;
        const rad = (angle * Math.PI) / 180;
        const endX = 100 + Math.sin(rad) * 35;
        const endY = 125 + Math.cos(rad) * 40;
        const ctrlY = 125 + Math.cos(rad) * 20;
        return (
          <path
            key={i}
            d={`M100 125 Q${100 + Math.sin(rad) * 15} ${ctrlY} ${endX} ${endY}`}
            stroke="currentColor"
            strokeWidth="0.7"
            strokeLinecap="round"
            className="text-[#b8956b]/60"
          />
        );
      })}
      {/* Bamboo knot */}
      <circle cx="100" cy="60" r="5" stroke="currentColor" strokeWidth="1" className="text-[#b8956b]/50" />
    </svg>
  );
}
