import React from 'react';

interface WebPImageProps {
  webpSrc: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
}

/**
 * WebP Image component with PNG fallback for better browser compatibility
 * Uses the HTML <picture> element for automatic format selection
 */
export const WebPImage: React.FC<WebPImageProps> = ({
  webpSrc,
  fallbackSrc,
  alt,
  className,
  style,
  loading = 'lazy',
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
  webpSrc: string;
  fallbackSrc: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * WebP Background component with PNG fallback for background images
 * Uses optimized WebP detection for better performance
 */
export const WebPBackground: React.FC<WebPBackgroundProps> = ({
  webpSrc,
  fallbackSrc,
  className,
  style,
  children,
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
