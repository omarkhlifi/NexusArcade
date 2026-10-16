/**
 * Nexus Arcade - Gamified User Profile Drawer & Achievements
 * Author: Omar Khlifi
 * License: MIT
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { useUser } from '../context/UserContext';
import { 
  X, 
  ShieldCheck, 
  Cpu, 
  Award, 
  Trophy, 
  Zap, 
  Coins, 
  User, 
  Sparkles, 
  CheckCircle2, 
  Lock,
  Edit2,
  Check
} from 'lucide-react';

const rarityColors = {
  Common: 'border-slate-600 bg-slate-900/60 text-slate-300',
  Rare: 'border-blue-500/40 bg-blue-950/40 text-blue-300',
  Epic: 'border-purple-500/40 bg-purple-950/40 text-purple-300',
  Legendary: 'border-amber-500/40 bg-amber-950/40 text-amber-300',
};

export const ProfileDrawer: React.FC = () => {
  const { isProfileOpen, setIsProfileOpen } = useGame();
  const { profile, achievements, sounds } = useUser();

  const [isEditingTag, setIsEditingTag] = useState(false);
  const [editedGamerTag, setEditedGamerTag] = useState(profile.gamerTag);

  if (!isProfileOpen) return null;

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const progressPercent = Math.min(100, Math.round((profile.xp / profile.xpToNextLevel) * 100));

  const handleSaveTag = () => {
    setIsEditingTag(false);
    profile.gamerTag = editedGamerTag;
    sounds.playSuccess();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsProfileOpen(false)}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="w-screen max-w-md bg-slate-950 border-l border-cyan-500/30 cyber-glow-cyan shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white font-['Orbitron']">
                  PILOT IDENTIFICATION
                </h3>
              </div>
              <button
                onClick={() => setIsProfileOpen(false)}
                className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                aria-label="Close profile"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Profile Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 relative overflow-hidden">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={profile.avatar}
                      alt={profile.gamerTag}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400 shadow-lg cyber-glow-cyan"
                    />
                    <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-md bg-cyan-950 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold">
                      LVL {profile.level}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    {isEditingTag ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editedGamerTag}
                          onChange={(e) => setEditedGamerTag(e.target.value)}
                          className="px-2 py-1 rounded bg-slate-800 text-sm font-bold text-white font-mono border border-cyan-400"
                        />
                        <button
                          onClick={handleSaveTag}
                          className="p-1 rounded bg-cyan-500 text-black"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-black text-white font-mono truncate">
                          {profile.gamerTag}
                        </h4>
                        <button
                          onClick={() => setIsEditingTag(true)}
                          className="text-slate-500 hover:text-cyan-400"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                    <p className="text-xs text-slate-400 font-sans mt-0.5">
                      {profile.title}
                    </p>
                    <p className="text-[10px] text-cyan-400 font-mono mt-1">
                      Wallet: {profile.walletAddress}
                    </p>
                  </div>
                </div>

                {/* Level & XP Progress Bar */}
                <div className="mt-5 space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">XP PROGRESS</span>
                    <span className="text-cyan-400 font-bold">
                      {profile.xp} / {profile.xpToNextLevel} XP ({progressPercent}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 rounded-full"
                    />
                  </div>
                </div>

                {/* Balance Pill */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-amber-400" />
                    Nexus Arcade Balance:
                  </span>
                  <span className="text-amber-400 font-bold text-sm">
                    {profile.nexusCredits.toLocaleString()} Credits
                  </span>
                </div>
              </div>

              {/* Badge Showcase */}
              <div>
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-purple-400" />
                  Service Medals & Badges
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {profile.badges.map((badge) => (
                    <div
                      key={badge.id}
                      className={`p-3 rounded-xl border flex items-center gap-3 ${rarityColors[badge.rarity]}`}
                    >
                      <div className="p-2 rounded-lg bg-black/40 border border-white/10 shrink-0">
                        <Award className="w-5 h-5 text-amber-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white font-mono">{badge.name}</span>
                          <span className="text-[10px] font-mono uppercase font-bold">{badge.rarity}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements Checklist */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-cyan-400" />
                    Achievements Tracker
                  </h4>
                  <span className="text-xs font-mono text-cyan-400 font-bold">
                    {unlockedCount} / {achievements.length} Unlocked
                  </span>
                </div>

                <div className="space-y-2.5">
                  {achievements.map((ach) => (
                    <div
                      key={ach.id}
                      className={`p-3 rounded-xl border transition-all ${
                        ach.unlocked
                          ? 'bg-cyan-950/30 border-cyan-500/30 text-white'
                          : 'bg-slate-900/30 border-slate-800 text-slate-500 opacity-60'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg shrink-0 ${
                          ach.unlocked ? 'bg-cyan-950 text-cyan-400 border border-cyan-400/40' : 'bg-slate-900 text-slate-600'
                        }`}>
                          {ach.unlocked ? <CheckCircle2 className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold font-mono text-slate-200">
                              {ach.title}
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                              <Zap className="w-3 h-3 fill-emerald-400" />
                              +{ach.xpReward} XP
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            {ach.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

