# 📦 Guide d'Export et d'Import des Notes - NegusLunar

## 🎯 Fonctionnalités ajoutées

Votre application NegusLunar dispose maintenant de fonctionnalités d'export et d'import pour sauvegarder et restaurer vos notes lunaires.

## 📤 Exporter vos notes

### Comment exporter :
1. Allez dans l'onglet **"Notes & Idées"**
2. Cliquez sur le bouton **"Exporter"** (icône téléchargement)
3. Un fichier JSON sera téléchargé automatiquement avec le nom : `neguslunar-notes-YYYY-MM-DD.json`

### Quand exporter :
- ✅ Avant de vider le cache du navigateur
- ✅ Pour faire une sauvegarde de vos notes
- ✅ Pour transférer vos notes vers un autre appareil
- ✅ Pour partager vos notes avec quelqu'un
- ✅ Avant de réinstaller votre système

### Note importante :
Le bouton "Exporter" est désactivé si vous n'avez aucune note.

## 📥 Importer des notes

### Comment importer :
1. Allez dans l'onglet **"Notes & Idées"**
2. Cliquez sur le bouton **"Importer"** (icône upload)
3. Sélectionnez un fichier JSON exporté précédemment
4. Vos notes seront ajoutées à celles existantes

### Gestion des doublons :
- 🔒 Les notes avec le même ID ne seront pas importées deux fois
- ✨ Seules les nouvelles notes seront ajoutées
- 📊 Un message vous indiquera combien de notes ont été importées

### Format du fichier JSON :
```json
[
  {
    "id": 1705234567890,
    "text": "Ma première note lunaire",
    "mood": "contemplatif",
    "date": "12/01/2026",
    "moonPhase": "Pleine Lune"
  },
  {
    "id": 1705234567891,
    "text": "Une autre note",
    "mood": "énergique",
    "date": "13/01/2026",
    "moonPhase": "Gibbeuse Décroissante"
  }
]
```

## 🔄 Cas d'usage

### Sauvegarde régulière
Exportez vos notes chaque semaine pour avoir une sauvegarde de sécurité.

### Transfert entre appareils
1. Exportez depuis votre ordinateur
2. Envoyez-vous le fichier par email
3. Importez sur votre téléphone

### Partage avec la communauté
Exportez vos intentions lunaires pour les partager avec d'autres utilisateurs de NegusLunar.

### Migration de données
Si vous changez de navigateur ou d'appareil, exportez puis importez vos notes.

## 🛡️ Sécurité et confidentialité

- 📱 Les fichiers sont stockés localement sur votre appareil
- 🔒 Aucune donnée n'est envoyée sur internet lors de l'export/import
- 💾 Les fichiers JSON sont en texte clair (non cryptés)
- ⚠️ Ne partagez pas vos fichiers si vos notes contiennent des informations personnelles

## ❌ Messages d'erreur possibles

### "Format de fichier invalide"
Le fichier n'est pas un tableau JSON valide. Vérifiez que le fichier n'a pas été modifié.

### "Format de notes invalide"
Les notes dans le fichier ne contiennent pas les champs requis (id, text, mood).

### "Erreur lors de la lecture du fichier"
Le fichier n'est pas un JSON valide. Il peut être corrompu.

## 💡 Conseils

1. **Nommage des fichiers** : Les fichiers exportés incluent automatiquement la date
2. **Sauvegarde cloud** : Stockez vos exports dans Google Drive, Dropbox, etc.
3. **Versioning** : Gardez plusieurs versions de vos exports
4. **Test d'import** : Testez l'import sur un navigateur vide avant de supprimer vos données

## 🐳 Utilisation avec Docker

Ces fonctionnalités fonctionnent parfaitement avec Docker :
- Les exports sont téléchargés dans votre dossier de téléchargements habituel
- Les imports fonctionnent depuis n'importe quel dossier de votre système
- Aucune configuration Docker supplémentaire n'est nécessaire

## 🌙 Créé avec amour par Négus Dja
