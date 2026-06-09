/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@matcha/ui', '@matcha/shared-kernel', '@matcha/contracts', '@matcha/telemetry'],
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  experimental: {
    optimizePackageImports: ['@matcha/ui', 'framer-motion'],
  },
};

export default nextConfig;
