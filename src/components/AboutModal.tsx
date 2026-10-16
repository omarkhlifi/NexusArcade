/**
 * Nexus Arcade - About Project & Author Attribution Modal
 * Author: Omar Khlifi
 * License: MIT
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { 
  X, 
  Code2, 
  ShieldCheck, 
  FileCode2, 
  Globe, 
  ExternalLink, 
  Layers, 
  Cpu, 
  Sparkles, 
  Award,
  Terminal
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

export const AboutModal: React.FC = () => {
  const { isAboutModalOpen, setIsAboutModalOpen } = useGame();

  if (!isAboutModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAboutModalOpen(false)}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <div className="flex min-h-full items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl rounded-3xl cyber-glass border border-cyan-500/40 bg-slate-950 p-6 sm:p-8 shadow-2xl z-10"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsAboutModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-cyan-950/80 border border-cyan-400 text-cyan-400 cyber-glow-cyan">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white font-['Orbitron']">
                  NEXUS ARCADE
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Next-Gen Client-Side Gaming Hub & Storefront
                </p>
              </div>
            </div>

            {/* Architect & Lead Designer Spotlight */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-cyan-950/30 border border-cyan-500/30 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-400 text-cyan-300">
                      LEAD FRONTEND ARCHITECT
                    </span>
                    <span className="text-xs text-slate-400 font-mono">MIT License</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mt-1 font-mono">
                    Omar Khlifi
                  </h4>
                  <p className="text-xs text-slate-300 font-sans mt-0.5">
                    Frontend Software Engineer & Cyber / Web3 UI Specialist
                  </p>
                </div>

                {/* Portfolio / Social Links */}
                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com/omarkhlifi"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-black text-slate-200 transition-colors"
                    title="GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com/in/omarkhlifi"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-black text-slate-200 transition-colors"
                    title="LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="https://omarkhlifi.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-black text-slate-200 transition-colors"
                    title="Portfolio Website"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Architectural Highlights */}
            <div className="space-y-4 mb-6 text-xs font-mono">
              <h5 className="text-slate-400 uppercase font-bold flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-cyan-400" />
                Technical Stack & Specifications
              </h5>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">CORE RUNTIME</span>
                  <span className="text-white font-bold">React 19 (TypeScript)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">BUILD ENGINE</span>
                  <span className="text-cyan-400 font-bold">Vite 6 + Relative Paths</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">STYLING SYSTEM</span>
                  <span className="text-purple-400 font-bold">Tailwind CSS v4</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">ANIMATIONS</span>
                  <span className="text-pink-400 font-bold">Framer Motion</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">AUDIO SYNTHESIZER</span>
                  <span className="text-emerald-400 font-bold">HTML5 Web Audio API</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">DATA PERSISTENCE</span>
                  <span className="text-amber-400 font-bold">LocalStorage State Sync</span>
                </div>
              </div>
            </div>

            {/* MIT License Guarantee */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 font-mono leading-relaxed">
              <p className="flex items-center gap-1.5 text-white font-bold mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                MIT License & Open-Source Ownership
              </p>
              Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files, to deal in the Software without restriction, including the rights to use, copy, modify, merge, publish, distribute, and sublicense.
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsAboutModalOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors cyber-glow-cyan"
              >
                Close Mainframe
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
