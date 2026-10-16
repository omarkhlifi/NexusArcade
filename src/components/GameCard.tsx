/**
 * Nexus Arcade - Cyber Game Card
 * Author: Omar Khlifi
 * License: MIT
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Game } from '../types';
import { 
  Heart, 
  ShoppingCart, 
  Play, 
  Check, 
  Star, 
  Monitor, 
  Gamepad2, 
  Glasses, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface GameCardProps {
  game: Game;
  layout?: 'grid' | 'compact';
}

export const GameCard: React.FC<GameCardProps> = ({ game, layout = 'grid' }) => {
  const { 
    openGameDetails, 
    openTrailer, 
    toggleWishlist, 
    isInWishlist, 
    addToCart, 
    cart, 
    isInLibrary 
  } = useGame();

  const [imageLoaded, setImageLoaded] = useState(false);
  const isWishlisted = isInWishlist(game.id);
  const inCart = cart.some(item => item.game.id === game.id);
  const inLibrary = isInLibrary(game.id);

  // Platform icon helper
  const renderPlatformIcons = () => {
    return (
      <div className="flex items-center gap-1.5 text-slate-400">
        {game.platforms.includes('PC') && (
          <span title="PC"><Monitor className="w-3.5 h-3.5" /></span>
        )}
        {(game.platforms.includes('PlayStation 5') || game.platforms.includes('Xbox Series X')) && (
          <span title="Console"><Gamepad2 className="w-3.5 h-3.5" /></span>
        )}
        {game.platforms.includes('VR') && (
          <span title="VR Compatible"><Glasses className="w-3.5 h-3.5" /></span>
        )}
      </div>
    );
  };

  // Metascore color calculation
  const getMetascoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60';
    if (score >= 80) return 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60';
    return 'text-amber-400 border-amber-500/40 bg-amber-950/60';
  };

  if (layout === 'compact') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="group relative flex items-center justify-between p-3.5 rounded-2xl cyber-glass-card hover:border-cyan-400/50 transition-all duration-300 gap-4"
      >
        <div 
          onClick={() => openGameDetails(game)}
          className="flex items-center gap-4 flex-1 min-w-0 cursor-pointer"
        >
          <div className="relative w-20 h-24 rounded-xl overflow-hidden shrink-0 border border-slate-700 group-hover:border-cyan-400/60 transition-colors">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-slate-800 animate-pulse" />
            )}
            <img
              src={game.coverImage}
              alt={game.title}
              onLoad={() => setImageLoaded(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border ${getMetascoreColor(game.rating)}`}>
                {game.rating}
              </span>
              <span className="text-[10px] font-mono px-1 rounded bg-slate-800 border border-slate-700 text-slate-300">
                ESRB {game.esrbRating}
              </span>
              {renderPlatformIcons()}
            </div>

            <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors truncate mt-1">
              {game.title}
            </h3>

            <p className="text-xs text-slate-400 truncate mt-0.5">
              {game.developer} • {game.genres.slice(0, 3).join(', ')}
            </p>

            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-amber-400 font-mono">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{game.communityRating}</span>
              <span className="text-slate-500">({(game.reviewCount / 1000).toFixed(1)}k)</span>
            </div>
          </div>
        </div>

        {/* Compact Right Side Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            {game.isFree ? (
              <span className="text-sm font-bold text-emerald-400 font-mono">FREE</span>
            ) : (
              <div className="flex items-center gap-1.5 justify-end">
                {game.discountPercent ? (
                  <>
                    <span className="text-xs text-slate-500 line-through font-mono">
                      ${game.price.toFixed(2)}
                    </span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-purple-950 border border-purple-500/40 text-purple-300 font-mono font-bold">
                      -{game.discountPercent}%
                    </span>
                    <span className="text-sm font-bold text-white font-mono">
                      ${(game.price * (1 - game.discountPercent / 100)).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-sm font-bold text-white font-mono">
                    ${game.price.toFixed(2)}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => toggleWishlist(game.id)}
              aria-label="Wishlist toggle"
              className={`p-2 rounded-xl border transition-all ${
                isWishlisted
                  ? 'bg-pink-950/60 border-pink-500 text-pink-400'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-pink-400' : ''}`} />
            </button>

            <button
              onClick={() => openTrailer(game)}
              aria-label="Play trailer"
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
            >
              <Play className="w-4 h-4" />
            </button>

            {inLibrary ? (
              <span className="px-3 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                Owned
              </span>
            ) : (
              <button
                onClick={() => addToCart(game)}
                disabled={inCart}
                className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  inCart
                    ? 'bg-purple-950 border border-purple-500/40 text-purple-300'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-black font-bold shadow-md cyber-glow-cyan'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">{inCart ? 'In Cart' : 'Acquire'}</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Standard Grid Layout
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-2xl cyber-glass-card overflow-hidden flex flex-col h-full border border-slate-800 hover:border-cyan-400/50 hover:shadow-2xl hover:cyber-glow-cyan transition-all duration-300"
    >
      {/* Cover Artwork Container */}
      <div 
        onClick={() => openGameDetails(game)}
        className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden cursor-pointer bg-slate-950"
      >
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-slate-800 animate-pulse" />
        )}

        <img
          src={game.coverImage}
          alt={game.title}
          onLoad={() => setImageLoaded(true)}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />

        {/* Gradient Shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-transparent to-black/40 opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border backdrop-blur-md ${getMetascoreColor(game.rating)}`}>
              {game.rating}
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-slate-950/80 border border-slate-700 text-slate-300 backdrop-blur-md">
              {game.esrbRating}
            </span>
          </div>

          <div className="flex items-center gap-1 pointer-events-auto">
            {/* Quick Wishlist button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(game.id);
              }}
              title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              className={`p-2 rounded-xl backdrop-blur-md transition-all ${
                isWishlisted
                  ? 'bg-pink-950/80 border border-pink-400 text-pink-400'
                  : 'bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-pink-400 hover:border-pink-400/50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-pink-400' : ''}`} />
            </button>

            {/* Quick Trailer Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                openTrailer(game);
              }}
              title="Watch Trailer"
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 backdrop-blur-md transition-all"
            >
              <Play className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Hover Trailer Quick Preview Pill */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/90 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold cyber-glow-cyan backdrop-blur-md">
            <Play className="w-3.5 h-3.5 fill-cyan-300" />
            CLICK TO INSPECT
          </div>
        </div>

        {/* Discount ribbon if applicable */}
        {game.discountPercent && !game.isFree && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-black bg-purple-600 text-white shadow-lg cyber-glow-purple">
              -{game.discountPercent}% OFF
            </span>
          </div>
        )}
      </div>

      {/* Card Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3 bg-slate-900/40">
        <div>
          {/* Platform icons & Category */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              {game.genres[0]}
            </span>
            {renderPlatformIcons()}
          </div>

          {/* Title */}
          <h3 
            onClick={() => openGameDetails(game)}
            className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 cursor-pointer font-['Space_Grotesk']"
          >
            {game.title}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1">
            {game.tagline}
          </p>
        </div>

        {/* Footer: Rating, Price, & Action Button */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
          
          {/* Price display */}
          <div>
            {game.isFree ? (
              <span className="text-sm font-extrabold text-emerald-400 font-mono tracking-wide">
                FREE TO PLAY
              </span>
            ) : game.discountPercent ? (
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs text-slate-500 line-through font-mono">
                  ${game.price.toFixed(2)}
                </span>
                <span className="text-base font-extrabold text-white font-mono">
                  ${(game.price * (1 - game.discountPercent / 100)).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-base font-extrabold text-white font-mono">
                ${game.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Cart CTA */}
          {inLibrary ? (
            <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Check className="w-3.5 h-3.5" />
              Owned
            </span>
          ) : (
            <button
              onClick={() => addToCart(game)}
              disabled={inCart}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all duration-200 ${
                inCart
                  ? 'bg-purple-950/80 border border-purple-500/40 text-purple-300 cursor-default'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-black hover:shadow-lg cyber-glow-cyan active:scale-95'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              {inCart ? 'In Cart' : 'Acquire'}
            </button>
          )}

        </div>
      </div>
    </motion.div>
  );
};
