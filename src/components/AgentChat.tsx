'use client';

import { useState, useRef, useEffect } from 'react';
import { AgentMessage, Video, ConversationContext } from '@/lib/types';
import { processAgentQuery, generateAgentGreeting } from '@/lib/agentLogic';
import { suggestedQueries, agentCapabilities } from '@/lib/mockData';
import ChatMessage from './ChatMessage';
import SearchBar from './SearchBar';
import { Sparkles, Zap, MessageCircle, Lightbulb } from 'lucide-react';

interface AgentChatProps {
  onAddToWatchlist: (video: Video) => void;
  watchlistIds: string[];
}

export default function AgentChat({ onAddToWatchlist, watchlistIds }: AgentChatProps) {
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [context] = useState<ConversationContext>({
    searchHistory: [],
    watchedVideos: [],
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add initial greeting
    if (messages.length === 0) {
      const greeting: AgentMessage = {
        id: '0',
        role: 'agent',
        content: generateAgentGreeting(),
        timestamp: new Date(),
      };
      setMessages([greeting]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (query: string) => {
    // Add user message
    const userMessage: AgentMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Get agent response
    const result = processAgentQuery(query, context);

    const agentMessage: AgentMessage = {
      id: (Date.now() + 1).toString(),
      role: 'agent',
      content: result.response,
      timestamp: new Date(),
      videos: result.videos,
    };

    setMessages((prev) => [...prev, agentMessage]);
    setIsLoading(false);
  };

  const handleSuggestedQuery = (query: string) => {
    handleSendMessage(query);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">YouTube Agent</h2>
            <p className="text-sm text-zinc-400">AI-powered video discovery assistant</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 1 && (
          <>
            {/* Capabilities Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {agentCapabilities.map((capability, index) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 hover:border-red-500/50 transition-all cursor-pointer group"
                >
                  <div className="text-2xl mb-2">{capability.icon}</div>
                  <h4 className="font-medium text-white text-sm group-hover:text-red-400 transition-colors">
                    {capability.title}
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1">{capability.description}</p>
                </div>
              ))}
            </div>

            {/* Suggested Queries */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                <h3 className="text-sm font-medium text-zinc-400">Try asking:</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedQueries.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuery(query)}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm rounded-full transition-all hover:scale-105"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Chat Messages */}
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            onAddToWatchlist={onAddToWatchlist}
            watchlistIds={watchlistIds}
          />
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-4 animate-fade-in">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="bg-zinc-800 rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
        <SearchBar
          onSearch={handleSendMessage}
          placeholder="Ask me to find videos, get recommendations, or explore topics..."
          isLoading={isLoading}
        />
        <p className="text-xs text-zinc-600 text-center mt-2">
          YouTube Agent uses AI to help you discover and manage videos
        </p>
      </div>
    </div>
  );
}
