import type { SVGProps } from 'react';

/**
 * Japanese teapot (kyusu) — elegant line art.
 */
export function TeapotIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Body */}
      <ellipse cx="100" cy="120" rx="45" ry="35" stroke="currentColor" strokeWidth="1.5" className="text-matcha-fg/60" />
      {/* Lid */}
      <path d="M75 90 C75 90 85 82 100 82 C115 82 125 90 125 90" stroke="currentColor" strokeWidth="1.5" className="text-matcha-fg/60" />
      {/* Lid knob */}
      <circle cx="100" cy="78" r="4" stroke="currentColor" strokeWidth="1" className="text-matcha-fg/50" />
      {/* Spout */}
      <path d="M145 110 C155 105 162 95 158 85" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-matcha-fg/60" />
      {/* Handle */}
      <path d="M55 100 C35 95 30 115 35 125 C40 135 50 135 55 130" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-matcha-fg/60" />
      {/* Steam from spout */}
      <path d="M158 82 C160 75 156 68 158 60" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" className="text-matcha-fg/15" />
      <path d="M162 80 C164 72 160 65 163 57" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" className="text-matcha-fg/15" />
      {/* Decorative pattern on body */}
      <path d="M80 115 C85 110 95 108 100 110 C105 108 115 110 120 115" stroke="currentColor" strokeWidth="0.5" className="text-matcha-accent/25" />
      <path d="M85 125 C90 122 100 120 110 122 C115 124 118 126 115 128" stroke="currentColor" strokeWidth="0.5" className="text-matcha-accent/25" />
    </svg>
  );
}
