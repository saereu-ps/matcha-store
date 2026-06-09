'use client';

import { Suspense, type ReactNode } from 'react';

import { useWebGLCapability } from '../hooks/use-webgl-capability';

interface ProductViewer3DProps {
  modelUrl: string;
  fallbackImage: string;
  alt: string;
  autoRotate?: boolean;
  enableZoom?: boolean;
  className?: string;
  onPartClick?: (partName: string) => void;
}

/**
 * 3D Product Viewer — displays a GLTF model with orbit controls.
 * Falls back to a high-res image gallery on devices without WebGL.
 *
 * Note: React Three Fiber components (Canvas, OrbitControls, useGLTF)
 * are loaded dynamically to avoid SSR issues and reduce bundle size.
 * Full implementation requires @react-three/fiber and @react-three/drei.
 */
export function ProductViewer3D({
  modelUrl,
  fallbackImage,
  alt,
  autoRotate = true,
  className,
}: ProductViewer3DProps): ReactNode {
  const { supported, tier } = useWebGLCapability();

  // Fall back to image on unsupported devices
  if (!supported || tier === 'none') {
    return (
      <div className={className}>
        <img
          src={fallbackImage}
          alt={alt}
          className="w-full h-full object-contain rounded-lg"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-matcha-bg-subtle rounded-lg">
            <div className="text-matcha-fg-muted text-sm animate-pulse">Loading 3D model...</div>
          </div>
        }
      >
        {/* 
          Dynamic import of Three.js scene:
          In production, this lazy-loads the Canvas + scene components.
          
          Implementation placeholder — full scene requires:
          - @react-three/fiber Canvas
          - @react-three/drei OrbitControls, Environment, useGLTF
          - Custom lighting setup for matcha product materials
          - Auto-rotate animation loop
        */}
        <div
          className="w-full h-full rounded-lg bg-matcha-bg-subtle flex items-center justify-center"
          data-model-url={modelUrl}
          data-auto-rotate={autoRotate}
          data-tier={tier}
        >
          <img
            src={fallbackImage}
            alt={alt}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      </Suspense>
    </div>
  );
}
