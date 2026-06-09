'use client';

import { useEffect, useState } from 'react';

type WebGLTier = 'high' | 'low' | 'none';

interface WebGLCapability {
  supported: boolean;
  tier: WebGLTier;
}

function detectWebGLCapability(): WebGLCapability {
  if (typeof window === 'undefined') {
    return { supported: false, tier: 'none' };
  }

  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');

    if (!gl) {
      return { supported: false, tier: 'none' };
    }

    // Check max texture size as quality indicator
    const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
    const extensions = gl.getSupportedExtensions()?.length ?? 0;

    // Cleanup
    const loseContext = gl.getExtension('WEBGL_lose_context');
    loseContext?.loseContext();

    if (maxTextureSize >= 8192 && extensions > 20) {
      return { supported: true, tier: 'high' };
    }

    return { supported: true, tier: 'low' };
  } catch {
    return { supported: false, tier: 'none' };
  }
}

export function useWebGLCapability(): WebGLCapability {
  const [capability, setCapability] = useState<WebGLCapability>({ supported: false, tier: 'none' });

  useEffect(() => {
    setCapability(detectWebGLCapability());
  }, []);

  return capability;
}
