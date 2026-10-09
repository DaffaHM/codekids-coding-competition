import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimalisasi Gambar Otomatis Next.js (Format WebP/AVIF & Caching 1 Tahun)
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 Tahun Cache
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Caching Permanen di Browser untuk Aset Statis (Foto, Logo, Stiker)
  async headers() {
    return [
      {
        source: '/:path*.{jpg,jpeg,png,gif,webp,avif,ico,svg}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
