'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import { Player } from '@/types';
import { formatNumber, formatAge, formatPosition, getTierLabel } from '@/utils';

interface PlayerCardProps {
  player: Player;
  reasoning?: string;
  confidence?: number;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player, reasoning, confidence }) => {
  const { stats } = player;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border border-gray-200 p-8 hover:border-gray-300 transition-colors"
    >
      {/* Player Header */}
      <header className="mb-6">
        <h4 className="text-xl font-medium text-gray-900 mb-2">
          {player.name}
        </h4>
        <div className="text-gray-600 space-y-1">
          <p>{formatPosition(player.position)} • {player.club}</p>
          <p className="text-sm">{player.league}</p>
        </div>
      </header>

      {/* Key Stats - Clean Typography */}
      <section className="mb-6">
        <h5 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wide">
          Key Metrics
        </h5>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Goals</span>
            <span className="font-medium text-gray-900">{stats.goals}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Assists</span>
            <span className="font-medium text-gray-900">{stats.assists}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Goals/90</span>
            <span className="font-medium text-gray-900">{formatNumber(stats.goals_per_90)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Assists/90</span>
            <span className="font-medium text-gray-900">{formatNumber(stats.assists_per_90)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">xG</span>
            <span className="font-medium text-gray-900">{formatNumber(stats.xg)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Minutes</span>
            <span className="font-medium text-gray-900">{stats.minutes_played.toLocaleString()}</span>
          </div>
        </div>
      </section>

      {/* Additional Insights */}
      {stats.xa > 0 && (
        <section className="mb-6">
          <h5 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wide">
            Advanced Metrics
          </h5>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">xA</span>
              <span className="font-medium text-gray-900">{formatNumber(stats.xa)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">vs Expected</span>
              <span className="font-medium text-gray-900">
                {stats.goals + stats.assists > stats.xg + stats.xa ? 'Above' : 'Below'}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Progressive Actions */}
      {(stats.progressive_passes > 0 || stats.progressive_carries > 0) && (
        <section className="mb-6">
          <h5 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wide">
            Progressive Actions
          </h5>
          <div className="grid grid-cols-1 gap-2 text-sm">
            {stats.progressive_passes > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Passes</span>
                <span className="font-medium text-gray-900">{stats.progressive_passes}</span>
              </div>
            )}
            {stats.progressive_carries > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Carries</span>
                <span className="font-medium text-gray-900">{stats.progressive_carries}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* AI Reasoning */}
      {reasoning && (
        <section className="mb-4">
          <h5 className="text-sm font-medium text-gray-900 mb-2 uppercase tracking-wide">
            Analysis
          </h5>
          <p className="text-gray-700 leading-relaxed text-sm">
            {reasoning}
          </p>
        </section>
      )}
      
      {/* Confidence Score */}
      {confidence && (
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 uppercase tracking-wide">
              Confidence
            </span>
            <span className="text-sm font-medium text-gray-900">
              {Math.round(confidence * 100)}%
            </span>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
        <span className="text-xs text-gray-500 uppercase tracking-wide">{player.nationality}</span>
        <span className="text-xs text-gray-500">Age {formatAge(player.age)}</span>
      </div>
    </motion.div>
  );
};