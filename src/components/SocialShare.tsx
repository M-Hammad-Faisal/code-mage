import { motion } from 'framer-motion';
import {
  Check,
  Copy,
  Linkedin,
  Mail,
  MessageCircle,
  Share2,
} from 'lucide-react';
import React, { useState } from 'react';

interface SocialShareProps {
  title: string;
  url?: string;
}

export const SocialShare: React.FC<SocialShareProps> = ({ title, url }) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = url || window.location.href;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(currentUrl);

  const shareLinks = {
    email: `mailto:?subject=${encodedTitle}&body=Check out this article: ${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle} ${encodedUrl}`,
  };

  const shareButtons = [
    {
      action: 'copy',
      bgColor: copied
        ? 'bg-green-500 hover:bg-green-600'
        : 'bg-slate-700 hover:bg-slate-800',
      darkBgColor: copied
        ? 'dark:bg-green-500 dark:hover:bg-green-600'
        : 'dark:bg-slate-600 dark:hover:bg-slate-700',
      icon: copied ? Check : Copy,
      name: 'Copy Link',
      textColor: 'text-white',
    },
    {
      action: 'share',
      bgColor: 'bg-[#0077B5] hover:bg-[#005885]',
      darkBgColor: 'dark:bg-[#0077B5] dark:hover:bg-[#005885]',
      icon: Linkedin,
      name: 'LinkedIn',
      textColor: 'text-white',
      url: shareLinks.linkedin,
    },
    {
      action: 'share',
      bgColor: 'bg-gray-600 hover:bg-gray-700',
      darkBgColor: 'dark:bg-gray-500 dark:hover:bg-gray-600',
      icon: Mail,
      name: 'Email',
      textColor: 'text-white',
      url: shareLinks.email,
    },
    {
      action: 'share',
      bgColor: 'bg-[#25D366] hover:bg-[#1DA851]',
      darkBgColor: 'dark:bg-[#25D366] dark:hover:bg-[#1DA851]',
      icon: MessageCircle,
      name: 'WhatsApp',
      textColor: 'text-white',
      url: shareLinks.whatsapp,
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = (button: {
    action?: string;
    name: string;
    url?: string;
  }) => {
    if (button.action === 'copy') {
      handleCopyLink();
    } else if (button.name === 'Email' && button.url) {
      window.open(button.url, '_self');
    } else if (button.url) {
      window.open(button.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <Share2 className="w-4 h-4 text-red-500" />
        <h3 className="text-sm font-medium text-cloud-700 dark:text-cloud-300">
          Share this article
        </h3>
      </div>

      <div className="flex justify-center gap-3 flex-wrap">
        {shareButtons.map((button, index) => {
          const Icon = button.icon;
          return (
            <motion.button
              key={button.name}
              onClick={() => handleShare(button)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm
                transition-all duration-300 shadow-md hover:shadow-lg
                ${button.bgColor} ${button.darkBgColor} ${button.textColor}
                transform hover:-translate-y-0.5
              `}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{button.name}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SocialShare;
