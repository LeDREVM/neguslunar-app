# 🐳 Guide Rapide Docker - NegusLunar

## 🚀 Démarrage Ultra-Rapide

### Windows

```bash
# Double-cliquez sur ce fichier ou exécutez :
docker-build.bat
```

### Linux/Mac

```bash
# Rendez le script exécutable
chmod +x docker-build.sh

# Exécutez le script
./docker-build.sh
```

### Commande directe

```bash
# Option 1 : Avec Docker Compose (Recommandé)
docker-compose up -d

# Option 2 : Avec Docker seul
docker build -t neguslunar-app .
docker run -d -p 3000:80 --name neguslunar neguslunar-app
```

L'application sera accessible sur **http://localhost:3000** 🌙

## 📋 Prérequis

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installé et démarré
- 500 MB d'espace disque disponible

## 🎯 Commandes Essentielles

```bash
# Démarrer l'application
docker-compose up -d

# Arrêter l'application
docker-compose down

# Voir les logs en temps réel
docker-compose logs -f

# Rebuild après modifications du code
docker-compose up -d --build

# Voir le statut
docker ps
```

## 🌐 Accès à l'application

Une fois lancée, l'application est accessible sur :
- **Local** : http://localhost:3000
- **Réseau local** : http://VOTRE-IP:3000

## 📦 Contenu Docker

Fichiers créés :
- ✅ `Dockerfile` - Configuration de l'image
- ✅ `docker-compose.yml` - Orchestration simplifiée
- ✅ `.dockerignore` - Fichiers à exclure
- ✅ `nginx.conf` - Configuration serveur web
- ✅ `docker-build.sh` - Script Linux/Mac
- ✅ `docker-build.bat` - Script Windows
- ✅ `DOCKER.md` - Documentation complète

## 🔧 Configuration du port

Par défaut, l'app tourne sur le port **3000**.

Pour changer le port, modifiez `docker-compose.yml` :

```yaml
ports:
  - "8080:80"  # Changez 8080 par votre port
```

## 🐛 Problèmes courants

### Port déjà utilisé

```bash
# Changer le port dans docker-compose.yml
# OU arrêter l'application qui utilise le port 3000
```

### Docker ne démarre pas

```bash
# Vérifier que Docker Desktop est lancé
# Windows : Icône Docker dans la barre des tâches
# Mac : Icône Docker dans la barre de menu
```

### Erreur de build

```bash
# Build sans cache
docker-compose build --no-cache
docker-compose up -d
```

## 📊 Monitoring

```bash
# Utilisation CPU/RAM en temps réel
docker stats neguslunar-app

# Inspecter le conteneur
docker inspect neguslunar-app

# Voir les logs des dernières 24h
docker logs --since 24h neguslunar-app
```

## 🚀 Déploiement Production

### Sur VPS/Serveur Cloud

```bash
# 1. Copier le projet sur le serveur
scp -r . user@serveur:/var/www/neguslunar/

# 2. Se connecter au serveur
ssh user@serveur

# 3. Naviguer vers le projet
cd /var/www/neguslunar/

# 4. Installer Docker (si nécessaire)
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 5. Lancer l'application
docker-compose up -d

# 6. Configurer avec un domaine (optionnel)
# Voir DOCKER.md pour la configuration SSL/HTTPS
```

### Avec Docker Hub

```bash
# 1. Tag et push vers Docker Hub
docker tag neguslunar-app votre-username/neguslunar:latest
docker push votre-username/neguslunar:latest

# 2. Sur le serveur
docker pull votre-username/neguslunar:latest
docker run -d -p 80:80 votre-username/neguslunar:latest
```

## 🔄 Mises à jour

```bash
# 1. Modifier le code
# 2. Rebuild et redémarrer
docker-compose up -d --build

# Ou avec le script Windows
docker-build.bat
# Choisir l'option 3
```

## 🗑️ Nettoyage

```bash
# Arrêter et supprimer tout
docker-compose down -v

# Ou avec les scripts
# Windows : docker-build.bat (option 5)
# Linux/Mac : ./docker-build.sh (option 5)
```

## 💡 Astuces

### Développement + Production

Gardez le serveur de dev (`npm run dev`) pour le développement :
- **Dev** : http://localhost:3002 (Hot reload)
- **Docker** : http://localhost:3000 (Production simulée)

### Logs en direct

```bash
# Suivre les logs Nginx
docker exec -it neguslunar-app tail -f /var/log/nginx/neguslunar_access.log
```

### Accès au conteneur

```bash
# Shell dans le conteneur
docker exec -it neguslunar-app sh

# Vérifier les fichiers
ls -la /usr/share/nginx/html
```

## 📚 Documentation complète

Pour plus de détails, consultez :
- `DOCKER.md` - Guide complet Docker
- `README.md` - Documentation de l'application
- `QUICKSTART.md` - Guide de démarrage

## ✅ Checklist de déploiement

- [ ] Docker Desktop installé et démarré
- [ ] Code à jour et testé
- [ ] `docker-compose up -d --build` exécuté
- [ ] Application accessible sur http://localhost:3000
- [ ] Logs vérifiés : `docker-compose logs -f`
- [ ] (Production) Domaine configuré
- [ ] (Production) SSL/HTTPS activé

---

Créé avec 🌙 par Négus Dja • Guadeloupe

**Besoin d'aide ?**
- Voir les logs : `docker-compose logs -f`
- Documentation complète : `DOCKER.md`
- Redémarrer : `docker-compose restart`
