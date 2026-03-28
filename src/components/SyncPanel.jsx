import React, { useState } from 'react';
import { Cloud, Download, Upload, CheckCircle, AlertCircle, Settings, X, RefreshCw } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import {
  syncAllModules, fetchAllModules,
  testNextcloudConnection, saveNextcloudConfig, loadNextcloudConfig
} from '../utils/nextcloudSync';
import { getAllItems, setItem, STORES } from '../utils/database';

// ─── Config panel ─────────────────────────────────────────────────────────────
const ConfigPanel = ({ onClose }) => {
  const [config, setConfig] = useState(() => loadNextcloudConfig() || { serverUrl: '', username: '', password: '' });
  const [status, setStatus] = useState(null);
  const [testing, setTesting] = useState(false);

  const handleTest = async () => {
    setTesting(true);
    setStatus(null);
    const result = await testNextcloudConnection(config.serverUrl, config.username, config.password);
    setStatus(result);
    setTesting(false);
    if (result.success) saveNextcloudConfig(config);
  };

  return (
    <div className="bg-slate-800/80 border border-blue-700/40 rounded-xl p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-blue-400 font-semibold text-sm">Configuration Nextcloud</h4>
        <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={16} /></button>
      </div>
      {['serverUrl', 'username', 'password'].map(field => (
        <input
          key={field}
          type={field === 'password' ? 'password' : field === 'serverUrl' ? 'url' : 'text'}
          placeholder={field === 'serverUrl' ? 'https://mon-nextcloud.exemple.com' : field === 'username' ? 'Identifiant' : 'Mot de passe d\'application'}
          value={config[field]}
          onChange={e => setConfig(c => ({ ...c, [field]: e.target.value }))}
          className="w-full bg-gray-900/60 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
        />
      ))}
      {status && (
        <div className={`flex items-center gap-2 text-xs p-2 rounded-lg ${status.success ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
          {status.success ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
          {status.message}
        </div>
      )}
      <div className="flex gap-2">
        <button onClick={handleTest} disabled={testing}
          className="flex-1 bg-blue-700 hover:bg-blue-600 disabled:opacity-50 text-white py-2 rounded-lg text-xs font-semibold">
          {testing ? 'Test...' : 'Tester'}
        </button>
        <button onClick={() => { saveNextcloudConfig(config); setStatus({ success: true, message: 'Sauvegardé.' }); }}
          className="flex-1 bg-green-700 hover:bg-green-600 text-white py-2 rounded-lg text-xs font-semibold">
          Sauvegarder
        </button>
      </div>
    </div>
  );
};

// ─── Module labels ────────────────────────────────────────────────────────────
const MODULE_LABELS = {
  fasting:   { label: 'Jeûne',     emoji: '⏱️' },
  meals:     { label: 'Repas',     emoji: '🍽️' },
  exercises: { label: 'Sport',     emoji: '💪' },
  shopping:  { label: 'Courses',   emoji: '🛒' },
  goals:     { label: 'Objectifs', emoji: '🎯' }
};

// ─── Main SyncPanel ───────────────────────────────────────────────────────────
const SyncPanel = ({ getAllSyncData, onDataRestored }) => {
  const { activeProfile, activeProfileId } = useProfile();
  const [syncing, setSyncing] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [results, setResults] = useState(null);
  const [showConfig, setShowConfig] = useState(false);
  const [lastSync, setLastSync] = useState(() => {
    const raw = localStorage.getItem('neguslunar-last-sync');
    return raw ? JSON.parse(raw) : {};
  });

  const config = loadNextcloudConfig();
  const hasConfig = !!config;

  const handleSyncAll = async () => {
    if (!config) { setShowConfig(true); return; }
    setSyncing(true);
    setResults(null);

    const allData = await getAllSyncData();
    const result = await syncAllModules(activeProfileId, allData, config);
    setResults(result.results);

    const now = new Date().toISOString();
    const updated = { ...lastSync, [activeProfileId]: now };
    setLastSync(updated);
    localStorage.setItem('neguslunar-last-sync', JSON.stringify(updated));
    setSyncing(false);
  };

  const handleFetchAll = async () => {
    if (!config) { setShowConfig(true); return; }
    setFetching(true);
    setResults(null);

    const fetched = await fetchAllModules(activeProfileId, config);

    // Restore meals to IndexedDB
    if (fetched.meals?.success && Array.isArray(fetched.meals.data)) {
      for (const meal of fetched.meals.data) {
        if (meal.profileId === activeProfileId) await setItem(STORES.DAILY_MEALS, meal);
      }
    }
    // Restore exercises
    if (fetched.exercises?.success && Array.isArray(fetched.exercises.data)) {
      for (const ex of fetched.exercises.data) {
        if (ex.profileId === activeProfileId) await setItem(STORES.DAILY_EXERCISES, ex);
      }
    }
    // Restore fasting sessions
    if (fetched.fasting?.success && Array.isArray(fetched.fasting.data)) {
      const key = `neguslunar-fasting-history-${activeProfileId}`;
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      const merged = [...fetched.fasting.data, ...existing];
      const seen = new Set();
      localStorage.setItem(key, JSON.stringify(merged.filter(i => {
        if (seen.has(i.id)) return false;
        seen.add(i.id); return true;
      })));
    }
    // Restore shopping list
    if (fetched.shopping?.success && Array.isArray(fetched.shopping.data)) {
      const key = `shoppingList-${activeProfileId}`;
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      const merged = [...fetched.shopping.data, ...existing];
      const seen = new Set();
      localStorage.setItem(key, JSON.stringify(merged.filter(i => {
        if (seen.has(i.id)) return false;
        seen.add(i.id); return true;
      })));
    }
    // Restore goals
    if (fetched.goals?.success && fetched.goals.data) {
      const allGoals = JSON.parse(localStorage.getItem('neguslunar-profile-goals') || '{}');
      allGoals[activeProfileId] = fetched.goals.data;
      localStorage.setItem('neguslunar-profile-goals', JSON.stringify(allGoals));
    }

    const fetchResults = Object.fromEntries(
      Object.entries(fetched).map(([k, v]) => [k, { success: v.success, message: v.success ? 'Récupéré' : 'Échec' }])
    );
    setResults(fetchResults);
    setFetching(false);
    if (onDataRestored) onDataRestored();
  };

  const profileLastSync = lastSync[activeProfileId];

  return (
    <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-xl border border-blue-700/30 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${hasConfig ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
          <span className="text-blue-300 font-semibold text-sm flex items-center gap-2">
            <Cloud size={16} /> Nextcloud
            {activeProfile && <span className="text-gray-400 font-normal">— {activeProfile.avatar} {activeProfile.name}</span>}
          </span>
        </div>
        <button onClick={() => setShowConfig(s => !s)} className="text-gray-400 hover:text-white transition-colors">
          <Settings size={16} />
        </button>
      </div>

      {showConfig && (
        <div className="px-5 pb-4">
          <ConfigPanel onClose={() => setShowConfig(false)} />
        </div>
      )}

      {/* Résultats par module */}
      {results && (
        <div className="px-5 pb-3 grid grid-cols-5 gap-2">
          {Object.entries(MODULE_LABELS).map(([mod, { label, emoji }]) => {
            const r = results[mod];
            if (!r) return null;
            return (
              <div key={mod} className={`rounded-lg p-2 text-center text-xs ${r.success ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                <div className="text-base">{emoji}</div>
                <div>{label}</div>
                <div>{r.success ? '✓' : '✗'}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Boutons */}
      <div className="flex gap-2 px-5 pb-4">
        <button
          onClick={handleSyncAll}
          disabled={syncing || fetching}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 disabled:opacity-40 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          {syncing ? <RefreshCw size={15} className="animate-spin" /> : <Upload size={15} />}
          {syncing ? 'Envoi...' : 'Tout envoyer'}
        </button>
        <button
          onClick={handleFetchAll}
          disabled={syncing || fetching}
          className="flex-1 flex items-center justify-center gap-2 bg-cyan-700 hover:bg-cyan-600 disabled:opacity-40 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          {fetching ? <RefreshCw size={15} className="animate-spin" /> : <Download size={15} />}
          {fetching ? 'Récup...' : 'Tout récupérer'}
        </button>
      </div>

      {profileLastSync && (
        <p className="text-center text-xs text-gray-500 pb-3">
          Dernière sync : {new Date(profileLastSync).toLocaleString('fr-FR')}
        </p>
      )}
    </div>
  );
};

export default SyncPanel;
