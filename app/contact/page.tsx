import type { Metadata } from 'next';
import { ContactClient } from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Muhammad Hammad Faisal — for collaborations, freelance work, or just a good dev conversation.',
};

export default function ContactPage() {
  return <ContactClient />;
}
