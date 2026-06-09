import type { SVGProps } from 'react';

/**
 * Brewing scene — chawan with chasen whisking, steam rising. Line art style.
 */
export function BrewingSceneIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Wooden surface */}
      <path d="M20 200 L380 200" stroke="currentColor" strokeWidth="0.8" className="text-matcha-fg/15" />
      <path d="M30 205 L370 205" stroke="currentColor" strokeWidth="0.4" className="text-matcha-fg/10" />

      {/* Chawan (bowl) */}
      <path
        d="M120 140 C120 140 130 190 200 190 C270 190 280 140 280 140"
        stroke="currentColor" strokeWidth="1.5" className="text-matcha-fg/60"
      />
      <ellipse cx="200" cy="140" rx="80" ry="16" stroke="currentColor" strokeWidth="1.5" className="text-matcha-fg/60" />
      {/* Matcha liquid */}
      <ellipse cx="200" cy="140" rx="72" ry="12" fill="currentColor" className="text-matcha-accent/15" />

      {/* Chasen (whisk) resting on rim */}
      <path d="M290 120 L310 80" stroke="currentColor" strokeWidth="1.2" className="text-[#b8956b]/50" />
      {/* Whisk tines */}
      {Array.from({ length: 7 }, (_, i) => {
        const angle = -20 + (i * 40) / 6;
        const rad = (angle * Math.PI) / 180;
        return (
          <path
            key={i}
            d={`M310 80 Q${310 + Math.sin(rad) * 8} ${80 - 10} ${310 + Math.sin(rad) * 15} ${80 - 20}`}
            stroke="currentColor" strokeWidth="0.5" className="text-[#b8956b]/40"
          />
        );
      })}

      {/* Chashaku (scoop) beside bowl */}
      <path d="M80 160 L50 130 C48 127 50 125 53 127 L85 155" stroke="currentColor" strokeWidth="1" className="text-[#b8956b]/40" />

      {/* Steam */}
      <path d="M170 120 C170 110 175 100 170 90" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" className="text-matcha-fg/12" />
      <path d="M195 115 C195 105 198 95 195 82" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" className="text-matcha-fg/12" />
      <path d="M220 118 C220 108 223 98 220 85" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" className="text-matcha-fg/12" />

      {/* Small natsume (tea caddy) on left */}
      <ellipse cx="60" cy="185" rx="15" ry="5" stroke="currentColor" strokeWidth="0.8" className="text-matcha-fg/30" />
      <path d="M45 185 L45 170 C45 165 60 162 75 165 L75 185" stroke="currentColor" strokeWidth="0.8" className="text-matcha-fg/30" />
      <ellipse cx="60" cy="170" rx="15" ry="4" stroke="currentColor" strokeWidth="0.6" className="text-matcha-fg/20" />

      {/* Decorative branch top-right */}
      <path d="M330 30 C340 40 350 35 360 40 C365 42 370 38 375 42" stroke="currentColor" strokeWidth="0.6" className="text-matcha-fg/15" />
      <circle cx="365" cy="35" r="2" fill="currentColor" className="text-[#e8b4b8]/30" />
      <circle cx="372" cy="40" r="1.5" fill="currentColor" className="text-[#e8b4b8]/25" />
    </svg>
  );
}
