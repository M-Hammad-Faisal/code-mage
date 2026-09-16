import type { Metadata } from 'next';
import { SITE, SITE_OG_IMAGE } from '@/lib/site.config';
import { ContactClient } from './ContactClient';

const contactDescription =
  'Get in touch with Muhammad Hammad Faisal — for collaborations, freelance work, or just a good dev conversation.';

export const metadata: Metadata = {
  title: 'Contact',
  description: contactDescription,
  alternates: { canonical: `${SITE.url}/contact` },
  openGraph: {
    url: `${SITE.url}/contact`,
    title: 'Contact — Code Mage',
    description: contactDescription,
    type: 'website',
    images: SITE_OG_IMAGE,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact — Code Mage',
    description: contactDescription,
    images: SITE.ogImage,
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
