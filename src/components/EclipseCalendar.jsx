import React, { useState } from 'react';
import { Moon, Eye, Camera, Clock, MapPin, Sparkles, AlertCircle, Info } from 'lucide-react';
import { 
  lunarEclipses2026, 
  getNextEclipse, 
  getGuadeloupeVisibleEclipses,
  observationTips,
  eclipseMeanings
} from '../data/lunarEclipses2026';

const EclipseCalendar = () => {
  const [selectedEclipse, setSelectedEclipse] = useState(null);
  const [showTips, setShowTips] = useState(false);
  const [showMeanings, setShowMeanings] = useState(false);
  
  const nextEclipse = getNextEclipse();
  const guadeloupeEclipses = getGuadeloupeVisibleEclipses();
  
  const getTypeColor = (type) => {
    switch (type) {
      case 'Totale':
        return 'from-red-500/20 to-orange-500/20 border-red-400/30';
      case 'Partielle':
        return 'from-yellow-500/20 to-amber-500/20 border-yellow-400/30';
      case 'Pénombrale':
        return 'from-gray-500/20 to-slate-500/20 border-gray-400/30';
      default:
        return 'from-purple-500/20 to-indigo-500/20 border-purple-400/30';
    }
  };
  
  const getTypeIcon = (type) => {
    switch (type) {
      case 'Totale':
        return '🌕🌑';
      case 'Partielle':
        return '🌕🌗';
      case 'Pénombrale':
        return '🌕🌫️';
      default:
        return '🌙';
    }
  };
  
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* En-tête avec prochaine éclipse */}
      {nextEclipse && (
        <div className={`bg-gradient-to-br ${getTypeColor(nextEclipse.type)} rounded-2xl p-6 backdrop-blur-sm border-2`}>
          <div className="flex items-start gap-4">
            <div className="text-6xl">{nextEclipse.emoji}</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">
                Prochaine Éclipse : {nextEclipse.type}
              </h3>
              <div className="space-y-2 text-white/90">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span className="font-semibold">
                    {new Date(nextEclipse.date).toLocaleDateString('fr-FR', { 
                      weekday: 'long', 
                      day: 'numeric', 
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{nextEclipse.visibility.bestView}</span>
                </div>
                {nextEclipse.visibleFromGuadeloupe && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-green-500/20 border border-green-400/50 rounded-lg mt-3">
                    <Eye size={16} className="text-green-300" />
                    <span className="text-green-200 font-semibold">
                      Visible depuis la Guadeloupe ! 🇬🇵
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-4 px-4 py-3 bg-white/10 rounded-lg text-center">
                <span className="text-3xl font-bold text-white">
                  {nextEclipse.daysUntil === 0 
                    ? "Aujourd'hui !" 
                    : `Dans ${nextEclipse.daysUntil} jour${nextEclipse.daysUntil > 1 ? 's' : ''}`
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Boutons d'information */}
      <div className="grid sm:grid-cols-2 gap-4">
        <button
          onClick={() => setShowTips(!showTips)}
          className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 border border-blue-400/50 rounded-xl transition-all"
        >
          <Camera size={20} className="text-blue-300" />
          <span className="text-blue-200 font-semibold">Conseils d'Observation</span>
        </button>
        
        <button
          onClick={() => setShowMeanings(!showMeanings)}
          className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-400/50 rounded-xl transition-all"
        >
          <Sparkles size={20} className="text-purple-300" />
          <span className="text-purple-200 font-semibold">Significations Spirituelles</span>
        </button>
      </div>
      
      {/* Conseils d'observation */}
      {showTips && (
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4">
          <h3 className="text-xl font-bold text-blue-200 flex items-center gap-2">
            <Camera size={24} />
            Guide d'Observation des Éclipses
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-300">📋 Préparation</h4>
              <ul className="space-y-1 text-sm text-blue-100/80">
                {observationTips.preparation.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-300">📸 Photographie</h4>
              <ul className="space-y-1 text-sm text-blue-100/80">
                {observationTips.photography.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-green-300">✅ Sécurité</h4>
              <ul className="space-y-1 text-sm text-green-100/80">
                {observationTips.safety.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-yellow-300">⏰ Timing</h4>
              <ul className="space-y-1 text-sm text-yellow-100/80">
                {observationTips.timing.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {/* Significations spirituelles */}
      {showMeanings && (
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4">
          <h3 className="text-xl font-bold text-purple-200 flex items-center gap-2">
            <Sparkles size={24} />
            Significations des Éclipses Lunaires
          </h3>
          
          <div className="space-y-4">
            {/* Spirituel */}
            <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-400/30">
              <h4 className="font-semibold text-purple-300 mb-2 flex items-center gap-2">
                <Moon size={18} />
                {eclipseMeanings.spiritual.title}
              </h4>
              <p className="text-sm text-purple-200/80 mb-3">{eclipseMeanings.spiritual.description}</p>
              <ul className="space-y-1 text-sm text-purple-100/80">
                {eclipseMeanings.spiritual.aspects.map((aspect, idx) => (
                  <li key={idx}>{aspect}</li>
                ))}
              </ul>
            </div>
            
            {/* Émotionnel */}
            <div className="bg-pink-500/10 rounded-xl p-4 border border-pink-400/30">
              <h4 className="font-semibold text-pink-300 mb-2 flex items-center gap-2">
                <AlertCircle size={18} />
                {eclipseMeanings.emotional.title}
              </h4>
              <p className="text-sm text-pink-200/80 mb-3">{eclipseMeanings.emotional.description}</p>
              <ul className="space-y-1 text-sm text-pink-100/80">
                {eclipseMeanings.emotional.effects.map((effect, idx) => (
                  <li key={idx}>{effect}</li>
                ))}
              </ul>
            </div>
            
            {/* Rituels */}
            <div className="bg-indigo-500/10 rounded-xl p-4 border border-indigo-400/30">
              <h4 className="font-semibold text-indigo-300 mb-2 flex items-center gap-2">
                <Sparkles size={18} />
                {eclipseMeanings.ritual.title}
              </h4>
              <p className="text-sm text-indigo-200/80 mb-3">{eclipseMeanings.ritual.description}</p>
              <ul className="space-y-1 text-sm text-indigo-100/80">
                {eclipseMeanings.ritual.practices.map((practice, idx) => (
                  <li key={idx}>{practice}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {/* Liste des éclipses 2026 */}
      <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-red-200 to-orange-200 bg-clip-text text-transparent mb-6">
          🌑 Éclipses Lunaires 2026
        </h3>
        
        <div className="space-y-4">
          {lunarEclipses2026.map((eclipse) => {
            const eclipseDate = new Date(eclipse.date);
            const isSelected = selectedEclipse?.id === eclipse.id;
            const isPast = eclipseDate < new Date();
            
            return (
              <div key={eclipse.id} className="space-y-3">
                <div
                  onClick={() => setSelectedEclipse(isSelected ? null : eclipse)}
                  className={`cursor-pointer transition-all ${
                    isPast ? 'opacity-60' : ''
                  }`}
                >
                  <div className={`bg-gradient-to-br ${getTypeColor(eclipse.type)} rounded-xl p-5 border-2 hover:scale-[1.02] transition-all`}>
                    <div className="flex items-start gap-4">
                      <div className="text-5xl">{eclipse.emoji}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xl font-bold text-white">
                            Éclipse {eclipse.type}
                          </h4>
                          {eclipse.visibleFromGuadeloupe && (
                            <span className="px-3 py-1 bg-green-500/30 text-green-200 text-xs rounded-full border border-green-400/50">
                              🇬🇵 Visible Guadeloupe
                            </span>
                          )}
                        </div>
                        
                        <div className="space-y-2 text-sm text-white/90">
                          <div className="flex items-center gap-2">
                            <Clock size={14} />
                            <span>
                              {eclipseDate.toLocaleDateString('fr-FR', { 
                                weekday: 'long', 
                                day: 'numeric', 
                                month: 'long',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <MapPin size={14} />
                            <span>{eclipse.visibility.bestView}</span>
                          </div>
                          
                          <p className="text-white/80 mt-2">{eclipse.description}</p>
                        </div>
                        
                        <button className="mt-3 text-xs text-white/60 hover:text-white/90 flex items-center gap-1">
                          <Info size={12} />
                          {isSelected ? 'Masquer les détails' : 'Voir les détails'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Détails étendus */}
                {isSelected && (
                  <div className="bg-white/5 rounded-xl p-5 border border-white/10 ml-4 space-y-4">
                    {/* Timing */}
                    <div>
                      <h5 className="font-semibold text-purple-300 mb-2">⏰ Horaires (UTC)</h5>
                      <div className="grid sm:grid-cols-3 gap-3 text-sm">
                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="text-purple-300/70 text-xs">Début</div>
                          <div className="text-white font-semibold">{eclipse.timing.start}</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="text-purple-300/70 text-xs">Maximum</div>
                          <div className="text-white font-semibold">{eclipse.timing.maximum}</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="text-purple-300/70 text-xs">Fin</div>
                          <div className="text-white font-semibold">{eclipse.timing.end}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Durée */}
                    <div>
                      <h5 className="font-semibold text-purple-300 mb-2">⏱️ Durée</h5>
                      <div className="space-y-2 text-sm">
                        {eclipse.duration.total !== 'N/A' && (
                          <div className="flex justify-between">
                            <span className="text-purple-200/70">Phase totale:</span>
                            <span className="text-white font-semibold">{eclipse.duration.total}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-purple-200/70">Phase partielle:</span>
                          <span className="text-white font-semibold">{eclipse.duration.partial}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-200/70">Phase pénombrale:</span>
                          <span className="text-white font-semibold">{eclipse.duration.penumbral}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Visibilité */}
                    <div>
                      <h5 className="font-semibold text-purple-300 mb-2">🌍 Régions de Visibilité</h5>
                      <div className="flex flex-wrap gap-2">
                        {eclipse.visibility.regions.map((region, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-purple-500/20 text-purple-200 text-xs rounded-full border border-purple-400/30"
                          >
                            {region}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Couleur */}
                    {eclipse.color && (
                      <div>
                        <h5 className="font-semibold text-purple-300 mb-2">🎨 Couleur</h5>
                        <p className="text-sm text-purple-200/80">{eclipse.color}</p>
                      </div>
                    )}
                    
                    {/* Signification */}
                    <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-400/30">
                      <h5 className="font-semibold text-purple-300 mb-2">✨ Signification</h5>
                      <p className="text-sm text-purple-200/80">{eclipse.significance}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Éclipses visibles depuis la Guadeloupe */}
      {guadeloupeEclipses.length > 0 && (
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border-2 border-green-400/30">
          <h3 className="text-xl font-bold text-green-200 mb-4 flex items-center gap-2">
            <Eye size={24} />
            🇬🇵 Éclipses Visibles depuis la Guadeloupe
          </h3>
          <div className="space-y-3">
            {guadeloupeEclipses.map((eclipse) => (
              <div key={eclipse.id} className="flex items-center justify-between bg-white/5 rounded-lg p-4">
                <div>
                  <div className="font-semibold text-green-100">{eclipse.type}</div>
                  <div className="text-sm text-green-200/70">
                    {new Date(eclipse.date).toLocaleDateString('fr-FR', { 
                      day: 'numeric', 
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </div>
                <div className="text-3xl">{eclipse.emoji}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Note */}
      <div className="text-center text-xs text-purple-300/50">
        <p>
          Données astronomiques calculées • Horaires en UTC (ajouter -4h pour Guadeloupe)
        </p>
      </div>
    </div>
  );
};

export default EclipseCalendar;
