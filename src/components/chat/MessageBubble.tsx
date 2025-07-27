'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot, Loader2 } from 'lucide-react';
import { ChatMessage } from '@/types';
import { PlayerCard } from '@/components/player/PlayerCard';
import { formatDate } from '@/utils';
import { cn } from '@/utils';

// AI Response Formatter Component
function AIResponseFormatter({ content }: { content: string }) {
  return (
    <div className="space-y-8">
      {/* Main Analysis */}
      <section>
        <h3 className="text-xl font-medium text-gray-900 mb-4">
          Analysis
        </h3>
        <div className="text-gray-700 leading-relaxed space-y-4">
          <div className="whitespace-pre-wrap break-words">{content}</div>
        </div>
      </section>
    </div>
  );
}

interface MessageBubbleProps {
  message: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.type === 'user';

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex justify-end mb-6"
      >
        <div className="max-w-2xl">
          <div className="bg-gray-50 p-6 text-gray-900 font-light leading-relaxed">
            {message.content}
          </div>
        </div>
      </motion.div>
    );
  }

  // AI Response - Typography-First Design
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex justify-start mb-8"
    >
      <div className="max-w-4xl w-full">
        {/* AI Response Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center">
            <Bot size={12} className="text-white" />
          </div>
          <span className="text-sm font-medium text-gray-900">
            Soccer Scout AI
          </span>
          <span className="text-sm text-gray-500">
            {formatDate(message.timestamp)}
          </span>
        </div>

        {/* AI Response Content */}
        <div className="prose prose-lg max-w-none ml-9">
          {message.isLoading ? (
            <div className="flex items-center gap-2 text-gray-600">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="font-light">Analyzing your query...</span>
            </div>
          ) : (
            <AIResponseFormatter content={message.content} />
          )}
        </div>

        {/* Player Recommendations */}
        {message.players && message.players.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="ml-9 mt-8"
          >
            <h3 className="text-xl font-medium text-gray-900 mb-6">
              Recommendations
            </h3>
            <div className="space-y-6">
              {message.players.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Tactical Analysis */}
        {message.analysis && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="ml-9 mt-8 border border-gray-200 p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xl font-medium text-gray-900">Tactical Analysis</h3>
              {message.analysis.compatibility_score && (
                <span className="bg-gray-100 text-gray-700 px-2 py-1 text-xs font-medium">
                  {Math.round(message.analysis.compatibility_score * 100)}% Match
                </span>
              )}
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              {message.analysis.reasoning}
            </p>

            {/* Strengths & Weaknesses */}
            {(message.analysis.strengths || message.analysis.weaknesses) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {message.analysis.strengths && (
                  <div className="border border-gray-100 p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wide">Strengths</h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      {message.analysis.strengths.map((strength, i) => (
                        <li key={i}>• {strength}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {message.analysis.weaknesses && (
                  <div className="border border-gray-100 p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wide">Areas to Consider</h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      {message.analysis.weaknesses.map((weakness, i) => (
                        <li key={i}>• {weakness}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* System Fits */}
            <div className="flex flex-wrap gap-3">
              {message.analysis.tactical_fit && (
                <div className="text-sm text-gray-700 bg-gray-50 px-3 py-2">
                  System: {message.analysis.tactical_fit}
                </div>
              )}
              {message.analysis.formation_fit && (
                <div className="text-sm text-gray-700 bg-gray-50 px-3 py-2">
                  Formation: {message.analysis.formation_fit}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Player Comparison */}
        {message.comparison && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="ml-9 mt-8 border border-gray-200 p-8"
          >
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              Player Comparison
            </h3>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              {message.comparison.comparison_summary}
            </p>

            {/* Advantages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-gray-100 p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wide">
                  {message.comparison.player_1.name} Advantages
                </h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  {message.comparison.strengths_comparison.player_1_advantages.map((advantage, i) => (
                    <li key={i}>• {advantage}</li>
                  ))}
                </ul>
              </div>
              <div className="border border-gray-100 p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wide">
                  {message.comparison.player_2.name} Advantages
                </h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  {message.comparison.strengths_comparison.player_2_advantages.map((advantage, i) => (
                    <li key={i}>• {advantage}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Winner & Recommendation */}
            <div className="bg-gray-50 border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Statistical Winner:</span>
                <span className="bg-gray-900 text-white px-2 py-1 text-xs font-medium">
                  {message.comparison.statistical_winner}
                </span>
              </div>
              <p className="text-sm text-gray-700">
                {message.comparison.recommendation}
              </p>
            </div>
          </motion.div>
        )}

        {/* Scouting Report */}
        {message.scouting_report && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="ml-9 mt-8 border border-gray-200 p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xl font-medium text-gray-900">Scouting Report</h3>
              <span className="bg-gray-100 text-gray-700 px-2 py-1 text-xs font-medium">
                {message.scouting_report.tier}
              </span>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              {message.scouting_report.potential_summary}
            </p>

            {/* Strengths & Areas for Improvement */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-gray-100 p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wide">Key Strengths</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  {message.scouting_report.key_strengths.map((strength, i) => (
                    <li key={i}>• {strength}</li>
                  ))}
                </ul>
              </div>
              <div className="border border-gray-100 p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wide">Areas for Development</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  {message.scouting_report.areas_for_improvement.map((area, i) => (
                    <li key={i}>• {area}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Comparable Players */}
            {message.scouting_report.comparable_players && message.scouting_report.comparable_players.length > 0 && (
              <div className="bg-gray-50 border border-gray-100 p-4 mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wide">Similar Players</h4>
                <div className="flex flex-wrap gap-2">
                  {message.scouting_report.comparable_players.map((player, i) => (
                    <span key={i} className="bg-white border border-gray-200 text-gray-700 px-2 py-1 text-xs">
                      {player}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendation */}
            <div className="bg-gray-50 border border-gray-100 p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2 uppercase tracking-wide">Scout Recommendation</h4>
              <p className="text-sm text-gray-700">
                {message.scouting_report.recommendation}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};