/**
 * Nexus Arcade - Game Catalog Grid
 * Author: Omar Khlifi
 * License: MIT
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { GameCard } from './GameCard';
import { Gamepad2, SearchX, RotateCcw } from 'lucide-react';

export const GameGrid: React.FC = () => {
  const { 
    filteredGames, 
    viewMode, 
    searchQuery, 
    setSelectedGenre, 
    setSelectedPlatform, 
    setPriceFilter, 
    setSearchQuery 
  } = useGame();

  const handleReset = () => {
    setSelectedGenre('All');
    setSelectedPlatform('All');
    setPriceFilter('all');
    setSearchQuery('');
  };

  if (filteredGames.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl cyber-glass border border-slate-800 my-8">
        <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 mb-4 text-cyan-400 cyber-glow-cyan">
          <SearchX className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-bold text-white font-['Orbitron']">
          No Mainframe Records Found
        </h3>
        <p className="text-sm text-slate-400 max-w-md mt-2">
          No games match your current filter parameters or search term{' '}
          {searchQuery && <span className="text-cyan-400">"{searchQuery}"</span>}.
        </p>
        <button
          onClick={handleReset}
          className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm tracking-wide uppercase transition-all cyber-glow-cyan"
        >
          <RotateCcw className="w-4 h-4" />
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div
      className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'flex flex-col gap-3'
      }
    >
      <AnimatePresence>
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} layout={viewMode} />
        ))}
      </AnimatePresence>
    </div>
  );
};

