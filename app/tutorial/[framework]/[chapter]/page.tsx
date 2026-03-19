import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { FRAMEWORKS, getFrameworkChapters, getChapter } from '@/lib/tutorials';
import { getMDXComponents } from '@/lib/mdx-components';
import { SITE } from '@/lib/site.config';

interface Props {
  params: Promise<{ framework: string; chapter: string }>;
}

export async function generateStaticParams() {
  const params: { framework: string; chapter: string }[] = [];
  for (const framework of Object.keys(FRAMEWORKS)) {
    const chapters = getFrameworkChapters(framework);
    for (const ch of chapters) {
      params.push({ framework, chapter: ch.chapter });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { framework, chapter } = await params;
  const ch = getChapter(framework, chapter);
  if (!ch) return { title: 'Not Found' };
  const fw = FRAMEWORKS[framework];
  const url = `${SITE.url}/tutorial/${framework}/${chapter}`;
  return {
    title: `${ch.title} — ${fw?.title} Tutorial — Code Mage`,
    description: ch.description,
    alternates: { canonical: url },
    openGraph: { url, title: ch.title, description: ch.description },
  };
}

export default async function ChapterPage({ params }: Props) {
  const { framework, chapter } = await params;
  const fw = FRAMEWORKS[framework];
  if (!fw) notFound();

  const ch = getChapter(framework, chapter);
  if (!ch) notFound();

  const chapters = getFrameworkChapters(framework);
  const idx = chapters.findIndex((c) => c.chapter === chapter);
  const prev = chapters[idx - 1] ?? null;
  const next = chapters[idx + 1] ?? null;

  return (
    <div className="min-h-screen py-12">
      <div className="container-max">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8 flex-wrap">
            <Link
              href="/tutorial"
              className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Tutorials
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href={`/tutorial/${framework}`}
              className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {fw.title}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-600 dark:text-gray-300">{ch.title}</span>
          </div>

          {/* Chapter header */}
          <div className="mb-8">
            <p className="text-xs font-mono text-red-500 tracking-widest uppercase mb-2">
              {fw.icon} {fw.title} · Chapter {idx + 1} of {chapters.length}
            </p>
            <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white tracking-tight">
              {ch.title}
            </h1>
            {ch.description && (
              <p className="text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                {ch.description}
              </p>
            )}
          </div>

          {/* Chapter list — collapsible */}
          <details className="mb-8 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <summary className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
              All chapters ({chapters.length})
            </summary>
            <div className="border-t border-gray-200 dark:border-gray-800">
              {chapters.map((c, i) => (
                <Link
                  key={c.chapter}
                  href={`/tutorial/${framework}/${c.chapter}`}
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    c.chapter === chapter
                      ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-medium'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'
                  }`}
                >
                  <span className="font-mono text-xs text-gray-400 w-4 shrink-0">{i + 1}</span>
                  {c.title}
                </Link>
              ))}
            </div>
          </details>

          {/* MDX Content — components passed so DownloadCard works in MDX */}
          <article className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-heading prose-code:font-mono prose-pre:bg-gray-900 prose-a:text-red-600 dark:prose-a:text-red-400">
            <MDXRemote source={ch.content} components={getMDXComponents()} />
          </article>

          {/* Prev / Next navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 grid grid-cols-2 gap-4">
            {prev ? (
              <Link
                href={`/tutorial/${framework}/${prev.chapter}`}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-red-300 dark:hover:border-red-800 transition-all group"
              >
                <p className="text-xs text-gray-400 mb-1.5 flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3" /> Previous
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {prev.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {next && (
              <Link
                href={`/tutorial/${framework}/${next.chapter}`}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-red-300 dark:hover:border-red-800 transition-all group text-right"
              >
                <p className="text-xs text-gray-400 mb-1.5 flex items-center gap-1 justify-end">
                  Next <ChevronRight className="w-3 h-3" />
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {next.title}
                </p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
