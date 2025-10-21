export interface SEOConfig {
  desc: string;
  image: string;
  title: string;
  url: string;
}

export function seo({ desc, image, title, url }: SEOConfig) {
  return [
    { content: desc, name: 'description' },
    { content: title, property: 'og:title' },
    { content: desc, property: 'og:description' },
    { content: 'website', property: 'og:type' },
    { content: url, property: 'og:url' },
    { content: image, property: 'og:image' },
    { content: 'summary_large_image', name: 'twitter:card' },
    { content: title, name: 'twitter:title' },
    { content: desc, name: 'twitter:description' },
    { content: image, name: 'twitter:image' },
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
