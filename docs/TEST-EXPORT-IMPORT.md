# 🧪 Guide de Test - Export/Import des Notes

## 📋 Checklist de test

### ✅ Test 1 : Export de notes vides
1. Ouvrir l'application : http://localhost:3001/
2. Aller dans l'onglet "Notes & Idées"
3. Vérifier que le bouton "Exporter" est **désactivé** (grisé)
4. ✅ **Résultat attendu** : Le bouton ne peut pas être cliqué

### ✅ Test 2 : Créer et exporter des notes
1. Créer 2-3 notes avec différentes humeurs
2. Cliquer sur "Exporter"
3. Vérifier qu'un fichier JSON est téléchargé
4. Ouvrir le fichier avec un éditeur de texte
5. ✅ **Résultat attendu** : 
   - Fichier nommé `neguslunar-notes-2026-01-12.json`
   - Contient un tableau JSON avec vos notes
   - Chaque note a les champs : id, text, mood, date, moonPhase

### ✅ Test 3 : Import de notes (fichier exemple)
1. Télécharger le fichier `exemple-notes.json` fourni
2. Dans l'application, cliquer sur "Importer"
3. Sélectionner `exemple-notes.json`
4. ✅ **Résultat attendu** : 
   - Message de confirmation : "4 note(s) importée(s) avec succès !"
   - Les 4 notes d'exemple apparaissent dans la liste

### ✅ Test 4 : Import de doublons
1. Exporter vos notes actuelles
2. Essayer d'importer le même fichier
3. ✅ **Résultat attendu** : 
   - Message : "0 note(s) importée(s) avec succès !"
   - Aucune note en double n'est créée

### ✅ Test 5 : Import de fichier invalide
1. Créer un fichier texte `test.json` avec du contenu invalide : `{ "invalid": true }`
2. Essayer de l'importer
3. ✅ **Résultat attendu** : 
   - Message d'erreur : "Format de fichier invalide"
   - Aucune note n'est ajoutée

### ✅ Test 6 : Persistance après export/import
1. Exporter vos notes
2. Vider le cache du navigateur (F12 > Application > Clear storage)
3. Recharger la page
4. Vérifier que les notes ont disparu
5. Importer le fichier exporté à l'étape 1
6. ✅ **Résultat attendu** : 
   - Toutes vos notes sont restaurées
   - Les données sont identiques à avant

### ✅ Test 7 : Responsive design
1. Tester sur mobile (ou mode responsive F12)
2. Vérifier que les boutons Export/Import sont visibles
3. ✅ **Résultat attendu** : 
   - Sur petit écran : seules les icônes sont visibles
   - Sur grand écran : icônes + texte "Exporter" / "Importer"

### ✅ Test 8 : Fusion de notes
1. Créer 2 notes : "Note A" et "Note B"
2. Exporter ces notes → `fichier1.json`
3. Supprimer "Note B"
4. Créer une nouvelle note : "Note C"
5. Importer `fichier1.json`
6. ✅ **Résultat attendu** : 
   - Vous avez maintenant : "Note A", "Note B" (restaurée), "Note C"
   - Total : 3 notes

## 🐳 Test avec Docker

### Test 9 : Export/Import dans Docker
1. Lancer l'application avec Docker : `docker-compose up -d`
2. Accéder à http://localhost:3000
3. Créer des notes et les exporter
4. Vérifier que le fichier est téléchargé sur votre machine hôte
5. Importer le fichier
6. ✅ **Résultat attendu** : 
   - L'export/import fonctionne exactement comme en développement local
   - Les fichiers sont téléchargés dans votre dossier de téléchargements habituel

## 🔍 Vérifications techniques

### Structure JSON correcte
```json
[
  {
    "id": 1705234567890,
    "text": "Contenu de la note",
    "mood": "contemplatif",
    "date": "12/01/2026",
    "moonPhase": "Pleine Lune"
  }
]
```

### Champs requis
- ✅ `id` : nombre (timestamp)
- ✅ `text` : chaîne de caractères
- ✅ `mood` : "énergique" | "calme" | "créatif" | "contemplatif"
- ✅ `date` : chaîne (format DD/MM/YYYY)
- ✅ `moonPhase` : nom de la phase lunaire

## 🐛 Bugs connus / Limitations

### Limitations actuelles
- ❌ Pas de cryptage des fichiers exportés
- ❌ Pas d'export sélectif (toutes les notes sont exportées)
- ❌ Pas de fusion manuelle en cas de conflit
- ❌ Pas d'historique des versions

### Comportements attendus
- ✅ Les fichiers JSON sont en texte clair (lisibles)
- ✅ L'import ne supprime jamais les notes existantes
- ✅ Les doublons sont détectés par l'ID unique
- ✅ Les notes sont triées par date (plus récentes en premier)

## 📊 Résultats des tests

| Test | Status | Notes |
|------|--------|-------|
| Export vide | ⬜ | Bouton désactivé |
| Export avec notes | ⬜ | Fichier téléchargé |
| Import exemple | ⬜ | 4 notes importées |
| Import doublons | ⬜ | 0 notes ajoutées |
| Fichier invalide | ⬜ | Message d'erreur |
| Persistance | ⬜ | Données restaurées |
| Responsive | ⬜ | Adapté mobile |
| Fusion notes | ⬜ | 3 notes au total |
| Docker | ⬜ | Fonctionne |

**Légende** : ⬜ À tester | ✅ Réussi | ❌ Échoué

---

## 🚀 Prochaines étapes après les tests

Si tous les tests passent :
1. ✅ Commit des changements
2. ✅ Tag de version v1.1.0
3. ✅ Déploiement en production
4. ✅ Mise à jour de la documentation

---

🌙 Happy Testing ! - Négus Dja
