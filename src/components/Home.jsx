import React from 'react';
import { useProfile } from '../hooks/useProfile';
import ProfileManager from './ProfileManager';

const Home = () => {
  const { profile, loading } = useProfile();

  if (loading) {
    return <div>Chargement du profil...</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-3xl font-bold mb-4">
        Bienvenue{profile && profile.name ? `, ${profile.name}` : ''}!
      </h2>
      <p className="text-lg text-purple-200/80">
        C'est votre espace personnel. Modifiez votre profil ou explorez les fonctionnalités lunaire, notes et recettes.
      </p>
      <ProfileManager />
    </div>
  );
};

export default Home;
