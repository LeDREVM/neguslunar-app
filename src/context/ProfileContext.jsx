import React, { createContext, useContext, useState, useEffect } from 'react';

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

const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const [activeProfileId, setActiveProfileId] = useState(() => {
    return localStorage.getItem('neguslunar-active-profile') || null;
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

  return (
    <ProfileContext.Provider value={{ activeProfile, activeProfileId, switchProfile, logout, profiles: PROFILES }}>
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
