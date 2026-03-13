import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { FRAMEWORKS, getFrameworkChapters } from '@/lib/tutorials';

interface Props {
  params: Promise<{ framework: string }>;
}

export async function generateStaticParams() {
  return Object.keys(FRAMEWORKS).map((f) => ({ framework: f }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { framework } = await params;
  const fw = FRAMEWORKS[framework];
  if (!fw) return { title: 'Not Found' };
  return {
    title: `${fw.title} Tutorial — Code Mage`,
    description: fw.description,
  };
}

export default async function FrameworkPage({ params }: Props) {
  const { framework } = await params;
  const fw = FRAMEWORKS[framework];
  if (!fw) notFound();

  const chapters = getFrameworkChapters(framework);

  return (
    <div className="min-h-screen py-12">
      <div className="container-max">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link
              href="/tutorial"
              className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Tutorials
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-600 dark:text-gray-300">{fw.title}</span>
          </div>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{fw.icon}</span>
              <div>
                <p className="text-xs font-mono text-red-500 tracking-widest uppercase">Tutorial</p>
                <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white tracking-tight">
                  {fw.title}
                </h1>
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{fw.description}</p>
          </div>

          {/* Chapters */}
          <div className="flex flex-col gap-2">
            {chapters.map((ch, i) => (
              <Link
                key={ch.chapter}
                href={`/tutorial/${framework}/${ch.chapter}`}
                className="group flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-red-300 dark:hover:border-red-800 hover:shadow-sm transition-all"
              >
                <span className="text-sm font-mono text-gray-400 w-6 text-right shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {ch.title}
                  </p>
                  {ch.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                      {ch.description}
                    </p>
                  )}
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors shrink-0" />
              </Link>
            ))}
          </div>

          {/* Start CTA */}
          {chapters.length > 0 && (
            <div className="mt-8">
              <Link
                href={`/tutorial/${framework}/${chapters[0].chapter}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
              >
                Start Chapter 1 <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
