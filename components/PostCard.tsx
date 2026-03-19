import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { BlogPost } from '@/lib/mdx';
import { CATEGORY_COLORS } from '@/lib/site.config';

interface Props {
  post: BlogPost;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: Props) {
  const catColor = CATEGORY_COLORS[post.category] ?? CATEGORY_COLORS['Uncategorized'];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex flex-col bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-red-300 dark:hover:border-red-800 hover:shadow-md transition-all duration-200 overflow-hidden ${
        featured ? 'md:flex-row' : ''
      }`}
    >
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${catColor}`}>
            {post.category}
          </span>
          {post.featured && (
            <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800">
              ⭐ Featured
            </span>
          )}
        </div>

        <h2 className="font-heading font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-snug mb-2 line-clamp-2 text-base">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2 flex-1">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime} min
            </span>
          </div>
          <span className="text-xs text-red-500 dark:text-red-400 group-hover:gap-1.5 flex items-center gap-1 transition-all">
            Read <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
