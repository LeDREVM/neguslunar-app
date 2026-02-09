# 🌙 Guide d'Installation Complet - NegusLunar

## 📋 Table des Matières

1. [Installation Locale (Développement)](#-installation-locale)
2. [Déploiement avec Docker](#-déploiement-docker)
3. [Déploiement Traditionnel](#-déploiement-traditionnel)
4. [Déploiement Cloud](#-déploiement-cloud)

---

## 💻 Installation Locale

### Prérequis
- Node.js 18+ ([Télécharger](https://nodejs.org/))
- npm (inclus avec Node.js)

### Étapes

```bash
# 1. Cloner ou télécharger le projet
cd neguslunar-app

# 2. Installer les dépendances
npm install

# 3. Lancer en développement
npm run dev

# ✅ Application disponible sur http://localhost:3002
```

### Commandes Disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement avec hot reload |
| `npm run build` | Build pour production |
| `npm run preview` | Prévisualiser le build |

---

## 🐳 Déploiement Docker

### ✨ Méthode Recommandée

#### Windows
```bash
# Double-cliquez sur ce fichier :
docker-build.bat

# Choisissez l'option 3
```

#### Linux / Mac
```bash
chmod +x docker-build.sh
./docker-build.sh

# Choisissez l'option 3
```

#### Commande Directe
```bash
docker-compose up -d
```

### 📦 Structure Docker

```
┌──────────────────────────────────────┐
│        Docker Container              │
│  ┌────────────────────────────────┐  │
│  │   Nginx Alpine (~10 MB)        │  │
│  │   ┌──────────────────────────┐ │  │
│  │   │  Application React       │ │  │
│  │   │  (Build optimisé)        │ │  │
│  │   │  - index.html            │ │  │
│  │   │  - assets/               │ │  │
│  │   │  - Phases lunaires       │ │  │
│  │   │  - Calendrier            │ │  │
│  │   │  - Notes                 │ │  │
│  │   │  - Recettes              │ │  │
│  │   └──────────────────────────┘ │  │
│  └────────────────────────────────┘  │
│           Port 3000:80                │
└──────────────────────────────────────┘
              ↓
    http://localhost:3000
```

### 🎯 Accès

- **Local** : http://localhost:3000
- **Réseau** : http://VOTRE-IP:3000
- **Production** : http://votredomaine.com

### 📚 Documentation Docker

| Fichier | Description |
|---------|-------------|
| `DOCKER-QUICKSTART.md` | Guide rapide (5 min) |
| `DOCKER.md` | Documentation complète |
| `DEPLOYMENT-SUMMARY.md` | Résumé technique |
| `Makefile` | Commandes simplifiées |

---

## 🖥️ Déploiement Traditionnel

### Sur Serveur VPS (Ubuntu/Debian)

#### 1. Installation Node.js

```bash
# Installer Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Vérifier l'installation
node --version
npm --version
```

#### 2. Transférer le Projet

```bash
# Depuis votre machine locale
scp -r neguslunar-app/ user@serveur:/var/www/

# Ou via Git
ssh user@serveur
cd /var/www
git clone https://github.com/votre-username/neguslunar-app.git
```

#### 3. Installation et Build

```bash
cd /var/www/neguslunar-app
npm install
npm run build
```

#### 4. Configuration Nginx

```bash
# Installer Nginx
sudo apt install nginx

# Créer la configuration
sudo nano /etc/nginx/sites-available/neguslunar
```

```nginx
server {
    listen 80;
    server_name neguslunar.votredomaine.com;
    
    root /var/www/neguslunar-app/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache des assets
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
# Activer le site
sudo ln -s /etc/nginx/sites-available/neguslunar /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 5. SSL avec Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d neguslunar.votredomaine.com
```

### Avec PM2 (Process Manager)

```bash
# Installer PM2
npm install -g pm2

# Lancer le serveur
pm2 start npm --name "neguslunar" -- run serve

# Sauvegarder la config
pm2 save
pm2 startup

# Voir les logs
pm2 logs neguslunar

# Redémarrer
pm2 restart neguslunar
```

---

## ☁️ Déploiement Cloud

### Vercel (Gratuit)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Production
vercel --prod
```

### Netlify (Gratuit)

```bash
# Installer Netlify CLI
npm i -g netlify-cli

# Déployer
netlify deploy

# Production
netlify deploy --prod
```

### Heroku

```bash
# Installer Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login et création
heroku login
heroku create neguslunar

# Déployer
git push heroku main
```

### DigitalOcean App Platform

1. Connecter votre repo GitHub
2. Sélectionner la branche `main`
3. Build Command : `npm run build`
4. Output Directory : `dist`
5. Déployer !

---

## 🔄 Comparaison des Méthodes

| Méthode | Difficulté | Temps Setup | Coût | Recommandé pour |
|---------|------------|-------------|------|-----------------|
| Docker | ⭐ Facile | 5 min | Gratuit | Production + Dev |
| VPS Traditionnel | ⭐⭐ Moyen | 20 min | ~5€/mois | Contrôle total |
| Vercel/Netlify | ⭐ Facile | 2 min | Gratuit | Démo rapide |
| PM2 | ⭐⭐ Moyen | 15 min | Variable | Apps Node.js |
| Heroku | ⭐ Facile | 10 min | Gratuit/Payant | Prototypes |

---

## 🚀 Méthode Recommandée par Scénario

### 🏠 Pour Développement Local
```bash
npm install
npm run dev
```
**Avantages** : Hot reload, debugging facile

### 🐳 Pour Staging/Production
```bash
docker-compose up -d
```
**Avantages** : Portable, reproductible, isolé

### ⚡ Pour Démo Rapide
```bash
vercel
```
**Avantages** : Déploiement en 2 minutes, gratuit

### 🏢 Pour Production Entreprise
- Docker + Kubernetes
- Nginx reverse proxy
- Load balancing
- Monitoring (Prometheus/Grafana)

---

## 📊 Checklist de Déploiement

### Avant le Déploiement
- [ ] Code testé localement
- [ ] Build réussi sans erreurs
- [ ] Toutes les fonctionnalités testées
  - [ ] Phases lunaires s'affichent
  - [ ] Calendrier fonctionne
  - [ ] Notes se sauvegardent
  - [ ] Recettes accessibles
- [ ] Variables d'environnement configurées
- [ ] Documentation à jour

### Après le Déploiement
- [ ] Application accessible
- [ ] SSL/HTTPS activé (production)
- [ ] Monitoring en place
- [ ] Backups configurés
- [ ] Logs accessibles
- [ ] Performance vérifiée

---

## 🛠️ Outils Utiles

### Monitoring
- **Uptime Robot** : Surveillance disponibilité (gratuit)
- **Google Analytics** : Statistiques visiteurs
- **Sentry** : Tracking erreurs JavaScript

### Performance
- **Lighthouse** : Audit performance (Chrome DevTools)
- **GTmetrix** : Analyse vitesse
- **WebPageTest** : Tests détaillés

### Sécurité
- **SSL Labs** : Test SSL/TLS
- **Security Headers** : Vérification headers
- **OWASP ZAP** : Scan vulnérabilités

---

## 📞 Support

### Documentation
- `README.md` - Vue d'ensemble
- `QUICKSTART.md` - Démarrage rapide
- `DOCKER.md` - Guide Docker complet
- `DEPLOYMENT-SUMMARY.md` - Résumé technique

### Scripts
- `docker-build.bat` - Build Windows
- `docker-build.sh` - Build Linux/Mac
- `deploy.sh` - Déploiement serveur
- `Makefile` - Commandes make

### Dépannage

#### Application ne démarre pas
```bash
# Vérifier les logs
npm run dev  # ou
docker logs -f neguslunar-app
```

#### Port déjà utilisé
```bash
# Changer le port dans docker-compose.yml
ports:
  - "8080:80"
```

#### Erreur de build
```bash
# Nettoyer et rebuild
rm -rf node_modules dist
npm install
npm run build
```

---

## 🎉 Résumé

Choisissez votre méthode préférée :

1. **🐳 Docker (Recommandé)** : `docker-compose up -d`
2. **💻 Développement** : `npm run dev`
3. **☁️ Cloud** : `vercel` ou `netlify deploy`
4. **🖥️ VPS** : Nginx + PM2

---

Créé avec 🌙 par Négus Dja • Guadeloupe

**Prochaine étape ?** Lancez `docker-compose up -d` et visitez http://localhost:3000 ! 🚀
