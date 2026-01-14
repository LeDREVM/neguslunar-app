# 📝 Changelog - NegusLunar

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

## [1.3.0] - 2026-01-12

### ✨ Nouveau Module : Rituel Lunaire

#### 💭 Affirmations et Bien-être
- Affirmation positive unique pour chaque phase lunaire
- Journal de gratitude intégré
- Méditation guidée (texte) adaptée à chaque phase
- 8 phases lunaires avec contenus uniques

#### 🎵 Musique et Ambiance
- Playlists YouTube suggérées pour chaque phase
- Bouton direct vers YouTube avec logo
- 8 playlists différentes (méditation, énergie, relaxation, etc.)

#### 🧘 Pratiques Physiques
- Exercices de respiration adaptés (4-4-4, 4-7-8, alternée, etc.)
- Postures de yoga lunaire pour chaque phase
- Programme fitness adapté aux énergies lunaires
- Activités variées : cardio, force, yoga, étirements

#### 📊 Suivi de Bien-être
- Tracker d'humeur quotidien avec 5 niveaux
- Statistiques automatiques (jours suivis, % positifs, moyenne)
- Historique des 7 derniers jours
- Corrélation humeur/phases lunaires
- Sauvegarde automatique dans localStorage

#### 💤 Conseils Sommeil
- Conseils personnalisés par phase lunaire
- Astuces pratiques pour mieux dormir
- Amélioration de la qualité du sommeil

#### 🌓 Activités par Phase
- **Nouvelle Lune** : Intentions, planification
- **Premier Croissant** : Action, mouvement
- **Premier Quartier** : Persévérance, obstacles
- **Gibbeuse Croissante** : Ajustements, perfectionnement
- **Pleine Lune** : Célébration, gratitude, libération
- **Gibbeuse Décroissante** : Partage, enseignement
- **Dernier Quartier** : Lâcher-prise, pardon
- **Dernier Croissant** : Repos, introspection

### 🎨 Design
- Nouvel onglet avec dégradé indigo → purple → pink
- 11 sections avec couleurs thématiques
- Cartes élégantes avec effets de verre
- Icônes : Sparkles, Heart, Wind, Activity, TrendingUp
- Interface responsive complète

### 🔧 Technique
- Nouveaux états React pour le rituel
- Sauvegarde localStorage pour historique d'humeur
- Calcul automatique des statistiques
- Gestion intelligente des doublons par date

### 📚 Documentation
- Ajout de `MODULE-RITUEL-LUNAIRE.md` - Guide complet du nouveau module
- Mise à jour du `README.md` et `CHANGELOG.md`

## [1.2.0] - 2026-01-12

### ✨ Nouvelles fonctionnalités

#### 🍽️ Recette du Jour
- Ajout d'un nouvel onglet "Recette du Jour"
- 7 recettes complètes, une pour chaque jour de la semaine
- Affichage automatique de la recette correspondant au jour actuel
- Ingrédients détaillés avec quantités précises
- Instructions étape par étape numérotées
- Informations nutritionnelles (calories, temps, portions, difficulté)
- Calendrier visuel des 7 recettes de la semaine
- Design responsive orange/ambre

#### 📋 Recettes complètes améliorées
- Toutes les recettes par humeur maintenant avec détails complets
- Ingrédients avec quantités précises
- Instructions de préparation détaillées
- Apports nutritionnels (calories, protéines, glucides, lipides, fibres)
- Temps de préparation et nombre de portions
- Interface améliorée avec cartes détaillées

### 📚 Documentation
- Ajout de `RECETTES-DE-LA-SEMAINE.md` - Guide complet des recettes quotidiennes
- Mise à jour du `README.md` avec les nouvelles fonctionnalités

### 🎨 Design
- Nouvel onglet avec dégradé orange → ambre
- Icônes : UtensilsCrossed, Clock, Users
- Cartes de recettes redessinées avec plus d'informations
- Calendrier hebdomadaire visuel avec emojis

### 📊 Contenu
- 7 nouvelles recettes quotidiennes (source : YAZIO)
- 12 recettes par humeur enrichies avec détails complets
- Total : 19 recettes complètes dans l'application

## [1.1.0] - 2026-01-12

### ✨ Nouvelles fonctionnalités

#### 📤 Export de notes
- Ajout du bouton "Exporter" dans l'onglet Notes & Idées
- Export automatique en fichier JSON avec date dans le nom
- Format : `neguslunar-notes-YYYY-MM-DD.json`
- Le bouton est désactivé quand il n'y a aucune note

#### 📥 Import de notes
- Ajout du bouton "Importer" dans l'onglet Notes & Idées
- Import de fichiers JSON exportés précédemment
- Validation automatique du format des données
- Gestion intelligente des doublons (évite les imports multiples)
- Messages de confirmation et d'erreur clairs

#### 🛡️ Sécurité et validation
- Vérification de la structure des données importées
- Protection contre les fichiers JSON invalides
- Fusion intelligente avec les notes existantes
- Préservation de l'intégrité des données

### 📚 Documentation
- Ajout de `EXPORT-IMPORT-GUIDE.md` - Guide complet d'utilisation
- Ajout de `exemple-notes.json` - Fichier exemple pour tester l'import
- Mise à jour du `README.md` avec les nouvelles fonctionnalités
- Ajout de ce `CHANGELOG.md`

### 🔧 Améliorations techniques
- Ajout des icônes `Download` et `Upload` de Lucide React
- Utilisation de `useRef` pour le gestionnaire de fichiers
- Gestion propre des événements de fichier
- Nettoyage automatique de l'input file après import

### 🐛 Corrections
- Correction de l'erreur Service Worker avec Vite
- Ajout de configuration pour désactiver le SW en développement
- Nettoyage du cache Vite

## [1.0.0] - 2026-01-10

### 🎉 Version initiale

#### Fonctionnalités principales
- 🌙 Calcul des phases lunaires en temps réel
- 📅 Calendrier lunaire mensuel complet
- 📝 Système de notes avec humeurs (énergique, calme, créatif, contemplatif)
- 🍃 12 recettes végétaliennes organisées par humeur
- 💾 Sauvegarde automatique dans localStorage
- 🎨 Interface cosmique avec animations

#### Technologies
- React 18.2.0
- Vite 5.0.8
- Tailwind CSS 3.4.0
- Lucide React 0.263.1

#### Déploiement
- Configuration Docker complète
- Scripts de build Windows et Linux
- Configuration Nginx
- Documentation de déploiement

---

## Format du Changelog

Ce changelog suit le format [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

### Types de changements
- `✨ Nouvelles fonctionnalités` - pour les nouvelles fonctionnalités
- `🔧 Améliorations` - pour les améliorations de fonctionnalités existantes
- `🐛 Corrections` - pour les corrections de bugs
- `📚 Documentation` - pour les changements de documentation
- `🎨 Style` - pour les changements qui n'affectent pas le sens du code
- `♻️ Refactoring` - pour les changements de code qui ne corrigent pas de bug et n'ajoutent pas de fonctionnalité
- `⚡ Performance` - pour les améliorations de performance
- `✅ Tests` - pour l'ajout ou la correction de tests
- `🔒 Sécurité` - pour les corrections de vulnérabilités de sécurité

---

🌙 Créé avec amour par Négus Dja - Guadeloupe
