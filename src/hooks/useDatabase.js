import { useState, useEffect, useCallback } from 'react';
import { getAllItems, setItem, deleteItem, STORES } from '../utils/database';

/**
 * Hook personnalisé pour gérer les données avec IndexedDB
 * @param {string} storeName - Nom du store à utiliser
 * @param {string} localStorageKey - Clé localStorage pour la migration (optionnel)
 */
export const useDatabase = (storeName, localStorageKey = null) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les données depuis IndexedDB
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Vérifier si migration depuis localStorage est nécessaire
      if (localStorageKey) {
        const localData = localStorage.getItem(localStorageKey);
        if (localData) {
          const parsedData = JSON.parse(localData);
          
          // Migrer vers IndexedDB
          for (const item of parsedData) {
            await setItem(storeName, item);
          }
          
          // Nettoyer localStorage après migration
          localStorage.removeItem(localStorageKey);
          console.log(`✅ Migration de ${localStorageKey} vers IndexedDB terminée`);
        }
      }

      // Charger depuis IndexedDB
      const items = await getAllItems(storeName);
      setData(items);
    } catch (err) {
      console.error(`Erreur lors du chargement depuis ${storeName}:`, err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [storeName, localStorageKey]);

  // Charger les données au montage
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Ajouter ou mettre à jour un élément
  const addItem = useCallback(async (item) => {
    try {
      await setItem(storeName, item);
      await loadData();
      return true;
    } catch (err) {
      console.error(`Erreur lors de l'ajout dans ${storeName}:`, err);
      setError(err);
      return false;
    }
  }, [storeName, loadData]);

  // Supprimer un élément
  const removeItem = useCallback(async (key) => {
    try {
      await deleteItem(storeName, key);
      await loadData();
      return true;
    } catch (err) {
      console.error(`Erreur lors de la suppression depuis ${storeName}:`, err);
      setError(err);
      return false;
    }
  }, [storeName, loadData]);

  // Mettre à jour plusieurs éléments
  const updateItems = useCallback(async (items) => {
    try {
      for (const item of items) {
        await setItem(storeName, item);
      }
      await loadData();
      return true;
    } catch (err) {
      console.error(`Erreur lors de la mise à jour dans ${storeName}:`, err);
      setError(err);
      return false;
    }
  }, [storeName, loadData]);

  return {
    data,
    loading,
    error,
    addItem,
    removeItem,
    updateItems,
    reload: loadData
  };
};

/**
 * Hook pour les notes
 */
export const useNotes = () => {
  return useDatabase(STORES.NOTES, 'negusLunarNotes');
};

/**
 * Hook pour l'historique d'humeur
 */
export const useMoodHistory = () => {
  return useDatabase(STORES.MOOD_HISTORY, 'negusLunarMoodHistory');
};

/**
 * Hook pour les projets de travail
 */
export const useWorkProjects = () => {
  return useDatabase(STORES.WORK_PROJECTS, 'workProjects');
};

/**
 * Hook pour les sessions de travail
 */
export const useWorkSessions = () => {
  return useDatabase(STORES.WORK_SESSIONS, 'workSessions');
};

/**
 * Hook pour les sessions de jeûne
 */
export const useFastingSessions = () => {
  return useDatabase(STORES.FASTING_SESSIONS, 'fastingSessions');
};

/**
 * Hook pour les plans de repas
 */
export const useMealPlans = () => {
  return useDatabase(STORES.MEAL_PLANS, 'mealPlans');
};
