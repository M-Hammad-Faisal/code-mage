import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { ComponentType } from 'react';
import { MDXProvider } from '@mdx-js/react';
import {
  Clock,
  Eye,
  Calendar,
  Tag,
  ArrowLeft,
  Share2,
  BookOpen,
  User,
} from 'lucide-react';
import {
  SEO,
  MDXComponents,
  SocialShare,
  FloatingScrollButton,
} from '../components';
import LazyImage from '../components/LazyImage';
import { loadMDXFile } from '../utils/mdxLoader';

// Blog post type (should match the one in Blog.tsx)
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  views: string;
  author: {
    name: string;
    avatar: string;
  };
}

// This should be the same data as in Blog.tsx - in a real app, this would come from an API or context
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title:
      "From Confusion to Clarity: Understanding Python's Mutable Default Arguments",
    excerpt:
      'The notorious Python gotcha that trips up even senior developers. Master mutable default arguments once and for all with visual explanations, real-world examples, and bulletproof solutions.',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Python Deep Dive',
    tags: [
      'python',
      'gotchas',
      'functions',
      'mutable',
      'interview',
      'debugging',
      'best-practices',
    ],
    date: 'Jan 16, 2025',
    readTime: '12 min',
    views: '2.8k',
    author: {
      name: 'Code Mage',
      avatar: '/brand/Code Mage Logo.webp',
    },
  },
  {
    id: 2,
    title: 'Can You Solve This? The Trickiest List-Comprehension Puzzle Ever',
    excerpt:
      'Think you know list comprehensions? 🤔 This mind-bending puzzle has stumped senior developers. Can you crack it? Drop your solution in the comments and see how you stack up!',
    image:
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Python Challenges',
    tags: [
      'python',
      'list-comprehension',
      'challenge',
      'puzzle',
      'interactive',
      'advanced',
    ],
    date: 'Jan 16, 2025',
    readTime: '8 min',
    views: '4.1k',
    author: {
      name: 'Code Mage',
      avatar: '/brand/Code Mage Logo.webp',
    },
  },
  {
    id: 3,
    title: '5 Python Problems That Made Me Rage-Quit (and What I Learned)',
    excerpt:
      "Every Python developer has been there - staring at code that should work but doesn't. Here are 5 problems that nearly broke me, and the hard-won lessons that made me a better programmer.",
    image:
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Python Problems',
    tags: [
      'python',
      'debugging',
      'problems',
      'learning',
      'gotchas',
      'experience',
    ],
    date: 'Jan 16, 2025',
    readTime: '10 min',
    views: '3.7k',
    author: {
      name: 'Code Mage',
      avatar: '/brand/Code Mage Logo.webp',
    },
  },
  {
    id: 4,
    title:
      'Building a Mini Hogwarts Sorting Hat AI in Python (Beginner Friendly Project)',
    excerpt:
      "Ever wondered which Hogwarts house you truly belong to? Let's build an AI that can sort you! This beginner-friendly project teaches machine learning fundamentals while creating something magical.",
    image:
      'https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'AI Projects',
    tags: [
      'python',
      'ai',
      'machine-learning',
      'beginner',
      'project',
      'harry-potter',
      'classification',
    ],
    date: 'Jan 15, 2025',
    readTime: '15 min',
    views: '5.2k',
    author: {
      name: 'Code Mage',
      avatar: '/brand/Code Mage Logo.webp',
    },
  },
  {
    id: 5,
    title: 'Loops Are Spells: How to Think Recursively in Python',
    excerpt:
      'Step into the magical world of recursion! 🪄 Learn to think like a wizard and master the art of recursive spells. From simple incantations to powerful algorithms, discover the magic within your code.',
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Python Magic',
    tags: [
      'python',
      'recursion',
      'algorithms',
      'beginner',
      'storytelling',
      'magic',
      'functions',
    ],
    date: 'Jan 15, 2025',
    readTime: '12 min',
    views: '3.9k',
    author: {
      name: 'Code Mage',
      avatar: '/brand/Code Mage Logo.webp',
    },
  },
  {
    id: 6,
    title: "What I Learned After Reading Fluent Python — So You Don't Have To",
    excerpt:
      "Fluent Python is a masterpiece, but it's also 800+ pages of dense content. Here are the game-changing insights that will level up your Python skills without reading the entire book.",
    image:
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Book Summary',
    tags: [
      'python',
      'book-summary',
      'fluent-python',
      'advanced',
      'learning',
      'insights',
    ],
    date: 'Jan 14, 2025',
    readTime: '10 min',
    views: '6.1k',
    author: {
      name: 'Code Mage',
      avatar: '/brand/Code Mage Logo.webp',
    },
  },
  {
    id: 7,
    title: "The Magic Behind Python's 'is' vs '==' — Explained Like You're 5",
    excerpt:
      'Why does `a is b` sometimes work and sometimes not? 🤔 Let\'s unravel this Python mystery with simple analogies that will make you go "Aha!" and never confuse identity with equality again.',
    image:
      'https://images.unsplash.com/photo-1629654297299-c8506221ca97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Python Fundamentals',
    tags: [
      'python',
      'fundamentals',
      'identity',
      'equality',
      'beginner',
      'comparison',
      'operators',
    ],
    date: 'Jan 14, 2025',
    readTime: '7 min',
    views: '4.8k',
    author: {
      name: 'Code Mage',
      avatar: '/brand/Code Mage Logo.webp',
    },
  },
  {
    id: 8,
    title: "10 Python Mistakes You're Probably Making Without Realizing It",
    excerpt:
      'Even experienced Python developers fall into these traps. Discover the subtle mistakes that could be slowing down your code and making your programs behave unexpectedly.',
    image:
      'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Python Tips',
    tags: [
      'python',
      'mistakes',
      'best-practices',
      'performance',
      'debugging',
      'tips',
    ],
    date: 'Jan 13, 2025',
    readTime: '9 min',
    views: '7.3k',
    author: {
      name: 'Code Mage',
      avatar: '/brand/Code Mage Logo.webp',
    },
  },
];

// Mapping of blog post IDs to their corresponding MDX file names
const blogPostFiles: Record<number, string> = {
  1: 'python-mutable-default-arguments-explained.mdx',
  2: 'trickiest-list-comprehension-puzzle-ever.mdx',
  3: '5-python-problems-made-me-rage-quit.mdx',
  4: 'hogwarts-sorting-hat-ai-python.mdx',
  5: 'loops-are-spells-recursion-magic.mdx',
  6: 'fluent-python-insights-you-need-to-know.mdx',
  7: 'python-is-vs-equals-magic-explained.mdx',
  8: '10-python-mistakes-youre-probably-making.mdx',
};

export const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [MDXContent, setMDXContent] = useState<ComponentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlogPost = async () => {
      if (!id) {
        setError('Blog post ID not found');
        setLoading(false);
        return;
      }

      const postId = parseInt(id);
      const foundPost = blogPosts.find(p => p.id === postId);

      if (!foundPost) {
        setError('Blog post not found');
        setLoading(false);
        return;
      }

      setPost(foundPost);

      // Try to load the MDX content
      const fileName = blogPostFiles[postId];
      if (fileName) {
        try {
          const mdxModule = await loadMDXFile(fileName);
          if (mdxModule) {
            setMDXContent(() => mdxModule.default);
          } else {
            setError('Failed to load blog content');
          }
        } catch (err) {
          console.error('Error loading MDX content:', err);
          setError('Failed to load blog content');
        }
      } else {
        setError('Blog content not available');
      }

      setLoading(false);
    };

    loadBlogPost();
  }, [id]);

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cloud-100 dark:bg-navy-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-cloud-100 dark:bg-navy-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {error || 'Blog post not found'}
          </h1>
          <Link
            to="/blog"
            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cloud-100 dark:bg-navy-900 py-16">
      <SEO
        title={`${post.title} | Code Mage Blog`}
        description={post.excerpt}
        url={`https://code-mage.vercel.app/blog/${post.id}`}
      />
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-gray-800/80 rounded-xl shadow-lg dark:shadow-2xl border border-gray-200 dark:border-gray-600/50 backdrop-blur-sm overflow-hidden"
        >
          {/* Featured Image */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <LazyImage
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-6">
              <span className="inline-block px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-full">
                {post.category}
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-navy-500 dark:text-cloud-400">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>{post.views}</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Article</span>
              </div>
            </div>

            {/* Author */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center space-x-3">
                <LazyImage
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-navy-400 dark:text-cloud-400" />
                    <span className="font-medium text-navy-900 dark:text-cloud-100">
                      {post.author.name}
                    </span>
                  </div>
                  <p className="text-sm text-navy-500 dark:text-cloud-400">
                    Author
                  </p>
                </div>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="text-navy-600 dark:text-cloud-300 leading-relaxed">
                {MDXContent ? (
                  <div className="mdx-content">
                    <MDXProvider components={MDXComponents}>
                      <MDXContent />
                    </MDXProvider>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">
                      Content is loading...
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Tags and Social Share */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
              {/* Tags */}
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-3">
                  <Tag className="w-4 h-4 text-navy-400 dark:text-cloud-400" />
                  <span className="font-medium text-navy-900 dark:text-cloud-100">
                    Tags
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-navy-600 dark:text-cloud-300 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Share */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-600">
                <SocialShare title={post.title} />
              </div>
            </div>
          </div>
        </motion.article>

        {/* Related Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-navy-900 dark:text-cloud-100 mb-6">
            Related Posts
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts
              .filter(p => p.id !== post.id)
              .slice(0, 3)
              .map(relatedPost => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800/80 rounded-xl shadow-lg dark:shadow-2xl border border-gray-200 dark:border-gray-600/50 backdrop-blur-sm overflow-hidden hover:shadow-xl dark:hover:shadow-3xl transition-all duration-300 group-hover:scale-105">
                    <div className="relative h-48 overflow-hidden">
                      <LazyImage
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-2 py-1 bg-red-600 text-white text-xs font-medium rounded-full">
                          {relatedPost.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-navy-900 dark:text-cloud-100 mb-2 line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-navy-600 dark:text-cloud-300 mb-3 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-navy-400 dark:text-cloud-400">
                        <span>{relatedPost.date}</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </motion.div>

        {/* Floating Scroll Button */}
        <FloatingScrollButton />
      </div>
    </div>
  );
};
