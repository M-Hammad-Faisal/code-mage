import React from 'react';
import { motion } from 'framer-motion';
import { Github, Clock, Youtube, Linkedin, Heart } from 'lucide-react';
import { SITE } from '../site.config';

export const Contact: React.FC = () => {

  return (
    <div className="min-h-screen bg-cloud-100 dark:bg-navy-900 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-navy-900 dark:text-cloud-100 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-navy-600 dark:text-cloud-300 max-w-3xl mx-auto">
            Have questions, suggestions, or just want to say hello? We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white dark:bg-gray-800/80 rounded-xl shadow-lg dark:shadow-2xl p-6 border border-gray-200 dark:border-gray-600/50 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold text-navy-900 dark:text-cloud-100 mb-6">
              Send us a Message
            </h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-navy-700 dark:text-cloud-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-navy-900 dark:text-cloud-100 placeholder-navy-400 dark:placeholder-cloud-400"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-navy-700 dark:text-cloud-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-navy-900 dark:text-cloud-100 placeholder-navy-400 dark:placeholder-cloud-400"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-navy-700 dark:text-cloud-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-navy-900 dark:text-cloud-100 placeholder-navy-400 dark:placeholder-cloud-400"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-navy-700 dark:text-cloud-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-navy-900 dark:text-cloud-100 placeholder-navy-400 dark:placeholder-cloud-400"
                  placeholder="Tell us what's on your mind..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-gray-800/80 rounded-xl shadow-lg dark:shadow-2xl p-6 border border-gray-200 dark:border-gray-600/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-navy-900 dark:text-cloud-100 mb-6">
                Connect With Us
              </h2>
              <div className="space-y-4">
                <a
                  href={SITE.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  <Youtube className="w-5 h-5 mr-2" />
                  Watch on YouTube
                </a>
                <a
                  href={SITE.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-gray-800 hover:bg-gray-900 dark:bg-black dark:hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  <Github className="w-5 h-5 mr-2" />
                  Star my GitHub
                </a>
                <a
                  href={SITE.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  Connect on LinkedIn
                </a>
                <a
                  href={SITE.socials.patreon}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Support on Patreon
                </a>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800/80 rounded-xl shadow-lg dark:shadow-2xl p-6 border border-gray-200 dark:border-gray-600/50 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-navy-900 dark:text-cloud-100 mb-4">
                Response Time
              </h3>
              <p className="text-navy-600 dark:text-cloud-300 mb-4">
                We typically respond to messages within 24-48 hours. For urgent matters, 
                please reach out via our Discord community for faster assistance.
              </p>
              <div className="flex items-center space-x-2 text-green-600">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-medium">Usually responds within a day</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section - Moved to bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white dark:bg-gray-800/80 rounded-xl shadow-lg dark:shadow-2xl p-6 border border-gray-200 dark:border-gray-600/50 backdrop-blur-sm"
        >
          <h3 className="text-2xl font-bold text-navy-900 dark:text-cloud-100 mb-6 text-center">
            Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <details className="group">
              <summary className="cursor-pointer text-navy-700 dark:text-cloud-300 hover:text-red-600 transition-colors font-medium">
                How can I suggest a tutorial topic?
              </summary>
              <p className="mt-2 text-navy-600 dark:text-cloud-300 text-sm">
                We love hearing your ideas! Send us a message with your topic suggestion and we'll consider it for future content.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer text-navy-700 dark:text-cloud-300 hover:text-red-600 transition-colors font-medium">
                Do you offer one-on-one tutoring?
              </summary>
              <p className="mt-2 text-navy-600 dark:text-cloud-300 text-sm">
                Currently, we focus on creating comprehensive tutorials and guides. For personalized help, join our Discord community.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer text-navy-700 dark:text-cloud-300 hover:text-red-600 transition-colors font-medium">
                Can I contribute to Code Mage?
              </summary>
              <p className="mt-2 text-navy-600 dark:text-cloud-300 text-sm">
                Absolutely! We welcome contributions from the community. Reach out to discuss collaboration opportunities.
              </p>
            </details>
          </div>
        </motion.div>
      </div>
    </div>
  );
};