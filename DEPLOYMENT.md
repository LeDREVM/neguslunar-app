# Déploiement NegusLunar sur Vercel

## Architecture
- **Frontend:** Vercel (React/Vite) → `deuzy.xyz`
- **Backend:** API Node.js → `api.ledream.kflw.io` ou `deuzy.xyz/api`

## Étape 1 : Préparer le frontend

### 1.1 Variables d'environnement
Vercel utilise les variables d'environnement du projet. Vous avez deux choix:

**Option A: Backend sur sous-domaine (recommandé)**
```
VITE_API_URL=https://api.ledream.kflw.io
```

**Option B: Backend sur même domaine (/api)**
```
VITE_API_URL=https://deuzy.xyz/api
```
(Nécessite proxy nginx/Caddy)

### 1.2 Vérifier package.json
Assurez-vous que `package.json` contient:
```json
{
  "scripts": {
    "build": "vite build",
    "dev": "vite",
    "preview": "vite preview"
  }
}
```

## Étape 2 : Déployer sur Vercel

### 2.1 Créer un compte Vercel
- Allez sur https://vercel.com
- Connectez-vous avec GitHub/GitLab/Bitbucket
- Ou créez un compte email

### 2.2 Importer le projet
1. Connectez votre dépôt Git (GitHub/GitLab/etc.)
2. Vercel détectera automatiquement:
   - Framework: Vite ✓
   - Build Command: `npm run build` ✓
   - Output Directory: `dist` ✓
3. **Avant de déployer**, allez à Settings → Environment Variables et ajoutez:
   ```
   VITE_API_URL = https://api.ledream.kflw.io
   ```
4. Cliquez **Deploy**

**OU via CLI Vercel:**
```bash
npm install -g vercel
vercel login
vercel --env VITE_API_URL=https://api.ledream.kflw.io
```

### 2.3 Résultat
Vercel vous donnera une URL: `https://neguslunar-app.vercel.app`

## Étape 3 : Configurer le domaine deuzy.xyz

### 3.1 Sur Vercel
1. Dashboard → Votre projet → Settings → Domains
2. Ajoutez `deuzy.xyz`
3. Vercel affichera les records DNS à ajouter:
   ```
   Name: deuzy.xyz
   Type: CNAME
   Value: cname.vercel.com.
   ```
   (ou parfois `ALIAS` pour le domaine apex)

### 3.2 Sur Hostinger (DNS)
1. hPanel → DNS Zone Editor
2. Ajoutez les records que Vercel vous a indiqués
3. Attendez propagation (5-30 minutes)

**Exemple (si Vercel demande CNAME):**
- Host: `@` (ou domaine apex) → Type: `ALIAS` ou `A` → Value: `IP_Vercel` (si fourni)
- Host: `www` → Type: `CNAME` → Value: `cname.vercel.com.`

## Étape 4 : Configurer le backend

### Option A : Backend sur ledream.kflw.io (API sur sous-domaine)

Sur votre serveur `ledream.kflw.io`, créez une config nginx pour `api.ledream.kflw.io`:

**Nginx config:**
```nginx
server {
    listen 443 ssl http2;
    server_name api.ledream.kflw.io;
    
    ssl_certificate /path/to/cert;
    ssl_certificate_key /path/to/key;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Puis redémarrez nginx:
```bash
sudo systemctl restart nginx
```

### Option B : Backend sur Render/Railway (serverless)
Déployer le backend via:
- Render: https://render.com (gratuit, mais slow dyno)
- Railway: https://railway.app
- Fly.io: https://fly.io

Puis mettre `VITE_API_URL` vers la nouvelle URL du backend.

## Étape 5 : Vérifications finales

### Tester le déploiement
```bash
# Local
npm run build
npm run preview

# En production
curl https://deuzy.xyz
curl https://deuzy.xyz/api/health
```

### Logs en direct
Sur Vercel Dashboard → Deployments → Logs

### CORS (si problème)
Si vous avez des erreurs CORS, configurez le backend:
```javascript
// backend/server.js
app.use(cors({
  origin: ['https://deuzy.xyz', 'https://www.deuzy.xyz'],
  credentials: true
}));
```

## Étape 6 : Mise à jour continue

Chaque fois que vous pushez sur la branche par défaut (main/master), Vercel re-déploie automatiquement.

---

**Questions rapides avant de commencer ?**
1. Avez-vous un compte GitHub/GitLab ? (pour lier le repo à Vercel)
2. Préférez-vous backend sur `api.ledream.kflw.io` ou migrer vers Render/Railway ?
