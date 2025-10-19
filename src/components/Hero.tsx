import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, BookOpen, ArrowRight } from 'lucide-react';
import { SITE } from '../site.config';

export const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check initial dark mode state
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Parallax Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url('/brand/Code Mage Banner.png')`,
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/40 via-navy-900/60 to-navy-900/80 dark:from-black/80 dark:via-gray-900/90 dark:to-black/95"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-2 h-2 bg-red-400 dark:bg-red-500 rounded-full opacity-60 dark:opacity-80"
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-1 h-1 bg-cloud-300 dark:bg-gray-400 rounded-full opacity-40 dark:opacity-60"
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-red-300 dark:bg-red-400 rounded-full opacity-50 dark:opacity-70"
          animate={{
            y: [0, -25, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Content */}
      <div 
        className="relative z-10 container-max px-4 sm:px-6 lg:px-8 text-center"
        style={{
          transform: `translateY(${scrollY * -0.1}px)`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Heading */}
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            Welcome to{' '}
            <motion.span 
              className="relative inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "backOut" }}
            >
              <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 dark:from-red-300 dark:via-red-400 dark:to-red-500 bg-clip-text text-transparent">
                Code Mage
              </span>
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-red-400/20 to-red-600/20 dark:from-red-300/30 dark:to-red-500/30 rounded-lg blur-xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.span>
          </motion.h1>

          {/* Tagline */}
          <motion.p 
            className="text-xl sm:text-2xl text-gray-900 dark:text-gray-200 mb-8 font-medium tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 dark:from-gray-200 dark:via-white dark:to-gray-200 bg-clip-text text-transparent bg-[length:200%_100%]"
            >
              Code Your Magic
            </motion.span>
          </motion.p>

          {/* Description */}
          <motion.p 
            className="text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          >
            Master Python through engaging short videos, challenging problems, and insightful book summaries. 
            Join thousands of developers on their coding journey.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
          >
            <motion.a
              href={SITE.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 dark:from-red-500 dark:to-red-600 text-white font-semibold rounded-xl overflow-hidden shadow-2xl"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(239, 68, 68, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 dark:from-red-400 dark:to-red-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
              <Play className="w-5 h-5 mr-3 relative z-10 group-hover:scale-110 transition-transform" />
              <span className="relative z-10">Watch on YouTube</span>
              <ArrowRight className="w-5 h-5 ml-3 relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link
                to="/learn"
                className="group relative inline-flex items-center px-8 py-4 bg-white/10 dark:bg-gray-800/30 backdrop-blur-md text-gray-900 dark:text-white font-semibold rounded-xl border-2 border-white/30 dark:border-gray-600/50 hover:bg-white/20 dark:hover:bg-gray-700/40 hover:border-white/50 dark:hover:border-gray-500/70 transition-all duration-300 shadow-xl"
              >
                <BookOpen className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                Start Learning
                <motion.div
                  className="absolute inset-0 bg-white/5 dark:bg-gray-700/20 rounded-xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats or Features */}
          <motion.div 
            className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          >
            {[
              { number: "50+", label: "Video Lessons", delay: 0 },
              { number: "100+", label: "Code Examples", delay: 0.1 },
              { number: "24/7", label: "Learning Access", delay: 0.2 }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center group cursor-pointer"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.4 + stat.delay,
                  ease: "backOut"
                }}
                whileHover={{ 
                  scale: 1.1,
                  y: -5
                }}
              >
                <motion.div 
                  className="text-4xl font-bold bg-gradient-to-r from-red-400 to-red-600 dark:from-red-300 dark:to-red-500 bg-clip-text text-transparent mb-3"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: stat.delay,
                  }}
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div 
            className="mt-16 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div 
              className="backdrop-blur-sm rounded-lg p-6 shadow-lg dark:shadow-2xl"
              style={{
                background: isDarkMode 
                  ? 'linear-gradient(to bottom right, #1f2937, #111827, #000000)'
                  : 'linear-gradient(to bottom right, #fafafa, #f4f4f5, #e4e4e7)',
                border: isDarkMode 
                  ? '1px solid rgba(75, 85, 99, 0.3)'
                  : '1px solid rgba(229, 231, 235, 0.5)'
              }}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center">
                Join the Mage Guild
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 text-center">
                One helpful email per week.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border-0 focus:ring-2 focus:ring-red-400 dark:focus:ring-red-500 text-navy-900 dark:text-gray-100 dark:bg-gray-800 placeholder-navy-500 dark:placeholder-gray-400 dark:border dark:border-gray-600"
                />
                <button className="bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200">
                  Join
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div className="w-6 h-10 border-2 border-white/30 dark:border-gray-400/50 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-3 bg-white/60 dark:bg-gray-300/70 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};