# 🍎 Nouvelles Fonctionnalités Nutrition - NegusLunar App

## 📋 Vue d'ensemble

Trois nouvelles fonctionnalités inspirées de Yazio ont été ajoutées à l'application NegusLunar pour vous aider à suivre votre nutrition et atteindre vos objectifs de santé :

1. **📷 Scanner de Codes-Barres** - Suivi nutritionnel rapide
2. **⏱️ Jeûne Intermittent** - Gestion des périodes de jeûne
3. **🎯 Plans de Repas Personnalisés** - Nutrition adaptée à vos objectifs

---

## 1. 📷 Scanner de Codes-Barres

### Fonctionnalités

- **Recherche par code-barres** : Entrez manuellement ou scannez avec la caméra
- **Base de données OpenFoodFacts** : Accès à des millions de produits alimentaires
- **Informations nutritionnelles complètes** :
  - Calories (kcal/100g)
  - Protéines, Glucides, Lipides
  - Fibres
  - Nutri-Score (A à E)
  - Image du produit
  - Marque et catégories

- **Suivi quotidien** :
  - Ajoutez des aliments à votre liste du jour
  - Calcul automatique des totaux nutritionnels
  - Historique des aliments consommés
  - Possibilité de réinitialiser la journée

### Utilisation

1. Cliquez sur l'onglet **"Scanner"** 📷
2. Entrez un code-barres manuellement OU cliquez sur "Scanner un code-barres"
3. Consultez les informations nutritionnelles du produit
4. Cliquez sur "Ajouter à ma liste" pour suivre votre consommation
5. Visualisez vos totaux quotidiens en temps réel

### Stockage

Les données sont sauvegardées localement dans le navigateur :
- `neguslunar-foods` : Liste des aliments du jour

---

## 2. ⏱️ Jeûne Intermittent

### Protocoles disponibles

- **16:8 (Débutant)** : 16h de jeûne, 8h d'alimentation
- **18:6 (Intermédiaire)** : 18h de jeûne, 6h d'alimentation
- **20:4 (Avancé)** : 20h de jeûne, 4h d'alimentation
- **24h (Warrior)** : 24h de jeûne complet

### Fonctionnalités

- **Timer en temps réel** avec cercle de progression animé
- **Phases** : Jeûne / Alimentation
- **Contrôles** :
  - Démarrer le jeûne
  - Pause / Reprendre
  - Terminer le jeûne
  - Réinitialiser

- **Statistiques** :
  - Nombre de jeûnes réussis
  - Total de jeûnes effectués
  - Durée moyenne des jeûnes
  - Plus long jeûne réalisé

- **Historique** : Suivi de tous vos jeûnes avec dates et durées
- **Conseils pratiques** pour réussir votre jeûne

### Utilisation

1. Cliquez sur l'onglet **"Jeûne"** ⏱️
2. Choisissez votre protocole (16:8, 18:6, 20:4 ou 24h)
3. Cliquez sur "Démarrer le jeûne"
4. Suivez votre progression en temps réel
5. Terminez ou mettez en pause selon vos besoins

### Stockage

Les données sont sauvegardées localement :
- `neguslunar-fasting-history` : Historique des jeûnes
- `neguslunar-fasting-active` : État actif/inactif
- `neguslunar-fasting-start` : Heure de début
- `neguslunar-fasting-phase` : Phase actuelle (jeûne/alimentation)
- `neguslunar-fasting-type` : Type de protocole sélectionné

---

## 3. 🎯 Plans de Repas Personnalisés

### Objectifs disponibles

- **🔵 Perte de Poids** : Déficit calorique de -500 kcal
- **🟢 Prise de Masse** : Surplus calorique de +500 kcal
- **🟡 Maintien** : Équilibre calorique (TDEE)

### Fonctionnalités

- **Profil personnalisé** :
  - Âge, Poids, Taille
  - Genre (Homme/Femme)
  - Niveau d'activité (Sédentaire à Très Active)

- **Calculs automatiques** :
  - **BMR** (Métabolisme de Base) - Formule de Mifflin-St Jeor
  - **TDEE** (Dépense Énergétique Totale Quotidienne)
  - **Calories cibles** selon l'objectif
  - **Macronutriments** (Protéines, Glucides, Lipides)

- **Plans de repas suggérés** :
  - 4 repas par jour adaptés à votre objectif
  - Petit-déjeuner, Déjeuner, Collation, Dîner
  - Détails des ingrédients et portions
  - Valeurs nutritionnelles par repas
  - Total journalier calculé automatiquement

### Répartition des macronutriments

#### Perte de Poids
- Protéines : 35%
- Glucides : 35%
- Lipides : 30%

#### Prise de Masse
- Protéines : 30%
- Glucides : 50%
- Lipides : 20%

#### Maintien
- Protéines : 30%
- Glucides : 40%
- Lipides : 30%

### Utilisation

1. Cliquez sur l'onglet **"Plans Repas"** 🎯
2. Sélectionnez votre objectif (Perte de poids, Prise de masse, Maintien)
3. Modifiez votre profil en cliquant sur l'icône ✏️
4. Consultez vos besoins caloriques et macros calculés automatiquement
5. Suivez les suggestions de repas adaptées à votre objectif
6. Lisez les conseils personnalisés pour réussir

### Stockage

Les données sont sauvegardées localement :
- `neguslunar-user-profile` : Profil utilisateur (âge, poids, taille, etc.)
- `neguslunar-goal` : Objectif sélectionné
- `neguslunar-meal-plans` : Plans de repas personnalisés

---

## 🎨 Design et Intégration

### Style cohérent
- Dégradés de couleurs harmonieux
- Animations fluides (fadeIn)
- Interface responsive (mobile-first)
- Icônes Lucide React
- Thème sombre élégant

### Navigation
Les trois nouvelles fonctionnalités sont accessibles via des onglets dans la navigation principale :
- **📷 Scanner** (vert/émeraude)
- **⏱️ Jeûne** (indigo/violet)
- **🎯 Plans Repas** (ambre/orange)

---

## 🔧 Composants créés

### Fichiers ajoutés

```
src/components/
├── BarcodeScanner.jsx      # Scanner de codes-barres
├── IntermittentFasting.jsx # Jeûne intermittent
└── MealPlanner.jsx         # Plans de repas personnalisés
```

### Modifications

```
src/components/NegusLunar.jsx
├── Imports des nouveaux composants
├── Ajout des onglets de navigation
└── Intégration des composants dans le contenu principal
```

---

## 📊 API Utilisée

### OpenFoodFacts API
- **URL** : `https://world.openfoodfacts.org/api/v2/product/{barcode}.json`
- **Gratuite et open-source**
- **Base de données collaborative** de produits alimentaires
- **Informations disponibles** :
  - Nom du produit et marque
  - Valeurs nutritionnelles pour 100g
  - Images des produits
  - Nutri-Score
  - Catégories et labels

---

## 💡 Conseils d'utilisation

### Scanner de Codes-Barres
- Utilisez un bon éclairage pour scanner les codes-barres
- Si un produit n'est pas trouvé, essayez de l'ajouter sur OpenFoodFacts.org
- Réinitialisez votre liste chaque jour pour un suivi précis

### Jeûne Intermittent
- Commencez progressivement avec le protocole 16:8
- Restez bien hydraté pendant le jeûne (eau, thé, café sans sucre)
- Écoutez votre corps et adaptez selon vos besoins
- Consultez un professionnel de santé avant de commencer

### Plans de Repas
- Mettez à jour votre profil régulièrement (poids, activité)
- Ajustez les portions selon votre faim et vos résultats
- Les suggestions sont des exemples, adaptez-les à vos goûts
- Privilégiez des aliments complets et variés

---

## 🚀 Prochaines améliorations possibles

- [ ] Intégration avec des trackers d'activité
- [ ] Graphiques de progression du poids
- [ ] Export des données en PDF/CSV
- [ ] Recettes personnalisées selon les macros
- [ ] Rappels et notifications pour le jeûne
- [ ] Scan de codes-barres avec reconnaissance d'image (ML)
- [ ] Communauté et partage de plans de repas
- [ ] Intégration avec les phases lunaires (nutrition lunaire)

---

## 🌙 Philosophie NegusLunar

Ces fonctionnalités s'intègrent parfaitement à la philosophie de NegusLunar :
- **Holistique** : Corps, esprit et nutrition en harmonie
- **Naturel** : Suivi simple et intuitif
- **Personnalisé** : Adapté à vos besoins uniques
- **Lunaire** : En phase avec les cycles naturels

---

## 📝 Notes techniques

### Compatibilité
- React 18+
- Lucide React pour les icônes
- LocalStorage pour la persistance des données
- API Fetch pour OpenFoodFacts
- Navigator MediaDevices API pour la caméra

### Performance
- Composants optimisés avec hooks React
- Sauvegarde automatique dans localStorage
- Pas de dépendances externes lourdes
- Animations CSS performantes

---

**Créé avec 🌙 par Négus Dja • Guadeloupe**
