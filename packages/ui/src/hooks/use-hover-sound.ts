'use client';

import { useCallback, useContext, useRef } from 'react';

import { SoundContext } from '../sound/sound-provider';

/**
 * Play a sound on element hover.
 * Debounced to prevent rapid-fire audio on quick mouse movements.
 */
export function useHoverSound(soundId: string, debounceMs = 100): {
  onMouseEnter: () => void;
} {
  const context = useContext(SoundContext);
  const lastPlayed = useRef(0);

  const onMouseEnter = useCallback(() => {
    if (!context?.enabled || !context.hasInteracted) return;

    const now = Date.now();
    if (now - lastPlayed.current < debounceMs) return;

    lastPlayed.current = now;
    context.play(soundId);
  }, [context, soundId, debounceMs]);

  return { onMouseEnter };
}
