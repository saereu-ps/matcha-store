'use client';

import { AuthProvider } from '@/lib/auth';
import { CartProvider } from '@/lib/cart';
import { CurrencyProvider } from '@/lib/currency';
import { ThemeProvider } from '@matcha/ui';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <CurrencyProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </CurrencyProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
