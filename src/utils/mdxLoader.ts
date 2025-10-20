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
  'python-mutable-default-arguments-explained.mdx': () =>
    import('../../content/blog/python-mutable-default-arguments-explained.mdx'),
  'trickiest-list-comprehension-puzzle-ever.mdx': () =>
    import('../../content/blog/trickiest-list-comprehension-puzzle-ever.mdx'),
  '5-python-problems-made-me-rage-quit.mdx': () =>
    import('../../content/blog/5-python-problems-made-me-rage-quit.mdx'),
  'hogwarts-sorting-hat-ai-python.mdx': () =>
    import('../../content/blog/hogwarts-sorting-hat-ai-python.mdx'),
  'loops-are-spells-recursion-magic.mdx': () =>
    import('../../content/blog/loops-are-spells-recursion-magic.mdx'),
  'fluent-python-insights-you-need-to-know.mdx': () =>
    import('../../content/blog/fluent-python-insights-you-need-to-know.mdx'),
  'python-is-vs-equals-magic-explained.mdx': () =>
    import('../../content/blog/python-is-vs-equals-magic-explained.mdx'),
  '10-python-mistakes-youre-probably-making.mdx': () =>
    import('../../content/blog/10-python-mistakes-youre-probably-making.mdx'),
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
