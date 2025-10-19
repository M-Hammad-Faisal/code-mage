/**
 * Utility function to get the correct asset path for both development and production
 * In production (GitHub Pages), assets need to include the base path '/code-mage'
 * In development, assets can use the root path
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present to normalize the path
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

  // In production, prepend the base path
  if (import.meta.env.PROD) {
    return `/code-mage/${normalizedPath}`;
  }

  // In development, use the root path
  return `/${normalizedPath}`;
}

/**
 * Common asset paths used throughout the application
 */
export const ASSETS = {
  LOGO: getAssetPath('brand/Code Mage Logo.png'),
  BANNER: getAssetPath('brand/Code Mage Banner.png'),
} as const;
