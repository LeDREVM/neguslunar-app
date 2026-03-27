import React from 'react';
import { LogOut, ChevronDown } from 'lucide-react';
import { useProfile, PROFILES } from '../context/ProfileContext';

// ─── Écran de sélection de profil (premier lancement) ───────────────────────
export const ProfileSelector = () => {
  const { switchProfile } = useProfile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex flex-col items-center justify-center p-6">
      {/* Logo / titre */}
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">🌙</div>
        <h1 className="text-4xl font-bold text-white mb-2">NegusLunar</h1>
        <p className="text-gray-400 text-lg">Choisissez votre profil</p>
      </div>

      {/* Cartes de profils */}
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg">
        {PROFILES.map((profile) => (
          <button
            key={profile.id}
            onClick={() => switchProfile(profile.id)}
            className="flex-1 group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl p-8 text-center"
          >
            {/* Gradient de fond au hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${profile.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

            <div className="relative z-10">
              <div className="text-7xl mb-4">{profile.avatar}</div>
              <h2 className="text-2xl font-bold text-white mb-1">{profile.name}</h2>
              <div className={`mt-4 inline-block px-4 py-2 rounded-full bg-gradient-to-r ${profile.gradient} text-white text-sm font-semibold`}>
                Entrer
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── Switcher compact dans la navbar ────────────────────────────────────────
const ProfileSwitcher = () => {
  const { activeProfile, switchProfile, logout, profiles } = useProfile();
  const [open, setOpen] = React.useState(false);

  if (!activeProfile) return null;

  const otherProfiles = profiles.filter(p => p.id !== activeProfile.id);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm"
      >
        <span className="text-lg">{activeProfile.avatar}</span>
        <span className="text-white font-medium hidden sm:inline">{activeProfile.name}</span>
        <ChevronDown size={14} className="text-gray-400" />
      </button>

      {open && (
        <>
          {/* Overlay pour fermer */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          <div className="absolute right-0 top-full mt-2 z-50 bg-slate-900 border border-white/10 rounded-xl shadow-2xl min-w-[180px] overflow-hidden">
            {/* Autres profils */}
            {otherProfiles.map(profile => (
              <button
                key={profile.id}
                onClick={() => { switchProfile(profile.id); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors text-left"
              >
                <span className="text-xl">{profile.avatar}</span>
                <span className="text-white text-sm">{profile.name}</span>
              </button>
            ))}

            <div className="border-t border-white/10" />

            {/* Déconnexion */}
            <button
              onClick={() => { logout(); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-900/30 transition-colors text-left text-red-400"
            >
              <LogOut size={16} />
              <span className="text-sm">Changer de profil</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileSwitcher;
