'use client';

import { AgentMessage } from '@/lib/types';
import VideoCard from './VideoCard';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: AgentMessage;
  onAddToWatchlist?: (video: any) => void;
  watchlistIds?: string[];
}

export default function ChatMessage({ message, onAddToWatchlist, watchlistIds = [] }: ChatMessageProps) {
  const isAgent = message.role === 'agent';

  return (
    <div className={`flex gap-4 ${isAgent ? '' : 'flex-row-reverse'} animate-fade-in`}>
      {/* Avatar */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
          isAgent
            ? 'bg-gradient-to-br from-red-500 to-red-700'
            : 'bg-gradient-to-br from-blue-500 to-blue-700'
        }`}
      >
        {isAgent ? (
          <Bot className="w-5 h-5 text-white" />
        ) : (
          <User className="w-5 h-5 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-[85%] ${isAgent ? '' : 'text-right'}`}>
        <div
          className={`inline-block rounded-2xl px-4 py-3 ${
            isAgent
              ? 'bg-zinc-800 text-white rounded-tl-sm'
              : 'bg-red-600 text-white rounded-tr-sm'
          }`}
        >
          <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
        </div>

        {/* Videos Grid */}
        {message.videos && message.videos.length > 0 && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {message.videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onAddToWatchlist={onAddToWatchlist}
                isInWatchlist={watchlistIds.includes(video.id)}
              />
            ))}
          </div>
        )}

        {/* Timestamp */}
        <p className={`text-xs text-zinc-500 mt-2 ${isAgent ? '' : 'text-right'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
}
