import type { Metadata } from 'next';
import { BookOpen, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { getAllLessons } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Learn',
  description: 'Structured lessons on Python, test automation, and web development — free to read.',
};

const LEVEL_COLORS = {
  beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
};

export default function LearnPage() {
  const lessons = getAllLessons();

  return (
    <div className="min-h-screen py-16">
      <div className="container-max">
        <div className="mb-12">
          <p className="text-xs font-mono text-red-500 dark:text-red-400 tracking-widest uppercase mb-3">
            — Learn
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            Lessons
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400 max-w-lg">
            Structured, practical content on Python, automation, and full stack development. Start
            from beginner, go to advanced.
          </p>
        </div>

        {lessons.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {lessons.map((lesson) => (
              <Link
                key={lesson.id}
                href={`/learn/${lesson.id}`}
                className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:border-red-300 dark:hover:border-red-800 hover:shadow-md transition-all duration-200 flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
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
                <h3 className="font-heading font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors mb-2 leading-snug">
                  {lesson.title}
                </h3>
                {lesson.description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">
                    {lesson.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {lesson.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs text-red-500 dark:text-red-400 mt-auto">
                  Start lesson <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
            <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-heading font-semibold text-gray-900 dark:text-white mb-2">
              Lessons coming soon
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Structured content is being prepared. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
