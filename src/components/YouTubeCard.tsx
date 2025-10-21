import { motion } from 'framer-motion';
import { Clock, Eye, Play } from 'lucide-react';
import React from 'react';
import type { YouTubeVideo } from '../lib/youtube';
import LazyImage from './LazyImage';

interface YouTubeCardProps {
  index: number;
  video: YouTubeVideo;
}

export const YouTubeCard: React.FC<YouTubeCardProps> = ({ index, video }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative group">
        <LazyImage
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover"
          onError={() => {
            // Fallback handled by LazyImage component
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12" />
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-900 dark:text-white">
          {video.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
          {video.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>{video.viewCount} views</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{formatDate(video.publishedAt)}</span>
            </div>
          </div>
        </div>

        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
        >
          <Play className="w-4 h-4" />
          <span>Watch Video</span>
        </a>
      </div>
    </motion.div>
  );
};
