import { Zap } from 'lucide-react';
import { NewsletterForm } from './NewsletterForm';

interface Props {
  source: string;
}

export function NewsletterCTA({ source }: Props) {
  return (
    <div className="mt-12 p-6 rounded-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-2 mb-2">
        <Zap className="w-4 h-4 text-red-500" />
        <p className="text-sm font-heading font-semibold text-gray-900 dark:text-white">
          Join the Mage Circle
        </p>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
        Enjoyed this? Get more — test automation deep dives, scraping tricks, and career guides
        straight to your inbox.
      </p>
      <NewsletterForm source={source} compact />
    </div>
  );
}
