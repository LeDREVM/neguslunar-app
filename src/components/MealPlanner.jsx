import React, { useState, useEffect } from 'react';
import { Target, TrendingDown, TrendingUp, Activity, Calendar, ChefHat, Plus, X, Edit2, Check } from 'lucide-react';

const MealPlanner = () => {
  const [goal, setGoal] = useState('maintenance'); // weight-loss, muscle-gain, maintenance
  const [userProfile, setUserProfile] = useState({
    age: 30,
    weight: 70,
    height: 170,
    gender: 'male',
    activityLevel: 'moderate'
  });
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [mealPlans, setMealPlans] = useState([]);
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());

  // Charger les données depuis localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('neguslunar-user-profile');
    const savedGoal = localStorage.getItem('neguslunar-goal');
    const savedPlans = localStorage.getItem('neguslunar-meal-plans');

    if (savedProfile) setUserProfile(JSON.parse(savedProfile));
    if (savedGoal) setGoal(savedGoal);
    if (savedPlans) setMealPlans(JSON.parse(savedPlans));
  }, []);

  // Sauvegarder dans localStorage
  useEffect(() => {
    localStorage.setItem('neguslunar-user-profile', JSON.stringify(userProfile));
    localStorage.setItem('neguslunar-goal', goal);
    localStorage.setItem('neguslunar-meal-plans', JSON.stringify(mealPlans));
  }, [userProfile, goal, mealPlans]);

  // Objectifs disponibles
  const goals = {
    'weight-loss': {
      name: 'Perte de Poids',
      icon: TrendingDown,
      color: 'blue',
      description: 'Déficit calorique pour perdre du poids sainement',
      calorieAdjustment: -500
    },
    'muscle-gain': {
      name: 'Prise de Masse',
      icon: TrendingUp,
      color: 'green',
      description: 'Surplus calorique pour développer la masse musculaire',
      calorieAdjustment: 500
    },
    'maintenance': {
      name: 'Maintien',
      icon: Activity,
      color: 'amber',
      description: 'Maintenir votre poids actuel',
      calorieAdjustment: 0
    }
  };

  // Niveaux d'activité
  const activityLevels = {
    sedentary: { name: 'Sédentaire', multiplier: 1.2 },
    light: { name: 'Légère', multiplier: 1.375 },
    moderate: { name: 'Modérée', multiplier: 1.55 },
    active: { name: 'Active', multiplier: 1.725 },
    veryActive: { name: 'Très Active', multiplier: 1.9 }
  };

  // Calculer le métabolisme de base (BMR) - Formule de Mifflin-St Jeor
  const calculateBMR = () => {
    const { weight, height, age, gender } = userProfile;
    if (gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  };

  // Calculer les besoins caloriques totaux (TDEE)
  const calculateTDEE = () => {
    const bmr = calculateBMR();
    const multiplier = activityLevels[userProfile.activityLevel].multiplier;
    return Math.round(bmr * multiplier);
  };

  // Calculer les calories cibles selon l'objectif
  const getTargetCalories = () => {
    const tdee = calculateTDEE();
    const adjustment = goals[goal].calorieAdjustment;
    return tdee + adjustment;
  };

  // Calculer les macronutriments recommandés
  const getMacros = () => {
    const calories = getTargetCalories();
    let proteinPercent, carbsPercent, fatsPercent;

    switch (goal) {
      case 'weight-loss':
        proteinPercent = 0.35; // 35% protéines
        carbsPercent = 0.35;   // 35% glucides
        fatsPercent = 0.30;    // 30% lipides
        break;
      case 'muscle-gain':
        proteinPercent = 0.30; // 30% protéines
        carbsPercent = 0.50;   // 50% glucides
        fatsPercent = 0.20;    // 20% lipides
        break;
      default: // maintenance
        proteinPercent = 0.30; // 30% protéines
        carbsPercent = 0.40;   // 40% glucides
        fatsPercent = 0.30;    // 30% lipides
    }

    return {
      proteins: Math.round((calories * proteinPercent) / 4), // 4 cal/g
      carbs: Math.round((calories * carbsPercent) / 4),      // 4 cal/g
      fats: Math.round((calories * fatsPercent) / 9)         // 9 cal/g
    };
  };

  // Jours de la semaine
  const daysOfWeek = [
    'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'
  ];

  // Exemples de repas selon l'objectif
  const getMealSuggestions = () => {
    const suggestions = {
      'weight-loss': [
        {
          name: 'Petit-déjeuner Protéiné',
          items: ['Omelette aux légumes (3 œufs)', 'Avocat (1/2)', 'Tomates cerises', 'Thé vert'],
          calories: 350,
          proteins: 25,
          carbs: 15,
          fats: 22
        },
        {
          name: 'Déjeuner Léger',
          items: ['Salade de poulet grillé', 'Quinoa (100g)', 'Légumes variés', 'Vinaigrette légère'],
          calories: 450,
          proteins: 40,
          carbs: 35,
          fats: 15
        },
        {
          name: 'Collation',
          items: ['Yaourt grec nature', 'Baies mélangées', 'Amandes (15g)'],
          calories: 200,
          proteins: 15,
          carbs: 18,
          fats: 8
        },
        {
          name: 'Dîner Équilibré',
          items: ['Saumon grillé (150g)', 'Brocoli vapeur', 'Patate douce (100g)', 'Huile d\'olive'],
          calories: 500,
          proteins: 45,
          carbs: 30,
          fats: 20
        }
      ],
      'muscle-gain': [
        {
          name: 'Petit-déjeuner Énergétique',
          items: ['Flocons d\'avoine (100g)', 'Banane', 'Beurre de cacahuète (30g)', 'Protéine whey'],
          calories: 600,
          proteins: 35,
          carbs: 70,
          fats: 18
        },
        {
          name: 'Déjeuner Complet',
          items: ['Riz basmati (150g)', 'Poulet (200g)', 'Légumes sautés', 'Huile d\'olive'],
          calories: 700,
          proteins: 55,
          carbs: 75,
          fats: 15
        },
        {
          name: 'Collation Post-Training',
          items: ['Shake protéiné', 'Banane', 'Flocons d\'avoine (50g)', 'Miel'],
          calories: 400,
          proteins: 30,
          carbs: 50,
          fats: 8
        },
        {
          name: 'Dîner Riche',
          items: ['Bœuf maigre (200g)', 'Pâtes complètes (150g)', 'Sauce tomate', 'Parmesan'],
          calories: 800,
          proteins: 60,
          carbs: 80,
          fats: 22
        }
      ],
      'maintenance': [
        {
          name: 'Petit-déjeuner Équilibré',
          items: ['Pain complet (2 tranches)', 'Œufs brouillés (2)', 'Avocat', 'Jus d\'orange'],
          calories: 450,
          proteins: 20,
          carbs: 45,
          fats: 20
        },
        {
          name: 'Déjeuner Varié',
          items: ['Poulet grillé (150g)', 'Riz complet (120g)', 'Salade verte', 'Vinaigrette'],
          calories: 550,
          proteins: 45,
          carbs: 50,
          fats: 18
        },
        {
          name: 'Collation Saine',
          items: ['Fruits frais', 'Noix mélangées (30g)', 'Carré de chocolat noir'],
          calories: 250,
          proteins: 8,
          carbs: 25,
          fats: 15
        },
        {
          name: 'Dîner Léger',
          items: ['Poisson blanc (150g)', 'Légumes grillés', 'Quinoa (100g)', 'Citron'],
          calories: 450,
          proteins: 40,
          carbs: 35,
          fats: 15
        }
      ]
    };

    return suggestions[goal] || suggestions.maintenance;
  };

  const targetCalories = getTargetCalories();
  const macros = getMacros();
  const currentGoal = goals[goal];
  const mealSuggestions = getMealSuggestions();

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-amber-400 mb-2">
          🍽️ Plans de Repas Personnalisés
        </h2>
        <p className="text-gray-400 text-sm">
          Atteignez vos objectifs avec des plans nutritionnels adaptés
        </p>
      </div>

      {/* Sélection de l'objectif */}
      <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-xl p-6 border border-purple-700/30">
        <h3 className="text-lg font-bold text-purple-400 mb-4 flex items-center gap-2">
          <Target size={20} />
          Votre Objectif
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {Object.entries(goals).map(([key, goalData]) => {
            const Icon = goalData.icon;
            return (
              <button
                key={key}
                onClick={() => setGoal(key)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  goal === key
                    ? `border-${goalData.color}-500 bg-${goalData.color}-900/30`
                    : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                }`}
              >
                <Icon className={`w-8 h-8 text-${goalData.color}-400 mb-2`} />
                <div className="font-bold text-white mb-1">{goalData.name}</div>
                <div className="text-xs text-gray-400">{goalData.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Profil utilisateur */}
      <div className="bg-gradient-to-br from-teal-900/20 to-cyan-900/20 rounded-xl p-6 border border-teal-700/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-teal-400">👤 Votre Profil</h3>
          <button
            onClick={() => setShowProfileEdit(!showProfileEdit)}
            className="text-teal-400 hover:text-teal-300 transition-colors"
          >
            {showProfileEdit ? <Check size={20} /> : <Edit2 size={20} />}
          </button>
        </div>

        {showProfileEdit ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Âge</label>
              <input
                type="number"
                value={userProfile.age}
                onChange={(e) => setUserProfile({...userProfile, age: parseInt(e.target.value)})}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Poids (kg)</label>
              <input
                type="number"
                value={userProfile.weight}
                onChange={(e) => setUserProfile({...userProfile, weight: parseInt(e.target.value)})}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Taille (cm)</label>
              <input
                type="number"
                value={userProfile.height}
                onChange={(e) => setUserProfile({...userProfile, height: parseInt(e.target.value)})}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Genre</label>
              <select
                value={userProfile.gender}
                onChange={(e) => setUserProfile({...userProfile, gender: e.target.value})}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white"
              >
                <option value="male">Homme</option>
                <option value="female">Femme</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-gray-400 mb-1 block">Niveau d'activité</label>
              <select
                value={userProfile.activityLevel}
                onChange={(e) => setUserProfile({...userProfile, activityLevel: e.target.value})}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white"
              >
                {Object.entries(activityLevels).map(([key, level]) => (
                  <option key={key} value={key}>{level.name}</option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{userProfile.age}</div>
              <div className="text-xs text-gray-400">ans</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{userProfile.weight}</div>
              <div className="text-xs text-gray-400">kg</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{userProfile.height}</div>
              <div className="text-xs text-gray-400">cm</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {userProfile.gender === 'male' ? '♂️' : '♀️'}
              </div>
              <div className="text-xs text-gray-400">
                {userProfile.gender === 'male' ? 'Homme' : 'Femme'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-white">
                {activityLevels[userProfile.activityLevel].name}
              </div>
              <div className="text-xs text-gray-400">Activité</div>
            </div>
          </div>
        )}
      </div>

      {/* Besoins caloriques et macros */}
      <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 rounded-xl p-6 border border-amber-700/30">
        <h3 className="text-lg font-bold text-amber-400 mb-4">📊 Vos Besoins Nutritionnels</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-amber-400">{targetCalories}</div>
            <div className="text-sm text-gray-400 mt-1">kcal/jour</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-blue-400">{macros.proteins}g</div>
            <div className="text-sm text-gray-400 mt-1">Protéines</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-green-400">{macros.carbs}g</div>
            <div className="text-sm text-gray-400 mt-1">Glucides</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-yellow-400">{macros.fats}g</div>
            <div className="text-sm text-gray-400 mt-1">Lipides</div>
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3 text-sm text-blue-300">
          <strong>💡 Info:</strong> Ces valeurs sont calculées selon votre profil et votre objectif de {currentGoal.name.toLowerCase()}.
        </div>
      </div>

      {/* Suggestions de repas */}
      <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-xl p-6 border border-green-700/30">
        <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
          <ChefHat size={20} />
          Plan de Repas Suggéré
        </h3>

        <div className="space-y-4">
          {mealSuggestions.map((meal, index) => (
            <div 
              key={index}
              className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-green-600 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-bold text-white mb-1">{meal.name}</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    {meal.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-green-400">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-amber-400">{meal.calories}</div>
                  <div className="text-xs text-gray-400">kcal</div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-3 pt-3 border-t border-gray-700">
                <div className="text-sm">
                  <span className="text-blue-400 font-semibold">{meal.proteins}g</span>
                  <span className="text-gray-500 ml-1">P</span>
                </div>
                <div className="text-sm">
                  <span className="text-green-400 font-semibold">{meal.carbs}g</span>
                  <span className="text-gray-500 ml-1">G</span>
                </div>
                <div className="text-sm">
                  <span className="text-yellow-400 font-semibold">{meal.fats}g</span>
                  <span className="text-gray-500 ml-1">L</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <div className="text-sm text-gray-400 mb-2">
            Total journalier: {mealSuggestions.reduce((acc, m) => acc + m.calories, 0)} kcal
          </div>
          <div className="text-xs text-gray-500">
            P = Protéines | G = Glucides | L = Lipides
          </div>
        </div>
      </div>

      {/* Conseils selon l'objectif */}
      <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-xl p-6 border border-indigo-700/30">
        <h3 className="text-lg font-bold text-indigo-400 mb-3">💡 Conseils pour {currentGoal.name}</h3>
        <div className="space-y-2 text-sm text-gray-300">
          {goal === 'weight-loss' && (
            <>
              <p className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                <span>Créez un déficit calorique modéré de 300-500 kcal par jour</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                <span>Privilégiez les protéines pour préserver la masse musculaire</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                <span>Mangez des aliments riches en fibres pour la satiété</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                <span>Buvez beaucoup d'eau (2-3L par jour)</span>
              </p>
            </>
          )}
          {goal === 'muscle-gain' && (
            <>
              <p className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                <span>Consommez un surplus calorique de 300-500 kcal par jour</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                <span>Visez 1.6-2.2g de protéines par kg de poids corporel</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                <span>Mangez des glucides autour de l'entraînement</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                <span>Répartissez vos repas sur 4-6 prises par jour</span>
              </p>
            </>
          )}
          {goal === 'maintenance' && (
            <>
              <p className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                <span>Maintenez un équilibre entre calories consommées et dépensées</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                <span>Variez votre alimentation pour tous les nutriments</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                <span>Écoutez vos signaux de faim et de satiété</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                <span>Pratiquez une activité physique régulière</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;
