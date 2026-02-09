# Guide de déploiement Render + Vercel

## Architecture finale
```
deuzy.xyz (Vercel Frontend)
    ↓
api.deuzy.xyz (Render Backend) 
    ↓
SQLite BD
```

## ⚙️ Déployer le Backend sur Render

### 1. Créer un compte Render
- https://render.com
- Connectez-vous (GitHub recommandé)

### 2. Créer un service Web
1. Dashboard → New+ → Web Service
2. Connectez votre dépôt GitHub
3. Sélectionnez la branche (main/master)
4. Remplissez:
   - **Name:** `neguslunar-backend`
   - **Runtime:** Node
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
5. **Plan:** Free (gratuit) ✓
6. **Advanced:**
   - Environment: `NODE_ENV=production`
   - Disk: Activez 1GB pour SQLite
7. **Deploy**

### 3. Récupérer l'URL Render
Render vous donnera une URL comme:
```
https://neguslunar-backend.onrender.com
```

### 4. Mettre à jour Vercel

Sur Vercel, mettez à jour la variable d'environnement:
```
VITE_API_URL=https://neguslunar-backend.onrender.com
```

Dashboard → Settings → Environment Variables

### 5. Redéployer Vercel
Allez à Deployments → Redeploy (ou pushez un commit)

---

## 🔗 Optionnel: Lier un sous-domaine Render

Si vous voulez `api.deuzy.xyz` au lieu de `onrender.com`:

1. Sur Render → Service → Settings → Custom Domain
2. Ajoutez: `api.deuzy.xyz`
3. Render vous donnera un CNAME
4. Sur Hostinger DNS: Ajoutez le CNAME que Render indique
5. Attendez propagation (~10 min)

---

## 📋 Checklist finale

- [ ] Compte Render créé
- [ ] Backend déployé sur Render
- [ ] URL Render copiée (`https://neguslunar-backend.onrender.com`)
- [ ] VITE_API_URL mis à jour sur Vercel
- [ ] Vercel re-déployé
- [ ] Frontend accessible sur `deuzy.xyz`
- [ ] API teste: `curl https://neguslunar-backend.onrender.com/api/health`

---

## 🆘 Troubleshooting

**Backend lent au démarrage?** 
→ Plan gratuit Render endort les services. Aucun problème, c'est normal.

**CORS error?**
→ Backend configure CORS automatiquement pour `https://deuzy.xyz`

**BD vide après redéploiement?**
→ Render persiste le dossier `/app/backend/data` via Disk

**API inaccessible?**
```bash
curl https://neguslunar-backend.onrender.com/api/health
# Doit afficher: {"status":"✅ Backend OK"}
```

---

**À faire maintenant:**
1. Créez un compte Render
2. Déployez le backend
3. Copiez l'URL Render
4. Dites-moi l'URL, je mets à jour Vercel pour vous
