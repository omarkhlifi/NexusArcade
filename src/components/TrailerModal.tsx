/**
 * Nexus Arcade - Cyber Trailer Cinema Player
 * Author: Omar Khlifi
 * License: MIT
 */

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  ShoppingCart, 
  Check, 
  Film,
  Sparkles
} from 'lucide-react';

export const TrailerModal: React.FC = () => {
  const { trailerGame, closeTrailer, addToCart, cart, isInLibrary } = useGame();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  if (!trailerGame) return null;

  const inCart = cart.some(item => item.game.id === trailerGame.id);
  const inLibrary = isInLibrary(trailerGame.id);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeTrailer}
          className="fixed inset-0 bg-black/95 backdrop-blur-xl"
        />

        {/* Cinema Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-5xl rounded-3xl bg-slate-950 border border-cyan-500/40 cyber-glow-cyan overflow-hidden shadow-2xl z-10"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between p-4 bg-slate-900/90 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400">
                <Film className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white font-['Orbitron']">
                    {trailerGame.title}
                  </h3>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                    4K STREAM
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  Official Gameplay Reveal Trailer
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {inLibrary ? (
                <span className="text-xs font-mono font-bold text-emerald-400 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  In Library
                </span>
              ) : (
                <button
                  onClick={() => addToCart(trailerGame)}
                  disabled={inCart}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                    inCart
                      ? 'bg-purple-950 border border-purple-500/40 text-purple-300'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-md cyber-glow-cyan'
                  }`}
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  {inCart ? 'In Cart' : trailerGame.isFree ? 'Play Free' : `Buy $${trailerGame.price.toFixed(2)}`}
                </button>
              )}

              <button
                onClick={closeTrailer}
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="Exit cinema"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Video Player */}
          <div className="relative aspect-[16/9] w-full bg-black group">
            <video
              ref={videoRef}
              src={trailerGame.trailerVideoUrl}
              poster={trailerGame.bannerImage}
              autoPlay
              playsInline
              loop
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-contain cursor-pointer"
              onClick={togglePlay}
            />

            {/* In-Video Cyber Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/60 to-transparent flex items-center justify-between gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-md"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-md"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
                <span>SIMULATED FEED: 1080P // 60FPS</span>
                <button
                  onClick={handleFullscreen}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-md"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

