# 🛒 Guide de la Liste de Courses

## Vue d'ensemble

Le module **Liste de Courses** permet de planifier et gérer vos achats alimentaires de manière intuitive et organisée. Il s'intègre parfaitement avec votre bibliothèque de recettes et vous aide à préparer vos courses en fonction de vos besoins nutritionnels.

## ✨ Fonctionnalités Principales

### 1. **Sélection d'Ingrédients Intelligente** 🥬

- **70+ ingrédients référencés** : légumes, fruits, légumineuses, céréales, épices, etc.
- **Catégorisation automatique** : 11 catégories (légumes, fruits, légumineuses, céréales, épices, laitages végétaux, huiles, graines, oléagineux, autres)
- **Icônes emoji** pour une identification rapide
- **Marquage tropical** pour identifier les produits locaux de Guadeloupe

### 2. **Interface de Recherche et Filtrage** 🔍

#### Filtres par Catégorie
- Tous les ingrédients
- Légumes 🥬
- Fruits 🍎
- Légumineuses 🫘
- Céréales 🌾
- Épices 🌶️
- Laitages végétaux 🥛
- Huiles 🫒
- Graines & Oléagineux 🌰

#### Recherche Textuelle
- Recherche en temps réel par nom d'ingrédient
- Filtrage instantané des résultats

### 3. **Gestion de la Liste** 📝

#### Ajout d'Articles
- Sélection visuelle avec emojis
- Quantité personnalisable (optionnel)
- Unité de mesure (g, kg, ml, L, pièce(s), tasse, c. à soupe, c. à café)
- Notes personnelles (optionnel)

#### Organisation Automatique
- **Groupement par catégorie** : vos articles sont automatiquement organisés par type
- **Comptage des articles** par catégorie
- **Barre de progression** pour suivre vos achats

#### Actions sur les Articles
- ✅ **Cocher/Décocher** : marquez les articles achetés
- 🗑️ **Supprimer** : retirez un article de la liste
- 📱 **Affichage compact** : design optimisé pour mobile

### 4. **Actions Globales** 🎯

#### Export
- **Téléchargement en format texte** (.txt)
- Format lisible avec cases à cocher (○ ou ✓)
- Inclut quantités et notes
- Nom du fichier avec la date du jour

#### Gestion de Masse
- **Supprimer les cochés** : nettoyer rapidement les articles achetés
- **Tout vider** : réinitialiser complètement la liste
- **Confirmation de sécurité** pour éviter les suppressions accidentelles

### 5. **Persistance des Données** 💾

- **Sauvegarde automatique** dans localStorage
- **Restauration au chargement** : retrouvez votre liste même après fermeture du navigateur
- **Mise à jour en temps réel** : aucune perte de données

## 🔗 Intégration avec le Module Recettes

### Filtre par Ingrédient dans RecipeBrowser

Le **RecipeBrowser** a été amélioré avec un nouveau filtre puissant :

#### Fonctionnalités du Filtre
- **Sélection d'ingrédient** : cliquez sur un légume/fruit pour filtrer les recettes
- **Affichage de l'ingrédient sélectionné** : badge vert avec emoji
- **Catégorisation des ingrédients** : naviguez par type
- **Recherche d'ingrédients** : trouvez rapidement ce que vous cherchez
- **Combinaison avec autres filtres** : mood, catégorie, jour, détox, post-workout

#### Comment l'utiliser
1. Ouvrez l'onglet **🍃 Recettes** ou **Mon Suivi**
2. Cliquez sur **Filtres**
3. Dans la section **Par Ingrédient/Légume 🥬** :
   - Choisissez une catégorie d'ingrédient
   - Utilisez la barre de recherche si besoin
   - Cliquez sur l'ingrédient désiré
4. Les recettes se filtrent automatiquement pour afficher uniquement celles contenant cet ingrédient
5. Pour retirer le filtre, cliquez sur le **X** dans le badge vert

#### Exemple d'Usage
- **"Je veux utiliser les betteraves de mon frigo"** → Sélectionnez Betterave → Vous voyez toutes les recettes avec betterave
- **"Qu'est-ce que je peux faire avec de la mangue ?"** → Sélectionnez Mangue → Smoothies, salades, desserts à la mangue
- **"Recettes avec patate douce"** → Sélectionnez Patate douce → Soupes, plats, bowls

## 📱 Design Responsive

### Mobile
- Interface adaptée aux petits écrans
- Grille compacte d'ingrédients (3 colonnes)
- Boutons tactiles optimisés
- Texte abrégé sur les boutons ("Recettes" → icône seule)

### Tablette
- Grille moyenne (4 colonnes)
- Layout équilibré
- Affichage complet des labels

### Desktop
- Grille large (6 colonnes)
- Vue d'ensemble complète
- Interface spacieuse

## 🎨 Base de Données des Ingrédients

### Ingrédients Tropicaux Spécifiques 🌴

Adaptation au contexte guadeloupéen :
- Giraumon 🎃
- Chayote (christophine) 🥒
- Papaye verte 🥒
- Fruit à pain 🌰
- Aubergine longue 🍆
- Pois d'Angole 🫘
- Pois rouges 🫘
- Goyave 🍐
- Maracudja 💛
- Basilic péyi 🌿
- Bois d'Inde 🌿
- Lait de coco 🥥
- Huile de coco 🥥

### Ingrédients Standards

Tous les ingrédients classiques pour une alimentation vegan équilibrée :
- Légumes européens (betterave, radis noir, artichaut, brocoli, etc.)
- Fruits communs (orange, citron, banane, fruits rouges, etc.)
- Légumineuses (lentilles, pois chiches, haricots, etc.)
- Céréales (riz, quinoa, avoine, etc.)
- Épices & aromates (curcuma, curry, cumin, gingembre, etc.)

## 💡 Cas d'Usage

### Scénario 1 : Planification Hebdomadaire
1. Consultez vos recettes de la semaine
2. Notez les ingrédients nécessaires
3. Ouvrez la **Liste de Courses**
4. Ajoutez chaque ingrédient avec quantités
5. Exportez la liste avant d'aller au marché
6. Cochez les articles au fur et à mesure

### Scénario 2 : Course par Ingrédient
1. Ouvrez le **RecipeBrowser**
2. Utilisez le filtre **Par Ingrédient**
3. Sélectionnez l'ingrédient que vous voulez cuisiner
4. Choisissez une ou plusieurs recettes
5. Ajoutez les ingrédients manquants à votre liste
6. Faites vos courses et cuisinez !

### Scénario 3 : Shopping au Marché Local
1. Filtrez les ingrédients par catégorie **Légumes** tropicaux
2. Ajoutez les produits de saison à votre liste
3. Cherchez les recettes qui utilisent ces ingrédients
4. Complétez votre liste avec les autres besoins
5. Exportez et imprimez pour le marché

## 🔄 Workflow Complet

```
🍽️ Consultation Recettes
    ↓
🔍 Filtre par Ingrédient
    ↓
📋 Sélection de Recettes
    ↓
🛒 Ajout à Liste de Courses
    ↓
📥 Export de la Liste
    ↓
🏪 Courses au Marché
    ↓
✅ Cocher Articles Achetés
    ↓
👨‍🍳 Cuisine !
    ↓
🍽️ Ajout au Suivi Nutritionnel
```

## 📊 Données Stockées

### Structure d'un Article
```javascript
{
  id: 1234567890,
  ingredient: {
    id: 'betterave',
    name: 'Betterave',
    category: 'légume',
    emoji: '🥬',
    tropical: false
  },
  quantity: '500',
  unit: 'g',
  notes: 'Bio si possible',
  checked: false,
  addedAt: '2026-02-09T10:30:00.000Z'
}
```

### Stockage
- **Localisation** : `localStorage`
- **Clé** : `shoppingList`
- **Format** : JSON Array
- **Capacité** : ~5MB (plusieurs centaines d'articles)

## 🚀 Améliorations Futures

### Fonctionnalités Prévues
- [ ] Synchronisation avec le compte utilisateur
- [ ] Partage de liste avec d'autres utilisateurs
- [ ] Suggestions d'ingrédients basées sur les recettes favorites
- [ ] Calcul automatique des quantités pour X personnes
- [ ] Intégration avec les magasins locaux (prix, disponibilité)
- [ ] Historique des listes de courses
- [ ] Listes récurrentes (hebdomadaire, mensuelle)
- [ ] Scanner de code-barres pour ajouter rapidement

### Intégrations Possibles
- Carte des marchés locaux de Guadeloupe
- Comparateur de prix
- Saisonnalité des produits tropicaux
- Rappels pour les courses

## 🆘 Support

### Problèmes Courants

**Q : Ma liste a disparu !**
R : Vérifiez que votre navigateur n'a pas effacé les données localStorage. Exportez régulièrement votre liste en sauvegarde.

**Q : Je ne trouve pas un ingrédient spécifique**
R : Utilisez la recherche textuelle ou la catégorie "Autres". Les ingrédients très spécifiques peuvent être ajoutés manuellement via les notes.

**Q : Comment ajouter un ingrédient qui n'est pas dans la liste ?**
R : Pour l'instant, utilisez les notes d'un article existant ou attendez la prochaine mise à jour qui permettra les ingrédients personnalisés.

**Q : La liste ne se synchronise pas entre mes appareils**
R : Le localStorage est limité à un appareil. Utilisez la fonction Export/Import pour transférer votre liste.

### Contact
Pour toute question ou suggestion, consultez la documentation principale ou créez une issue sur le dépôt GitHub.

---

**Développé avec 💚 pour Negus Lunar**  
*Nutrition végétalienne & Sagesse lunaire*
