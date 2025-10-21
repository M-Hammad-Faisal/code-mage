import type { ComponentType } from 'react';

interface MDXModule {
  default: ComponentType;
  frontmatter: {
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

// Dynamic import mapping for MDX files
const mdxFiles: Record<string, () => Promise<MDXModule>> = {
  '10-python-mistakes-youre-probably-making.mdx': async () =>
    import('../../content/blog/10-python-mistakes-youre-probably-making.mdx'),
  '5-python-problems-made-me-rage-quit.mdx': async () =>
    import('../../content/blog/5-python-problems-made-me-rage-quit.mdx'),
  'fluent-python-insights-you-need-to-know.mdx': async () =>
    import('../../content/blog/fluent-python-insights-you-need-to-know.mdx'),
  'hogwarts-sorting-hat-ai-python.mdx': async () =>
    import('../../content/blog/hogwarts-sorting-hat-ai-python.mdx'),
  'loops-are-spells-recursion-magic.mdx': async () =>
    import('../../content/blog/loops-are-spells-recursion-magic.mdx'),
  'python-is-vs-equals-magic-explained.mdx': async () =>
    import('../../content/blog/python-is-vs-equals-magic-explained.mdx'),
  'python-mutable-default-arguments-explained.mdx': async () =>
    import('../../content/blog/python-mutable-default-arguments-explained.mdx'),
  'trickiest-list-comprehension-puzzle-ever.mdx': async () =>
    import('../../content/blog/trickiest-list-comprehension-puzzle-ever.mdx'),
};

export const loadMDXFile = async (
  filename: string
): Promise<MDXModule | null> => {
  try {
    const loader = mdxFiles[filename];
    if (!loader) {
      console.warn(`MDX file not found: ${filename}`);
      return null;
    }

    const module = await loader();
    return module;
  } catch (error) {
    console.error(`Error loading MDX file ${filename}:`, error);
    return null;
  }
};

export const getMDXFileList = (): string[] => {
  return Object.keys(mdxFiles);
};
