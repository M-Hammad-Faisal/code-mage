import React, { useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  fallback?: ReactNode;
  animateOnLoad?: boolean;
}

const LazySection: React.FC<LazySectionProps> = ({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '100px',
  fallback = null,
  animateOnLoad = true,
}) => {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Small delay to ensure smooth animation
          setTimeout(() => setIsLoaded(true), 50);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  return (
    <div
      ref={sectionRef}
      className={`${
        animateOnLoad && !prefersReducedMotion
          ? `transition-all duration-700 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`
          : ''
      } ${className}`}
    >
      {isInView ? children : fallback}
    </div>
  );
};

export default LazySection;
