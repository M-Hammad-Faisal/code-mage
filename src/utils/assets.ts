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
  LOGO: getAssetPath('brand/Code Mage Logo.png'),
  BANNER: getAssetPath('brand/Code Mage Banner.png'),
} as const;
