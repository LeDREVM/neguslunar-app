import { useState, useEffect, useCallback } from 'react';
import {
  loadConfig, saveConfig, clearConfig,
  testConnection, uploadToNextcloud, downloadFromNextcloud,
} from '../utils/nextcloud';
import { exportAllData, importAllData } from '../utils/database';

/**
 * États possibles de la synchronisation.
 */
export const SYNC_STATUS = {
  IDLE:        'idle',
  TESTING:     'testing',
  UPLOADING:   'uploading',
  DOWNLOADING: 'downloading',
  SUCCESS:     'success',
  ERROR:       'error',
};

export const useNextcloudSync = () => {
  const [config, setConfig]   = useState(null);   // { serverUrl, username, appPassword }
  const [status, setStatus]   = useState(SYNC_STATUS.IDLE);
  const [message, setMessage] = useState('');
  const [lastSync, setLastSync] = useState(null); // ISO string

  // Charger la config sauvegardée au montage
  useEffect(() => {
    const saved = loadConfig();
    if (saved) {
      setConfig(saved);
      setLastSync(saved.lastSync || null);
    }
  }, []);

  /** Enregistre une nouvelle configuration et teste la connexion. */
  const configure = useCallback(async (serverUrl, username, appPassword) => {
    setStatus(SYNC_STATUS.TESTING);
    setMessage('Vérification de la connexion…');

    const result = await testConnection(serverUrl, username, appPassword);

    if (!result.ok) {
      setStatus(SYNC_STATUS.ERROR);
      setMessage(result.error);
      return false;
    }

    const newConfig = { serverUrl, username, appPassword, lastSync: null };
    saveConfig(newConfig);
    setConfig(newConfig);
    setStatus(SYNC_STATUS.SUCCESS);
    setMessage('Connexion réussie ! Configuration enregistrée.');
    return true;
  }, []);

  /** Envoie les données locales vers Nextcloud. */
  const upload = useCallback(async () => {
    if (!config) return;
    setStatus(SYNC_STATUS.UPLOADING);
    setMessage('Envoi des données vers Nextcloud…');

    try {
      const data = await exportAllData();
      const result = await uploadToNextcloud(
        config.serverUrl, config.username, config.appPassword, data
      );

      if (!result.ok) {
        setStatus(SYNC_STATUS.ERROR);
        setMessage(`Échec de l'envoi : ${result.error}`);
        return false;
      }

      const now = new Date().toISOString();
      const updated = { ...config, lastSync: now };
      saveConfig(updated);
      setConfig(updated);
      setLastSync(now);
      setStatus(SYNC_STATUS.SUCCESS);
      setMessage('Données envoyées avec succès sur Nextcloud.');
      return true;
    } catch (err) {
      setStatus(SYNC_STATUS.ERROR);
      setMessage(`Erreur inattendue : ${err.message}`);
      return false;
    }
  }, [config]);

  /** Télécharge les données depuis Nextcloud et remplace les données locales. */
  const download = useCallback(async () => {
    if (!config) return;
    setStatus(SYNC_STATUS.DOWNLOADING);
    setMessage('Téléchargement depuis Nextcloud…');

    try {
      const result = await downloadFromNextcloud(
        config.serverUrl, config.username, config.appPassword
      );

      if (!result.ok) {
        setStatus(SYNC_STATUS.ERROR);
        setMessage(result.error);
        return false;
      }

      const total = await importAllData(result.data);
      const now = new Date().toISOString();
      const updated = { ...config, lastSync: now };
      saveConfig(updated);
      setConfig(updated);
      setLastSync(now);
      setStatus(SYNC_STATUS.SUCCESS);
      setMessage(`${total} éléments importés depuis Nextcloud.`);
      return { ok: true, total };
    } catch (err) {
      setStatus(SYNC_STATUS.ERROR);
      setMessage(`Erreur inattendue : ${err.message}`);
      return false;
    }
  }, [config]);

  /** Supprime la configuration locale. */
  const disconnect = useCallback(() => {
    clearConfig();
    setConfig(null);
    setLastSync(null);
    setStatus(SYNC_STATUS.IDLE);
    setMessage('');
  }, []);

  const isConfigured = Boolean(config?.serverUrl && config?.username && config?.appPassword);
  const isBusy = [SYNC_STATUS.TESTING, SYNC_STATUS.UPLOADING, SYNC_STATUS.DOWNLOADING].includes(status);

  return {
    config,
    status,
    message,
    lastSync,
    isConfigured,
    isBusy,
    configure,
    upload,
    download,
    disconnect,
  };
};
