import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'images.unsplash.com', protocol: 'https' },
      { hostname: 'm-hammad-faisal.github.io', protocol: 'https' },
    ],
  },
  experimental: {
    mdxRs: false,
  },
};

export default nextConfig;
