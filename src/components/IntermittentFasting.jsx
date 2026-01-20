import React, { useState, useEffect, useRef } from 'react';
import { Clock, Play, Pause, RotateCcw, Calendar, TrendingUp, Moon, Sun, MessageCircle, X } from 'lucide-react';

const IntermittentFasting = () => {
  const [fastingType, setFastingType] = useState('16-8'); // 16:8, 18:6, 20:4, 24h
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [fastingHistory, setFastingHistory] = useState([]);
  const [currentPhase, setCurrentPhase] = useState('eating'); // eating ou fasting
  const [encouragementMessage, setEncouragementMessage] = useState(null);
  const [lastEncouragementHour, setLastEncouragementHour] = useState(0);
  const intervalRef = useRef(null);

  // Types de jeûne disponibles
  const fastingTypes = {
    '16-8': { fast: 16, eat: 8, name: '16:8 (Débutant)', description: '16h jeûne, 8h alimentation' },
    '18-6': { fast: 18, eat: 6, name: '18:6 (Intermédiaire)', description: '18h jeûne, 6h alimentation' },
    '20-4': { fast: 20, eat: 4, name: '20:4 (Avancé)', description: '20h jeûne, 4h alimentation' },
    '24': { fast: 24, eat: 0, name: '24h (Warrior)', description: '24h de jeûne complet' }
  };

  // Messages d'encouragement par tranche de 2 heures
  const encouragementMessages = {
    2: {
      title: "🌱 Excellent départ !",
      message: "2 heures de jeûne accompli ! Votre corps commence à puiser dans ses réserves de glycogène. Restez hydraté !",
      tip: "💧 Buvez un grand verre d'eau"
    },
    4: {
      title: "💪 Vous êtes sur la bonne voie !",
      message: "4 heures ! Votre insuline commence à baisser. C'est le moment idéal pour une activité légère.",
      tip: "🚶 Une petite marche serait parfaite"
    },
    6: {
      title: "🔥 La cétose approche !",
      message: "6 heures de jeûne ! Votre corps commence la transition vers la combustion des graisses. Bravo !",
      tip: "☕ Un thé ou café sans sucre pour vous accompagner"
    },
    8: {
      title: "⭐ Vous êtes à mi-chemin !",
      message: "8 heures ! La moitié du chemin est parcourue. Votre corps est maintenant en mode détox.",
      tip: "🧘 Prenez quelques minutes pour méditer"
    },
    10: {
      title: "🌟 Performance maximale !",
      message: "10 heures ! Votre clarté mentale est à son pic. L'autophagie cellulaire est en marche.",
      tip: "🧠 Profitez de cette concentration pour vos tâches importantes"
    },
    12: {
      title: "🏆 Champion du jeûne !",
      message: "12 heures accomplies ! Votre corps brûle activement les graisses. Vous êtes incroyable !",
      tip: "💪 Vous pouvez faire quelques étirements"
    },
    14: {
      title: "🎯 Presque au but !",
      message: "14 heures ! L'autophagie bat son plein. Vos cellules se régénèrent. Continuez !",
      tip: "🌿 Une tisane pour vous réconforter"
    },
    16: {
      title: "🎉 16 heures accomplies !",
      message: "Félicitations ! Vous avez atteint les 16 heures. Votre corps vous remercie pour ce cadeau !",
      tip: "🍽️ Préparez un repas équilibré pour rompre le jeûne"
    },
    18: {
      title: "🌙 Maître du jeûne !",
      message: "18 heures ! Vous êtes dans la zone d'élite. Les bénéfices sont maximaux !",
      tip: "🙏 Prenez un moment de gratitude"
    },
    20: {
      title: "👑 Niveau expert atteint !",
      message: "20 heures ! Votre résilience est impressionnante. L'autophagie profonde est active.",
      tip: "✨ Vous êtes un guerrier du jeûne"
    },
    22: {
      title: "🔮 Zone mystique !",
      message: "22 heures ! Peu de personnes atteignent ce niveau. Votre corps se transforme.",
      tip: "🌟 La fin approche, tenez bon"
    },
    24: {
      title: "🏅 Jeûne de 24h complété !",
      message: "Extraordinaire ! 24 heures de jeûne. Vous avez accompli quelque chose de remarquable !",
      tip: "🎊 Célébrez cette victoire avec un repas conscient"
    }
  };

  // Charger les données depuis localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('neguslunar-fasting-history');
    const savedActive = localStorage.getItem('neguslunar-fasting-active');
    const savedStart = localStorage.getItem('neguslunar-fasting-start');
    const savedPhase = localStorage.getItem('neguslunar-fasting-phase');
    const savedType = localStorage.getItem('neguslunar-fasting-type');

    if (savedHistory) setFastingHistory(JSON.parse(savedHistory));
    if (savedType) setFastingType(savedType);
    if (savedActive === 'true' && savedStart) {
      setIsActive(true);
      setStartTime(parseInt(savedStart));
      setCurrentPhase(savedPhase || 'fasting');
    }
  }, []);

  // Sauvegarder dans localStorage
  useEffect(() => {
    localStorage.setItem('neguslunar-fasting-history', JSON.stringify(fastingHistory));
  }, [fastingHistory]);

  useEffect(() => {
    localStorage.setItem('neguslunar-fasting-active', isActive.toString());
    localStorage.setItem('neguslunar-fasting-start', startTime?.toString() || '');
    localStorage.setItem('neguslunar-fasting-phase', currentPhase);
    localStorage.setItem('neguslunar-fasting-type', fastingType);
  }, [isActive, startTime, currentPhase, fastingType]);

  // Timer et messages d'encouragement
  useEffect(() => {
    if (isActive && startTime) {
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - startTime) / 1000);
        setElapsedTime(elapsed);

        // Calculer les heures écoulées
        const hoursElapsed = Math.floor(elapsed / 3600);

        // Afficher un message d'encouragement toutes les 2 heures
        if (hoursElapsed > 0 && hoursElapsed % 2 === 0 && hoursElapsed !== lastEncouragementHour) {
          if (encouragementMessages[hoursElapsed]) {
            setEncouragementMessage(encouragementMessages[hoursElapsed]);
            setLastEncouragementHour(hoursElapsed);
            
            // Notification navigateur si autorisée
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('🌙 NegusLunar - Jeûne Intermittent', {
                body: encouragementMessages[hoursElapsed].message,
                icon: '/moon.svg',
                badge: '/moon.svg'
              });
            }
          }
        }

        // Vérifier si le jeûne est terminé
        const targetHours = fastingTypes[fastingType].fast;
        const targetSeconds = targetHours * 3600;
        
        if (elapsed >= targetSeconds && currentPhase === 'fasting') {
          // Jeûne terminé
          completeFast();
        }
      }, 1000);

      return () => clearInterval(intervalRef.current);
    }
  }, [isActive, startTime, fastingType, currentPhase, lastEncouragementHour]);

  // Demander la permission pour les notifications
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Démarrer le jeûne
  const startFast = () => {
    const now = Date.now();
    setStartTime(now);
    setIsActive(true);
    setElapsedTime(0);
    setCurrentPhase('fasting');
    setLastEncouragementHour(0);
    setEncouragementMessage(null);
  };

  // Mettre en pause
  const pauseFast = () => {
    setIsActive(false);
    clearInterval(intervalRef.current);
  };

  // Reprendre
  const resumeFast = () => {
    const now = Date.now();
    const newStart = now - (elapsedTime * 1000);
    setStartTime(newStart);
    setIsActive(true);
  };

  // Terminer le jeûne
  const completeFast = () => {
    const fast = {
      id: Date.now(),
      type: fastingType,
      duration: elapsedTime,
      targetDuration: fastingTypes[fastingType].fast * 3600,
      startTime: startTime,
      endTime: Date.now(),
      completed: elapsedTime >= (fastingTypes[fastingType].fast * 3600),
      date: new Date().toISOString()
    };

    setFastingHistory([fast, ...fastingHistory]);
    resetFast();
  };

  // Réinitialiser
  const resetFast = () => {
    setIsActive(false);
    setStartTime(null);
    setElapsedTime(0);
    setCurrentPhase('eating');
    clearInterval(intervalRef.current);
  };

  // Formater le temps
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Calculer le pourcentage de progression
  const getProgress = () => {
    const targetSeconds = fastingTypes[fastingType].fast * 3600;
    return Math.min((elapsedTime / targetSeconds) * 100, 100);
  };

  // Statistiques
  const getStats = () => {
    const completed = fastingHistory.filter(f => f.completed).length;
    const totalDuration = fastingHistory.reduce((acc, f) => acc + f.duration, 0);
    const avgDuration = fastingHistory.length > 0 ? totalDuration / fastingHistory.length : 0;
    const longestFast = fastingHistory.length > 0 
      ? Math.max(...fastingHistory.map(f => f.duration)) 
      : 0;

    return {
      completed,
      total: fastingHistory.length,
      avgDuration: Math.floor(avgDuration / 3600),
      longestFast: Math.floor(longestFast / 3600)
    };
  };

  const stats = getStats();
  const progress = getProgress();
  const targetHours = fastingTypes[fastingType].fast;
  const currentHours = Math.floor(elapsedTime / 3600);

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-amber-400 mb-2">
          ⏱️ Jeûne Intermittent
        </h2>
        <p className="text-gray-400 text-sm">
          Suivez vos périodes de jeûne et optimisez votre santé
        </p>
      </div>

      {/* Sélection du type de jeûne */}
      {!isActive && (
        <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-xl p-6 border border-indigo-700/30">
          <h3 className="text-lg font-bold text-indigo-400 mb-4">Choisir un protocole</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(fastingTypes).map(([key, type]) => (
              <button
                key={key}
                onClick={() => setFastingType(key)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  fastingType === key
                    ? 'border-indigo-500 bg-indigo-900/30'
                    : 'border-gray-700 bg-gray-800/30 hover:border-indigo-700'
                }`}
              >
                <div className="font-bold text-white mb-1">{type.name}</div>
                <div className="text-sm text-gray-400">{type.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Timer principal */}
      <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 rounded-xl p-8 border border-amber-700/30">
        {/* Phase actuelle */}
        <div className="text-center mb-6">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
            currentPhase === 'fasting' 
              ? 'bg-blue-900/30 text-blue-400 border border-blue-700/50'
              : 'bg-green-900/30 text-green-400 border border-green-700/50'
          }`}>
            {currentPhase === 'fasting' ? <Moon size={20} /> : <Sun size={20} />}
            <span className="font-semibold">
              {currentPhase === 'fasting' ? 'Phase de Jeûne' : 'Phase d\'Alimentation'}
            </span>
          </div>
        </div>

        {/* Cercle de progression */}
        <div className="relative w-64 h-64 mx-auto mb-6">
          <svg className="transform -rotate-90 w-full h-full">
            {/* Cercle de fond */}
            <circle
              cx="128"
              cy="128"
              r="110"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-gray-700"
            />
            {/* Cercle de progression */}
            <circle
              cx="128"
              cy="128"
              r="110"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 110}`}
              strokeDashoffset={`${2 * Math.PI * 110 * (1 - progress / 100)}`}
              className="text-amber-500 transition-all duration-1000"
              strokeLinecap="round"
            />
          </svg>
          
          {/* Temps au centre */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-white mb-2">
              {formatTime(elapsedTime)}
            </div>
            <div className="text-sm text-gray-400">
              {currentHours}h / {targetHours}h
            </div>
            <div className="text-lg font-semibold text-amber-400 mt-2">
              {Math.round(progress)}%
            </div>
          </div>
        </div>

        {/* Contrôles */}
        <div className="flex justify-center gap-3">
          {!isActive ? (
            <button
              onClick={startFast}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-lg transition-all flex items-center gap-2 font-semibold"
            >
              <Play size={20} />
              <span>Démarrer le jeûne</span>
            </button>
          ) : (
            <>
              <button
                onClick={pauseFast}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <Pause size={20} />
                <span>Pause</span>
              </button>
              <button
                onClick={completeFast}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <Clock size={20} />
                <span>Terminer</span>
              </button>
              <button
                onClick={resetFast}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <RotateCcw size={20} />
                <span>Réinitialiser</span>
              </button>
            </>
          )}
        </div>

        {!isActive && elapsedTime > 0 && (
          <button
            onClick={resumeFast}
            className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Play size={20} />
            <span>Reprendre</span>
          </button>
        )}
      </div>

      {/* Statistiques */}
      <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-700/30">
        <h3 className="text-lg font-bold text-purple-400 mb-4 flex items-center gap-2">
          <TrendingUp size={20} />
          Statistiques
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-green-400">{stats.completed}</div>
            <div className="text-sm text-gray-400 mt-1">Jeûnes réussis</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-blue-400">{stats.total}</div>
            <div className="text-sm text-gray-400 mt-1">Total de jeûnes</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-amber-400">{stats.avgDuration}h</div>
            <div className="text-sm text-gray-400 mt-1">Durée moyenne</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-purple-400">{stats.longestFast}h</div>
            <div className="text-sm text-gray-400 mt-1">Plus long jeûne</div>
          </div>
        </div>
      </div>

      {/* Historique */}
      {fastingHistory.length > 0 && (
        <div className="bg-gradient-to-br from-gray-900/20 to-slate-900/20 rounded-xl p-6 border border-gray-700/30">
          <h3 className="text-lg font-bold text-gray-300 mb-4 flex items-center gap-2">
            <Calendar size={20} />
            Historique des jeûnes
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {fastingHistory.slice(0, 10).map(fast => (
              <div 
                key={fast.id}
                className={`bg-gray-800/50 rounded-lg p-3 flex items-center justify-between ${
                  fast.completed ? 'border-l-4 border-green-500' : 'border-l-4 border-yellow-500'
                }`}
              >
                <div>
                  <div className="font-semibold text-white">
                    {fastingTypes[fast.type].name}
                  </div>
                  <div className="text-sm text-gray-400">
                    {new Date(fast.date).toLocaleDateString('fr-FR', { 
                      day: 'numeric', 
                      month: 'short', 
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-amber-400">
                    {formatTime(fast.duration)}
                  </div>
                  <div className="text-xs text-gray-400">
                    {fast.completed ? '✓ Complété' : '⚠ Interrompu'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message d'encouragement */}
      {encouragementMessage && (
        <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-6 border-2 border-green-500/50 shadow-lg shadow-green-500/20 animate-fadeIn relative">
          <button
            onClick={() => setEncouragementMessage(null)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-start gap-4">
            <div className="text-4xl">
              <MessageCircle className="text-green-400" size={40} />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-green-400 mb-2">
                {encouragementMessage.title}
              </h3>
              <p className="text-white text-base mb-3 leading-relaxed">
                {encouragementMessage.message}
              </p>
              <div className="bg-green-800/30 rounded-lg p-3 border border-green-700/50">
                <p className="text-green-300 text-sm font-semibold">
                  {encouragementMessage.tip}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conseils */}
      <div className="bg-gradient-to-br from-teal-900/20 to-cyan-900/20 rounded-xl p-6 border border-teal-700/30">
        <h3 className="text-lg font-bold text-teal-400 mb-3">💡 Conseils pour réussir</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-teal-400 mt-1">•</span>
            <span>Restez bien hydraté pendant le jeûne (eau, thé, café sans sucre)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-400 mt-1">•</span>
            <span>Commencez progressivement avec le protocole 16:8</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-400 mt-1">•</span>
            <span>Écoutez votre corps et adaptez selon vos besoins</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-400 mt-1">•</span>
            <span>Privilégiez des repas équilibrés pendant la fenêtre d'alimentation</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-400 mt-1">•</span>
            <span>📬 Vous recevrez un message d'encouragement toutes les 2 heures</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default IntermittentFasting;
