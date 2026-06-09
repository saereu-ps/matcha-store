'use client';

import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react';

export interface SoundContextValue {
  enabled: boolean;
  volume: number;
  toggle: () => void;
  setVolume: (volume: number) => void;
  play: (soundId: string) => void;
  hasInteracted: boolean;
}

export const SoundContext = createContext<SoundContextValue | undefined>(undefined);

const STORAGE_KEY = 'matcha-sound-enabled';
const VOLUME_KEY = 'matcha-sound-volume';

interface SoundProviderProps {
  children: ReactNode;
}

/**
 * Sound Provider — manages ambient sound state.
 *
 * Rules:
 * - Never auto-plays on first visit (respects browser autoplay policies)
 * - Requires explicit user interaction to enable
 * - Persists preference in localStorage
 * - Provides play() for hover/transition sounds
 *
 * Full implementation uses Howler.js for cross-browser audio.
 */
export function SoundProvider({ children }: SoundProviderProps): ReactNode {
  const [enabled, setEnabled] = useState(false);
  const [volume, setVolumeState] = useState(0.3);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Load saved preferences
  useEffect(() => {
    const savedEnabled = localStorage.getItem(STORAGE_KEY);
    const savedVolume = localStorage.getItem(VOLUME_KEY);

    if (savedEnabled === 'true') {
      // Don't auto-enable — just remember the preference
      // Sound will be enabled on first user interaction
    }
    if (savedVolume) {
      setVolumeState(parseFloat(savedVolume));
    }
  }, []);

  // Track first user interaction (click/keydown)
  useEffect(() => {
    const handleInteraction = (): void => {
      setHasInteracted(true);
      // If user previously had sound enabled, re-enable it
      const savedEnabled = localStorage.getItem(STORAGE_KEY);
      if (savedEnabled === 'true') {
        setEnabled(true);
      }
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };

    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('keydown', handleInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  const setVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolumeState(clamped);
    localStorage.setItem(VOLUME_KEY, String(clamped));
  }, []);

  const play = useCallback(
    (soundId: string) => {
      if (!enabled || !hasInteracted) return;
      // Howler.js integration:
      // In full implementation, this loads from a sound sprite
      // and plays the specified sound at current volume.
      // For now, this is a no-op placeholder.
      void soundId;
    },
    [enabled, hasInteracted],
  );

  return (
    <SoundContext.Provider value={{ enabled, volume, toggle, setVolume, play, hasInteracted }}>
      {children}
    </SoundContext.Provider>
  );
}
