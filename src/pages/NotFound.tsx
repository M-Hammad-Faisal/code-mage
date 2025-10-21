import { motion } from 'framer-motion';
import { ArrowLeft, Home, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <SEO
        title="404 - Page Not Found | Code Mage"
        description="The page you're looking for doesn't exist. Return to Code Mage to continue learning programming and web development."
        url="https://code-mage.vercel.app/404"
      />
      <div className="text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Number */}
          <motion.h1
            className="text-8xl md:text-9xl font-bold text-blue-600 dark:text-blue-400 mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, stiffness: 100, type: 'spring' }}
          >
            404
          </motion.h1>

          {/* Error Message */}
          <motion.h2
            className="text-3xl md:text-4xl font-heading font-bold text-navy-800 dark:text-white mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Page Not Found
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Oops! The page you're looking for doesn't exist. It might have been
            moved, deleted, or you entered the wrong URL.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {/* Back to Home Button */}
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>

            {/* Watch on YouTube Button */}
            <a
              href="https://youtube.com/@code_your_magic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Youtube className="w-5 h-5 mr-2" />
              Watch on YouTube
            </a>
          </motion.div>

          {/* Go Back Link */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go back to previous page
            </button>
          </motion.div>

          {/* Decorative Element */}
          <motion.div
            className="mt-12 opacity-20"
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 0.2, rotate: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <div className="text-6xl">🔍</div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
