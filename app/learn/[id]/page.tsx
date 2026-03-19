import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';
import { getAllLessons, getLessonById } from '@/lib/mdx';
import { SITE } from '@/lib/site.config';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAllLessons().map((l) => ({ id: l.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const lesson = getLessonById(id);
  if (!lesson) return { title: 'Lesson Not Found' };
  const url = `${SITE.url}/learn/${id}`;
  return {
    title: lesson.title,
    description: lesson.description,
    alternates: { canonical: url },
    openGraph: { url, title: lesson.title, description: lesson.description },
  };
}

const LEVEL_COLORS = {
  beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
};

export default async function LessonPage({ params }: Props) {
  const { id } = await params;
  const lesson = getLessonById(id);
  if (!lesson) notFound();

  return (
    <div className="min-h-screen py-12">
      <div className="container-max">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/learn"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Lessons
          </Link>

          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${LEVEL_COLORS[lesson.level]}`}
              >
                {lesson.level}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Clock className="w-3 h-3" />
                {lesson.duration}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white tracking-tight mb-4">
              {lesson.title}
            </h1>
            {lesson.description && (
              <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                {lesson.description}
              </p>
            )}
          </header>

          <article className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-heading prose-code:font-mono prose-pre:bg-gray-900 prose-a:text-red-600 dark:prose-a:text-red-400">
            <MDXRemote source={lesson.content} />
          </article>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" /> Back to all lessons
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
