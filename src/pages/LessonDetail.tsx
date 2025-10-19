import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Clock,
  User,
  Calendar,
  Tag,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Code,
  CheckCircle,
  Circle,
  Download,
  Share2,
} from 'lucide-react';

// Sample lesson data - in a real app, this would come from an API
const lessonData = {
  id: 1,
  title: 'Python Functions and Scope',
  description:
    'Learn how to create and use functions in Python, understand variable scope, and master function parameters and return values.',
  videoId: 'BVfCWuca9nw', // Sample YouTube video ID
  duration: '15:30',
  level: 'Beginner',
  category: 'Python',
  instructor: {
    name: 'Sarah Chen',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    title: 'Senior Python Developer',
  },
  publishedDate: 'Dec 10, 2023',
  tags: ['Python', 'Functions', 'Scope', 'Programming Basics'],
  content: {
    overview:
      "In this lesson, you'll learn the fundamentals of Python functions, including how to define them, pass parameters, return values, and understand variable scope. Functions are essential building blocks in Python programming.",
    learningObjectives: [
      "Understand what functions are and why they're important",
      'Learn how to define and call functions',
      'Master function parameters and arguments',
      'Understand return values and how to use them',
      'Learn about variable scope (local vs global)',
      'Practice with real-world examples',
    ],
    prerequisites: [
      'Basic Python syntax',
      'Variables and data types',
      'Control structures (if/else, loops)',
    ],
    codeExamples: [
      {
        title: 'Basic Function Definition',
        code: `def greet(name):
    """A simple function that greets a person"""
    return f"Hello, {name}!"

# Call the function
message = greet("Alice")
print(message)  # Output: Hello, Alice!`,
      },
      {
        title: 'Function with Multiple Parameters',
        code: `def calculate_area(length, width):
    """Calculate the area of a rectangle"""
    area = length * width
    return area

# Call with positional arguments
result = calculate_area(5, 3)
print(f"Area: {result}")  # Output: Area: 15

# Call with keyword arguments
result = calculate_area(width=4, length=6)
print(f"Area: {result}")  # Output: Area: 24`,
      },
      {
        title: 'Variable Scope Example',
        code: `# Global variable
global_var = "I'm global"

def scope_example():
    # Local variable
    local_var = "I'm local"
    print(f"Inside function: {global_var}")
    print(f"Inside function: {local_var}")

scope_example()
print(f"Outside function: {global_var}")
# print(local_var)  # This would cause an error!`,
      },
    ],
  },
  nextLesson: {
    id: 2,
    title: 'Python Classes and Objects',
    duration: '18:45',
  },
  prevLesson: {
    id: 0,
    title: 'Python Data Types and Variables',
    duration: '12:20',
  },
};

export const LessonDetail: React.FC = () => {
  const [completedObjectives, setCompletedObjectives] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'code' | 'resources'>(
    'overview'
  );

  const toggleObjective = (index: number) => {
    setCompletedObjectives(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-cloud-100 dark:bg-navy-900 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <nav className="flex items-center space-x-2 text-sm text-navy-600 dark:text-cloud-300">
            <Link
              to="/learn"
              className="hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              Learn
            </Link>
            <span>/</span>
            <span className="text-navy-900 dark:text-cloud-100 font-medium">
              {lessonData.title}
            </span>
          </nav>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800/80 rounded-xl shadow-lg dark:shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-600/50 mb-8 backdrop-blur-sm"
            >
              <div className="aspect-video bg-gray-900 relative">
                <iframe
                  src={`https://www.youtube.com/embed/${lessonData.videoId}`}
                  title={lessonData.title}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                  {lessonData.duration}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl md:text-3xl font-bold text-navy-900 dark:text-cloud-100">
                    {lessonData.title}
                  </h1>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-navy-600 dark:text-cloud-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-navy-600 dark:text-cloud-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <p className="text-navy-600 dark:text-cloud-300 mb-6">
                  {lessonData.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-navy-500 dark:text-cloud-400">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{lessonData.instructor.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{lessonData.publishedDate}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{lessonData.duration}</span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      lessonData.level === 'Beginner'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : lessonData.level === 'Intermediate'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    {lessonData.level}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {lessonData.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Content Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800/80 rounded-xl shadow-lg dark:shadow-2xl border border-gray-200 dark:border-gray-600/50 backdrop-blur-sm"
            >
              {/* Tab Navigation */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview', icon: BookOpen },
                    { id: 'code', label: 'Code Examples', icon: Code },
                    { id: 'resources', label: 'Resources', icon: Download },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() =>
                        setActiveTab(
                          tab.id as 'overview' | 'code' | 'resources'
                        )
                      }
                      className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-red-600 text-red-600 dark:text-red-400'
                          : 'border-transparent text-navy-500 dark:text-cloud-400 hover:text-navy-700 dark:hover:text-cloud-200'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-navy-900 dark:text-cloud-100 mb-3">
                        What You'll Learn
                      </h3>
                      <p className="text-navy-600 dark:text-cloud-300 mb-4">
                        {lessonData.content.overview}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-navy-900 dark:text-cloud-100 mb-3">
                        Learning Objectives
                      </h4>
                      <div className="space-y-2">
                        {lessonData.content.learningObjectives.map(
                          (objective, index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                              onClick={() => toggleObjective(index)}
                            >
                              {completedObjectives.includes(index) ? (
                                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                              ) : (
                                <Circle className="w-5 h-5 text-navy-400 dark:text-cloud-400 mt-0.5 flex-shrink-0" />
                              )}
                              <span
                                className={`text-sm ${
                                  completedObjectives.includes(index)
                                    ? 'text-navy-900 dark:text-cloud-100 line-through'
                                    : 'text-navy-600 dark:text-cloud-300'
                                }`}
                              >
                                {objective}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-navy-900 dark:text-cloud-100 mb-3">
                        Prerequisites
                      </h4>
                      <ul className="space-y-1">
                        {lessonData.content.prerequisites.map(
                          (prereq, index) => (
                            <li
                              key={index}
                              className="text-sm text-navy-600 dark:text-cloud-300 flex items-center space-x-2"
                            >
                              <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                              <span>{prereq}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'code' && (
                  <div className="space-y-6">
                    {lessonData.content.codeExamples.map((example, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden"
                      >
                        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                          <h4 className="font-medium text-navy-900 dark:text-cloud-100">
                            {example.title}
                          </h4>
                        </div>
                        <pre className="p-4 bg-gray-900 text-green-400 text-sm overflow-x-auto">
                          <code>{example.code}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'resources' && (
                  <div className="space-y-4">
                    <div className="text-center py-8">
                      <Download className="w-12 h-12 text-navy-400 dark:text-cloud-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-navy-900 dark:text-cloud-100 mb-2">
                        Additional Resources
                      </h3>
                      <p className="text-navy-600 dark:text-cloud-300 mb-4">
                        Download code examples, slides, and additional materials
                        for this lesson.
                      </p>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors duration-200">
                        Download Resources
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Instructor Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-800/80 rounded-xl shadow-lg dark:shadow-2xl p-6 border border-gray-200 dark:border-gray-600/50 mb-6 backdrop-blur-sm"
            >
              <h3 className="font-semibold text-navy-900 dark:text-cloud-100 mb-4">
                Your Instructor
              </h3>
              <div className="flex items-center space-x-3">
                <img
                  src={lessonData.instructor.avatar}
                  alt={lessonData.instructor.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium text-navy-900 dark:text-cloud-100">
                    {lessonData.instructor.name}
                  </p>
                  <p className="text-sm text-navy-600 dark:text-cloud-300">
                    {lessonData.instructor.title}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-gray-800/80 rounded-xl shadow-lg dark:shadow-2xl p-6 border border-gray-200 dark:border-gray-600/50 backdrop-blur-sm"
            >
              <h3 className="font-semibold text-navy-900 dark:text-cloud-100 mb-4">
                Lesson Navigation
              </h3>

              {/* Previous Lesson */}
              {lessonData.prevLesson && (
                <Link
                  to={`/learn/${lessonData.prevLesson.id}`}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors mb-3 group"
                >
                  <ChevronLeft className="w-5 h-5 text-navy-400 dark:text-cloud-400 group-hover:text-red-600 dark:group-hover:text-red-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-navy-500 dark:text-cloud-400 mb-1">
                      Previous
                    </p>
                    <p className="font-medium text-navy-900 dark:text-cloud-100 truncate">
                      {lessonData.prevLesson.title}
                    </p>
                    <p className="text-xs text-navy-500 dark:text-cloud-400">
                      {lessonData.prevLesson.duration}
                    </p>
                  </div>
                </Link>
              )}

              {/* Next Lesson */}
              {lessonData.nextLesson && (
                <Link
                  to={`/learn/${lessonData.nextLesson.id}`}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-navy-500 dark:text-cloud-400 mb-1">
                      Next
                    </p>
                    <p className="font-medium text-navy-900 dark:text-cloud-100 truncate">
                      {lessonData.nextLesson.title}
                    </p>
                    <p className="text-xs text-navy-500 dark:text-cloud-400">
                      {lessonData.nextLesson.duration}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-navy-400 dark:text-cloud-400 group-hover:text-red-600 dark:group-hover:text-red-400" />
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
