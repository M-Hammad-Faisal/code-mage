import { AnimatePresence, motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface FloatingScrollButtonProps {
  showThreshold?: number;
}

export const FloatingScrollButton: React.FC<FloatingScrollButtonProps> = ({
  showThreshold = 300,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show button when scrolled past threshold
      setIsVisible(currentScrollY > showThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showThreshold]);

  const scrollToTop = () => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="
            fixed bottom-6 right-6 z-50
            w-12 h-12 rounded-full
            bg-slate-700 hover:bg-slate-800
            dark:bg-slate-600 dark:hover:bg-slate-700
            text-white shadow-lg hover:shadow-xl
            flex items-center justify-center
            transition-all duration-300
            border border-slate-600 dark:border-slate-500
            backdrop-blur-sm
          "
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingScrollButton;
