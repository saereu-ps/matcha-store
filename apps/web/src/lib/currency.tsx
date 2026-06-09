'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

export type CurrencyCode = 'THB' | 'USD' | 'JPY' | 'EUR';

interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rate: number; // relative to THB (THB = 1)
}

export const CURRENCIES: CurrencyInfo[] = [
  { code: 'THB', symbol: '฿', name: 'Thai Baht', rate: 1 },
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 0.028 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 4.3 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.026 },
];

interface CurrencyContextValue {
  currency: CurrencyInfo;
  setCurrency: (code: CurrencyCode) => void;
  format: (amountInTHB: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyInfo>(CURRENCIES[0]); // default THB

  const setCurrency = useCallback((code: CurrencyCode) => {
    const found = CURRENCIES.find(c => c.code === code);
    if (found) {
      setCurrencyState(found);
      localStorage.setItem('matcha-currency', code);
    }
  }, []);

  const format = useCallback((amountInTHB: number) => {
    const converted = amountInTHB * currency.rate;

    if (currency.code === 'JPY') {
      return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
    }

    if (currency.code === 'THB') {
      return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
    }

    return `${currency.symbol}${converted.toFixed(2)}`;
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
}
