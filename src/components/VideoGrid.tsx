'use client';

import { Video } from '@/lib/types';
import VideoCard from './VideoCard';
import { trendingVideos, categories } from '@/lib/mockData';
import { useState } from 'react';

interface VideoGridProps {
  videos?: Video[];
  title?: string;
  showFilters?: boolean;
  onAddToWatchlist?: (video: Video) => void;
  watchlistIds?: string[];
}

export default function VideoGrid({
  videos = trendingVideos,
  title = 'Trending Videos',
  showFilters = true,
  onAddToWatchlist,
  watchlistIds = [],
}: VideoGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'views' | 'date' | 'duration'>('views');

  const filteredVideos = videos.filter((video) => {
    if (selectedCategory === 'All') return true;
    return video.category === selectedCategory;
  });

  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (sortBy) {
      case 'views':
        return parseViews(b.viewCount) - parseViews(a.viewCount);
      case 'date':
        return compareDates(a.publishedAt, b.publishedAt);
      case 'duration':
        return parseDuration(b.duration) - parseDuration(a.duration);
      default:
        return 0;
    }
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>

        {showFilters && (
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'views' | 'date' | 'duration')}
              className="bg-zinc-800 text-white text-sm rounded-lg px-3 py-2 border border-zinc-700 focus:outline-none focus:border-red-500"
            >
              <option value="views">Most Views</option>
              <option value="date">Most Recent</option>
              <option value="duration">Duration</option>
            </select>
          </div>
        )}
      </div>

      {/* Category Pills */}
      {showFilters && (
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-white text-black'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Video Grid */}
      {sortedVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onAddToWatchlist={onAddToWatchlist}
              isInWatchlist={watchlistIds.includes(video.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-zinc-500">No videos found in this category</p>
        </div>
      )}
    </div>
  );
}

// Helper functions
function parseViews(viewCount: string): number {
  const num = parseFloat(viewCount.replace(/[^\d.]/g, ''));
  if (viewCount.includes('M')) return num * 1000000;
  if (viewCount.includes('K')) return num * 1000;
  return num;
}

function compareDates(a: string, b: string): number {
  const timeUnits: { [key: string]: number } = {
    hour: 1,
    day: 24,
    week: 168,
    month: 720,
    year: 8760,
  };

  const getHours = (str: string): number => {
    const match = str.match(/(\d+)\s*(hour|day|week|month|year)/);
    if (!match) return 0;
    return parseInt(match[1]) * (timeUnits[match[2]] || 1);
  };

  return getHours(a) - getHours(b);
}

function parseDuration(duration: string): number {
  const parts = duration.split(':').map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return 0;
}
