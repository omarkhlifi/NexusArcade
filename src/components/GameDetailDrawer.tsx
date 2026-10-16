/**
 * Nexus Arcade - Interactive Game Detail Drawer & Modal
 * Author: Omar Khlifi
 * License: MIT
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { useUser } from '../context/UserContext';
import { 
  X, 
  Play, 
  Heart, 
  ShoppingCart, 
  Check, 
  Star, 
  Cpu, 
  HardDrive, 
  Monitor, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  Building2, 
  Send,
  CheckCircle2,
  Share2,
  ExternalLink
} from 'lucide-react';

export const GameDetailDrawer: React.FC = () => {
  const { 
    selectedGame, 
    closeGameDetails, 
    openTrailer, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    cart, 
    isInLibrary,
    addReview 
  } = useGame();

  const { profile } = useUser();

  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [selectedEdition, setSelectedEdition] = useState<'Standard' | 'Deluxe Cyber Edition' | 'Collector Edition'>('Standard');
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!selectedGame) return null;

  const isWishlisted = isInWishlist(selectedGame.id);
  const inCart = cart.some(item => item.game.id === selectedGame.id);
  const inLibrary = isInLibrary(selectedGame.id);

  // Calculate pricing for editions
  const basePrice = selectedGame.price;
  const editionPrices = {
    'Standard': basePrice,
    'Deluxe Cyber Edition': Math.round(basePrice * 1.3 * 100) / 100,
    'Collector Edition': Math.round(basePrice * 1.6 * 100) / 100,
  };

  const currentPrice = editionPrices[selectedEdition];
  const galleryImages = [selectedGame.bannerImage, ...selectedGame.screenshots];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim()) return;

    addReview(selectedGame.id, {
      rating: userRating,
      comment: userComment.trim(),
    });

    setUserComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeGameDetails}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <div className="flex min-h-full items-center justify-center p-2 sm:p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl rounded-3xl cyber-glass border border-cyan-500/30 shadow-2xl overflow-hidden bg-slate-950/95 my-8"
          >
            {/* Close Button */}
            <button
              onClick={closeGameDetails}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition-colors backdrop-blur-md"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Hero Media Section */}
            <div className="relative aspect-[16/9] max-h-[460px] w-full overflow-hidden bg-black">
              <img
                src={galleryImages[activeMediaIndex]}
                alt={selectedGame.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Play Trailer Floating Trigger */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => openTrailer(selectedGame)}
                  className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-cyan-500/90 hover:bg-cyan-400 text-black font-extrabold text-sm uppercase tracking-wider transition-all duration-300 shadow-2xl cyber-glow-cyan hover:scale-105"
                >
                  <Play className="w-5 h-5 fill-black" />
                  Launch Trailer Simulation
                </button>
              </div>

              {/* Title & Developer overlay at bottom of hero */}
              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-emerald-950/90 border border-emerald-500 text-emerald-400">
                      METASCORE: {selectedGame.rating}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-xs font-mono bg-slate-900 border border-slate-700 text-slate-300">
                      ESRB {selectedGame.esrbRating}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-black text-white font-['Orbitron']">
                    {selectedGame.title}
                  </h2>
                </div>

                <button
                  onClick={handleShare}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-cyan-400 text-xs font-mono backdrop-blur-md transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  {copiedLink ? 'Link Copied!' : 'Share'}
                </button>
              </div>
            </div>

            {/* Media Gallery Thumbnails */}
            <div className="flex items-center gap-2 p-4 bg-slate-900/60 border-b border-slate-800 overflow-x-auto scrollbar-none">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMediaIndex(idx)}
                  className={`relative w-20 sm:w-24 aspect-[16/9] rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                    activeMediaIndex === idx
                      ? 'border-cyan-400 scale-105 shadow-md cyber-glow-cyan'
                      : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Content Body: 2 Columns */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Description, Specs, Reviews (2/3 width) */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* About & Story */}
                <div>
                  <h3 className="text-lg font-bold text-white font-['Orbitron'] mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    Neural Dossier
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                    {selectedGame.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    {selectedGame.genres.map(genre => (
                      <span
                        key={genre}
                        className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-cyan-950/40 border border-cyan-500/30 text-cyan-300"
                      >
                        {genre}
                      </span>
                    ))}
                    {selectedGame.badges?.map(badge => (
                      <span
                        key={badge}
                        className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-purple-950/40 border border-purple-500/30 text-purple-300"
                      >
                        ★ {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* PC Hardware Requirements Table */}
                <div>
                  <h3 className="text-lg font-bold text-white font-['Orbitron'] mb-3 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    System Specifications Matrix
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Minimum Specs */}
                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                      <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-3">
                        Minimum Specifications
                      </h4>
                      <dl className="space-y-2 text-xs">
                        <div>
                          <dt className="text-slate-400">OS:</dt>
                          <dd className="text-white font-semibold">{selectedGame.specs.minimum.os}</dd>
                        </div>
                        <div>
                          <dt className="text-slate-400">Processor:</dt>
                          <dd className="text-white font-semibold">{selectedGame.specs.minimum.cpu}</dd>
                        </div>
                        <div>
                          <dt className="text-slate-400">Graphics:</dt>
                          <dd className="text-white font-semibold">{selectedGame.specs.minimum.gpu}</dd>
                        </div>
                        <div>
                          <dt className="text-slate-400">Memory:</dt>
                          <dd className="text-white font-semibold">{selectedGame.specs.minimum.ram}</dd>
                        </div>
                        <div>
                          <dt className="text-slate-400">Storage:</dt>
                          <dd className="text-white font-semibold">{selectedGame.specs.minimum.storage}</dd>
                        </div>
                      </dl>
                    </div>

                    {/* Recommended Specs */}
                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-cyan-500/20 cyber-glow-cyan">
                      <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-3">
                        Recommended (60+ FPS Ultra)
                      </h4>
                      <dl className="space-y-2 text-xs">
                        <div>
                          <dt className="text-slate-400">OS:</dt>
                          <dd className="text-white font-semibold">{selectedGame.specs.recommended.os}</dd>
                        </div>
                        <div>
                          <dt className="text-slate-400">Processor:</dt>
                          <dd className="text-white font-semibold">{selectedGame.specs.recommended.cpu}</dd>
                        </div>
                        <div>
                          <dt className="text-slate-400">Graphics:</dt>
                          <dd className="text-white font-semibold">{selectedGame.specs.recommended.gpu}</dd>
                        </div>
                        <div>
                          <dt className="text-slate-400">Memory:</dt>
                          <dd className="text-white font-semibold">{selectedGame.specs.recommended.ram}</dd>
                        </div>
                        <div>
                          <dt className="text-slate-400">Storage:</dt>
                          <dd className="text-white font-semibold">{selectedGame.specs.recommended.storage}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>

                {/* User Reviews & Rating Breakdown */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white font-['Orbitron'] flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-400" />
                      Community Ratings ({selectedGame.reviewCount.toLocaleString()})
                    </h3>
                    <div className="flex items-center gap-1.5 text-amber-400 font-mono font-bold text-sm">
                      <Star className="w-4 h-4 fill-amber-400" />
                      {selectedGame.communityRating} / 5.0
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-3">
                    {selectedGame.reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800"
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={rev.avatar}
                              alt={rev.author}
                              className="w-7 h-7 rounded-full object-cover border border-cyan-400/40"
                            />
                            <div>
                              <span className="text-xs font-bold text-white font-mono">
                                {rev.author}
                              </span>
                              {rev.verifiedBuyer && (
                                <span className="ml-2 text-[10px] text-emerald-400 font-mono">
                                  ✓ Verified Acquisition
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 text-amber-400 text-xs">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400' : 'text-slate-600'}`}
                              />
                            ))}
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-300">
                          {rev.comment}
                        </p>
                        
                        <div className="mt-2 text-[11px] text-slate-500 font-mono">
                          Posted on {rev.date} • {rev.helpfulCount} pilots found this helpful
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Write a simulated review */}
                  <form onSubmit={handleReviewSubmit} className="mt-6 p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">
                      Submit Your Player Review
                    </h4>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-slate-400">Score:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setUserRating(star)}
                            className="p-1 text-amber-400 hover:scale-110 transition-transform"
                          >
                            <Star className={`w-4 h-4 ${star <= userRating ? 'fill-amber-400' : 'text-slate-600'}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Share your gameplay impressions..."
                        value={userComment}
                        onChange={(e) => setUserComment(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs uppercase flex items-center gap-1.5 tracking-wider transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Post
                      </button>
                    </div>

                    {reviewSubmitted && (
                      <p className="text-xs font-mono text-emerald-400 mt-2 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Review broadcasted to Nexus network! +50 XP
                      </p>
                    )}
                  </form>
                </div>

              </div>

              {/* Right Column: Edition Selector, Meta Details & Buy CTA (1/3 width) */}
              <div className="space-y-6">
                
                {/* Requisition Card */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700/80 cyber-glass space-y-4">
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Select Digital Edition
                  </h4>

                  <div className="space-y-2">
                    {(['Standard', 'Deluxe Cyber Edition', 'Collector Edition'] as const).map((edition) => (
                      <div
                        key={edition}
                        onClick={() => setSelectedEdition(edition)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          selectedEdition === edition
                            ? 'bg-cyan-950/60 border-cyan-400 cyber-glow-cyan text-white'
                            : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-bold font-mono">
                          <span>{edition}</span>
                          <span className="text-cyan-400">
                            {selectedGame.isFree ? 'FREE' : `$${editionPrices[edition].toFixed(2)}`}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">
                          {edition === 'Standard' && 'Full digital base game + Day One Patch'}
                          {edition === 'Deluxe Cyber Edition' && 'Includes Season Pass & Digital OST'}
                          {edition === 'Collector Edition' && 'Includes Artbook, Holo-Skin & Season Pass'}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Pricing summary */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">Total Price:</span>
                    <span className="text-2xl font-black font-mono text-white">
                      {selectedGame.isFree ? 'FREE' : `$${currentPrice.toFixed(2)}`}
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="space-y-2 pt-2">
                    {inLibrary ? (
                      <div className="w-full py-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-center font-bold text-sm flex items-center justify-center gap-2">
                        <Check className="w-4 h-4" />
                        In Your Library
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(selectedGame, selectedEdition)}
                        disabled={inCart}
                        className={`w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                          inCart
                            ? 'bg-purple-950 border border-purple-500/40 text-purple-300 cursor-default'
                            : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-lg cyber-glow-cyan'
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {inCart ? 'Already In Cart' : selectedGame.isFree ? 'Claim Free License' : 'Add to Cart'}
                      </button>
                    )}

                    <button
                      onClick={() => toggleWishlist(selectedGame.id)}
                      className={`w-full py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                        isWishlisted
                          ? 'bg-pink-950/60 border-pink-500 text-pink-400'
                          : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-pink-400' : ''}`} />
                      {isWishlisted ? 'On Your Wishlist' : 'Add to Wishlist'}
                    </button>
                  </div>
                </div>

                {/* Metadata Sidebar */}
                <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" />
                      Developer:
                    </span>
                    <span className="text-white font-mono font-semibold">{selectedGame.developer}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Publisher:</span>
                    <span className="text-white font-mono font-semibold">{selectedGame.publisher}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      Release Date:
                    </span>
                    <span className="text-white font-mono font-semibold">{selectedGame.releaseDate}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Monitor className="w-3.5 h-3.5" />
                      Platforms:
                    </span>
                    <span className="text-white font-mono font-semibold">{selectedGame.platforms.join(', ')}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">ESRB Rating:</span>
                    <span className="text-cyan-400 font-mono font-bold">Mature {selectedGame.esrbRating}</span>
                  </div>
                </div>

              </div>

            </div>

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

