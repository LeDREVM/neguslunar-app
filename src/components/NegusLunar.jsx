import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Moon, Leaf, BookOpen, Plus, X, Calendar, ChevronLeft, ChevronRight, Download, Upload, UtensilsCrossed, Clock, Users, Sparkles, Heart, TrendingUp, Activity, Wind, Smile, Meh, Frown, Angry, Coffee, Camera, Target } from 'lucide-react';
import MoonCalendar from './MoonCalendar';
import EclipseCalendar from './EclipseCalendar';
import BarcodeScanner from './BarcodeScanner';
import IntermittentFasting from './IntermittentFasting';
import MealPlanner from './MealPlanner';
import { getAccurateMoonPhase, isFullMoon, isNewMoon } from '../data/moonPhases2026';
import { isEclipseDate, getEclipseForDate } from '../data/lunarEclipses2026';

const NegusLunar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('lunar');
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const fileInputRef = useRef(null);
  
  // États pour le module Rituel Lunaire
  const [gratitudeText, setGratitudeText] = useState('');
  const [dailyMood, setDailyMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);
  
  // État pour la navigation des recettes (0 = Lundi, 6 = Dimanche)
  const [selectedRecipeDay, setSelectedRecipeDay] = useState(null);

  // Charger les notes depuis localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('negusLunarNotes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Sauvegarder les notes dans localStorage
  useEffect(() => {
    localStorage.setItem('negusLunarNotes', JSON.stringify(notes));
  }, [notes]);

  // Charger les données du rituel depuis localStorage
  useEffect(() => {
    const savedMoodHistory = localStorage.getItem('negusLunarMoodHistory');
    if (savedMoodHistory) {
      setMoodHistory(JSON.parse(savedMoodHistory));
    }
  }, []);

  // Sauvegarder l'historique d'humeur dans localStorage
  useEffect(() => {
    localStorage.setItem('negusLunarMoodHistory', JSON.stringify(moodHistory));
  }, [moodHistory]);

  // Calcul de la phase lunaire
  const getMoonPhase = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    const day = date.getDate();
    
    let c = 0, e = 0, jd = 0, b = 0;
    
    if (month < 3) {
      year--;
      month += 12;
    }
    
    ++month;
    c = 365.25 * year;
    e = 30.6 * month;
    jd = c + e + day - 694039.09;
    jd /= 29.5305882;
    b = parseInt(jd);
    jd -= b;
    b = Math.round(jd * 8);
    
    if (b >= 8) b = 0;
    
    const phases = [
      { name: 'Nouvelle Lune', emoji: '🌑', description: 'Nouveau départ, intentions' },
      { name: 'Premier Croissant', emoji: '🌒', description: 'Germination, action' },
      { name: 'Premier Quartier', emoji: '🌓', description: 'Construction, détermination' },
      { name: 'Gibbeuse Croissante', emoji: '🌔', description: 'Raffinement, ajustement' },
      { name: 'Pleine Lune', emoji: '🌕', description: 'Accomplissement, gratitude' },
      { name: 'Gibbeuse Décroissante', emoji: '🌖', description: 'Partage, récolte' },
      { name: 'Dernier Quartier', emoji: '🌗', description: 'Libération, pardon' },
      { name: 'Dernier Croissant', emoji: '🌘', description: 'Repos, introspection' }
    ];
    
    return phases[b];
  };

  // Utiliser les données précises si disponibles, sinon fallback sur le calcul
  const accuratePhase = getAccurateMoonPhase(currentDate);
  const moonPhase = accuratePhase || getMoonPhase(currentDate);
  
  const getPhaseInfoForDate = (date) => {
    const accurate = getAccurateMoonPhase(date);
    if (accurate) {
      const fallback = getMoonPhase(date);
      return {
        name: accurate.name,
        emoji: accurate.emoji || fallback.emoji,
        description: accurate.description || fallback.description,
        illumination: accurate.illumination,
        exactTime: accurate.exactTime
      };
    }
    return getMoonPhase(date);
  };

  const weeklyPhases = useMemo(() => {
    const start = new Date(currentDate);
    start.setHours(0, 0, 0, 0);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const info = getPhaseInfoForDate(d);
      return {
        ...info,
        date: d
      };
    });
  }, [currentDate]);
  
  // Ajouter des informations supplémentaires
  const todayIsFullMoon = isFullMoon(currentDate);
  const todayIsNewMoon = isNewMoon(currentDate);
  const todayIsEclipse = isEclipseDate(currentDate);
  const todayEclipse = todayIsEclipse ? getEclipseForDate(currentDate) : null;

  // Recettes végétaliennes complètes par humeur
  const recipesByMood = {
    énergique: [
      { 
        name: 'Bowl de Quinoa Arc-en-ciel',
        time: '25 min',
        servings: '2 personnes',
        ingredients: [
          '200g de quinoa',
          '1 avocat mûr',
          '1 poivron rouge',
          '1 carotte',
          '100g d\'edamame',
          '2 c. à soupe de tahini',
          'Jus de citron',
          'Graines de sésame'
        ],
        instructions: [
          'Rincer et cuire le quinoa 15 min',
          'Couper les légumes en dés',
          'Préparer la sauce tahini-citron',
          'Assembler le bowl et garnir de graines'
        ],
        nutrition: {
          calories: '520 kcal',
          proteines: '18g',
          glucides: '65g',
          lipides: '22g',
          fibres: '12g'
        }
      },
      { 
        name: 'Smoothie Vert Dynamique',
        time: '5 min',
        servings: '1 personne',
        ingredients: [
          '2 poignées d\'épinards frais',
          '1 banane mûre',
          '1 c. à café de spiruline',
          '250ml de lait d\'amande',
          '1 c. à soupe de beurre d\'amande',
          '1 c. à café de graines de chia',
          'Glaçons'
        ],
        instructions: [
          'Mettre tous les ingrédients dans le blender',
          'Mixer jusqu\'à obtenir une texture lisse',
          'Ajouter des glaçons si désiré',
          'Servir immédiatement'
        ],
        nutrition: {
          calories: '340 kcal',
          proteines: '12g',
          glucides: '45g',
          lipides: '14g',
          fibres: '9g'
        }
      },
      { 
        name: 'Salade Thai Épicée',
        time: '20 min',
        servings: '2 personnes',
        ingredients: [
          '1/2 chou chinois émincé',
          '2 carottes râpées',
          '1 poivron jaune',
          '100g de cacahuètes grillées',
          'Coriandre fraîche',
          '3 c. à soupe de sauce soja',
          '2 c. à soupe de jus de lime',
          '1 c. à café de pâte de piment',
          '1 c. à soupe de sirop d\'agave'
        ],
        instructions: [
          'Émincer finement le chou et les légumes',
          'Mélanger les ingrédients de la sauce',
          'Concasser grossièrement les cacahuètes',
          'Assembler et bien mélanger',
          'Laisser mariner 10 min avant de servir'
        ],
        nutrition: {
          calories: '380 kcal',
          proteines: '15g',
          glucides: '35g',
          lipides: '22g',
          fibres: '8g'
        }
      }
    ],
    calme: [
      { 
        name: 'Soupe Miso Réconfortante',
        time: '15 min',
        servings: '2 personnes',
        ingredients: [
          '800ml de bouillon de légumes',
          '3 c. à soupe de pâte miso',
          '200g de tofu soyeux',
          '2 c. à soupe d\'algues wakame',
          '2 oignons verts',
          '1 c. à café de gingembre râpé',
          'Graines de sésame'
        ],
        instructions: [
          'Faire chauffer le bouillon avec le gingembre',
          'Réhydrater les algues wakame',
          'Couper le tofu en cubes',
          'Diluer le miso dans un peu de bouillon',
          'Ajouter tous les ingrédients (ne pas bouillir)',
          'Garnir d\'oignons verts et sésame'
        ],
        nutrition: {
          calories: '180 kcal',
          proteines: '12g',
          glucides: '18g',
          lipides: '7g',
          fibres: '4g'
        }
      },
      { 
        name: 'Risotto aux Champignons',
        time: '35 min',
        servings: '3 personnes',
        ingredients: [
          '300g de riz arborio',
          '400g de champignons mélangés',
          '1 oignon émincé',
          '2 gousses d\'ail',
          '1L de bouillon de légumes chaud',
          '100ml de vin blanc (optionnel)',
          '3 c. à soupe de levure nutritionnelle',
          '2 c. à soupe d\'huile d\'olive',
          'Persil frais'
        ],
        instructions: [
          'Faire revenir l\'oignon et l\'ail',
          'Ajouter les champignons émincés',
          'Incorporer le riz et nacrer 2 min',
          'Ajouter le bouillon louche par louche',
          'Remuer régulièrement pendant 20 min',
          'Terminer avec la levure nutritionnelle',
          'Garnir de persil frais'
        ],
        nutrition: {
          calories: '420 kcal',
          proteines: '14g',
          glucides: '72g',
          lipides: '8g',
          fibres: '5g'
        }
      },
      { 
        name: 'Porridge Coco-Cardamome',
        time: '10 min',
        servings: '1 personne',
        ingredients: [
          '60g de flocons d\'avoine',
          '200ml de lait de coco',
          '100ml d\'eau',
          '1/2 c. à café de cardamome moulue',
          '1 c. à soupe de sirop d\'érable',
          '2 c. à soupe d\'amandes effilées',
          'Fruits frais (mangue, banane)',
          'Noix de coco râpée'
        ],
        instructions: [
          'Faire chauffer le lait de coco et l\'eau',
          'Ajouter les flocons d\'avoine et la cardamome',
          'Cuire 5-7 min en remuant',
          'Incorporer le sirop d\'érable',
          'Garnir de fruits, amandes et coco râpée'
        ],
        nutrition: {
          calories: '480 kcal',
          proteines: '11g',
          glucides: '58g',
          lipides: '24g',
          fibres: '8g'
        }
      }
    ],
    créatif: [
      { 
        name: 'Tacos de Jackfruit BBQ',
        time: '30 min',
        servings: '4 personnes',
        ingredients: [
          '400g de fruit de jacquier en conserve',
          '4 c. à soupe de sauce BBQ',
          '1 c. à café de paprika fumé',
          '8 tortillas de maïs',
          '1/2 chou rouge émincé',
          '1 avocat',
          'Coriandre fraîche',
          'Crème de cajou',
          'Jus de lime'
        ],
        instructions: [
          'Égoutter et effilocher le jackfruit',
          'Faire revenir avec les épices 5 min',
          'Ajouter la sauce BBQ et cuire 15 min',
          'Préparer le chou mariné au lime',
          'Réchauffer les tortillas',
          'Assembler : jackfruit, chou, avocat, crème',
          'Garnir de coriandre'
        ],
        nutrition: {
          calories: '380 kcal',
          proteines: '8g',
          glucides: '62g',
          lipides: '12g',
          fibres: '10g'
        }
      },
      { 
        name: 'Pizza Verte à la Roquette',
        time: '45 min',
        servings: '2 personnes',
        ingredients: [
          '1 pâte à pizza (250g)',
          '100g de pesto de basilic',
          '150g de mozzarella végétale',
          '100g de roquette fraîche',
          '50g de pignons de pin',
          'Tomates cerises',
          'Huile d\'olive',
          'Levure nutritionnelle'
        ],
        instructions: [
          'Préchauffer le four à 220°C',
          'Étaler la pâte sur une plaque',
          'Tartiner de pesto généreusement',
          'Ajouter la mozzarella végétale',
          'Enfourner 12-15 min jusqu\'à doré',
          'Sortir et ajouter roquette et pignons',
          'Arroser d\'huile d\'olive'
        ],
        nutrition: {
          calories: '620 kcal',
          proteines: '18g',
          glucides: '68g',
          lipides: '30g',
          fibres: '6g'
        }
      },
      { 
        name: 'Curry Malais aux Patates Douces',
        time: '40 min',
        servings: '4 personnes',
        ingredients: [
          '2 patates douces moyennes',
          '400ml de lait de coco',
          '200g de pois chiches cuits',
          '2 c. à soupe de pâte de curry rouge',
          '1 oignon',
          '2 gousses d\'ail',
          '1 poivron rouge',
          'Épinards frais',
          'Coriandre',
          'Riz basmati pour servir'
        ],
        instructions: [
          'Couper les patates douces en cubes',
          'Faire revenir oignon, ail et pâte de curry',
          'Ajouter les patates et le lait de coco',
          'Laisser mijoter 20 min',
          'Ajouter pois chiches et poivron',
          'Cuire 10 min supplémentaires',
          'Incorporer les épinards en fin de cuisson',
          'Servir avec riz et coriandre'
        ],
        nutrition: {
          calories: '450 kcal',
          proteines: '12g',
          glucides: '58g',
          lipides: '20g',
          fibres: '11g'
        }
      }
    ],
    contemplatif: [
      { 
        name: 'Dal aux Lentilles Corail',
        time: '30 min',
        servings: '4 personnes',
        ingredients: [
          '250g de lentilles corail',
          '400ml de lait de coco',
          '400ml de bouillon de légumes',
          '1 oignon',
          '3 gousses d\'ail',
          '2 c. à café de curcuma',
          '1 c. à café de cumin',
          '1 c. à café de garam masala',
          'Gingembre frais râpé',
          'Épinards frais',
          'Coriandre'
        ],
        instructions: [
          'Rincer les lentilles corail',
          'Faire revenir oignon, ail, gingembre',
          'Ajouter les épices et faire griller 1 min',
          'Incorporer lentilles, lait de coco et bouillon',
          'Laisser mijoter 20 min jusqu\'à crémeux',
          'Ajouter les épinards en fin de cuisson',
          'Servir avec riz basmati et coriandre'
        ],
        nutrition: {
          calories: '380 kcal',
          proteines: '18g',
          glucides: '48g',
          lipides: '14g',
          fibres: '12g'
        }
      },
      { 
        name: 'Bouddha Bowl Équilibré',
        time: '35 min',
        servings: '2 personnes',
        ingredients: [
          '150g de riz complet',
          '200g de pois chiches',
          '1 patate douce',
          '1 betterave',
          '100g de chou kale',
          '1/2 avocat',
          '100g de houmous',
          'Graines de courge',
          'Tahini',
          'Jus de citron'
        ],
        instructions: [
          'Cuire le riz complet (25 min)',
          'Rôtir patate douce et betterave 25 min à 200°C',
          'Faire revenir les pois chiches avec épices',
          'Masser le chou kale avec citron',
          'Préparer la sauce tahini-citron',
          'Assembler tous les éléments dans un bowl',
          'Garnir de graines et arroser de sauce'
        ],
        nutrition: {
          calories: '580 kcal',
          proteines: '20g',
          glucides: '82g',
          lipides: '20g',
          fibres: '16g'
        }
      },
      { 
        name: 'Thé Chaï & Biscuits Avoine',
        time: '25 min',
        servings: '12 biscuits',
        ingredients: [
          '150g de flocons d\'avoine',
          '100g de farine complète',
          '80ml d\'huile de coco',
          '80ml de sirop d\'érable',
          '1 c. à café de cannelle',
          '1/2 c. à café de cardamome',
          '1/2 c. à café de gingembre',
          'Pincée de sel',
          '50g de pépites de chocolat noir'
        ],
        instructions: [
          'Préchauffer le four à 180°C',
          'Mélanger ingrédients secs et épices',
          'Faire fondre huile de coco et sirop',
          'Incorporer aux ingrédients secs',
          'Ajouter les pépites de chocolat',
          'Former des boules et aplatir',
          'Cuire 12-15 min jusqu\'à doré',
          'Servir avec un thé chaï maison'
        ],
        nutrition: {
          calories: '145 kcal/biscuit',
          proteines: '3g',
          glucides: '18g',
          lipides: '7g',
          fibres: '2g'
        }
      }
    ]
  };

  // Recettes de la semaine (une pour chaque jour)
  const weeklyRecipes = [
    {
      day: 'Lundi',
      name: 'Cookies au beurre de cacahuètes',
      calories: '56 kcal',
      time: '5 minutes',
      difficulty: 'facile',
      servings: '20 portions',
      description: 'Ces Cookies au beurre de cacahuètes sont le snack parfait entre les repas puisqu\'ils feront disparaître vos envies de grignotage efficacement ! Ils sont aussi riches en glucides et en fibres afin de prolonger la sensation de satiété tout en étant une source de protéines.',
      ingredients: [
        '2 Bananes (300 g)',
        'Chocolat noir (15 g)',
        'Poudre protéinée ou Farine de blé complet (60 g)',
        'Flocons d\'avoine (85 g)',
        'Beurre de cacahuètes (2 c. à soupe, 40 g)'
      ],
      instructions: [
        'Préchauffez votre four à 180°C',
        'Épluchez les bananes et écrasez-les à l\'aide d\'une fourchette. Hachez finement le chocolat',
        'À l\'aide d\'un mixeur, mélangez tous les ingrédients',
        'Créez de petites boules de pâte à l\'aide de vos mains, puis placez-les sur une plaque de cuisson recouverte de papier sulfurisé. Aplatissez-les',
        'Cuisez les cookies pendant environ 12 minutes jusqu\'à obtention d\'une coloration brune-dorée',
        'Bon appétit !'
      ]
    },
    {
      day: 'Mardi',
      name: 'Salade de pois chiches, épinards et feta',
      calories: '417 kcal',
      time: '10 minutes',
      difficulty: 'facile',
      servings: '1 portion',
      description: 'Notre mélange coloré de légumes se compose de pois chiches, épinards et de feta en salade, et vous apporte une grande portion de vitamines et de micronutriments. Cette recette est rapide à préparer, et peut parfaitement être emportée dans une boîte adaptée.',
      ingredients: [
        '1 Carotte (150 g)',
        'Pousses d\'épinards (50 g)',
        'Poivrons doux pointus (100 g)',
        'Feta allégée (100 g)',
        'Pois chiches, cuits (30 g)',
        'Jus d\'orange (10 ml)',
        'Crème aigre (50 g)',
        'Sel et poivre (à votre convenance)',
        'Persil, ciselé (5 g)'
      ],
      instructions: [
        'Épluchez et râpez les carottes finement, puis lavez les épinards',
        'Retirez les graines des poivrons doux pointus, et coupez-les en petits morceaux',
        'Coupez la feta en petits cubes, et mettez-la de côté',
        'Placez les pois chiches dans un bocal hermétique ou un bol. Ajoutez ensuite en couches les carottes râpées, les poivrons doux pointus, la feta et les épinards',
        'Pour la vinaigrette, mélangez le jus d\'orange, la crème aigre, le sel et le poivre, et ajoutez le persil',
        'Bon appétit !'
      ]
    },
    {
      day: 'Mercredi',
      name: 'Filet de saumon et légumes au four',
      calories: '457 kcal',
      time: '10 minutes',
      difficulty: 'facile',
      servings: '1 portion',
      description: 'Les plats cuits au four sont si pratiques ! Une fois que tout a été préparé, glissez simplement votre préparation au four, et il n\'y a plus qu\'à attendre. Résultat : un plat à la fois complet et délicieux !',
      ingredients: [
        '1 Courgette (230 g)',
        '2 Oignons verts (40 g)',
        '6 Tomates cerise (120 g)',
        'Jus de citron (2 c. à soupe, 30 ml)',
        'Huile d\'olive (1 c. à café, 7 ml)',
        'Sel et poivre (à votre convenance)',
        'Paprika en poudre (à votre convenance)',
        'Poudre de piment rouge (5 g)',
        'Thym (à votre convenance)',
        '1 Filet de saumon (150 g)',
        '1 Gousse d\'ail (3 g)',
        'Aneth frais (à votre convenance)'
      ],
      instructions: [
        'Lavez les courgettes et les oignons verts. Coupez-les en fines tranches et placez-les dans un bol',
        'Coupez les tomates cerise en deux et ajoutez-les également au bol',
        'Mélangez les légumes en y ajoutant une cuillère à soupe de jus de citron, une cuillère à café d\'huile d\'olive, du sel, du poivre, de la poudre de paprika, du piment en poudre et du thym. Répartissez ensuite les légumes sur une plaque de cuisson recouverte de papier sulfurisé',
        'Placez le saumon sur le lit de légumes',
        'Pressez la gousse d\'ail et répartissez-la sur le saumon et les légumes',
        'Distribuez le reste du jus de citron sur la préparation et assaisonnez le tout de sel et de poivre',
        'Placez la plaque de cuisson au four à 180°C pendant 28 minutes, et laissez cuire jusqu\'à ce que les légumes soient dorés',
        'Sortez le plat du four, et saupoudrez-le d\'aneth et de thym',
        'Bon appétit !'
      ]
    },
    {
      day: 'Jeudi',
      name: 'Gratin de pommes de terre et épinards',
      calories: '437 kcal',
      time: '20 minutes',
      difficulty: 'normal',
      servings: '2 portions',
      description: 'Ce gratin est vraiment fidèle à l\'expression "moins, c\'est plus". Il est préparé à partir d\'épinards et de pommes de terre. Sa couche de fromage croustillant donne l\'eau à la bouche !',
      ingredients: [
        'Pommes de terre (320 g)',
        'Beurre (5 g)',
        'Lait à 1,5% de matières grasses (120 ml)',
        'Farine complète (10 g)',
        'Noix de muscade en poudre (à votre convenance)',
        'Sel et poivre (à votre convenance)',
        'Mozzarella (120 g)',
        'Oignon rouge (60 g)',
        'Parmesan râpé (20 g)',
        'Bouillon de légumes (160 ml)',
        'Épinards (400 g)'
      ],
      instructions: [
        'Coupez les pommes de terre en fines tranches et répartissez-les dans le plat à gratin',
        'Coupez l\'oignon en petits morceaux',
        'Placez le beurre, la farine et le lait dans une poêle, et faites-les infuser dans le bouillon de légumes',
        'Ajoutez les oignons et les épinards, et laissez cuire jusqu\'à ce qu\'ils commencent à se flétrir',
        'Assaisonnez-les à l\'aide de noix de muscade, de sel, de poivre, et disposez-les sur les pommes de terre',
        'Coupez la mozzarella en petits morceaux et saupoudrez-la, ainsi que le parmesan, sur le gratin',
        'Placez le plat au four préchauffé à 180°C et faites le cuire pendant 30 minutes',
        'Bon appétit !'
      ]
    },
    {
      day: 'Vendredi',
      name: 'Barres de granola à la banane',
      calories: '94 kcal',
      time: '5 minutes',
      difficulty: 'facile',
      servings: '14 portions',
      description: 'Ces Barres de granola à la banane seront l\'addition parfaite à votre boîte repas et sont faciles à emmener avec vous. Elles vous permettront de retrouver de l\'énergie de façon saine en faisant disparaître vos envies de grignotage.',
      ingredients: [
        '2 Bananes (300 g)',
        'Flocons d\'avoine (200 g)',
        'Lait d\'amande, sans sucre (100 ml)',
        'Beurre de cacahuètes (2 c. à soupe, 40 g)',
        'Sirop d\'érable ou Miel (1 c. à café, 10 ml)'
      ],
      instructions: [
        'Préchauffez votre four à 160°C',
        'Épluchez les bananes et écrasez-les à l\'aide d\'une cuillère',
        'À l\'aide d\'un mixeur manuel, mélangez la banane écrasée avec les autres ingrédients et placez le tout dans un plat à gratin (21 x 15 cm) recouvert de papier sulfurisé',
        'Enfournez à mi-hauteur pendant environ 15 minutes',
        'Laissez le plat à gratin refroidir puis coupez votre granola en petites barres',
        'Bon appétit !'
      ]
    },
    {
      day: 'Samedi',
      name: 'Cookies à la carotte',
      calories: '93 kcal',
      time: '27 minutes',
      difficulty: 'facile',
      servings: '24 portions',
      description: 'Ces cookies à la carotte sont moelleux et aériens. Grâce aux carottes qu\'ils contiennent, ils sont riches en vitamine C et bêta carotène. Ces substances jouent un rôle essentiel dans les défenses de notre corps et le renforcement du système immunitaire.',
      ingredients: [
        'Carottes (130 g)',
        'Sirop d\'érable (50 ml)',
        'Huile de noix de coco (3 c. à soupe, 42 ml)',
        'Compote de pommes, sans sucre (30 g)',
        'Amandes en poudre (240 g)',
        'Flocons de noix de coco (30 g)',
        'Cannelle (à votre convenance)',
        'Levure chimique (½ c. à café, 3 g)'
      ],
      instructions: [
        'Préchauffez votre four à 170°C',
        'À l\'aide d\'une râpe, râpez finement les carottes',
        'Mélangez les carottes râpées avec le sirop d\'érable, l\'huile de coco et la compote de pommes',
        'Dans un bol séparé, mélangez les amandes, les flocons de coco, la cannelle et la levure',
        'Ensuite, mélangez les ingrédients secs avec les ingrédients mouillés à l\'aide d\'un mixeur',
        'Couvrez une plaque de cuisson de papier sulfurisé et, à l\'aide de vos mains, créez de petites boules de pâte à cookies',
        'Aplatissez doucement les boules sur la plaque de cuisson et enfournez à mi-hauteur pendant environ 12 minutes',
        'Bon appétit !'
      ]
    },
    {
      day: 'Dimanche',
      name: 'Compote de pommes aux amandes et à la crème de cannelle',
      calories: '427 kcal',
      time: '5 minutes',
      difficulty: 'facile',
      servings: '1 portion',
      description: 'Notre compote de pommes aux amandes et à la crème de cannelle est idéale pour un petit déjeuner ou un dessert à la fois délicieux et léger ! Mieux vaut utiliser de la compote de pommes sans sucre ajouté, afin de ne consommer que le sucre naturellement présent dans le fruit.',
      ingredients: [
        'Cannelle (à votre convenance)',
        'Compote de pommes (100 g)',
        'Amandes effilées (20 g)',
        'Fromage blanc, sans matières grasses (350 g)',
        'Édulcorant (Stévia, Érythritol ou similaire) (à votre convenance)'
      ],
      instructions: [
        'Pour la crème amandes-cannelle, mélangez le fromage blanc (sans matières grasses) avec un trait d\'eau minérale, la cannelle et l\'édulcorant',
        'Placez un peu de crème dans un verre. À l\'aide d\'une cuillère, ajoutez une couche de compote, puis une nouvelle couche de crème',
        'Faites griller les amandes effilées dans une poêle sans matières grasses, puis saupoudrez-les sur la crème',
        'Ajoutez un peu de cannelle, et servez',
        'Bon appétit !'
      ]
    }
  ];

  // Obtenir la recette du jour basée sur le jour de la semaine
  const getTodayRecipe = () => {
    const dayIndex = currentDate.getDay(); // 0 = Dimanche, 1 = Lundi, etc.
    // Réorganiser pour que Lundi soit à l'index 0
    const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
    return weeklyRecipes[adjustedIndex];
  };
  
  // Obtenir la recette sélectionnée ou celle du jour
  const getDisplayedRecipe = () => {
    if (selectedRecipeDay !== null) {
      return weeklyRecipes[selectedRecipeDay];
    }
    return getTodayRecipe();
  };
  
  // Naviguer vers le jour précédent
  const goToPreviousDay = () => {
    if (selectedRecipeDay === null) {
      const dayIndex = currentDate.getDay();
      const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
      setSelectedRecipeDay(adjustedIndex === 0 ? 6 : adjustedIndex - 1);
    } else {
      setSelectedRecipeDay(selectedRecipeDay === 0 ? 6 : selectedRecipeDay - 1);
    }
  };
  
  // Naviguer vers le jour suivant
  const goToNextDay = () => {
    if (selectedRecipeDay === null) {
      const dayIndex = currentDate.getDay();
      const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
      setSelectedRecipeDay(adjustedIndex === 6 ? 0 : adjustedIndex + 1);
    } else {
      setSelectedRecipeDay(selectedRecipeDay === 6 ? 0 : selectedRecipeDay + 1);
    }
  };
  
  // Retourner à aujourd'hui
  const goToToday = () => {
    setSelectedRecipeDay(null);
  };

  // Données du module Rituel Lunaire
  const lunarRitualData = {
    'Nouvelle Lune': {
      affirmation: "Je suis prêt(e) à accueillir de nouveaux départs et à manifester mes intentions les plus profondes.",
      activity: "Intentions et Planification",
      description: "C'est le moment idéal pour planter les graines de vos projets futurs. Prenez le temps de définir vos intentions pour ce nouveau cycle lunaire.",
      meditation: "Asseyez-vous confortablement, fermez les yeux. Visualisez une graine que vous plantez dans un sol fertile. Cette graine représente vos intentions. Arrosez-la avec votre souffle et votre énergie positive.",
      breathingExercise: "Respiration 4-4-4 : Inspirez pendant 4 secondes, retenez pendant 4 secondes, expirez pendant 4 secondes. Répétez 5 fois.",
      yogaPose: "Posture de l'enfant (Balasana) - 5 minutes",
      musicUrl: "https://www.youtube.com/watch?v=lFcSrYw-ARY",
      musicTitle: "Musique de Méditation - Nouvelle Lune",
      sleepTip: "Couchez-vous tôt ce soir pour recharger votre énergie créative.",
      fitnessActivity: "Marche méditative de 20 minutes en pleine conscience"
    },
    'Premier Croissant': {
      affirmation: "J'agis avec confiance et détermination. Chaque pas me rapproche de mes objectifs.",
      activity: "Action et Mise en Mouvement",
      description: "Le moment est venu de passer à l'action ! Commencez à travailler sur vos intentions. L'énergie croissante de la lune vous soutient.",
      meditation: "Visualisez-vous en train d'accomplir la première étape de votre projet. Ressentez la satisfaction et la fierté. Laissez cette énergie vous motiver.",
      breathingExercise: "Respiration énergisante : Inspirations rapides par le nez (20 fois), puis une grande expiration par la bouche. Répétez 3 fois.",
      yogaPose: "Salutation au Soleil (Surya Namaskar) - 5 cycles",
      musicUrl: "https://www.youtube.com/watch?v=4L_yCwFD6Jo",
      musicTitle: "Musique Énergisante - Motivation",
      sleepTip: "Évitez les écrans 1h avant le coucher pour un sommeil réparateur.",
      fitnessActivity: "Cardio léger : 15 minutes de jogging ou danse"
    },
    'Premier Quartier': {
      affirmation: "Je surmonte tous les obstacles avec courage et persévérance. Je suis plus fort(e) que mes défis.",
      activity: "Persévérance et Dépassement",
      description: "Des obstacles peuvent apparaître, mais vous avez la force de les surmonter. Restez concentré(e) sur vos objectifs et adaptez-vous.",
      meditation: "Imaginez-vous escaladant une montagne. Chaque pas est un effort, mais vous continuez. Arrivé(e) au sommet, vous contemplez le chemin parcouru avec fierté.",
      breathingExercise: "Respiration du guerrier : Inspirez profondément en levant les bras, expirez en les abaissant avec force. Répétez 10 fois.",
      yogaPose: "Posture du Guerrier II (Virabhadrasana II) - 3 minutes de chaque côté",
      musicUrl: "https://www.youtube.com/watch?v=UfcAVejslrU",
      musicTitle: "Musique de Force Intérieure",
      sleepTip: "Pratiquez une relaxation musculaire progressive avant de dormir.",
      fitnessActivity: "Entraînement en force : 20 minutes d'exercices au poids du corps"
    },
    'Gibbeuse Croissante': {
      affirmation: "Je raffine et perfectionne mes actions. Chaque ajustement me rapproche de l'excellence.",
      activity: "Ajustements et Perfectionnement",
      description: "Analysez vos progrès et apportez les ajustements nécessaires. C'est le moment d'affiner vos méthodes et d'optimiser vos efforts.",
      meditation: "Observez votre projet comme un sculpteur observe son œuvre. Identifiez les zones à polir, à améliorer. Visualisez le résultat final parfait.",
      breathingExercise: "Respiration alternée (Nadi Shodhana) : Bouchez une narine, inspirez, changez de narine, expirez. Alternez pendant 5 minutes.",
      yogaPose: "Posture de l'arbre (Vrksasana) - Équilibre et concentration - 2 minutes de chaque côté",
      musicUrl: "https://www.youtube.com/watch?v=1ZYbU82GVz4",
      musicTitle: "Musique de Concentration",
      sleepTip: "Tenez un journal de sommeil pour identifier les patterns.",
      fitnessActivity: "Yoga flow de 30 minutes - Focus sur l'équilibre"
    },
    'Pleine Lune': {
      affirmation: "Je célèbre mes accomplissements avec gratitude. Je libère ce qui ne me sert plus.",
      activity: "Célébration et Libération",
      description: "C'est le pic d'énergie ! Célébrez vos réussites, exprimez votre gratitude, et libérez ce qui ne vous sert plus. C'est un moment de pleine conscience.",
      meditation: "Baignez-vous dans la lumière argentée de la pleine lune. Ressentez sa puissance vous remplir. Remerciez pour tout ce que vous avez accompli. Laissez partir ce qui vous alourdit.",
      breathingExercise: "Respiration de la gratitude : Inspirez en pensant à quelque chose dont vous êtes reconnaissant(e), expirez en souriant. Répétez 10 fois.",
      yogaPose: "Posture de la lune (Chandrasana) - 3 minutes de chaque côté",
      musicUrl: "https://www.youtube.com/watch?v=M0R6vVoAyZw",
      musicTitle: "Musique de Pleine Lune - Célébration",
      sleepTip: "La pleine lune peut perturber le sommeil. Utilisez un masque de nuit et des sons apaisants.",
      fitnessActivity: "Danse libre de 20 minutes - Célébrez votre corps"
    },
    'Gibbeuse Décroissante': {
      affirmation: "Je partage mes connaissances avec générosité. Mon expérience inspire et aide les autres.",
      activity: "Partage et Enseignement",
      description: "Partagez ce que vous avez appris. Enseignez, guidez, inspirez. Votre expérience peut aider d'autres personnes sur leur chemin.",
      meditation: "Visualisez votre sagesse comme une lumière dorée. Imaginez cette lumière se diffusant autour de vous, touchant et illuminant les autres.",
      breathingExercise: "Respiration du cœur : Main sur le cœur, respirez profondément en envoyant de l'amour à vous-même et aux autres. 5 minutes.",
      yogaPose: "Posture du cobra (Bhujangasana) - Ouverture du cœur - 3 minutes",
      musicUrl: "https://www.youtube.com/watch?v=eKFTSSKCzWA",
      musicTitle: "Musique d'Ouverture du Cœur",
      sleepTip: "Pratiquez la gratitude avant de dormir : listez 3 choses positives de votre journée.",
      fitnessActivity: "Étirements doux de 25 minutes - Yoga restauratif"
    },
    'Dernier Quartier': {
      affirmation: "Je lâche prise avec amour et pardon. Je me libère du passé pour accueillir l'avenir.",
      activity: "Lâcher-prise et Pardon",
      description: "Libérez-vous des rancunes, des regrets et des attachements. Pardonnez-vous et pardonnez aux autres. Faites de la place pour le nouveau.",
      meditation: "Imaginez des ballons représentant vos soucis, vos peurs, vos rancunes. Un par un, lâchez-les et regardez-les s'envoler vers le ciel.",
      breathingExercise: "Respiration de libération : Inspirez profondément, retenez 3 secondes, expirez longuement en visualisant ce que vous relâchez. Répétez 8 fois.",
      yogaPose: "Torsion assise (Ardha Matsyendrasana) - Détoxification - 2 minutes de chaque côté",
      musicUrl: "https://www.youtube.com/watch?v=hlWiI4xVXKY",
      musicTitle: "Musique de Lâcher-prise",
      sleepTip: "Écrivez vos soucis sur papier avant de dormir, puis déchirez-le symboliquement.",
      fitnessActivity: "Marche lente de 30 minutes - Contemplation"
    },
    'Dernier Croissant': {
      affirmation: "Je me repose et me ressource. Je me prépare en silence pour un nouveau cycle.",
      activity: "Repos et Introspection",
      description: "C'est le moment de vous reposer, de réfléchir, de vous reconnecter à vous-même. Prenez du temps pour l'introspection et la préparation intérieure.",
      meditation: "Allongez-vous confortablement. Scannez votre corps de la tête aux pieds. Relâchez chaque tension. Plongez dans un silence profond et réparateur.",
      breathingExercise: "Respiration du sommeil (4-7-8) : Inspirez 4 secondes, retenez 7 secondes, expirez 8 secondes. Répétez 5 fois.",
      yogaPose: "Savasana (posture du cadavre) - Relaxation profonde - 10 minutes",
      musicUrl: "https://www.youtube.com/watch?v=aEklKEcMPYA",
      musicTitle: "Musique de Relaxation Profonde",
      sleepTip: "C'est le moment idéal pour dormir plus. Accordez-vous 8-9h de sommeil.",
      fitnessActivity: "Repos actif : Étirements légers de 15 minutes"
    }
  };

  // Obtenir le rituel du jour basé sur la phase lunaire
  const getTodayRitual = () => {
    return lunarRitualData[moonPhase.name] || lunarRitualData['Nouvelle Lune'];
  };

  // URL sécurisée pour la musique YouTube
  const getRitualMusicUrl = () => {
    const url = getTodayRitual().musicUrl;
    if (!url) return '';
    return url.startsWith('http') ? url : `https://${url}`;
  };

  const openMusicOnYouTube = () => {
    const url = getRitualMusicUrl();
    if (!url || typeof window === 'undefined') return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Enregistrer l'humeur du jour
  const saveDailyMood = (mood) => {
    const today = new Date().toISOString().split('T')[0];
    const newMoodEntry = {
      date: today,
      mood: mood,
      moonPhase: moonPhase.name
    };
    
    // Vérifier si une humeur existe déjà pour aujourd'hui
    const existingIndex = moodHistory.findIndex(entry => entry.date === today);
    
    if (existingIndex >= 0) {
      // Mettre à jour l'humeur existante
      const updatedHistory = [...moodHistory];
      updatedHistory[existingIndex] = newMoodEntry;
      setMoodHistory(updatedHistory);
    } else {
      // Ajouter une nouvelle entrée
      setMoodHistory([...moodHistory, newMoodEntry]);
    }
    
    setDailyMood(mood);
  };

  const addNote = () => {
    if (newNote.trim() && selectedMood) {
      const note = {
        id: Date.now(),
        text: newNote,
        mood: selectedMood,
        date: new Date().toLocaleDateString('fr-FR'),
        moonPhase: moonPhase.name
      };
      setNotes([note, ...notes]);
      setNewNote('');
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // Exporter les notes en JSON
  const exportNotes = () => {
    const dataStr = JSON.stringify(notes, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `neguslunar-notes-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Importer les notes depuis un fichier JSON
  const importNotes = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedNotes = JSON.parse(e.target.result);
        
        // Vérifier que c'est bien un tableau
        if (!Array.isArray(importedNotes)) {
          alert('❌ Format de fichier invalide. Le fichier doit contenir un tableau de notes.');
          return;
        }

        // Vérifier la structure des notes
        const isValid = importedNotes.every(note => 
          note.hasOwnProperty('id') && 
          note.hasOwnProperty('text') && 
          note.hasOwnProperty('mood')
        );

        if (!isValid) {
          alert('❌ Format de notes invalide. Vérifiez la structure du fichier.');
          return;
        }

        // Fusionner avec les notes existantes (éviter les doublons par ID)
        const existingIds = new Set(notes.map(n => n.id));
        const newNotes = importedNotes.filter(n => !existingIds.has(n.id));
        
        setNotes([...notes, ...newNotes]);
        alert(`✅ ${newNotes.length} note(s) importée(s) avec succès !`);
      } catch (error) {
        alert('❌ Erreur lors de la lecture du fichier. Assurez-vous qu\'il s\'agit d\'un fichier JSON valide.');
        console.error('Erreur d\'import:', error);
      }
    };
    reader.readAsText(file);
    
    // Réinitialiser l'input pour permettre de réimporter le même fichier
    event.target.value = '';
  };

  // Déclencher le sélecteur de fichier
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Fonctions pour le calendrier
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const changeMonth = (direction) => {
    const newDate = new Date(calendarMonth);
    newDate.setMonth(newDate.getMonth() + direction);
    setCalendarMonth(newDate);
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(calendarMonth);
    const days = [];
    const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    
    // Ajouter les jours vides au début
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-24" />);
    }
    
    // Ajouter tous les jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const phase = getMoonPhase(date);
      const isToday = date.toDateString() === new Date().toDateString();
      
      days.push(
        <div
          key={day}
          className={`h-16 sm:h-20 md:h-24 rounded-lg sm:rounded-xl p-1 sm:p-2 backdrop-blur-sm border transition-all active:scale-95 sm:hover:scale-105 ${
            isToday
              ? 'bg-purple-500/30 border-purple-400 shadow-lg shadow-purple-500/50'
              : 'bg-white/5 border-white/10 hover:border-purple-400/50'
          }`}
        >
          <div className="text-[10px] sm:text-xs font-semibold text-purple-200 mb-0.5 sm:mb-1">{day}</div>
          <div className="text-lg sm:text-xl md:text-2xl text-center">{phase.emoji}</div>
          <div className="text-[8px] sm:text-[10px] text-purple-300/70 text-center mt-0.5 sm:mt-1 leading-tight line-clamp-2">
            {phase.name}
          </div>
        </div>
      );
    }
    
    return (
      <div>
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
          {dayNames.map(name => (
            <div key={name} className="text-center text-xs sm:text-sm font-semibold text-purple-200 py-1 sm:py-2">
              {name}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {days}
        </div>
      </div>
    );
  };

  const musicLink = getRitualMusicUrl();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Étoiles d'arrière-plan */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Gradient overlay pour la profondeur */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-purple-900/20 to-slate-900/40" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Header */}
        <header className="mb-8 sm:mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent tracking-tight">
            NegusLunar
          </h1>
          <p className="text-purple-200/80 text-sm sm:text-base md:text-lg font-light tracking-wide px-4">
            Phases lunaires • Notes • Cuisine végétalienne
          </p>
        </header>

        {/* Navigation */}
        <nav className="mb-6 sm:mb-8 md:mb-10 px-2">
          <div className="flex overflow-x-auto gap-2 sm:gap-3 md:gap-4 pb-2 scrollbar-hide justify-start sm:justify-center"
               style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <button
            onClick={() => setActiveTab('lunar')}
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap flex-shrink-0 ${
              activeTab === 'lunar'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-purple-500/50 scale-105'
                : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm'
            }`}
          >
            <Moon size={16} className="sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">Phase Lunaire</span>
            <span className="xs:hidden">Phase</span>
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap flex-shrink-0 ${
              activeTab === 'calendar'
                ? 'bg-gradient-to-r from-indigo-500 to-blue-500 shadow-lg shadow-indigo-500/50 scale-105'
                : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm'
            }`}
          >
            <Calendar size={16} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Calendrier</span>
            <span className="sm:hidden">📅</span>
          </button>
          <button
            onClick={() => setActiveTab('moonCalendar')}
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap flex-shrink-0 ${
              activeTab === 'moonCalendar'
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg shadow-yellow-500/50 scale-105'
                : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm'
            }`}
          >
            <Moon size={16} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Phases 2026</span>
            <span className="sm:hidden">🌙</span>
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap flex-shrink-0 ${
              activeTab === 'notes'
                ? 'bg-gradient-to-r from-green-500 to-teal-500 shadow-lg shadow-green-500/50 scale-105'
                : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm'
            }`}
          >
            <BookOpen size={16} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Notes</span>
            <span className="sm:hidden">📝</span>
          </button>
          <button
            onClick={() => setActiveTab('recipes')}
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap flex-shrink-0 ${
              activeTab === 'recipes'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg shadow-pink-500/50 scale-105'
                : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm'
            }`}
          >
            <Leaf size={16} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Recettes</span>
            <span className="sm:hidden">🍃</span>
          </button>
          <button
            onClick={() => setActiveTab('dailyRecipe')}
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap flex-shrink-0 ${
              activeTab === 'dailyRecipe'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg shadow-orange-500/50 scale-105'
                : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm'
            }`}
          >
            <UtensilsCrossed size={16} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Recette</span>
            <span className="sm:hidden">🍽️</span>
          </button>
          <button
            onClick={() => setActiveTab('ritual')}
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap flex-shrink-0 ${
              activeTab === 'ritual'
                ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/50 scale-105'
                : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm'
            }`}
          >
            <Sparkles size={16} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Rituel</span>
            <span className="sm:hidden">✨</span>
          </button>
          <button
            onClick={() => setActiveTab('eclipses')}
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap flex-shrink-0 ${
              activeTab === 'eclipses'
                ? 'bg-gradient-to-r from-red-500 to-orange-500 shadow-lg shadow-red-500/50 scale-105'
                : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm'
            }`}
          >
            <Moon size={16} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Éclipses</span>
            <span className="sm:hidden">🌑</span>
          </button>
          <button
            onClick={() => window.open('/recettedelasemaine/index2.html', '_blank')}
            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap flex-shrink-0 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-lg shadow-amber-500/50 hover:scale-105"
          >
            <Calendar size={16} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Menu Fév</span>
            <span className="sm:hidden">📅</span>
          </button>
          <button
            onClick={() => window.open('/workout/programme_poids_corps.html', '_blank')}
            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap flex-shrink-0 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/50 hover:scale-105"
          >
            <Activity size={16} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Programme Sport</span>
            <span className="sm:hidden">💪</span>
          </button>

          <button
            onClick={() => setActiveTab('scanner')}
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap flex-shrink-0 ${
              activeTab === 'scanner'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/50 scale-105'
                : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm'
            }`}
          >
            <Camera size={16} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Scanner</span>
            <span className="sm:hidden">📷</span>
          </button>

          <button
            onClick={() => setActiveTab('fasting')}
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap flex-shrink-0 ${
              activeTab === 'fasting'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/50 scale-105'
                : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm'
            }`}
          >
            <Clock size={16} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Jeûne</span>
            <span className="sm:hidden">⏱️</span>
          </button>

          <button
            onClick={() => setActiveTab('mealplan')}
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap flex-shrink-0 ${
              activeTab === 'mealplan'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg shadow-amber-500/50 scale-105'
                : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm'
            }`}
          >
            <Target size={16} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Plans Repas</span>
            <span className="sm:hidden">🎯</span>
          </button>
          </div>
        </nav>

        {/* Contenu principal */}
        <main className="backdrop-blur-md bg-white/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/10">
          {/* Phase Lunaire */}
          {activeTab === 'lunar' && (
            <div className="text-center space-y-4 sm:space-y-6 md:space-y-8 animate-fadeIn">
              <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-4 sm:mb-6 animate-pulse">
                {moonPhase.emoji}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent px-4">
                {moonPhase.name}
              </h2>
              
              {/* Indicateur éclipse */}
              {todayIsEclipse && todayEclipse && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/30 to-orange-500/30 border-2 border-red-400/50 rounded-full animate-pulse">
                  <Sparkles size={20} className="text-red-300" />
                  <span className="text-red-200 font-bold">
                    🌑 Éclipse {todayEclipse.type} Aujourd'hui !
                  </span>
                </div>
              )}
              
              {/* Indicateur phase exacte */}
              {!todayIsEclipse && (todayIsFullMoon || todayIsNewMoon) && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400/50 rounded-full">
                  <Sparkles size={20} className="text-yellow-300" />
                  <span className="text-yellow-200 font-semibold">
                    {todayIsFullMoon ? 'Pleine Lune Exacte' : 'Nouvelle Lune Exacte'}
                  </span>
                  {moonPhase.exactTime && (
                    <span className="text-yellow-300/80 text-sm">
                      à {moonPhase.exactTime}
                    </span>
                  )}
                </div>
              )}
              
              {/* Illumination */}
              {moonPhase.illumination !== undefined && (
                <div className="max-w-xs mx-auto">
                  <div className="flex items-center justify-between mb-2 text-sm text-purple-300">
                    <span>Illumination</span>
                    <span className="font-bold">{moonPhase.illumination}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-500"
                      style={{ width: `${moonPhase.illumination}%` }}
                    />
                  </div>
                </div>
              )}
              
              <p className="text-base sm:text-lg md:text-xl text-purple-200/80 max-w-md mx-auto leading-relaxed px-4">
                {moonPhase.description}
              </p>
              <div className="text-purple-300/60 text-xs sm:text-sm px-4">
                {currentDate.toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>

              {/* Phases des 7 prochains jours */}
              <div className="max-w-5xl mx-auto px-4">
                <div className="flex items-center justify-between mb-3 text-sm text-purple-200/80">
                  <div className="flex items-center gap-2 font-semibold">
                    <Sparkles size={18} className="text-yellow-300" />
                    Phases à venir (7 jours glissants)
                  </div>
                  <span className="text-purple-300/60">À partir d'aujourd'hui</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {weeklyPhases.map((phase, idx) => (
                    <div
                      key={phase.date.toISOString() + idx}
                      className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-blue-400/40 transition-all hover:scale-[1.01]"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-2xl">{phase.emoji}</div>
                        <div className="text-xs text-purple-300/70">
                          {phase.date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long' })}
                        </div>
                      </div>
                      <div className="font-semibold text-blue-100 mb-1">{phase.name}</div>
                      <div className="text-xs text-purple-200/80 line-clamp-2 mb-2">
                        {phase.description}
                      </div>
                      {phase.illumination !== undefined && (
                        <div className="text-[11px] text-yellow-200/80 flex items-center gap-1">
                          <span>Illumination :</span>
                          <span className="font-semibold text-yellow-100">{phase.illumination}%</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Liens vers calendrier complet */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setActiveTab('moonCalendar')}
                  className="px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 hover:from-yellow-500/30 hover:to-orange-500/30 border border-yellow-400/50 rounded-full transition-all text-yellow-200 hover:scale-105"
                >
                  📅 Voir toutes les phases de 2026
                </button>
                <button
                  onClick={() => setActiveTab('eclipses')}
                  className="px-6 py-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 hover:from-red-500/30 hover:to-orange-500/30 border border-red-400/50 rounded-full transition-all text-red-200 hover:scale-105"
                >
                  🌑 Voir les éclipses lunaires
                </button>
              </div>
            </div>
          )}

          {/* Calendrier Lunaire Précis 2026 */}
          {activeTab === 'moonCalendar' && <MoonCalendar />}

          {/* Éclipses Lunaires 2026 */}
          {activeTab === 'eclipses' && <EclipseCalendar />}

          {/* Calendrier Lunaire */}
          {activeTab === 'calendar' && (
            <div className="animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-200 to-blue-200 bg-clip-text text-transparent">
                  Calendrier Lunaire
                </h2>
                <div className="flex items-center gap-2 sm:gap-4">
                  <button
                    onClick={() => changeMonth(-1)}
                    className="p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
                  >
                    <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
                  </button>
                  <div className="text-base sm:text-lg md:text-xl font-semibold text-indigo-200 min-w-[150px] sm:min-w-[200px] text-center">
                    {calendarMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                  </div>
                  <button
                    onClick={() => changeMonth(1)}
                    className="p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
                  >
                    <ChevronRight size={20} className="sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>
              
              {renderCalendar()}
              
              <div className="mt-6 p-4 bg-white/10 rounded-xl border border-white/20">
                <h3 className="text-lg font-semibold text-indigo-200 mb-3">Légende des phases lunaires</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🌑</span>
                    <span className="text-purple-200">Nouvelle Lune</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🌓</span>
                    <span className="text-purple-200">Premier Quartier</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🌕</span>
                    <span className="text-purple-200">Pleine Lune</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🌗</span>
                    <span className="text-purple-200">Dernier Quartier</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          {activeTab === 'notes' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-200 to-teal-200 bg-clip-text text-transparent">
                Journal & Intentions
              </h2>
                
                {/* Boutons Export/Import */}
                <div className="flex gap-3">
                  <button
                    onClick={exportNotes}
                    disabled={notes.length === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/50 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-blue-200 hover:scale-105"
                    title="Exporter les notes en JSON"
                  >
                    <Download size={18} />
                    <span className="hidden sm:inline">Exporter</span>
                  </button>
                  
                  <button
                    onClick={triggerFileInput}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/50 rounded-xl transition-all text-purple-200 hover:scale-105"
                    title="Importer des notes depuis un fichier JSON"
                  >
                    <Upload size={18} />
                    <span className="hidden sm:inline">Importer</span>
                  </button>
                  
                  {/* Input file caché */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={importNotes}
                    className="hidden"
                  />
                </div>
              </div>
              
              {/* Formulaire de nouvelle note */}
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                <div className="space-y-4">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Écris tes pensées, intentions ou idées..."
                    className="w-full bg-white/5 border border-white/20 rounded-xl p-4 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-green-500/50 min-h-32 resize-none"
                  />
                  
                  <div className="flex gap-3">
                    {['énergique', 'calme', 'créatif', 'contemplatif'].map((mood) => (
                      <button
                        key={mood}
                        onClick={() => setSelectedMood(mood)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          selectedMood === mood
                            ? 'bg-green-500 text-white scale-105'
                            : 'bg-white/10 hover:bg-white/20 text-purple-200'
                        }`}
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={addNote}
                    disabled={!newNote.trim() || !selectedMood}
                    className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
                  >
                    <Plus size={20} />
                    Ajouter la note
                  </button>
                </div>
              </div>

              {/* Liste des notes */}
              <div className="space-y-4">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm border border-white/20 hover:border-green-500/50 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex gap-3 items-center">
                        <span className="px-3 py-1 bg-green-500/20 text-green-200 rounded-full text-xs font-medium">
                          {note.mood}
                        </span>
                        <span className="text-xs text-purple-300/60">
                          {note.moonPhase} • {note.date}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <p className="text-purple-100 leading-relaxed">{note.text}</p>
                  </div>
                ))}
                
                {notes.length === 0 && (
                  <div className="text-center py-12 text-purple-300/60">
                    <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Aucune note pour le moment. Commence ton journal lunaire !</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Recettes */}
          {activeTab === 'recipes' && (
            <div className="space-y-8 animate-fadeIn">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-200 to-rose-200 bg-clip-text text-transparent">
                Recettes Végétaliennes Complètes
              </h2>
              
              <div className="space-y-8">
                {Object.entries(recipesByMood).map(([mood, recipes]) => (
                  <div key={mood} className="space-y-4">
                    <h3 className="text-2xl font-semibold capitalize text-pink-200 flex items-center gap-2">
                      <Leaf size={24} className="text-green-400" />
                      {mood}
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {recipes.map((recipe, idx) => (
                        <div
                          key={idx}
                          className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20 hover:border-pink-500/50 transition-all hover:scale-[1.02] flex flex-col"
                        >
                          {/* En-tête de la recette */}
                          <div className="mb-4">
                            <h4 className="font-bold text-lg text-pink-100 mb-2">
                            {recipe.name}
                          </h4>
                            <div className="flex gap-3 text-xs text-purple-300/80">
                              <span>⏱️ {recipe.time}</span>
                              <span>👥 {recipe.servings}</span>
                            </div>
                          </div>

                          {/* Ingrédients */}
                          <div className="mb-4">
                            <h5 className="font-semibold text-sm text-green-300 mb-2">Ingrédients :</h5>
                            <ul className="text-xs text-purple-200/80 space-y-1">
                              {recipe.ingredients.map((ingredient, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-green-400 mt-0.5">•</span>
                                  <span>{ingredient}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Instructions */}
                          <div className="mb-4">
                            <h5 className="font-semibold text-sm text-blue-300 mb-2">Préparation :</h5>
                            <ol className="text-xs text-purple-200/80 space-y-1">
                              {recipe.instructions.map((step, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-blue-400 font-semibold min-w-[16px]">{i + 1}.</span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>

                          {/* Apports nutritionnels */}
                          <div className="mt-auto pt-4 border-t border-white/10">
                            <h5 className="font-semibold text-sm text-yellow-300 mb-2">Apports nutritionnels :</h5>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="bg-white/5 rounded-lg p-2">
                                <span className="text-purple-300/60">Calories</span>
                                <p className="font-semibold text-yellow-200">{recipe.nutrition.calories}</p>
                              </div>
                              <div className="bg-white/5 rounded-lg p-2">
                                <span className="text-purple-300/60">Protéines</span>
                                <p className="font-semibold text-yellow-200">{recipe.nutrition.proteines}</p>
                              </div>
                              <div className="bg-white/5 rounded-lg p-2">
                                <span className="text-purple-300/60">Glucides</span>
                                <p className="font-semibold text-yellow-200">{recipe.nutrition.glucides}</p>
                              </div>
                              <div className="bg-white/5 rounded-lg p-2">
                                <span className="text-purple-300/60">Lipides</span>
                                <p className="font-semibold text-yellow-200">{recipe.nutrition.lipides}</p>
                              </div>
                              <div className="bg-white/5 rounded-lg p-2 col-span-2">
                                <span className="text-purple-300/60">Fibres</span>
                                <p className="font-semibold text-yellow-200">{recipe.nutrition.fibres}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recette du Jour */}
          {activeTab === 'dailyRecipe' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-orange-200 to-amber-200 bg-clip-text text-transparent">
                  🍽️ Recette du Jour
                </h2>
                
                {/* Navigation par jours */}
                <div className="flex items-center justify-center gap-4 mb-4">
                  <button
                    onClick={goToPreviousDay}
                    className="p-3 bg-orange-500/20 hover:bg-orange-500/30 rounded-full transition-all hover:scale-110 border border-orange-400/50"
                    title="Jour précédent"
                  >
                    <ChevronLeft size={24} className="text-orange-300" />
                  </button>
                  
                  <div className="flex flex-col items-center min-w-[250px]">
                    <p className="text-2xl font-bold text-orange-200">
                      {getDisplayedRecipe().day}
                    </p>
                    <p className="text-purple-200/80 text-sm">
                      {selectedRecipeDay === null ? "Aujourd'hui" : "Recette de la semaine"}
                    </p>
                  </div>
                  
                  <button
                    onClick={goToNextDay}
                    className="p-3 bg-orange-500/20 hover:bg-orange-500/30 rounded-full transition-all hover:scale-110 border border-orange-400/50"
                    title="Jour suivant"
                  >
                    <ChevronRight size={24} className="text-orange-300" />
                  </button>
                </div>
                
                {/* Bouton retour à aujourd'hui */}
                {selectedRecipeDay !== null && (
                  <button
                    onClick={goToToday}
                    className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 rounded-full transition-all text-amber-200 text-sm border border-amber-400/50"
                  >
                    ↺ Retour à aujourd'hui
                  </button>
                )}
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-white/15 to-white/5 rounded-3xl p-8 backdrop-blur-sm border-2 border-orange-400/30 shadow-2xl">
                  {/* En-tête de la recette */}
                  <div className="mb-6 pb-6 border-b border-white/20">
                    <h3 className="text-3xl font-bold text-orange-100 mb-4">
                      {getDisplayedRecipe().name}
                    </h3>
                    <p className="text-purple-200/90 leading-relaxed mb-4">
                      {getDisplayedRecipe().description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                        <Clock size={16} className="text-orange-300" />
                        <span className="text-orange-200">{getDisplayedRecipe().time}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                        <Users size={16} className="text-orange-300" />
                        <span className="text-orange-200">{getDisplayedRecipe().servings}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                        <span className="text-orange-300">📊</span>
                        <span className="text-orange-200">{getDisplayedRecipe().calories}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                        <span className="text-orange-300">⭐</span>
                        <span className="text-orange-200 capitalize">{getDisplayedRecipe().difficulty}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Ingrédients */}
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <h4 className="text-xl font-semibold text-green-300 mb-4 flex items-center gap-2">
                        <Leaf size={20} />
                        Ingrédients
                      </h4>
                      <ul className="space-y-2">
                        {getDisplayedRecipe().ingredients.map((ingredient, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-purple-200/90">
                            <span className="text-green-400 mt-1">✓</span>
                            <span>{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Instructions */}
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <h4 className="text-xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
                        <UtensilsCrossed size={20} />
                        Préparation
                      </h4>
                      <ol className="space-y-3">
                        {getDisplayedRecipe().instructions.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-purple-200/90">
                            <span className="bg-blue-500/30 text-blue-200 font-bold min-w-[28px] h-[28px] rounded-full flex items-center justify-center text-sm flex-shrink-0">
                              {idx + 1}
                            </span>
                            <span className="pt-0.5">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Toutes les recettes de la semaine */}
                  <div className="mt-8 pt-8 border-t border-white/20">
                    <h4 className="text-xl font-semibold text-amber-300 mb-4 text-center">
                      📅 Recettes de la semaine
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                      {weeklyRecipes.map((recipe, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedRecipeDay(idx)}
                          className={`bg-white/5 rounded-xl p-3 border transition-all hover:scale-105 cursor-pointer ${
                            recipe.day === getDisplayedRecipe().day
                              ? 'border-orange-400/50 bg-orange-500/10 ring-2 ring-orange-400/50'
                              : 'border-white/10 hover:border-orange-400/30'
                          }`}
                          title={recipe.name}
                        >
                          <div className="text-center">
                            <div className={`text-xs font-semibold mb-1 ${
                              recipe.day === getDisplayedRecipe().day
                                ? 'text-orange-300'
                                : 'text-purple-300/70'
                            }`}>
                              {recipe.day}
                            </div>
                            <div className="text-2xl mb-1">
                              {idx === 0 ? '🍪' : idx === 1 ? '🥗' : idx === 2 ? '🐟' : idx === 3 ? '🥘' : idx === 4 ? '🍫' : idx === 5 ? '🥕' : '🍎'}
                            </div>
                            <div className="text-[10px] text-purple-200/60 line-clamp-2">
                              {recipe.name}
                            </div>
                    </div>
                  </button>
                ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Rituel Lunaire */}
          {activeTab === 'ritual' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="text-center mb-8">
                <h2 className="text-5xl font-bold mb-3 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  ✨ Rituel Lunaire du Jour
                </h2>
                <p className="text-purple-200/80 text-xl">
                  {moonPhase.name} • {currentDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>

              <div className="max-w-6xl mx-auto space-y-6">
                {/* Affirmation du Jour */}
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl p-8 backdrop-blur-sm border-2 border-purple-400/30 shadow-2xl">
                  <div className="flex items-start gap-4">
                    <Heart size={32} className="text-pink-300 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-2xl font-bold text-purple-100 mb-3">💭 Affirmation Positive du Jour</h3>
                      <p className="text-xl text-purple-100/90 leading-relaxed italic">
                        "{getTodayRitual().affirmation}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Activité de la Phase Lunaire */}
                <div className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-3xl p-8 backdrop-blur-sm border-2 border-indigo-400/30 shadow-2xl">
                  <h3 className="text-2xl font-bold text-indigo-100 mb-4 flex items-center gap-3">
                    <Moon size={28} className="text-indigo-300" />
                    🌓 {getTodayRitual().activity}
                  </h3>
                  <p className="text-lg text-indigo-100/90 leading-relaxed mb-4">
                    {getTodayRitual().description}
                  </p>
                  <div className="bg-white/10 rounded-2xl p-6 mt-4">
                    <h4 className="font-semibold text-indigo-200 mb-3">🧘 Méditation guidée (5 min)</h4>
                    <p className="text-indigo-100/80 leading-relaxed">
                      {getTodayRitual().meditation}
                    </p>
                  </div>
                </div>

                {/* Musique d'Ambiance */}
                <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-3xl p-8 backdrop-blur-sm border-2 border-pink-400/30 shadow-2xl">
                  <h3 className="text-2xl font-bold text-pink-100 mb-4 flex items-center gap-3">
                    🎵 Musique d'Ambiance Suggérée
                  </h3>
                  <p className="text-pink-100/90 mb-4">{getTodayRitual().musicTitle}</p>
                  <button
                    type="button"
                    onClick={openMusicOnYouTube}
                    disabled={!musicLink}
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full transition-all hover:scale-105 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                    aria-label="Ouvrir la musique sur YouTube"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Écouter sur YouTube
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Exercice de Respiration */}
                  <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl p-6 backdrop-blur-sm border-2 border-cyan-400/30 shadow-xl">
                    <h3 className="text-xl font-bold text-cyan-100 mb-4 flex items-center gap-3">
                      <Wind size={24} className="text-cyan-300" />
                      🌬️ Exercice de Respiration
                    </h3>
                    <p className="text-cyan-100/90 leading-relaxed">
                      {getTodayRitual().breathingExercise}
                    </p>
                  </div>

                  {/* Posture de Yoga */}
                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl p-6 backdrop-blur-sm border-2 border-green-400/30 shadow-xl">
                    <h3 className="text-xl font-bold text-green-100 mb-4 flex items-center gap-3">
                      <Activity size={24} className="text-green-300" />
                      🧘 Yoga Lunaire
                    </h3>
                    <p className="text-green-100/90 leading-relaxed">
                      {getTodayRitual().yogaPose}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Conseil Sommeil */}
                  <div className="bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-3xl p-6 backdrop-blur-sm border-2 border-violet-400/30 shadow-xl">
                    <h3 className="text-xl font-bold text-violet-100 mb-4 flex items-center gap-3">
                      <Coffee size={24} className="text-violet-300" />
                      💤 Conseil Sommeil
                    </h3>
                    <p className="text-violet-100/90 leading-relaxed">
                      {getTodayRitual().sleepTip}
                    </p>
                  </div>

                  {/* Activité Physique */}
                  <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl p-6 backdrop-blur-sm border-2 border-orange-400/30 shadow-xl">
                    <h3 className="text-xl font-bold text-orange-100 mb-4 flex items-center gap-3">
                      <TrendingUp size={24} className="text-orange-300" />
                      🏃 Fitness Lunaire
                    </h3>
                    <p className="text-orange-100/90 leading-relaxed">
                      {getTodayRitual().fitnessActivity}
                    </p>
                  </div>
                </div>

                {/* Tracker d'Humeur */}
                <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-3xl p-8 backdrop-blur-sm border-2 border-yellow-400/30 shadow-2xl">
                  <h3 className="text-2xl font-bold text-yellow-100 mb-6 flex items-center gap-3">
                    📊 Mon Humeur Aujourd'hui
                  </h3>
                  <div className="flex justify-center gap-4 mb-6">
                    {[
                      { icon: <Smile size={48} />, value: 5, label: 'Excellent', color: 'text-green-400' },
                      { icon: <Smile size={48} />, value: 4, label: 'Bien', color: 'text-blue-400' },
                      { icon: <Meh size={48} />, value: 3, label: 'Neutre', color: 'text-yellow-400' },
                      { icon: <Frown size={48} />, value: 2, label: 'Pas bien', color: 'text-orange-400' },
                      { icon: <Angry size={48} />, value: 1, label: 'Mauvais', color: 'text-red-400' }
                    ].map((mood) => (
                      <button
                        key={mood.value}
                        onClick={() => saveDailyMood(mood.value)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all hover:scale-110 ${
                          dailyMood === mood.value
                            ? 'bg-white/20 border-2 border-white/50 scale-110'
                            : 'bg-white/5 border border-white/20 hover:bg-white/10'
                        }`}
                        title={mood.label}
                      >
                        <div className={mood.color}>{mood.icon}</div>
                        <span className="text-xs text-white/80">{mood.label}</span>
                      </button>
                    ))}
                  </div>
                  {dailyMood && (
                    <p className="text-center text-yellow-200/90 text-sm">
                      ✅ Humeur enregistrée pour aujourd'hui !
                    </p>
                  )}
                </div>

                {/* Journal de Gratitude */}
                <div className="bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-3xl p-8 backdrop-blur-sm border-2 border-rose-400/30 shadow-2xl">
                  <h3 className="text-2xl font-bold text-rose-100 mb-4 flex items-center gap-3">
                    <Heart size={28} className="text-rose-300" />
                    📝 Journal de Gratitude
                  </h3>
                  <p className="text-rose-100/80 mb-4">
                    Prenez un moment pour noter 3 choses pour lesquelles vous êtes reconnaissant(e) aujourd'hui :
                  </p>
                  <textarea
                    value={gratitudeText}
                    onChange={(e) => setGratitudeText(e.target.value)}
                    placeholder="1. Je suis reconnaissant(e) pour...&#10;2. J'apprécie...&#10;3. Je suis heureux(se) de..."
                    className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-rose-500/50 min-h-32 resize-none"
                  />
                  <p className="text-xs text-rose-200/60 mt-2">
                    💡 Astuce : Pratiquer la gratitude quotidiennement améliore votre bien-être et votre humeur !
                  </p>
                </div>

                {/* Statistiques d'Humeur */}
                {moodHistory.length > 0 && (
                  <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl p-8 backdrop-blur-sm border-2 border-indigo-400/30 shadow-2xl">
                    <h3 className="text-2xl font-bold text-indigo-100 mb-6 flex items-center gap-3">
                      <TrendingUp size={28} className="text-indigo-300" />
                      📈 Mon Évolution
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-white/10 rounded-xl p-4 text-center">
                        <div className="text-3xl font-bold text-indigo-200">{moodHistory.length}</div>
                        <div className="text-sm text-indigo-300/80">Jours suivis</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4 text-center">
                        <div className="text-3xl font-bold text-green-200">
                          {Math.round((moodHistory.filter(m => m.mood >= 4).length / moodHistory.length) * 100)}%
                        </div>
                        <div className="text-sm text-green-300/80">Jours positifs</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4 text-center">
                        <div className="text-3xl font-bold text-yellow-200">
                          {(moodHistory.reduce((sum, m) => sum + m.mood, 0) / moodHistory.length).toFixed(1)}
                        </div>
                        <div className="text-sm text-yellow-300/80">Humeur moyenne</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4 text-center">
                        <div className="text-3xl">🌙</div>
                        <div className="text-sm text-purple-300/80">Cycle lunaire</div>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-4">
                      <h4 className="font-semibold text-indigo-200 mb-3">Dernières entrées :</h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {moodHistory.slice(-7).reverse().map((entry, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                            <span className="text-sm text-indigo-200">{entry.date}</span>
                            <span className="text-sm text-indigo-300/80">{entry.moonPhase}</span>
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-3 h-3 rounded-full ${
                                    i < entry.mood ? 'bg-yellow-400' : 'bg-white/20'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Scanner de codes-barres */}
          {activeTab === 'scanner' && (
            <div className="animate-fadeIn">
              <BarcodeScanner />
            </div>
          )}

          {/* Jeûne intermittent */}
          {activeTab === 'fasting' && (
            <div className="animate-fadeIn">
              <IntermittentFasting />
            </div>
          )}

          {/* Plans de repas personnalisés */}
          {activeTab === 'mealplan' && (
            <div className="animate-fadeIn">
              <MealPlanner />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-purple-300/60 text-sm">
          <p>Créé avec 🌙 par Négus Dja • Guadeloupe</p>
        </footer>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Poppins:wght@300;400;600;700&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        h1 {
          font-family: 'Space Mono', monospace;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle at 50% 50%, var(--tw-gradient-stops));
        }
        
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        /* Smooth scrolling for navigation */
        .scrollbar-hide {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </div>
  );
};

export default NegusLunar;
