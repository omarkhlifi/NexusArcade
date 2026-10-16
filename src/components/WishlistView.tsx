/**
 * Nexus Arcade - User Wishlist View
 * Author: Omar Khlifi
 * License: MIT
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  Play, 
  Sparkles, 
  ArrowRight,
  Monitor
} from 'lucide-react';

export const WishlistView: React.FC = () => {
  const { 
    games, 
    wishlist, 
    toggleWishlist, 
    addToCart, 
    openGameDetails, 
    openTrailer, 
    cart, 
    isInLibrary,
    setActiveTab 
  } = useGame();

  const wishlistedGames = games.filter(g => wishlist.includes(g.id));

  if (wishlistedGames.length === 0) {
    return (
      <div className="text-center py-20 px-4 rounded-3xl cyber-glass border border-slate-800 space-y-4 max-w-xl mx-auto my-8">
        <div className="w-16 h-16 rounded-2xl bg-pink-950/60 border border-pink-500/30 mx-auto flex items-center justify-center text-pink-400">
          <Heart className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-white font-['Orbitron']">
          Your Wishlist Is Clear
        </h3>
        <p className="text-sm text-slate-400">
          Save upcoming titles, track discounts, and bookmark anticipated releases from the storefront.
        </p>
        <button
          onClick={() => setActiveTab('store')}
          className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors cyber-glow-cyan"
        >
          Explore Storefront
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Wishlist Header */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-['Orbitron'] flex items-center gap-2.5">
            <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
            Saved Wishlist
            <span className="text-xs px-2 py-0.5 rounded-full font-mono font-bold bg-pink-950 border border-pink-500/40 text-pink-400">
              {wishlistedGames.length} TITLES
            </span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Tracking price reductions and special editions
          </p>
        </div>
      </div>

      {/* Wishlist Item List */}
      <div className="space-y-4">
        <AnimatePresence>
          {wishlistedGames.map((game) => {
            const inCart = cart.some(item => item.game.id === game.id);
            const inLibrary = isInLibrary(game.id);

            return (
              <motion.div
                key={game.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-4 sm:p-5 rounded-2xl cyber-glass-card border border-slate-800 hover:border-pink-500/40 flex flex-col sm:flex-row items-center justify-between gap-5 transition-all"
              >
                <div 
                  onClick={() => openGameDetails(game)}
                  className="flex items-center gap-4 flex-1 min-w-0 cursor-pointer w-full sm:w-auto"
                >
                  <img
                    src={game.coverImage}
                    alt={game.title}
                    className="w-20 h-24 rounded-xl object-cover border border-slate-700 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-400">
                        METASCORE: {game.rating}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {game.genres[0]}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white hover:text-cyan-400 transition-colors truncate mt-1">
                      {game.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {game.tagline}
                    </p>

                    <div className="mt-2 flex items-center gap-2 text-xs font-mono">
                      <span className="text-slate-500">RELEASED: {game.releaseDate}</span>
                    </div>
                  </div>
                </div>

                {/* Pricing & Move to Cart */}
                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  <div className="text-left sm:text-right">
                    {game.isFree ? (
                      <span className="text-base font-bold text-emerald-400 font-mono">FREE</span>
                    ) : game.discountPercent ? (
                      <div>
                        <div className="flex items-center gap-1.5 justify-start sm:justify-end">
                          <span className="text-xs text-slate-500 line-through font-mono">
                            ${game.price.toFixed(2)}
                          </span>
                          <span className="text-xs px-1.5 py-0.2 rounded bg-purple-950 border border-purple-500/40 text-purple-300 font-mono font-bold">
                            -{game.discountPercent}%
                          </span>
                        </div>
                        <span className="text-lg font-bold text-white font-mono">
                          ${(game.price * (1 - game.discountPercent / 100)).toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-white font-mono">
                        ${game.price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openTrailer(game)}
                      className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-400"
                      title="Play Trailer"
                    >
                      <Play className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => toggleWishlist(game.id)}
                      className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-rose-400 hover:bg-rose-950/40 hover:border-rose-500/40"
                      title="Remove from Wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {!inLibrary && (
                      <button
                        onClick={() => addToCart(game)}
                        disabled={inCart}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-2 transition-all ${
                          inCart
                            ? 'bg-purple-950 border border-purple-500/40 text-purple-300'
                            : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-md cyber-glow-cyan'
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>{inCart ? 'In Cart' : 'Acquire'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

