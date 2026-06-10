'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

interface WishlistContextValue {
  items: string[]; // product IDs
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('matcha-wishlist');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  const save = (newItems: string[]) => {
    setItems(newItems);
    localStorage.setItem('matcha-wishlist', JSON.stringify(newItems));
  };

  const addToWishlist = useCallback((id: string) => {
    save([...new Set([...items, id])]);
  }, [items]);

  const removeFromWishlist = useCallback((id: string) => {
    save(items.filter(i => i !== id));
  }, [items]);

  const isWishlisted = useCallback((id: string) => items.includes(id), [items]);

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isWishlisted, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
