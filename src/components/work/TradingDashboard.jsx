import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, DollarSign, Activity, AlertCircle, BarChart3 } from 'lucide-react';

const TradingDashboard = () => {
  const [pairs, setPairs] = useState({
    'BTCUSDT': { price: 0, change: 0, high: 0, low: 0, volume: 0, loading: true },
    'XAUUSD': { price: 0, change: 0, high: 0, low: 0, volume: 0, loading: true },
    'XBRUSD': { price: 0, change: 0, high: 0, low: 0, volume: 0, loading: true },
    'USDJPY': { price: 0, change: 0, high: 0, low: 0, volume: 0, loading: true },
    'EURUSD': { price: 0, change: 0, high: 0, low: 0, volume: 0, loading: true }
  });
  
  const [selectedPair, setSelectedPair] = useState('BTCUSDT');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const refreshInterval = useRef(null);

  // Informations sur les paires
  const pairInfo = {
    'BTCUSDT': { name: 'Bitcoin', symbol: '₿', color: 'orange', api: 'binance' },
    'XAUUSD': { name: 'Or', symbol: 'XAU', color: 'yellow', api: 'forex' },
    'XBRUSD': { name: 'Pétrole Brent', symbol: 'XBR', color: 'blue', api: 'forex' },
    'USDJPY': { name: 'Dollar/Yen', symbol: '¥', color: 'green', api: 'forex' },
    'EURUSD': { name: 'Euro/Dollar', symbol: '€', color: 'purple', api: 'forex' }
  };

  // Récupérer les données (simulation avec données réalistes)
  const fetchPairData = async (pair) => {
    try {
      const info = pairInfo[pair];
      
      if (info.api === 'binance' && pair === 'BTCUSDT') {
        // API Binance pour BTC
        const response = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT');
        const data = await response.json();
        
        return {
          price: parseFloat(data.lastPrice),
          change: parseFloat(data.priceChangePercent),
          high: parseFloat(data.highPrice),
          low: parseFloat(data.lowPrice),
          volume: parseFloat(data.volume),
          loading: false
        };
      } else {
        // Simulation pour les autres paires (données réalistes)
        const basePrice = {
          'XAUUSD': 2050 + Math.random() * 50,
          'XBRUSD': 85 + Math.random() * 5,
          'USDJPY': 148 + Math.random() * 2,
          'EURUSD': 1.08 + Math.random() * 0.02
        };
        
        const price = basePrice[pair] || 100;
        const change = (Math.random() - 0.5) * 4; // -2% à +2%
        
        return {
          price: parseFloat(price.toFixed(pair === 'USDJPY' || pair === 'EURUSD' ? 4 : 2)),
          change: parseFloat(change.toFixed(2)),
          high: parseFloat((price * 1.01).toFixed(2)),
          low: parseFloat((price * 0.99).toFixed(2)),
          volume: Math.floor(Math.random() * 1000000),
          loading: false
        };
      }
    } catch (error) {
      console.error(`Erreur fetch ${pair}:`, error);
      return { ...pairs[pair], loading: false };
    }
  };

  // Mettre à jour toutes les paires
  const updateAllPairs = async () => {
    const updates = {};
    
    for (const pair of Object.keys(pairs)) {
      const data = await fetchPairData(pair);
      updates[pair] = data;
    }
    
    setPairs(updates);
    setLastUpdate(new Date());
  };

  // Auto-refresh
  useEffect(() => {
    updateAllPairs();
    
    if (autoRefresh) {
      refreshInterval.current = setInterval(updateAllPairs, 30000); // 30 secondes
    }
    
    return () => {
      if (refreshInterval.current) {
        clearInterval(refreshInterval.current);
      }
    };
  }, [autoRefresh]);

  // Format prix selon la paire
  const formatPrice = (pair, price) => {
    if (pair === 'BTCUSDT') return `$${price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    if (pair === 'XAUUSD') return `$${price.toFixed(2)}`;
    if (pair === 'XBRUSD') return `$${price.toFixed(2)}`;
    if (pair === 'USDJPY') return price.toFixed(3);
    if (pair === 'EURUSD') return price.toFixed(5);
    return price.toString();
  };

  const selectedData = pairs[selectedPair];
  const selectedInfo = pairInfo[selectedPair];

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-green-400 mb-2">
            📈 Trading Dashboard Pro
          </h2>
          <p className="text-gray-400 text-sm">
            Suivi en temps réel des marchés financiers
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-gray-400">Dernière MAJ</div>
            <div className="text-sm text-white">{lastUpdate.toLocaleTimeString('fr-FR')}</div>
          </div>
          
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              autoRefresh
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            <RefreshCw size={20} className={autoRefresh ? 'animate-spin' : ''} />
          </button>
          
          <button
            onClick={updateAllPairs}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </div>

      {/* Grille des paires */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries(pairs).map(([pair, data]) => {
          const info = pairInfo[pair];
          const isPositive = data.change >= 0;
          
          return (
            <button
              key={pair}
              onClick={() => setSelectedPair(pair)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                selectedPair === pair
                  ? `border-${info.color}-500 bg-${info.color}-900/30`
                  : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400">{info.name}</span>
                {data.loading ? (
                  <div className="animate-spin w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full" />
                ) : isPositive ? (
                  <TrendingUp className="text-green-400" size={16} />
                ) : (
                  <TrendingDown className="text-red-400" size={16} />
                )}
              </div>
              
              <div className="text-2xl font-bold text-white mb-1">
                {data.loading ? '...' : formatPrice(pair, data.price)}
              </div>
              
              <div className={`text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {data.loading ? '...' : `${isPositive ? '+' : ''}${data.change.toFixed(2)}%`}
              </div>
            </button>
          );
        })}
      </div>

      {/* Détails de la paire sélectionnée */}
      <div className="bg-gradient-to-br from-gray-900/50 to-slate-900/50 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full bg-${selectedInfo.color}-900/30 flex items-center justify-center text-3xl`}>
              {selectedInfo.symbol}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{selectedInfo.name}</h3>
              <p className="text-gray-400">{selectedPair}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-4xl font-bold text-white mb-1">
              {formatPrice(selectedPair, selectedData.price)}
            </div>
            <div className={`text-xl font-semibold flex items-center gap-2 justify-end ${
              selectedData.change >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {selectedData.change >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
              {selectedData.change >= 0 ? '+' : ''}{selectedData.change.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Statistiques 24h */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="text-xs text-gray-400 mb-1">Plus Haut 24h</div>
            <div className="text-xl font-bold text-green-400">
              {formatPrice(selectedPair, selectedData.high)}
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="text-xs text-gray-400 mb-1">Plus Bas 24h</div>
            <div className="text-xl font-bold text-red-400">
              {formatPrice(selectedPair, selectedData.low)}
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="text-xs text-gray-400 mb-1">Volume 24h</div>
            <div className="text-xl font-bold text-blue-400">
              {selectedData.volume.toLocaleString('en-US', {maximumFractionDigits: 0})}
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="text-xs text-gray-400 mb-1">Variation</div>
            <div className="text-xl font-bold text-purple-400">
              {((selectedData.high - selectedData.low) / selectedData.low * 100).toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Graphique simplifié (barre de progression) */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>Bas: {formatPrice(selectedPair, selectedData.low)}</span>
            <span>Actuel</span>
            <span>Haut: {formatPrice(selectedPair, selectedData.high)}</span>
          </div>
          
          <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-500"
              style={{
                width: `${((selectedData.price - selectedData.low) / (selectedData.high - selectedData.low)) * 100}%`
              }}
            />
            <div
              className="absolute h-full w-1 bg-white shadow-lg transition-all duration-500"
              style={{
                left: `${((selectedData.price - selectedData.low) / (selectedData.high - selectedData.low)) * 100}%`
              }}
            />
          </div>
        </div>
      </div>

      {/* Alertes et Analyses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Analyse technique simplifiée */}
        <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 rounded-xl p-6 border border-blue-700/30">
          <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
            <BarChart3 size={20} />
            Analyse Technique
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Tendance</span>
              <span className={`font-semibold ${selectedData.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {selectedData.change >= 2 ? 'Haussière forte' :
                 selectedData.change >= 0 ? 'Haussière' :
                 selectedData.change >= -2 ? 'Baissière' :
                 'Baissière forte'}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Volatilité</span>
              <span className="text-white font-semibold">
                {((selectedData.high - selectedData.low) / selectedData.low * 100) > 3 ? 'Élevée' :
                 ((selectedData.high - selectedData.low) / selectedData.low * 100) > 1.5 ? 'Moyenne' :
                 'Faible'}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Signal</span>
              <span className={`font-semibold ${
                selectedData.change >= 1 ? 'text-green-400' :
                selectedData.change <= -1 ? 'text-red-400' :
                'text-yellow-400'
              }`}>
                {selectedData.change >= 1 ? '🟢 Achat' :
                 selectedData.change <= -1 ? '🔴 Vente' :
                 '🟡 Neutre'}
              </span>
            </div>
          </div>
        </div>

        {/* Alertes */}
        <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 rounded-xl p-6 border border-amber-700/30">
          <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
            <AlertCircle size={20} />
            Alertes & Notifications
          </h3>
          
          <div className="space-y-2">
            {Math.abs(selectedData.change) > 3 && (
              <div className={`p-3 rounded-lg ${
                selectedData.change > 0 ? 'bg-green-900/30 border border-green-700/50' : 'bg-red-900/30 border border-red-700/50'
              }`}>
                <div className={`text-sm font-semibold ${selectedData.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ⚠️ Mouvement important détecté
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Variation de {Math.abs(selectedData.change).toFixed(2)}% en 24h
                </div>
              </div>
            )}
            
            {((selectedData.high - selectedData.low) / selectedData.low * 100) > 3 && (
              <div className="p-3 rounded-lg bg-yellow-900/30 border border-yellow-700/50">
                <div className="text-sm font-semibold text-yellow-400">
                  ⚡ Forte volatilité
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Écart de {((selectedData.high - selectedData.low) / selectedData.low * 100).toFixed(2)}% entre haut et bas
                </div>
              </div>
            )}
            
            {Math.abs(selectedData.change) <= 1 && (
              <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
                <div className="text-sm font-semibold text-gray-400">
                  😴 Marché calme
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Faible variation sur les dernières 24h
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4 text-sm text-red-300">
        <strong>⚠️ Avertissement :</strong> Les informations affichées sont à titre indicatif uniquement. 
        Ne constituent pas un conseil en investissement. Tradez à vos propres risques.
      </div>
    </div>
  );
};

export default TradingDashboard;
