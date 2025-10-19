import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hero } from '../components';
import {
  BookOpen,
  FileText,
  Code,
  Database,
  Globe,
  Smartphone,
  ArrowRight,
  Clock,
  Users,
  Star,
} from 'lucide-react';

export const Home: React.FC = () => {
  const highlights = [
    {
      id: 1,
      title: 'Python Fundamentals',
      description:
        'Master the basics of Python programming with hands-on examples and exercises.',
      image: '/api/placeholder/400/250',
      category: 'Course',
      duration: '8 hours',
      students: '2.5k',
      rating: 4.8,
      link: '/learn',
    },
    {
      id: 2,
      title: 'Data Structures Deep Dive',
      description:
        'Comprehensive guide to data structures and algorithms in Python.',
      image: '/api/placeholder/400/250',
      category: 'Tutorial',
      duration: '12 hours',
      students: '1.8k',
      rating: 4.9,
      link: '/learn',
    },
    {
      id: 3,
      title: 'Web Development with Flask',
      description:
        'Build modern web applications using Flask framework and best practices.',
      image: '/api/placeholder/400/250',
      category: 'Project',
      duration: '15 hours',
      students: '3.2k',
      rating: 4.7,
      link: '/learn',
    },
  ];

  const quickLinks = [
    { name: 'Python Basics', icon: Code, link: '/learn?category=python' },
    { name: 'Web Development', icon: Globe, link: '/learn?category=web' },
    { name: 'Data Science', icon: Database, link: '/learn?category=data' },
    { name: 'Mobile Apps', icon: Smartphone, link: '/learn?category=mobile' },
    { name: 'Algorithms', icon: BookOpen, link: '/learn?category=algorithms' },
    { name: 'Projects', icon: FileText, link: '/learn?category=projects' },
  ];

  return (
    <div>
      <Hero />

      {/* Quick Links Section */}
      <section className="py-20 bg-gradient-to-br from-navy-50 to-cloud-100 dark:from-navy-950 dark:to-gray-900 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.2),transparent_50%)]"></div>
        </div>

        <div className="container-max px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <span className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-semibold rounded-full mb-4">
                🚀 Start Your Journey
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              Explore by{' '}
              <span className="bg-gradient-to-r from-gray-600 to-gray-800 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent">
                Category
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Jump into specific topics and start building your expertise with
              our structured learning paths
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: 'easeOut',
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -12,
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
                className="group relative"
              >
                {/* Hover glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-navy-600 to-red-600 dark:from-red-500 dark:to-red-700 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg"></div>

                <Link
                  to={link.link}
                  className="relative block p-8 bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 dark:border-gray-700/50 text-center group-hover:bg-white dark:group-hover:bg-gray-800 group-hover:border-navy-200/50 dark:group-hover:border-gray-600/50"
                >
                  {/* Icon container */}
                  <motion.div
                    className="flex justify-center mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <div className="relative">
                      {/* Icon background glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>

                      <div className="relative p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 rounded-2xl group-hover:from-red-600 group-hover:to-red-700 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                        <link.icon className="w-10 h-10 text-red-600 dark:text-red-400 group-hover:text-white transition-colors duration-500" />
                      </div>
                    </div>
                  </motion.div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                    {link.name}
                  </h3>

                  {/* Hover arrow indicator */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-1/2 right-6 transform -translate-y-1/2"
                  >
                    <ArrowRight className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </motion.div>

                  {/* Decorative corner accent */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-gradient-to-br from-cloud-50 to-white dark:from-gray-900 dark:to-navy-950 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 dark:bg-red-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container-max px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <span className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-semibold rounded-full mb-4">
                ✨ Featured Content
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              Handpicked for{' '}
              <span className="bg-gradient-to-r from-red-600 to-red-700 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent">
                Excellence
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Carefully curated courses and tutorials designed to accelerate
              your learning journey and master Python development
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: 'easeOut',
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
                className="group relative"
              >
                {/* Card glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>

                <div className="relative bg-white dark:bg-gray-800/80 rounded-2xl shadow-lg dark:shadow-2xl hover:shadow-2xl dark:hover:shadow-3xl transition-all duration-500 border border-cloud-200/50 dark:border-gray-600/50 overflow-hidden backdrop-blur-sm">
                  <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={highlight.image}
                      alt={highlight.title}
                      className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Category badge */}
                    <motion.div
                      className="absolute top-4 left-4"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <span className="px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm">
                        {highlight.category}
                      </span>
                    </motion.div>

                    {/* Rating badge */}
                    <motion.div
                      className="absolute top-4 right-4 flex items-center space-x-1 bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-white text-xs font-semibold">
                        {highlight.rating}
                      </span>
                    </motion.div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300 line-clamp-2">
                      {highlight.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-5 line-clamp-2 leading-relaxed">
                      {highlight.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1.5">
                          <Clock className="w-4 h-4 text-red-500 dark:text-red-400" />
                          <span className="font-medium">
                            {highlight.duration}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <Users className="w-4 h-4 text-red-500 dark:text-red-400" />
                          <span className="font-medium">
                            {highlight.students}
                          </span>
                        </div>
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={highlight.link}
                        className="group/btn inline-flex items-center w-full justify-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 dark:from-red-500 dark:to-red-600 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-800 dark:hover:from-red-600 dark:hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Start Learning
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Link
                to="/learn"
                className="group inline-flex items-center px-10 py-4 bg-gradient-to-r from-red-600 to-red-700 dark:from-red-500 dark:to-red-600 text-white font-bold rounded-xl hover:from-red-700 hover:to-red-800 dark:hover:from-red-600 dark:hover:to-red-700 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <BookOpen className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                Explore All Courses
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
