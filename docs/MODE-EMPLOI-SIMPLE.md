# 📖 Mode d'emploi simple - Export/Import

## 🎯 Pour qui ?

Ce guide est pour **vous**, utilisateur de NegusLunar, qui voulez :
- 💾 Sauvegarder vos notes lunaires
- 📱 Transférer vos notes vers un autre appareil
- 🔄 Restaurer vos notes après avoir vidé le cache
- 🤝 Partager vos notes avec quelqu'un

---

## ⚡ En 3 étapes simples

### 📤 SAUVEGARDER vos notes

1. **Ouvrez l'application**
   ```
   http://localhost:3001/
   ```

2. **Allez dans l'onglet "Notes & Idées"**
   - Cliquez sur le 3ème bouton en haut

3. **Cliquez sur le bouton bleu "Exporter"** (📤)
   - Un fichier sera téléchargé automatiquement
   - Nom : `neguslunar-notes-2026-01-12.json`

✅ **C'est fait !** Vos notes sont sauvegardées.

---

### 📥 RESTAURER vos notes

1. **Ouvrez l'application**
   ```
   http://localhost:3001/
   ```

2. **Allez dans l'onglet "Notes & Idées"**

3. **Cliquez sur le bouton violet "Importer"** (📥)
   - Une fenêtre s'ouvre
   - Sélectionnez votre fichier `.json`
   - Cliquez sur "Ouvrir"

4. **Confirmation**
   - Un message apparaît : "✅ X note(s) importée(s) avec succès !"
   - Vos notes sont maintenant visibles dans la liste

✅ **C'est fait !** Vos notes sont restaurées.

---

## 🎓 Exemple pratique

### Scénario : Transférer vos notes de votre PC vers votre téléphone

#### Sur votre PC

1. Ouvrez NegusLunar
2. Allez dans "Notes & Idées"
3. Cliquez sur "Exporter" 📤
4. Le fichier `neguslunar-notes-2026-01-12.json` est téléchargé

5. Envoyez-vous ce fichier par email ou WhatsApp

#### Sur votre téléphone

1. Téléchargez le fichier depuis votre email/WhatsApp
2. Ouvrez NegusLunar sur votre téléphone
3. Allez dans "Notes & Idées"
4. Cliquez sur "Importer" 📥
5. Sélectionnez le fichier téléchargé

✅ **Terminé !** Vos notes sont maintenant sur votre téléphone.

---

## 🆘 Problèmes courants

### Le bouton "Exporter" est grisé
**Raison** : Vous n'avez aucune note à exporter  
**Solution** : Créez au moins une note avant d'exporter

### Message "Format de fichier invalide"
**Raison** : Le fichier n'est pas un JSON valide  
**Solution** : Assurez-vous d'importer un fichier exporté par NegusLunar

### "0 note(s) importée(s)"
**Raison** : Toutes les notes du fichier existent déjà  
**Solution** : C'est normal ! Les doublons sont automatiquement évités

### Je ne trouve pas mon fichier exporté
**Raison** : Il est dans votre dossier Téléchargements  
**Solution** : 
- Windows : `C:\Users\VotreNom\Downloads\`
- Mac : `/Users/VotreNom/Downloads/`
- Linux : `/home/VotreNom/Downloads/`

---

## 💡 Conseils pratiques

### 1. Sauvegardez régulièrement
Exportez vos notes **chaque semaine** pour ne jamais les perdre.

### 2. Gardez plusieurs copies
- Une copie sur votre ordinateur
- Une copie dans le cloud (Google Drive, Dropbox)
- Une copie sur une clé USB

### 3. Nommez vos fichiers
Renommez vos exports pour vous y retrouver :
- `neguslunar-backup-janvier-2026.json`
- `neguslunar-notes-importantes.json`

### 4. Testez l'import
Avant de supprimer vos données, testez que l'import fonctionne !

---

## 🎁 Fichier d'exemple fourni

Un fichier `exemple-notes.json` est inclus avec l'application.

**Pour le tester** :
1. Allez dans "Notes & Idées"
2. Cliquez sur "Importer"
3. Sélectionnez `exemple-notes.json`
4. 4 notes d'exemple apparaîtront !

**Contenu** :
- Une note contemplative (Pleine Lune)
- Une note énergique (Nouvelle Lune)
- Une note créative (Premier Quartier)
- Une note calme (Dernier Quartier)

---

## 📱 Sur mobile

### Les boutons sont différents
Sur petit écran, seules les icônes sont visibles :
- 📤 = Export
- 📥 = Import

### Comment faire ?
1. Tapez sur l'icône 📤 pour exporter
2. Tapez sur l'icône 📥 pour importer

Tout fonctionne pareil que sur ordinateur !

---

## 🐳 Avec Docker

Si vous utilisez Docker, **rien ne change** !

```bash
# Lancer l'application
docker-compose up -d

# Accéder
http://localhost:3000

# Export/Import fonctionnent exactement pareil
```

---

## ❓ Questions fréquentes

### Mes notes sont-elles en sécurité ?
✅ Oui ! Elles sont sauvegardées :
- Dans votre navigateur (localStorage)
- Dans vos fichiers exportés (sur votre ordinateur)
- **Jamais** sur internet

### Puis-je perdre mes notes ?
Vous pouvez les perdre si :
- ❌ Vous videz le cache du navigateur (sans export)
- ❌ Vous désinstallez le navigateur (sans export)
- ❌ Vous changez d'ordinateur (sans export)

**Solution** : Exportez régulièrement !

### Quelqu'un peut-il voir mes notes ?
- ✅ Non, si vous ne partagez pas votre fichier
- ⚠️ Oui, si vous partagez votre fichier (il n'est pas crypté)

### Combien de notes puis-je avoir ?
- Limite localStorage : ~5-10 MB (plusieurs milliers de notes)
- Limite fichier export : Illimitée

### Puis-je modifier le fichier JSON ?
✅ Oui, mais attention :
- Respectez le format exact
- Ne supprimez pas les champs requis (id, text, mood)
- Utilisez un éditeur de texte (pas Word)

---

## 🎯 Cas d'usage réels

### 1. Avant de vider le cache
```
Export → Vider cache → Import → ✅ Notes restaurées
```

### 2. Nouveau téléphone
```
Ancien tel → Export → Email → Nouveau tel → Import
```

### 3. Sauvegarde hebdomadaire
```
Chaque dimanche → Export → Google Drive
```

### 4. Partage avec ami(e)
```
Export → Envoyer fichier → Ami importe
```

### 5. Changement de navigateur
```
Chrome → Export → Firefox → Import
```

---

## 🌟 Astuces avancées

### Fusionner plusieurs fichiers
1. Importer le premier fichier
2. Importer le deuxième fichier
3. Les notes des deux fichiers sont combinées
4. Les doublons sont automatiquement évités

### Sauvegarder par période
```
neguslunar-janvier-2026.json
neguslunar-fevrier-2026.json
neguslunar-mars-2026.json
```

### Sauvegarder par thème
```
neguslunar-pleine-lune.json
neguslunar-nouvelle-lune.json
neguslunar-recettes.json
```

---

## 📞 Besoin d'aide ?

### Documentation complète
- `EXPORT-IMPORT-GUIDE.md` - Guide détaillé
- `QUICK-START-EXPORT-IMPORT.md` - Guide rapide

### Problème technique ?
1. Ouvrez la console du navigateur (F12)
2. Regardez les messages d'erreur
3. Consultez la documentation

### Contact
Créé par **Négus Dja** - Guadeloupe 🇬🇵

---

## ✅ Checklist de sécurité

Avant de vider le cache ou changer d'appareil :

- [ ] J'ai exporté mes notes
- [ ] Le fichier est bien téléchargé
- [ ] J'ai testé l'import sur un autre navigateur
- [ ] J'ai sauvegardé le fichier dans le cloud
- [ ] J'ai gardé une copie sur clé USB

✅ **Vous êtes prêt(e) !**

---

## 🎉 Résumé ultra-rapide

### Export (Sauvegarde)
```
Notes & Idées → Exporter 📤 → Fichier téléchargé
```

### Import (Restauration)
```
Notes & Idées → Importer 📥 → Sélectionner fichier → Notes restaurées
```

---

## 🌙 Message final

Avec Export/Import, vous ne perdrez **jamais** vos notes lunaires !

Exportez régulièrement et dormez tranquille. 😊

---

Fait avec 🌙 et ❤️ en Guadeloupe

**Bonne utilisation de NegusLunar !** 🎉
