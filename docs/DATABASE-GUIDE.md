# 🗄️ Guide de la Base de Données NegusLunar

## 📊 Architecture

NegusLunar utilise **IndexedDB** pour une gestion robuste et performante des données côté client.

### Avantages d'IndexedDB

✅ **Performance** : Stockage asynchrone et non-bloquant  
✅ **Capacité** : Plusieurs centaines de Mo de données  
✅ **Structure** : Base de données NoSQL avec index  
✅ **Fiabilité** : Transactions ACID  
✅ **Hors ligne** : Fonctionne sans connexion internet  

---

## 🏗️ Structure de la Base de Données

### Stores (Tables)

| Store | Description | Clé primaire | Index |
|-------|-------------|--------------|-------|
| `notes` | Notes et intentions lunaires | `id` | `date`, `mood`, `moonPhase` |
| `moodHistory` | Historique d'humeur quotidien | `date` | `mood`, `moonPhase` |
| `workProjects` | Projets professionnels | `id` | `name`, `createdAt` |
| `workSessions` | Sessions de travail | `id` | `projectId`, `date` |
| `fastingSessions` | Sessions de jeûne intermittent | `id` | `startTime`, `endTime` |
| `mealPlans` | Plans de repas | `id` | `date` |
| `userSettings` | Paramètres utilisateur | `key` | - |

---

## 🔧 Utilisation

### 1. Hooks Personnalisés

Les hooks React facilitent l'utilisation de la base de données :

```javascript
import { useNotes, useMoodHistory } from '../hooks/useDatabase';

function MyComponent() {
  const { data: notes, addItem, removeItem, loading } = useNotes();
  
  // Ajouter une note
  const handleAddNote = async () => {
    await addItem({
      id: Date.now(),
      text: 'Ma nouvelle note',
      mood: 'calme',
      date: new Date().toLocaleDateString('fr-FR'),
      moonPhase: 'Pleine Lune'
    });
  };
  
  // Supprimer une note
  const handleDeleteNote = async (id) => {
    await removeItem(id);
  };
  
  return (
    <div>
      {loading ? 'Chargement...' : `${notes.length} notes`}
    </div>
  );
}
```

### 2. API Directe

Pour des opérations avancées, utilisez l'API directement :

```javascript
import { setItem, getItem, getAllItems, deleteItem, STORES } from '../utils/database';

// Ajouter un élément
await setItem(STORES.NOTES, {
  id: 123,
  text: 'Note importante',
  date: '2026-02-07'
});

// Récupérer un élément
const note = await getItem(STORES.NOTES, 123);

// Récupérer tous les éléments
const allNotes = await getAllItems(STORES.NOTES);

// Supprimer un élément
await deleteItem(STORES.NOTES, 123);
```

---

## 📤 Export / Import

### Exporter toutes les données

```javascript
import { exportAllData } from '../utils/database';

const backup = await exportAllData();
// Retourne un objet avec toutes les données
```

### Importer des données

```javascript
import { importAllData } from '../utils/database';

await importAllData(backupData);
// Importe et fusionne les données
```

---

## 🔄 Migration depuis localStorage

La migration est **automatique** au premier chargement :

1. Le hook vérifie si des données existent dans localStorage
2. Les données sont copiées vers IndexedDB
3. localStorage est nettoyé après migration réussie

### Clés localStorage migrées

- `negusLunarNotes` → `notes`
- `negusLunarMoodHistory` → `moodHistory`
- `workProjects` → `workProjects`
- `workSessions` → `workSessions`

---

## 🛡️ Gestion des Erreurs

Toutes les opérations incluent une gestion d'erreurs :

```javascript
const { data, error, loading } = useNotes();

if (loading) return <div>Chargement...</div>;
if (error) return <div>Erreur : {error.message}</div>;

return <div>{data.length} notes chargées</div>;
```

---

## 🔍 Recherche par Index

Utilisez les index pour des recherches rapides :

```javascript
import { getByIndex, STORES } from '../utils/database';

// Trouver toutes les notes d'une humeur spécifique
const calmNotes = await getByIndex(STORES.NOTES, 'mood', 'calme');

// Trouver toutes les notes d'une phase lunaire
const fullMoonNotes = await getByIndex(STORES.NOTES, 'moonPhase', 'Pleine Lune');
```

---

## 💾 Sauvegarde et Restauration

### Créer une sauvegarde

1. Cliquez sur **Exporter** dans la section Notes
2. Un fichier JSON est téléchargé avec toutes vos données
3. Format : `neguslunar-backup-YYYY-MM-DD.json`

### Restaurer une sauvegarde

1. Cliquez sur **Importer**
2. Sélectionnez votre fichier de sauvegarde
3. Les données sont fusionnées (pas de perte)
4. La page se recharge automatiquement

---

## 📈 Performance

### Optimisations

✅ **Transactions** : Toutes les opérations utilisent des transactions  
✅ **Index** : Recherches rapides sur les champs fréquents  
✅ **Asynchrone** : Pas de blocage de l'interface  
✅ **Cache** : Les hooks React mettent en cache les données  

### Capacité

- **Limite théorique** : Plusieurs centaines de Mo
- **Limite pratique** : Dépend du navigateur
  - Chrome/Edge : ~60% de l'espace disque disponible
  - Firefox : ~50% de l'espace disque disponible
  - Safari : ~1 Go

---

## 🔐 Sécurité

### Données locales

- Les données sont stockées **localement** sur votre appareil
- Aucune synchronisation cloud par défaut
- Accès limité au domaine de l'application

### Confidentialité

- Aucune donnée n'est envoyée à un serveur
- Tout reste sur votre appareil
- Vous contrôlez vos exports/imports

---

## 🐛 Débogage

### Console du navigateur

Ouvrez la console (F12) pour voir les logs :

```
✅ Migration de negusLunarNotes vers IndexedDB terminée
✅ 15 notes migrées
✅ 7 entrées d'humeur migrées
```

### Inspecter IndexedDB

1. Ouvrez les DevTools (F12)
2. Allez dans l'onglet **Application** (Chrome) ou **Storage** (Firefox)
3. Développez **IndexedDB** → **NegusLunarDB**
4. Explorez les stores et leurs données

---

## 🔄 Mise à jour de la Structure

Si la structure de la base de données change :

1. Incrémentez `DB_VERSION` dans `database.js`
2. Ajoutez la logique de migration dans `onupgradeneeded`
3. Les utilisateurs existants seront automatiquement migrés

---

## 💡 Bonnes Pratiques

### ✅ À faire

- Utiliser les hooks personnalisés pour la simplicité
- Exporter régulièrement vos données importantes
- Vérifier `loading` avant d'afficher les données
- Gérer les erreurs avec `error`

### ❌ À éviter

- Ne pas modifier directement IndexedDB sans les helpers
- Ne pas stocker de données sensibles sans chiffrement
- Ne pas oublier d'attendre les opérations asynchrones

---

## 📚 Ressources

- [MDN - IndexedDB API](https://developer.mozilla.org/fr/docs/Web/API/IndexedDB_API)
- [Can I use IndexedDB](https://caniuse.com/indexeddb)
- [IndexedDB Best Practices](https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/indexeddb-best-practices)

---

## 🎉 Conclusion

La base de données IndexedDB de NegusLunar offre :

- 🚀 **Performance** maximale
- 💾 **Stockage** robuste
- 🔒 **Sécurité** locale
- 📤 **Export/Import** facile
- 🔄 **Migration** automatique

Vos données lunaires sont entre de bonnes mains ! 🌙

---

*Créé avec 🌙 par Négus Dja • Guadeloupe*
