import React, { useState, useEffect } from 'react';
import { X, User, Edit3, Check, Moon, Leaf, Briefcase, Heart, Star, BookOpen, Sparkles } from 'lucide-react';

const AVATARS = ['🌙', '🌟', '🌿', '🦋', '🔮', '🌺', '🧘', '🎨', '🎵', '🌊', '🦁', '🌸'];

const UserProfile = ({ onClose, notes, moonPhase }) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('🌙');
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState('');
  const [saved, setSaved] = useState(false);

  // Charger le profil depuis localStorage
  useEffect(() => {
    const stored = localStorage.getItem('neguslunar_profile');
    if (stored) {
      const profile = JSON.parse(stored);
      setName(profile.name || '');
      setAvatar(profile.avatar || '🌙');
    }
  }, []);

  const saveProfile = () => {
    const profile = { name: tempName.trim(), avatar };
    localStorage.setItem('neguslunar_profile', JSON.stringify(profile));
    setName(tempName.trim());
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAvatarChange = (emoji) => {
    setAvatar(emoji);
    const stored = localStorage.getItem('neguslunar_profile');
    const profile = stored ? JSON.parse(stored) : {};
    profile.avatar = emoji;
    localStorage.setItem('neguslunar_profile', JSON.stringify(profile));
  };

  const startEdit = () => {
    setTempName(name);
    setEditing(true);
  };

  // Calculs statistiques
  const totalNotes = notes?.length || 0;
  const today = new Date();
  const recentNotes = notes?.filter(n => {
    const noteDate = new Date(n.date || n.id);
    const diffDays = (today - noteDate) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  }).length || 0;

  const stats = [
    { icon: BookOpen, label: 'Notes totales', value: totalNotes, color: 'text-green-400' },
    { icon: Star, label: 'Notes cette semaine', value: recentNotes, color: 'text-yellow-400' },
    { icon: Moon, label: 'Phase actuelle', value: moonPhase?.name || '—', color: 'text-blue-400' },
    { icon: Sparkles, label: 'Illumination', value: moonPhase?.illumination !== undefined ? `${moonPhase.illumination}%` : '—', color: 'text-purple-400' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-3xl border shadow-2xl bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-950 border-purple-500/30 shadow-purple-900/40 overflow-hidden">

        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text">
                Mon Profil
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X size={20} className="text-white/70" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">

          {/* Avatar + Nom */}
          <div className="text-center">
            {/* Avatar affiché */}
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-purple-600/40 to-pink-600/40 border-2 border-purple-400/40 text-5xl mb-4 shadow-lg shadow-purple-500/20">
              {avatar}
            </div>

            {/* Nom */}
            {editing ? (
              <div className="flex items-center gap-2 justify-center">
                <input
                  type="text"
                  value={tempName}
                  onChange={e => setTempName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && saveProfile()}
                  placeholder="Ton prénom..."
                  autoFocus
                  maxLength={30}
                  className="bg-white/10 border border-purple-400/50 rounded-xl px-4 py-2 text-white text-center text-lg font-semibold placeholder:text-white/30 focus:outline-none focus:border-purple-400"
                />
                <button
                  onClick={saveProfile}
                  className="p-2 rounded-xl bg-green-500/30 hover:bg-green-500/50 border border-green-400/50 transition-colors"
                >
                  <Check size={18} className="text-green-300" />
                </button>
              </div>
            ) : (
              <button
                onClick={startEdit}
                className="group flex items-center gap-2 mx-auto px-4 py-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                <span className="text-xl font-bold text-white">
                  {name || 'Ajoute ton prénom'}
                </span>
                <Edit3 size={16} className="text-purple-300/50 group-hover:text-purple-300 transition-colors" />
              </button>
            )}

            {saved && (
              <p className="text-xs text-green-400 mt-1 animate-fadeIn">✓ Profil sauvegardé</p>
            )}

            <p className="text-xs text-purple-300/50 mt-1">DA • Guadeloupe 🏝️</p>
          </div>

          {/* Choix d'avatar */}
          <div>
            <p className="text-xs font-semibold text-purple-300/60 uppercase tracking-wider mb-3">Choisir un avatar</p>
            <div className="grid grid-cols-6 gap-2">
              {AVATARS.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => handleAvatarChange(emoji)}
                  className={`
                    text-2xl p-2 rounded-xl transition-all duration-200
                    ${avatar === emoji
                      ? 'bg-purple-500/40 border-2 border-purple-400 scale-110 shadow-lg shadow-purple-500/30'
                      : 'bg-white/5 border border-white/10 hover:bg-white/15 hover:scale-105'
                    }
                  `}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Statistiques */}
          <div>
            <p className="text-xs font-semibold text-purple-300/60 uppercase tracking-wider mb-3">Mes statistiques</p>
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="flex flex-col gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                    <Icon size={16} className={stat.color} />
                    <div>
                      <div className="text-base font-bold text-white truncate">{stat.value}</div>
                      <div className="text-xs text-purple-300/50">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* À propos de l'app */}
          <div className="text-center pt-2 border-t border-white/10">
            <div className="flex items-center justify-center gap-2 text-purple-300/50 text-xs">
              <span>Créé avec</span>
              <Heart size={12} className="text-pink-400 animate-pulse" />
              <span>par</span>
              <span className="font-semibold text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text">
                Négus Dja
              </span>
            </div>
            <p className="text-xs text-purple-400/30 mt-1">NegusLunar v1.0.0 • 🏝️ Guadeloupe</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;

// Hook utilitaire pour lire le profil depuis n'importe quel composant
export const useUserProfile = () => {
  const [profile, setProfile] = useState({ name: '', avatar: '🌙' });

  useEffect(() => {
    const load = () => {
      const stored = localStorage.getItem('neguslunar_profile');
      if (stored) setProfile(JSON.parse(stored));
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  return profile;
};
