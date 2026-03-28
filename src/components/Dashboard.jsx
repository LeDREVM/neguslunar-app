import React, { useState, useEffect, useMemo } from 'react';
import {
  BarChart3, TrendingUp, Flame, Moon, Heart, Timer, Activity,
  Zap, Calendar, Target, Award, ArrowUp, ArrowDown, Minus
} from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import { getAllItems, getByIndex, STORES } from '../utils/database';
import { getAccurateMoonPhase } from '../data/moonPhases2026';

// ─── Helpers ────────────────────────────────────────────────────────────────
const LUNAR_ENERGY = {
  'Nouvelle Lune': 4, 'Premier Croissant': 5, 'Premier Quartier': 6,
  'Gibbeuse Croissante': 8, 'Pleine Lune': 9, 'Gibbeuse Décroissante': 7,
  'Dernier Quartier': 5, 'Dernier Croissant': 3
};

const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split('T')[0]);
  }
  return days;
};

const dayLabel = (dateStr) => {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('fr-FR', { weekday: 'short' }).slice(0, 3);
};

// ─── Main Component ─────────────────────────────────────────────────────────
const Dashboard = () => {
  const { activeProfileId, getGoals } = useProfile();
  const goals = getGoals();

  const [loading, setLoading] = useState(true);
  const [allMeals, setAllMeals] = useState([]);
  const [allExercises, setAllExercises] = useState([]);
  const [moodHistory, setMoodHistory] = useState([]);
  const [fastingHistory, setFastingHistory] = useState([]);
  const [sportReports, setSportReports] = useState([]);

  const moonPhase = useMemo(() => getAccurateMoonPhase(new Date()), []);
  const last7 = useMemo(() => getLast7Days(), []);

  // ─── Load all data ────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [meals, exercises, moods] = await Promise.all([
        getAllItems(STORES.DAILY_MEALS),
        getAllItems(STORES.DAILY_EXERCISES),
        getAllItems(STORES.MOOD_HISTORY)
      ]);

      setAllMeals(meals.filter(m => !m.profileId || m.profileId === activeProfileId));
      setAllExercises(exercises.filter(e => !e.profileId || e.profileId === activeProfileId));
      setMoodHistory(moods.filter(m => !m.profileId || m.profileId === activeProfileId));

      // localStorage data
      const fasting = JSON.parse(localStorage.getItem(`neguslunar-fasting-history-${activeProfileId}`) || '[]');
      setFastingHistory(fasting);

      const sport = JSON.parse(localStorage.getItem(`neguslunar-sport-reports-${activeProfileId}`) || '[]');
      setSportReports(sport);

      setLoading(false);
    };
    load();
  }, [activeProfileId]);

  // ─── 7-day nutrition data ─────────────────────────────────────────────
  const weeklyNutrition = useMemo(() => {
    return last7.map(date => {
      const dayMeals = allMeals.filter(m => m.date === date);
      const dayExercises = allExercises.filter(e => e.date === date);
      const cal = dayMeals.reduce((s, m) => s + (m.calories || 0), 0);
      const prot = dayMeals.reduce((s, m) => s + (m.proteins || 0), 0);
      const carbs = dayMeals.reduce((s, m) => s + (m.carbs || 0), 0);
      const fats = dayMeals.reduce((s, m) => s + (m.fats || 0), 0);
      const burned = dayExercises.reduce((s, e) => s + (e.caloriesBurned || 0), 0);
      const phase = getAccurateMoonPhase(new Date(date + 'T12:00:00'));
      return { date, cal, prot, carbs, fats, burned, balance: cal - burned, moon: phase };
    });
  }, [last7, allMeals, allExercises]);

  // ─── Fasting stats ────────────────────────────────────────────────────
  const fastingStats = useMemo(() => {
    if (!fastingHistory.length) return null;
    const completed = fastingHistory.filter(f => f.completed).length;
    const total = fastingHistory.length;
    const avgH = fastingHistory.reduce((s, f) => s + (f.duration || 0), 0) / total / 3600;
    const longest = Math.max(...fastingHistory.map(f => (f.duration || 0) / 3600));

    // Streak
    let streak = 0;
    const sorted = [...fastingHistory].sort((a, b) => new Date(b.date || b.endTime) - new Date(a.date || a.endTime));
    const today = new Date().toISOString().split('T')[0];
    for (const f of sorted) {
      const fDate = (f.date || new Date(f.endTime).toISOString()).split('T')[0];
      const diff = Math.floor((new Date(today) - new Date(fDate)) / 86400000);
      if (diff === streak || diff === streak + 1) { streak = diff + 1; } else break;
    }

    return { completed, total, rate: Math.round((completed / total) * 100), avgH: avgH.toFixed(1), longest: longest.toFixed(1), streak };
  }, [fastingHistory]);

  // ─── Sport stats ──────────────────────────────────────────────────────
  const sportStats = useMemo(() => {
    if (!sportReports.length) return null;
    const last30 = sportReports.filter(r => (Date.now() - new Date(r.date).getTime()) / 86400000 <= 30);
    const avgEnergy = last30.length > 0
      ? (last30.reduce((s, r) => s + r.energy, 0) / last30.length).toFixed(1)
      : '—';
    const totalMin = last30.reduce((s, r) => s + (r.duration || 0), 0);

    // Best moon phase
    const byPhase = {};
    sportReports.forEach(r => {
      if (!byPhase[r.moonPhase]) byPhase[r.moonPhase] = [];
      byPhase[r.moonPhase].push(r.energy);
    });
    let bestPhase = null;
    let bestAvg = 0;
    Object.entries(byPhase).forEach(([phase, energies]) => {
      const avg = energies.reduce((a, b) => a + b, 0) / energies.length;
      if (avg > bestAvg) { bestAvg = avg; bestPhase = phase; }
    });

    return { total: sportReports.length, month: last30.length, avgEnergy, totalMin, bestPhase, bestAvg: bestAvg.toFixed(1) };
  }, [sportReports]);

  // ─── Mood by moon phase ──────────────────────────────────────────────
  const moodByMoon = useMemo(() => {
    if (!moodHistory.length) return null;
    const moodValues = { 'Excellent': 5, 'Bien': 4, 'Neutre': 3, 'Bas': 2, 'Difficile': 1,
      '😊': 5, '😄': 4, '😐': 3, '😔': 2, '😢': 1, '😡': 1 };
    const byPhase = {};
    moodHistory.forEach(m => {
      const phase = m.moonPhase || 'Inconnu';
      const val = moodValues[m.mood] || 3;
      if (!byPhase[phase]) byPhase[phase] = [];
      byPhase[phase].push(val);
    });
    return Object.entries(byPhase).map(([phase, vals]) => ({
      phase, avg: (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1), count: vals.length
    }));
  }, [moodHistory]);

  // ─── Health Score (0-100) ─────────────────────────────────────────────
  const healthScore = useMemo(() => {
    let score = 50; // base
    let factors = 0;

    // Nutrition compliance (last 7 days)
    const calGoal = goals.dailyCalories || 2000;
    const daysWithMeals = weeklyNutrition.filter(d => d.cal > 0).length;
    if (daysWithMeals > 0) {
      const avgCal = weeklyNutrition.reduce((s, d) => s + d.cal, 0) / Math.max(daysWithMeals, 1);
      const calCompliance = Math.max(0, 100 - Math.abs(avgCal - calGoal) / calGoal * 100);
      score += calCompliance * 0.2;
      factors++;
    }

    // Fasting consistency
    if (fastingStats) {
      score += fastingStats.rate * 0.15;
      factors++;
    }

    // Sport frequency
    if (sportStats) {
      const weekSessions = sportReports.filter(r => (Date.now() - new Date(r.date).getTime()) / 86400000 <= 7).length;
      score += Math.min(weekSessions / 4, 1) * 20; // 4 sessions/week = max
      factors++;
    }

    // Exercise balance
    const burnDays = weeklyNutrition.filter(d => d.burned > 0).length;
    score += Math.min(burnDays / 4, 1) * 10;

    return Math.min(100, Math.round(score));
  }, [weeklyNutrition, fastingStats, sportStats, goals]);

  const scoreColor = healthScore >= 75 ? 'text-green-400' : healthScore >= 50 ? 'text-yellow-400' : 'text-red-400';
  const scoreGradient = healthScore >= 75 ? 'from-green-600 to-emerald-600' : healthScore >= 50 ? 'from-yellow-600 to-amber-600' : 'from-red-600 to-rose-600';

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full" />
      </div>
    );
  }

  // ─── Render ────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* ─── Health Score ────────────────────────────────────────────── */}
      <div className={`bg-gradient-to-br ${scoreGradient} rounded-2xl p-6 border border-white/10 text-center`}>
        <div className="flex items-center justify-center gap-3 mb-2">
          <Award size={28} className="text-white/80" />
          <h2 className="text-xl font-bold text-white">Score Bien-être</h2>
        </div>
        <div className={`text-6xl font-black ${scoreColor}`}>{healthScore}</div>
        <p className="text-white/50 text-sm mt-1">/ 100</p>
        <div className="w-full bg-black/30 rounded-full h-3 mt-3 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 bg-white/80"
            style={{ width: `${healthScore}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-white/40 mt-1">
          <span>Nutrition</span><span>Jeûne</span><span>Sport</span><span>Équilibre</span>
        </div>
      </div>

      {/* ─── Lunar Context ───────────────────────────────────────────── */}
      <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
        <span className="text-3xl">{moonPhase?.emoji}</span>
        <div className="flex-1">
          <div className="text-white font-semibold text-sm">{moonPhase?.name}</div>
          <div className="text-gray-400 text-xs">{moonPhase?.description}</div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-yellow-400">{LUNAR_ENERGY[moonPhase?.name] || 5}<span className="text-xs text-gray-500">/10</span></div>
          <div className="text-[10px] text-gray-500">Énergie</div>
        </div>
      </div>

      {/* ─── Weekly Nutrition Trend ──────────────────────────────────── */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
          <BarChart3 size={18} className="text-blue-400" /> Nutrition — 7 jours
        </h3>
        <div className="flex items-end gap-1 h-32">
          {weeklyNutrition.map((d, i) => {
            const calGoal = goals.dailyCalories || 2000;
            const pct = Math.min((d.cal / calGoal) * 100, 150);
            const isToday = i === 6;
            return (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-[9px] text-gray-500">{d.cal > 0 ? d.cal : ''}</div>
                <div className="w-full flex flex-col items-center justify-end" style={{ height: '80px' }}>
                  <div
                    className={`w-full rounded-t transition-all ${isToday ? 'bg-blue-500' : d.cal > calGoal ? 'bg-red-500/70' : 'bg-blue-500/50'}`}
                    style={{ height: `${Math.max(pct * 0.8, d.cal > 0 ? 4 : 0)}px` }}
                  />
                </div>
                <div className={`text-[10px] ${isToday ? 'text-blue-400 font-bold' : 'text-gray-500'}`}>
                  {dayLabel(d.date)}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
          <span>Objectif : {goals.dailyCalories || 2000} kcal</span>
          <span>
            Moy : {(() => {
              const days = weeklyNutrition.filter(d => d.cal > 0);
              return days.length > 0 ? Math.round(days.reduce((s, d) => s + d.cal, 0) / days.length) : '—';
            })()} kcal
          </span>
        </div>

        {/* Macro bars */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { label: 'Protéines', key: 'prot', goal: goals.dailyProteins || 80, color: 'bg-blue-500', unit: 'g' },
            { label: 'Glucides', key: 'carbs', goal: goals.dailyCarbs || 250, color: 'bg-green-500', unit: 'g' },
            { label: 'Lipides', key: 'fats', goal: goals.dailyFats || 65, color: 'bg-yellow-500', unit: 'g' }
          ].map(({ label, key, goal, color, unit }) => {
            const todayVal = weeklyNutrition[6]?.[key] || 0;
            const pct = Math.min((todayVal / goal) * 100, 100);
            return (
              <div key={key} className="text-center">
                <div className="text-[10px] text-gray-400 mb-1">{label}</div>
                <div className="text-sm font-bold text-white">{todayVal}{unit}</div>
                <div className="w-full bg-black/30 rounded-full h-1.5 mt-1 overflow-hidden">
                  <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
                </div>
                <div className="text-[9px] text-gray-500">{goal}{unit}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Calorie Balance ─────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 border border-emerald-500/20 rounded-xl p-3 text-center">
          <Flame size={18} className="mx-auto mb-1 text-green-400" />
          <div className="text-lg font-bold text-white">
            {weeklyNutrition[6]?.cal || 0}
          </div>
          <div className="text-[10px] text-gray-400">Consommé</div>
        </div>
        <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-500/20 rounded-xl p-3 text-center">
          <Activity size={18} className="mx-auto mb-1 text-orange-400" />
          <div className="text-lg font-bold text-white">
            {weeklyNutrition[6]?.burned || 0}
          </div>
          <div className="text-[10px] text-gray-400">Brûlé</div>
        </div>
        <div className={`bg-gradient-to-br ${(weeklyNutrition[6]?.balance || 0) >= 0 ? 'from-blue-900/30 to-cyan-900/30 border-blue-500/20' : 'from-purple-900/30 to-pink-900/30 border-purple-500/20'} border rounded-xl p-3 text-center`}>
          {(weeklyNutrition[6]?.balance || 0) >= 0 ? <ArrowUp size={18} className="mx-auto mb-1 text-blue-400" /> : <ArrowDown size={18} className="mx-auto mb-1 text-purple-400" />}
          <div className="text-lg font-bold text-white">
            {weeklyNutrition[6]?.balance || 0}
          </div>
          <div className="text-[10px] text-gray-400">Balance</div>
        </div>
      </div>

      {/* ─── Fasting Overview ────────────────────────────────────────── */}
      {fastingStats && (
        <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 border border-amber-500/20 rounded-xl p-5">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <Timer size={18} className="text-amber-400" /> Jeûne Intermittent
          </h3>
          <div className="grid grid-cols-4 gap-3 text-center">
            {[
              { label: 'Réussite', value: `${fastingStats.rate}%`, color: 'text-green-400' },
              { label: 'Total', value: fastingStats.total, color: 'text-amber-400' },
              { label: 'Moy.', value: `${fastingStats.avgH}h`, color: 'text-blue-400' },
              { label: 'Max', value: `${fastingStats.longest}h`, color: 'text-purple-400' }
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 rounded-lg p-2">
                <div className={`text-lg font-bold ${color}`}>{value}</div>
                <div className="text-[10px] text-gray-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── Sport Overview ──────────────────────────────────────────── */}
      {sportStats && (
        <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-500/20 rounded-xl p-5">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <Zap size={18} className="text-red-400" /> Sport Performance
          </h3>
          <div className="grid grid-cols-4 gap-3 text-center">
            {[
              { label: 'Ce mois', value: sportStats.month, color: 'text-red-400' },
              { label: 'Énergie', value: sportStats.avgEnergy, color: 'text-yellow-400' },
              { label: 'Minutes', value: sportStats.totalMin, color: 'text-green-400' },
              { label: 'Total', value: sportStats.total, color: 'text-blue-400' }
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 rounded-lg p-2">
                <div className={`text-lg font-bold ${color}`}>{value}</div>
                <div className="text-[10px] text-gray-400">{label}</div>
              </div>
            ))}
          </div>
          {sportStats.bestPhase && (
            <div className="mt-3 bg-white/5 rounded-lg px-3 py-2 text-xs text-gray-300 flex items-center gap-2">
              <Moon size={14} className="text-indigo-400" />
              Meilleure phase : <span className="text-white font-semibold">{sportStats.bestPhase}</span>
              <span className="text-yellow-400 ml-auto">avg {sportStats.bestAvg}/10</span>
            </div>
          )}
        </div>
      )}

      {/* ─── Mood × Moon ─────────────────────────────────────────────── */}
      {moodByMoon && moodByMoon.length > 0 && (
        <div className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 border border-pink-500/20 rounded-xl p-5">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <Heart size={18} className="text-pink-400" /> Humeur × Lune
          </h3>
          <div className="space-y-2">
            {moodByMoon.map(m => (
              <div key={m.phase} className="flex items-center gap-3 text-xs">
                <span className="w-28 text-gray-400 truncate">{m.phase}</span>
                <div className="flex-1 bg-black/30 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full" style={{ width: `${parseFloat(m.avg) * 20}%` }} />
                </div>
                <span className="text-white w-6 text-right">{m.avg}</span>
                <span className="text-gray-500 w-10">({m.count}×)</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── Today Timeline ──────────────────────────────────────────── */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
          <Calendar size={18} className="text-purple-400" /> Aujourd'hui
        </h3>
        {(() => {
          const today = new Date().toISOString().split('T')[0];
          const todayMeals = allMeals.filter(m => m.date === today);
          const todayExercises = allExercises.filter(e => e.date === today);
          const todaySport = sportReports.filter(r => r.date?.startsWith(today));
          const events = [
            ...todayMeals.map(m => ({ time: m.time || '—', type: 'meal', icon: '🍽️', label: m.name, detail: `${m.calories} kcal` })),
            ...todayExercises.map(e => ({ time: e.time || '—', type: 'exercise', icon: '💪', label: e.name, detail: `${e.caloriesBurned} kcal brûlées` })),
            ...todaySport.map(s => ({ time: new Date(s.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }), type: 'sport', icon: '🏋️', label: s.type, detail: `${s.duration}min • ${s.energy}/10` }))
          ].sort((a, b) => (a.time || '').localeCompare(b.time || ''));

          if (events.length === 0) {
            return <p className="text-gray-500 text-sm text-center py-4">Aucune activité enregistrée aujourd'hui</p>;
          }

          return (
            <div className="space-y-2">
              {events.map((ev, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 rounded-lg px-3 py-2">
                  <span className="text-xs text-gray-500 w-12">{ev.time}</span>
                  <span className="text-lg">{ev.icon}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm text-white">{ev.label}</span>
                    <span className="text-xs text-gray-400 ml-2">{ev.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
      </div>

      {/* ─── Empty state hint ────────────────────────────────────────── */}
      {allMeals.length === 0 && sportReports.length === 0 && fastingHistory.length === 0 && (
        <div className="text-center py-6 text-gray-500 text-sm">
          <BarChart3 size={32} className="mx-auto mb-2 opacity-30" />
          <p>Commencez à tracker vos repas, exercices et jeûnes</p>
          <p>pour voir vos statistiques ici.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
