/**
 * Nexus Arcade - Cyber Header & Navigation Bar
 * Author: Omar Khlifi
 * License: MIT
 */

import React, { useState, useRef, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { useUser } from '../context/UserContext';
import { 
  Gamepad2, 
  Search, 
  ShoppingCart, 
  Heart, 
  Library, 
  Trophy, 
  Volume2, 
  VolumeX, 
  Info, 
  X,
  ExternalLink,
  ChevronRight,
  Flame
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    cart, 
    wishlist, 
    library, 
    activeTab, 
    setActiveTab, 
    setIsCartOpen, 
    setIsProfileOpen, 
    setIsAboutModalOpen,
    searchQuery,
    setSearchQuery,
    games,
    openGameDetails
  } = useGame();

  const { profile, soundEnabled, toggleSound, unlockAchievement, achievements } = useUser();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim()
    ? games.filter(g => 
        g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.genres.some(gen => gen.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  const handleSoundToggle = () => {
    toggleSound();
    unlockAchievement('ach-sound-toggle');
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <header className="sticky top-0 z-40 w-full cyber-glass border-b border-slate-800/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={() => { setActiveTab('store'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/40 group-hover:border-cyan-400 cyber-glow-cyan transition-all duration-300">
              <Gamepad2 className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping opacity-75" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-wider text-white font-['Orbitron'] bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                  NEXUS
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded font-mono font-bold bg-cyan-950 border border-cyan-500/30 text-cyan-400">
                  ARCADE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-widest font-mono uppercase">
                Next-Gen Storefront
              </p>
            </div>
          </div>

          {/* Primary Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('store')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeTab === 'store'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-cyan-400/10 border border-cyan-500/40 text-cyan-300 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Flame className="w-4 h-4 text-cyan-400" />
              Storefront
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 relative ${
                activeTab === 'library'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-cyan-400/10 border border-cyan-500/40 text-cyan-300 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Library className="w-4 h-4 text-emerald-400" />
              Library
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-emerald-950 border border-emerald-500/30 text-emerald-400">
                {library.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 relative ${
                activeTab === 'wishlist'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-cyan-400/10 border border-cyan-500/40 text-cyan-300 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Heart className="w-4 h-4 text-pink-400" />
              Wishlist
              {wishlist.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-pink-950 border border-pink-500/30 text-pink-400">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('achievements')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 relative ${
                activeTab === 'achievements'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-cyan-400/10 border border-cyan-500/40 text-cyan-300 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              Achievements
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-amber-950 border border-amber-500/30 text-amber-400">
                {unlockedCount}/{achievements.length}
              </span>
            </button>
          </nav>

          {/* Search Bar with live dropdown */}
          <div ref={searchRef} className="relative flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search games, cyber tags, genres..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Instant Search Dropdown */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 rounded-xl bg-slate-900/95 border border-cyan-500/30 cyber-glow-cyan backdrop-blur-xl shadow-2xl overflow-hidden z-50">
                <div className="p-2 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>SEARCH RESULTS ({searchResults.length})</span>
                  <span>PRESS ESC TO CLOSE</span>
                </div>
                <div className="divide-y divide-slate-800/60 max-h-80 overflow-y-auto">
                  {searchResults.map((game) => (
                    <div
                      key={game.id}
                      onClick={() => {
                        openGameDetails(game);
                        setIsSearchOpen(false);
                      }}
                      className="p-3 flex items-center gap-3 hover:bg-slate-800/70 cursor-pointer transition-colors group"
                    >
                      <img
                        src={game.coverImage}
                        alt={game.title}
                        className="w-12 h-14 rounded-lg object-cover border border-slate-700 group-hover:border-cyan-400 transition-colors"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                          {game.title}
                        </h4>
                        <p className="text-xs text-slate-400 truncate">
                          {game.genres.slice(0, 2).join(' • ')}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-400">
                            ★ {game.rating}
                          </span>
                          <span className="text-xs font-bold text-slate-200">
                            {game.isFree ? 'FREE' : `$${game.price.toFixed(2)}`}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Action Icons & Profile Pill */}
          <div className="flex items-center gap-2.5">
            
            {/* Sound FX Toggle */}
            <button
              onClick={handleSoundToggle}
              title={soundEnabled ? 'Disable Cyber Audio FX' : 'Enable Cyber Audio FX'}
              className={`p-2.5 rounded-xl border transition-all duration-200 ${
                soundEnabled
                  ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-400 shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>

            {/* About Modal Launcher */}
            <button
              onClick={() => setIsAboutModalOpen(true)}
              title="About Project & Creator"
              className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-200"
            >
              <Info className="w-5 h-5" />
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-200"
              title="View Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-mono font-bold text-[11px] flex items-center justify-center border-2 border-slate-950 shadow-lg animate-pulse">
                  {cart.length}
                </span>
              )}
            </button>

            {/* User Profile Pill */}
            <button
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800/60 transition-all duration-200 group"
            >
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.gamerTag}
                  className="w-8 h-8 rounded-lg object-cover border border-cyan-400/50 group-hover:scale-105 transition-transform"
                />
                <span className="absolute -bottom-1 -right-1 text-[9px] font-mono font-bold px-1 rounded bg-cyan-950 border border-cyan-400 text-cyan-300">
                  {profile.level}
                </span>
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors font-mono">
                  {profile.gamerTag}
                </p>
                <div className="flex items-center gap-1.5">
                  <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-400 to-purple-500" 
                      style={{ width: `${Math.min(100, (profile.xp / profile.xpToNextLevel) * 100)}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {profile.xp} XP
                  </span>
                </div>
              </div>
            </button>

          </div>

        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex lg:hidden items-center justify-around py-2.5 border-t border-slate-800/60 text-xs">
          <button
            onClick={() => setActiveTab('store')}
            className={`flex items-center gap-1.5 py-1 px-3 rounded-lg font-semibold tracking-wide ${
              activeTab === 'store' ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/30' : 'text-slate-400'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            Store
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-1.5 py-1 px-3 rounded-lg font-semibold tracking-wide ${
              activeTab === 'library' ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/30' : 'text-slate-400'
            }`}
          >
            <Library className="w-3.5 h-3.5" />
            Library ({library.length})
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`flex items-center gap-1.5 py-1 px-3 rounded-lg font-semibold tracking-wide ${
              activeTab === 'wishlist' ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/30' : 'text-slate-400'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            Wishlist ({wishlist.length})
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex items-center gap-1.5 py-1 px-3 rounded-lg font-semibold tracking-wide ${
              activeTab === 'achievements' ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/30' : 'text-slate-400'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            XP ({unlockedCount})
          </button>
        </div>

      </div>
    </header>
  );
};

