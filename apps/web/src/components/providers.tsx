'use client';

import { AuthProvider } from '@/lib/auth';
import { CartProvider } from '@/lib/cart';
import { CurrencyProvider } from '@/lib/currency';
import { I18nProvider } from '@/lib/i18n';
import { RecentlyViewedProvider } from '@/lib/recently-viewed';
import { WishlistProvider } from '@/lib/wishlist';
import { ThemeProvider } from '@matcha/ui';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light">
      <I18nProvider>
        <AuthProvider>
          <CurrencyProvider>
            <CartProvider>
              <WishlistProvider>
                <RecentlyViewedProvider>
                  {children}
                </RecentlyViewedProvider>
              </WishlistProvider>
            </CartProvider>
          </CurrencyProvider>
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
