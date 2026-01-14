# 🏗️ Architecture Export/Import - NegusLunar

## 📐 Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                      NAVIGATEUR WEB                         │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Application React (NegusLunar)           │  │
│  │                                                       │  │
│  │  ┌─────────────────────────────────────────────┐    │  │
│  │  │         Composant NegusLunar.jsx            │    │  │
│  │  │                                             │    │  │
│  │  │  ┌──────────────┐    ┌──────────────┐     │    │  │
│  │  │  │   useState   │    │   useEffect  │     │    │  │
│  │  │  │   (notes)    │◄───┤ (localStorage)│     │    │  │
│  │  │  └──────┬───────┘    └──────────────┘     │    │  │
│  │  │         │                                  │    │  │
│  │  │         ▼                                  │    │  │
│  │  │  ┌──────────────────────────────────┐     │    │  │
│  │  │  │   Boutons Export/Import          │     │    │  │
│  │  │  │   [📤 Exporter] [📥 Importer]    │     │    │  │
│  │  │  └──────┬───────────────┬───────────┘     │    │  │
│  │  │         │               │                  │    │  │
│  │  │         ▼               ▼                  │    │  │
│  │  │  ┌─────────────┐ ┌─────────────┐         │    │  │
│  │  │  │exportNotes()│ │importNotes()│         │    │  │
│  │  │  └──────┬──────┘ └──────┬──────┘         │    │  │
│  │  │         │               │                  │    │  │
│  │  └─────────┼───────────────┼──────────────────┘    │  │
│  │            │               │                       │  │
│  └────────────┼───────────────┼───────────────────────┘  │
│               │               │                          │
│               ▼               ▼                          │
│    ┌──────────────────┐ ┌──────────────────┐           │
│    │   Blob API       │ │  FileReader API  │           │
│    │   (création)     │ │  (lecture)       │           │
│    └────────┬─────────┘ └────────┬─────────┘           │
│             │                    │                      │
│             ▼                    ▼                      │
│    ┌──────────────────┐ ┌──────────────────┐           │
│    │ Téléchargement   │ │  Upload fichier  │           │
│    │  fichier .json   │ │    .json         │           │
│    └────────┬─────────┘ └────────┬─────────┘           │
│             │                    │                      │
└─────────────┼────────────────────┼──────────────────────┘
              │                    │
              ▼                    ▼
     ┌─────────────────────────────────────┐
     │      SYSTÈME DE FICHIERS            │
     │   (Dossier Téléchargements)         │
     │                                     │
     │  📄 neguslunar-notes-2026-01-12.json│
     │  📄 exemple-notes.json              │
     └─────────────────────────────────────┘
```

---

## 🔄 Flux de données - Export

```
┌─────────────┐
│  Utilisateur│
│  clique sur │
│  "Exporter" │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│  exportNotes()                      │
│  --------------------------------   │
│  1. Récupère notes depuis state     │
│  2. JSON.stringify(notes, null, 2)  │
│  3. Crée un Blob                    │
│  4. Génère URL temporaire           │
│  5. Crée élément <a> download       │
│  6. Déclenche téléchargement        │
│  7. Nettoie URL                     │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Navigateur télécharge le fichier   │
│  neguslunar-notes-2026-01-12.json   │
└─────────────────────────────────────┘
```

### Code simplifié
```javascript
const exportNotes = () => {
  // 1. Convertir en JSON
  const dataStr = JSON.stringify(notes, null, 2);
  
  // 2. Créer un Blob
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  // 3. Créer URL temporaire
  const url = URL.createObjectURL(dataBlob);
  
  // 4. Télécharger
  const link = document.createElement('a');
  link.href = url;
  link.download = `neguslunar-notes-${date}.json`;
  link.click();
  
  // 5. Nettoyer
  URL.revokeObjectURL(url);
};
```

---

## 🔄 Flux de données - Import

```
┌─────────────┐
│  Utilisateur│
│  clique sur │
│  "Importer" │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│  triggerFileInput()                 │
│  --------------------------------   │
│  Ouvre sélecteur de fichier         │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Utilisateur sélectionne fichier    │
│  exemple-notes.json                 │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  importNotes(event)                 │
│  --------------------------------   │
│  1. Récupère fichier                │
│  2. FileReader lit le contenu       │
│  3. JSON.parse(contenu)             │
│  4. Valide format (tableau)         │
│  5. Valide structure (champs)       │
│  6. Filtre doublons (par ID)        │
│  7. Fusionne avec notes existantes  │
│  8. setNotes([...notes, ...new])    │
│  9. Affiche message confirmation    │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  useState met à jour l'état         │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  useEffect sauvegarde localStorage  │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Interface affiche les notes        │
└─────────────────────────────────────┘
```

### Code simplifié
```javascript
const importNotes = (event) => {
  const file = event.target.files[0];
  
  const reader = new FileReader();
  reader.onload = (e) => {
    // 1. Parser JSON
    const importedNotes = JSON.parse(e.target.result);
    
    // 2. Valider
    if (!Array.isArray(importedNotes)) {
      alert('❌ Format invalide');
      return;
    }
    
    // 3. Filtrer doublons
    const existingIds = new Set(notes.map(n => n.id));
    const newNotes = importedNotes.filter(n => !existingIds.has(n.id));
    
    // 4. Fusionner
    setNotes([...notes, ...newNotes]);
    alert(`✅ ${newNotes.length} note(s) importée(s)`);
  };
  
  reader.readAsText(file);
};
```

---

## 🗄️ Structure des données

### État React (useState)
```javascript
const [notes, setNotes] = useState([
  {
    id: 1705234567890,
    text: "Ma note",
    mood: "contemplatif",
    date: "12/01/2026",
    moonPhase: "Pleine Lune"
  }
]);
```

### localStorage
```javascript
// Clé: 'negusLunarNotes'
// Valeur: JSON stringifié
localStorage.setItem('negusLunarNotes', JSON.stringify(notes));
```

### Fichier JSON exporté
```json
[
  {
    "id": 1705234567890,
    "text": "Ma note",
    "mood": "contemplatif",
    "date": "12/01/2026",
    "moonPhase": "Pleine Lune"
  }
]
```

---

## 🔒 Validation des données

### Étape 1 : Vérification du type
```javascript
if (!Array.isArray(importedNotes)) {
  alert('❌ Format de fichier invalide');
  return;
}
```

### Étape 2 : Vérification de la structure
```javascript
const isValid = importedNotes.every(note => 
  note.hasOwnProperty('id') && 
  note.hasOwnProperty('text') && 
  note.hasOwnProperty('mood')
);

if (!isValid) {
  alert('❌ Format de notes invalide');
  return;
}
```

### Étape 3 : Détection des doublons
```javascript
const existingIds = new Set(notes.map(n => n.id));
const newNotes = importedNotes.filter(n => !existingIds.has(n.id));
```

### Étape 4 : Fusion
```javascript
setNotes([...notes, ...newNotes]);
```

---

## 🎨 Composants UI

### Structure JSX
```jsx
<div className="flex items-center justify-between mb-6">
  {/* Titre */}
  <h2>Journal & Intentions</h2>
  
  {/* Boutons */}
  <div className="flex gap-3">
    {/* Export */}
    <button onClick={exportNotes} disabled={notes.length === 0}>
      <Download size={18} />
      <span className="hidden sm:inline">Exporter</span>
    </button>
    
    {/* Import */}
    <button onClick={triggerFileInput}>
      <Upload size={18} />
      <span className="hidden sm:inline">Importer</span>
    </button>
    
    {/* Input caché */}
    <input
      ref={fileInputRef}
      type="file"
      accept=".json"
      onChange={importNotes}
      className="hidden"
    />
  </div>
</div>
```

---

## 🔄 Cycle de vie complet

```
┌─────────────────────────────────────────────────────────┐
│                   CYCLE DE VIE                          │
└─────────────────────────────────────────────────────────┘

1. INITIALISATION
   ├─ Composant monte
   ├─ useEffect charge localStorage
   └─ État notes initialisé

2. CRÉATION DE NOTE
   ├─ Utilisateur écrit note
   ├─ Sélectionne humeur
   ├─ Clique "Ajouter"
   ├─ addNote() crée objet note
   ├─ setNotes([note, ...notes])
   └─ useEffect sauvegarde localStorage

3. EXPORT
   ├─ Utilisateur clique "Exporter"
   ├─ exportNotes() récupère notes
   ├─ Conversion JSON
   ├─ Création Blob
   ├─ Téléchargement fichier
   └─ Fichier dans dossier Téléchargements

4. IMPORT
   ├─ Utilisateur clique "Importer"
   ├─ Sélectionne fichier
   ├─ FileReader lit fichier
   ├─ Parsing JSON
   ├─ Validation données
   ├─ Filtrage doublons
   ├─ Fusion avec notes existantes
   ├─ setNotes([...notes, ...new])
   └─ useEffect sauvegarde localStorage

5. PERSISTANCE
   ├─ Chaque modification de notes
   ├─ useEffect déclenché
   └─ localStorage.setItem()
```

---

## 🧩 Dépendances

### React Hooks
```javascript
import { useState, useEffect, useRef } from 'react';
```

### Icônes Lucide
```javascript
import { Download, Upload } from 'lucide-react';
```

### Web APIs (natives)
- `Blob` - Création de fichiers
- `URL.createObjectURL()` - URLs temporaires
- `FileReader` - Lecture de fichiers
- `JSON.parse()` / `JSON.stringify()` - Manipulation JSON
- `localStorage` - Stockage persistant

**Aucune dépendance externe ajoutée** ✅

---

## 📊 Performance

### Complexité temporelle

| Opération | Complexité | Notes |
|-----------|-----------|-------|
| Export | O(n) | Parcours de toutes les notes |
| Import | O(n) | Lecture + validation |
| Détection doublons | O(n) | Utilisation de Set |
| Fusion | O(n) | Concaténation de tableaux |
| Sauvegarde localStorage | O(n) | Stringify de toutes les notes |

### Optimisations
- ✅ Utilisation de `Set` pour détection rapide des doublons
- ✅ `URL.revokeObjectURL()` pour éviter fuites mémoire
- ✅ Validation en une passe avec `Array.every()`
- ✅ Pas de copie inutile de données

---

## 🔐 Sécurité

### Points de sécurité
✅ **Validation stricte** : Format et structure vérifiés  
✅ **Pas d'eval()** : Utilisation sûre de JSON.parse()  
✅ **Gestion d'erreurs** : Try/catch pour parsing  
✅ **Pas de XSS** : Données traitées côté client  
✅ **Pas de serveur** : Aucune donnée envoyée en ligne  

### Limitations
⚠️ **Fichiers non cryptés** : JSON en clair  
⚠️ **Pas d'authentification** : Accessible à tous  
⚠️ **localStorage limité** : ~5-10 MB max  

---

## 🌐 Compatibilité

### Navigateurs supportés
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### APIs requises
- ✅ FileReader API (2012+)
- ✅ Blob API (2012+)
- ✅ localStorage (2009+)
- ✅ URL.createObjectURL (2012+)

**Compatibilité : 99%+ des navigateurs modernes** ✅

---

## 🐳 Docker

### Architecture avec Docker

```
┌─────────────────────────────────────────────────────────┐
│                    MACHINE HÔTE                         │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │              NAVIGATEUR WEB                       │ │
│  │  ┌─────────────────────────────────────────────┐ │ │
│  │  │     Application React (localhost:3000)      │ │ │
│  │  │     ┌──────────────┐  ┌──────────────┐     │ │ │
│  │  │     │   Export     │  │   Import     │     │ │ │
│  │  │     └──────┬───────┘  └──────┬───────┘     │ │ │
│  │  └────────────┼──────────────────┼─────────────┘ │ │
│  └───────────────┼──────────────────┼───────────────┘ │
│                  │                  │                 │
│                  ▼                  ▼                 │
│         ┌─────────────────────────────────┐          │
│         │   Système de fichiers hôte      │          │
│         │   (Dossier Téléchargements)     │          │
│         └─────────────────────────────────┘          │
│                                                       │
│  ┌───────────────────────────────────────────────────┐ │
│  │           CONTENEUR DOCKER                        │ │
│  │  ┌─────────────────────────────────────────────┐ │ │
│  │  │  Nginx (port 3000)                          │ │ │
│  │  │  Sert les fichiers statiques React          │ │ │
│  │  └─────────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

**Important** :
- Export/Import se font côté navigateur (machine hôte)
- Docker sert uniquement les fichiers statiques
- Aucune configuration Docker supplémentaire nécessaire

---

## 📈 Évolution future

### Architecture possible avec backend

```
┌─────────────────────────────────────────────────────────┐
│                    NAVIGATEUR                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Export     │  │   Import     │  │     Sync     │ │
│  │   Local      │  │   Local      │  │     Cloud    │ │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘ │
└─────────┼──────────────────┼──────────────────┼─────────┘
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────┐
│                    API BACKEND                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │  POST /export│  │ POST /import │  │  GET /sync   │ │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘ │
└─────────┼──────────────────┼──────────────────┼─────────┘
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────┐
│                  BASE DE DONNÉES                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │  users: { id, email, password }                  │  │
│  │  notes: { id, userId, text, mood, date, phase }  │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ Checklist architecture

### Frontend
- [x] Composant React fonctionnel
- [x] Hooks (useState, useEffect, useRef)
- [x] Gestion d'état locale
- [x] Validation côté client
- [x] Interface responsive

### Stockage
- [x] localStorage pour persistance
- [x] Export vers fichier JSON
- [x] Import depuis fichier JSON
- [x] Gestion des doublons

### Sécurité
- [x] Validation des données
- [x] Gestion des erreurs
- [x] Pas de code dangereux
- [x] Messages utilisateur clairs

### Performance
- [x] Algorithmes optimisés
- [x] Pas de fuites mémoire
- [x] Chargement rapide
- [x] UI réactive

### Compatibilité
- [x] Navigateurs modernes
- [x] Docker
- [x] Mobile responsive
- [x] APIs standards

---

## 🎓 Concepts techniques utilisés

### Patterns React
- ✅ Hooks personnalisés
- ✅ Lifting state up
- ✅ Controlled components
- ✅ Event handlers
- ✅ Conditional rendering

### Web APIs
- ✅ File API
- ✅ Blob API
- ✅ URL API
- ✅ Storage API

### JavaScript
- ✅ Promises
- ✅ Async/await
- ✅ Array methods
- ✅ Set data structure
- ✅ JSON manipulation

---

🌙 **Architecture conçue par Négus Dja - Guadeloupe**
