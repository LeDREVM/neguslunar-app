/**
 * Base de données complète des recettes BODY DREVM
 * Intégration de toutes les recettes végétaliennes tropicales
 */

export const recipes = [
  // RECETTES DÉTOX
  {
    id: 'smoothie-betterave-agrumes',
    name: 'Smoothie Énergétique Betterave-Agrumes',
    category: 'smoothie',
    mood: 'énergique',
    dayOfWeek: null, // disponible tous les jours
    difficulty: 'facile',
    time: 5,
    servings: 1,
    isDetox: true,
    isPostWorkout: true,
    tags: ['vegan', 'sans-gluten', 'tropical', 'sport'],
    ingredients: [
      '200-300 ml jus de betterave frais',
      '1 orange + 1/2 citron',
      '100 g fruits rouges surgelés',
      '5 dattes Medjool',
      '1 c. à c. huile de coco'
    ],
    instructions: [
      'Mixer tous les ingrédients jusqu\'à consistance lisse',
      'Buvez frais 30-45 min pré-entraînement'
    ],
    nutrition: {
      calories: 250,
      proteins: 4,
      carbs: 50,
      fats: 5,
      fiber: 6
    },
    benefits: 'Améliore la VO2 max et réduit la fatigue ; idéal course/cyclisme',
    source: 'BODY DREVM Détox'
  },
  
  {
    id: 'salade-radis-noir-artichaut',
    name: 'Salade Détox Radis Noir-Artichaut-Crucifères',
    category: 'salade',
    mood: 'calme',
    dayOfWeek: null,
    difficulty: 'facile',
    time: 10,
    servings: 2,
    isDetox: true,
    isPostWorkout: true,
    tags: ['vegan', 'sans-gluten', 'détox', 'foie'],
    ingredients: [
      '4 radis noirs râpés',
      '2 fonds d\'artichaut en bocal',
      '150 g brocoli/chou fleur cru émincé',
      '1 tomate + 1 orange pelée',
      'Vinaigrette : 2 c. à s. huile olive, jus citron, coriandre'
    ],
    instructions: [
      'Mélanger tous les ingrédients',
      'Macérer 30 min au frais',
      'Servir post-entraînement'
    ],
    nutrition: {
      calories: 300,
      proteins: 8,
      carbs: 35,
      fats: 15,
      fiber: 12
    },
    benefits: 'Détox foie post-tabac ; fibres pour satiété et digestion',
    source: 'BODY DREVM Détox'
  },

  {
    id: 'veloute-betterave-patate-douce',
    name: 'Velouté Réconfortant Betterave-Patate Douce',
    category: 'soupe',
    mood: 'calme',
    dayOfWeek: null,
    difficulty: 'normal',
    time: 35,
    servings: 2,
    isDetox: true,
    isPostWorkout: true,
    tags: ['vegan', 'sans-gluten', 'réconfort', 'récupération'],
    ingredients: [
      '2 betteraves moyennes râpées',
      '1 grande patate douce cubée',
      '2 gousses ail haché',
      '75 cl eau/bouillon légume',
      '2 c. à s. crème soja',
      'Sel, piment, coriandre'
    ],
    instructions: [
      'Faire revenir betterave/patate douce/ail 10 min dans huile olive',
      'Ajouter eau, cuisez 20 min',
      'Mixer avec crème',
      'Garnir de coriandre'
    ],
    nutrition: {
      calories: 350,
      proteins: 8,
      carbs: 65,
      fats: 8,
      fiber: 10
    },
    benefits: 'Récupération musculaire ; bêta-carotène pour poumons ex-fumeur',
    source: 'BODY DREVM Détox'
  },

  {
    id: 'rotis-cruciferes-miel',
    name: 'Rôtis Crucifères Miel-Vegan Énergétiques',
    category: 'plat',
    mood: 'énergique',
    dayOfWeek: null,
    difficulty: 'facile',
    time: 25,
    servings: 2,
    isDetox: true,
    isPostWorkout: false,
    tags: ['vegan', 'sans-gluten', 'rôti', 'protéines'],
    ingredients: [
      '300 g brocoli + chou-fleur en fleurettes',
      '1 c. à s. miel vegan (agave)',
      '2 c. à s. huile olive + ail/épices',
      '2 c. à s. levure nutritionnelle'
    ],
    instructions: [
      'Préchauffer four 200°C',
      'Mélanger tous les ingrédients',
      'Rôtir 20 min'
    ],
    nutrition: {
      calories: 280,
      proteins: 12,
      carbs: 35,
      fats: 12,
      fiber: 8
    },
    benefits: 'Protéines végé pour muscles ; crucifères boostent glutathion (détox foie)',
    source: 'BODY DREVM Détox'
  },

  // RECETTES AYURVÉDIQUES TROPICALES
  {
    id: 'soupe-giraumon-coco-curcuma',
    name: 'Soupe Ayurvédique Giraumon, Coco et Curcuma',
    category: 'soupe',
    mood: 'calme',
    dayOfWeek: null,
    difficulty: 'facile',
    time: 30,
    servings: 1,
    isDetox: false,
    isPostWorkout: false,
    tags: ['vegan', 'sans-gluten', 'ayurvéda', 'anti-inflammatoire', 'tropical'],
    ingredients: [
      'Giraumon 250 g',
      'Lait de coco 120 ml',
      'Curcuma frais 5 g',
      'Gingembre frais 5 g',
      'Oignon pays 30 g',
      'Graines de coriandre 1 c. café',
      'Huile de coco 1 c. café',
      'Poivre noir'
    ],
    instructions: [
      'Faire revenir oignon, gingembre et curcuma dans huile de coco',
      'Ajouter giraumon cubé',
      'Verser lait de coco et eau',
      'Cuire 20 min',
      'Mixer et assaisonner'
    ],
    nutrition: {
      calories: 280,
      proteins: 4,
      carbs: 35,
      fats: 14,
      fiber: 6
    },
    benefits: 'Vitamine A élevée, antioxydants, anti-inflammatoire',
    source: 'DrevmCook Ayurvéda'
  },

  {
    id: 'dahl-pois-angole',
    name: 'Dahl de Pois d\'Angole',
    category: 'plat',
    mood: 'contemplatif',
    dayOfWeek: null,
    difficulty: 'normal',
    time: 40,
    servings: 2,
    isDetox: false,
    isPostWorkout: true,
    tags: ['vegan', 'sans-gluten', 'protéines', 'ayurvéda', 'local'],
    ingredients: [
      'Pois d\'Angole secs 120 g',
      'Ail 2 gousses',
      'Cumin 1 c. café',
      'Curry doux 1 c. café',
      'Lait de coco 100 ml'
    ],
    instructions: [
      'Faire tremper les pois d\'Angole 2h',
      'Cuire dans l\'eau 30 min',
      'Faire revenir ail et épices',
      'Ajouter pois cuits et lait de coco',
      'Mijoter 10 min'
    ],
    nutrition: {
      calories: 380,
      proteins: 20,
      carbs: 58,
      fats: 8,
      fiber: 15
    },
    benefits: '18–20 g protéines, fibres, magnésium, anti-inflammatoire',
    source: 'DrevmCook Ayurvéda'
  },

  {
    id: 'kitchari-riz-rouge-pois-rouges',
    name: 'Kitchari Tropical Riz Rouge – Pois Rouges',
    category: 'plat',
    mood: 'contemplatif',
    dayOfWeek: null,
    difficulty: 'facile',
    time: 35,
    servings: 1,
    isDetox: false,
    isPostWorkout: false,
    tags: ['vegan', 'sans-gluten', 'ayurvéda', 'protéines', 'tropical'],
    ingredients: [
      'Riz rouge 80 g',
      'Pois rouges cuits 80 g',
      'Curcuma 1 c. café',
      'Gingembre 1 cm',
      'Graines de fenouil'
    ],
    instructions: [
      'Faire revenir épices dans huile',
      'Ajouter riz et pois',
      'Couvrir d\'eau',
      'Cuire 25 min'
    ],
    nutrition: {
      calories: 360,
      proteins: 12,
      carbs: 68,
      fats: 4,
      fiber: 10
    },
    benefits: '12 g protéines, antioxydants, énergie durable',
    source: 'DrevmCook Ayurvéda'
  },

  // SHAKERS POST-SPORT
  {
    id: 'shaker-bwadchenn',
    name: 'Shaker Bwadchenn – Force + Récupération',
    category: 'smoothie',
    mood: 'énergique',
    dayOfWeek: null,
    difficulty: 'facile',
    time: 5,
    servings: 1,
    isDetox: false,
    isPostWorkout: true,
    tags: ['vegan', 'sans-gluten', 'sport', 'récupération', 'tropical'],
    ingredients: [
      '1 banane jaune mûre',
      '150 ml lait de coco frais',
      '1 c. farine de manioc',
      '1 c. café miel local',
      '1 pincée cannelle péyi',
      'Eau ou eau de coco'
    ],
    instructions: [
      'Mettre tous les ingrédients dans le blender',
      'Mixer jusqu\'à consistance lisse',
      'Boire immédiatement post-entraînement'
    ],
    nutrition: {
      calories: 320,
      proteins: 3,
      carbs: 45,
      fats: 10,
      fiber: 4
    },
    benefits: 'Potassium élevé, antioxydants, récupération musculaire',
    source: 'DrevmCook Shakers'
  },

  {
    id: 'shaker-kaz-a-fwiti',
    name: 'Shaker Kaz A Fwiti – Masse Propre',
    category: 'smoothie',
    mood: 'énergique',
    dayOfWeek: null,
    difficulty: 'facile',
    time: 5,
    servings: 1,
    isDetox: false,
    isPostWorkout: true,
    tags: ['vegan', 'sans-gluten', 'sport', 'masse', 'tropical'],
    ingredients: [
      '1 mangue locale',
      '1 banane sucrée',
      '200 ml eau de coco fraîche',
      '1 c. poudre de goyave (ou ½ goyave)',
      'Graines de chia ou lin'
    ],
    instructions: [
      'Mixer tous les ingrédients',
      'Boire frais'
    ],
    nutrition: {
      calories: 380,
      proteins: 5,
      carbs: 60,
      fats: 8,
      fiber: 6
    },
    benefits: 'Glucides : 50–60 g, Fibres : 6 g, Vitamine C forte dose',
    source: 'DrevmCook Shakers'
  },

  {
    id: 'shaker-racin-peyi',
    name: 'Shaker Racin Péyi – Prise de Masse Lente',
    category: 'smoothie',
    mood: 'contemplatif',
    dayOfWeek: null,
    difficulty: 'facile',
    time: 10,
    servings: 1,
    isDetox: false,
    isPostWorkout: true,
    tags: ['vegan', 'sans-gluten', 'sport', 'masse', 'ig-bas'],
    ingredients: [
      '100 g patate douce cuite',
      '150 ml lait végétal (amande, coco ou riz)',
      '1 banane plantain mûre',
      '1 c. farine de patate douce ou manioc',
      'Muscade + cannelle'
    ],
    instructions: [
      'Cuire la patate douce',
      'Mixer tous les ingrédients',
      'Boire tiède ou frais'
    ],
    nutrition: {
      calories: 420,
      proteins: 4,
      carbs: 55,
      fats: 6,
      fiber: 8
    },
    benefits: 'Index glycémique bas, énergie stable, fibres élevées',
    source: 'DrevmCook Shakers'
  },

  // RECETTES PROBIOTIQUES
  {
    id: 'dessert-kreol-gut-boost',
    name: 'Dessert Probiotique Kréyol Gut Boost',
    category: 'dessert',
    mood: 'calme',
    dayOfWeek: null,
    difficulty: 'facile',
    time: 15,
    servings: 2,
    isDetox: false,
    isPostWorkout: false,
    tags: ['vegan', 'sans-gluten', 'probiotique', 'digestif', 'tropical'],
    ingredients: [
      'Yaourt végétal fermenté 200 g',
      'Banane péyi 1',
      'Ananas frais 80 g',
      'Goyave rose ou blanche 1',
      'Graines de chia 1 c. à soupe',
      'Miel local 1 c. café',
      'Cannelle péyi 1 pincée'
    ],
    instructions: [
      'Mélanger yaourt avec purée de goyave',
      'Ajouter banane écrasée et dés d\'ananas',
      'Incorporer chia et cannelle',
      'Laisser reposer 10-15 min',
      'Servir frais'
    ],
    nutrition: {
      calories: 220,
      proteins: 6,
      carbs: 38,
      fats: 5,
      fiber: 7
    },
    benefits: 'Soutien du microbiote, digestion améliorée, anti-inflammatoire',
    source: 'DrevmCook Probiotiques'
  },

  // RECETTES SEMAINE
  {
    id: 'cookies-beurre-cacahuetes',
    name: 'Cookies au Beurre de Cacahuètes',
    category: 'snack',
    mood: 'énergique',
    dayOfWeek: 1, // Lundi
    difficulty: 'facile',
    time: 17,
    servings: 20,
    isDetox: false,
    isPostWorkout: false,
    tags: ['vegan', 'snack', 'protéines'],
    ingredients: [
      '2 Bananes (300 g)',
      'Chocolat noir (15 g)',
      'Poudre protéinée ou Farine de blé complet (60 g)',
      'Flocons d\'avoine (85 g)',
      'Beurre de cacahuètes (2 c. à soupe, 40 g)'
    ],
    instructions: [
      'Préchauffer four à 180°C',
      'Écraser les bananes',
      'Hacher le chocolat',
      'Mixer tous les ingrédients',
      'Former des boules et aplatir sur plaque',
      'Cuire 12 minutes'
    ],
    nutrition: {
      calories: 56,
      proteins: 2.5,
      carbs: 8,
      fats: 2,
      fiber: 1.5
    },
    benefits: 'Riche en glucides et fibres, source de protéines',
    source: 'Plan Hebdomadaire'
  },

  // RECETTES DÉTOX SEMAINE 2
  {
    id: 'jus-radis-noir-navet',
    name: 'Jus Radis Noir-Navet Détox',
    category: 'jus',
    mood: 'énergique',
    dayOfWeek: null,
    difficulty: 'facile',
    time: 5,
    servings: 1,
    isDetox: true,
    isPostWorkout: false,
    tags: ['vegan', 'sans-gluten', 'détox', 'foie', 'drainage'],
    ingredients: [
      '2 radis noirs',
      '1 navet',
      '1 orange',
      'Gingembre frais'
    ],
    instructions: [
      'Mixer tous les ingrédients',
      'Boire matin à jeun pour drainage foie max'
    ],
    nutrition: {
      calories: 80,
      proteins: 2,
      carbs: 18,
      fats: 0.5,
      fiber: 4
    },
    benefits: 'Drainage foie maximum, détox post-tabac',
    source: 'BODY DREVM Détox Semaine 2'
  },

  {
    id: 'curry-cruciferes-patate-douce',
    name: 'Curry Crucifères-Patate Douce',
    category: 'plat',
    mood: 'créatif',
    dayOfWeek: null,
    difficulty: 'normal',
    time: 30,
    servings: 3,
    isDetox: true,
    isPostWorkout: false,
    tags: ['vegan', 'sans-gluten', 'curry', 'protéines'],
    ingredients: [
      'Patate douce 2',
      'Brocoli 200 g',
      'Chou 200 g',
      'Lait coco vegan 400 ml',
      'Curry 2 c. soupe',
      'Miel vegan 1 c. soupe',
      'Pois chiches 200 g'
    ],
    instructions: [
      'Cuire patate douce, brocoli, chou dans lait coco',
      'Ajouter curry et miel',
      'Incorporer pois chiches',
      'Mijoter 20 min'
    ],
    nutrition: {
      calories: 420,
      proteins: 14,
      carbs: 52,
      fats: 18,
      fiber: 12
    },
    benefits: 'Protéines via pois chiches, détox foie, énergie stable',
    source: 'BODY DREVM Détox Semaine 2'
  }
];

// Fonction pour filtrer les recettes
export const filterRecipes = (filters = {}) => {
  return recipes.filter(recipe => {
    if (filters.mood && recipe.mood !== filters.mood) return false;
    if (filters.category && recipe.category !== filters.category) return false;
    if (filters.dayOfWeek && recipe.dayOfWeek !== null && recipe.dayOfWeek !== filters.dayOfWeek) return false;
    if (filters.isDetox !== undefined && recipe.isDetox !== filters.isDetox) return false;
    if (filters.isPostWorkout !== undefined && recipe.isPostWorkout !== filters.isPostWorkout) return false;
    if (filters.difficulty && recipe.difficulty !== filters.difficulty) return false;
    if (filters.maxTime && recipe.time > filters.maxTime) return false;
    if (filters.tags && !filters.tags.every(tag => recipe.tags.includes(tag))) return false;
    return true;
  });
};

// Fonction pour obtenir les recettes par jour
export const getRecipesByDay = (dayIndex) => {
  return recipes.filter(recipe => recipe.dayOfWeek === dayIndex || recipe.dayOfWeek === null);
};

// Fonction pour obtenir les recettes par mood
export const getRecipesByMood = (mood) => {
  return recipes.filter(recipe => recipe.mood === mood);
};

// Catégories disponibles
export const categories = [
  { id: 'all', name: 'Toutes', emoji: '🍽️' },
  { id: 'smoothie', name: 'Smoothies', emoji: '🥤' },
  { id: 'salade', name: 'Salades', emoji: '🥗' },
  { id: 'soupe', name: 'Soupes', emoji: '🍲' },
  { id: 'plat', name: 'Plats', emoji: '🍛' },
  { id: 'snack', name: 'Snacks', emoji: '🍪' },
  { id: 'dessert', name: 'Desserts', emoji: '🍨' },
  { id: 'jus', name: 'Jus', emoji: '🧃' }
];

// Moods disponibles
export const moods = [
  { id: 'all', name: 'Tous', emoji: '🌟', color: 'gray' },
  { id: 'énergique', name: 'Énergique', emoji: '⚡', color: 'yellow' },
  { id: 'calme', name: 'Calme', emoji: '🧘', color: 'blue' },
  { id: 'créatif', name: 'Créatif', emoji: '🎨', color: 'purple' },
  { id: 'contemplatif', name: 'Contemplatif', emoji: '🌙', color: 'indigo' }
];

// Jours de la semaine
export const daysOfWeek = [
  { id: 0, name: 'Dimanche', short: 'Dim' },
  { id: 1, name: 'Lundi', short: 'Lun' },
  { id: 2, name: 'Mardi', short: 'Mar' },
  { id: 3, name: 'Mercredi', short: 'Mer' },
  { id: 4, name: 'Jeudi', short: 'Jeu' },
  { id: 5, name: 'Vendredi', short: 'Ven' },
  { id: 6, name: 'Samedi', short: 'Sam' }
];

export default recipes;
