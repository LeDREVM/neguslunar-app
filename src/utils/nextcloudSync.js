/**
 * Nextcloud WebDAV sync utility
 * Syncs ALL data per profile to Nextcloud.
 *
 * Remote structure:
 *   /NegusLunar/{profileId}/fasting-history.json
 *   /NegusLunar/{profileId}/daily-meals.json
 *   /NegusLunar/{profileId}/daily-exercises.json
 *   /NegusLunar/{profileId}/shopping-list.json
 *   /NegusLunar/{profileId}/meal-goals.json
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

// En dev : proxy Vite /nc. En prod : proxy Netlify Function /api/nc.
// Les deux évitent le CORS sans toucher au serveur Nextcloud.
const buildUrl = (username, remotePath) => {
  const prefix = import.meta.env.DEV ? '/nc' : '/api/nc';
  return `${prefix}/remote.php/dav/files/${encodeURIComponent(username)}${remotePath}`;
};

const authHeader = (username, password) =>
  'Basic ' + btoa(`${username}:${password}`);

const ensureRemoteDir = async (username, password, dirPath) => {
  const url = buildUrl(username, dirPath);
  await fetch(url, {
    method: 'MKCOL',
    headers: { Authorization: authHeader(username, password) }
  });
};

// ── Single file operations ────────────────────────────────────────────────────

const pushFile = async (username, password, filePath, payload) => {
  const url = buildUrl(username, filePath);
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: authHeader(username, password),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload, null, 2)
  });
  return res.ok || res.status === 201 || res.status === 204;
};

const pullFile = async (username, password, filePath) => {
  const url = buildUrl(username, filePath);
  const res = await fetch(url, {
    method: 'GET',
    headers: { Authorization: authHeader(username, password) }
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
};

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Test Nextcloud connection.
 */
export const testNextcloudConnection = async (serverUrl, username, password) => {
  try {
    const url = buildUrl(username, '/');
    const res = await fetch(url, {
      method: 'PROPFIND',
      headers: { Authorization: authHeader(username, password), Depth: '0' }
    });
    if (res.ok || res.status === 207) return { success: true, message: 'Connexion réussie !' };
    if (res.status === 401) return { success: false, message: 'Identifiants incorrects.' };
    return { success: false, message: `Erreur: ${res.status} ${res.statusText}` };
  } catch (err) {
    return { success: false, message: `Impossible de joindre le serveur: ${err.message}` };
  }
};

/**
 * Sync a single module to Nextcloud.
 * @param {string} profileId
 * @param {string} module  - 'fasting' | 'meals' | 'exercises' | 'shopping' | 'goals'
 * @param {any}    data    - array or object
 * @param {object} config  - { username, password }
 */
export const syncModule = async (profileId, module, data, config) => {
  const { username, password } = config;
  try {
    await ensureRemoteDir(username, password, '/NegusLunar');
    await ensureRemoteDir(username, password, `/NegusLunar/${profileId}`);

    const fileMap = {
      fasting:   'fasting-history.json',
      meals:     'daily-meals.json',
      exercises: 'daily-exercises.json',
      shopping:  'shopping-list.json',
      goals:     'meal-goals.json',
      sport:     'sport-reports.json'
    };

    const filename = fileMap[module];
    if (!filename) return { success: false, message: `Module inconnu: ${module}` };

    const ok = await pushFile(username, password, `/NegusLunar/${profileId}/${filename}`, {
      profileId,
      module,
      syncDate: new Date().toISOString(),
      data
    });

    return ok
      ? { success: true, message: `${module} synchronisé.` }
      : { success: false, message: `Échec de l'envoi.` };
  } catch (err) {
    return { success: false, message: `Erreur: ${err.message}` };
  }
};

/**
 * Fetch a single module from Nextcloud.
 */
export const fetchModule = async (profileId, module, config) => {
  const { username, password } = config;
  const fileMap = {
    fasting:   'fasting-history.json',
    meals:     'daily-meals.json',
    exercises: 'daily-exercises.json',
    shopping:  'shopping-list.json',
    goals:     'meal-goals.json'
  };
  const filename = fileMap[module];
  if (!filename) return { success: false, data: null };

  try {
    const json = await pullFile(username, password, `/NegusLunar/${profileId}/${filename}`);
    return { success: true, data: json?.data ?? null };
  } catch (err) {
    return { success: false, data: null, message: err.message };
  }
};

/**
 * Sync ALL modules at once.
 * @param {string} profileId
 * @param {object} allData  - { fasting, meals, exercises, shopping, goals }
 * @param {object} config
 */
export const syncAllModules = async (profileId, allData, config) => {
  const results = {};
  for (const [module, data] of Object.entries(allData)) {
    if (data !== undefined && data !== null) {
      results[module] = await syncModule(profileId, module, data, config);
    }
  }
  const allOk = Object.values(results).every(r => r.success);
  return {
    success: allOk,
    results,
    message: allOk
      ? 'Toutes les données synchronisées !'
      : 'Certains modules ont échoué.'
  };
};

/**
 * Fetch ALL modules from Nextcloud.
 */
export const fetchAllModules = async (profileId, config) => {
  const modules = ['fasting', 'meals', 'exercises', 'shopping', 'goals', 'sport'];
  const results = {};
  for (const module of modules) {
    results[module] = await fetchModule(profileId, module, config);
  }
  return results;
};

// ─── Legacy compat (used by IntermittentFasting) ─────────────────────────────
export const syncToNextcloud = (profileId, history, config) =>
  syncModule(profileId, 'fasting', history, config);

export const fetchFromNextcloud = async (profileId, config) => {
  const r = await fetchModule(profileId, 'fasting', config);
  return { success: r.success, data: Array.isArray(r.data) ? r.data : [] };
};
