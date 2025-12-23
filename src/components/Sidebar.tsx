'use client';

import { categories } from '@/lib/mockData';
import { 
  Home, 
  Compass, 
  Clock, 
  ListVideo, 
  History, 
  ThumbsUp, 
  Flame,
  Sparkles,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({
  activeCategory,
  onCategoryChange,
  activeTab,
  onTabChange,
}: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const mainNavItems = [
    { id: 'agent', label: 'AI Agent', icon: Sparkles },
    { id: 'home', label: 'Home', icon: Home },
    { id: 'trending', label: 'Trending', icon: Flame },
    { id: 'explore', label: 'Explore', icon: Compass },
  ];

  const libraryItems = [
    { id: 'watchlist', label: 'Watch Later', icon: Clock },
    { id: 'playlists', label: 'Playlists', icon: ListVideo },
    { id: 'history', label: 'History', icon: History },
    { id: 'liked', label: 'Liked Videos', icon: ThumbsUp },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-zinc-800 rounded-lg text-white"
      >
        {isExpanded ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 bg-zinc-950 border-r border-zinc-800 transition-all duration-300 ${
          isExpanded ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:w-20 lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo */}
          <div className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            {isExpanded && (
              <div>
                <h1 className="text-lg font-bold text-white">YouTube</h1>
                <p className="text-xs text-red-500 font-medium">Agent</p>
              </div>
            )}
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 overflow-y-auto px-2 py-4">
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                    activeTab === item.id
                      ? 'bg-red-600/20 text-red-400'
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {isExpanded && <span className="text-sm font-medium">{item.label}</span>}
                </button>
              ))}
            </div>

            {/* Library Section */}
            {isExpanded && (
              <>
                <div className="mt-6 mb-2 px-3">
                  <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Library
                  </h3>
                </div>
                <div className="space-y-1">
                  {libraryItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onTabChange(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                        activeTab === item.id
                          ? 'bg-red-600/20 text-red-400'
                          : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                      }`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>

                {/* Categories */}
                <div className="mt-6 mb-2 px-3">
                  <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Categories
                  </h3>
                </div>
                <div className="space-y-1">
                  {categories.slice(0, 8).map((category) => (
                    <button
                      key={category}
                      onClick={() => onCategoryChange(category)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all text-sm ${
                        activeCategory === category
                          ? 'bg-zinc-800 text-white'
                          : 'text-zinc-500 hover:bg-zinc-800 hover:text-white'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </>
            )}
          </nav>

          {/* Footer */}
          {isExpanded && (
            <div className="p-4 border-t border-zinc-800">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-500 hover:bg-zinc-800 hover:text-white transition-all">
                <Settings className="w-5 h-5" />
                <span className="text-sm">Settings</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isExpanded && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
}
