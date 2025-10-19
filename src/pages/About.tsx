import React from 'react';
import { motion } from 'framer-motion';
import { Code, Heart, Users, Target, Palette, Smartphone } from 'lucide-react';

export const About: React.FC = () => {
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
            About Code Mage
          </h1>
          <p className="text-xl text-navy-600 dark:text-cloud-300 max-w-3xl mx-auto">
            Empowering developers with high-quality Python tutorials, code examples, and programming insights.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-navy-900 dark:text-cloud-100 mb-6">
            Our Mission
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-navy-700 dark:text-cloud-300 mb-6">
                At Code Mage, we believe that programming should be accessible, enjoyable, and transformative. 
                Our mission is to create the most comprehensive and beginner-friendly Python learning platform 
                that helps developers at all levels master the art of coding.
              </p>
              <p className="text-lg text-navy-700 dark:text-cloud-300">
                Whether you're just starting your programming journey or looking to advance your skills, 
                we provide clear explanations, practical examples, and real-world projects that make 
                learning Python both effective and fun.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="bg-red-600 p-8 rounded-full">
                <Code className="w-24 h-24 text-white" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* What We Offer Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-navy-900 dark:text-cloud-100 text-center mb-12">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800/80 rounded-xl shadow-lg dark:shadow-2xl p-6 border border-gray-200 dark:border-gray-600/50 text-center backdrop-blur-sm">
              <div className="bg-red-600 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Code className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 dark:text-cloud-100 mb-4">Full-Stack Development</h3>
              <p className="text-navy-600 dark:text-cloud-300">Building complete web applications from frontend to backend with modern technologies.</p>
            </div>

            <div className="bg-white dark:bg-gray-800/80 rounded-xl shadow-lg dark:shadow-2xl p-6 border border-gray-200 dark:border-gray-600/50 text-center backdrop-blur-sm">
              <div className="bg-blue-600 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Palette className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 dark:text-cloud-100 mb-4">UI/UX Design</h3>
              <p className="text-navy-600 dark:text-cloud-300">Creating beautiful and intuitive user interfaces with attention to user experience.</p>
            </div>

            <div className="bg-white dark:bg-gray-800/80 rounded-xl shadow-lg dark:shadow-2xl p-6 border border-gray-200 dark:border-gray-600/50 text-center backdrop-blur-sm">
              <div className="bg-green-600 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Smartphone className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 dark:text-cloud-100 mb-4">Mobile Development</h3>
              <p className="text-navy-600 dark:text-cloud-300">Developing responsive mobile applications for iOS and Android platforms.</p>
            </div>
          </div>
        </motion.div>

        {/* Our Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-navy-900 dark:text-cloud-100 text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800/80 rounded-xl shadow-lg dark:shadow-2xl p-6 border border-gray-200 dark:border-gray-600/50 text-center backdrop-blur-sm">
              <div className="bg-green-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-navy-900 dark:text-cloud-100 mb-3">
                Quality First
              </h3>
              <p className="text-navy-600 dark:text-cloud-300">
                Every tutorial, code example, and resource is carefully crafted and tested 
                to ensure accuracy, clarity, and practical value.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800/80 rounded-xl shadow-lg dark:shadow-2xl p-6 border border-gray-200 dark:border-gray-600/50 text-center backdrop-blur-sm">
              <div className="bg-blue-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-navy-900 dark:text-cloud-100 mb-3">
                Community Driven
              </h3>
              <p className="text-navy-600 dark:text-cloud-300">
                We listen to our community and continuously improve our content based 
                on feedback, questions, and suggestions from fellow developers.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800/80 rounded-xl shadow-lg dark:shadow-2xl p-6 border border-gray-200 dark:border-gray-600/50 text-center backdrop-blur-sm">
              <div className="bg-orange-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-navy-900 dark:text-cloud-100 mb-3">
                Passion for Teaching
              </h3>
              <p className="text-navy-600 dark:text-cloud-300">
                We're passionate about sharing knowledge and helping others succeed 
                in their programming journey, one line of code at a time.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-navy-900 dark:text-cloud-100 mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-navy-700 dark:text-cloud-300 max-w-2xl mx-auto mb-8">
            Ready to level up your programming skills? Join thousands of developers who are 
            already learning with Code Mage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Start Learning
            </button>
            <button className="btn-secondary">
              Watch Videos
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};