/**
 * Nexus Arcade - Multi-Filter & Sorting Toolbar
 * Author: Omar Khlifi
 * License: MIT
 */

import React from 'react';
import { useGame } from '../context/GameContext';
import { Genre, Platform, SortOption, PriceFilter } from '../types';
import { 
  Filter, 
  ArrowUpDown, 
  Grid3X3, 
  LayoutList, 
  RotateCcw, 
  DollarSign,
  Layers,
  Sparkles
} from 'lucide-react';

const GENRES: Array<Genre | 'All'> = [
  'All',
  'Cyberpunk',
  'Action',
  'RPG',
  'Tactical Shooter',
  'VR',
  'Indie',
  'Sci-Fi',
  'Open World'
];

const PLATFORMS: Array<Platform | 'All'> = [
  'All',
  'PC',
  'PlayStation 5',
  'Xbox Series X',
  'VR'
];

export const FilterBar: React.FC = () => {
  const {
    selectedGenre,
    setSelectedGenre,
    selectedPlatform,
    setSelectedPlatform,
    sortBy,
    setSortBy,
    priceFilter,
    setPriceFilter,
    viewMode,
    setViewMode,
    filteredGames,
    searchQuery,
    setSearchQuery,
  } = useGame();

  const isFiltered = 
    selectedGenre !== 'All' || 
    selectedPlatform !== 'All' || 
    priceFilter !== 'all' || 
    sortBy !== 'rating' ||
    searchQuery !== '';

  const handleReset = () => {
    setSelectedGenre('All');
    setSelectedPlatform('All');
    setPriceFilter('all');
    setSortBy('rating');
    setSearchQuery('');
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Genre Horizontal Pill Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {GENRES.map((genre) => {
          const isActive = selectedGenre === genre;
          return (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider font-mono uppercase whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-cyan-500 text-black font-extrabold shadow-lg cyber-glow-cyan'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {genre}
            </button>
          );
        })}
      </div>

      {/* Secondary Controls Bar: Platforms, Price, Sort & Layout Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
        
        {/* Left Side Filters: Platform & Price */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Platform Selector */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400 text-[11px] font-mono">PLATFORM:</span>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
            >
              {PLATFORMS.map((plat) => (
                <option key={plat} value={plat} className="bg-slate-900 text-white">
                  {plat}
                </option>
              ))}
            </select>
          </div>

          {/* Price Quick Filter */}
          <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setPriceFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium transition-colors ${
                priceFilter === 'all' ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Prices
            </button>
            <button
              onClick={() => setPriceFilter('sale')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium transition-colors ${
                priceFilter === 'sale' ? 'bg-purple-950 text-purple-400 border border-purple-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              On Sale 🔥
            </button>
            <button
              onClick={() => setPriceFilter('free')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium transition-colors ${
                priceFilter === 'free' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              Free to Play
            </button>
            <button
              onClick={() => setPriceFilter('under20')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium transition-colors ${
                priceFilter === 'under20' ? 'bg-amber-950 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              Under $20
            </button>
          </div>

          {/* Reset Filters button */}
          {isFiltered && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 hover:bg-rose-900/50 text-xs font-mono transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}
        </div>

        {/* Right Side: Sort dropdown, Count, and Grid/Compact view toggle */}
        <div className="flex items-center gap-3">
          
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400 text-[11px] font-mono">SORT:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
            >
              <option value="rating" className="bg-slate-900 text-white">Community Rating</option>
              <option value="release" className="bg-slate-900 text-white">Release Date</option>
              <option value="title" className="bg-slate-900 text-white">Title (A-Z)</option>
              <option value="price-asc" className="bg-slate-900 text-white">Price: Low to High</option>
              <option value="price-desc" className="bg-slate-900 text-white">Price: High to Low</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              title="Grid View"
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('compact')}
              title="Compact List View"
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'compact' ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>

          {/* Results count */}
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            <strong className="text-white">{filteredGames.length}</strong> titles
          </span>

        </div>

      </div>
    </div>
  );
};

