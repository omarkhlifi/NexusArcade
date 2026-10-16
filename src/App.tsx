/**
 * Nexus Arcade - Main Application Entrypoint
 * Author: Omar Khlifi
 * License: MIT
 */

import React from 'react';
import { UserProvider } from './context/UserContext';
import { GameProvider, useGame } from './context/GameContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FilterBar } from './components/FilterBar';
import { GameGrid } from './components/GameGrid';
import { GameDetailDrawer } from './components/GameDetailDrawer';
import { TrailerModal } from './components/TrailerModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProfileDrawer } from './components/ProfileDrawer';
import { AboutModal } from './components/AboutModal';
import { LibraryView } from './components/LibraryView';
import { WishlistView } from './components/WishlistView';
import { AchievementsView } from './components/AchievementsView';
import { AchievementToast } from './components/AchievementToast';
import { Footer } from './components/Footer';
import { Flame, Sparkles } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab } = useGame();

  return (
    <div className="min-h-screen flex flex-col bg-[#080b11] text-slate-100 selection:bg-cyan-400 selection:text-black">
      {/* Top Cyber Navigation Bar */}
      <Navbar />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-16">
        {activeTab === 'store' && (
          <>
            {/* Spotlight Hero Carousel */}
            <HeroBanner />

            {/* Catalog Section Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                  <Flame className="w-5 h-5 fill-cyan-400" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white font-['Orbitron'] tracking-wide">
                    EXPLORE THE VAULT
                  </h2>
                  <p className="text-xs text-slate-400 font-mono">
                    Multi-Genre E-Sports & Cyber Titles Curated for Enthusiasts
                  </p>
                </div>
              </div>
            </div>

            {/* Filters, Genre Chips, Sort Toolbar */}
            <FilterBar />

            {/* Game Cards Grid / Compact List */}
            <GameGrid />
          </>
        )}

        {activeTab === 'library' && <LibraryView />}
        {activeTab === 'wishlist' && <WishlistView />}
        {activeTab === 'achievements' && <AchievementsView />}
      </main>

      {/* Drawers & Modals */}
      <GameDetailDrawer />
      <TrailerModal />
      <CartDrawer />
      <CheckoutModal />
      <ProfileDrawer />
      <AboutModal />
      <AchievementToast />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <UserProvider>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </UserProvider>
  );
}

export default App;
