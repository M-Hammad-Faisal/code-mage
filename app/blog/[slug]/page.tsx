import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import Link from 'next/link';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';
import { getMDXComponents } from '@/lib/mdx-components';
import { SITE, CATEGORY_COLORS } from '@/lib/site.config';
import { ViewCounter } from '@/components/ViewCounter';
import { ReactionBar } from '@/components/ReactionBar';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { BackToTop } from '@/components/BackToTop';
import { ReadingProgress } from '@/components/ReadingProgress';
import { NewsletterCTA } from '@/components/NewsletterCTA';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  const url = `${SITE.url}/blog/${slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: SITE.author.name }],
    alternates: { canonical: url },
    openGraph: {
      url,
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [SITE.author.name],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const catColor = CATEGORY_COLORS[post.category] ?? CATEGORY_COLORS['Uncategorized'];
  const allPosts = getAllPosts();
  const idx = allPosts.findIndex((p) => p.slug === slug);
  const prev = allPosts[idx + 1] ?? null;
  const next = allPosts[idx - 1] ?? null;

  return (
    <div className="min-h-screen py-12">
      <ReadingProgress />
      <div className="container-max">
        <div className="max-w-2xl mx-auto">
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${catColor}`}>
                {post.category}
              </span>
              <ErrorBoundary>
                <ViewCounter slug={slug} />
              </ErrorBoundary>
            </div>

            <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white tracking-tight leading-tight mb-4">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-5">
                {post.excerpt}
              </p>
            )}

            <div className="flex items-center gap-4 text-xs text-gray-400 pb-6 border-b border-gray-200 dark:border-gray-800">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime} min read
              </span>
            </div>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <Tag className="w-3.5 h-3.5 text-gray-400" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* MDX Content */}
          <article className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-heading prose-code:font-mono prose-pre:bg-gray-900 prose-a:text-red-600 dark:prose-a:text-red-400">
            <MDXRemote source={post.content} components={getMDXComponents()} />
          </article>

          {/* Newsletter CTA */}
          <NewsletterCTA source={`blog-${slug}`} />

          {/* Reactions */}
          <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Found this helpful?
            </p>
            <ErrorBoundary>
              <ReactionBar slug={slug} />
            </ErrorBoundary>
          </div>

          {/* Author */}
          <div className="mt-10 p-6 rounded-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-start gap-4">
              <Image
                src={SITE.author.avatar}
                alt={SITE.author.name}
                width={56}
                height={56}
                className="rounded-xl object-cover object-top flex-shrink-0"
              />
              <div>
                <p className="text-sm font-heading font-semibold text-gray-900 dark:text-white">
                  {SITE.author.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{SITE.author.role}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {SITE.author.shortBio}
                </p>
              </div>
            </div>
          </div>

          {/* Prev / Next */}
          {(prev || next) && (
            <div className="mt-10 grid grid-cols-2 gap-4">
              {prev ? (
                <Link
                  href={`/blog/${prev.slug}`}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-red-300 dark:hover:border-red-800 transition-all group"
                >
                  <p className="text-xs text-gray-400 mb-1.5">← Older</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 line-clamp-2 transition-colors">
                    {prev.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {next && (
                <Link
                  href={`/blog/${next.slug}`}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-red-300 dark:hover:border-red-800 transition-all group text-right"
                >
                  <p className="text-xs text-gray-400 mb-1.5">Newer →</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 line-clamp-2 transition-colors">
                    {next.title}
                  </p>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      <BackToTop
        prev={prev ? { href: `/blog/${prev.slug}`, title: prev.title } : undefined}
        next={next ? { href: `/blog/${next.slug}`, title: next.title } : undefined}
      />
    </div>
  );
}
