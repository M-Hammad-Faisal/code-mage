import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Youtube, Github, Linkedin, Heart, Mail, ArrowRight, Code, BookOpen, Users, Star } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Youtube, href: "https://youtube.com/@codemage", label: "YouTube", color: "hover:bg-red-600" },
    { icon: Github, href: "https://github.com/codemage", label: "GitHub", color: "hover:bg-gray-700" },
    { icon: Linkedin, href: "https://linkedin.com/in/codemage", label: "LinkedIn", color: "hover:bg-blue-600" }
  ];

  const quickLinks = [
    { name: "Courses", href: "/learn", icon: BookOpen },
    { name: "Blog", href: "/blog", icon: Code },
    { name: "About", href: "/about", icon: Users },
    { name: "Contact", href: "/contact", icon: Mail }
  ];

  const stats = [
    { label: "Students", value: "10K+" },
    { label: "Courses", value: "50+" },
    { label: "Projects", value: "100+" },
    { label: "Rating", value: "4.9", icon: Star }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-cloud-50 via-cloud-100 to-cloud-200 dark:from-navy-900 dark:via-navy-800 dark:to-black text-navy-900 dark:text-cloud-100 overflow-hidden">
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
                src="/brand/Code Mage Logo.png" 
                alt="Code Mage Logo"
                className="w-12 h-12 shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <span className="text-3xl font-heading font-bold text-navy-900 dark:text-white">Code Mage</span>
            </div>
            
            <p className="text-navy-600 dark:text-cloud-300 mb-8 text-lg leading-relaxed">
              Empowering developers with practical Python tutorials, courses, and real-world projects. 
              Join our community and master the art of coding.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-white/80 dark:bg-navy-800/50 backdrop-blur-sm rounded-xl border border-cloud-300/50 dark:border-navy-700/50"
                >
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-2xl font-bold text-navy-900 dark:text-white">{stat.value}</span>
                    {stat.icon && <stat.icon className="w-4 h-4 text-yellow-500 dark:text-yellow-400 ml-1" />}
                  </div>
                  <p className="text-navy-600 dark:text-cloud-400 text-sm">{stat.label}</p>
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
                  className={`group p-3 bg-white/80 dark:bg-navy-800/80 backdrop-blur-sm rounded-xl border border-cloud-300/50 dark:border-navy-700/50 ${social.color} transition-all duration-300 shadow-lg hover:shadow-xl`}
                >
                  <social.icon className="w-6 h-6 text-black dark:text-cloud-300 group-hover:text-white dark:group-hover:text-white transition-colors duration-300" />
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
            <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-6 flex items-center">
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
                    className="group flex items-center space-x-3 text-navy-600 dark:text-cloud-300 hover:text-navy-900 dark:hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-cloud-200/50 dark:hover:bg-navy-800/50"
                  >
                    <link.icon className="w-4 h-4 text-red-500 dark:text-red-500 group-hover:text-red-500 dark:group-hover:text-red-500 group-hover:scale-110 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
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
            <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-6 flex items-center">
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
                className="group flex items-center space-x-3 p-4 bg-gradient-to-r from-red-100/50 dark:from-red-600/20 to-red-200/50 dark:to-red-700/20 backdrop-blur-sm rounded-xl border border-red-300/50 dark:border-red-500/30 hover:border-red-400/70 dark:hover:border-red-500/50 transition-all duration-300"
              >
                <Heart className="w-5 h-5 text-red-500 dark:text-red-500 group-hover:text-red-500 dark:group-hover:text-red-500 group-hover:scale-110 transition-all duration-300" />
                <div>
                  <span className="text-navy-900 dark:text-white font-medium block">Support on Patreon</span>
                  <span className="text-navy-600 dark:text-cloud-400 text-sm">Help us create more content</span>
                </div>
                <ArrowRight className="w-4 h-4 text-red-500 ml-auto group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group p-4 bg-blue-50/50 dark:bg-navy-800/50 backdrop-blur-sm rounded-xl border border-blue-200/50 dark:border-navy-700/50 hover:border-blue-300/70 dark:hover:border-navy-600/50 transition-all duration-300"
              >
                <Link to="/contact" className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-navy-900 dark:text-white font-medium block">Get in Touch</span>
                    <span className="text-navy-600 dark:text-cloud-400 text-sm">Questions? We're here to help</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-400 ml-auto group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>

            {/* Newsletter Signup */}
            <div className="p-6 bg-gradient-to-r from-cloud-100/80 dark:from-navy-800/80 to-cloud-200/80 dark:to-navy-700/80 backdrop-blur-sm rounded-xl border border-cloud-300/50 dark:border-navy-600/50 relative">
              {/* Background decoration */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-full blur-xl"></div>
              
              <h4 className="text-lg font-semibold text-navy-900 dark:text-white mb-3 relative">
                <span className="bg-gradient-to-r from-red-500 dark:from-red-400 to-purple-500 dark:to-purple-400 bg-clip-text text-transparent">
                  Stay Updated
                </span>
              </h4>
              <p className="text-navy-600 dark:text-cloud-300 text-sm mb-4 relative">Get the latest tutorials and coding tips delivered to your inbox.</p>
              
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
                    className="w-full px-4 py-2 bg-white/70 dark:bg-navy-900/50 border border-cloud-300/50 dark:border-navy-600/50 rounded-lg text-navy-900 dark:text-white placeholder-navy-500 dark:placeholder-cloud-400 focus:outline-none focus:border-red-500/50 transition-all duration-300 group-hover:bg-white/90 dark:group-hover:bg-navy-900/70"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
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

        {/* Bottom Section */}
        <motion.div 
          className="border-t border-cloud-300/50 dark:border-navy-700/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-navy-600 dark:text-cloud-400 text-sm flex items-center">
            © {currentYear} Code Mage. All rights reserved.
          </p>
          <p className="text-navy-600 dark:text-cloud-400 text-sm mt-2 md:mt-0 flex items-center">
            Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> for the Python community
          </p>
        </motion.div>
      </div>
    </footer>
  );
};