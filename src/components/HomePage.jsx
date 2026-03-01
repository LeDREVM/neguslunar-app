import React, { useMemo } from 'react';
import {
  Moon, Leaf, BookOpen, Calendar, Sparkles, Clock, Target,
  TrendingUp, Camera, Activity, Briefcase, ShoppingCart,
  Heart, Star, Sun, ChevronRight, Zap
} from 'lucide-react';

const HomePage = ({ moonPhase, currentDate, notes, onNavigate, onOpenWork, userName }) => {
  const greeting = useMemo(() => {
    const hour = currentDate.getHours();
    if (hour < 6) return { text: 'Bonne nuit', emoji: '🌙' };
    if (hour < 12) return { text: 'Bonjour', emoji: '☀️' };
    if (hour < 18) return { text: 'Bon après-midi', emoji: '🌤️' };
    return { text: 'Bonsoir', emoji: '🌅' };
  }, [currentDate]);

  const dayStr = currentDate.toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  const modules = [
    {
      id: 'lunar',
      icon: Moon,
      label: 'Phase Lunaire',
      desc: moonPhase?.name || 'Voir la phase du jour',
      emoji: moonPhase?.emoji || '🌙',
      gradient: 'from-blue-500/30 to-purple-600/30',
      border: 'border-blue-400/30',
      hover: 'hover:border-blue-400/60',
      glow: 'shadow-blue-500/20',
      action: () => onNavigate('lunar'),
    },
    {
      id: 'calendar',
      icon: Calendar,
      label: 'Calendrier',
      desc: 'Calendrier lunaire mensuel',
      emoji: '📅',
      gradient: 'from-indigo-500/30 to-blue-600/30',
      border: 'border-indigo-400/30',
      hover: 'hover:border-indigo-400/60',
      glow: 'shadow-indigo-500/20',
      action: () => onNavigate('calendar'),
    },
    {
      id: 'notes',
      icon: BookOpen,
      label: 'Notes & Journal',
      desc: `${notes?.length || 0} note${(notes?.length || 0) > 1 ? 's' : ''} enregistrée${(notes?.length || 0) > 1 ? 's' : ''}`,
      emoji: '📝',
      gradient: 'from-green-500/30 to-teal-600/30',
      border: 'border-green-400/30',
      hover: 'hover:border-green-400/60',
      glow: 'shadow-green-500/20',
      action: () => onNavigate('notes'),
    },
    {
      id: 'recipes',
      icon: Leaf,
      label: 'Recettes Véganes',
      desc: 'Cuisine selon ton humeur',
      emoji: '🥗',
      gradient: 'from-pink-500/30 to-rose-600/30',
      border: 'border-pink-400/30',
      hover: 'hover:border-pink-400/60',
      glow: 'shadow-pink-500/20',
      action: () => onNavigate('recipes'),
    },
    {
      id: 'ritual',
      icon: Sparkles,
      label: 'Rituel Lunaire',
      desc: 'Méditation • Yoga • Affirmations',
      emoji: '✨',
      gradient: 'from-violet-500/30 to-purple-600/30',
      border: 'border-violet-400/30',
      hover: 'hover:border-violet-400/60',
      glow: 'shadow-violet-500/20',
      action: () => onNavigate('ritual'),
    },
    {
      id: 'fasting',
      icon: Clock,
      label: 'Jeûne Intermittent',
      desc: 'Suivi de tes fenêtres',
      emoji: '⏱️',
      gradient: 'from-amber-500/30 to-orange-600/30',
      border: 'border-amber-400/30',
      hover: 'hover:border-amber-400/60',
      glow: 'shadow-amber-500/20',
      action: () => onNavigate('fasting'),
    },
    {
      id: 'tracker',
      icon: TrendingUp,
      label: 'Mon Suivi',
      desc: 'Nutrition & bien-être',
      emoji: '📊',
      gradient: 'from-cyan-500/30 to-blue-600/30',
      border: 'border-cyan-400/30',
      hover: 'hover:border-cyan-400/60',
      glow: 'shadow-cyan-500/20',
      action: () => onNavigate('tracker'),
    },
    {
      id: 'mealplan',
      icon: Target,
      label: 'Plans Repas',
      desc: 'Planifie ta semaine',
      emoji: '🎯',
      gradient: 'from-lime-500/30 to-green-600/30',
      border: 'border-lime-400/30',
      hover: 'hover:border-lime-400/60',
      glow: 'shadow-lime-500/20',
      action: () => onNavigate('mealplan'),
    },
    {
      id: 'scanner',
      icon: Camera,
      label: 'Scanner',
      desc: 'Analyse tes aliments',
      emoji: '📷',
      gradient: 'from-emerald-500/30 to-teal-600/30',
      border: 'border-emerald-400/30',
      hover: 'hover:border-emerald-400/60',
      glow: 'shadow-emerald-500/20',
      action: () => onNavigate('scanner'),
    },
    {
      id: 'eclipses',
      icon: Moon,
      label: 'Éclipses 2026',
      desc: 'Calendrier des éclipses',
      emoji: '🌑',
      gradient: 'from-red-500/30 to-rose-700/30',
      border: 'border-red-400/30',
      hover: 'hover:border-red-400/60',
      glow: 'shadow-red-500/20',
      action: () => onNavigate('eclipses'),
    },
    {
      id: 'work',
      icon: Briefcase,
      label: 'Mode Pro',
      desc: 'DA • Artistes • Trading',
      emoji: '💼',
      gradient: 'from-blue-600/30 to-cyan-600/30',
      border: 'border-blue-500/30',
      hover: 'hover:border-blue-400/60',
      glow: 'shadow-blue-500/20',
      action: onOpenWork,
    },
    {
      id: 'dailyRecipe',
      icon: Leaf,
      label: 'Recette du Jour',
      desc: 'Inspiration quotidienne',
      emoji: '🍽️',
      gradient: 'from-orange-500/30 to-amber-600/30',
      border: 'border-orange-400/30',
      hover: 'hover:border-orange-400/60',
      glow: 'shadow-orange-500/20',
      action: () => onNavigate('dailyRecipe'),
    },
  ];

  const quickStats = [
    { label: 'Notes', value: notes?.length || 0, icon: '📝' },
    { label: 'Phase', value: moonPhase?.emoji || '🌙', icon: null },
    { label: 'Illumination', value: moonPhase?.illumination !== undefined ? `${moonPhase.illumination}%` : '—', icon: '💫' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* Bannière de bienvenue */}
      <div className="relative overflow-hidden border rounded-2xl bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-slate-900/40 border-purple-500/20 p-6 sm:p-8">
        {/* Étoiles décoratives */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30"
              style={{
                left: `${10 + (i * 8)}%`,
                top: `${15 + (i % 4) * 20}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{greeting.emoji}</span>
                <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text">
                  {greeting.text}{userName ? `, ${userName}` : ''} !
                </h2>
              </div>
              <p className="text-sm text-purple-300/70 capitalize">{dayStr}</p>
            </div>

            {/* Phase lunaire rapide */}
            <div className="flex items-center gap-3 px-4 py-3 border rounded-xl bg-white/5 border-white/10">
              <span className="text-3xl">{moonPhase?.emoji || '🌙'}</span>
              <div>
                <div className="text-sm font-semibold text-blue-100">{moonPhase?.name || 'Phase lunaire'}</div>
                {moonPhase?.illumination !== undefined && (
                  <div className="text-xs text-purple-300/70">{moonPhase.illumination}% illumination</div>
                )}
              </div>
            </div>
          </div>

          {/* Stats rapides */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {quickStats.map((stat, i) => (
              <div key={i} className="text-center px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                <div className="text-lg font-bold text-white">{stat.value}</div>
                <div className="text-xs text-purple-300/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grille des modules */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Zap size={16} className="text-yellow-400" />
          <h3 className="text-sm font-semibold text-purple-200/80 uppercase tracking-wider">Accès rapide</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <button
                key={mod.id}
                onClick={mod.action}
                className={`
                  group relative text-left p-4 rounded-2xl border transition-all duration-300
                  bg-gradient-to-br ${mod.gradient}
                  ${mod.border} ${mod.hover}
                  hover:scale-[1.03] hover:shadow-lg ${mod.glow}
                  active:scale-[0.97]
                `}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{mod.emoji}</span>
                  <ChevronRight
                    size={14}
                    className="text-white/30 group-hover:text-white/70 transition-colors mt-1"
                  />
                </div>
                <div className="text-sm font-semibold text-white/90 mb-1 leading-tight">
                  {mod.label}
                </div>
                <div className="text-xs text-white/50 leading-tight">
                  {mod.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Message inspirant lié à la phase lunaire */}
      {moonPhase?.description && (
        <div className="flex items-start gap-3 p-4 rounded-2xl border bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border-purple-500/20">
          <Heart size={18} className="text-pink-400 mt-0.5 flex-shrink-0 animate-pulse" />
          <div>
            <div className="text-xs font-semibold text-purple-300/70 uppercase tracking-wider mb-1">
              Intention du jour — {moonPhase.name}
            </div>
            <p className="text-sm text-purple-100/80 leading-relaxed italic">
              {moonPhase.description}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

export default HomePage;
