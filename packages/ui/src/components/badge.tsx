import { clsx } from 'clsx';
import type { ReactNode } from 'react';

type BadgeVariant = 'ceremonial' | 'premium' | 'culinary' | 'tier' | 'status' | 'default';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  ceremonial: 'bg-[#6b7f5e]/10 text-[#4a5e3e] border border-[#6b7f5e]/20',
  premium: 'bg-[#8a7b5e]/10 text-[#6b5e3e] border border-[#8a7b5e]/20',
  culinary: 'bg-matcha-bg-muted text-matcha-fg-muted border border-matcha-border',
  tier: 'bg-matcha-accent-subtle text-matcha-accent-dark border border-matcha-accent/20',
  status: 'bg-[#5e7a8a]/10 text-[#3e5e6b] border border-[#5e7a8a]/20',
  default: 'bg-matcha-bg-muted text-matcha-fg-muted border border-matcha-border',
};

export function Badge({ children, variant = 'default', className }: BadgeProps): ReactNode {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
