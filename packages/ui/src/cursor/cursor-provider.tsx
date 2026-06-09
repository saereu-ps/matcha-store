'use client';

import { createContext, useEffect, useRef, useState, type ReactNode } from 'react';


export type CursorType = 'default' | 'pointer' | 'expand' | 'text' | 'hidden';

export interface CursorContextValue {
  cursorType: CursorType;
  setCursorType: (type: CursorType) => void;
  position: { x: number; y: number };
  isTouch: boolean;
}

export const CursorContext = createContext<CursorContextValue | undefined>(undefined);

interface CursorProviderProps {
  children: ReactNode;
}

export function CursorProvider({ children }: CursorProviderProps): ReactNode {
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Detect touch device
    const touchQuery = window.matchMedia('(pointer: coarse)');
    setIsTouch(touchQuery.matches);

    const handleTouchChange = (e: MediaQueryListEvent): void => {
      setIsTouch(e.matches);
    };
    touchQuery.addEventListener('change', handleTouchChange);

    return () => {
      touchQuery.removeEventListener('change', handleTouchChange);
    };
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent): void => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch]);

  return (
    <CursorContext.Provider value={{ cursorType, setCursorType, position, isTouch }}>
      {children}
    </CursorContext.Provider>
  );
}
