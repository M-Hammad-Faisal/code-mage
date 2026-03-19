'use client';

import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useMemo, Suspense } from 'react';
import type { BlogPost } from '@/lib/mdx';
import { CATEGORY_COLORS } from '@/lib/site.config';
import { PostCard } from '@/components/PostCard';

function BlogInner({ posts, categories }: { posts: BlogPost[]; categories: string[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialCategory = searchParams.get('category') ?? 'All';

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    const params = new URLSearchParams(searchParams.toString());
    if (cat === 'All') params.delete('category');
    else params.set('category', cat);
    router.replace(`/blog?${params.toString()}`, { scroll: false });
  };

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesCat = activeCategory === 'All' || p.category === activeCategory;
      const q = query.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [posts, activeCategory, query]);

  return (
    <div className="min-h-screen py-16">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-xs font-mono text-red-500 dark:text-red-400 tracking-widest uppercase mb-3">
            — Writing
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            Blog
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400 max-w-lg">
            Deep dives, tutorials, and real-world breakdowns on Python, automation, and software
            dev.
          </p>
        </motion.div>

        {/* Search + Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts..."
              aria-label="Search blog posts"
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {['All', ...categories].map((cat) => {
              const active = activeCategory === cat;
              const baseColor =
                cat === 'All' ? '' : (CATEGORY_COLORS[cat] ?? CATEGORY_COLORS['Uncategorized']);
              return (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    active
                      ? cat === 'All'
                        ? 'bg-red-600 text-white border-red-600'
                        : baseColor + ' ring-2 ring-offset-1 ring-red-400'
                      : cat === 'All'
                        ? 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-red-300'
                        : baseColor + ' hover:ring-2 hover:ring-offset-1 hover:ring-red-300'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
          {filtered.length} post{filtered.length !== 1 ? 's' : ''}
          {activeCategory !== 'All' && ` in "${activeCategory}"`}
          {query && ` matching "${query}"`}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <h3 className="text-lg font-heading font-semibold text-gray-900 dark:text-white mb-2">
              No posts found
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function BlogClient({ posts, categories }: { posts: BlogPost[]; categories: string[] }) {
  return (
    <Suspense>
      <BlogInner posts={posts} categories={categories} />
    </Suspense>
  );
}
