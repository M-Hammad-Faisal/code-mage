import { motion } from 'framer-motion';
import { ExternalLink, Youtube } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import type { YouTubeVideo } from '../lib/youtube';
import { youtubeService } from '../lib/youtube';
import { SITE } from '../site.config';
import { YouTubeCard } from './YouTubeCard';

export const YouTubeSection: React.FC = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        const latestVideos = await youtubeService.getLatestVideos(6);
        setVideos(latestVideos);
      } catch (err) {
        setError('Failed to load videos. Please try again later.');
        console.error('Error fetching YouTube videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Latest YouTube Videos
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Learn programming with our latest video tutorials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse"
              >
                <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Latest YouTube Videos
            </h2>
            <p className="text-red-600 dark:text-red-400 mb-8">{error}</p>
            <a
              href={SITE.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              <Youtube className="w-5 h-5" />
              <span>Visit YouTube Channel</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Latest YouTube Videos
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Learn programming with our latest video tutorials
          </p>
          <a
            href={SITE.socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
          >
            <Youtube className="w-5 h-5" />
            <span>Subscribe for More</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <YouTubeCard key={video.id} video={video} index={index} />
          ))}
        </div>

        {videos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">
              No videos available at the moment. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
