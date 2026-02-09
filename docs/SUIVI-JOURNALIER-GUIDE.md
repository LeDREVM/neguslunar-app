# 📊 Guide du Suivi Journalier

## 🎯 Vue d'ensemble

Le **Dashboard de Suivi Journalier** vous permet de tracker quotidiennement :
- 🍽️ **Vos repas** avec apports nutritionnels détaillés
- 💪 **Vos exercices** avec calories brûlées
- 📈 **Vos statistiques** nutritionnelles et sportives
- ⚖️ **Votre balance** calorique

---

## ✨ Fonctionnalités

### 1. 📅 Sélection de Date

- Naviguez entre les jours avec le sélecteur de date
- Consultez l'historique de vos journées
- Planifiez vos repas futurs

### 2. 🍽️ Suivi des Repas

#### Repas Rapides Prédéfinis

Ajoutez instantanément des repas populaires :
- 🌅 **Petit-déjeuner** : Toast à l'avocat, Smoothie vert
- ☀️ **Déjeuner** : Bowl de quinoa, Salade thaï
- 🌙 **Dîner** : Curry malais, Dal aux lentilles
- 🍎 **Collations** : Yaourt grec, Amandes

#### Repas Personnalisés

Créez vos propres repas avec :
- Nom du repas
- Type (petit-déj, déjeuner, dîner, collation)
- Calories
- Protéines (g)
- Glucides (g)
- Lipides (g)
- Fibres (g)

### 3. 💪 Suivi des Exercices

#### Exercices Rapides

Ajoutez rapidement :
- **Pompes** : 3x5 (exemple : 3 séries de 5 répétitions)
- **Crunch** : 50 répétitions
- **Squats**, **Burpees**
- **Planche**, **Course**, **Vélo**
- **Yoga**, **Natation**, **Marche**

#### Exercices Personnalisés

Configurez :
- Nom de l'exercice
- Nombre de séries
- Nombre de répétitions
- Durée (minutes)
- Calories brûlées

### 4. 📊 Statistiques en Temps Réel

#### Vue d'ensemble

- **Calories consommées** : Total du jour
- **Calories brûlées** : Par l'exercice
- **Balance calorique** : Différence nette
- **Nombre d'entrées** : Repas + exercices

#### Apports Nutritionnels Détaillés

Pour chaque nutriment :
- **Valeur actuelle** en kcal ou grammes
- **Objectif journalier** personnalisable
- **Pourcentage atteint** avec barre de progression
- **Code couleur** : Bleu (en cours), Vert (objectif atteint)

---

## 🎨 Interface

### Dashboard Principal

```
┌─────────────────────────────────────────┐
│  📅 Dashboard Journalier    [Date]      │
├─────────────────────────────────────────┤
│  Calories    Brûlées    Balance  Entrées│
│   1850        300        +1550     8     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  📈 Apports Nutritionnels               │
├─────────────────────────────────────────┤
│  Calories  Protéines  Glucides  Lipides │
│  ████████  ██████     ███████   █████   │
│  92%       75%        88%       80%      │
└─────────────────────────────────────────┘

┌──────────────────┬──────────────────────┐
│  🍽️ Repas       │  💪 Exercices        │
│                  │                      │
│  [+ Ajouter]     │  [+ Ajouter]         │
│                  │                      │
│  • Toast avocat  │  • 3x5 Pompes        │
│    350 kcal      │    8 kcal            │
│                  │                      │
│  • Bowl quinoa   │  • 50 Crunch         │
│    520 kcal      │    15 kcal           │
└──────────────────┴──────────────────────┘
```

---

## 💡 Exemples d'Utilisation

### Exemple 1 : Journée Type

**Matin** (8h00)
- Toast à l'avocat : 350 kcal
- Smoothie vert : 340 kcal

**Midi** (12h30)
- Bowl de quinoa : 520 kcal
- Yaourt grec : 200 kcal

**Soir** (19h00)
- Dal aux lentilles : 380 kcal

**Sport** (17h00)
- 3x5 Pompes : 8 kcal
- 50 Crunch : 15 kcal
- 30 min Course : 300 kcal

**Bilan** :
- Consommé : 1,790 kcal
- Brûlé : 323 kcal
- Balance : +1,467 kcal

### Exemple 2 : Journée Sport Intensif

**Repas** :
- Petit-déj : 600 kcal
- Déjeuner : 800 kcal
- Dîner : 700 kcal
- Collations : 300 kcal
- **Total** : 2,400 kcal

**Sport** :
- Course 60 min : 600 kcal
- Musculation 45 min : 300 kcal
- Natation 30 min : 360 kcal
- **Total** : 1,260 kcal

**Balance** : +1,140 kcal

---

## 🎯 Objectifs Nutritionnels

### Objectifs Par Défaut

| Nutriment | Objectif Quotidien |
|-----------|-------------------|
| Calories | 2,000 kcal |
| Protéines | 80 g |
| Glucides | 250 g |
| Lipides | 65 g |
| Fibres | 30 g |

### Personnalisation

Les objectifs peuvent être ajustés selon :
- Votre poids et taille
- Votre niveau d'activité
- Vos objectifs (perte, maintien, prise de masse)

---

## 📱 Utilisation Mobile

### Interface Adaptée

- **Grille responsive** : 1 colonne sur mobile, 2 sur desktop
- **Boutons tactiles** : Taille optimisée pour le touch
- **Formulaires simplifiés** : Champs empilés verticalement
- **Repas rapides** : Grille 2 colonnes pour sélection rapide

### Conseils Mobile

1. **Ajout rapide** : Utilisez les repas prédéfinis
2. **Rotation** : Mode paysage pour plus d'espace
3. **Saisie vocale** : Disponible sur les champs texte
4. **Notifications** : Rappels pour tracker vos repas

---

## 💾 Sauvegarde des Données

### Stockage Automatique

- **IndexedDB** : Sauvegarde automatique et instantanée
- **Par date** : Données organisées par jour
- **Hors ligne** : Fonctionne sans connexion
- **Capacité** : Plusieurs années de données

### Export/Import

- Exportez vos données nutritionnelles
- Importez depuis d'autres applications
- Format JSON standard
- Backup automatique

---

## 📈 Analyses et Tendances

### Statistiques Disponibles

- **Balance calorique** : Surplus ou déficit
- **Répartition macros** : Protéines/Glucides/Lipides
- **Fréquence repas** : Nombre par type
- **Activité sportive** : Calories brûlées

### Visualisations

- **Barres de progression** : Pour chaque nutriment
- **Code couleur** : Vert (atteint), Bleu (en cours)
- **Totaux en temps réel** : Mise à jour instantanée

---

## 🍽️ Bibliothèque de Repas

### Petits-Déjeuners

| Repas | Calories | Protéines | Glucides | Lipides |
|-------|----------|-----------|----------|---------|
| Toast avocat | 350 | 12g | 35g | 18g |
| Smoothie vert | 340 | 12g | 45g | 14g |

### Déjeuners

| Repas | Calories | Protéines | Glucides | Lipides |
|-------|----------|-----------|----------|---------|
| Bowl quinoa | 520 | 18g | 65g | 22g |
| Salade thaï | 380 | 15g | 35g | 22g |

### Dîners

| Repas | Calories | Protéines | Glucides | Lipides |
|-------|----------|-----------|----------|---------|
| Curry malais | 450 | 12g | 58g | 20g |
| Dal lentilles | 380 | 18g | 48g | 14g |

### Collations

| Repas | Calories | Protéines | Glucides | Lipides |
|-------|----------|-----------|----------|---------|
| Yaourt grec | 200 | 15g | 25g | 5g |
| Amandes 30g | 170 | 6g | 6g | 15g |

---

## 💪 Bibliothèque d'Exercices

### Musculation

| Exercice | Calories/Rep | Exemple |
|----------|--------------|---------|
| Pompes | 0.5 kcal | 3x5 = 8 kcal |
| Crunch | 0.3 kcal | 50 = 15 kcal |
| Squats | 0.4 kcal | 3x10 = 12 kcal |
| Burpees | 1.0 kcal | 20 = 20 kcal |

### Cardio

| Exercice | Calories/Min | Exemple |
|----------|--------------|---------|
| Course | 10 kcal | 30 min = 300 kcal |
| Vélo | 8 kcal | 45 min = 360 kcal |
| Natation | 12 kcal | 30 min = 360 kcal |
| Marche | 4 kcal | 60 min = 240 kcal |

### Autres

| Exercice | Calories/Min | Exemple |
|----------|--------------|---------|
| Yoga | 4 kcal | 60 min = 240 kcal |
| Planche | 5 kcal | 5 min = 25 kcal |

---

## 🎓 Conseils Nutritionnels

### Équilibre des Macros

**Répartition Recommandée** :
- **Protéines** : 15-20% (80-100g)
- **Glucides** : 45-55% (225-275g)
- **Lipides** : 25-35% (55-75g)

### Timing des Repas

- **Petit-déjeuner** : 25% des calories (500 kcal)
- **Déjeuner** : 35% des calories (700 kcal)
- **Dîner** : 30% des calories (600 kcal)
- **Collations** : 10% des calories (200 kcal)

### Hydratation

- **Objectif** : 2-3 litres par jour
- **Avant sport** : 500ml
- **Pendant sport** : 250ml toutes les 15 min
- **Après sport** : 500ml

---

## 🔧 Paramètres Avancés

### Personnalisation des Objectifs

Ajustez selon votre profil :
- **Perte de poids** : -500 kcal/jour
- **Maintien** : Calories de maintenance
- **Prise de masse** : +300-500 kcal/jour

### Calcul des Besoins

**Métabolisme de Base (MB)** :
- Hommes : 10 × poids + 6.25 × taille - 5 × âge + 5
- Femmes : 10 × poids + 6.25 × taille - 5 × âge - 161

**Dépense Totale** :
- Sédentaire : MB × 1.2
- Légèrement actif : MB × 1.375
- Modérément actif : MB × 1.55
- Très actif : MB × 1.725

---

## 📞 Support

### Questions Fréquentes

**Q : Comment modifier un repas ajouté ?**
R : Supprimez-le et ajoutez-le à nouveau avec les bonnes valeurs.

**Q : Les données sont-elles sauvegardées ?**
R : Oui, automatiquement dans IndexedDB, même hors ligne.

**Q : Puis-je ajouter mes propres recettes ?**
R : Oui, utilisez le formulaire personnalisé.

**Q : Comment calculer les calories d'un exercice ?**
R : Utilisez les valeurs prédéfinies ou calculez manuellement.

---

## 🎉 Conclusion

Le Dashboard de Suivi Journalier vous permet de :
- ✅ Tracker précisément votre nutrition
- ✅ Suivre votre activité physique
- ✅ Atteindre vos objectifs santé
- ✅ Visualiser vos progrès

**Commencez dès aujourd'hui !** 🚀

---

*Créé avec 🌙 par Négus Dja • Guadeloupe • 2026*
