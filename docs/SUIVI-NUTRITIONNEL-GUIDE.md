# 📊 Guide du Suivi Nutritionnel et Sportif

## 🎯 Vue d'Ensemble

Le module **Mon Suivi** (Daily Tracker) vous permet de suivre précisément votre alimentation et vos exercices quotidiens avec calcul automatique des apports nutritionnels.

---

## ✨ Fonctionnalités Principales

### 1. 📅 Suivi Journalier

- **Sélection de date** : Suivez n'importe quel jour
- **Dashboard en temps réel** : Statistiques mises à jour instantanément
- **Persistance** : Toutes les données sont sauvegardées dans IndexedDB

### 2. 🍽️ Gestion des Repas

#### Trois façons d'ajouter un repas :

1. **📚 Depuis la bibliothèque de recettes**
   - Plus de 20 recettes BODY DREVM
   - Valeurs nutritionnelles pré-calculées
   - Un seul clic pour ajouter

2. **⚡ Repas rapide prédéfini**
   - 8 options populaires
   - Toast à l'avocat, Bowls, Smoothies, etc.
   - Ajout instantané

3. **✍️ Création manuelle**
   - Entrez vos propres valeurs
   - Parfait pour les repas personnalisés
   - Contrôle total

#### Types de repas :
- 🌅 Petit-déjeuner
- ☀️ Déjeuner
- 🌙 Dîner
- 🍎 Collation

### 3. 💪 Suivi des Exercices

#### Ajout d'exercices :

1. **Exercices rapides** (pré-remplis) :
   - Pompes : 3 séries × 5 répétitions
   - Crunch : 50 répétitions
   - Squats, Burpees, Planche, etc.

2. **Exercices personnalisés** :
   - Nom de l'exercice
   - Nombre de séries
   - Nombre de répétitions
   - Durée (minutes)
   - Calories brûlées

#### Exemples prédéfinis :
```
Pompes      → 0.5 kcal/rep
Crunch      → 0.3 kcal/rep
Squats      → 0.4 kcal/rep
Burpees     → 1.0 kcal/rep
Planche     → 5 kcal/min
Course      → 10 kcal/min
```

### 4. 📊 Dashboard Statistiques

#### Métriques affichées :

| Métrique | Description |
|----------|-------------|
| **Calories consommées** | Total des repas du jour |
| **Calories brûlées** | Total des exercices |
| **Balance calorique** | Consommées - Brûlées |
| **Entrées totales** | Nombre de repas + exercices |

#### Apports nutritionnels détaillés :

- **Calories** : Objectif 2000 kcal/jour
- **Protéines** : Objectif 80g/jour
- **Glucides** : Objectif 250g/jour
- **Lipides** : Objectif 65g/jour
- **Fibres** : Objectif 30g/jour

**Barres de progression** :
- 🔵 Bleu : < 100% de l'objectif
- 🟢 Vert : ≥ 100% de l'objectif

---

## 📚 Bibliothèque de Recettes

### 🔍 Système de Filtrage Avancé

#### Filtres disponibles :

1. **Par Humeur** (Mood)
   - ⚡ Énergique
   - 🧘 Calme
   - 🎨 Créatif
   - 🌙 Contemplatif

2. **Par Type**
   - 🥤 Smoothies
   - 🥗 Salades
   - 🍲 Soupes
   - 🍛 Plats
   - 🍪 Snacks
   - 🍨 Desserts
   - 🧃 Jus

3. **Par Jour de la Semaine**
   - Lundi à Dimanche
   - Recettes spécifiques ou disponibles tous les jours

4. **Filtres Spéciaux**
   - 🌿 **Détox** : Recettes purifiantes pour le foie
   - 💪 **Post-workout** : Optimisées pour la récupération

5. **Recherche Textuelle**
   - Par nom de recette
   - Par ingrédient
   - Par tag

### 🗂️ Base de Données Recettes

#### Sources intégrées :

1. **BODY DREVM Détox**
   - Smoothie Betterave-Agrumes
   - Salade Radis Noir-Artichaut
   - Velouté Betterave-Patate Douce
   - Rôtis Crucifères Miel-Vegan
   - Jus Radis Noir-Navet
   - Curry Crucifères-Patate Douce

2. **DrevmCook Ayurvéda**
   - Soupe Giraumon-Coco-Curcuma
   - Dahl de Pois d'Angole
   - Kitchari Riz Rouge-Pois Rouges

3. **Shakers Post-Sport**
   - Bwadchenn (Force + Récupération)
   - Kaz A Fwiti (Masse Propre)
   - Racin Péyi (Prise de Masse Lente)

4. **Recettes Probiotiques**
   - Kréyol Gut Boost
   - Desserts digestifs

5. **Plan Hebdomadaire**
   - Cookies au Beurre de Cacahuètes
   - Et bien d'autres...

---

## 🎨 Utilisation

### Ajouter un Repas

#### Méthode 1 : Depuis la Bibliothèque (Recommandé)

1. Cliquez sur **"Recettes"** dans la section Repas
2. Utilisez les filtres pour trouver votre recette :
   - Sélectionnez votre humeur du jour
   - Choisissez le type de plat
   - Filtrez par jour si besoin
3. Cliquez sur la recette pour voir les détails
4. Cliquez sur **"Ajouter à ma journée"**
5. La recette est automatiquement ajoutée avec toutes ses valeurs !

#### Méthode 2 : Repas Rapide

1. Cliquez sur **"+"** dans la section Repas
2. Choisissez parmi les 8 options rapides :
   - Toast à l'avocat (350 kcal)
   - Bowl de Quinoa (520 kcal)
   - Smoothie Vert (340 kcal)
   - Etc.
3. Clic = ajout instantané !

#### Méthode 3 : Création Manuelle

1. Cliquez sur **"+"** dans la section Repas
2. Scrollez vers **"Ou créer un repas personnalisé"**
3. Sélectionnez le type de repas
4. Entrez le nom et les valeurs nutritionnelles
5. Cliquez sur **"Ajouter le repas"**

### Ajouter un Exercice

#### Exercices Rapides (Pré-remplis)

1. Cliquez sur **"+"** dans la section Exercices
2. Cliquez sur un exercice rapide :
   - **Pompes** → Pré-rempli : 3×5 (7.5 kcal)
   - **Crunch** → Pré-rempli : 50 reps (15 kcal)
   - Autres : Squats, Burpees, Planche, Course
3. Le formulaire se remplit automatiquement
4. Ajustez si besoin
5. Cliquez sur **"Ajouter l'exercice"**

#### Exercice Personnalisé

1. Cliquez sur **"+"** dans la section Exercices
2. Remplissez :
   - Nom de l'exercice
   - Nombre de séries
   - Nombre de répétitions
   - Durée (minutes)
   - Calories brûlées estimées
3. Cliquez sur **"Ajouter l'exercice"**

---

## 📖 Exemple d'Utilisation

### Journée Type

#### Matin - 8h00
```
📚 Bibliothèque → Smoothie Betterave-Agrumes
✅ Ajouté : 250 kcal, 4g protéines
```

#### Sport - 10h00
```
💪 Exercice Rapide → Pompes (3×5)
💪 Exercice Rapide → Crunch (50)
✅ Ajouté : 22.5 kcal brûlées
```

#### Déjeuner - 13h00
```
📚 Bibliothèque → Filtre "Calme" + "Plat"
→ Sélection : Dal de Pois d'Angole
✅ Ajouté : 380 kcal, 20g protéines
```

#### Collation - 16h00
```
⚡ Repas Rapide → Amandes (30g)
✅ Ajouté : 170 kcal, 6g protéines
```

#### Dîner - 19h30
```
📚 Bibliothèque → Filtre "Contemplatif" + "Soupe"
→ Sélection : Velouté Betterave-Patate Douce
✅ Ajouté : 350 kcal, 8g protéines
```

### Résultats du Dashboard

```
📊 Dashboard Final :

Calories consommées : 1150 kcal / 2000 kcal (58%)
Calories brûlées     : 22.5 kcal
Balance calorique    : +1127.5 kcal
Entrées totales      : 6 (4 repas • 2 exercices)

Apports nutritionnels :
├─ Protéines : 38g / 80g (48%) 🔵
├─ Glucides  : 135g / 250g (54%) 🔵
├─ Lipides   : 48g / 65g (74%) 🔵
└─ Fibres    : 27g / 30g (90%) 🔵
```

---

## 🎯 Cas d'Usage

### Prise de Masse

**Objectif** : +500 kcal/jour

1. Filtrer : **"Post-workout"**
2. Ajouter : Shakers caloriques
3. Viser : 2500 kcal consommées
4. Surveiller : Protéines ≥ 100g

### Sèche / Perte de Poids

**Objectif** : -500 kcal/jour

1. Filtrer : **"Détox"**
2. Ajouter : Salades, soupes légères
3. Viser : 1500 kcal consommées
4. Exercices : +300 kcal brûlées

### Détox / Régénération

**Objectif** : Purifier le foie

1. Activer : **"Détox uniquement"**
2. Humeur : **"Calme"**
3. Recettes : Radis noir, betterave, crucifères
4. Hydratation : 3L eau/jour

### Performance Sportive

**Objectif** : Endurance + Récupération

1. Filtrer : **"Post-workout"** + **"Énergique"**
2. Pré-entraînement : Smoothie betterave (nitrates)
3. Post-entraînement : Shaker Bwadchenn
4. Protéines : 1.6g/kg de poids corporel

---

## 🧮 Calculs Automatiques

### Apports Nutritionnels

Le système calcule automatiquement :

```javascript
Total Calories  = Σ calories de tous les repas
Total Protéines = Σ protéines de tous les repas
Total Glucides  = Σ glucides de tous les repas
Total Lipides   = Σ lipides de tous les repas
Total Fibres    = Σ fibres de tous les repas
```

### Balance Calorique

```javascript
Balance = Calories Consommées - Calories Brûlées

Si Balance > 0  → Surplus (prise de masse)
Si Balance = 0  → Maintenance
Si Balance < 0  → Déficit (perte de poids)
```

### Pourcentage des Objectifs

```javascript
Pourcentage = (Valeur Actuelle / Objectif) × 100

Exemple :
Protéines : 38g / 80g = 48%
```

---

## 🎨 Interface

### Dashboard

```
┌──────────────────────────────────────┐
│  📅 Dashboard Journalier             │
│  [Sélecteur de date]                 │
│                                      │
│  ┌────────┐ ┌────────┐ ┌────────┐  │
│  │  1150  │ │   22   │ │ +1127  │  │
│  │Calories│ │Brûlées │ │Balance │  │
│  └────────┘ └────────┘ └────────┘  │
│                                      │
│  📊 Apports Nutritionnels            │
│  [Barres de progression]             │
└──────────────────────────────────────┘
```

### Section Repas

```
┌──────────────────────────────────────┐
│  🍽️ Repas du Jour      [📚][+]      │
│                                      │
│  🌅 Petit-déjeuner • 08:00          │
│  Smoothie Betterave-Agrumes          │
│  🔥 250 kcal  💪 4g  🍞 50g  🥑 5g  │
│                                 [🗑️] │
└──────────────────────────────────────┘
```

### Section Exercices

```
┌──────────────────────────────────────┐
│  💪 Exercices du Jour           [+]  │
│                                      │
│  10:00                               │
│  Pompes                              │
│  📊 3 x 5  🔥 7.5 kcal          [🗑️] │
└──────────────────────────────────────┘
```

---

## 📚 Bibliothèque de Recettes

### Filtres Disponibles

#### 1. Par Humeur

```
⚡ Énergique      → Recettes dynamisantes
🧘 Calme          → Recettes apaisantes
🎨 Créatif        → Recettes originales
🌙 Contemplatif   → Recettes méditatives
```

#### 2. Par Type

```
🥤 Smoothies    → Boissons mixées
🥗 Salades      → Plats froids
🍲 Soupes       → Plats chauds liquides
🍛 Plats        → Plats principaux
🍪 Snacks       → Collations
🍨 Desserts     → Douceurs
🧃 Jus          → Jus pressés
```

#### 3. Par Jour

```
Lun-Dim  → Recettes spécifiques au jour
Tous     → Disponibles n'importe quand
```

#### 4. Spéciaux

```
🌿 Détox        → Purifiantes pour le foie
💪 Post-workout → Optimisées récupération
```

### Recherche

La recherche fonctionne sur :
- ✅ Nom de la recette
- ✅ Ingrédients
- ✅ Tags (vegan, sans-gluten, tropical, etc.)

**Exemples** :
- `"betterave"` → Trouve toutes les recettes avec betterave
- `"smoothie"` → Trouve tous les smoothies
- `"tropical"` → Trouve les recettes tropicales
- `"détox"` → Trouve les recettes détox

---

## 💡 Exemples Concrets

### Exemple 1 : Journée Détox

**Objectif** : Nettoyer le foie

**Filtres** :
- Détox : ✅ Activé
- Humeur : Calme

**Repas sélectionnés** :
1. Petit-déj : Jus Radis Noir-Navet (80 kcal)
2. Déjeuner : Salade Radis Noir-Artichaut (300 kcal)
3. Dîner : Velouté Betterave-Patate Douce (350 kcal)
4. Collation : Amandes (170 kcal)

**Total** : 900 kcal, Détox complet

### Exemple 2 : Journée Sport Intensif

**Objectif** : Performance + Récupération

**Matin** :
- Repas : Smoothie Betterave-Agrumes (250 kcal)
- Exercice : Course 30 min (300 kcal brûlées)

**Midi** :
- Repas : Curry Crucifères-Patate Douce (420 kcal)

**Après-midi** :
- Exercice : 3×5 Pompes + 50 Crunch (22.5 kcal)
- Collation : Shaker Bwadchenn (320 kcal)

**Soir** :
- Repas : Dal de Pois d'Angole (380 kcal)

**Totaux** :
- Consommées : 1370 kcal
- Brûlées : 322.5 kcal
- Balance : +1047.5 kcal
- Protéines : 58g

### Exemple 3 : Journée Standard Équilibrée

**Filtres** : Aucun (explorer librement)

**Petit-déj** : Toast à l'avocat (350 kcal)
**Déjeuner** : Bowl Quinoa Arc-en-ciel (520 kcal)
**Dîner** : Dal Lentilles Corail (380 kcal)
**Collation** : Yaourt Grec + Fruits (200 kcal)
**Sport** : Marche 30 min (120 kcal)

**Total** : 1450 kcal consommées, 120 brûlées
**Balance** : +1330 kcal

---

## 🗄️ Stockage des Données

### IndexedDB

Toutes les données sont stockées dans IndexedDB :

**Stores utilisés** :
- `dailyMeals` : Repas quotidiens
- `dailyExercises` : Exercices quotidiens

**Structure d'un repas** :
```javascript
{
  id: 1707300000000,
  date: '2026-02-07',
  time: '08:00',
  type: 'breakfast',
  name: 'Smoothie Betterave-Agrumes',
  calories: 250,
  proteins: 4,
  carbs: 50,
  fats: 5,
  fiber: 6,
  source: 'recipe',
  recipeId: 'smoothie-betterave-agrumes'
}
```

**Structure d'un exercice** :
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

## 🎯 Objectifs Personnalisables

Par défaut :
- Calories : 2000 kcal/jour
- Protéines : 80g/jour
- Glucides : 250g/jour
- Lipides : 65g/jour
- Fibres : 30g/jour

**Note** : Ces objectifs seront personnalisables dans une future mise à jour.

---

## 📱 Responsive

✅ **Mobile** : Interface adaptée, boutons tactiles  
✅ **Tablette** : Grilles 2 colonnes  
✅ **Desktop** : Grilles 3 colonnes, plein écran  

---

## 🔮 Prochaines Améliorations

### Court Terme
- [ ] Objectifs personnalisables par utilisateur
- [ ] Graphiques d'évolution hebdomadaire
- [ ] Export PDF du suivi

### Moyen Terme
- [ ] Photos des repas
- [ ] Reconnaissance d'image pour estimer les calories
- [ ] Recommandations IA basées sur l'historique

### Long Terme
- [ ] Synchronisation avec montres connectées
- [ ] Partage avec nutritionniste
- [ ] Communauté de partage de recettes

---

## 💾 Sauvegarde

### Automatique

Toutes les données sont **automatiquement sauvegardées** dans IndexedDB à chaque action.

### Export

Utilisez le bouton **"Exporter"** dans la section Notes pour exporter TOUTES vos données incluant :
- Notes
- Humeur
- Repas
- Exercices
- Projets de travail
- etc.

### Import

Le bouton **"Importer"** restaure toutes vos données depuis une sauvegarde.

---

## 🏆 Avantages

### Performance
- ⚡ **Calculs instantanés** en temps réel
- 🚀 **Ajout ultra-rapide** depuis la bibliothèque
- 💾 **Sauvegarde automatique** sans délai

### Précision
- ✅ **Valeurs vérifiées** pour chaque recette
- ✅ **Calculs exacts** des totaux
- ✅ **Pas d'estimation** hasardeuse

### Praticité
- 📚 **20+ recettes** pré-enregistrées
- 🎯 **Filtres puissants** pour trouver rapidement
- 📱 **Interface intuitive** et moderne

---

## 🍃 Tags des Recettes

Les tags vous aident à trouver rapidement :

- `vegan` : 100% végétal
- `sans-gluten` : Sans gluten
- `tropical` : Ingrédients locaux Guadeloupe
- `sport` : Optimisé pour le sport
- `protéines` : Riche en protéines
- `détox` : Purifiant
- `foie` : Bon pour le foie
- `récupération` : Post-entraînement
- `masse` : Prise de masse
- `ig-bas` : Index glycémique bas
- `probiotique` : Bon pour le microbiote
- `ayurvéda` : Inspiré Ayurvéda

---

## 📞 Support

### Problèmes courants

**Q : Les recettes ne s'affichent pas ?**  
R : Vérifiez que les filtres ne sont pas trop restrictifs.

**Q : Comment supprimer un repas ?**  
R : Cliquez sur l'icône 🗑️ à droite du repas.

**Q : Les données sont-elles sauvegardées ?**  
R : Oui, automatiquement dans IndexedDB.

**Q : Puis-je modifier les objectifs ?**  
R : Pas encore, mais c'est prévu dans une prochaine version.

---

## 🎉 Conclusion

Le système de suivi nutritionnel et sportif de NegusLunar offre :

- 📊 **Tracking complet** de votre alimentation et sport
- 📚 **20+ recettes** BODY DREVM intégrées
- 🔍 **Filtres avancés** par mood, type, jour
- 💪 **Suivi exercices** avec calcul calories
- 📈 **Statistiques** en temps réel
- 💾 **Sauvegarde** automatique IndexedDB

**Suivez votre progression jour après jour ! 🌙**

---

*Créé avec 🌙 par Négus Dja • Guadeloupe • 2026*
