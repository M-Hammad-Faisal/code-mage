export const SITE = {
  brand: 'Code Mage',
  tagline: 'Code Your Magic',
  url: 'https://code-mage.dev',
  description:
    'Test automation tutorials, scraping deep dives, and career guides for engineers — by Muhammad Hammad Faisal.',
  ogImage: '/brand/code-mage-banner.webp',

  author: {
    name: 'Muhammad Hammad Faisal',
    role: 'Software Engineer (Test Automation) @ Arbisoft',
    email: 'hammadfaisal178@gmail.com',
    location: 'Lahore, Punjab, Pakistan',
    portfolio: 'https://m-hammad-faisal.github.io/',
    resume: 'https://m-hammad-faisal.github.io/resume.html',
    shortBio:
      'Software Engineer at Arbisoft building production scraping pipelines, anti-detection systems, and browser automation tooling.',
    avatar: '/brand/hammad-profile.jpg',
    careerStartYear: 2023,
  },

  socials: {
    github: 'https://github.com/M-Hammad-Faisal',
    linkedin: 'https://linkedin.com/in/m-hammad-faisal',
    youtube: 'https://www.youtube.com/@code_your_magic',
  },

  seo: {
    title: 'Code Mage — Code Your Magic',
    description: 'Test automation tutorials, scraping deep dives, and career guides for engineers.',
  },
};

/**
 * Default OpenGraph/Twitter image for pages with no per-page image of their
 * own. Next.js metadata objects don't deep-merge with the root layout's
 * defaults, so any page that sets its own `openGraph`/`twitter` block must
 * spread this in explicitly or its social preview image silently disappears.
 */
export const SITE_OG_IMAGE = [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.brand }];

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Tutorial', href: '/tutorial' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const CATEGORY_COLORS: Record<string, string> = {
  'Python Deep Dive': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'Test Automation': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  'Web Scraping': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
  'Project Breakdown': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  'AI in QA': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  Career: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  Uncategorized: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};
