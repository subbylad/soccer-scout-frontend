'use client';

import React, { useState, KeyboardEvent, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { cn } from '@/utils';

interface QueryInputProps {
  disabled?: boolean;
  placeholder?: string;
  prefilledQuery?: string;
  onQuerySubmitted?: () => void;
}

export const QueryInput: React.FC<QueryInputProps> = ({ 
  disabled = false, 
  placeholder = "Ask about players, tactics, or comparisons...",
  prefilledQuery = '',
  onQuerySubmitted
}) => {
  const [query, setQuery] = useState('');
  const { sendMessage, isLoading } = useChat();

  // Handle prefilled query
  useEffect(() => {
    if (prefilledQuery) {
      setQuery(prefilledQuery);
    }
  }, [prefilledQuery]);

  const handleSubmit = () => {
    if (!query.trim() || disabled || isLoading) return;
    
    sendMessage(query);
    setQuery('');
    onQuerySubmitted?.();
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const suggestedQueries = [
    "Compare Haaland vs Mbappé",
    "Who can play alongside Kobbie Mainoo?",
    "Find young midfielders under 21",
    "Best alternatives to Rodri",
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Suggested Queries */}
      {query === '' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="flex flex-wrap gap-2">
            {suggestedQueries.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setQuery(suggestion)}
                className="text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 px-3 py-2 border border-gray-200 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input Area */}
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="relative">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          rows={3}
          className={cn(
            'w-full p-6 text-lg border border-gray-200 focus:border-gray-400 focus:outline-none resize-none font-light leading-relaxed',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        />

        
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Press ⌘ + Enter to submit
          </div>
          
          <button
            type="submit"
            disabled={!query.trim() || disabled || isLoading}
            className={cn(
              'bg-gray-900 text-white px-6 py-3 font-light hover:bg-gray-800 transition-colors',
              (!query.trim() || disabled || isLoading) && 'opacity-50 cursor-not-allowed'
            )}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </div>
            ) : (
              'Analyze →'
            )}
          </button>
        </div>
      </form>

    </div>
  );
};