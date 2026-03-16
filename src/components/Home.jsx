import React from 'react';
import { useProfile } from '../hooks/useProfile';
import ProfileManager from './ProfileManager';
import NextcloudSync from './NextcloudSync';
import { Moon, Sparkles } from 'lucide-react';

const Home = () => {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center gap-3 text-purple-300/70">
          <div className="w-5 h-5 rounded-full border-2 border-purple-400 border-t-transparent animate-spin" />
          Chargement...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeInScale">
      {/* Bannière de bienvenue */}
      <div
        className="relative rounded-3xl p-8 overflow-hidden holo-card"
        style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(99,102,241,0.1) 50%, rgba(236,72,153,0.1) 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)'
        }}
      >
        {/* Lune décorative */}
        <div
          className="absolute -top-8 -right-8 text-8xl opacity-10 animate-floatSlow pointer-events-none"
          style={{ filter: 'drop-shadow(0 0 30px rgba(167,139,250,0.5))' }}
        >
          🌕
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles size={20} className="text-yellow-300" style={{ filter: 'drop-shadow(0 0 6px rgba(253,224,71,0.8))' }} />
            <span className="text-xs font-semibold tracking-widest text-purple-300/70 uppercase">Bienvenue</span>
          </div>
          <h2 className="text-3xl font-bold mb-2 text-shimmer">
            {profile?.name ? `Bonjour, ${profile.name} !` : 'Bienvenue sur NegusLunar !'}
          </h2>
          <p className="text-purple-200/70 leading-relaxed max-w-lg">
            Votre espace personnel pour suivre les phases lunaires, noter vos intentions et explorer la cuisine végétalienne.
          </p>
        </div>
      </div>

      {/* Carte de profil */}
      <ProfileManager />

      {/* Synchronisation Nextcloud */}
      <NextcloudSync />
    </div>
  );
};

export default Home;
