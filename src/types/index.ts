/**
 * Nexus Arcade - Type Definitions
 * Author: Omar Khlifi
 * License: MIT
 */

export type Genre = 
  | 'Action' 
  | 'RPG' 
  | 'Cyberpunk' 
  | 'Tactical Shooter' 
  | 'Indie' 
  | 'VR' 
  | 'Sci-Fi' 
  | 'Open World';

export type Platform = 'PC' | 'PlayStation 5' | 'Xbox Series X' | 'VR';

export type ESRBRating = 'E' | 'E10+' | 'T' | 'M' | 'RP';

export interface HardwareSpecs {
  os: string;
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  directX?: string;
  network?: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number; // 1-5
  date: string;
  comment: string;
  verifiedBuyer: boolean;
  helpfulCount: number;
}

export interface Game {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  price: number;
  discountPercent?: number; // 0 to 100
  isFree?: boolean;
  rating: number; // 0-100 (Metacritic style)
  communityRating: number; // 0-5.0
  reviewCount: number;
  esrbRating: ESRBRating;
  genres: Genre[];
  platforms: Platform[];
  developer: string;
  publisher: string;
  releaseDate: string;
  coverImage: string;
  bannerImage: string;
  screenshots: string[];
  trailerVideoUrl?: string; // MP4 / web video or simulated high-octane trailer
  featured?: boolean;
  trending?: boolean;
  badges?: string[];
  specs: {
    minimum: HardwareSpecs;
    recommended: HardwareSpecs;
  };
  reviews: Review[];
}

export interface UserProfile {
  gamerTag: string;
  title: string;
  avatar: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  nexusCredits: number;
  walletAddress?: string;
  unlockedAchievements: string[];
  badges: Array<{
    id: string;
    name: string;
    icon: string;
    rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
    description: string;
  }>;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  xpReward: number;
  unlocked: boolean;
  category: 'Explorer' | 'Collector' | 'Gamer' | 'Community';
}

export interface CartItem {
  game: Game;
  edition: 'Standard' | 'Deluxe Cyber Edition' | 'Collector Edition';
  price: number;
  addedAt: string;
}

export interface LibraryItem {
  gameId: string;
  game: Game;
  purchasedAt: string;
  hoursPlayed: number;
  lastPlayed?: string;
  status: 'Ready' | 'Installed' | 'Cloud Play';
  licenseKey: string;
}

export type SortOption = 'rating' | 'release' | 'title' | 'price-asc' | 'price-desc';

export type PriceFilter = 'all' | 'free' | 'under20' | 'sale';

