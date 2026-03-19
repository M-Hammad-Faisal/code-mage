import type { Metadata } from 'next';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SITE } from '@/lib/site.config';

export const metadata: Metadata = {
  title: { default: SITE.seo.title, template: '%s | Code Mage' },
  description: SITE.seo.description,
  authors: [{ name: SITE.author.name, url: SITE.author.portfolio }],
  creator: SITE.author.name,
  metadataBase: new URL(SITE.url),
  icons: {
    icon: [
      { url: '/brand/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/brand/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/favicon.ico' },
    ],
    apple: { url: '/brand/apple-touch-icon.png' },
    other: [
      { rel: 'android-chrome-192x192', url: '/brand/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/brand/android-chrome-512x512.png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.url,
    siteName: SITE.brand,
    title: SITE.seo.title,
    description: SITE.seo.description,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.brand }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.seo.title,
    description: SITE.seo.description,
    images: [SITE.ogImage],
  },
  robots: { index: true, follow: true },
  alternates: {
    types: {
      'application/rss+xml': `${SITE.url}/feed.xml`,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Blocking script — syncs dark/light class before first paint to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme'),p=window.matchMedia('(prefers-color-scheme:dark)').matches,d=t||(p?'dark':'light');d==='dark'?document.documentElement.classList.add('dark'):document.documentElement.classList.remove('dark')}catch(e){}`,
          }}
        />
      </head>
      <body className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-200">
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
