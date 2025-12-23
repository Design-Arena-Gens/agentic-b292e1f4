'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import AgentChat from '@/components/AgentChat';
import VideoGrid from '@/components/VideoGrid';
import Watchlist from '@/components/Watchlist';
import { Video } from '@/lib/types';
import { trendingVideos } from '@/lib/mockData';

export default function Home() {
  const [activeTab, setActiveTab] = useState('agent');
  const [activeCategory, setActiveCategory] = useState('All');
  const [watchlist, setWatchlist] = useState<Video[]>([]);

  const handleAddToWatchlist = (video: Video) => {
    setWatchlist((prev) => {
      const exists = prev.some((v) => v.id === video.id);
      if (exists) {
        return prev.filter((v) => v.id !== video.id);
      }
      return [...prev, video];
    });
  };

  const handleRemoveFromWatchlist = (videoId: string) => {
    setWatchlist((prev) => prev.filter((v) => v.id !== videoId));
  };

  const watchlistIds = watchlist.map((v) => v.id);

  const renderContent = () => {
    switch (activeTab) {
      case 'agent':
        return (
          <AgentChat
            onAddToWatchlist={handleAddToWatchlist}
            watchlistIds={watchlistIds}
          />
        );
      case 'home':
      case 'trending':
        return (
          <VideoGrid
            videos={trendingVideos}
            title={activeTab === 'trending' ? '🔥 Trending Now' : 'Recommended for You'}
            onAddToWatchlist={handleAddToWatchlist}
            watchlistIds={watchlistIds}
          />
        );
      case 'explore':
        return (
          <VideoGrid
            videos={trendingVideos}
            title="🧭 Explore"
            onAddToWatchlist={handleAddToWatchlist}
            watchlistIds={watchlistIds}
          />
        );
      case 'watchlist':
        return (
          <Watchlist
            videos={watchlist}
            onRemove={handleRemoveFromWatchlist}
          />
        );
      case 'playlists':
      case 'history':
      case 'liked':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-12">
            <div className="text-6xl mb-6">🚧</div>
            <h3 className="text-xl font-semibold text-white mb-2">Coming Soon</h3>
            <p className="text-zinc-500 max-w-md">
              This feature is under development. Try the AI Agent to discover amazing videos!
            </p>
          </div>
        );
      default:
        return (
          <AgentChat
            onAddToWatchlist={handleAddToWatchlist}
            watchlistIds={watchlistIds}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-zinc-950">
      <Sidebar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
