import React, { useState, useEffect, useRef } from 'react';
import { Clock, Play, Pause, RotateCcw, Calendar, TrendingUp, Moon, Sun } from 'lucide-react';

const IntermittentFasting = () => {
  const [fastingType, setFastingType] = useState('16-8'); // 16:8, 18:6, 20:4, 24h
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [fastingHistory, setFastingHistory] = useState([]);
  const [currentPhase, setCurrentPhase] = useState('eating'); // eating ou fasting
  const intervalRef = useRef(null);

  // Types de jeûne disponibles
  const fastingTypes = {
    '16-8': { fast: 16, eat: 8, name: '16:8 (Débutant)', description: '16h jeûne, 8h alimentation' },
    '18-6': { fast: 18, eat: 6, name: '18:6 (Intermédiaire)', description: '18h jeûne, 6h alimentation' },
    '20-4': { fast: 20, eat: 4, name: '20:4 (Avancé)', description: '20h jeûne, 4h alimentation' },
    '24': { fast: 24, eat: 0, name: '24h (Warrior)', description: '24h de jeûne complet' }
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

  // Timer
  useEffect(() => {
    if (isActive && startTime) {
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - startTime) / 1000);
        setElapsedTime(elapsed);

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
  }, [isActive, startTime, fastingType, currentPhase]);

  // Démarrer le jeûne
  const startFast = () => {
    const now = Date.now();
    setStartTime(now);
    setIsActive(true);
    setElapsedTime(0);
    setCurrentPhase('fasting');
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
        </ul>
      </div>
    </div>
  );
};

export default IntermittentFasting;
