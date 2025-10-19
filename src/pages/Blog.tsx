import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  Eye,
  Search,
  Filter,
  Calendar,
  Tag,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Python Data Structures Deep Dive',
    excerpt:
      "Explore the inner workings of Python's built-in data structures and learn when to use each one for optimal performance.",
    image:
      'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Python',
    tags: ['Python', 'Data Structures', 'Performance'],
    date: 'Dec 10, 2023',
    readTime: '8 min',
    views: '1.2k',
    author: {
      name: 'Sarah Chen',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    },
  },
  {
    id: 2,
    title: 'Building REST APIs with FastAPI',
    excerpt:
      'Learn how to create fast, modern APIs using FastAPI and Python type hints for better development experience.',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Web Development',
    tags: ['FastAPI', 'Python', 'REST API', 'Backend'],
    date: 'Dec 8, 2023',
    readTime: '12 min',
    views: '2.1k',
    author: {
      name: 'Mike Rodriguez',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    },
  },
  {
    id: 3,
    title: 'Machine Learning with Scikit-learn',
    excerpt:
      "Get started with machine learning using Python's most popular ML library and build your first predictive models.",
    image:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Machine Learning',
    tags: ['Machine Learning', 'Scikit-learn', 'Python', 'AI'],
    date: 'Dec 5, 2023',
    readTime: '15 min',
    views: '3.5k',
    author: {
      name: 'Dr. Emily Watson',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    },
  },
  {
    id: 4,
    title: 'React Hooks Mastery Guide',
    excerpt:
      'Master React Hooks with practical examples and learn how to build custom hooks for reusable logic.',
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'React',
    tags: ['React', 'Hooks', 'JavaScript', 'Frontend'],
    date: 'Dec 3, 2023',
    readTime: '10 min',
    views: '2.8k',
    author: {
      name: 'Alex Thompson',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    },
  },
  {
    id: 5,
    title: 'Database Design Best Practices',
    excerpt:
      'Learn essential database design principles and normalization techniques for scalable applications.',
    image:
      'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Database',
    tags: ['Database', 'SQL', 'Design', 'Backend'],
    date: 'Nov 30, 2023',
    readTime: '14 min',
    views: '1.9k',
    author: {
      name: 'David Kim',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    },
  },
  {
    id: 6,
    title: 'TypeScript for JavaScript Developers',
    excerpt:
      'Transition from JavaScript to TypeScript with confidence and improve your code quality and developer experience.',
    image:
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'TypeScript',
    tags: ['TypeScript', 'JavaScript', 'Types', 'Development'],
    date: 'Nov 28, 2023',
    readTime: '11 min',
    views: '4.2k',
    author: {
      name: 'Lisa Park',
      avatar:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    },
  },
];

export const Blog: React.FC = () => {
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
          transition={{ duration: 0.8, delay: 0.2 }}
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
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          {paginatedPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                  className="bg-white dark:bg-gray-800/80 rounded-xl shadow-lg dark:shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-600/50 hover:shadow-xl dark:hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
                >
                  <div className="relative">
                    <img
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
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm font-medium text-navy-600 dark:text-cloud-300">
                          {post.author.name}
                        </span>
                      </div>
                      <button className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium text-sm transition-colors duration-200">
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
            transition={{ duration: 0.8, delay: 0.6 }}
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
