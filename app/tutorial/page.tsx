import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllFrameworks } from '@/lib/tutorials';
import { BookOpen, ChevronRight, Clock, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tutorials — Code Mage',
  description:
    'Hands-on test automation tutorials for Playwright, WebdriverIO, and Cypress. Real projects, real examples.',
};

export default function TutorialsPage() {
  const frameworks = getAllFrameworks();
  const prerequisites = frameworks.find((fw) => fw.slug === 'prerequisites');
  const frameworkTutorials = frameworks.filter((fw) => fw.slug !== 'prerequisites');

  return (
    <div className="min-h-screen py-16">
      <div className="container-max">
        <div>
          {/* Header */}
          <div className="mb-12">
            <p className="text-xs font-mono text-red-500 dark:text-red-400 tracking-widest uppercase mb-3">
              — Tutorials
            </p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white tracking-tight mb-4">
              Test Automation Guides
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed">
              Practical, opinionated guides on test automation tools — written from real project
              experience, not just the docs. Real examples using{' '}
              <a
                href="https://www.saucedemo.com"
                target="_blank"
                rel="noreferrer"
                className="text-red-500 hover:underline"
              >
                SauceDemo
              </a>{' '}
              and other test sites.
            </p>
          </div>

          {/* Prerequisites — Start Here */}
          {prerequisites &&
            (() => {
              const totalTime = prerequisites.chapters.reduce((sum, ch) => sum + ch.readTime, 0);
              return (
                <div className="mb-10">
                  <div className="rounded-2xl border-2 border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20 p-6">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{prerequisites.icon}</span>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">
                              {prerequisites.title}
                            </h2>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-600 text-white">
                              Start Here
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                            {prerequisites.description}
                          </p>
                          <div className="flex items-center flex-wrap gap-3 mt-1.5">
                            {totalTime > 0 && (
                              <span className="inline-flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400">
                                <Clock className="w-3 h-3" /> ~{totalTime} min total
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                              <Users className="w-3 h-3" /> {prerequisites.forWho}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/tutorial/${prerequisites.slug}`}
                        className="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                      >
                        Begin <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                    <div className="flex flex-col gap-1 mt-4">
                      {prerequisites.chapters.map((ch, i) => (
                        <Link
                          key={ch.chapter}
                          href={`/tutorial/${prerequisites.slug}/${ch.chapter}`}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/50 dark:hover:bg-white/5 transition-colors group"
                        >
                          <span className="text-xs font-mono text-gray-400 w-5 text-right">
                            {i + 1}
                          </span>
                          <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors flex-1">
                            {ch.title}
                          </span>
                          <span className="text-xs text-gray-400 shrink-0">{ch.readTime} min</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}

          {/* Framework tutorials */}
          <p className="text-xs font-mono text-gray-400 tracking-widest uppercase mb-4">
            Choose a Framework
          </p>
          <div className="flex flex-col gap-6">
            {frameworkTutorials.map((fw) => {
              const isInProgress = fw.chapters.length > 0 && fw.chapters.length < 8;
              const totalTime = fw.chapters.reduce((sum, ch) => sum + ch.readTime, 0);
              return (
                <div key={fw.slug} className={`rounded-2xl border p-6 ${fw.color}`}>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{fw.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">
                            {fw.title}
                          </h2>
                          {isInProgress && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                              <Clock className="w-3 h-3" /> In Progress
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                          {fw.description}
                        </p>
                        <div className="flex items-center flex-wrap gap-3 mt-1.5">
                          {totalTime > 0 && (
                            <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                              <Clock className="w-3 h-3" /> ~{totalTime} min total
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <Users className="w-3 h-3" /> {fw.forWho}
                          </span>
                        </div>
                      </div>
                    </div>
                    {fw.chapters.length > 0 && (
                      <Link
                        href={`/tutorial/${fw.slug}`}
                        className="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:underline"
                      >
                        Start <ChevronRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>

                  {fw.chapters.length > 0 ? (
                    <div className="flex flex-col gap-1">
                      {fw.chapters.map((ch, i) => (
                        <Link
                          key={ch.chapter}
                          href={`/tutorial/${fw.slug}/${ch.chapter}`}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/50 dark:hover:bg-white/5 transition-colors group"
                        >
                          <span className="text-xs font-mono text-gray-400 w-5 text-right shrink-0">
                            {i + 1}
                          </span>
                          <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors flex-1">
                            {ch.title}
                          </span>
                          <span className="text-xs text-gray-400 shrink-0">{ch.readTime} min</span>
                        </Link>
                      ))}
                      {isInProgress && (
                        <div className="flex items-center gap-2 px-3 py-2 mt-1 border-t border-current/10">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-xs text-gray-400 italic">
                            More chapters coming soon
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-2">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400 italic">Coming soon</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
