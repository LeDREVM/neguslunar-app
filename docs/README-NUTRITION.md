# 🍎 NegusLunar - Module Nutrition

> Suivi nutritionnel complet inspiré de Yazio, intégré harmonieusement à votre application lunaire.

---

## 🌟 Fonctionnalités

### 📷 Scanner de Codes-Barres
Scannez ou recherchez des aliments pour suivre votre nutrition quotidienne.

### ⏱️ Jeûne Intermittent
Gérez vos périodes de jeûne avec 4 protocoles (16:8, 18:6, 20:4, 24h).

### 🎯 Plans de Repas Personnalisés
Obtenez un plan nutritionnel adapté à votre objectif : perte de poids, prise de masse ou maintien.

---

## 📖 Documentation

| Document | Description | Pour qui ? |
|----------|-------------|------------|
| [QUICKSTART-NUTRITION.md](QUICKSTART-NUTRITION.md) | Démarrage en 3 minutes | ⚡ Débutants pressés |
| [GUIDE-NUTRITION.md](GUIDE-NUTRITION.md) | Guide utilisateur complet | 👤 Utilisateurs |
| [NOUVELLES-FONCTIONNALITES-NUTRITION.md](NOUVELLES-FONCTIONNALITES-NUTRITION.md) | Documentation technique | 💻 Développeurs |
| [EXEMPLES-CODES-BARRES.md](EXEMPLES-CODES-BARRES.md) | Codes-barres de test | 🧪 Testeurs |
| [RESUME-INTEGRATION-NUTRITION.md](RESUME-INTEGRATION-NUTRITION.md) | Résumé de l'intégration | 📋 Chefs de projet |

---

## 🚀 Démarrage Rapide

### Installation
```bash
# L'application est déjà configurée !
npm run dev
```

### Accès
```
http://localhost:3000/
```

### Premiers Pas
1. Cliquez sur **"Scanner"** 📷
2. Testez avec le code : `3017620422003`
3. Explorez les autres onglets !

---

## 🎯 Cas d'Usage

### 🔵 Perdre du Poids
```
1. Plans Repas → Perte de Poids
2. Jeûne → 16:8
3. Scanner → Suivre tous vos repas
4. Objectif : Déficit de 500 kcal/jour
```

### 🟢 Prendre du Muscle
```
1. Plans Repas → Prise de Masse
2. Scanner → Viser 2g protéines/kg
3. Jeûne → Optionnel (18:6)
4. Objectif : Surplus de 500 kcal/jour
```

### 🟡 Maintenir sa Forme
```
1. Plans Repas → Maintien
2. Scanner → Équilibrer les macros
3. Jeûne → 16:8 pour la santé
4. Objectif : Équilibre calorique
```

---

## 📊 Technologies

- **React 18** - Framework UI
- **Lucide React** - Icônes
- **OpenFoodFacts API** - Base de données alimentaire
- **LocalStorage** - Persistance des données
- **Tailwind CSS** - Styling
- **Vite** - Build tool

---

## 🎨 Captures d'Écran

### Scanner de Codes-Barres
```
┌─────────────────────────────────┐
│  🍎 Scanner d'Aliments          │
├─────────────────────────────────┤
│  [Code-barres: ___________] 🔍  │
│  [📷 Scanner un code-barres]    │
│                                 │
│  ┌───────────────────────────┐  │
│  │ Nutella                   │  │
│  │ Ferrero                   │  │
│  │ 539 kcal | 6.3g P        │  │
│  │ [+ Ajouter à ma liste]   │  │
│  └───────────────────────────┘  │
│                                 │
│  📊 Mes Aliments du Jour        │
│  Total: 1250 kcal               │
└─────────────────────────────────┘
```

### Jeûne Intermittent
```
┌─────────────────────────────────┐
│  ⏱️ Jeûne Intermittent          │
├─────────────────────────────────┤
│      🌙 Phase de Jeûne          │
│                                 │
│        ╭─────────╮              │
│       │  12:34:56 │             │
│       │  12h/16h  │             │
│       │   75%     │             │
│        ╰─────────╯              │
│                                 │
│  [⏸ Pause] [✓ Terminer]        │
│                                 │
│  📊 Statistiques                │
│  Jeûnes réussis: 15             │
└─────────────────────────────────┘
```

### Plans de Repas
```
┌─────────────────────────────────┐
│  🍽️ Plans de Repas             │
├─────────────────────────────────┤
│  Objectif: 🔵 Perte de Poids    │
│                                 │
│  📊 Vos Besoins                 │
│  1800 kcal | 157g P | 157g G   │
│                                 │
│  🍳 Petit-déjeuner (350 kcal)   │
│  • Omelette aux légumes         │
│  • Avocat                       │
│                                 │
│  🥗 Déjeuner (450 kcal)         │
│  • Salade de poulet grillé      │
│  • Quinoa                       │
└─────────────────────────────────┘
```

---

## 💡 Conseils Pro

### 🎯 Objectif Perte de Poids
- ✅ Combinez jeûne 16:8 + déficit calorique
- ✅ Scannez TOUT ce que vous mangez
- ✅ Privilégiez les protéines
- ✅ Buvez 2-3L d'eau/jour

### 💪 Objectif Prise de Masse
- ✅ Surplus de 300-500 kcal
- ✅ 1.6-2.2g protéines/kg
- ✅ Glucides autour de l'entraînement
- ✅ 4-6 repas par jour

### 🧘 Objectif Maintien
- ✅ Équilibre apports/dépenses
- ✅ Variez votre alimentation
- ✅ Activité physique régulière
- ✅ Écoutez votre corps

---

## 🔗 Liens Utiles

- [OpenFoodFacts](https://world.openfoodfacts.org/) - Base de données alimentaire
- [Guide du Jeûne Intermittent](https://www.healthline.com/nutrition/intermittent-fasting-guide)
- [Calculateur TDEE](https://tdeecalculator.net/)

---

## 🌙 Intégration Lunaire

Ces fonctionnalités s'harmonisent avec les phases lunaires :

| Phase Lunaire | Recommandation Nutrition |
|---------------|--------------------------|
| 🌑 Nouvelle Lune | Commencer un nouveau protocole de jeûne |
| 🌓 Premier Quartier | Augmenter l'apport en protéines |
| 🌕 Pleine Lune | Repas conscient, gratitude |
| 🌗 Dernier Quartier | Détox, jeûne prolongé |

---

## ❓ FAQ

### Le scanner fonctionne-t-il hors ligne ?
Non, il nécessite une connexion internet pour accéder à l'API OpenFoodFacts.

### Mes données sont-elles privées ?
Oui ! Tout est stocké localement dans votre navigateur (localStorage).

### Puis-je personnaliser les plans de repas ?
Les suggestions sont des exemples. Adaptez-les à vos goûts et besoins !

### Le jeûne est-il sûr ?
Consultez toujours un professionnel de santé avant de commencer un protocole de jeûne.

---

## 🤝 Contribution

### Ajouter des Produits
Contribuez à OpenFoodFacts en ajoutant des produits manquants :
[https://world.openfoodfacts.org/](https://world.openfoodfacts.org/)

### Signaler un Bug
Ouvrez une issue avec :
- Description du problème
- Étapes pour reproduire
- Navigateur et version

---

## 📝 Changelog

### Version 1.0.0 (Janvier 2026)
- ✅ Scanner de codes-barres avec OpenFoodFacts
- ✅ Jeûne intermittent (4 protocoles)
- ✅ Plans de repas personnalisés (3 objectifs)
- ✅ Intégration complète dans NegusLunar
- ✅ Documentation exhaustive

---

## 📄 Licence

Ce module fait partie de l'application NegusLunar.
Consultez le fichier LICENSE à la racine du projet.

---

## 👨‍💻 Auteur

**Négus Dja**
- 📍 Guadeloupe
- 🌙 Créateur de NegusLunar

---

## 🙏 Remerciements

- **OpenFoodFacts** - Pour leur API gratuite et open-source
- **Yazio** - Pour l'inspiration
- **Communauté React** - Pour les outils et ressources

---

## 🚀 Prochaines Étapes

1. Testez les fonctionnalités avec [QUICKSTART-NUTRITION.md](QUICKSTART-NUTRITION.md)
2. Explorez les codes-barres dans [EXEMPLES-CODES-BARRES.md](EXEMPLES-CODES-BARRES.md)
3. Lisez le guide complet [GUIDE-NUTRITION.md](GUIDE-NUTRITION.md)
4. Commencez votre voyage nutrition ! 🌙

---

**Que la lune guide votre nutrition ! 🌙🍎**

*Créé avec 🌙 par Négus Dja • Guadeloupe*
