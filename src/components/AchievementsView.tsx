/**
 * Nexus Arcade - Achievements & Gamification Hub View
 * Author: Omar Khlifi
 * License: MIT
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { Achievement } from '../types';
import { 
  Trophy, 
  Zap, 
  CheckCircle2, 
  Lock, 
  Award, 
  Sparkles, 
  Layers, 
  Flame,
  ShieldCheck
} from 'lucide-react';

export const AchievementsView: React.FC = () => {
  const { achievements, profile } = useUser();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Explorer', 'Collector', 'Gamer', 'Community'];

  const filteredAchievements = selectedCategory === 'All'
    ? achievements
    : achievements.filter(a => a.category === selectedCategory);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const totalEarnedXp = achievements.filter(a => a.unlocked).reduce((acc, a) => acc + a.xpReward, 0);
  const totalPossibleXp = achievements.reduce((acc, a) => acc + a.xpReward, 0);
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="space-y-8">
      {/* Overview Trophy Header */}
      <div className="p-6 sm:p-8 rounded-3xl cyber-glass border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-purple-950/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-amber-950/80 border border-amber-400 text-amber-400 shadow-xl cyber-glow-cyan shrink-0">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white font-['Orbitron']">
                  ACHIEVEMENTS HUB
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full font-mono font-bold bg-cyan-950 border border-cyan-400 text-cyan-300">
                  LEVEL {profile.level}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-mono mt-1">
                Complete system objectives to level up, unlock cyber badges, and earn Nexus Credits.
              </p>
            </div>
          </div>

          {/* Stats Summary Counter */}
          <div className="flex items-center gap-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 font-mono text-xs">
            <div>
              <span className="text-slate-500 block uppercase">Unlocked</span>
              <span className="text-xl font-black text-cyan-400">
                {unlockedCount} / {totalCount}
              </span>
            </div>
            <div className="w-[1px] h-8 bg-slate-800" />
            <div>
              <span className="text-slate-500 block uppercase">XP Harvested</span>
              <span className="text-xl font-black text-emerald-400 flex items-center gap-1">
                <Zap className="w-4 h-4 fill-emerald-400" />
                {totalEarnedXp}
              </span>
            </div>
          </div>
        </div>

        {/* Global Completion Bar */}
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">MAINFRAME COMPLETION METRIC</span>
            <span className="text-cyan-400 font-bold">{completionPercentage}% COMPLETED</span>
          </div>
          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
              selectedCategory === cat
                ? 'bg-cyan-500 text-black shadow-lg cyber-glow-cyan'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Achievement Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAchievements.map((ach) => (
          <motion.div
            key={ach.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
              ach.unlocked
                ? 'bg-slate-900/60 border-cyan-500/40 cyber-glow-cyan'
                : 'bg-slate-950/40 border-slate-800/80 opacity-60'
            }`}
          >
            <div className={`p-3 rounded-xl shrink-0 ${
              ach.unlocked
                ? 'bg-cyan-950 border border-cyan-400 text-cyan-400'
                : 'bg-slate-900 border border-slate-800 text-slate-600'
            }`}>
              {ach.unlocked ? <CheckCircle2 className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white font-mono">
                  {ach.title}
                </h3>
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1 shrink-0">
                  <Zap className="w-3.5 h-3.5 fill-emerald-400" />
                  +{ach.xpReward} XP
                </span>
              </div>

              <p className="text-xs text-slate-400 mt-1">
                {ach.description}
              </p>

              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                  {ach.category}
                </span>
                <span className={ach.unlocked ? 'text-cyan-400 font-bold' : 'text-slate-600'}>
                  {ach.unlocked ? 'STATUS: UNLOCKED' : 'STATUS: ENCRYPTED'}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

