'use client';

import { Video } from '@/lib/types';
import VideoCard from './VideoCard';
import { Clock, Trash2, Play } from 'lucide-react';

interface WatchlistProps {
  videos: Video[];
  onRemove: (videoId: string) => void;
}

export default function Watchlist({ videos, onRemove }: WatchlistProps) {
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-12">
        <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mb-6">
          <Clock className="w-10 h-10 text-zinc-600" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Your watchlist is empty</h3>
        <p className="text-zinc-500 max-w-md">
          Videos you add to your watchlist will appear here. Use the AI Agent to discover and add videos!
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Clock className="w-7 h-7 text-red-500" />
            Watch Later
          </h2>
          <p className="text-zinc-500 mt-1">{videos.length} video{videos.length !== 1 ? 's' : ''}</p>
        </div>

        {videos.length > 0 && (
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all">
            <Play className="w-4 h-4" />
            Play All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="relative group">
            <VideoCard video={video} />
            <button
              onClick={() => onRemove(video.id)}
              className="absolute top-2 right-2 p-2 bg-black/80 hover:bg-red-600 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all"
              title="Remove from watchlist"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
