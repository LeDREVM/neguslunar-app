/**
 * Phases Lunaires Réelles 2026
 * Source: https://alarmemeteo.ch/blog/calendrier-lunaire.html
 * Données astronomiques précises pour l'année 2026
 */

export const moonPhases2026 = [
  // JANVIER 2026
  { date: '2026-01-03', time: '11:02', phase: 'Pleine Lune', emoji: '🌕' },
  { date: '2026-01-18', time: '20:52', phase: 'Nouvelle Lune', emoji: '🌑' },
  
  // FÉVRIER 2026
  { date: '2026-02-01', time: '23:09', phase: 'Pleine Lune', emoji: '🌕' },
  { date: '2026-02-17', time: '13:01', phase: 'Nouvelle Lune', emoji: '🌑' },
  
  // MARS 2026
  { date: '2026-03-03', time: '12:37', phase: 'Pleine Lune', emoji: '🌕' },
  { date: '2026-03-19', time: '02:23', phase: 'Nouvelle Lune', emoji: '🌑' },
  
  // AVRIL 2026
  { date: '2026-04-02', time: '04:11', phase: 'Pleine Lune', emoji: '🌕' },
  { date: '2026-04-17', time: '13:51', phase: 'Nouvelle Lune', emoji: '🌑' },
  
  // MAI 2026
  { date: '2026-05-01', time: '19:23', phase: 'Pleine Lune', emoji: '🌕' },
  { date: '2026-05-16', time: '22:01', phase: 'Nouvelle Lune', emoji: '🌑' },
  { date: '2026-05-31', time: '10:45', phase: 'Pleine Lune', emoji: '🌕' },
  
  // JUIN 2026
  { date: '2026-06-15', time: '04:54', phase: 'Nouvelle Lune', emoji: '🌑' },
  { date: '2026-06-30', time: '01:56', phase: 'Pleine Lune', emoji: '🌕' },
  
  // JUILLET 2026
  { date: '2026-07-14', time: '11:43', phase: 'Nouvelle Lune', emoji: '🌑' },
  { date: '2026-07-29', time: '16:35', phase: 'Pleine Lune', emoji: '🌕' },
  
  // AOÛT 2026
  { date: '2026-08-12', time: '19:36', phase: 'Nouvelle Lune', emoji: '🌑' },
  { date: '2026-08-28', time: '06:18', phase: 'Pleine Lune', emoji: '🌕' },
  
  // SEPTEMBRE 2026
  { date: '2026-09-11', time: '05:27', phase: 'Nouvelle Lune', emoji: '🌑' },
  { date: '2026-09-26', time: '18:49', phase: 'Pleine Lune', emoji: '🌕' },
  
  // OCTOBRE 2026
  { date: '2026-10-10', time: '17:50', phase: 'Nouvelle Lune', emoji: '🌑' },
  { date: '2026-10-26', time: '05:11', phase: 'Pleine Lune', emoji: '🌕' },
  
  // NOVEMBRE 2026
  { date: '2026-11-09', time: '08:02', phase: 'Nouvelle Lune', emoji: '🌑' },
  { date: '2026-11-24', time: '15:53', phase: 'Pleine Lune', emoji: '🌕' },
  
  // DÉCEMBRE 2026
  { date: '2026-12-09', time: '01:51', phase: 'Nouvelle Lune', emoji: '🌑' },
  { date: '2026-12-24', time: '02:28', phase: 'Pleine Lune', emoji: '🌕' }
];

/**
 * Calcule la phase lunaire précise pour une date donnée
 * en se basant sur les données astronomiques réelles
 */
export const getAccurateMoonPhase = (date) => {
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  
  // Trouver les phases lunaires avant et après la date cible
  let previousPhase = null;
  let nextPhase = null;
  
  for (let i = 0; i < moonPhases2026.length; i++) {
    const phaseDate = new Date(moonPhases2026[i].date);
    phaseDate.setHours(0, 0, 0, 0);
    
    if (phaseDate <= targetDate) {
      previousPhase = moonPhases2026[i];
    }
    if (phaseDate > targetDate && !nextPhase) {
      nextPhase = moonPhases2026[i];
      break;
    }
  }
  
  if (!previousPhase || !nextPhase) {
    // Fallback sur le calcul algorithmique si hors période
    return null;
  }
  
  const prevDate = new Date(previousPhase.date);
  const nextDate = new Date(nextPhase.date);
  const daysSincePrev = Math.floor((targetDate - prevDate) / (1000 * 60 * 60 * 24));
  const totalDays = Math.floor((nextDate - prevDate) / (1000 * 60 * 60 * 24));
  const progress = daysSincePrev / totalDays;
  
  // Déterminer la phase intermédiaire
  if (previousPhase.phase === 'Nouvelle Lune' && nextPhase.phase === 'Pleine Lune') {
    // Lune croissante
    if (progress < 0.25) {
      return {
        name: 'Premier Croissant',
        emoji: '🌒',
        description: 'Germination, action',
        illumination: Math.round(progress * 400) // 0-100%
      };
    } else if (progress < 0.5) {
      return {
        name: 'Premier Quartier',
        emoji: '🌓',
        description: 'Construction, détermination',
        illumination: Math.round(progress * 200)
      };
    } else if (progress < 0.75) {
      return {
        name: 'Gibbeuse Croissante',
        emoji: '🌔',
        description: 'Raffinement, ajustement',
        illumination: Math.round(50 + progress * 100)
      };
    } else {
      return {
        name: 'Pleine Lune',
        emoji: '🌕',
        description: 'Accomplissement, gratitude',
        illumination: Math.round(75 + progress * 100)
      };
    }
  } else if (previousPhase.phase === 'Pleine Lune' && nextPhase.phase === 'Nouvelle Lune') {
    // Lune décroissante
    if (progress < 0.25) {
      return {
        name: 'Gibbeuse Décroissante',
        emoji: '🌖',
        description: 'Partage, récolte',
        illumination: Math.round(100 - progress * 100)
      };
    } else if (progress < 0.5) {
      return {
        name: 'Dernier Quartier',
        emoji: '🌗',
        description: 'Libération, pardon',
        illumination: Math.round(75 - progress * 100)
      };
    } else if (progress < 0.75) {
      return {
        name: 'Dernier Croissant',
        emoji: '🌘',
        description: 'Repos, introspection',
        illumination: Math.round(50 - progress * 100)
      };
    } else {
      return {
        name: 'Nouvelle Lune',
        emoji: '🌑',
        description: 'Nouveau départ, intentions',
        illumination: Math.round(25 - progress * 100)
      };
    }
  }
  
  // Si on est exactement sur une phase majeure
  if (daysSincePrev === 0) {
    return {
      name: previousPhase.phase,
      emoji: previousPhase.emoji,
      description: previousPhase.phase === 'Pleine Lune' 
        ? 'Accomplissement, gratitude' 
        : 'Nouveau départ, intentions',
      illumination: previousPhase.phase === 'Pleine Lune' ? 100 : 0,
      exactTime: previousPhase.time
    };
  }
  
  return null;
};

/**
 * Obtient la prochaine pleine lune
 */
export const getNextFullMoon = (fromDate = new Date()) => {
  const target = new Date(fromDate);
  target.setHours(0, 0, 0, 0);
  
  for (const phase of moonPhases2026) {
    if (phase.phase === 'Pleine Lune') {
      const phaseDate = new Date(phase.date);
      if (phaseDate >= target) {
        return {
          ...phase,
          daysUntil: Math.ceil((phaseDate - target) / (1000 * 60 * 60 * 24))
        };
      }
    }
  }
  return null;
};

/**
 * Obtient la prochaine nouvelle lune
 */
export const getNextNewMoon = (fromDate = new Date()) => {
  const target = new Date(fromDate);
  target.setHours(0, 0, 0, 0);
  
  for (const phase of moonPhases2026) {
    if (phase.phase === 'Nouvelle Lune') {
      const phaseDate = new Date(phase.date);
      if (phaseDate >= target) {
        return {
          ...phase,
          daysUntil: Math.ceil((phaseDate - target) / (1000 * 60 * 60 * 24))
        };
      }
    }
  }
  return null;
};

/**
 * Obtient toutes les phases lunaires pour un mois donné
 */
export const getMoonPhasesForMonth = (year, month) => {
  return moonPhases2026.filter(phase => {
    const phaseDate = new Date(phase.date);
    return phaseDate.getFullYear() === year && phaseDate.getMonth() === month;
  });
};

/**
 * Vérifie si une date est une pleine lune
 */
export const isFullMoon = (date) => {
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  
  return moonPhases2026.some(phase => {
    const phaseDate = new Date(phase.date);
    phaseDate.setHours(0, 0, 0, 0);
    return phase.phase === 'Pleine Lune' && phaseDate.getTime() === target.getTime();
  });
};

/**
 * Vérifie si une date est une nouvelle lune
 */
export const isNewMoon = (date) => {
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  
  return moonPhases2026.some(phase => {
    const phaseDate = new Date(phase.date);
    phaseDate.setHours(0, 0, 0, 0);
    return phase.phase === 'Nouvelle Lune' && phaseDate.getTime() === target.getTime();
  });
};

export default moonPhases2026;
