import React, { useState } from 'react';
import { Calendar, Moon, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { moonPhases2026, getNextFullMoon, getNextNewMoon, getNextFirstQuarter, getNextLastQuarter, getMoonPhasesForMonth } from '../data/moonPhases2026';

const MoonCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear] = useState(2026);

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const nextFullMoon = getNextFullMoon();
  const nextNewMoon = getNextNewMoon();
  const nextFirstQuarter = getNextFirstQuarter();
  const nextLastQuarter = getNextLastQuarter();
  const monthPhases = getMoonPhasesForMonth(selectedYear, selectedMonth);

  const changeMonth = (direction) => {
    setSelectedMonth(prev => {
      const newMonth = prev + direction;
      if (newMonth < 0) return 11;
      if (newMonth > 11) return 0;
      return newMonth;
    });
  };

  // Configuration des cartes de phases
  const phaseCards = [
    {
      data: nextFullMoon,
      emoji: '🌕',
      title: 'Prochaine Pleine Lune',
      subtitle: 'Accomplissement & Gratitude',
      gradientFrom: 'from-yellow-500/20',
      gradientTo: 'to-orange-500/20',
      borderColor: 'border-yellow-400/30',
      textColor: 'text-yellow-200',
      subtitleColor: 'text-yellow-300/80',
      contentColor: 'text-yellow-100',
      badgeBg: 'bg-yellow-500/20'
    },
    {
      data: nextNewMoon,
      emoji: '🌑',
      title: 'Prochaine Nouvelle Lune',
      subtitle: 'Nouveau Départ & Intentions',
      gradientFrom: 'from-indigo-500/20',
      gradientTo: 'to-purple-500/20',
      borderColor: 'border-indigo-400/30',
      textColor: 'text-indigo-200',
      subtitleColor: 'text-indigo-300/80',
      contentColor: 'text-indigo-100',
      badgeBg: 'bg-indigo-500/20'
    },
    {
      data: nextFirstQuarter,
      emoji: '🌓',
      title: 'Prochain Premier Quartier',
      subtitle: 'Construction & Détermination',
      gradientFrom: 'from-cyan-500/20',
      gradientTo: 'to-blue-500/20',
      borderColor: 'border-cyan-400/30',
      textColor: 'text-cyan-200',
      subtitleColor: 'text-cyan-300/80',
      contentColor: 'text-cyan-100',
      badgeBg: 'bg-cyan-500/20'
    },
    {
      data: nextLastQuarter,
      emoji: '🌗',
      title: 'Prochain Dernier Quartier',
      subtitle: 'Libération & Pardon',
      gradientFrom: 'from-rose-500/20',
      gradientTo: 'to-pink-500/20',
      borderColor: 'border-rose-400/30',
      textColor: 'text-rose-200',
      subtitleColor: 'text-rose-300/80',
      contentColor: 'text-rose-100',
      badgeBg: 'bg-rose-500/20'
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* En-tête avec prochaines phases */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {phaseCards.map((card, idx) => (
          <div key={idx} className={`bg-gradient-to-br ${card.gradientFrom} ${card.gradientTo} rounded-2xl p-6 backdrop-blur-sm border-2 ${card.borderColor}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="text-4xl">{card.emoji}</div>
              <div>
                <h3 className={`text-xl font-bold ${card.textColor}`}>{card.title}</h3>
                <p className={`${card.subtitleColor} text-sm`}>{card.subtitle}</p>
              </div>
            </div>
            {card.data && (
              <div className="space-y-2">
                <div className={`flex items-center gap-2 ${card.contentColor}`}>
                  <Calendar size={16} />
                  <span className="font-semibold">
                    {new Date(card.data.date).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long'
                    })}
                  </span>
                </div>
                <div className={`flex items-center gap-2 ${card.contentColor}`}>
                  <Clock size={16} />
                  <span>{card.data.time}</span>
                </div>
                <div className={`mt-3 px-3 py-2 ${card.badgeBg} rounded-lg text-center`}>
                  <span className={`text-2xl font-bold ${card.textColor}`}>
                    {card.data.daysUntil === 0 ? "Aujourd'hui !" : `Dans ${card.data.daysUntil} jour${card.data.daysUntil > 1 ? 's' : ''}`}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Calendrier mensuel */}
      <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
            Phases Lunaires 2026
          </h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => changeMonth(-1)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="text-lg font-semibold text-purple-200 min-w-[120px] text-center">
              {monthNames[selectedMonth]}
            </div>
            <button
              onClick={() => changeMonth(1)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Liste des phases du mois */}
        <div className="space-y-3">
          {monthPhases.length > 0 ? (
            monthPhases.map((phase, idx) => {
              const phaseDate = new Date(phase.date);
              const isToday = phaseDate.toDateString() === new Date().toDateString();
              const isPast = phaseDate < new Date();

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${isToday
                      ? 'bg-purple-500/30 border-2 border-purple-400 shadow-lg shadow-purple-500/50'
                      : isPast
                        ? 'bg-white/5 border border-white/10 opacity-60'
                        : 'bg-white/10 border border-white/20 hover:border-purple-400/50'
                    }`}
                >
                  <div className="text-5xl">{phase.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-lg font-bold text-purple-100">{phase.phase}</h4>
                      {isToday && (
                        <span className="px-2 py-1 bg-purple-500/30 text-purple-200 text-xs rounded-full">
                          Aujourd'hui
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-purple-200/80">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>
                          {phaseDate.toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{phase.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-purple-300/60">
              <Moon size={48} className="mx-auto mb-4 opacity-50" />
              <p>Aucune phase lunaire majeure ce mois-ci</p>
            </div>
          )}
        </div>
      </div>

      {/* Légende */}
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <h4 className="text-sm font-semibold text-purple-200 mb-3">📖 Signification des phases</h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌑</span>
            <div>
              <span className="text-purple-100 font-semibold">Nouvelle Lune</span>
              <p className="text-purple-300/70">Nouveau départ, intentions</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌒</span>
            <div>
              <span className="text-purple-100 font-semibold">Premier Croissant</span>
              <p className="text-purple-300/70">Germination, action</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌓</span>
            <div>
              <span className="text-purple-100 font-semibold">Premier Quartier</span>
              <p className="text-purple-300/70">Construction, détermination</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌔</span>
            <div>
              <span className="text-purple-100 font-semibold">Gibbeuse Croissante</span>
              <p className="text-purple-300/70">Raffinement, ajustement</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌕</span>
            <div>
              <span className="text-purple-100 font-semibold">Pleine Lune</span>
              <p className="text-purple-300/70">Accomplissement, gratitude</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌖</span>
            <div>
              <span className="text-purple-100 font-semibold">Gibbeuse Décroissante</span>
              <p className="text-purple-300/70">Partage, récolte</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌗</span>
            <div>
              <span className="text-purple-100 font-semibold">Dernier Quartier</span>
              <p className="text-purple-300/70">Libération, pardon</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌘</span>
            <div>
              <span className="text-purple-100 font-semibold">Dernier Croissant</span>
              <p className="text-purple-300/70">Repos, introspection</p>
            </div>
          </div>
        </div>
      </div>

      {/* Source */}
      <div className="text-center text-xs text-purple-300/50">
        <p>
          Données astronomiques précises • Sources:{' '}
          <a
            href="https://www.lunaf.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-300 hover:text-purple-200 underline"
          >
            Lunaf
          </a>
          {', '}
          <a
            href="https://www.timeanddate.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-300 hover:text-purple-200 underline"
          >
            Time and Date
          </a>
        </p>
      </div>
    </div>
  );
};

export default MoonCalendar;
