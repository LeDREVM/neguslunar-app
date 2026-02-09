# 🎉 Mise à Jour : Système de Suivi Nutritionnel et Sportif

## 📅 Date : 7 Février 2026

---

## ✨ Nouveautés

### 1. 📊 Dashboard de Suivi Journalier

Un système complet pour tracker votre alimentation et vos exercices quotidiens !

#### Fonctionnalités :

✅ **Sélection de date** : Suivez n'importe quel jour  
✅ **Dashboard temps réel** : Statistiques mises à jour instantanément  
✅ **Calculs automatiques** : Apports nutritionnels totaux  
✅ **Balance calorique** : Consommées vs Brûlées  
✅ **Barres de progression** : Visualisez vos objectifs  

#### Métriques affichées :

- **Calories consommées** : Total des repas
- **Calories brûlées** : Total des exercices
- **Balance calorique** : Surplus ou déficit
- **Entrées totales** : Nombre de repas + exercices

### 2. 🍽️ Gestion Intelligente des Repas

#### 3 méthodes d'ajout :

1. **📚 Depuis la bibliothèque de recettes** (NOUVEAU !)
   - Plus de 20 recettes BODY DREVM intégrées
   - Valeurs nutritionnelles pré-calculées
   - Filtres avancés par mood, type, jour

2. **⚡ Repas rapides prédéfinis**
   - 8 options populaires
   - Toast à l'avocat, Bowls, Smoothies
   - Ajout en un clic

3. **✍️ Création manuelle**
   - Contrôle total
   - Repas personnalisés

#### Types de repas :
- 🌅 Petit-déjeuner
- ☀️ Déjeuner  
- 🌙 Dîner
- 🍎 Collation

### 3. 💪 Suivi des Exercices

#### Fonctionnalités :

✅ **Exercices rapides pré-remplis**
- Pompes : 3×5 (7.5 kcal)
- Crunch : 50 reps (15 kcal)
- Squats, Burpees, Planche, Course...

✅ **Exercices personnalisés**
- Séries × Répétitions
- Durée en minutes
- Calories brûlées estimées

#### Exemples prédéfinis :

| Exercice | Calories |
|----------|----------|
| Pompes | 0.5 kcal/rep |
| Crunch | 0.3 kcal/rep |
| Squats | 0.4 kcal/rep |
| Burpees | 1.0 kcal/rep |
| Planche | 5 kcal/min |
| Course | 10 kcal/min |

### 4. 📚 Bibliothèque de Recettes BODY DREVM

#### 20+ Recettes Intégrées

**Sources** :
- BODY DREVM Détox
- DrevmCook Ayurvéda
- Shakers Post-Sport
- Recettes Probiotiques
- Plan Hebdomadaire

**Catégories** :
- 🥤 Smoothies (5 recettes)
- 🥗 Salades (2 recettes)
- 🍲 Soupes (3 recettes)
- 🍛 Plats (5 recettes)
- 🍪 Snacks (2 recettes)
- 🍨 Desserts (2 recettes)
- 🧃 Jus (1 recette)

#### Exemples de recettes :

**Détox** :
- Smoothie Betterave-Agrumes (250 kcal)
- Salade Radis Noir-Artichaut (300 kcal)
- Velouté Betterave-Patate Douce (350 kcal)
- Jus Radis Noir-Navet (80 kcal)

**Ayurvéda Tropical** :
- Soupe Giraumon-Coco-Curcuma (280 kcal)
- Dahl de Pois d'Angole (380 kcal)
- Kitchari Riz Rouge (360 kcal)

**Post-Sport** :
- Shaker Bwadchenn (320 kcal)
- Shaker Kaz A Fwiti (380 kcal)
- Shaker Racin Péyi (420 kcal)

### 5. 🔍 Système de Filtrage Avancé

#### 5 types de filtres :

1. **Par Humeur**
   - ⚡ Énergique
   - 🧘 Calme
   - 🎨 Créatif
   - 🌙 Contemplatif

2. **Par Type**
   - Smoothie, Salade, Soupe, Plat, Snack, Dessert, Jus

3. **Par Jour de la Semaine**
   - Lundi à Dimanche
   - Recettes spécifiques ou disponibles tous les jours

4. **Filtres Spéciaux**
   - 🌿 Détox uniquement
   - 💪 Post-workout uniquement

5. **Recherche Textuelle**
   - Par nom, ingrédient, tag

#### Exemple de filtrage :

```
Filtres actifs :
- Humeur : Calme
- Type : Soupe
- Détox : ✅

Résultats : 2 recettes trouvées
→ Velouté Betterave-Patate Douce
→ Soupe Giraumon-Coco-Curcuma
```

---

## 📊 Apports Nutritionnels

### Objectifs Journaliers

| Nutriment | Objectif | Unité |
|-----------|----------|-------|
| Calories | 2000 | kcal |
| Protéines | 80 | g |
| Glucides | 250 | g |
| Lipides | 65 | g |
| Fibres | 30 | g |

### Barres de Progression

- **< 100%** : Barre bleue
- **≥ 100%** : Barre verte (objectif atteint)

### Calculs

```javascript
Pourcentage = (Valeur / Objectif) × 100

Exemple :
Protéines : 38g / 80g = 48% 🔵
Calories : 2100 / 2000 = 105% 🟢
```

---

## 📁 Nouveaux Fichiers Créés

### 1. `src/components/DailyTracker.jsx`
**Dashboard de suivi journalier**
- Gestion des repas et exercices
- Calculs nutritionnels en temps réel
- Interface responsive
- **372 lignes**

### 2. `src/components/RecipeBrowser.jsx`
**Bibliothèque de recettes avec filtres**
- Filtrage multi-critères
- Modal de détails de recette
- Intégration avec DailyTracker
- **324 lignes**

### 3. `src/data/recipesDatabase.js`
**Base de données des recettes**
- 20+ recettes BODY DREVM
- Fonctions de filtrage
- Métadonnées complètes
- **368 lignes**

### 4. `SUIVI-NUTRITIONNEL-GUIDE.md`
**Documentation complète**
- Guide d'utilisation
- Exemples concrets
- FAQ
- **500+ lignes**

### 5. `SUIVI-NUTRITIONNEL-UPDATE.md`
**Ce fichier** - Résumé des changements

---

## 🔧 Fichiers Modifiés

### 1. `src/components/NegusLunar.jsx`
- ✅ Import du composant DailyTracker
- ✅ Ajout de l'onglet "Mon Suivi"
- ✅ Intégration dans le menu mobile

### 2. `src/utils/database.js`
- ✅ Ajout des stores `dailyMeals` et `dailyExercises`
- ✅ Version de DB passée à 2
- ✅ Index pour recherches par date et type

### 3. `src/hooks/useDatabase.js`
- ✅ Hook `useDailyMeals()`
- ✅ Hook `useDailyExercises()`

---

## 🎯 Cas d'Usage

### Scénario 1 : Journée Détox Foie

**Matin** :
```
📚 Recettes → Filtres : Détox + Smoothie
→ Smoothie Betterave-Agrumes (250 kcal)
```

**Midi** :
```
📚 Recettes → Filtres : Détox + Salade
→ Salade Radis Noir-Artichaut (300 kcal)
```

**Soir** :
```
📚 Recettes → Filtres : Détox + Soupe
→ Velouté Betterave-Patate Douce (350 kcal)
```

**Résultat** : 900 kcal, Détox complet du foie

### Scénario 2 : Journée Sport Intensif

**Sport du matin** :
```
💪 Exercices Rapides :
- Pompes 3×5 (7.5 kcal)
- Crunch 50 (15 kcal)
- Course 30 min (300 kcal)
Total brûlé : 322.5 kcal
```

**Post-workout** :
```
📚 Recettes → Filtres : Post-workout + Smoothie
→ Shaker Bwadchenn (320 kcal)
```

**Déjeuner** :
```
📚 Recettes → Filtres : Énergique + Plat
→ Curry Crucifères-Patate Douce (420 kcal)
```

**Dîner** :
```
📚 Recettes → Filtres : Calme + Plat
→ Dal de Pois d'Angole (380 kcal)
```

**Résultat** :
- Consommées : 1120 kcal
- Brûlées : 322.5 kcal
- Balance : +797.5 kcal
- Protéines : 54g

### Scénario 3 : Exemple de la Requête Utilisateur

**Requête** : "3x5 pompes, 50 crunch, toast à l'avocat"

#### Ajout des exercices :

1. Cliquez sur **"💪 Exercices"**
2. Cliquez sur **"Pompes"** → Pré-rempli 3×5 ✅
3. Ajoutez
4. Cliquez sur **"+"**
5. Entrez manuellement : "Crunch", 1 série, 50 reps, 15 kcal
6. Ajoutez

**Total sport** : 7.5 + 15 = **22.5 kcal brûlées**

#### Ajout du repas :

1. Cliquez sur **"🍽️ Repas"**
2. Cliquez sur **"Recettes"**
3. Recherchez "toast" ou cliquez sur **"Toast à l'avocat"**
4. Ajoutez

**Total repas** : **350 kcal**

#### Résultat Dashboard :

```
Calories consommées : 350 kcal
Calories brûlées    : 22.5 kcal
Balance             : +327.5 kcal
Entrées             : 3 (1 repas • 2 exercices)

Apports :
- Protéines : 12g / 80g (15%)
- Glucides  : 35g / 250g (14%)
- Lipides   : 18g / 65g (28%)
- Fibres    : 8g / 30g (27%)
```

---

## 🗄️ Structure de Données

### Recette

```javascript
{
  id: 'smoothie-betterave-agrumes',
  name: 'Smoothie Énergétique Betterave-Agrumes',
  category: 'smoothie',
  mood: 'énergique',
  dayOfWeek: null,
  difficulty: 'facile',
  time: 5,
  servings: 1,
  isDetox: true,
  isPostWorkout: true,
  tags: ['vegan', 'sans-gluten', 'tropical', 'sport'],
  ingredients: [...],
  instructions: [...],
  nutrition: {
    calories: 250,
    proteins: 4,
    carbs: 50,
    fats: 5,
    fiber: 6
  },
  benefits: '...',
  source: 'BODY DREVM Détox'
}
```

### Repas Sauvegardé

```javascript
{
  id: 1707300000000,
  date: '2026-02-07',
  time: '08:00',
  type: 'breakfast',
  name: 'Toast à l\'avocat',
  calories: 350,
  proteins: 12,
  carbs: 35,
  fats: 18,
  fiber: 8,
  source: 'quick', // 'recipe', 'quick', ou 'manual'
  recipeId: 'toast-avocat' // si depuis recette
}
```

### Exercice Sauvegardé

```javascript
{
  id: 1707300000000,
  date: '2026-02-07',
  time: '10:00',
  name: 'Pompes',
  sets: 3,
  reps: 5,
  duration: 0,
  caloriesBurned: 7.5
}
```

---

## 🎨 Interface Utilisateur

### Nouveau Bouton dans le Menu

```
[... autres onglets ...]
[📊 Mon Suivi]  ← NOUVEAU
```

### Dashboard

```
┌─────────────────────────────────────────────┐
│ 📅 Dashboard Journalier    [Sélecteur]      │
├─────────────────────────────────────────────┤
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐   │
│  │ 1150 │  │  22  │  │+1127 │  │  6   │   │
│  │kcal  │  │brûlé │  │Balan │  │Entr  │   │
│  └──────┘  └──────┘  └──────┘  └──────┘   │
├─────────────────────────────────────────────┤
│ 📊 Apports Nutritionnels                    │
│  Calories  : [████████--] 58% (1150/2000)  │
│  Protéines : [████------] 48% (38g/80g)    │
│  Glucides  : [█████-----] 54% (135g/250g)  │
│  Lipides   : [███████---] 74% (48g/65g)    │
│  Fibres    : [████████--] 90% (27g/30g)    │
└─────────────────────────────────────────────┘
```

### Section Repas

```
┌─────────────────────────────────────────────┐
│ 🍽️ Repas du Jour        [📚 Recettes] [+]  │
├─────────────────────────────────────────────┤
│ 🌅 Petit-déjeuner • 08:00                   │
│ Smoothie Betterave-Agrumes                  │
│ 🔥 250 kcal  💪 4g  🍞 50g  🥑 5g       [🗑️]│
├─────────────────────────────────────────────┤
│ ☀️ Déjeuner • 13:00                         │
│ Toast à l'avocat                            │
│ 🔥 350 kcal  💪 12g  🍞 35g  🥑 18g     [🗑️]│
└─────────────────────────────────────────────┘
```

### Section Exercices

```
┌─────────────────────────────────────────────┐
│ 💪 Exercices du Jour                   [+]  │
├─────────────────────────────────────────────┤
│ 10:00                                       │
│ Pompes                                      │
│ 📊 3 x 5  🔥 7.5 kcal                  [🗑️]│
├─────────────────────────────────────────────┤
│ 10:15                                       │
│ Crunch                                      │
│ 📊 1 x 50  🔥 15 kcal                  [🗑️]│
└─────────────────────────────────────────────┘
```

---

## 🚀 Utilisation - Étape par Étape

### Ajouter un repas depuis la bibliothèque

1. **Accédez au Dashboard**
   - Cliquez sur **"📊 Mon Suivi"** dans le menu

2. **Ouvrez la bibliothèque**
   - Dans la section "🍽️ Repas du Jour"
   - Cliquez sur **"📚 Recettes"**

3. **Filtrez vos recettes**
   - Cliquez sur **"Filtres ▶"**
   - Sélectionnez votre **humeur** (ex: Calme)
   - Sélectionnez le **type** (ex: Plat)
   - Activez **"Détox"** si désiré

4. **Trouvez votre recette**
   - Parcourez les résultats
   - Cliquez sur une recette pour voir les détails

5. **Ajoutez à votre journée**
   - Cliquez sur **"+"** sur la carte
   - OU cliquez sur **"Ajouter à ma journée"** dans le modal

6. **Vérifiez le dashboard**
   - La recette apparaît dans vos repas
   - Les statistiques sont mises à jour automatiquement

### Ajouter un exercice

1. **Accédez aux exercices**
   - Section "💪 Exercices du Jour"
   - Cliquez sur **"+"**

2. **Choisissez un exercice rapide**
   - Cliquez sur "Pompes" → Pré-rempli 3×5
   - OU cliquez sur "Crunch" → Modifiez à 50 reps

3. **OU créez un exercice**
   - Entrez le nom
   - Séries, répétitions, durée
   - Calories estimées

4. **Ajoutez**
   - Cliquez sur **"Ajouter l'exercice"**
   - Apparaît dans la liste
   - Calories brûlées mises à jour

---

## 💡 Conseils d'Utilisation

### Pour la Perte de Poids

1. Utilisez le filtre **"Détox"**
2. Choisissez des recettes légères (< 400 kcal)
3. Visez : 1500-1800 kcal consommées
4. Ajoutez 30-60 min d'exercice
5. Balance calorique : -300 à -500 kcal

### Pour la Prise de Masse

1. Utilisez le filtre **"Post-workout"**
2. Choisissez des shakers caloriques
3. Visez : 2500-3000 kcal consommées
4. Protéines : ≥ 1.6g/kg de poids
5. Balance calorique : +300 à +500 kcal

### Pour la Détox

1. Activez **"Détox uniquement"**
2. Humeur : **"Calme"**
3. Focus : Radis noir, betterave, crucifères
4. Hydratation : 3L eau + thé vert
5. Durée : 7-14 jours

### Pour la Performance

1. Filtres : **"Post-workout"** + **"Énergique"**
2. Pré-sport : Smoothie betterave (nitrates)
3. Post-sport : Shakers protéinés
4. Glucides : 5-7g/kg avant effort
5. Récupération : <30 min post-effort

---

## 📈 Statistiques & Analyse

### Métriques Quotidiennes

Le dashboard affiche en temps réel :

- ✅ Total calories consommées
- ✅ Total calories brûlées
- ✅ Balance calorique nette
- ✅ Nombre d'entrées (repas + exercices)
- ✅ Pourcentage des objectifs atteints

### Barres de Progression

Chaque nutriment a sa barre :

```
Protéines : [████------] 48%
```

- Remplissage proportionnel à l'objectif
- Couleur bleue < 100%
- Couleur verte ≥ 100%

---

## 🔄 Migration & Compatibilité

### Anciennes Données

Si vous utilisiez localStorage :
- Les données sont automatiquement migrées
- Aucune perte
- Nettoyage automatique

### Nouvelle Structure

Avec IndexedDB version 2 :
- 2 nouveaux stores créés
- Migration transparente
- Performance améliorée

---

## 🎉 Avantages

### Gain de Temps

- ⚡ **Ajout ultra-rapide** depuis bibliothèque
- 🎯 **Filtres puissants** pour trouver en secondes
- 📊 **Calculs automatiques** sans erreur

### Précision

- ✅ **Valeurs vérifiées** pour 20+ recettes
- ✅ **Calculs exacts** des totaux
- ✅ **Nutrition détaillée** par recette

### Motivation

- 📈 **Visualisation** claire de vos progrès
- 🎯 **Objectifs** visuels avec barres
- 💪 **Suivi sport** intégré

---

## 🔮 Prochaines Étapes

### Court Terme
- [ ] Ajouter 50+ recettes supplémentaires
- [ ] Graphiques d'évolution sur 7/30 jours
- [ ] Export PDF du suivi

### Moyen Terme
- [ ] Photos des repas
- [ ] Reconnaissance d'image (estimer calories)
- [ ] Recommandations basées sur historique

### Long Terme
- [ ] Synchronisation montres connectées
- [ ] Coaching IA personnalisé
- [ ] Partage avec nutritionniste

---

## 📞 Support

### Accéder au Dashboard

1. Ouvrez NegusLunar
2. Cliquez sur **"📊 Mon Suivi"** dans le menu
3. Sélectionnez votre date
4. Commencez à tracker !

### Problèmes

**Q : Je ne vois pas mes données ?**  
R : Vérifiez la date sélectionnée en haut.

**Q : Les filtres ne fonctionnent pas ?**  
R : Cliquez sur "Réinitialiser les filtres".

**Q : Comment supprimer une entrée ?**  
R : Cliquez sur l'icône 🗑️ à droite.

---

## 🎊 Conclusion

Le système de suivi nutritionnel et sportif transforme NegusLunar en un **outil complet** de santé et bien-être :

- 📊 **Tracking précis** de votre alimentation
- 💪 **Suivi sport** avec calcul calories
- 📚 **20+ recettes** BODY DREVM intégrées
- 🔍 **Filtres avancés** pour trouver LA recette
- 📈 **Statistiques** en temps réel
- 💾 **Sauvegarde** automatique IndexedDB

**Suivez votre santé jour après jour ! 🌙**

---

*Créé avec 🌙 par Négus Dja • Guadeloupe • 2026*
