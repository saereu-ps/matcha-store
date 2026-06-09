'use client';

import { usePathname } from 'next/navigation';
import { useContext, useEffect, useRef } from 'react';

import { SoundContext } from '../sound/sound-provider.js';

/**
 * Play a sound on page navigation (route change).
 */
export function useTransitionSound(soundId: string): void {
  const context = useContext(SoundContext);
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip first render (initial page load)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!context?.enabled || !context.hasInteracted) return;
    context.play(soundId);
  }, [pathname, context, soundId]);
}
