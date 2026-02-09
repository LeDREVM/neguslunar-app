# 🌙 Phases Lunaires 2026 - Données Astronomiques Précises

## 📊 Source des Données

Les phases lunaires affichées dans **NegusLunar** sont basées sur des **données astronomiques réelles** provenant de :

- **[Alarme-Météo - Calendrier Lunaire 2026](https://alarmemeteo.ch/blog/calendrier-lunaire.html)**
- **[Calendrier-365 - Lune 2026](https://www.calendrier-365.fr/lune/calendrier-lunaire.html)**

Ces données sont **précises à la minute près** et incluent les heures exactes des phases lunaires majeures.

---

## 🌕 Pleines Lunes 2026

| Date | Heure | Mois |
|------|-------|------|
| **3 janvier 2026** | 11h02 | Janvier |
| **1 février 2026** | 23h09 | Février |
| **3 mars 2026** | 12h37 | Mars |
| **2 avril 2026** | 04h11 | Avril |
| **1 mai 2026** | 19h23 | Mai |
| **31 mai 2026** | 10h45 | Mai |
| **30 juin 2026** | 01h56 | Juin |
| **29 juillet 2026** | 16h35 | Juillet |
| **28 août 2026** | 06h18 | Août |
| **26 septembre 2026** | 18h49 | Septembre |
| **26 octobre 2026** | 05h11 | Octobre |
| **24 novembre 2026** | 15h53 | Novembre |
| **24 décembre 2026** | 02h28 | Décembre |

**Total : 13 pleines lunes en 2026** (2 en mai !)

---

## 🌑 Nouvelles Lunes 2026

| Date | Heure | Mois |
|------|-------|------|
| **18 janvier 2026** | 20h52 | Janvier |
| **17 février 2026** | 13h01 | Février |
| **19 mars 2026** | 02h23 | Mars |
| **17 avril 2026** | 13h51 | Avril |
| **16 mai 2026** | 22h01 | Mai |
| **15 juin 2026** | 04h54 | Juin |
| **14 juillet 2026** | 11h43 | Juillet |
| **12 août 2026** | 19h36 | Août |
| **11 septembre 2026** | 05h27 | Septembre |
| **10 octobre 2026** | 17h50 | Octobre |
| **9 novembre 2026** | 08h02 | Novembre |
| **9 décembre 2026** | 01h51 | Décembre |

**Total : 12 nouvelles lunes en 2026**

---

## 🔄 Cycle Lunaire

Un **cycle lunaire complet** (de nouvelle lune à nouvelle lune) dure environ **29,5 jours**.

### Phases Intermédiaires

Entre chaque nouvelle et pleine lune, la lune passe par 8 phases distinctes :

1. **🌑 Nouvelle Lune** (0% illuminée)
2. **🌒 Premier Croissant** (~25% illuminée)
3. **🌓 Premier Quartier** (~50% illuminée)
4. **🌔 Gibbeuse Croissante** (~75% illuminée)
5. **🌕 Pleine Lune** (100% illuminée)
6. **🌖 Gibbeuse Décroissante** (~75% illuminée)
7. **🌗 Dernier Quartier** (~50% illuminée)
8. **🌘 Dernier Croissant** (~25% illuminée)

---

## 💻 Implémentation Technique

### Fichier de Données : `src/data/moonPhases2026.js`

```javascript
export const moonPhases2026 = [
  { date: '2026-01-03', time: '11:02', phase: 'Pleine Lune', emoji: '🌕' },
  { date: '2026-01-18', time: '20:52', phase: 'Nouvelle Lune', emoji: '🌑' },
  // ... toutes les phases de 2026
];
```

### Fonctions Utilitaires

#### `getAccurateMoonPhase(date)`
Retourne la phase lunaire précise pour une date donnée, avec :
- Nom de la phase
- Emoji correspondant
- Description
- Pourcentage d'illumination
- Heure exacte (si phase majeure)

#### `getNextFullMoon(fromDate)`
Retourne la prochaine pleine lune à partir d'une date, avec le nombre de jours restants.

#### `getNextNewMoon(fromDate)`
Retourne la prochaine nouvelle lune à partir d'une date.

#### `isFullMoon(date)`
Vérifie si une date correspond exactement à une pleine lune.

#### `isNewMoon(date)`
Vérifie si une date correspond exactement à une nouvelle lune.

---

## 🎨 Composant `MoonCalendar`

Le nouveau composant `MoonCalendar` affiche :

### 1. Prochaines Phases Majeures

```jsx
<div className="grid md:grid-cols-2 gap-4">
  {/* Prochaine Pleine Lune */}
  <div>🌕 Dans X jours</div>
  
  {/* Prochaine Nouvelle Lune */}
  <div>🌑 Dans Y jours</div>
</div>
```

### 2. Calendrier Mensuel

- Navigation par mois (← Janvier 2026 →)
- Liste de toutes les phases du mois
- Mise en évidence de la phase du jour
- Heures exactes des phases

### 3. Indicateurs Visuels

- **Aujourd'hui** : Badge violet avec bordure lumineuse
- **Passé** : Opacité réduite (60%)
- **Futur** : Pleine opacité avec hover effect

---

## 🌟 Intégration dans NegusLunar

### Nouvel Onglet "Phases 2026"

```jsx
<button onClick={() => setActiveTab('moonCalendar')}>
  🌙 Phases 2026
</button>
```

### Amélioration de l'Onglet "Phase Lunaire"

- ✅ **Indicateur phase exacte** : Badge "Pleine Lune Exacte" avec heure
- ✅ **Barre d'illumination** : Pourcentage visuel de la lune éclairée
- ✅ **Lien rapide** : Bouton vers le calendrier complet

---

## 📅 Événements Spéciaux 2026

### Double Pleine Lune en Mai

**Mai 2026** aura **2 pleines lunes** :
- 1 mai à 19h23
- 31 mai à 10h45

La seconde pleine lune du mois est parfois appelée **"Lune Bleue"** (Blue Moon).

### Février Court

**Février 2026** n'a que **28 jours**, avec :
- Pleine Lune le 1er (23h09)
- Nouvelle Lune le 17 (13h01)

---

## 🔮 Significations Spirituelles

### Pleine Lune 🌕
- **Énergie** : Culmination, accomplissement
- **Action** : Célébrer, libérer, manifester
- **Rituel** : Gratitude, lâcher-prise
- **Émotion** : Intensité, clarté

### Nouvelle Lune 🌑
- **Énergie** : Nouveau départ, potentiel
- **Action** : Planter des intentions, planifier
- **Rituel** : Méditation, visualisation
- **Émotion** : Introspection, renouveau

---

## 📱 Utilisation Mobile

### Optimisations iPhone 12+

- ✅ Navigation responsive avec emojis
- ✅ Cartes tactiles (touch-friendly)
- ✅ Scroll fluide
- ✅ Animations optimisées

### Notifications (Future Feature)

Possibilité d'ajouter des **notifications push** pour :
- Pleine Lune (24h avant)
- Nouvelle Lune (24h avant)
- Phase spécifique choisie

---

## 🔬 Précision des Données

### Méthode de Calcul

Les données proviennent de calculs astronomiques basés sur :
- Position de la Terre
- Position de la Lune
- Position du Soleil
- Orbite lunaire

### Marge d'Erreur

Les heures indiquées sont précises à **±1 minute** près.

### Fuseau Horaire

Toutes les heures sont en **heure locale française** (UTC+1 ou UTC+2 selon l'heure d'été).

---

## 🌍 Comparaison avec d'Autres Sources

| Source | Précision | Couverture |
|--------|-----------|------------|
| **Alarme-Météo** | ±1 min | 2026-2027 |
| **Calendrier-365** | ±1 min | 2026 |
| **NASA** | ±10 sec | Toutes années |
| **Calcul Algorithmique** | ±30 min | Approximatif |

NegusLunar utilise les données d'**Alarme-Météo** pour 2026, avec fallback sur le calcul algorithmique pour les autres années.

---

## 🎯 Cas d'Usage

### 1. Jardinage Lunaire

Planter selon les phases :
- **Nouvelle Lune** : Planter les graines
- **Lune Croissante** : Croissance des plantes
- **Pleine Lune** : Récolte
- **Lune Décroissante** : Taille, repos

### 2. Rituels Spirituels

- **Pleine Lune** : Méditation de gratitude
- **Nouvelle Lune** : Définir intentions
- **Premier Quartier** : Passer à l'action
- **Dernier Quartier** : Lâcher prise

### 3. Bien-être

- **Pleine Lune** : Énergie haute, sommeil perturbé
- **Nouvelle Lune** : Introspection, repos
- **Lune Croissante** : Motivation, action
- **Lune Décroissante** : Détox, libération

### 4. Photographie

Planifier des **photos de lune** :
- Pleine Lune : Meilleure visibilité
- Nouvelle Lune : Ciel étoilé optimal
- Croissants : Effets artistiques

---

## 🚀 Évolutions Futures

### Version 2.0 (Planifié)

- [ ] **Données 2027** : Intégration du calendrier 2027
- [ ] **Éclipses lunaires** : Dates et heures des éclipses
- [ ] **Superlunes** : Identification des pleines lunes les plus proches
- [ ] **Lunes bleues** : Détection automatique
- [ ] **Notifications** : Alertes personnalisées
- [ ] **Widget** : Affichage phase actuelle en temps réel
- [ ] **Exportation** : Télécharger le calendrier (PDF, iCal)
- [ ] **Intégration Météo** : Visibilité de la lune selon la météo

### Version 3.0 (Vision)

- [ ] **Phases en temps réel** : Animation de la lune
- [ ] **Réalité Augmentée** : Pointer le téléphone vers le ciel
- [ ] **Communauté** : Partager observations et photos
- [ ] **Astro-Météo** : Corrélation lune/météo/humeur

---

## 📚 Ressources Complémentaires

### Sites Officiels

- [NASA - Moon Phases](https://moon.nasa.gov/)
- [Alarme-Météo - Calendrier Lunaire](https://alarmemeteo.ch/blog/calendrier-lunaire.html)
- [Calendrier-365 - Phases Lune](https://www.calendrier-365.fr/lune/calendrier-lunaire.html)

### Documentation Technique

- [Calcul des Phases Lunaires](https://fr.wikipedia.org/wiki/Phase_lunaire)
- [Cycle Synodique](https://fr.wikipedia.org/wiki/Mois_synodique)

---

## ✨ Résumé

| Aspect | Détail |
|--------|--------|
| **Source** | Alarme-Météo (données officielles) |
| **Précision** | ±1 minute |
| **Couverture** | Année 2026 complète |
| **Phases majeures** | 13 Pleines Lunes + 12 Nouvelles Lunes |
| **Phases intermédiaires** | Calculées automatiquement |
| **Illumination** | Pourcentage précis |
| **Mobile** | Optimisé iPhone 12+ |
| **Performance** | Données statiques (pas d'API) |

---

## 🎨 Captures d'Écran

### Onglet "Phases 2026"

```
┌─────────────────────────────────────────┐
│  🌕 Prochaine Pleine Lune    🌑 Prochaine Nouvelle Lune  │
│  1 février 2026              17 février 2026              │
│  23h09                       13h01                        │
│  Dans 5 jours                Dans 21 jours                │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Phases Lunaires 2026                   │
│  ← Janvier →                            │
│                                         │
│  🌕 Pleine Lune                         │
│  Vendredi 3 janvier • 11h02            │
│                                         │
│  🌑 Nouvelle Lune                       │
│  Samedi 18 janvier • 20h52             │
└─────────────────────────────────────────┘
```

### Onglet "Phase Lunaire" (Amélioré)

```
┌─────────────────────────────────────────┐
│              🌕                          │
│                                         │
│         Pleine Lune                     │
│                                         │
│  ✨ Pleine Lune Exacte à 23h09 ✨      │
│                                         │
│  Illumination: 100%                     │
│  ████████████████████████ 100%          │
│                                         │
│  Accomplissement, gratitude             │
│                                         │
│  📅 Voir toutes les phases de 2026     │
└─────────────────────────────────────────┘
```

---

**Créé avec 🌙 par Négus Dja • Guadeloupe 🇬🇵**

*Données astronomiques fournies par [Alarme-Météo](https://alarmemeteo.ch/blog/calendrier-lunaire.html)*
