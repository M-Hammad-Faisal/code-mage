/**
 * Utility function to get the correct asset path for both development and production
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present to normalize the path
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

  // Use root path for all environments (works with Vercel)
  return `/${normalizedPath}`;
}

/**
 * Common asset paths used throughout the application
 */
export const ASSETS = {
  LOGO: {
    WEBP: getAssetPath('brand/Code Mage Logo.webp'),
    PNG: getAssetPath('brand/Code Mage Logo-96.png'),
    DEFAULT: getAssetPath('brand/Code Mage Logo-96.png'),
  },
  BANNER: {
    WEBP: getAssetPath('brand/Code Mage Banner.webp'),
    PNG: getAssetPath('brand/Code Mage Banner.png'),
    DEFAULT: getAssetPath('brand/Code Mage Banner.webp'),
  },
} as const;

/**
 * Legacy exports for backward compatibility
 * @deprecated Use ASSETS.LOGO.DEFAULT or ASSETS.BANNER.DEFAULT instead
 */
export const LOGO = ASSETS.LOGO.DEFAULT;
export const BANNER = ASSETS.BANNER.DEFAULT;
