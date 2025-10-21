import { useEffect } from 'react';

interface SEOProps {
  description?: string;
  image?: string;
  title?: string;
  type?: string;
  url?: string;
}

export function SEO({
  description = 'Code Your Magic with Code Mage. Learn Python, web development, and software engineering through practical tutorials and hands-on projects.',
  image = '/brand/Code Mage Banner.webp',
  title = 'Code Mage - Code Your Magic',
  type = 'website',
  url = 'https://code-mage.vercel.app',
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (
      name: string,
      content: string,
      property?: boolean
    ) => {
      const selector = property
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }

      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', `${url}${image}`, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'Code Mage', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', `${url}${image}`);
    updateMetaTag('twitter:url', url);
    updateMetaTag('twitter:site', '@code_your_magic');
    updateMetaTag('twitter:creator', '@code_your_magic');

    // Additional SEO tags
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('googlebot', 'index, follow');
    updateMetaTag('author', 'Code Mage');

    // Canonical URL
    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }, [title, description, image, url, type]);

  return null;
}
