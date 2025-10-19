export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
  url: string;
}

interface YouTubeSearchResponse {
  items: Array<{
    id: { videoId: string };
    snippet: {
      title: string;
      description: string;
      thumbnails: { medium: { url: string } };
      publishedAt: string;
    };
  }>;
}

interface YouTubeVideoDetailsResponse {
  items: Array<{
    contentDetails: { duration: string };
    statistics: { viewCount: string };
  }>;
}

// Fallback placeholder videos for when API is not available
const PLACEHOLDER_VIDEOS: YouTubeVideo[] = [
  {
    id: 'placeholder-1',
    title: 'Python Fundamentals: Variables and Data Types',
    description:
      'Learn the basics of Python variables, data types, and how to work with them effectively in your code.',
    thumbnail: '/brand/Code Mage Banner.png',
    publishedAt: '2024-01-15',
    duration: '12:34',
    viewCount: '15,420',
    url: 'https://youtube.com/watch?v=placeholder-1',
  },
  {
    id: 'placeholder-2',
    title: 'Advanced Python: List Comprehensions Explained',
    description:
      'Master Python list comprehensions with practical examples and best practices for cleaner code.',
    thumbnail: '/brand/Code Mage Banner.png',
    publishedAt: '2024-01-10',
    duration: '18:45',
    viewCount: '23,156',
    url: 'https://youtube.com/watch?v=placeholder-2',
  },
  {
    id: 'placeholder-3',
    title: 'Building Your First Python Project',
    description:
      'Step-by-step guide to creating a complete Python project from scratch with best practices.',
    thumbnail: '/brand/Code Mage Banner.png',
    publishedAt: '2024-01-05',
    duration: '25:12',
    viewCount: '31,892',
    url: 'https://youtube.com/watch?v=placeholder-3',
  },
];

class YouTubeService {
  private apiKey: string | null;
  private channelId: string | null;

  constructor() {
    this.apiKey = import.meta.env.VITE_YOUTUBE_API_KEY || null;
    this.channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || null;
  }

  async getLatestVideos(maxResults: number = 6): Promise<YouTubeVideo[]> {
    // If no API key is provided, return placeholder videos
    if (!this.apiKey || !this.channelId) {
      console.warn(
        'YouTube API key or channel ID not configured. Using placeholder videos.'
      );
      return PLACEHOLDER_VIDEOS.slice(0, maxResults);
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?` +
          `key=${this.apiKey}&` +
          `channelId=${this.channelId}&` +
          `part=snippet&` +
          `order=date&` +
          `maxResults=${maxResults}&` +
          `type=video`
      );

      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }

      const data: YouTubeSearchResponse = await response.json();

      // Get video details for duration and view count
      const videoIds = data.items.map(item => item.id.videoId).join(',');
      const detailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?` +
          `key=${this.apiKey}&` +
          `id=${videoIds}&` +
          `part=contentDetails,statistics`
      );

      const detailsData: YouTubeVideoDetailsResponse =
        await detailsResponse.json();

      return data.items.map((item, index: number) => {
        const details = detailsData.items[index];
        return {
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.medium.url,
          publishedAt: item.snippet.publishedAt,
          duration: this.formatDuration(details.contentDetails.duration),
          viewCount: this.formatViewCount(details.statistics.viewCount),
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        };
      });
    } catch (error) {
      console.error('Failed to fetch YouTube videos:', error);
      // Fallback to placeholder videos on error
      return PLACEHOLDER_VIDEOS.slice(0, maxResults);
    }
  }

  private formatDuration(duration: string): string {
    // Convert ISO 8601 duration (PT4M13S) to readable format (4:13)
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return '0:00';

    const hours = parseInt(match[1] || '0');
    const minutes = parseInt(match[2] || '0');
    const seconds = parseInt(match[3] || '0');

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  private formatViewCount(viewCount: string): string {
    const count = parseInt(viewCount);
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  }
}

export const youtubeService = new YouTubeService();
