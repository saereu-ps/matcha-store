'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface SmoothLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/**
 * Link with underline animation on hover — premium feel.
 */
export function SmoothLink({ href, children, className }: SmoothLinkProps) {
  return (
    <Link href={href} className={`relative inline-block group ${className ?? ''}`}>
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-[1px] bg-matcha-accent"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  );
}
