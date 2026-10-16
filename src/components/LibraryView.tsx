/**
 * Nexus Arcade - User Game Library View
 * Author: Omar Khlifi
 * License: MIT
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { useUser } from '../context/UserContext';
import { 
  Play, 
  Clock, 
  Key, 
  Copy, 
  Check, 
  Gamepad2, 
  Sparkles, 
  CloudLightning, 
  Search,
  ExternalLink
} from 'lucide-react';

export const LibraryView: React.FC = () => {
  const { library, openGameDetails, openTrailer, setActiveTab } = useGame();
  const { sounds } = useUser();

  const [activeGameRunning, setActiveGameRunning] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filteredLibrary = library.filter(item => 
    item.game.title.toLowerCase().includes(search.toLowerCase()) ||
    item.game.developer.toLowerCase().includes(search.toLowerCase())
  );

  const handleLaunch = (gameId: string) => {
    sounds.playAction();
    setActiveGameRunning(gameId);
    setTimeout(() => {
      setActiveGameRunning(null);
    }, 6000);
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard?.writeText(key);
    setCopiedKey(key);
    sounds.playClick();
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (library.length === 0) {
    return (
      <div className="text-center py-20 px-4 rounded-3xl cyber-glass border border-slate-800 space-y-4 max-w-xl mx-auto my-8">
        <div className="w-16 h-16 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 mx-auto flex items-center justify-center text-cyan-400 cyber-glow-cyan">
          <Gamepad2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-white font-['Orbitron']">
          Your Library Is Empty
        </h3>
        <p className="text-sm text-slate-400">
          Acquire titles from the storefront to install, stream, and manage your cyber collection.
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
      {/* Library Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-['Orbitron'] flex items-center gap-2.5">
            <Gamepad2 className="w-6 h-6 text-emerald-400" />
            Neural Library
            <span className="text-xs px-2 py-0.5 rounded-full font-mono font-bold bg-emerald-950 border border-emerald-500/40 text-emerald-400">
              {library.length} TITLES
            </span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Verified Digital Entitlements & Cloud Sync Active
          </p>
        </div>

        {/* Library Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search installed titles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Library Game Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLibrary.map((item) => {
          const isRunning = activeGameRunning === item.gameId;

          return (
            <motion.div
              key={item.gameId}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`rounded-2xl cyber-glass-card border overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                isRunning ? 'border-emerald-400 cyber-glow-emerald' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-black">
                <img
                  src={item.game.bannerImage}
                  alt={item.game.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold flex items-center gap-1 border backdrop-blur-md ${
                    isRunning 
                      ? 'bg-emerald-950 border-emerald-400 text-emerald-300 animate-pulse' 
                      : 'bg-slate-900/80 border-slate-700 text-cyan-400'
                  }`}>
                    {isRunning ? <CloudLightning className="w-3 h-3 text-emerald-400" /> : <Check className="w-3 h-3" />}
                    {isRunning ? 'RUNNING / IN SESSION' : item.status}
                  </span>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleLaunch(item.gameId)}
                    disabled={isRunning}
                    className={`px-6 py-3 rounded-2xl font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-2xl transition-all duration-300 ${
                      isRunning
                        ? 'bg-emerald-500 text-black cursor-default cyber-glow-emerald'
                        : 'bg-cyan-500 hover:bg-cyan-400 text-black hover:scale-105 cyber-glow-cyan'
                    }`}
                  >
                    <Play className={`w-4 h-4 fill-black ${isRunning ? 'animate-spin' : ''}`} />
                    {isRunning ? 'Launching Mainframe...' : 'Launch Title'}
                  </button>
                </div>
              </div>

              {/* Card Meta Details */}
              <div className="p-5 space-y-4">
                <div>
                  <h3 
                    onClick={() => openGameDetails(item.game)}
                    className="text-lg font-bold text-white hover:text-cyan-400 transition-colors cursor-pointer truncate font-['Orbitron']"
                  >
                    {item.game.title}
                  </h3>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {item.game.developer}
                  </p>
                </div>

                {/* Playtime & Acquisition Date */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div>
                    <span className="text-slate-500 block">PLAYTIME</span>
                    <span className="text-slate-200 font-bold flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {item.hoursPlayed} hrs
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">LAST LAUNCH</span>
                    <span className="text-slate-200 font-bold mt-0.5 block truncate">
                      {item.lastPlayed || 'Recent'}
                    </span>
                  </div>
                </div>

                {/* Digital Key & Details button */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                  <button
                    onClick={() => handleCopyKey(item.licenseKey)}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 font-mono transition-colors"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>{copiedKey === item.licenseKey ? 'Key Copied!' : 'License Key'}</span>
                  </button>

                  <button
                    onClick={() => openGameDetails(item.game)}
                    className="text-cyan-400 hover:underline font-mono text-[11px]"
                  >
                    View Specs & Reviews →
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

