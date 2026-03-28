import React, { createContext, useContext, useState } from 'react';

export const PROFILES = [
  {
    id: 'negus-dja',
    name: 'Negus Dja',
    avatar: '🌙',
    gradient: 'from-purple-600 to-indigo-700',
    accent: 'purple'
  },
  {
    id: 'liwokwaz',
    name: 'Liwokwaz',
    avatar: '⭐',
    gradient: 'from-amber-500 to-orange-600',
    accent: 'amber'
  }
];

const DEFAULT_GOALS = {
  dailyCalories: 2000,
  dailyProteins: 80,
  dailyCarbs: 250,
  dailyFats: 65
};

const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const [activeProfileId, setActiveProfileId] = useState(() => {
    return localStorage.getItem('neguslunar-active-profile') || null;
  });

  // Objectifs nutritionnels par profil (mis à jour par MealPlanner, lus par DailyTracker)
  const [profileGoals, setProfileGoalsState] = useState(() => {
    const raw = localStorage.getItem('neguslunar-profile-goals');
    return raw ? JSON.parse(raw) : {};
  });

  const activeProfile = PROFILES.find(p => p.id === activeProfileId) || null;

  const switchProfile = (profileId) => {
    setActiveProfileId(profileId);
    localStorage.setItem('neguslunar-active-profile', profileId);
  };

  const logout = () => {
    setActiveProfileId(null);
    localStorage.removeItem('neguslunar-active-profile');
  };

  const getGoals = (profileId = activeProfileId) => {
    return profileGoals[profileId] || DEFAULT_GOALS;
  };

  const setGoals = (goals, profileId = activeProfileId) => {
    if (!profileId) return;
    const updated = { ...profileGoals, [profileId]: { ...DEFAULT_GOALS, ...goals } };
    setProfileGoalsState(updated);
    localStorage.setItem('neguslunar-profile-goals', JSON.stringify(updated));
  };

  return (
    <ProfileContext.Provider value={{
      activeProfile, activeProfileId, switchProfile, logout,
      profiles: PROFILES, getGoals, setGoals
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used inside ProfileProvider');
  return ctx;
};

export default ProfileContext;
