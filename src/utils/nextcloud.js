/**
 * Synchronisation Nextcloud via WebDAV
 * Stocke la base de données NegusLunar dans un fichier JSON sur Nextcloud.
 *
 * Chemin Nextcloud : /NegusLunar/backup.json
 */

const BACKUP_DIR  = 'NegusLunar';
const BACKUP_FILE = 'backup.json';

/**
 * Construit les headers d'authentification Basic Auth.
 */
const authHeaders = (username, appPassword) => ({
  Authorization: 'Basic ' + btoa(`${username}:${appPassword}`),
  'Content-Type': 'application/json',
});

/**
 * URL WebDAV du fichier de backup.
 * @param {string} serverUrl  - ex: https://cloud.example.com
 * @param {string} username
 */
const backupUrl = (serverUrl, username) => {
  const base = serverUrl.replace(/\/$/, '');
  return `${base}/remote.php/dav/files/${encodeURIComponent(username)}/${BACKUP_DIR}/${BACKUP_FILE}`;
};

/**
 * URL WebDAV du dossier NegusLunar.
 */
const dirUrl = (serverUrl, username) => {
  const base = serverUrl.replace(/\/$/, '');
  return `${base}/remote.php/dav/files/${encodeURIComponent(username)}/${BACKUP_DIR}`;
};

/**
 * Teste la connexion Nextcloud (vérifie les credentials).
 * @returns {{ ok: boolean, error?: string }}
 */
export const testConnection = async (serverUrl, username, appPassword) => {
  try {
    const url = dirUrl(serverUrl, username);
    const res = await fetch(url, {
      method: 'PROPFIND',
      headers: {
        ...authHeaders(username, appPassword),
        Depth: '0',
      },
    });

    if (res.status === 404) {
      // Le dossier n'existe pas encore — c'est OK, on le créera à l'upload
      return { ok: true };
    }
    if (res.status === 401) {
      return { ok: false, error: 'Identifiants incorrects (401 Unauthorized).' };
    }
    if (res.status === 403) {
      return { ok: false, error: 'Accès refusé (403 Forbidden). Vérifiez les permissions.' };
    }
    if (!res.ok) {
      return { ok: false, error: `Erreur serveur : ${res.status} ${res.statusText}` };
    }

    return { ok: true };
  } catch (err) {
    if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
      return { ok: false, error: 'Impossible de joindre le serveur. Vérifiez l\'URL et la connexion.' };
    }
    return { ok: false, error: err.message };
  }
};

/**
 * Crée le dossier NegusLunar sur Nextcloud s'il n'existe pas.
 */
const ensureDir = async (serverUrl, username, appPassword) => {
  const url = dirUrl(serverUrl, username);

  // Vérifier si le dossier existe
  const check = await fetch(url, {
    method: 'PROPFIND',
    headers: { ...authHeaders(username, appPassword), Depth: '0' },
  });

  if (check.status === 404) {
    const create = await fetch(url, {
      method: 'MKCOL',
      headers: authHeaders(username, appPassword),
    });
    if (!create.ok && create.status !== 405) {
      throw new Error(`Impossible de créer le dossier NegusLunar : ${create.status}`);
    }
  }
};

/**
 * Envoie les données vers Nextcloud (upload).
 * @param {object} data  - Résultat de exportAllData()
 * @returns {{ ok: boolean, error?: string }}
 */
export const uploadToNextcloud = async (serverUrl, username, appPassword, data) => {
  try {
    await ensureDir(serverUrl, username, appPassword);

    const url = backupUrl(serverUrl, username);
    const body = JSON.stringify(data, null, 2);

    const res = await fetch(url, {
      method: 'PUT',
      headers: authHeaders(username, appPassword),
      body,
    });

    if (!res.ok) {
      return { ok: false, error: `Erreur upload : ${res.status} ${res.statusText}` };
    }

    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
};

/**
 * Récupère les données depuis Nextcloud (download).
 * @returns {{ ok: boolean, data?: object, error?: string, notFound?: boolean }}
 */
export const downloadFromNextcloud = async (serverUrl, username, appPassword) => {
  try {
    const url = backupUrl(serverUrl, username);

    const res = await fetch(url, {
      method: 'GET',
      headers: authHeaders(username, appPassword),
    });

    if (res.status === 404) {
      return { ok: false, notFound: true, error: 'Aucune sauvegarde trouvée sur Nextcloud.' };
    }
    if (!res.ok) {
      return { ok: false, error: `Erreur download : ${res.status} ${res.statusText}` };
    }

    const data = await res.json();
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: err.message };
  }
};

/**
 * Sauvegarde / récupère la config Nextcloud dans localStorage.
 */
const CONFIG_KEY = 'neguslunar-nextcloud-config';

export const saveConfig = (config) => {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
};

export const loadConfig = () => {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const clearConfig = () => {
  localStorage.removeItem(CONFIG_KEY);
};
