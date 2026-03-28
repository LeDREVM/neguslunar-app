/**
 * Netlify Function — Proxy WebDAV vers Nextcloud
 * Route: /api/nc/* → ${NEXTCLOUD_URL}/remote.php/dav/...
 *
 * Contourne CORS : la function tourne côté serveur Netlify,
 * pas dans le navigateur, donc pas de restriction CORS.
 */

const NEXTCLOUD_URL = process.env.NEXTCLOUD_URL || 'https://ledream.kflw.io';

export const handler = async (event) => {
  // Le chemin reçu est /api/nc/remote.php/dav/...
  // On retire /api/nc pour obtenir /remote.php/dav/...
  const davPath = event.path.replace(/^\/?api\/nc/, '') || '/';
  const targetUrl = `${NEXTCLOUD_URL.replace(/\/+$/, '')}${davPath}`;

  // Transmettre les query params si présents
  const qs = event.rawQuery ? `?${event.rawQuery}` : '';
  const url = `${targetUrl}${qs}`;

  // Headers à transmettre (sauf host)
  const forwardHeaders = {};
  for (const [k, v] of Object.entries(event.headers || {})) {
    const lower = k.toLowerCase();
    if (!['host', 'connection', 'transfer-encoding'].includes(lower)) {
      forwardHeaders[k] = v;
    }
  }

  try {
    const response = await fetch(url, {
      method: event.httpMethod,
      headers: forwardHeaders,
      body: ['GET', 'HEAD', 'OPTIONS'].includes(event.httpMethod)
        ? undefined
        : event.body
          ? Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8')
          : undefined
    });

    // Lire le body de la réponse
    const responseBuffer = await response.arrayBuffer();
    const responseBody = Buffer.from(responseBuffer).toString('base64');

    // Headers de réponse — ajouter CORS
    const responseHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PROPFIND, MKCOL, OPTIONS',
      'Access-Control-Allow-Headers': 'Authorization, Content-Type, Depth, X-Requested-With',
      'Access-Control-Allow-Credentials': 'true'
    };

    // Copier les headers de Nextcloud (sauf ceux qui posent problème)
    for (const [k, v] of response.headers.entries()) {
      const lower = k.toLowerCase();
      if (!['transfer-encoding', 'connection'].includes(lower)) {
        responseHeaders[k] = v;
      }
    }

    return {
      statusCode: response.status,
      headers: responseHeaders,
      body: responseBody,
      isBase64Encoded: true
    };

  } catch (err) {
    return {
      statusCode: 502,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Proxy error', message: err.message })
    };
  }
};
