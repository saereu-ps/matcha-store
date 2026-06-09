'use client';

import type { ReactNode } from 'react';

interface JapaneseFrameProps {
  children: ReactNode;
  className?: string;
  variant?: 'ink' | 'gold' | 'minimal';
}

/**
 * Japanese-style decorative frame for images.
 * Options: ink brush border, gold/cream accent, minimal with corner marks.
 */
export function JapaneseFrame({ children, className, variant = 'ink' }: JapaneseFrameProps) {
  if (variant === 'minimal') {
    return (
      <div className={`relative ${className ?? ''}`}>
        {/* Corner marks — like traditional Japanese prints */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-matcha-fg/20" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-matcha-fg/20" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-matcha-fg/20" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-matcha-fg/20" />
        <div className="m-2">
          {children}
        </div>
      </div>
    );
  }

  if (variant === 'gold') {
    return (
      <div className={`relative p-[3px] ${className ?? ''}`}>
        {/* Gold/warm border with inner shadow */}
        <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-[#c9b896] via-[#e0d5be] to-[#c9b896] opacity-60" />
        <div className="relative rounded-sm overflow-hidden shadow-inner">
          {children}
        </div>
      </div>
    );
  }

  // Default: ink brush style
  return (
    <div className={`relative ${className ?? ''}`}>
      {/* Ink brush border effect — uneven edges */}
      <div className="absolute -inset-1 rounded-sm">
        {/* Top brush stroke */}
        <div className="absolute top-0 left-2 right-2 h-[1px] bg-gradient-to-r from-transparent via-matcha-fg/25 to-transparent" />
        {/* Bottom brush stroke */}
        <div className="absolute bottom-0 left-3 right-1 h-[1px] bg-gradient-to-r from-transparent via-matcha-fg/20 to-transparent" />
        {/* Left brush stroke */}
        <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-gradient-to-b from-transparent via-matcha-fg/25 to-transparent" />
        {/* Right brush stroke */}
        <div className="absolute right-0 top-3 bottom-1 w-[1px] bg-gradient-to-b from-transparent via-matcha-fg/20 to-transparent" />
      </div>
      {/* Small ink accent dot — top left (hanko/seal style) */}
      <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-matcha-warm/40" />
      <div className="relative overflow-hidden rounded-sm">
        {children}
      </div>
    </div>
  );
}
