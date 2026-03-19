import type { NextConfig } from 'next';

const securityHeaders = [
  // Prevent clickjacking
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Stop MIME-type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Control referrer information
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Disable browser features not needed by this site
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  // Basic CSP — allows self, Google Fonts, Supabase, and Vercel Analytics
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https://images.unsplash.com https://m-hammad-faisal.github.io",
      "connect-src 'self' https://*.supabase.co https://vitals.vercel-insights.com",
      "frame-ancestors 'self'",
    ].join('; '),
  },
];

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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
