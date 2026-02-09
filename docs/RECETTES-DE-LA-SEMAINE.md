# 🍽️ Recettes de la Semaine - NegusLunar

## 📅 Système de Recette du Jour

Votre application NegusLunar dispose maintenant d'un système de **Recette du Jour** qui propose une recette différente pour chaque jour de la semaine !

---

## ✨ Nouvelle fonctionnalité ajoutée

### 🆕 Onglet "Recette du Jour"
- Nouvel onglet orange/ambre dans la navigation
- Icône : 🍽️ (UtensilsCrossed)
- Affiche automatiquement la recette correspondant au jour actuel
- Vue complète avec ingrédients et instructions détaillées

---

## 📋 Les 7 Recettes de la Semaine

### 🍪 Lundi - Cookies au beurre de cacahuètes
- **Calories** : 56 kcal par portion
- **Temps** : 5 minutes de préparation
- **Difficulté** : Facile
- **Portions** : 20 cookies
- **Points forts** : Riche en protéines et fibres, parfait pour le grignotage sain

### 🥗 Mardi - Salade de pois chiches, épinards et feta
- **Calories** : 417 kcal
- **Temps** : 10 minutes
- **Difficulté** : Facile
- **Portions** : 1 personne
- **Points forts** : Riche en vitamines et micronutriments, facile à emporter

### 🐟 Mercredi - Filet de saumon et légumes au four
- **Calories** : 457 kcal
- **Temps** : 10 minutes de préparation
- **Difficulté** : Facile
- **Portions** : 1 personne
- **Points forts** : Plat complet cuit au four, pratique et délicieux

### 🥘 Jeudi - Gratin de pommes de terre et épinards
- **Calories** : 437 kcal
- **Temps** : 20 minutes
- **Difficulté** : Normal
- **Portions** : 2 personnes
- **Points forts** : Réconfortant avec sa couche de fromage croustillant

### 🍫 Vendredi - Barres de granola à la banane
- **Calories** : 94 kcal par barre
- **Temps** : 5 minutes de préparation
- **Difficulté** : Facile
- **Portions** : 14 barres
- **Points forts** : Parfait pour la boîte repas, maintient le taux de sucre stable

### 🥕 Samedi - Cookies à la carotte
- **Calories** : 93 kcal par cookie
- **Temps** : 27 minutes
- **Difficulté** : Facile
- **Portions** : 24 cookies
- **Points forts** : Riche en vitamine C et bêta carotène, renforce le système immunitaire

### 🍎 Dimanche - Compote de pommes aux amandes et à la crème de cannelle
- **Calories** : 427 kcal
- **Temps** : 5 minutes
- **Difficulté** : Facile
- **Portions** : 1 personne
- **Points forts** : Idéal pour un petit déjeuner ou dessert léger

---

## 🎯 Comment utiliser

### Accéder à la recette du jour
1. Ouvrez l'application : http://localhost:3001/
2. Cliquez sur l'onglet **"Recette du Jour"** (bouton orange)
3. La recette correspondant au jour actuel s'affiche automatiquement

### Informations affichées
- ✅ **Nom de la recette** en grand titre
- ✅ **Description** détaillée
- ✅ **Temps de préparation**
- ✅ **Nombre de portions**
- ✅ **Calories** par portion
- ✅ **Niveau de difficulté**
- ✅ **Liste complète des ingrédients** avec quantités
- ✅ **Instructions étape par étape** numérotées
- ✅ **Aperçu des 7 recettes** de la semaine

### Navigation dans la semaine
En bas de la page, vous verrez un calendrier visuel avec :
- Les 7 jours de la semaine
- Une icône pour chaque recette
- Le jour actuel surligné en orange
- Nom abrégé de chaque recette

---

## 🎨 Design et Interface

### Couleurs
- **Onglet actif** : Dégradé orange → ambre
- **Bordures** : Orange/ambre avec effet glow
- **Fond** : Dégradé blanc semi-transparent
- **Jour actuel** : Surligné en orange dans le calendrier

### Icônes
- 🍽️ **Onglet principal** : UtensilsCrossed
- ⏱️ **Temps** : Clock
- 👥 **Portions** : Users
- 🌿 **Ingrédients** : Leaf
- 🍴 **Préparation** : UtensilsCrossed

### Layout
- **Desktop** : 2 colonnes (ingrédients | instructions)
- **Mobile** : 1 colonne (responsive)
- **Calendrier** : 7 colonnes sur desktop, 2-4 sur mobile

---

## 💡 Fonctionnement technique

### Système automatique
```javascript
// La recette change automatiquement selon le jour
const getTodayRecipe = () => {
  const dayIndex = currentDate.getDay(); // 0-6
  const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
  return weeklyRecipes[adjustedIndex];
};
```

### Mapping des jours
- **Lundi** (index 0) : Cookies au beurre de cacahuètes
- **Mardi** (index 1) : Salade de pois chiches
- **Mercredi** (index 2) : Filet de saumon
- **Jeudi** (index 3) : Gratin de pommes de terre
- **Vendredi** (index 4) : Barres de granola
- **Samedi** (index 5) : Cookies à la carotte
- **Dimanche** (index 6) : Compote de pommes

---

## 📊 Structure des données

### Format d'une recette
```javascript
{
  day: 'Lundi',
  name: 'Nom de la recette',
  calories: '56 kcal',
  time: '5 minutes',
  difficulty: 'facile',
  servings: '20 portions',
  description: 'Description complète...',
  ingredients: [
    'Ingrédient 1 (quantité)',
    'Ingrédient 2 (quantité)',
    // ...
  ],
  instructions: [
    'Étape 1',
    'Étape 2',
    // ...
  ]
}
```

---

## 🌟 Avantages

### Pour l'utilisateur
- ✅ **Inspiration quotidienne** : Une nouvelle recette chaque jour
- ✅ **Planification facile** : Voir toute la semaine d'un coup d'œil
- ✅ **Instructions claires** : Étapes numérotées et détaillées
- ✅ **Informations nutritionnelles** : Calories et portions
- ✅ **Niveau de difficulté** : Savoir si c'est adapté à vos compétences

### Pour la nutrition
- ✅ **Variété** : 7 recettes différentes
- ✅ **Équilibre** : Mix de plats, snacks et desserts
- ✅ **Santé** : Recettes saines avec informations caloriques
- ✅ **Accessibilité** : Recettes faciles à normales

---

## 🔄 Cycle hebdomadaire

### Semaine type
```
Lundi    → Snack énergétique (Cookies)
Mardi    → Repas léger (Salade)
Mercredi → Plat principal (Saumon)
Jeudi    → Plat réconfortant (Gratin)
Vendredi → Snack sain (Granola)
Samedi   → Pâtisserie (Cookies carotte)
Dimanche → Dessert/Petit-déj (Compote)
```

### Rotation automatique
- Chaque jour à minuit, la recette change automatiquement
- Pas besoin de configuration manuelle
- Cycle se répète chaque semaine

---

## 📱 Responsive Design

### Desktop (> 768px)
- Navigation : 5 onglets visibles
- Recette : 2 colonnes (ingrédients | instructions)
- Calendrier : 7 colonnes (tous les jours visibles)

### Tablet (768px - 1024px)
- Navigation : Onglets sur 2 lignes si nécessaire
- Recette : 2 colonnes
- Calendrier : 4 colonnes

### Mobile (< 768px)
- Navigation : Onglets empilés
- Recette : 1 colonne
- Calendrier : 2 colonnes

---

## 🎓 Source des recettes

Toutes les recettes proviennent de votre dossier `recettedelasemaine/` :
- ✅ Cookies .txt
- ✅ Salades de pois chiches .txt
- ✅ Filet de saumon.txt
- ✅ Gratin de pommes de terre .txt
- ✅ Barre granola .txt
- ✅ Cookies carottes .txt
- ✅ Compote de pomme et amandes .txt

**Crédit** : Recettes YAZIO

---

## 🚀 Améliorations futures possibles

### Court terme
- [ ] Bouton pour imprimer la recette
- [ ] Partage de recette par email
- [ ] Liste de courses générée automatiquement
- [ ] Favoris de recettes

### Moyen terme
- [ ] Ajout de photos pour chaque recette
- [ ] Timer de cuisson intégré
- [ ] Notes personnelles sur les recettes
- [ ] Variantes de recettes (sans gluten, etc.)

### Long terme
- [ ] Base de données de recettes extensible
- [ ] Suggestions basées sur les ingrédients disponibles
- [ ] Planificateur de repas hebdomadaire
- [ ] Calcul nutritionnel détaillé

---

## ✅ Checklist d'utilisation

### Première utilisation
- [ ] Ouvrir l'application
- [ ] Cliquer sur "Recette du Jour"
- [ ] Lire la recette du jour
- [ ] Explorer le calendrier de la semaine
- [ ] Essayer de préparer la recette !

### Utilisation quotidienne
- [ ] Consulter la recette du jour chaque matin
- [ ] Noter les ingrédients nécessaires
- [ ] Préparer la recette
- [ ] Revenir demain pour une nouvelle recette !

---

## 📞 Support

### Documentation
- Ce fichier : `RECETTES-DE-LA-SEMAINE.md`
- Documentation principale : `README.md`
- Guide complet : `DOCUMENTATION-INDEX.md`

### En cas de problème
1. Vérifier que l'application fonctionne : http://localhost:3001/
2. Rafraîchir la page (Ctrl+R)
3. Vider le cache si nécessaire (Ctrl+Shift+R)

---

## 🎉 Résumé

### Ce qui a été ajouté
✅ **7 recettes complètes** pour chaque jour de la semaine  
✅ **Nouvel onglet** "Recette du Jour" dans la navigation  
✅ **Affichage automatique** de la recette du jour actuel  
✅ **Interface détaillée** avec ingrédients et instructions  
✅ **Calendrier visuel** des 7 recettes de la semaine  
✅ **Design responsive** pour tous les appareils  
✅ **Informations nutritionnelles** complètes  

### Prêt à utiliser
🟢 **OPÉRATIONNEL** - Testez dès maintenant !

---

🌙 **Créé avec passion par Négus Dja - Guadeloupe**

**Version** : 1.2.0  
**Date** : 12 janvier 2026  
**Nouvelles fonctionnalités** : Recettes de la semaine

---

**Bon appétit et bonne cuisine ! 🍽️✨**
