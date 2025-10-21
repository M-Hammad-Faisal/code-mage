import React from 'react';

interface WebPImageProps {
  alt: string;
  className?: string;
  fallbackSrc: string;
  loading?: 'lazy' | 'eager';
  style?: React.CSSProperties;
  webpSrc: string;
}

/**
 * WebP Image component with PNG fallback for better browser compatibility
 * Uses the HTML <picture> element for automatic format selection
 */
export const WebPImage: React.FC<WebPImageProps> = ({
  alt,
  className,
  fallbackSrc,
  loading = 'lazy',
  style,
  webpSrc,
}) => {
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={fallbackSrc}
        alt={alt}
        className={className}
        style={style}
        loading={loading}
      />
    </picture>
  );
};

interface WebPBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  fallbackSrc: string;
  style?: React.CSSProperties;
  webpSrc: string;
}

/**
 * WebP Background component with PNG fallback for background images
 * Uses optimized WebP detection for better performance
 */
export const WebPBackground: React.FC<WebPBackgroundProps> = ({
  children,
  className,
  fallbackSrc,
  style,
  webpSrc,
}) => {
  // Use WebP by default for modern browsers, fallback handled by CSS
  const backgroundStyle: React.CSSProperties = {
    ...style,
    backgroundImage: `url('${webpSrc}'), url('${fallbackSrc}')`,
  };

  return (
    <div className={className} style={backgroundStyle}>
      {children}
    </div>
  );
};
