/**
 * Nexus Arcade - Cyber Footer & Brand Showcase
 * Author: Omar Khlifi
 * License: MIT
 */

import React from 'react';
import { useGame } from '../context/GameContext';
import { 
  Gamepad2, 
  Globe, 
  ShieldCheck, 
  Heart, 
  Terminal, 
  Radio, 
  Cpu
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

export const Footer: React.FC = () => {
  const { setActiveTab, setSelectedGenre, setIsAboutModalOpen } = useGame();

  const handleGenreClick = (genre: string) => {
    setSelectedGenre(genre);
    setActiveTab('store');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xl relative overflow-hidden">
      {/* Top subtle glow line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info & Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/40 cyber-glow-cyan">
                <Gamepad2 className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-wider text-white font-['Orbitron']">
                  NEXUS ARCADE
                </span>
                <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-cyan-950 border border-cyan-500/30 text-cyan-400">
                  v2.6
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed font-sans max-w-sm">
              The premier next-generation client-side gaming hub & digital storefront. Built with high-octane cyber aesthetics, instant reactive filters, simulated blockchain keys, and gamified achievement progression.
            </p>

            {/* Author Credit Badge */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono inline-flex items-center gap-2">
              <span className="text-slate-500">ENGINEERED BY:</span>
              <span className="text-cyan-400 font-bold">Omar Khlifi</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">MIT LICENSE</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/omarkhlifi"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-cyan-500 hover:text-black text-slate-300 border border-slate-800 transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/omarkhlifi"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-cyan-500 hover:text-black text-slate-300 border border-slate-800 transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://omarkhlifi.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-cyan-500 hover:text-black text-slate-300 border border-slate-800 transition-colors"
                title="Portfolio"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Hub Navigation */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-sans">
              <li>
                <button onClick={() => { setActiveTab('store'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-cyan-400 transition-colors">
                  Storefront Spotlight
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('library'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-cyan-400 transition-colors">
                  My Digital Library
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('wishlist'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-cyan-400 transition-colors">
                  Saved Wishlist
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('achievements'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-cyan-400 transition-colors">
                  Achievement Matrix
                </button>
              </li>
              <li>
                <button onClick={() => setIsAboutModalOpen(true)} className="hover:text-cyan-400 transition-colors">
                  System Architecture
                </button>
              </li>
            </ul>
          </div>

          {/* Featured Genres */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              Cyber Sectors
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-sans">
              <li>
                <button onClick={() => handleGenreClick('Cyberpunk')} className="hover:text-cyan-400 transition-colors">
                  Cyberpunk RPGs
                </button>
              </li>
              <li>
                <button onClick={() => handleGenreClick('Action')} className="hover:text-cyan-400 transition-colors">
                  High-Octane Action
                </button>
              </li>
              <li>
                <button onClick={() => handleGenreClick('Tactical Shooter')} className="hover:text-cyan-400 transition-colors">
                  Esports Shooters
                </button>
              </li>
              <li>
                <button onClick={() => handleGenreClick('VR')} className="hover:text-cyan-400 transition-colors">
                  Virtual Reality 6DOF
                </button>
              </li>
              <li>
                <button onClick={() => handleGenreClick('Indie')} className="hover:text-cyan-400 transition-colors">
                  Artisanal Indies
                </button>
              </li>
            </ul>
          </div>

          {/* System Telemetry & Status */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              Telemetry
            </h4>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-bold">ALL NODES ONLINE</span>
              </div>
              <div className="text-[11px] text-slate-400 space-y-1">
                <div>Latency: <span className="text-slate-200">12ms (Global Edge)</span></div>
                <div>Runtime: <span className="text-slate-200">Static / GH Pages</span></div>
                <div>Uptime: <span className="text-slate-200">99.98%</span></div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & MIT Notice */}
        <div className="mt-12 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-300">Nexus Arcade</strong>. Designed & Developed by <a href="https://omarkhlifi.com" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">Omar Khlifi</a>.
          </div>
          <div className="flex items-center gap-4">
            <span>Client-Side Static SPA</span>
            <span>•</span>
            <span>MIT License</span>
            <span>•</span>
            <button onClick={() => setIsAboutModalOpen(true)} className="text-slate-400 hover:text-white transition-colors">
              About & Rights
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
