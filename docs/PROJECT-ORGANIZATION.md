# 📂 Organisation du Projet Negus Lunar

Ce document explique l'organisation des fichiers et dossiers du projet.

## 🗂️ Structure du Projet

```
neguslunar-app/
│
├── 📄 README.md                    # Documentation principale (GitHub)
├── 📄 package.json                 # Dépendances npm
├── 📄 vite.config.js               # Configuration Vite
├── 📄 tailwind.config.js           # Configuration Tailwind CSS
├── 📄 index.html                   # Point d'entrée HTML
├── 📄 .gitignore                   # Fichiers ignorés par Git
│
├── 📁 docs/                        # 📚 TOUTE LA DOCUMENTATION
│   ├── README.md                   # Index de la documentation
│   ├── QUICKSTART.md              # Guide de démarrage rapide
│   ├── DATABASE-GUIDE.md          # Guide IndexedDB
│   ├── LISTE-COURSES-GUIDE.md     # Guide liste de courses
│   ├── SUIVI-NUTRITIONNEL-GUIDE.md # Guide nutrition
│   ├── MODULE-WORK-PROFESSIONNEL.md # Guide module travail
│   └── ... (57 fichiers au total)
│
├── 📁 src/                         # 💻 CODE SOURCE
│   ├── main.jsx                    # Point d'entrée React
│   ├── App.jsx                     # Composant principal
│   ├── index.css                   # Styles globaux
│   │
│   ├── 📁 components/              # Composants React
│   │   ├── NegusLunar.jsx         # Composant principal de l'app
│   │   ├── MoonCalendar.jsx       # Calendrier lunaire
│   │   ├── EclipseCalendar.jsx    # Calendrier éclipses
│   │   ├── BarcodeScanner.jsx     # Scanner de codes-barres
│   │   ├── IntermittentFasting.jsx # Module jeûne
│   │   ├── MealPlanner.jsx        # Planificateur de repas
│   │   ├── WorkModule.jsx         # Module travail
│   │   ├── DailyTracker.jsx       # Suivi journalier
│   │   ├── ShoppingList.jsx       # 🆕 Liste de courses
│   │   └── RecipeBrowser.jsx      # Navigateur de recettes
│   │
│   ├── 📁 data/                    # Données statiques
│   │   ├── moonPhases2026.js      # Phases lunaires 2026
│   │   ├── lunarEclipses2026.js   # Éclipses lunaires
│   │   ├── recipesDatabase.js     # Base de recettes BODY DREVM
│   │   └── ingredientsDatabase.js # 🆕 Base ingrédients (70+)
│   │
│   ├── 📁 hooks/                   # Hooks React personnalisés
│   │   └── useDatabase.js         # Hooks IndexedDB
│   │
│   └── 📁 utils/                   # Utilitaires
│       └── database.js            # API IndexedDB
│
├── 📁 public/                      # 📦 FICHIERS STATIQUES
│   ├── moon.svg                    # Logo lune
│   └── 📁 BODY DREVM/             # Documents nutrition
│       ├── fiche recette.md
│       ├── fiche recette semaine 2.md
│       ├── recette vege.md
│       ├── protocole detox.md
│       └── sport.md
│
├── 📁 dist/                        # 🏗️ BUILD PRODUCTION (généré)
│   ├── index.html
│   ├── assets/
│   └── ... (fichiers optimisés)
│
└── 📁 node_modules/                # 📦 DÉPENDANCES (npm install)
```

## 📚 Organisation de la Documentation

### Dossier `docs/` - Documentation Complète

Tous les fichiers markdown de documentation ont été déplacés dans le dossier `docs/` pour garder le projet propre.

#### Catégories de Documentation

**🚀 Démarrage & Installation**
- `QUICKSTART.md` - Démarrage rapide
- `INSTALLATION-GUIDE.md` - Installation détaillée
- `MODE-EMPLOI-SIMPLE.md` - Guide simplifié

**🌙 Modules Principaux**
- `MODULE-RITUEL-LUNAIRE.md` - Rituel lunaire
- `GUIDE-NUTRITION.md` - Module nutrition
- `MODULE-WORK-PROFESSIONNEL.md` - Module travail
- `LISTE-COURSES-GUIDE.md` - 🆕 Liste de courses

**🗄️ Base de Données**
- `DATABASE-GUIDE.md` - Guide IndexedDB
- `MISE-A-JOUR-DATABASE.md` - Mises à jour DB

**📱 Mobile & Déploiement**
- `ACCES-MOBILE-GUIDE.md` - Accès mobile
- `DEPLOYMENT.md` - Guide de déploiement
- `DOCKER-QUICKSTART.md` - Docker

**📝 Historique**
- `CHANGELOG.md` - Journal des modifications
- `CHANGELOG-2026-02-07.md` - Changelog du 7 fév 2026

### Fichiers à la Racine

**Seulement ces fichiers restent à la racine** :
- ✅ `README.md` - Documentation principale pour GitHub
- ✅ `package.json` - Configuration npm
- ✅ `vite.config.js` - Configuration Vite
- ✅ `tailwind.config.js` - Configuration Tailwind
- ✅ Fichiers de configuration (`.gitignore`, `.env`, etc.)

## 🎯 Conventions de Nommage

### Fichiers Markdown
- **MAJUSCULES-AVEC-TIRETS.md** pour la documentation
- Préfixes courants :
  - `GUIDE-` : Guides utilisateur
  - `MODULE-` : Documentation de modules
  - `QUICKSTART-` : Démarrages rapides
  - `RESUME-` : Résumés
  - `CHANGELOG-` : Historiques

### Composants React
- **PascalCase.jsx** : `NegusLunar.jsx`, `ShoppingList.jsx`

### Fichiers Data
- **camelCase.js** : `moonPhases2026.js`, `recipesDatabase.js`

### Hooks
- **useNomDuHook.js** : `useDatabase.js`, `useNotes.js`

## 📦 Gestion des Dépendances

### Production
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "lucide-react": "^0.263.1"
}
```

### Développement
```json
{
  "vite": "^5.0.0",
  "tailwindcss": "^3.3.0",
  "@vitejs/plugin-react": "^4.2.1"
}
```

## 🔄 Workflow de Développement

### 1. Développement Local
```bash
npm run dev          # Serveur dev sur http://localhost:3000
```

### 2. Build Production
```bash
npm run build        # Génère dist/
npm run preview      # Teste le build localement
```

### 3. Documentation
- Toujours créer/modifier dans `docs/`
- Mettre à jour `docs/README.md` si nouvelle doc
- Lier depuis `README.md` principal si nécessaire

### 4. Nouveaux Modules
```
1. Créer composant dans src/components/
2. Créer data si besoin dans src/data/
3. Créer hooks si besoin dans src/hooks/
4. Documenter dans docs/
5. Mettre à jour docs/README.md
```

## 🗃️ Données Persistantes

### IndexedDB (Principal)
- **Localisation** : Navigateur (IndexedDB)
- **Stores** : notes, moodHistory, dailyMeals, dailyExercises, etc.
- **API** : `src/utils/database.js`

### localStorage (Secondaire)
- **Localisation** : Navigateur (localStorage)
- **Usage** : Liste de courses, préférences
- **Clés** : `shoppingList`, etc.

## 🚫 Fichiers Ignorés (.gitignore)

- `node_modules/` - Dépendances npm
- `dist/` - Build production
- `.env*` - Variables d'environnement
- `.vscode/` - Config IDE
- `*.log` - Logs

## 📊 Taille du Projet

### Statistiques (Février 2026)
- **Documentation** : 57 fichiers markdown
- **Composants React** : 15+ composants
- **Lignes de code** : ~10,000+
- **Base de recettes** : 40+ recettes
- **Base d'ingrédients** : 70+ ingrédients

## 🎨 Architecture des Modules

```
Application Negus Lunar
│
├── 🌙 Module Lunaire
│   ├── Phases en temps réel
│   ├── Calendrier 2026
│   ├── Éclipses lunaires
│   └── Rituel lunaire
│
├── 🍃 Module Nutrition
│   ├── Bibliothèque recettes BODY DREVM
│   ├── Suivi nutritionnel journalier
│   ├── Liste de courses intelligente
│   ├── Filtre par ingrédient
│   └── Plan de repas
│
├── 💼 Module Work
│   ├── Gestion de projets
│   ├── Suivi du temps
│   ├── Sessions Pomodoro
│   └── Statistiques
│
├── 📝 Module Notes
│   ├── Prise de notes
│   ├── Export/Import JSON
│   └── Historique d'humeur
│
└── 📊 Système de Données
    ├── IndexedDB (principal)
    ├── localStorage (secondaire)
    └── Export/Import
```

## 🔐 Sécurité & Vie Privée

- ✅ Toutes les données restent locales (navigateur)
- ✅ Pas de serveur backend
- ✅ Pas de tracking
- ✅ Pas de cookies tiers
- ✅ Export/Import pour backup

## 🌐 Compatibilité

### Navigateurs Supportés
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Tous navigateurs modernes avec IndexedDB

### Appareils
- 💻 Desktop (Windows, macOS, Linux)
- 📱 Mobile (iOS, Android)
- 📲 Tablette
- 🌐 PWA (Progressive Web App)

## 📞 Ressources

### Liens Utiles
- **Documentation** : `docs/README.md`
- **Guide Démarrage** : `docs/QUICKSTART.md`
- **API Database** : `src/utils/database.js`
- **Changelog** : `docs/CHANGELOG.md`

### Support
1. Consulter `docs/README.md` pour l'index complet
2. Rechercher dans la documentation spécifique
3. Vérifier le `CHANGELOG.md` pour les nouveautés

---

**Dernière mise à jour** : 9 février 2026  
**Maintenu par** : Négus Dja  
**Localisation** : Guadeloupe 🇬🇵

*Fait avec 🌙 et 🥬*
