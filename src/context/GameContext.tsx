/**
 * Nexus Arcade - Game Catalog, Library, & Cart Context
 * Author: Omar Khlifi
 * License: MIT
 */

import React, { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react';
import { Game, CartItem, LibraryItem, SortOption, PriceFilter, Review } from '../types';
import { MOCK_GAMES } from '../data/mockGames';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useUser } from './UserContext';
import confetti from 'canvas-confetti';

interface GameContextType {
  games: Game[];
  filteredGames: Game[];
  selectedGame: Game | null;
  trailerGame: Game | null;
  wishlist: string[];
  cart: CartItem[];
  library: LibraryItem[];
  
  // Filters & State
  searchQuery: string;
  selectedGenre: string;
  selectedPlatform: string;
  sortBy: SortOption;
  priceFilter: PriceFilter;
  activeTab: 'store' | 'library' | 'wishlist' | 'achievements';
  viewMode: 'grid' | 'compact';
  
  // Modals & Drawers
  isCartOpen: boolean;
  isProfileOpen: boolean;
  isCheckoutOpen: boolean;
  isAboutModalOpen: boolean;
  lastPurchasedOrder: { items: CartItem[]; total: number; keys: Record<string, string> } | null;

  // Actions
  setSearchQuery: (query: string) => void;
  setSelectedGenre: (genre: string) => void;
  setSelectedPlatform: (platform: string) => void;
  setSortBy: (sort: SortOption) => void;
  setPriceFilter: (filter: PriceFilter) => void;
  setActiveTab: (tab: 'store' | 'library' | 'wishlist' | 'achievements') => void;
  setViewMode: (mode: 'grid' | 'compact') => void;
  
  toggleWishlist: (gameId: string) => void;
  isInWishlist: (gameId: string) => boolean;
  addToCart: (game: Game, edition?: CartItem['edition']) => void;
  removeFromCart: (gameId: string) => void;
  clearCart: () => void;
  
  openGameDetails: (game: Game) => void;
  closeGameDetails: () => void;
  openTrailer: (game: Game) => void;
  closeTrailer: () => void;
  
  setIsCartOpen: (open: boolean) => void;
  setIsProfileOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsAboutModalOpen: (open: boolean) => void;
  
  executeCheckout: (paymentMethod: string, discountCode?: string, discountPct?: number) => void;
  clearLastPurchasedOrder: () => void;
  isInLibrary: (gameId: string) => boolean;
  addReview: (gameId: string, review: { rating: number; comment: string }) => void;
}

const INITIAL_LIBRARY: LibraryItem[] = [
  {
    gameId: 'vortex-vanguard-protocol-zero',
    game: MOCK_GAMES[2],
    purchasedAt: '2026-03-01',
    hoursPlayed: 48.5,
    lastPlayed: 'Yesterday',
    status: 'Ready',
    licenseKey: 'NX-8942-VTX0-99A1',
  },
  {
    gameId: 'neon-rift-overdrive',
    game: MOCK_GAMES[4],
    purchasedAt: '2026-03-10',
    hoursPlayed: 14.2,
    lastPlayed: '3 days ago',
    status: 'Ready',
    licenseKey: 'NX-1104-RIFT-77C2',
  },
];

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { unlockAchievement, sounds, profile } = useUser();

  const [games, setGames] = useState<Game[]>(MOCK_GAMES);
  const [wishlist, setWishlist] = useLocalStorage<string[]>('nexus_wishlist', ['cyberpulse-2099', 'aetheria-chrono-blades']);
  const [cart, setCart] = useLocalStorage<CartItem[]>('nexus_cart', []);
  const [library, setLibrary] = useLocalStorage<LibraryItem[]>('nexus_library', INITIAL_LIBRARY);

  // Filter & Navigation states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all');
  const [activeTab, setActiveTab] = useState<'store' | 'library' | 'wishlist' | 'achievements'>('store');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  // Modal states
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [trailerGame, setTrailerGame] = useState<Game | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [lastPurchasedOrder, setLastPurchasedOrder] = useState<{ items: CartItem[]; total: number; keys: Record<string, string> } | null>(null);

  // Filtered games computation
  const filteredGames = useMemo(() => {
    let result = [...games];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        g =>
          g.title.toLowerCase().includes(q) ||
          g.tagline.toLowerCase().includes(q) ||
          g.developer.toLowerCase().includes(q) ||
          g.genres.some(gen => gen.toLowerCase().includes(q))
      );
    }

    // Genre filter
    if (selectedGenre !== 'All') {
      result = result.filter(g => g.genres.includes(selectedGenre as any));
    }

    // Platform filter
    if (selectedPlatform !== 'All') {
      result = result.filter(g => g.platforms.includes(selectedPlatform as any));
    }

    // Price filter
    if (priceFilter === 'free') {
      result = result.filter(g => g.isFree);
    } else if (priceFilter === 'under20') {
      result = result.filter(g => !g.isFree && g.price <= 20);
    } else if (priceFilter === 'sale') {
      result = result.filter(g => (g.discountPercent ?? 0) > 0);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'release') {
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (sortBy === 'price-desc') {
        return b.price - a.price;
      }
      return 0;
    });

    return result;
  }, [games, searchQuery, selectedGenre, selectedPlatform, priceFilter, sortBy]);

  // Wishlist Actions
  const isInWishlist = useCallback((gameId: string) => wishlist.includes(gameId), [wishlist]);

  const toggleWishlist = useCallback((gameId: string) => {
    sounds.playAction();
    setWishlist(prev => {
      const exists = prev.includes(gameId);
      const updated = exists ? prev.filter(id => id !== gameId) : [...prev, gameId];
      if (!exists && updated.length >= 3) {
        unlockAchievement('ach-wishlist-3');
      }
      return updated;
    });
  }, [sounds, unlockAchievement, setWishlist]);

  // Library check
  const isInLibrary = useCallback((gameId: string) => {
    return library.some(item => item.gameId === gameId);
  }, [library]);

  // Cart Actions
  const addToCart = useCallback((game: Game, edition: CartItem['edition'] = 'Standard') => {
    sounds.playSuccess();
    setCart(prev => {
      const alreadyInCart = prev.some(item => item.game.id === game.id);
      if (alreadyInCart) return prev;

      let itemPrice = game.price;
      if (edition === 'Deluxe Cyber Edition') itemPrice = Math.round((game.price * 1.3) * 100) / 100;
      if (edition === 'Collector Edition') itemPrice = Math.round((game.price * 1.6) * 100) / 100;

      unlockAchievement('ach-cart-add');
      return [...prev, { game, edition, price: itemPrice, addedAt: new Date().toISOString() }];
    });
    setIsCartOpen(true);
  }, [sounds, unlockAchievement, setCart]);

  const removeFromCart = useCallback((gameId: string) => {
    sounds.playClick();
    setCart(prev => prev.filter(item => item.game.id !== gameId));
  }, [sounds, setCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  // Detail Modal Actions
  const openGameDetails = useCallback((game: Game) => {
    sounds.playClick();
    setSelectedGame(game);
    unlockAchievement('ach-first-view');
  }, [sounds, unlockAchievement]);

  const closeGameDetails = useCallback(() => {
    setSelectedGame(null);
  }, []);

  // Trailer Modal Actions
  const openTrailer = useCallback((game: Game) => {
    sounds.playAction();
    setTrailerGame(game);
    unlockAchievement('ach-trailer-stream');
  }, [sounds, unlockAchievement]);

  const closeTrailer = useCallback(() => {
    setTrailerGame(null);
  }, []);

  // Checkout Execution
  const executeCheckout = useCallback((paymentMethod: string, discountCode?: string, discountPct: number = 0) => {
    if (cart.length === 0) return;

    sounds.playAchievement();
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#a855f7', '#10b981', '#ff007f'],
      });
    } catch {
      // Confetti fallback
    }

    const generatedKeys: Record<string, string> = {};
    const newLibraryItems: LibraryItem[] = cart.map(item => {
      const randomHex = () => Math.random().toString(36).substring(2, 6).toUpperCase();
      const key = `NX-${randomHex()}-${randomHex()}-${randomHex()}`;
      generatedKeys[item.game.id] = key;

      return {
        gameId: item.game.id,
        game: item.game,
        purchasedAt: new Date().toISOString().split('T')[0],
        hoursPlayed: 0,
        lastPlayed: 'Never',
        status: 'Ready',
        licenseKey: key,
      };
    });

    const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
    const finalTotal = Math.max(0, subtotal * (1 - discountPct / 100));

    setLastPurchasedOrder({
      items: [...cart],
      total: finalTotal,
      keys: generatedKeys,
    });

    // Merge into library without duplicates
    setLibrary(prev => {
      const existingIds = new Set(prev.map(i => i.gameId));
      const filteredNew = newLibraryItems.filter(i => !existingIds.has(i.gameId));
      return [...filteredNew, ...prev];
    });

    // Clear cart and unlock achievements
    clearCart();
    setIsCartOpen(false);
    unlockAchievement('ach-checkout-complete');
    if (discountCode) {
      unlockAchievement('ach-discount-applied');
    }
  }, [cart, sounds, setLibrary, clearCart, unlockAchievement]);

  const clearLastPurchasedOrder = useCallback(() => {
    setLastPurchasedOrder(null);
  }, []);

  // Add simulated user review
  const addReview = useCallback((gameId: string, reviewData: { rating: number; comment: string }) => {
    sounds.playSuccess();
    const newReview: Review = {
      id: `rev-user-${Date.now()}`,
      author: profile.gamerTag || 'Player_One',
      avatar: profile.avatar,
      rating: reviewData.rating,
      date: new Date().toISOString().split('T')[0],
      comment: reviewData.comment,
      verifiedBuyer: true,
      helpfulCount: 1,
    };

    setGames(prevGames =>
      prevGames.map(game => {
        if (game.id !== gameId) return game;
        const updatedReviews = [newReview, ...game.reviews];
        const newCount = game.reviewCount + 1;
        const avg = updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length;
        const roundedAvg = Math.round(avg * 10) / 10;
        return {
          ...game,
          reviews: updatedReviews,
          communityRating: roundedAvg,
          reviewCount: newCount,
        };
      })
    );

    if (selectedGame && selectedGame.id === gameId) {
      setSelectedGame(prev => {
        if (!prev) return null;
        const updatedReviews = [newReview, ...prev.reviews];
        return {
          ...prev,
          reviews: updatedReviews,
          reviewCount: prev.reviewCount + 1,
        };
      });
    }
  }, [sounds, profile, selectedGame]);

  return (
    <GameContext.Provider
      value={{
        games,
        filteredGames,
        selectedGame,
        trailerGame,
        wishlist,
        cart,
        library,
        searchQuery,
        selectedGenre,
        selectedPlatform,
        sortBy,
        priceFilter,
        activeTab,
        viewMode,
        isCartOpen,
        isProfileOpen,
        isCheckoutOpen,
        isAboutModalOpen,
        lastPurchasedOrder,
        setSearchQuery,
        setSelectedGenre,
        setSelectedPlatform,
        setSortBy,
        setPriceFilter,
        setActiveTab,
        setViewMode,
        toggleWishlist,
        isInWishlist,
        addToCart,
        removeFromCart,
        clearCart,
        openGameDetails,
        closeGameDetails,
        openTrailer,
        closeTrailer,
        setIsCartOpen,
        setIsProfileOpen,
        setIsCheckoutOpen,
        setIsAboutModalOpen,
        executeCheckout,
        clearLastPurchasedOrder,
        isInLibrary,
        addReview,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

