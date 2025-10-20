import React from 'react';
import type { ComponentProps } from 'react';
import { CodeBlock } from './CodeBlock';

// MDX Components for custom styling
export const MDXComponents = {
  // Headings
  h1: ({ children, ...props }: ComponentProps<'h1'>) => (
    <div className="mb-8 mt-0 first:mt-0">
      <h1
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 dark:text-cloud-100 mb-4 leading-tight"
        {...props}
      >
        {children}
      </h1>
      <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mb-2"></div>
      <div className="w-16 h-0.5 bg-gradient-to-r from-red-400 to-red-500 rounded-full"></div>
    </div>
  ),
  h2: ({ children, ...props }: ComponentProps<'h2'>) => (
    <div className="mb-6 mt-12 first:mt-0">
      <h2
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy-900 dark:text-cloud-100 mb-3 leading-tight"
        {...props}
      >
        {children}
      </h2>
      <div className="w-16 h-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
    </div>
  ),
  h3: ({ children, ...props }: ComponentProps<'h3'>) => (
    <h3
      className="text-xl md:text-2xl lg:text-3xl font-bold text-navy-900 dark:text-cloud-100 mb-4 mt-10 first:mt-0 leading-tight"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: ComponentProps<'h4'>) => (
    <h4
      className="text-lg md:text-xl font-semibold text-navy-900 dark:text-cloud-100 mb-2 mt-4 first:mt-0"
      {...props}
    >
      {children}
    </h4>
  ),
  h5: ({ children, ...props }: ComponentProps<'h5'>) => (
    <h5
      className="text-base md:text-lg font-semibold text-navy-900 dark:text-cloud-100 mb-2 mt-4 first:mt-0"
      {...props}
    >
      {children}
    </h5>
  ),
  h6: ({ children, ...props }: ComponentProps<'h6'>) => (
    <h6
      className="text-sm md:text-base font-semibold text-navy-900 dark:text-cloud-100 mb-2 mt-4 first:mt-0"
      {...props}
    >
      {children}
    </h6>
  ),

  // Paragraphs
  p: ({ children, ...props }: ComponentProps<'p'>) => (
    <p
      className="mb-4 text-navy-600 dark:text-cloud-300 leading-relaxed"
      {...props}
    >
      {children}
    </p>
  ),

  // Code blocks and inline code
  code: CodeBlock,
  pre: ({ children, ...props }: ComponentProps<'pre'>) => (
    <pre {...props}>{children}</pre>
  ),

  // Lists
  ul: ({ children, ...props }: ComponentProps<'ul'>) => (
    <ul
      className="list-disc list-inside mb-4 space-y-2 text-navy-600 dark:text-cloud-300"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ComponentProps<'ol'>) => (
    <ol
      className="list-decimal list-inside mb-4 space-y-2 text-navy-600 dark:text-cloud-300"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: ComponentProps<'li'>) => (
    <li className="text-navy-600 dark:text-cloud-300" {...props}>
      {children}
    </li>
  ),

  // Blockquotes
  blockquote: ({ children, ...props }: ComponentProps<'blockquote'>) => (
    <blockquote
      className="border-l-4 border-red-500 pl-4 my-6 italic text-navy-700 dark:text-cloud-200 bg-gray-50 dark:bg-gray-800/50 py-4 rounded-r-lg"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Links
  a: ({ children, href, ...props }: ComponentProps<'a'>) => (
    <a
      href={href}
      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 underline decoration-red-500/30 hover:decoration-red-500/60 transition-colors duration-200"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),

  // Tables
  table: ({ children, ...props }: ComponentProps<'table'>) => (
    <div className="overflow-x-auto my-6">
      <table
        className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: ComponentProps<'thead'>) => (
    <thead className="bg-gray-50 dark:bg-gray-800" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }: ComponentProps<'tbody'>) => (
    <tbody className="bg-white dark:bg-gray-900" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }: ComponentProps<'tr'>) => (
    <tr className="border-b border-gray-200 dark:border-gray-700" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }: ComponentProps<'th'>) => (
    <th
      className="px-4 py-2 text-left font-semibold text-navy-900 dark:text-cloud-100"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: ComponentProps<'td'>) => (
    <td className="px-4 py-2 text-navy-600 dark:text-cloud-300" {...props}>
      {children}
    </td>
  ),

  // Horizontal rule
  hr: ({ ...props }: ComponentProps<'hr'>) => (
    <hr className="my-8 border-gray-200 dark:border-gray-700" {...props} />
  ),

  // Strong and emphasis
  strong: ({ children, ...props }: ComponentProps<'strong'>) => (
    <strong className="font-bold text-navy-900 dark:text-cloud-100" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: ComponentProps<'em'>) => (
    <em className="italic text-navy-700 dark:text-cloud-200" {...props}>
      {children}
    </em>
  ),

  // Images
  img: ({ src, alt, ...props }: ComponentProps<'img'>) => (
    <img
      src={src}
      alt={alt}
      className="max-w-full h-auto rounded-lg shadow-md my-6"
      {...props}
    />
  ),
};
