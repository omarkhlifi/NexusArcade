/**
 * Nexus Arcade - User Profile, Achievements, & Audio Context
 * Author: Omar Khlifi
 * License: MIT
 */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { UserProfile, Achievement } from '../types';
import { INITIAL_USER_PROFILE, INITIAL_ACHIEVEMENTS } from '../data/mockGames';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useSoundEffects } from '../hooks/useSoundEffects';
import confetti from 'canvas-confetti';

interface ToastData {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  iconName: string;
}

interface UserContextType {
  profile: UserProfile;
  achievements: Achievement[];
  soundEnabled: boolean;
  toggleSound: () => void;
  unlockAchievement: (id: string) => void;
  activeToast: ToastData | null;
  clearToast: () => void;
  sounds: ReturnType<typeof useSoundEffects>;
  gainXp: (amount: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useLocalStorage<UserProfile>('nexus_user_profile', INITIAL_USER_PROFILE);
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>('nexus_achievements', INITIAL_ACHIEVEMENTS);
  const [soundEnabled, setSoundEnabled] = useLocalStorage<boolean>('nexus_sound_enabled', true);
  const [activeToast, setActiveToast] = useState<ToastData | null>(null);

  const sounds = useSoundEffects(soundEnabled);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const next = !prev;
      return next;
    });
  }, [setSoundEnabled]);

  const gainXp = useCallback((amount: number) => {
    setProfile(prev => {
      let newXp = prev.xp + amount;
      let newLevel = prev.level;
      let newXpToNext = prev.xpToNextLevel;

      while (newXp >= newXpToNext) {
        newXp -= newXpToNext;
        newLevel += 1;
        newXpToNext = Math.round(newXpToNext * 1.25);
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        xpToNextLevel: newXpToNext,
        nexusCredits: prev.nexusCredits + Math.round(amount / 5),
      };
    });
  }, [setProfile]);

  const unlockAchievement = useCallback((id: string) => {
    setAchievements(prev => {
      const target = prev.find(a => a.id === id);
      if (!target || target.unlocked) return prev;

      // Celebrate!
      sounds.playAchievement();
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.85, x: 0.85 },
          colors: ['#00f0ff', '#a855f7', '#10b981', '#ffffff'],
        });
      } catch {
        // Confetti fallback
      }

      setActiveToast({
        id: target.id,
        title: target.title,
        description: target.description,
        xpReward: target.xpReward,
        iconName: target.iconName,
      });

      // Grant XP
      gainXp(target.xpReward);

      return prev.map(a => a.id === id ? { ...a, unlocked: true } : a);
    });
  }, [setAchievements, sounds, gainXp]);

  const clearToast = useCallback(() => {
    setActiveToast(null);
  }, []);

  // Auto-dismiss toast after 5 seconds
  useEffect(() => {
    if (activeToast) {
      const timer = setTimeout(() => {
        setActiveToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [activeToast]);

  return (
    <UserContext.Provider
      value={{
        profile,
        achievements,
        soundEnabled,
        toggleSound,
        unlockAchievement,
        activeToast,
        clearToast,
        sounds,
        gainXp,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

