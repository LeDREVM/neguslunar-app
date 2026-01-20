import React, { useState, useEffect } from 'react';
import { Clock, DollarSign, Calendar, Download, Plus, X, Edit2, Check, Trash2 } from 'lucide-react';

const WorkCalculator = () => {
  const [workSessions, setWorkSessions] = useState([]);
  const [hourlyRate, setHourlyRate] = useState(15);
  const [newSession, setNewSession] = useState({
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '17:00',
    breakMinutes: 60,
    description: '',
    project: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState('all'); // all, today, week, month

  // Charger les données
  useEffect(() => {
    const saved = localStorage.getItem('neguslunar-work-sessions');
    const savedRate = localStorage.getItem('neguslunar-hourly-rate');
    if (saved) setWorkSessions(JSON.parse(saved));
    if (savedRate) setHourlyRate(parseFloat(savedRate));
  }, []);

  // Sauvegarder les données
  useEffect(() => {
    localStorage.setItem('neguslunar-work-sessions', JSON.stringify(workSessions));
  }, [workSessions]);

  useEffect(() => {
    localStorage.setItem('neguslunar-hourly-rate', hourlyRate.toString());
  }, [hourlyRate]);

  // Calculer les heures travaillées
  const calculateHours = (start, end, breakMinutes) => {
    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);
    
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;
    
    const totalMinutes = endMinutes - startMinutes - breakMinutes;
    return Math.max(0, totalMinutes / 60);
  };

  // Ajouter une session
  const addSession = () => {
    if (!newSession.startTime || !newSession.endTime) return;

    const hours = calculateHours(newSession.startTime, newSession.endTime, newSession.breakMinutes);
    const earnings = hours * hourlyRate;

    const session = {
      id: Date.now(),
      ...newSession,
      hours: parseFloat(hours.toFixed(2)),
      earnings: parseFloat(earnings.toFixed(2))
    };

    setWorkSessions([session, ...workSessions]);
    setNewSession({
      date: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '17:00',
      breakMinutes: 60,
      description: '',
      project: ''
    });
  };

  // Supprimer une session
  const deleteSession = (id) => {
    setWorkSessions(workSessions.filter(s => s.id !== id));
  };

  // Filtrer les sessions
  const getFilteredSessions = () => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    return workSessions.filter(session => {
      if (filter === 'today') {
        return session.date === today;
      }
      if (filter === 'week') {
        const sessionDate = new Date(session.date);
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return sessionDate >= weekAgo;
      }
      if (filter === 'month') {
        const sessionDate = new Date(session.date);
        return sessionDate.getMonth() === now.getMonth() && 
               sessionDate.getFullYear() === now.getFullYear();
      }
      return true;
    });
  };

  // Calculer les totaux
  const getTotals = () => {
    const filtered = getFilteredSessions();
    return filtered.reduce((acc, session) => ({
      hours: acc.hours + session.hours,
      earnings: acc.earnings + session.earnings
    }), { hours: 0, earnings: 0 });
  };

  // Exporter en CSV
  const exportToCSV = () => {
    const filtered = getFilteredSessions();
    
    const headers = ['Date', 'Début', 'Fin', 'Pause (min)', 'Heures', 'Taux horaire', 'Gains', 'Projet', 'Description'];
    const rows = filtered.map(s => [
      s.date,
      s.startTime,
      s.endTime,
      s.breakMinutes,
      s.hours,
      hourlyRate,
      s.earnings,
      s.project || '',
      s.description || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `heures_travail_${filter}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const totals = getTotals();
  const filteredSessions = getFilteredSessions();

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-400 mb-2">
          ⏰ Calculateur d'Heures de Travail
        </h2>
        <p className="text-gray-400 text-sm">
          Suivez vos heures et calculez vos gains automatiquement
        </p>
      </div>

      {/* Taux horaire */}
      <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 rounded-xl p-6 border border-blue-700/30">
        <div className="flex items-center gap-4">
          <DollarSign className="text-blue-400" size={32} />
          <div className="flex-1">
            <label className="text-sm text-gray-400 block mb-2">Taux horaire (€)</label>
            <input
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
              step="0.5"
              min="0"
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white text-2xl font-bold focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Gains/heure</div>
            <div className="text-2xl font-bold text-blue-400">{hourlyRate.toFixed(2)}€</div>
          </div>
        </div>
      </div>

      {/* Nouvelle session */}
      <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-xl p-6 border border-green-700/30">
        <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
          <Plus size={20} />
          Nouvelle Session
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400 block mb-2">Date</label>
            <input
              type="date"
              value={newSession.date}
              onChange={(e) => setNewSession({...newSession, date: e.target.value})}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-2">Projet</label>
            <input
              type="text"
              value={newSession.project}
              onChange={(e) => setNewSession({...newSession, project: e.target.value})}
              placeholder="Nom du projet..."
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-2">Heure de début</label>
            <input
              type="time"
              value={newSession.startTime}
              onChange={(e) => setNewSession({...newSession, startTime: e.target.value})}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-2">Heure de fin</label>
            <input
              type="time"
              value={newSession.endTime}
              onChange={(e) => setNewSession({...newSession, endTime: e.target.value})}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-2">Pause (minutes)</label>
            <input
              type="number"
              value={newSession.breakMinutes}
              onChange={(e) => setNewSession({...newSession, breakMinutes: parseInt(e.target.value) || 0})}
              min="0"
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-2">Heures calculées</label>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white text-center font-bold">
              {calculateHours(newSession.startTime, newSession.endTime, newSession.breakMinutes).toFixed(2)}h
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-400 block mb-2">Description (optionnel)</label>
            <textarea
              value={newSession.description}
              onChange={(e) => setNewSession({...newSession, description: e.target.value})}
              placeholder="Détails de la session..."
              rows="2"
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
            />
          </div>
        </div>

        <button
          onClick={addSession}
          className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 font-semibold"
        >
          <Plus size={20} />
          Ajouter la session
        </button>
      </div>

      {/* Filtres et Totaux */}
      <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-700/30">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex gap-2">
            {['all', 'today', 'week', 'month'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === f
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                }`}
              >
                {f === 'all' ? 'Tout' : f === 'today' ? 'Aujourd\'hui' : f === 'week' ? 'Semaine' : 'Mois'}
              </button>
            ))}
          </div>

          <button
            onClick={exportToCSV}
            disabled={filteredSessions.length === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Download size={20} />
            Exporter CSV
          </button>
        </div>

        {/* Totaux */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-purple-400">{filteredSessions.length}</div>
            <div className="text-sm text-gray-400 mt-1">Sessions</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-blue-400">{totals.hours.toFixed(2)}h</div>
            <div className="text-sm text-gray-400 mt-1">Heures totales</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-green-400">{totals.earnings.toFixed(2)}€</div>
            <div className="text-sm text-gray-400 mt-1">Gains totaux</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-amber-400">
              {filteredSessions.length > 0 ? (totals.hours / filteredSessions.length).toFixed(1) : '0'}h
            </div>
            <div className="text-sm text-gray-400 mt-1">Moyenne/jour</div>
          </div>
        </div>
      </div>

      {/* Liste des sessions */}
      {filteredSessions.length > 0 && (
        <div className="bg-gradient-to-br from-gray-900/20 to-slate-900/20 rounded-xl p-6 border border-gray-700/30">
          <h3 className="text-lg font-bold text-gray-300 mb-4 flex items-center gap-2">
            <Calendar size={20} />
            Historique des Sessions
          </h3>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredSessions.map(session => (
              <div
                key={session.id}
                className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-blue-600 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-white font-semibold">{session.date}</span>
                      {session.project && (
                        <span className="bg-blue-900/30 text-blue-300 px-2 py-1 rounded text-xs">
                          {session.project}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-400 space-y-1">
                      <div className="flex items-center gap-2">
                        <Clock size={14} />
                        <span>{session.startTime} → {session.endTime}</span>
                        <span className="text-gray-500">(Pause: {session.breakMinutes}min)</span>
                      </div>
                      {session.description && (
                        <div className="text-gray-500 italic">{session.description}</div>
                      )}
                    </div>
                  </div>

                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-blue-400">{session.hours}h</div>
                    <div className="text-lg font-semibold text-green-400">{session.earnings.toFixed(2)}€</div>
                    <button
                      onClick={() => deleteSession(session.id)}
                      className="mt-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkCalculator;
