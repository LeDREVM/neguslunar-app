/**
 * Éclipses Lunaires 2026
 * Données astronomiques calculées pour l'année 2026
 * 
 * Types d'éclipses :
 * - Totale : La Lune passe complètement dans l'ombre de la Terre
 * - Partielle : Une partie de la Lune passe dans l'ombre de la Terre
 * - Pénombrale : La Lune passe dans la pénombre de la Terre (peu visible)
 */

export const lunarEclipses2026 = [
  {
    id: 'eclipse-2026-03-03',
    date: '2026-03-03',
    type: 'Totale',
    emoji: '🌕🌑',
    magnitude: 1.155, // > 1.0 = totale
    duration: {
      total: '58 minutes',
      partial: '3h 28min',
      penumbral: '5h 09min'
    },
    visibility: {
      regions: [
        'Amérique du Nord',
        'Amérique du Sud',
        'Europe de l\'Ouest',
        'Afrique de l\'Ouest',
        'Atlantique'
      ],
      bestView: 'Amérique du Nord et du Sud'
    },
    timing: {
      start: '09:03 UTC',
      maximum: '11:33 UTC',
      end: '14:12 UTC'
    },
    description: 'Éclipse lunaire totale visible depuis les Amériques. La Lune prendra une teinte rouge-orangée caractéristique (Lune de Sang).',
    significance: 'Première éclipse lunaire totale de 2026, particulièrement spectaculaire.',
    visibleFromGuadeloupe: true,
    bestViewingTime: '07:33 (heure locale Guadeloupe)',
    color: 'Rouge cuivré à rouge-orangé'
  },
  {
    id: 'eclipse-2026-08-28',
    date: '2026-08-28',
    type: 'Partielle',
    emoji: '🌕🌗',
    magnitude: 0.932, // < 1.0 = partielle
    duration: {
      total: 'N/A',
      partial: '3h 18min',
      penumbral: '5h 26min'
    },
    visibility: {
      regions: [
        'Asie',
        'Australie',
        'Pacifique',
        'Amérique du Nord (ouest)',
        'Amérique du Sud (ouest)'
      ],
      bestView: 'Asie et Pacifique'
    },
    timing: {
      start: '02:25 UTC',
      maximum: '04:13 UTC',
      end: '07:51 UTC'
    },
    description: 'Éclipse lunaire partielle visible principalement depuis l\'Asie et le Pacifique. Environ 93% de la Lune sera dans l\'ombre.',
    significance: 'Presque totale, offrant un spectacle impressionnant.',
    visibleFromGuadeloupe: false,
    bestViewingTime: 'Non visible',
    color: 'Gris sombre avec teinte rougeâtre'
  }
];

/**
 * Éclipses Pénombrales 2026 (moins spectaculaires)
 */
export const penumbralEclipses2026 = [
  {
    id: 'eclipse-2026-02-17',
    date: '2026-02-17',
    type: 'Pénombrale',
    emoji: '🌕🌫️',
    magnitude: 0.969,
    duration: {
      penumbral: '4h 35min'
    },
    visibility: {
      regions: ['Amérique', 'Europe', 'Afrique'],
      bestView: 'Amérique du Sud'
    },
    timing: {
      start: '10:54 UTC',
      maximum: '13:12 UTC',
      end: '15:29 UTC'
    },
    description: 'Éclipse pénombrale profonde. La Lune semblera légèrement assombrie.',
    visibleFromGuadeloupe: true
  },
  {
    id: 'eclipse-2026-08-12',
    date: '2026-08-12',
    type: 'Pénombrale',
    emoji: '🌕🌫️',
    magnitude: 0.285,
    duration: {
      penumbral: '2h 21min'
    },
    visibility: {
      regions: ['Asie', 'Australie', 'Pacifique'],
      bestView: 'Asie de l\'Est'
    },
    timing: {
      start: '17:25 UTC',
      maximum: '18:36 UTC',
      end: '19:46 UTC'
    },
    description: 'Éclipse pénombrale légère, difficile à observer à l\'œil nu.',
    visibleFromGuadeloupe: false
  }
];

/**
 * Obtient toutes les éclipses (totales + partielles + pénombrales)
 */
export const getAllEclipses2026 = () => {
  return [...lunarEclipses2026, ...penumbralEclipses2026].sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  );
};

/**
 * Obtient uniquement les éclipses majeures (totales et partielles)
 */
export const getMajorEclipses2026 = () => {
  return lunarEclipses2026;
};

/**
 * Obtient la prochaine éclipse lunaire
 */
export const getNextEclipse = (fromDate = new Date()) => {
  const allEclipses = getAllEclipses2026();
  const target = new Date(fromDate);
  target.setHours(0, 0, 0, 0);
  
  for (const eclipse of allEclipses) {
    const eclipseDate = new Date(eclipse.date);
    if (eclipseDate >= target) {
      const daysUntil = Math.ceil((eclipseDate - target) / (1000 * 60 * 60 * 24));
      return {
        ...eclipse,
        daysUntil
      };
    }
  }
  return null;
};

/**
 * Vérifie si une date correspond à une éclipse
 */
export const isEclipseDate = (date) => {
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  
  return getAllEclipses2026().some(eclipse => {
    const eclipseDate = new Date(eclipse.date);
    eclipseDate.setHours(0, 0, 0, 0);
    return eclipseDate.getTime() === target.getTime();
  });
};

/**
 * Obtient les détails d'une éclipse pour une date donnée
 */
export const getEclipseForDate = (date) => {
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  
  return getAllEclipses2026().find(eclipse => {
    const eclipseDate = new Date(eclipse.date);
    eclipseDate.setHours(0, 0, 0, 0);
    return eclipseDate.getTime() === target.getTime();
  });
};

/**
 * Obtient les éclipses visibles depuis la Guadeloupe
 */
export const getGuadeloupeVisibleEclipses = () => {
  return getAllEclipses2026().filter(eclipse => eclipse.visibleFromGuadeloupe);
};

/**
 * Conseils d'observation pour les éclipses
 */
export const observationTips = {
  preparation: [
    '🔭 Trouver un endroit sombre, loin des lumières de la ville',
    '🌡️ Vérifier la météo : ciel dégagé nécessaire',
    '📱 Télécharger une app d\'astronomie pour suivre la progression',
    '🪑 Prévoir une chaise confortable pour observer',
    '🧥 S\'habiller chaudement (nuits fraîches)',
    '☕ Apporter boissons chaudes et snacks',
    '📷 Préparer appareil photo (trépied recommandé)'
  ],
  photography: [
    '📸 Utiliser un trépied stable',
    '🎯 Réglages : ISO 400-800, ouverture f/8-f/11',
    '⏱️ Temps d\'exposition : 1/125s à 2s selon la phase',
    '🔍 Téléobjectif 200mm minimum recommandé',
    '🌙 Prendre plusieurs photos à différentes expositions',
    '⚙️ Mode manuel obligatoire',
    '🔴 Pas besoin de filtre (contrairement aux éclipses solaires)'
  ],
  safety: [
    '✅ Observation à l\'œil nu totalement sûre (pas de danger)',
    '🌙 Pas besoin de protection oculaire',
    '👀 Jumelles ou télescope améliorent l\'expérience',
    '🚫 Ne pas confondre avec éclipse solaire (celle-ci est dangereuse)',
    '🌡️ Attention à l\'hypothermie lors d\'observations longues',
    '🦟 Prévoir anti-moustiques selon la saison'
  ],
  timing: [
    '⏰ Arriver 30 min avant le début',
    '📊 L\'éclipse totale dure généralement 1-2 heures',
    '🌑 Phase de totalité : 30-100 minutes',
    '📅 Consulter l\'heure locale précise',
    '🌍 Tenir compte du fuseau horaire',
    '⏳ La progression est lente, soyez patient'
  ]
};

/**
 * Significations spirituelles des éclipses lunaires
 */
export const eclipseMeanings = {
  spiritual: {
    title: 'Signification Spirituelle',
    description: 'Les éclipses lunaires sont considérées comme des moments puissants de transformation et de libération.',
    aspects: [
      '🌑 Fin de cycle : Clôture d\'une période',
      '✨ Transformation profonde : Changements majeurs',
      '🔮 Révélations : Vérités cachées qui émergent',
      '💫 Libération : Lâcher prise sur le passé',
      '🌟 Renouveau : Préparation à un nouveau départ',
      '🧘 Introspection : Méditation profonde recommandée'
    ]
  },
  emotional: {
    title: 'Impact Émotionnel',
    description: 'Les éclipses peuvent intensifier les émotions et apporter des prises de conscience.',
    effects: [
      '💭 Émotions amplifiées',
      '🔍 Clarté soudaine sur des situations',
      '💔 Fin de relations ou situations',
      '🌈 Nouveaux départs émotionnels',
      '😴 Fatigue ou agitation',
      '🎭 Révélation de vérités cachées'
    ]
  },
  ritual: {
    title: 'Rituels Recommandés',
    description: 'Pratiques spirituelles adaptées aux éclipses lunaires.',
    practices: [
      '🕯️ Méditation de libération',
      '📝 Écrire ce que vous souhaitez lâcher',
      '🔥 Rituel de brûlage symbolique',
      '💎 Recharger vos cristaux',
      '🛁 Bain purificateur aux sels',
      '🙏 Prières ou affirmations de transformation',
      '🌙 Eau lunaire (exposer eau à l\'éclipse)'
    ]
  }
};

export default lunarEclipses2026;
