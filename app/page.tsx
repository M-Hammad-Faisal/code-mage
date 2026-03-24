import { ArrowRight, BookOpen, Code2, Youtube, Zap } from 'lucide-react';
import Link from 'next/link';
import { getFeaturedPosts, getAllCategories, getAllPosts } from '@/lib/mdx';
import { SITE, CATEGORY_COLORS } from '@/lib/site.config';
import { NewsletterForm } from '@/components/NewsletterForm';
import { PostCard } from '@/components/PostCard';
import { HeroAnimation } from '@/components/HeroAnimation';

export default function HomePage() {
  const featuredPosts = getFeaturedPosts(3);
  const recentPosts = getAllPosts().slice(0, 6);
  const categories = getAllCategories();
  const posts = featuredPosts.length > 0 ? featuredPosts : recentPosts.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* ── HERO ── */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-gray-200 dark:border-gray-800">
        <HeroAnimation />
        <div className="container-max relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-xs font-medium mb-6">
              <Zap className="w-3 h-3" />
              Test Automation · Playwright · AI + QA
            </div>

            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-6">
              Code Your{' '}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Magic
              </span>
            </h1>

            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-4 max-w-xl">
              By{' '}
              <strong className="text-gray-900 dark:text-white font-semibold">
                Muhammad Hammad Faisal
              </strong>{' '}
              — Test Automation Engineer at Arbisoft. I help manual testers break into automation
              with Playwright, real projects, and zero fluff.
            </p>

            <p className="font-mono text-sm text-red-500 dark:text-red-400 mb-8">
              &gt; <span className="text-red-700 dark:text-red-500">python</span> learn_to_code.py
              --level=pro
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium text-sm transition-all shadow-sm"
              >
                Read the Blog <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tutorial"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600 font-medium text-sm transition-all"
              >
                <BookOpen className="w-4 h-4" /> Start Learning
              </Link>
              <a
                href={SITE.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-red-300 hover:text-red-600 dark:hover:text-red-400 font-medium text-sm transition-all"
              >
                <Youtube className="w-4 h-4" /> YouTube
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              {[
                { label: 'Blog Posts', value: `${getAllPosts().length}+` },
                { label: 'Topics Covered', value: `${categories.length}+` },
                {
                  label: 'Years Experience',
                  value: `${new Date().getFullYear() - SITE.author.careerStartYear}+`,
                },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
                    {s.value}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-14 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950/50">
        <div className="container-max">
          <p className="text-xs font-mono text-red-500 dark:text-red-400 tracking-widest uppercase mb-4">
            — Topics
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/blog?category=${encodeURIComponent(cat)}`}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all hover:scale-105 ${
                  CATEGORY_COLORS[cat] ?? CATEGORY_COLORS['Uncategorized']
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED POSTS ── */}
      <section className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="container-max">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-xs font-mono text-red-500 dark:text-red-400 tracking-widest uppercase mb-2">
                — Latest Writing
              </p>
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
                From the Blog
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* ── LEARN CTA ── */}
      <section className="py-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950/50">
        <div className="container-max">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 p-8 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border border-red-200 dark:border-red-900/40">
            <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center flex-shrink-0">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-1">
                Start the Tutorial — Free
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Hands-on Playwright, WebdriverIO, and Cypress guides — from zero to production.
              </p>
            </div>
            <Link
              href="/tutorial"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium text-sm transition-all flex-shrink-0"
            >
              Browse Tutorials <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-20">
        <div className="container-max">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-950/40 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2">
              Join the Mage Circle
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              New posts, Python tips, and project updates — straight to your inbox. No spam.
            </p>
            <div className="flex justify-center">
              <NewsletterForm source="homepage" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
