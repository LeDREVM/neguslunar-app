# 🐳 NegusLunar - Configuration Docker

> Application de phases lunaires, calendrier et recettes végétaliennes containerisée

## 🎯 Démarrage Rapide (30 secondes)

```bash
docker-compose up -d
```

**C'est tout !** 🎉

Accédez à l'application : **http://localhost:3000**

---

## 📁 Fichiers Docker Inclus

| Fichier | Taille | Description |
|---------|--------|-------------|
| `Dockerfile` | 0.7 KB | Image multi-stage optimisée |
| `docker-compose.yml` | 0.5 KB | Configuration orchestration |
| `.dockerignore` | 0.4 KB | Exclusions build |
| `nginx.conf` | 1.2 KB | Config serveur web |
| `docker-build.bat` | 2.9 KB | Script Windows interactif |
| `docker-build.sh` | 2.1 KB | Script Linux/Mac interactif |
| `Makefile` | 4.1 KB | Commandes simplifiées |

**Documentation** :
- 📘 `DOCKER-QUICKSTART.md` (4.9 KB) - Guide rapide
- 📗 `DOCKER.md` (5.7 KB) - Guide complet
- 📙 `DEPLOYMENT-SUMMARY.md` (8.1 KB) - Résumé technique
- 📕 `INSTALLATION-GUIDE.md` (8.7 KB) - Guide d'installation

---

## 🚀 Méthodes de Lancement

### Méthode 1 : Script Interactif (Recommandé pour débutants)

**Windows** :
```bash
docker-build.bat
```

**Linux/Mac** :
```bash
chmod +x docker-build.sh
./docker-build.sh
```

### Méthode 2 : Docker Compose (Recommandé)

```bash
# Démarrer
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter
docker-compose down

# Rebuild
docker-compose up -d --build
```

### Méthode 3 : Docker Direct

```bash
# Build
docker build -t neguslunar-app .

# Run
docker run -d -p 3000:80 --name neguslunar neguslunar-app
```

### Méthode 4 : Makefile (Pour utilisateurs avancés)

```bash
# Voir toutes les commandes
make help

# Build et démarrer
make up

# Voir les logs
make logs

# Arrêter
make down

# Nettoyer tout
make clean
```

---

## 📊 Architecture Docker

### Build Multi-Stage

```
┌─────────────────────────────────────────┐
│  STAGE 1: Builder                       │
│  (node:18-alpine)                       │
│                                         │
│  • npm ci --only=production             │
│  • npm run build                        │
│  • Génère /app/dist                     │
│                                         │
│  Taille temporaire: ~1 GB               │
└──────────────┬──────────────────────────┘
               │
               │ COPY dist
               ▼
┌─────────────────────────────────────────┐
│  STAGE 2: Production                    │
│  (nginx:alpine)                         │
│                                         │
│  • Copie dist → /usr/share/nginx/html   │
│  • Nginx configuré (gzip, cache, etc)   │
│  • Logs activés                         │
│                                         │
│  Taille finale: ~50 MB                  │
└──────────────┬──────────────────────────┘
               │
               │ Port 3000:80
               ▼
        http://localhost:3000
           🌙 NegusLunar
```

### Optimisations Incluses

✅ **Taille** : Image finale ~50 MB (vs ~1 GB sans multi-stage)  
✅ **Performance** : Nginx Alpine ultra-rapide  
✅ **Cache** : Assets statiques en cache 1 an  
✅ **Compression** : Gzip activé automatiquement  
✅ **Sécurité** : Headers de sécurité configurés  
✅ **Logs** : Accès et erreurs enregistrés  

---

## 🎮 Commandes Essentielles

### Gestion de Base

```bash
# Démarrer l'application
docker-compose up -d

# Arrêter l'application
docker-compose down

# Redémarrer
docker-compose restart

# Voir le statut
docker ps

# Voir les logs
docker-compose logs -f

# Logs des 100 dernières lignes
docker-compose logs --tail=100
```

### Debugging

```bash
# Accéder au shell du conteneur
docker exec -it neguslunar-app sh

# Voir les fichiers de l'app
docker exec neguslunar-app ls -la /usr/share/nginx/html

# Tester Nginx
docker exec neguslunar-app nginx -t

# Voir la config
docker exec neguslunar-app cat /etc/nginx/conf.d/default.conf
```

### Monitoring

```bash
# Stats en temps réel
docker stats neguslunar-app

# Utilisation CPU/RAM
docker stats --no-stream neguslunar-app

# Inspecter le conteneur
docker inspect neguslunar-app

# Voir les ports
docker port neguslunar-app
```

### Maintenance

```bash
# Rebuild complet
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Nettoyer les images inutilisées
docker image prune

# Nettoyer tout Docker (ATTENTION!)
docker system prune -a
```

---

## 🌐 Déploiement

### Local (Développement)

```bash
docker-compose up -d
# → http://localhost:3000
```

### VPS / Serveur Cloud

```bash
# 1. Installer Docker (si nécessaire)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 2. Copier le projet
scp -r . user@serveur:/var/www/neguslunar/

# 3. Se connecter et lancer
ssh user@serveur
cd /var/www/neguslunar
docker-compose up -d
```

### Avec Domaine

```nginx
# Configuration Nginx reverse proxy (sur l'hôte)
# /etc/nginx/sites-available/neguslunar

server {
    listen 80;
    server_name neguslunar.votredomaine.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Activer SSL avec Certbot
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d neguslunar.votredomaine.com
```

---

## 🔧 Configuration Avancée

### Changer le Port

**Dans `docker-compose.yml`** :
```yaml
ports:
  - "8080:80"  # Changez 8080 par votre port
```

### Variables d'Environnement

**Dans `docker-compose.yml`** :
```yaml
environment:
  - NODE_ENV=production
  - TZ=America/Guadeloupe
```

### Volumes Personnalisés

```yaml
volumes:
  - ./logs:/var/log/nginx
  - ./custom-nginx.conf:/etc/nginx/conf.d/default.conf
```

### Limites de Ressources

```yaml
deploy:
  resources:
    limits:
      cpus: '0.5'
      memory: 512M
    reservations:
      cpus: '0.25'
      memory: 256M
```

---

## 🐛 Dépannage

### L'application ne démarre pas

```bash
# Vérifier les logs
docker-compose logs

# Vérifier que Docker tourne
docker ps

# Vérifier le port
netstat -an | grep 3000  # Windows
lsof -i :3000            # Linux/Mac
```

### Port déjà utilisé

**Solution 1** : Changer le port dans `docker-compose.yml`

**Solution 2** : Arrêter l'application qui utilise le port
```bash
# Trouver le processus
netstat -ano | findstr :3000  # Windows
lsof -ti:3000                 # Linux/Mac

# Tuer le processus
taskkill /PID <PID> /F        # Windows
kill -9 <PID>                 # Linux/Mac
```

### Erreur de build

```bash
# Supprimer le cache Docker
docker builder prune -a

# Rebuild from scratch
docker-compose build --no-cache
docker-compose up -d
```

### Application ne répond pas

```bash
# Vérifier le statut
docker ps

# Redémarrer
docker-compose restart

# Voir les erreurs Nginx
docker exec neguslunar-app cat /var/log/nginx/neguslunar_error.log
```

---

## 📈 Performance

### Métriques

```bash
# Taille de l'image
docker images neguslunar-app

# Utilisation ressources
docker stats neguslunar-app --no-stream
```

**Résultats attendus** :
- 📦 **Taille image** : ~50 MB
- 🚀 **Démarrage** : ~2 secondes
- 💾 **RAM** : ~50-100 MB
- ⚡ **CPU** : <5% au repos

### Optimisations Futures

- [ ] CDN pour assets statiques (Cloudflare)
- [ ] Cache Redis (si backend API)
- [ ] Load balancing (si multi-instances)
- [ ] Monitoring (Prometheus + Grafana)
- [ ] CI/CD (GitHub Actions)

---

## 🔒 Sécurité

### Headers Inclus

✅ `X-Frame-Options: SAMEORIGIN`  
✅ `X-Content-Type-Options: nosniff`  
✅ `X-XSS-Protection: 1; mode=block`  

### Bonnes Pratiques

- [ ] Utiliser HTTPS en production
- [ ] Configurer un firewall
- [ ] Limiter les ressources
- [ ] Sauvegardes régulières
- [ ] Updates Docker régulières
- [ ] Scanner les vulnérabilités

```bash
# Scanner l'image
docker scan neguslunar-app
```

---

## 📚 Ressources

### Documentation
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Best Practices](https://docs.docker.com/develop/dev-best-practices/)

### Fichiers du Projet
- `DOCKER-QUICKSTART.md` - Guide rapide (5 min)
- `DOCKER.md` - Guide complet (30 min)
- `DEPLOYMENT-SUMMARY.md` - Résumé technique
- `INSTALLATION-GUIDE.md` - Toutes les méthodes
- `README.md` - Documentation application

---

## 📊 Comparaison

| Méthode | Temps Setup | Portabilité | Difficulté | Production Ready |
|---------|-------------|-------------|------------|------------------|
| Docker Compose | 30 sec | ⭐⭐⭐⭐⭐ | Facile | ✅ Oui |
| Docker Run | 2 min | ⭐⭐⭐⭐ | Facile | ✅ Oui |
| npm dev | 1 min | ⭐⭐ | Très facile | ❌ Non |
| Build manuel | 5 min | ⭐⭐⭐ | Moyen | ✅ Oui |

---

## ✅ Checklist Finale

### Avant de déployer
- [ ] Docker installé et démarré
- [ ] `docker-compose.yml` configuré
- [ ] Port 3000 disponible (ou modifié)
- [ ] Fichiers `.dockerignore` présent

### Déploiement
- [ ] `docker-compose up -d` exécuté
- [ ] Application accessible sur http://localhost:3000
- [ ] Toutes les fonctionnalités testées :
  - [ ] Phase lunaire du jour
  - [ ] Calendrier mensuel
  - [ ] Notes et intentions
  - [ ] Recettes végétaliennes

### Production
- [ ] Domaine configuré
- [ ] SSL/HTTPS activé
- [ ] Firewall configuré
- [ ] Monitoring en place
- [ ] Backups automatiques

---

## 🎉 Résumé

**NegusLunar est prêt pour Docker !**

🐳 **Image optimisée** : ~50 MB  
⚡ **Démarrage rapide** : ~2 secondes  
🔒 **Sécurisé** : Headers configurés  
📦 **Portable** : Fonctionne partout  
🚀 **Production ready** : Nginx + optimisations  

### Démarrer maintenant

```bash
docker-compose up -d
```

Visitez **http://localhost:3000** et profitez de votre application lunaire ! 🌙

---

Créé avec 🌙 par **Négus Dja** • Guadeloupe 🇬🇵

**Questions ?** Consultez `DOCKER.md` ou `INSTALLATION-GUIDE.md`
