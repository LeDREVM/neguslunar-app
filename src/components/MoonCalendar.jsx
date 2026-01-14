import React, { useState } from 'react';
import { Calendar, Moon, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { moonPhases2026, getNextFullMoon, getNextNewMoon, getMoonPhasesForMonth } from '../data/moonPhases2026';

const MoonCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear] = useState(2026);
  
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  
  const nextFullMoon = getNextFullMoon();
  const nextNewMoon = getNextNewMoon();
  const monthPhases = getMoonPhasesForMonth(selectedYear, selectedMonth);
  
  const changeMonth = (direction) => {
    setSelectedMonth(prev => {
      const newMonth = prev + direction;
      if (newMonth < 0) return 11;
      if (newMonth > 11) return 0;
      return newMonth;
    });
  };
  
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* En-tête avec prochaines phases */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Prochaine Pleine Lune */}
        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 backdrop-blur-sm border-2 border-yellow-400/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-4xl">🌕</div>
            <div>
              <h3 className="text-xl font-bold text-yellow-200">Prochaine Pleine Lune</h3>
              <p className="text-yellow-300/80 text-sm">Accomplissement & Gratitude</p>
            </div>
          </div>
          {nextFullMoon && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-yellow-100">
                <Calendar size={16} />
                <span className="font-semibold">
                  {new Date(nextFullMoon.date).toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long' 
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-yellow-100">
                <Clock size={16} />
                <span>{nextFullMoon.time}</span>
              </div>
              <div className="mt-3 px-3 py-2 bg-yellow-500/20 rounded-lg text-center">
                <span className="text-2xl font-bold text-yellow-200">
                  {nextFullMoon.daysUntil === 0 ? "Aujourd'hui !" : `Dans ${nextFullMoon.daysUntil} jour${nextFullMoon.daysUntil > 1 ? 's' : ''}`}
                </span>
              </div>
            </div>
          )}
        </div>
        
        {/* Prochaine Nouvelle Lune */}
        <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl p-6 backdrop-blur-sm border-2 border-indigo-400/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-4xl">🌑</div>
            <div>
              <h3 className="text-xl font-bold text-indigo-200">Prochaine Nouvelle Lune</h3>
              <p className="text-indigo-300/80 text-sm">Nouveau Départ & Intentions</p>
            </div>
          </div>
          {nextNewMoon && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-indigo-100">
                <Calendar size={16} />
                <span className="font-semibold">
                  {new Date(nextNewMoon.date).toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long' 
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-indigo-100">
                <Clock size={16} />
                <span>{nextNewMoon.time}</span>
              </div>
              <div className="mt-3 px-3 py-2 bg-indigo-500/20 rounded-lg text-center">
                <span className="text-2xl font-bold text-indigo-200">
                  {nextNewMoon.daysUntil === 0 ? "Aujourd'hui !" : `Dans ${nextNewMoon.daysUntil} jour${nextNewMoon.daysUntil > 1 ? 's' : ''}`}
                </span>
              </div>
            </div>
          )}
        </div>
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
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    isToday
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
        <div className="grid sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌑</span>
            <div>
              <span className="text-purple-100 font-semibold">Nouvelle Lune</span>
              <p className="text-purple-300/70">Nouveau départ, intentions</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌕</span>
            <div>
              <span className="text-purple-100 font-semibold">Pleine Lune</span>
              <p className="text-purple-300/70">Accomplissement, gratitude</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Source */}
      <div className="text-center text-xs text-purple-300/50">
        <p>
          Données astronomiques précises • Source:{' '}
          <a 
            href="https://alarmemeteo.ch/blog/calendrier-lunaire.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-purple-300 hover:text-purple-200 underline"
          >
            Alarme-Météo
          </a>
        </p>
      </div>
    </div>
  );
};

export default MoonCalendar;
