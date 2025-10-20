declare module '*.mdx' {
  import { ComponentType } from 'react';
  const Component: ComponentType;
  export default Component;
  export const frontmatter: {
    title: string;
    date: string;
    tags: string[];
    author: string;
    category: string;
    readTime: string;
    excerpt: string;
    [key: string]: string | string[] | number;
  };
}
