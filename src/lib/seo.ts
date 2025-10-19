export interface SEOConfig {
  title: string;
  desc: string;
  url: string;
  image: string;
}

export function seo({ title, desc, url, image }: SEOConfig) {
  return [
    { name: 'description', content: desc },
    { property: 'og:title', content: title },
    { property: 'og:description', content: desc },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: url },
    { property: 'og:image', content: image },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: desc },
    { name: 'twitter:image', content: image },
  ];
}

export function generateSEOTags(config: SEOConfig): string {
  return seo(config)
    .map(tag => {
      if ('property' in tag) {
        return `<meta property="${tag.property}" content="${tag.content}" />`;
      }
      return `<meta name="${tag.name}" content="${tag.content}" />`;
    })
    .join('\n');
}
