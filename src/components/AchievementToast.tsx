/**
 * Nexus Arcade - Achievement Notification Toast
 * Author: Omar Khlifi
 * License: MIT
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { Trophy, Zap, X, Heart, ShoppingCart, Tag, CreditCard, PlaySquare, Eye, Volume2 } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-5 h-5 text-cyan-400" />,
  Eye: <Eye className="w-5 h-5 text-emerald-400" />,
  Heart: <Heart className="w-5 h-5 text-pink-400" />,
  ShoppingCart: <ShoppingCart className="w-5 h-5 text-purple-400" />,
  Tag: <Tag className="w-5 h-5 text-amber-400" />,
  CreditCard: <CreditCard className="w-5 h-5 text-cyan-400" />,
  PlaySquare: <PlaySquare className="w-5 h-5 text-rose-400" />,
  Volume2: <Volume2 className="w-5 h-5 text-blue-400" />,
};

export const AchievementToast: React.FC = () => {
  const { activeToast, clearToast } = useUser();

  return (
    <AnimatePresence>
      {activeToast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full"
        >
          <div className="relative p-4 rounded-xl cyber-glass border border-cyan-500/40 cyber-glow-cyan overflow-hidden bg-slate-950/90 shadow-2xl">
            {/* Top scanning line effect */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center shrink-0">
                {iconMap[activeToast.iconName] || <Trophy className="w-5 h-5 text-amber-400" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-400 font-mono">
                    ACHIEVEMENT UNLOCKED
                  </span>
                  <button
                    onClick={clearToast}
                    className="text-slate-400 hover:text-white transition-colors p-0.5"
                    aria-label="Close notification"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h4 className="mt-1 text-sm font-bold text-white tracking-wide truncate">
                  {activeToast.title}
                </h4>
                <p className="text-xs text-slate-300 mt-0.5 line-clamp-2">
                  {activeToast.description}
                </p>

                <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-400 font-mono">
                  <Zap className="w-3.5 h-3.5 fill-emerald-400" />
                  <span>+{activeToast.xpReward} XP REWARDED</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

