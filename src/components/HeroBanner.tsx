/**
 * Nexus Arcade - Spotlight Hero Carousel
 * Author: Omar Khlifi
 * License: MIT
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Game } from '../types';
import { 
  Play, 
  Info, 
  ShoppingCart, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Star,
  Monitor,
  Flame,
  Gamepad
} from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { 
    games, 
    openGameDetails, 
    openTrailer, 
    addToCart, 
    cart, 
    isInLibrary 
  } = useGame();

  const featuredGames = games.filter(g => g.featured);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentGame: Game = featuredGames[currentIndex] || games[0];

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % featuredGames.length);
  }, [featuredGames.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + featuredGames.length) % featuredGames.length);
  }, [featuredGames.length]);

  // Auto-play timer (every 6 seconds unless paused)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  const inCart = cart.some(item => item.game.id === currentGame.id);
  const inLibrary = isInLibrary(currentGame.id);

  return (
    <section 
      className="relative w-full rounded-3xl overflow-hidden border border-slate-800 shadow-2xl mb-12 bg-slate-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Banner with animated transition */}
      <div className="relative h-[480px] sm:h-[540px] lg:h-[600px] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentGame.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <img
              src={currentGame.bannerImage}
              alt={currentGame.title}
              className="w-full h-full object-cover object-center"
            />
            
            {/* Multi-layered Cyber Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-[#080b11]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080b11] via-[#080b11]/80 to-transparent max-w-4xl" />
            
            {/* Scanline pattern */}
            <div className="absolute inset-0 cyber-scanline opacity-40 pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-14 max-w-3xl z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentGame.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {/* Badges & Meta Pill */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/80 border border-cyan-400 text-cyan-300 cyber-glow-cyan">
                  <Flame className="w-3.5 h-3.5 fill-cyan-400" />
                  SPOTLIGHT FEATURE
                </span>

                {currentGame.badges?.map((badge, idx) => (
                  <span 
                    key={idx}
                    className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-slate-900/80 border border-purple-500/30 text-purple-300 backdrop-blur-md"
                  >
                    ★ {badge}
                  </span>
                ))}

                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
                  METASCORE: {currentGame.rating}
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Orbitron'] text-white tracking-wide leading-tight">
                  {currentGame.title}
                </h1>
                <p className="mt-2 text-base sm:text-lg text-cyan-100/90 font-medium line-clamp-2 drop-shadow-md">
                  {currentGame.tagline}
                </p>
              </div>

              {/* Genres & Platforms */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-300 font-mono">
                <span className="text-cyan-400 font-bold">{currentGame.developer}</span>
                <span>•</span>
                {currentGame.genres.map(g => (
                  <span key={g} className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700">
                    {g}
                  </span>
                ))}
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Monitor className="w-3.5 h-3.5" />
                  {currentGame.platforms.join(', ')}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                
                {/* Watch Trailer CTA */}
                <button
                  onClick={() => openTrailer(currentGame)}
                  className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-sm tracking-wider uppercase transition-all duration-300 shadow-lg cyber-glow-cyan group"
                >
                  <Play className="w-4 h-4 fill-black group-hover:scale-110 transition-transform" />
                  Play Trailer
                </button>

                {/* Inspect Details CTA */}
                <button
                  onClick={() => openGameDetails(currentGame)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400/50 text-white font-semibold text-sm transition-all duration-200 backdrop-blur-md"
                >
                  <Info className="w-4 h-4 text-cyan-400" />
                  Details & Specs
                </button>

                {/* Add to Cart / Owned Button */}
                {inLibrary ? (
                  <span className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-sm font-semibold">
                    <Check className="w-4 h-4" />
                    In Your Library
                  </span>
                ) : (
                  <button
                    onClick={() => addToCart(currentGame)}
                    disabled={inCart}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      inCart
                        ? 'bg-purple-950/80 border border-purple-500/40 text-purple-300 cursor-default'
                        : 'bg-slate-900/80 hover:bg-purple-900/50 border border-purple-500/40 text-purple-300 hover:text-white'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {inCart ? 'Added to Cart' : currentGame.isFree ? 'Claim Free' : `Buy $${currentGame.price.toFixed(2)}`}
                  </button>
                )}

              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Slider Controls */}
        <div className="absolute right-6 bottom-6 flex items-center gap-2 z-20">
          <button
            onClick={handlePrev}
            aria-label="Previous Spotlight"
            className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-white transition-all backdrop-blur-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            {featuredGames.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next Spotlight"
            className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-white transition-all backdrop-blur-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Animated Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800/80">
          <motion.div
            key={currentIndex}
            initial={{ width: '0%' }}
            animate={{ width: isPaused ? '0%' : '100%' }}
            transition={{ duration: 6, ease: 'linear' }}
            className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400"
          />
        </div>

      </div>
    </section>
  );
};

