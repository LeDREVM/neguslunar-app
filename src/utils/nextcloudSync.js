/**
 * Nextcloud WebDAV sync utility
 * Syncs fasting data per profile to a Nextcloud instance.
 *
 * Remote path structure:
 *   /NegusLunar/{profileId}/fasting-history.json
 */

const NEXTCLOUD_CONFIG_KEY = 'neguslunar-nextcloud-config';

// ── Config helpers ────────────────────────────────────────────────────────────

export const saveNextcloudConfig = (config) => {
  localStorage.setItem(NEXTCLOUD_CONFIG_KEY, JSON.stringify(config));
};

export const loadNextcloudConfig = () => {
  const raw = localStorage.getItem(NEXTCLOUD_CONFIG_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const clearNextcloudConfig = () => {
  localStorage.removeItem(NEXTCLOUD_CONFIG_KEY);
};

// ── WebDAV helpers ────────────────────────────────────────────────────────────

const buildUrl = (serverUrl, username, remotePath) => {
  // En développement, on passe par le proxy Vite (/nc) pour éviter les erreurs CORS.
  // En production (build), on utilise l'URL directe du serveur.
  const base = import.meta.env.DEV
    ? '/nc'
    : serverUrl.replace(/\/$/, '');
  return `${base}/remote.php/dav/files/${encodeURIComponent(username)}${remotePath}`;
};

const authHeader = (username, password) =>
  'Basic ' + btoa(`${username}:${password}`);

/**
 * Ensure the remote directory exists (MKCOL).
 * Nextcloud returns 405 if already exists — that's fine.
 */
const ensureRemoteDir = async (serverUrl, username, password, dirPath) => {
  const url = buildUrl(serverUrl, username, dirPath);
  await fetch(url, {
    method: 'MKCOL',
    headers: { Authorization: authHeader(username, password) }
  });
  // Ignore errors — directory may already exist
};

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Upload fasting history for a given profile to Nextcloud.
 * @param {string} profileId  - e.g. 'negus-dja'
 * @param {Array}  history    - array of fasting session objects
 * @param {object} config     - { serverUrl, username, password }
 * @returns {{ success: boolean, message: string }}
 */
export const syncToNextcloud = async (profileId, history, config) => {
  const { serverUrl, username, password } = config;

  if (!serverUrl || !username || !password) {
    return { success: false, message: 'Configuration Nextcloud incomplète.' };
  }

  try {
    // Ensure parent dirs exist
    await ensureRemoteDir(serverUrl, username, password, '/NegusLunar');
    await ensureRemoteDir(serverUrl, username, password, `/NegusLunar/${profileId}`);

    const filePath = `/NegusLunar/${profileId}/fasting-history.json`;
    const url = buildUrl(serverUrl, username, filePath);

    const payload = JSON.stringify({
      profileId,
      syncDate: new Date().toISOString(),
      sessions: history
    }, null, 2);

    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: authHeader(username, password),
        'Content-Type': 'application/json'
      },
      body: payload
    });

    if (res.ok || res.status === 201 || res.status === 204) {
      return { success: true, message: `Synchronisé avec succès (${history.length} session(s)).` };
    }

    return { success: false, message: `Erreur Nextcloud: ${res.status} ${res.statusText}` };
  } catch (err) {
    return { success: false, message: `Erreur réseau: ${err.message}` };
  }
};

/**
 * Download fasting history for a given profile from Nextcloud.
 * @returns {{ success: boolean, data?: Array, message: string }}
 */
export const fetchFromNextcloud = async (profileId, config) => {
  const { serverUrl, username, password } = config;

  try {
    const filePath = `/NegusLunar/${profileId}/fasting-history.json`;
    const url = buildUrl(serverUrl, username, filePath);

    const res = await fetch(url, {
      method: 'GET',
      headers: { Authorization: authHeader(username, password) }
    });

    if (res.status === 404) {
      return { success: true, data: [], message: 'Aucune donnée distante trouvée.' };
    }

    if (!res.ok) {
      return { success: false, message: `Erreur Nextcloud: ${res.status} ${res.statusText}` };
    }

    const json = await res.json();
    return { success: true, data: json.sessions || [], message: `${json.sessions?.length || 0} session(s) récupérée(s).` };
  } catch (err) {
    return { success: false, message: `Erreur réseau: ${err.message}` };
  }
};

/**
 * Test connection to Nextcloud (PROPFIND on root).
 */
export const testNextcloudConnection = async (serverUrl, username, password) => {
  try {
    const base = import.meta.env.DEV ? '/nc' : serverUrl.replace(/\/$/, '');
    const url = `${base}/remote.php/dav/files/${encodeURIComponent(username)}/`;
    const res = await fetch(url, {
      method: 'PROPFIND',
      headers: {
        Authorization: authHeader(username, password),
        Depth: '0'
      }
    });
    if (res.ok || res.status === 207) {
      return { success: true, message: 'Connexion réussie !' };
    }
    if (res.status === 401) {
      return { success: false, message: 'Identifiants incorrects.' };
    }
    return { success: false, message: `Erreur: ${res.status} ${res.statusText}` };
  } catch (err) {
    return { success: false, message: `Impossible de joindre le serveur: ${err.message}` };
  }
};
