# 🐳 Guide Docker - NegusLunar

## 📦 Prérequis

- Docker installé sur votre machine ([Télécharger Docker](https://www.docker.com/get-started))
- Docker Compose installé (inclus avec Docker Desktop)

## 🚀 Démarrage Rapide

### 1. Build et lancement avec Docker Compose (Recommandé)

```bash
# Build et démarrer l'application
docker-compose up -d

# L'application sera accessible sur http://localhost:3000
```

### 2. Build manuel avec Docker

```bash
# Build de l'image
docker build -t neguslunar-app .

# Lancer le conteneur
docker run -d -p 3000:80 --name neguslunar neguslunar-app

# L'application sera accessible sur http://localhost:3000
```

## 🛠️ Commandes Utiles

### Docker Compose

```bash
# Démarrer l'application
docker-compose up -d

# Arrêter l'application
docker-compose down

# Voir les logs
docker-compose logs -f

# Rebuild après modifications
docker-compose up -d --build

# Arrêter et supprimer tout (conteneurs, volumes, réseaux)
docker-compose down -v
```

### Docker

```bash
# Voir les conteneurs en cours d'exécution
docker ps

# Voir tous les conteneurs
docker ps -a

# Arrêter un conteneur
docker stop neguslunar

# Démarrer un conteneur arrêté
docker start neguslunar

# Supprimer un conteneur
docker rm neguslunar

# Voir les logs
docker logs -f neguslunar

# Accéder au shell du conteneur
docker exec -it neguslunar sh

# Voir les images
docker images

# Supprimer une image
docker rmi neguslunar-app
```

## 📊 Structure des fichiers Docker

```
neguslunar-app/
├── Dockerfile              # Configuration de l'image Docker
├── docker-compose.yml      # Orchestration des services
├── .dockerignore          # Fichiers à ignorer lors du build
├── nginx.conf             # Configuration Nginx pour production
└── DOCKER.md              # Ce fichier
```

## 🔧 Configuration

### Changer le port

Modifier dans `docker-compose.yml` :

```yaml
ports:
  - "8080:80"  # Votre port:80
```

### Variables d'environnement

Ajouter dans `docker-compose.yml` :

```yaml
environment:
  - NODE_ENV=production
  - VITE_API_URL=https://api.example.com
```

## 🌐 Déploiement sur serveur

### 1. Sur un serveur avec Docker

```bash
# Copier les fichiers sur le serveur
scp -r . user@serveur:/var/www/neguslunar/

# SSH sur le serveur
ssh user@serveur

# Naviguer vers le projet
cd /var/www/neguslunar/

# Lancer avec Docker Compose
docker-compose up -d
```

### 2. Avec Docker Hub

```bash
# Tag de l'image
docker tag neguslunar-app votre-username/neguslunar:latest

# Push vers Docker Hub
docker push votre-username/neguslunar:latest

# Sur le serveur, pull et run
docker pull votre-username/neguslunar:latest
docker run -d -p 80:80 votre-username/neguslunar:latest
```

### 3. Avec un reverse proxy (Nginx/Traefik)

Le fichier `docker-compose.yml` inclut déjà les labels Traefik. Pour Nginx externe :

```nginx
server {
    listen 80;
    server_name neguslunar.votredomaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔒 SSL/HTTPS avec Let's Encrypt

### Option 1 : Avec Certbot (si Nginx externe)

```bash
sudo certbot --nginx -d neguslunar.votredomaine.com
```

### Option 2 : Avec Docker et Let's Encrypt

Modifier `docker-compose.yml` pour inclure Certbot :

```yaml
services:
  neguslunar:
    # ... config existante

  certbot:
    image: certbot/certbot
    volumes:
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"
```

## 📈 Monitoring

### Voir l'utilisation des ressources

```bash
# Stats en temps réel
docker stats neguslunar

# Inspecter le conteneur
docker inspect neguslunar
```

## 🐛 Dépannage

### Le conteneur ne démarre pas

```bash
# Voir les logs
docker logs neguslunar

# Vérifier la configuration
docker-compose config
```

### Problème de build

```bash
# Build sans cache
docker-compose build --no-cache

# Build avec logs détaillés
docker-compose up --build
```

### Nettoyer Docker

```bash
# Supprimer tous les conteneurs arrêtés
docker container prune

# Supprimer toutes les images non utilisées
docker image prune -a

# Nettoyage complet (attention !)
docker system prune -a --volumes
```

## 📦 Taille de l'image

L'image utilise une approche multi-stage :
- **Stage 1** : Build avec Node.js (~1GB temporaire)
- **Stage 2** : Image finale avec Nginx Alpine (~50MB)

Pour voir la taille :

```bash
docker images neguslunar-app
```

## 🔄 Mises à jour

Pour mettre à jour l'application :

```bash
# 1. Arrêter le conteneur actuel
docker-compose down

# 2. Mettre à jour le code
git pull  # ou modifier les fichiers

# 3. Rebuild et relancer
docker-compose up -d --build
```

## 📝 Notes importantes

- L'application utilise **Nginx Alpine** pour un poids minimal
- Le build se fait en **multi-stage** pour optimiser la taille
- La configuration Nginx inclut :
  - ✅ Compression gzip
  - ✅ Cache des assets statiques
  - ✅ Support SPA (React Router)
  - ✅ Headers de sécurité
  - ✅ Logs d'accès et d'erreurs

## 🆘 Support

En cas de problème, vérifiez :
1. Docker est bien installé et démarré
2. Le port 3000 n'est pas déjà utilisé
3. Les logs avec `docker logs -f neguslunar`

---

Créé avec 🌙 par Négus Dja • Guadeloupe
