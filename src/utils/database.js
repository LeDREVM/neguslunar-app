/**
 * Base de données IndexedDB pour NegusLunar
 * Gestion robuste et performante des données
 */

const DB_NAME = 'NegusLunarDB';
const DB_VERSION = 1;

// Stores (tables) de la base de données
const STORES = {
  NOTES: 'notes',
  MOOD_HISTORY: 'moodHistory',
  WORK_PROJECTS: 'workProjects',
  WORK_SESSIONS: 'workSessions',
  FASTING_SESSIONS: 'fastingSessions',
  MEAL_PLANS: 'mealPlans',
  USER_SETTINGS: 'userSettings'
};

/**
 * Initialiser la base de données
 */
export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error('Erreur lors de l\'ouverture de la base de données');
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Store pour les notes
      if (!db.objectStoreNames.contains(STORES.NOTES)) {
        const notesStore = db.createObjectStore(STORES.NOTES, { keyPath: 'id' });
        notesStore.createIndex('date', 'date', { unique: false });
        notesStore.createIndex('mood', 'mood', { unique: false });
        notesStore.createIndex('moonPhase', 'moonPhase', { unique: false });
      }

      // Store pour l'historique d'humeur
      if (!db.objectStoreNames.contains(STORES.MOOD_HISTORY)) {
        const moodStore = db.createObjectStore(STORES.MOOD_HISTORY, { keyPath: 'date' });
        moodStore.createIndex('mood', 'mood', { unique: false });
        moodStore.createIndex('moonPhase', 'moonPhase', { unique: false });
      }

      // Store pour les projets de travail
      if (!db.objectStoreNames.contains(STORES.WORK_PROJECTS)) {
        const projectsStore = db.createObjectStore(STORES.WORK_PROJECTS, { keyPath: 'id' });
        projectsStore.createIndex('name', 'name', { unique: false });
        projectsStore.createIndex('createdAt', 'createdAt', { unique: false });
      }

      // Store pour les sessions de travail
      if (!db.objectStoreNames.contains(STORES.WORK_SESSIONS)) {
        const sessionsStore = db.createObjectStore(STORES.WORK_SESSIONS, { keyPath: 'id' });
        sessionsStore.createIndex('projectId', 'projectId', { unique: false });
        sessionsStore.createIndex('date', 'date', { unique: false });
      }

      // Store pour les sessions de jeûne
      if (!db.objectStoreNames.contains(STORES.FASTING_SESSIONS)) {
        const fastingStore = db.createObjectStore(STORES.FASTING_SESSIONS, { keyPath: 'id' });
        fastingStore.createIndex('startTime', 'startTime', { unique: false });
        fastingStore.createIndex('endTime', 'endTime', { unique: false });
      }

      // Store pour les plans de repas
      if (!db.objectStoreNames.contains(STORES.MEAL_PLANS)) {
        const mealPlansStore = db.createObjectStore(STORES.MEAL_PLANS, { keyPath: 'id' });
        mealPlansStore.createIndex('date', 'date', { unique: false });
      }

      // Store pour les paramètres utilisateur
      if (!db.objectStoreNames.contains(STORES.USER_SETTINGS)) {
        db.createObjectStore(STORES.USER_SETTINGS, { keyPath: 'key' });
      }
    };
  });
};

/**
 * Obtenir une connexion à la base de données
 */
const getDB = async () => {
  return await initDB();
};

/**
 * Ajouter ou mettre à jour un élément
 */
export const setItem = async (storeName, item) => {
  try {
    const db = await getDB();
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.put(item);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error(`Erreur lors de l'ajout dans ${storeName}:`, error);
    throw error;
  }
};

/**
 * Obtenir un élément par sa clé
 */
export const getItem = async (storeName, key) => {
  try {
    const db = await getDB();
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.get(key);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error(`Erreur lors de la récupération depuis ${storeName}:`, error);
    throw error;
  }
};

/**
 * Obtenir tous les éléments d'un store
 */
export const getAllItems = async (storeName) => {
  try {
    const db = await getDB();
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error(`Erreur lors de la récupération de tous les éléments de ${storeName}:`, error);
    return [];
  }
};

/**
 * Supprimer un élément
 */
export const deleteItem = async (storeName, key) => {
  try {
    const db = await getDB();
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.delete(key);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error(`Erreur lors de la suppression depuis ${storeName}:`, error);
    throw error;
  }
};

/**
 * Supprimer tous les éléments d'un store
 */
export const clearStore = async (storeName) => {
  try {
    const db = await getDB();
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.clear();
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error(`Erreur lors du nettoyage de ${storeName}:`, error);
    throw error;
  }
};

/**
 * Rechercher des éléments par index
 */
export const getByIndex = async (storeName, indexName, value) => {
  try {
    const db = await getDB();
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    const index = store.index(indexName);
    
    return new Promise((resolve, reject) => {
      const request = index.getAll(value);
      
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error(`Erreur lors de la recherche par index dans ${storeName}:`, error);
    return [];
  }
};

/**
 * Migrer les données depuis localStorage vers IndexedDB
 */
export const migrateFromLocalStorage = async () => {
  try {
    // Migrer les notes
    const savedNotes = localStorage.getItem('negusLunarNotes');
    if (savedNotes) {
      const notes = JSON.parse(savedNotes);
      for (const note of notes) {
        await setItem(STORES.NOTES, note);
      }
      console.log(`✅ ${notes.length} notes migrées`);
    }

    // Migrer l'historique d'humeur
    const savedMoodHistory = localStorage.getItem('negusLunarMoodHistory');
    if (savedMoodHistory) {
      const moodHistory = JSON.parse(savedMoodHistory);
      for (const mood of moodHistory) {
        await setItem(STORES.MOOD_HISTORY, mood);
      }
      console.log(`✅ ${moodHistory.length} entrées d'humeur migrées`);
    }

    // Migrer les projets de travail
    const savedProjects = localStorage.getItem('workProjects');
    if (savedProjects) {
      const projects = JSON.parse(savedProjects);
      for (const project of projects) {
        await setItem(STORES.WORK_PROJECTS, project);
      }
      console.log(`✅ ${projects.length} projets migrés`);
    }

    // Migrer les sessions de travail
    const savedSessions = localStorage.getItem('workSessions');
    if (savedSessions) {
      const sessions = JSON.parse(savedSessions);
      for (const session of sessions) {
        await setItem(STORES.WORK_SESSIONS, session);
      }
      console.log(`✅ ${sessions.length} sessions migrées`);
    }

    console.log('✅ Migration terminée avec succès !');
    return true;
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
    return false;
  }
};

/**
 * Exporter toutes les données
 */
export const exportAllData = async () => {
  try {
    const data = {};
    
    for (const storeName of Object.values(STORES)) {
      data[storeName] = await getAllItems(storeName);
    }
    
    return {
      version: DB_VERSION,
      exportDate: new Date().toISOString(),
      data
    };
  } catch (error) {
    console.error('Erreur lors de l\'export:', error);
    throw error;
  }
};

/**
 * Importer des données
 */
export const importAllData = async (importData) => {
  try {
    if (!importData.data) {
      throw new Error('Format de données invalide');
    }

    let totalImported = 0;

    for (const [storeName, items] of Object.entries(importData.data)) {
      if (Object.values(STORES).includes(storeName) && Array.isArray(items)) {
        for (const item of items) {
          await setItem(storeName, item);
          totalImported++;
        }
      }
    }

    console.log(`✅ ${totalImported} éléments importés`);
    return totalImported;
  } catch (error) {
    console.error('Erreur lors de l\'import:', error);
    throw error;
  }
};

// Exporter les constantes
export { STORES };

// Initialiser la base de données au chargement du module
initDB().catch(console.error);
