import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Youtube,
  Github,
  Linkedin,
  Heart,
  Mail,
  ArrowRight,
  Code,
  BookOpen,
  Users,
  Star,
} from 'lucide-react';
import { ASSETS } from '../utils/assets';

export const Footer: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const currentYear = new Date().getFullYear();

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
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    {
      icon: Youtube,
      href: 'https://youtube.com/@codemage',
      label: 'YouTube',
      color: 'hover:bg-red-600',
    },
    {
      icon: Github,
      href: 'https://github.com/codemage',
      label: 'GitHub',
      color: 'hover:bg-gray-700',
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/codemage',
      label: 'LinkedIn',
      color: 'hover:bg-blue-600',
    },
  ];

  const quickLinks = [
    { name: 'Courses', href: '/learn', icon: BookOpen },
    { name: 'Blog', href: '/blog', icon: Code },
    { name: 'About', href: '/about', icon: Users },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: isDarkMode
          ? 'linear-gradient(to bottom right, #1f2937, #111827, #000000)'
          : 'linear-gradient(to bottom right, #fafafa, #f4f4f5, #e4e4e7)',
        color: isDarkMode ? '#f4f4f5' : '#312e81',
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 dark:opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-300 dark:bg-red-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-300 dark:bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative container-max px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <motion.img
                src={ASSETS.LOGO}
                alt="Code Mage Logo"
                className="w-12 h-12 rounded-lg shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
              <span
                className="text-3xl font-heading font-bold"
                style={{ color: isDarkMode ? '#ffffff' : '#312e81' }}
              >
                Code Mage
              </span>
            </div>

            <p
              className="mb-8 text-lg leading-relaxed"
              style={{ color: isDarkMode ? '#d1d5db' : '#4b5563' }}
            >
              Empowering developers with practical Python tutorials, courses,
              and real-world projects. Join our community and master the art of
              coding.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                {
                  icon: Code,
                  label: 'Projects',
                  value: '10K+',
                  color: 'from-blue-500 to-cyan-500',
                },
                {
                  icon: BookOpen,
                  label: 'Courses',
                  value: '50+',
                  color: 'from-green-500 to-emerald-500',
                },
                {
                  icon: Users,
                  label: 'Students',
                  value: '100+',
                  color: 'from-purple-500 to-pink-500',
                },
                {
                  icon: Star,
                  label: 'Rating',
                  value: '4.9',
                  color: 'from-yellow-500 to-orange-500',
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="backdrop-blur-sm rounded-2xl p-4 text-center group transition-all duration-300"
                  style={{
                    backgroundColor: isDarkMode
                      ? 'rgba(17, 24, 39, 0.5)'
                      : 'rgba(255, 255, 255, 0.1)',
                    border: `1px solid ${isDarkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(226, 232, 240, 0.3)'}`,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: isDarkMode
                      ? 'rgba(17, 24, 39, 0.8)'
                      : 'rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <div
                    className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div
                    className="text-2xl font-bold mb-1"
                    style={{ color: isDarkMode ? '#ffffff' : '#312e81' }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: isDarkMode ? '#d1d5db' : '#4b5563' }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group p-3 backdrop-blur-sm rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  style={{
                    backgroundColor: isDarkMode
                      ? 'rgba(17, 24, 39, 0.8)'
                      : 'rgba(255, 255, 255, 0.8)',
                    border: `1px solid ${isDarkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(209, 213, 219, 0.5)'}`,
                  }}
                >
                  <social.icon
                    className="w-6 h-6 group-hover:text-white transition-colors duration-300"
                    style={{
                      color: isDarkMode ? '#d1d5db' : '#000000',
                    }}
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3
              className="text-xl font-bold mb-6 flex items-center"
              style={{ color: isDarkMode ? '#ffffff' : '#312e81' }}
            >
              <ArrowRight className="w-5 h-5 mr-2 text-red-500" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={link.href}
                    className="group flex items-center space-x-3 transition-all duration-300 p-2 rounded-lg"
                    style={{
                      color: isDarkMode ? '#d1d5db' : '#4b5563',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = isDarkMode
                        ? '#ffffff'
                        : '#312e81';
                      e.currentTarget.style.backgroundColor = isDarkMode
                        ? 'rgba(17, 24, 39, 0.5)'
                        : 'rgba(209, 213, 219, 0.5)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = isDarkMode
                        ? '#d1d5db'
                        : '#4b5563';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <link.icon className="w-4 h-4 text-red-500 group-hover:scale-110 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.name}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support & Newsletter */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3
              className="text-xl font-bold mb-6 flex items-center"
              style={{ color: isDarkMode ? '#ffffff' : '#312e81' }}
            >
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              Support & Connect
            </h3>

            {/* Support Links */}
            <div className="space-y-3 mb-8">
              <motion.a
                href="https://patreon.com/codemage"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center space-x-3 p-4 backdrop-blur-sm rounded-xl transition-all duration-300"
                style={{
                  background: isDarkMode
                    ? 'linear-gradient(to right, rgba(220, 38, 38, 0.2), rgba(185, 28, 28, 0.2))'
                    : 'linear-gradient(to right, rgba(254, 226, 226, 0.5), rgba(254, 202, 202, 0.5))',
                  border: `1px solid ${isDarkMode ? 'rgba(239, 68, 68, 0.3)' : 'rgba(252, 165, 165, 0.5)'}`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = isDarkMode
                    ? 'rgba(239, 68, 68, 0.5)'
                    : 'rgba(248, 113, 113, 0.7)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = isDarkMode
                    ? 'rgba(239, 68, 68, 0.3)'
                    : 'rgba(252, 165, 165, 0.5)';
                }}
              >
                <Heart className="w-5 h-5 text-red-500 group-hover:scale-110 transition-all duration-300" />
                <div>
                  <span
                    className="font-medium block"
                    style={{ color: isDarkMode ? '#ffffff' : '#312e81' }}
                  >
                    Support on Patreon
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}
                  >
                    Help us create more content
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-red-500 ml-auto group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group p-4 backdrop-blur-sm rounded-xl transition-all duration-300"
                style={{
                  backgroundColor: isDarkMode
                    ? 'rgba(17, 24, 39, 0.5)'
                    : 'rgba(239, 246, 255, 0.5)',
                  border: `1px solid ${isDarkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(191, 219, 254, 0.5)'}`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = isDarkMode
                    ? 'rgba(75, 85, 99, 0.5)'
                    : 'rgba(147, 197, 253, 0.7)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = isDarkMode
                    ? 'rgba(75, 85, 99, 0.5)'
                    : 'rgba(191, 219, 254, 0.5)';
                }}
              >
                <Link to="/contact" className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                  <div>
                    <span
                      className="font-medium block"
                      style={{ color: isDarkMode ? '#ffffff' : '#312e81' }}
                    >
                      Get in Touch
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}
                    >
                      Questions? We're here to help
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-400 ml-auto group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>

            {/* Newsletter Signup */}
            <div className="p-6 bg-gradient-to-r from-cloud-100/80 dark:from-navy-800/80 to-cloud-200/80 dark:to-navy-700/80 backdrop-blur-sm rounded-xl border border-cloud-300/50 dark:border-navy-600/50 relative">
              {/* Background decoration */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-full blur-xl"></div>

              <h4
                className="text-lg font-semibold mb-3 relative"
                style={{ color: isDarkMode ? '#ffffff' : '#312e81' }}
              >
                <span className="bg-gradient-to-r from-red-500 dark:from-red-400 to-purple-500 dark:to-purple-400 bg-clip-text text-transparent">
                  Stay Updated
                </span>
              </h4>
              <p
                className="text-sm mb-4 relative"
                style={{ color: isDarkMode ? '#d1d5db' : '#4b5563' }}
              >
                Get the latest tutorials and coding tips delivered to your
                inbox.
              </p>

              <motion.div
                className="flex space-x-2 relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="flex-1 relative group">
                  <motion.input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 rounded-lg focus:outline-none focus:border-red-500/50 transition-all duration-300"
                    style={{
                      backgroundColor: isDarkMode
                        ? 'rgba(17, 24, 39, 0.5)'
                        : 'rgba(255, 255, 255, 0.7)',
                      border: `1px solid ${isDarkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(209, 213, 219, 0.5)'}`,
                      color: isDarkMode ? '#ffffff' : '#312e81',
                    }}
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <span className="relative z-10 flex items-center">
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-4 flex items-center gap-4 text-xs text-navy-600 dark:text-cloud-400 relative"
              >
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-green-400" />
                  <span>No spam</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-blue-400" />
                  <span>10k+ subscribers</span>
                </div>
                <div className="flex items-center gap-1">
                  <Code className="w-3 h-3 text-yellow-400" />
                  <span>Weekly updates</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <div
          className="pt-8"
          style={{
            borderTop: `1px solid ${isDarkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(226, 232, 240, 0.5)'}`,
            marginTop: '3rem',
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p
              className="text-sm"
              style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}
            >
              © {currentYear} Code Mage. All rights reserved.
            </p>
            <p
              className="text-sm flex items-center"
              style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}
            >
              Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> for the
              Python community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
