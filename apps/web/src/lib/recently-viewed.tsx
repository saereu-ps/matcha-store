'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

interface RecentlyViewedContextValue {
  items: string[];
  addViewed: (id: string) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | undefined>(undefined);

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('matcha-recently-viewed');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  const addViewed = useCallback((id: string) => {
    setItems(prev => {
      const filtered = prev.filter(i => i !== id);
      const updated = [id, ...filtered].slice(0, 8);
      localStorage.setItem('matcha-recently-viewed', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <RecentlyViewedContext.Provider value={{ items, addViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext);
  if (!ctx) throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider');
  return ctx;
}
