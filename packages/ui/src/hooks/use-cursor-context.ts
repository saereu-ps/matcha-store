'use client';

import { useCallback, useContext, useEffect, useRef } from 'react';

import { CursorContext, type CursorType } from '../cursor/cursor-provider.js';

export function useCursorContext(type: CursorType): {
  ref: React.RefObject<HTMLElement | null>;
} {
  const context = useContext(CursorContext);
  const ref = useRef<HTMLElement | null>(null);

  const handleEnter = useCallback(() => {
    context?.setCursorType(type);
  }, [context, type]);

  const handleLeave = useCallback(() => {
    context?.setCursorType('default');
  }, [context]);

  useEffect(() => {
    const element = ref.current;
    if (!element || !context || context.isTouch) return;

    element.addEventListener('mouseenter', handleEnter);
    element.addEventListener('mouseleave', handleLeave);

    return () => {
      element.removeEventListener('mouseenter', handleEnter);
      element.removeEventListener('mouseleave', handleLeave);
    };
  }, [handleEnter, handleLeave, context]);

  return { ref };
}
