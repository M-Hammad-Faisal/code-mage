import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Code, 
  Zap, 
  CheckCircle, 
  Clock, 
  Users, 
  FileText, 
  Target, 
  Play,
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  BarChart3
} from 'lucide-react';
import { YouTubeSection } from '../components/YouTubeSection';

// Expanded lesson data with more comprehensive information
const lessons = [
  {
    id: 1,
    title: "Python Fundamentals",
    description: "Learn the basics of Python programming including variables, data types, and control structures.",
    category: "Python Basics",
    level: "Beginner",
    duration: "2:30",
    students: 1234,
    rating: 4.8,
    instructor: "Sarah Chen",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    tags: ["Python", "Variables", "Data Types", "Control Flow"],
    icon: BookOpen
  },
  {
    id: 2,
    title: "Object-Oriented Programming",
    description: "Master classes, objects, inheritance, and polymorphism in Python.",
    category: "Python Basics",
    level: "Intermediate",
    duration: "3:15",
    students: 856,
    rating: 4.9,
    instructor: "Mike Johnson",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    tags: ["OOP", "Classes", "Inheritance", "Polymorphism"],
    icon: Code
  },
  {
    id: 3,
    title: "Web Development with Flask",
    description: "Build web applications using Python's Flask framework.",
    category: "Web Development",
    level: "Intermediate",
    duration: "4:00",
    students: 642,
    rating: 4.7,
    instructor: "Emily Davis",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    tags: ["Flask", "Web Development", "Backend", "API"],
    icon: Zap
  },
  {
    id: 4,
    title: "Data Analysis with Pandas",
    description: "Learn to manipulate and analyze data using the Pandas library.",
    category: "Data Science",
    level: "Intermediate",
    duration: "3:45",
    students: 789,
    rating: 4.6,
    instructor: "David Wilson",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    tags: ["Pandas", "Data Analysis", "CSV", "DataFrames"],
    icon: BarChart3
  },
  {
    id: 5,
    title: "Machine Learning Basics",
    description: "Introduction to machine learning concepts and scikit-learn.",
    category: "Data Science",
    level: "Advanced",
    duration: "5:20",
    students: 423,
    rating: 4.8,
    instructor: "Dr. Lisa Park",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    tags: ["Machine Learning", "Scikit-learn", "Algorithms", "AI"],
    icon: Target
  },
  {
    id: 6,
    title: "API Development",
    description: "Create RESTful APIs using Python and modern frameworks.",
    category: "Web Development",
    level: "Advanced",
    duration: "4:30",
    students: 567,
    rating: 4.7,
    instructor: "Alex Rodriguez",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    tags: ["API", "REST", "FastAPI", "Backend"],
    icon: Play
  },
  {
    id: 7,
    title: "Python Testing & Debugging",
    description: "Learn testing frameworks and debugging techniques for Python applications.",
    category: "Python Basics",
    level: "Intermediate",
    duration: "2:45",
    students: 345,
    rating: 4.5,
    instructor: "Rachel Green",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    tags: ["Testing", "Debugging", "PyTest", "Unit Tests"],
    icon: CheckCircle
  },
  {
    id: 8,
    title: "Database Integration",
    description: "Connect Python applications with databases using SQLAlchemy and more.",
    category: "Web Development",
    level: "Intermediate",
    duration: "3:30",
    students: 678,
    rating: 4.6,
    instructor: "Tom Anderson",
    thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    tags: ["Database", "SQLAlchemy", "SQL", "ORM"],
    icon: FileText
  },
  {
    id: 9,
    title: "Async Programming in Python",
    description: "Master asynchronous programming with asyncio and async/await.",
    category: "Advanced Python",
    level: "Advanced",
    duration: "4:15",
    students: 234,
    rating: 4.9,
    instructor: "Kevin Liu",
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    tags: ["Async", "Asyncio", "Concurrency", "Performance"],
    icon: Zap
  }
];

const categories = ["All", "Python Basics", "Web Development", "Data Science", "Advanced Python"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];
const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Highest Rated" },
  { value: "duration", label: "Duration" }
];

export const Learn: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  
  const lessonsPerPage = 6;

  // Filter and sort lessons
  const filteredAndSortedLessons = useMemo(() => {
    const filtered = lessons.filter(lesson => {
      const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lesson.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || lesson.category === selectedCategory;
      const matchesLevel = selectedLevel === 'All' || lesson.level === selectedLevel;
      
      return matchesSearch && matchesCategory && matchesLevel;
    });

    // Sort lessons
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.students - a.students;
        case 'newest':
          return b.id - a.id;
        case 'rating':
          return b.rating - a.rating;
        case 'duration':
          return a.duration.localeCompare(b.duration);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedLevel, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedLessons.length / lessonsPerPage);
  const startIndex = (currentPage - 1) * lessonsPerPage;
  const paginatedLessons = filteredAndSortedLessons.slice(startIndex, startIndex + lessonsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

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
            Learn Python
          </h1>
          <p className="text-xl text-gray-600 dark:text-white max-w-3xl mx-auto">
            Master Python programming with our comprehensive lessons, from beginner basics to advanced concepts.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-navy-400 dark:text-cloud-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search lessons, topics, or technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-navy-900 dark:text-cloud-100 placeholder-navy-400 dark:placeholder-cloud-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-navy-600 dark:text-cloud-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            <div className="flex items-center space-x-4">
              <span className="text-navy-600 dark:text-cloud-300">
                {filteredAndSortedLessons.length} lesson{filteredAndSortedLessons.length !== 1 ? 's' : ''} found
              </span>
              
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-navy-600 dark:text-cloud-300 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-navy-700 dark:text-cloud-200 mb-3">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedCategory === category
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-navy-600 dark:text-cloud-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Level Filter */}
                <div>
                  <label className="block text-sm font-medium text-navy-700 dark:text-cloud-200 mb-3">
                    Difficulty Level
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {levels.map(level => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedLevel === level
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-navy-600 dark:text-cloud-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Lessons Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          {paginatedLessons.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedLessons.map((lesson, index) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                  className="bg-white dark:bg-gray-800/80 rounded-xl shadow-lg dark:shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-600/50 hover:shadow-xl dark:hover:shadow-3xl transition-all duration-300 group backdrop-blur-sm"
                >
                  {/* Lesson Thumbnail */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={lesson.thumbnail}
                      alt={lesson.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(lesson.level)}`}>
                        {lesson.level}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{lesson.duration}</span>
                    </div>
                  </div>

                  {/* Lesson Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-red-600 dark:text-red-400 font-medium">
                        {lesson.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-navy-600 dark:text-cloud-300">
                          {lesson.rating}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-navy-900 dark:text-cloud-100 mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {lesson.title}
                    </h3>

                    <p className="text-navy-600 dark:text-cloud-300 mb-4 line-clamp-2">
                      {lesson.description}
                    </p>

                    {/* Lesson Stats */}
                    <div className="flex items-center justify-between text-sm text-navy-500 dark:text-cloud-400 mb-4">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{lesson.students.toLocaleString()}</span>
                      </div>
                      <span>by {lesson.instructor}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {lesson.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-navy-600 dark:text-cloud-300 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {lesson.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-navy-600 dark:text-cloud-300 text-xs rounded">
                          +{lesson.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Action Button */}
                    <Link
                      to={`/learn/${lesson.id}`}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>Start Lesson</span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-navy-300 dark:text-cloud-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-navy-600 dark:text-cloud-300 mb-2">
                No lessons found
              </h3>
              <p className="text-navy-500 dark:text-cloud-400">
                Try adjusting your search terms or filters
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
            className="flex justify-center items-center space-x-2 mb-12"
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-navy-600 dark:text-cloud-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-red-600 text-white'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-navy-600 dark:text-cloud-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-navy-600 dark:text-cloud-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* YouTube Videos Section */}
        <YouTubeSection />
      </div>
    </div>
  );
};