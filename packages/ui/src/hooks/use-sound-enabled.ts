'use client';

import { useContext } from 'react';

import { SoundContext, type SoundContextValue } from '../sound/sound-provider';

export function useSoundEnabled(): SoundContextValue {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSoundEnabled must be used within a SoundProvider');
  }
  return context;
}
