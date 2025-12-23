'use client';

import { Video } from '@/lib/types';
import { Play, Clock, Eye, Plus, Check } from 'lucide-react';
import { useState } from 'react';

interface VideoCardProps {
  video: Video;
  onAddToWatchlist?: (video: Video) => void;
  isInWatchlist?: boolean;
}

export default function VideoCard({ video, onAddToWatchlist, isInWatchlist = false }: VideoCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const placeholderImage = `https://via.placeholder.com/480x270/1f1f1f/ffffff?text=${encodeURIComponent(video.title.substring(0, 20))}`;

  return (
    <div
      className="group bg-zinc-900 rounded-xl overflow-hidden hover:bg-zinc-800 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-red-500/10 animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <div 
          className="w-full h-full bg-gradient-to-br from-red-600/20 to-purple-600/20 flex items-center justify-center"
        >
          <div className="text-4xl">🎬</div>
        </div>
        
        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-medium">
          {video.duration}
        </div>

        {/* Play Overlay */}
        <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform cursor-pointer">
            <Play className="w-8 h-8 text-white ml-1" fill="white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-white line-clamp-2 mb-2 group-hover:text-red-400 transition-colors">
          {video.title}
        </h3>

        {/* Channel */}
        <p className="text-sm text-zinc-400 mb-2 hover:text-white cursor-pointer transition-colors">
          {video.channelName}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {video.viewCount} views
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {video.publishedAt}
          </span>
        </div>

        {/* Category Badge */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded-full">
            {video.category}
          </span>
          
          {onAddToWatchlist && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToWatchlist(video);
              }}
              className={`p-2 rounded-full transition-all ${
                isInWatchlist
                  ? 'bg-green-600/20 text-green-400'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-red-600/20 hover:text-red-400'
              }`}
              title={isInWatchlist ? 'In watchlist' : 'Add to watchlist'}
            >
              {isInWatchlist ? (
                <Check className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
