import { motion } from 'framer-motion';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Filter,
  Search,
  Tag,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components';
import LazyImage from '../components/LazyImage';

const blogPosts = [
  {
    author: {
      avatar: '/brand/Code Mage Logo.webp',
      name: 'Code Mage',
    },
    category: 'Python Deep Dive',
    date: 'Jan 16, 2025',
    excerpt:
      'The notorious Python gotcha that trips up even senior developers. Master mutable default arguments once and for all with visual explanations, real-world examples, and bulletproof solutions.',
    id: 1,
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readTime: '12 min',
    tags: [
      'python',
      'gotchas',
      'functions',
      'mutable',
      'interview',
      'debugging',
      'best-practices',
    ],
    title:
      "From Confusion to Clarity: Understanding Python's Mutable Default Arguments",
    views: '2.8k',
  },
  {
    author: {
      avatar: '/brand/Code Mage Logo.webp',
      name: 'Code Mage',
    },
    category: 'Python Challenges',
    date: 'Jan 16, 2025',
    excerpt:
      'Think you know list comprehensions? 🤔 This mind-bending puzzle has stumped senior developers. Can you crack it? Drop your solution in the comments and see how you stack up!',
    id: 2,
    image:
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readTime: '8 min',
    tags: [
      'python',
      'list-comprehension',
      'challenge',
      'puzzle',
      'interactive',
      'advanced',
    ],
    title: 'Can You Solve This? The Trickiest List-Comprehension Puzzle Ever',
    views: '4.1k',
  },
  {
    author: {
      avatar: '/brand/Code Mage Logo.webp',
      name: 'Code Mage',
    },
    category: 'Python Problems',
    date: 'Jan 16, 2025',
    excerpt:
      "Every Python developer has been there - staring at code that should work but doesn't. Here are 5 problems that nearly broke me, and the hard-won lessons that made me a better programmer.",
    id: 3,
    image:
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readTime: '10 min',
    tags: [
      'python',
      'debugging',
      'problems',
      'learning',
      'gotchas',
      'experience',
    ],
    title: '5 Python Problems That Made Me Rage-Quit (and What I Learned)',
    views: '3.7k',
  },
  {
    author: {
      avatar: '/brand/Code Mage Logo.webp',
      name: 'Code Mage',
    },
    category: 'AI Projects',
    date: 'Jan 15, 2025',
    excerpt:
      "Ever wondered which Hogwarts house you truly belong to? Let's build an AI that can sort you! This beginner-friendly project teaches machine learning fundamentals while creating something magical.",
    id: 4,
    image:
      'https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readTime: '15 min',
    tags: [
      'python',
      'ai',
      'machine-learning',
      'beginner',
      'project',
      'harry-potter',
      'classification',
    ],
    title:
      'Building a Mini Hogwarts Sorting Hat AI in Python (Beginner Friendly Project)',
    views: '5.2k',
  },
  {
    author: {
      avatar: '/brand/Code Mage Logo.webp',
      name: 'Code Mage',
    },
    category: 'Python Magic',
    date: 'Jan 15, 2025',
    excerpt:
      'Step into the magical world of recursion! 🪄 Learn to think like a wizard and master the art of recursive spells. From simple incantations to powerful algorithms, discover the magic within your code.',
    id: 5,
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readTime: '12 min',
    tags: [
      'python',
      'recursion',
      'algorithms',
      'beginner',
      'storytelling',
      'magic',
      'functions',
    ],
    title: 'Loops Are Spells: How to Think Recursively in Python',
    views: '3.9k',
  },
  {
    author: {
      avatar: '/brand/Code Mage Logo.webp',
      name: 'Code Mage',
    },
    category: 'Book Summary',
    date: 'Jan 14, 2025',
    excerpt:
      "Fluent Python is a masterpiece, but it's also 800+ pages of dense content. Here are the game-changing insights that will level up your Python skills without reading the entire book.",
    id: 6,
    image:
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readTime: '10 min',
    tags: [
      'python',
      'book-summary',
      'fluent-python',
      'advanced',
      'learning',
      'insights',
    ],
    title: "What I Learned After Reading Fluent Python — So You Don't Have To",
    views: '6.1k',
  },
  {
    author: {
      avatar: '/brand/Code Mage Logo.webp',
      name: 'Code Mage',
    },
    category: 'Python Fundamentals',
    date: 'Jan 14, 2025',
    excerpt:
      'Why does `a is b` sometimes work and sometimes not? 🤔 Let\'s unravel this Python mystery with simple analogies that will make you go "Aha!" and never confuse identity with equality again.',
    id: 7,
    image:
      'https://images.unsplash.com/photo-1629654297299-c8506221ca97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readTime: '7 min',
    tags: [
      'python',
      'fundamentals',
      'identity',
      'equality',
      'beginner',
      'comparison',
      'operators',
    ],
    title: "The Magic Behind Python's 'is' vs '==' — Explained Like You're 5",
    views: '4.8k',
  },
  {
    author: {
      avatar: '/brand/Code Mage Logo.webp',
      name: 'Code Mage',
    },
    category: 'Python Tips',
    date: 'Jan 13, 2025',
    excerpt:
      'Even experienced Python developers fall into these traps. Discover the subtle mistakes that could be slowing down your code and making your programs behave unexpectedly.',
    id: 8,
    image:
      'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readTime: '9 min',
    tags: [
      'python',
      'mistakes',
      'best-practices',
      'performance',
      'debugging',
      'tips',
    ],
    title: "10 Python Mistakes You're Probably Making Without Realizing It",
    views: '7.3k',
  },
];

export const Blog: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Get unique categories
  const categories = [
    'All',
    ...Array.from(new Set(blogPosts.map(post => post.category))),
  ];

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Paginate posts
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-cloud-100 dark:bg-navy-900 py-16">
      <SEO
        title="Programming Blog - Code Mage"
        description="Read the latest articles on programming, web development, software engineering best practices, and technology insights from Code Mage."
        url="https://code-mage.vercel.app/blog"
      />
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Code Mage Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-white max-w-3xl mx-auto">
            Discover the latest tutorials, tips, and insights to level up your
            programming skills.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-12"
        >
          <div className="bg-white dark:bg-gray-800/80 rounded-xl shadow-lg dark:shadow-2xl p-6 border border-gray-200 dark:border-gray-600/50 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-navy-400 dark:text-cloud-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-navy-900 dark:text-cloud-100 placeholder-navy-400 dark:placeholder-cloud-400"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-navy-400 dark:text-cloud-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-navy-900 dark:text-cloud-100 min-w-[150px]"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-navy-600 dark:text-cloud-300">
              Showing {filteredPosts.length} article
              {filteredPosts.length !== 1 ? 's' : ''}
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-12"
        >
          {paginatedPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.8 }}
                  className="bg-white dark:bg-gray-800/80 rounded-xl shadow-lg dark:shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-600/50 hover:shadow-xl dark:hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm cursor-pointer"
                  onClick={async () => navigate(`/blog/${post.id}`)}
                >
                  <div className="relative">
                    <LazyImage
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          post.category === 'Python'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : post.category === 'Web Development'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : post.category === 'Machine Learning'
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                : post.category === 'React'
                                  ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200'
                                  : post.category === 'Database'
                                    ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                        }`}
                      >
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3 text-sm text-navy-500 dark:text-cloud-400">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                      <span>•</span>
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <Eye className="w-4 h-4" />
                      <span>{post.views}</span>
                    </div>

                    <h3 className="text-xl font-bold text-navy-900 dark:text-cloud-100 mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-navy-600 dark:text-cloud-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <LazyImage
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm font-medium text-navy-600 dark:text-cloud-300">
                          {post.author.name}
                        </span>
                      </div>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          navigate(`/blog/${post.id}`);
                        }}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium text-sm transition-colors duration-200"
                        aria-label={`Read more about ${post.title}`}
                      >
                        Read More →
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-navy-400 dark:text-cloud-400 mb-4">
                <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
              </div>
              <h3 className="text-xl font-semibold text-navy-900 dark:text-cloud-100 mb-2">
                No articles found
              </h3>
              <p className="text-navy-600 dark:text-cloud-300">
                Try adjusting your search terms or filters.
              </p>
            </div>
          )}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex justify-center items-center space-x-2"
          >
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-navy-600 dark:text-cloud-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>

            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    currentPage === page
                      ? 'bg-red-600 text-white'
                      : 'text-navy-600 dark:text-cloud-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentPage(prev => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-navy-600 dark:text-cloud-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
