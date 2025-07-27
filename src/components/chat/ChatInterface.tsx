'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageList } from './MessageList';
import { QueryInput } from './QueryInput';
import { HomePage } from '../pages/HomePage';
import { Header } from '../layout/Header';
import { useChatStore } from '@/store/chatStore';
import ErrorBoundary from '@/components/ErrorBoundary';

export const ChatInterface: React.FC = () => {
  const { messages, isLoading } = useChatStore();
  const [currentView, setCurrentView] = useState<'home' | 'chat'>('home');
  const [prefilledQuery, setPrefilledQuery] = useState<string>('');

  const handleStartAnalysis = (query?: string) => {
    if (query) {
      setPrefilledQuery(query);
    }
    setCurrentView('chat');
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    setPrefilledQuery('');
  };

  if (currentView === 'home') {
    return <HomePage onStartAnalysis={handleStartAnalysis} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        currentPage="chat" 
        onNavigateHome={handleNavigateHome}
      />
      
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Chat Messages */}
        <div className="mb-8">
          <ErrorBoundary>
            <MessageList messages={messages} />
          </ErrorBoundary>
        </div>
        
        {/* Query Input - Clean Design */}
        <div className="sticky bottom-0 bg-white/80 backdrop-blur-sm py-6">
          <ErrorBoundary>
            <QueryInput 
              disabled={isLoading}
              placeholder="Ask about players, tactics, or comparisons..."
              prefilledQuery={prefilledQuery}
              onQuerySubmitted={() => setPrefilledQuery('')}
            />
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
};