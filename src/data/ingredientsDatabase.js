/**
 * Base de données des ingrédients courants
 * Pour le filtrage des recettes et la liste de courses
 */

export const ingredients = [
  // LÉGUMES
  { id: 'betterave', name: 'Betterave', category: 'légume', emoji: '🥬', tropical: false },
  { id: 'patate-douce', name: 'Patate douce', category: 'légume', emoji: '🍠', tropical: true },
  { id: 'radis-noir', name: 'Radis noir', category: 'légume', emoji: '⚫', tropical: false },
  { id: 'artichaut', name: 'Artichaut', category: 'légume', emoji: '🌿', tropical: false },
  { id: 'brocoli', name: 'Brocoli', category: 'légume', emoji: '🥦', tropical: false },
  { id: 'chou-fleur', name: 'Chou-fleur', category: 'légume', emoji: '🥬', tropical: false },
  { id: 'chou', name: 'Chou', category: 'légume', emoji: '🥬', tropical: false },
  { id: 'navet', name: 'Navet', category: 'légume', emoji: '🥔', tropical: false },
  { id: 'giraumon', name: 'Giraumon', category: 'légume', emoji: '🎃', tropical: true },
  { id: 'chayote', name: 'Chayote', category: 'légume', emoji: '🥒', tropical: true },
  { id: 'papaye-verte', name: 'Papaye verte', category: 'légume', emoji: '🥒', tropical: true },
  { id: 'fruit-a-pain', name: 'Fruit à pain', category: 'légume', emoji: '🌰', tropical: true },
  { id: 'aubergine-longue', name: 'Aubergine longue', category: 'légume', emoji: '🍆', tropical: true },
  { id: 'tomate', name: 'Tomate', category: 'légume', emoji: '🍅', tropical: false },
  { id: 'carotte', name: 'Carotte', category: 'légume', emoji: '🥕', tropical: false },
  { id: 'oignon', name: 'Oignon', category: 'légume', emoji: '🧅', tropical: false },
  { id: 'ail', name: 'Ail', category: 'légume', emoji: '🧄', tropical: false },
  { id: 'gingembre', name: 'Gingembre', category: 'épice', emoji: '🫚', tropical: true },
  { id: 'epinards', name: 'Épinards', category: 'légume', emoji: '🥬', tropical: false },
  { id: 'champignons', name: 'Champignons', category: 'légume', emoji: '🍄', tropical: false },
  { id: 'poivron', name: 'Poivron', category: 'légume', emoji: '🫑', tropical: false },

  // FRUITS
  { id: 'orange', name: 'Orange', category: 'fruit', emoji: '🍊', tropical: false },
  { id: 'citron', name: 'Citron', category: 'fruit', emoji: '🍋', tropical: false },
  { id: 'banane', name: 'Banane', category: 'fruit', emoji: '🍌', tropical: true },
  { id: 'mangue', name: 'Mangue', category: 'fruit', emoji: '🥭', tropical: true },
  { id: 'ananas', name: 'Ananas', category: 'fruit', emoji: '🍍', tropical: true },
  { id: 'goyave', name: 'Goyave', category: 'fruit', emoji: '🍐', tropical: true },
  { id: 'maracudja', name: 'Maracudja', category: 'fruit', emoji: '💛', tropical: true },
  { id: 'papaye', name: 'Papaye', category: 'fruit', emoji: '🍈', tropical: true },
  { id: 'avocat', name: 'Avocat', category: 'fruit', emoji: '🥑', tropical: true },
  { id: 'fruits-rouges', name: 'Fruits rouges', category: 'fruit', emoji: '🫐', tropical: false },
  { id: 'dattes', name: 'Dattes', category: 'fruit', emoji: '🌰', tropical: false },

  // LÉGUMINEUSES
  { id: 'pois-angole', name: 'Pois d\'Angole', category: 'légumineuse', emoji: '🫘', tropical: true },
  { id: 'pois-rouges', name: 'Pois rouges', category: 'légumineuse', emoji: '🫘', tropical: true },
  { id: 'pois-chiches', name: 'Pois chiches', category: 'légumineuse', emoji: '🫘', tropical: false },
  { id: 'lentilles-corail', name: 'Lentilles corail', category: 'légumineuse', emoji: '🫘', tropical: false },
  { id: 'lentilles', name: 'Lentilles', category: 'légumineuse', emoji: '🫘', tropical: false },
  { id: 'haricots-rouges', name: 'Haricots rouges', category: 'légumineuse', emoji: '🫘', tropical: false },
  { id: 'pois-casses', name: 'Pois cassés', category: 'légumineuse', emoji: '🫘', tropical: false },

  // CÉRÉALES
  { id: 'riz-rouge', name: 'Riz rouge', category: 'céréale', emoji: '🍚', tropical: false },
  { id: 'riz-basmati', name: 'Riz basmati', category: 'céréale', emoji: '🍚', tropical: false },
  { id: 'quinoa', name: 'Quinoa', category: 'céréale', emoji: '🌾', tropical: false },
  { id: 'avoine', name: 'Avoine', category: 'céréale', emoji: '🌾', tropical: false },
  { id: 'farine-manioc', name: 'Farine de manioc', category: 'céréale', emoji: '🌾', tropical: true },
  { id: 'boulgour', name: 'Boulgour', category: 'céréale', emoji: '🌾', tropical: false },

  // ÉPICES & AROMATES
  { id: 'curcuma', name: 'Curcuma', category: 'épice', emoji: '🟡', tropical: true },
  { id: 'curry', name: 'Curry', category: 'épice', emoji: '🟡', tropical: false },
  { id: 'cumin', name: 'Cumin', category: 'épice', emoji: '🟤', tropical: false },
  { id: 'coriandre', name: 'Coriandre', category: 'épice', emoji: '🌿', tropical: false },
  { id: 'basilic-peyi', name: 'Basilic péyi', category: 'épice', emoji: '🌿', tropical: true },
  { id: 'bois-inde', name: 'Bois d\'Inde', category: 'épice', emoji: '🌿', tropical: true },
  { id: 'cannelle', name: 'Cannelle', category: 'épice', emoji: '🟤', tropical: false },
  { id: 'paprika', name: 'Paprika', category: 'épice', emoji: '🔴', tropical: false },
  { id: 'fenouil', name: 'Fenouil (graines)', category: 'épice', emoji: '🌿', tropical: false },
  { id: 'moutarde', name: 'Moutarde (graines)', category: 'épice', emoji: '🟡', tropical: false },

  // PRODUITS LAITIERS VÉGÉTAUX
  { id: 'lait-coco', name: 'Lait de coco', category: 'laitage', emoji: '🥥', tropical: true },
  { id: 'creme-soja', name: 'Crème de soja', category: 'laitage', emoji: '🥛', tropical: false },
  { id: 'yaourt-vegetal', name: 'Yaourt végétal', category: 'laitage', emoji: '🥛', tropical: false },
  { id: 'lait-vegetal', name: 'Lait végétal', category: 'laitage', emoji: '🥛', tropical: false },

  // AUTRES
  { id: 'huile-olive', name: 'Huile d\'olive', category: 'huile', emoji: '🫒', tropical: false },
  { id: 'huile-coco', name: 'Huile de coco', category: 'huile', emoji: '🥥', tropical: true },
  { id: 'levure-nutritionnelle', name: 'Levure nutritionnelle', category: 'autre', emoji: '🟡', tropical: false },
  { id: 'graines-chia', name: 'Graines de chia', category: 'graine', emoji: '🌾', tropical: false },
  { id: 'miel-vegan', name: 'Miel vegan', category: 'autre', emoji: '🍯', tropical: false },
  { id: 'cacao', name: 'Cacao', category: 'autre', emoji: '🍫', tropical: true },
  { id: 'amandes', name: 'Amandes', category: 'oléagineux', emoji: '🌰', tropical: false },
  { id: 'cajou', name: 'Cajou', category: 'oléagineux', emoji: '🌰', tropical: true },
  { id: 'beurre-cacahuetes', name: 'Beurre de cacahuètes', category: 'autre', emoji: '🥜', tropical: false },
  { id: 'chocolat-noir', name: 'Chocolat noir', category: 'autre', emoji: '🍫', tropical: false },
];

// Catégories d'ingrédients
export const ingredientCategories = [
  { id: 'all', name: 'Tous', emoji: '🌍' },
  { id: 'légume', name: 'Légumes', emoji: '🥬' },
  { id: 'fruit', name: 'Fruits', emoji: '🍎' },
  { id: 'légumineuse', name: 'Légumineuses', emoji: '🫘' },
  { id: 'céréale', name: 'Céréales', emoji: '🌾' },
  { id: 'épice', name: 'Épices', emoji: '🌶️' },
  { id: 'laitage', name: 'Laitages végétaux', emoji: '🥛' },
  { id: 'huile', name: 'Huiles', emoji: '🫒' },
  { id: 'graine', name: 'Graines', emoji: '🌰' },
  { id: 'oléagineux', name: 'Oléagineux', emoji: '🥜' },
  { id: 'autre', name: 'Autres', emoji: '🍯' }
];

// Fonction pour obtenir les ingrédients par catégorie
export const getIngredientsByCategory = (category) => {
  if (category === 'all') return ingredients;
  return ingredients.filter(ing => ing.category === category);
};

// Fonction pour obtenir les ingrédients tropicaux
export const getTropicalIngredients = () => {
  return ingredients.filter(ing => ing.tropical);
};

// Fonction pour rechercher un ingrédient
export const searchIngredients = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return ingredients.filter(ing => 
    ing.name.toLowerCase().includes(term) ||
    ing.category.toLowerCase().includes(term)
  );
};

// Fonction pour extraire les ingrédients d'une recette
export const extractIngredientsFromRecipe = (recipe) => {
  const foundIngredients = [];
  
  recipe.ingredients.forEach(ingText => {
    const lowerText = ingText.toLowerCase();
    ingredients.forEach(ing => {
      if (lowerText.includes(ing.name.toLowerCase())) {
        foundIngredients.push({
          ...ing,
          quantity: ingText.match(/\d+(\.\d+)?/)?.[0] || '',
          unit: ingText.match(/(g|ml|c\.|tasse|pincée)/)?.[0] || ''
        });
      }
    });
  });
  
  return foundIngredients;
};

export default ingredients;
