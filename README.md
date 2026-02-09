# 🌙 NegusLunar

Application web React pour suivre les phases lunaires, prendre des notes et découvrir des recettes végétaliennes selon ton humeur.

Créé par **Négus Dja** - Directeur Artistique & Développeur - Guadeloupe 🇬🇵

## ✨ Fonctionnalités

- 🌙 **Phases Lunaires en temps réel** : Calcul automatique de la phase lunaire actuelle
- 📅 **Calendrier Lunaire** : Vue mensuelle complète avec toutes les phases lunaires
- 📝 **Journal & Notes** : Système de prise de notes avec sauvegarde locale
- 📤 **Export/Import JSON** : Sauvegardez et restaurez vos notes facilement
- 🍃 **Recettes Végétaliennes** : 12 recettes complètes avec ingrédients détaillés et apports nutritionnels
- 🍽️ **Recette du Jour** : 7 recettes différentes, une pour chaque jour de la semaine
- ✨ **Rituel Lunaire** : Module complet avec affirmations, méditation, yoga, fitness, tracker d'humeur et plus
- 💾 **Sauvegarde automatique** : Les notes sont sauvegardées dans le navigateur
- 🎨 **Design cosmique** : Interface magnifique avec animations et effets visuels

## 🐳 Déploiement Docker (Recommandé)

### Méthode Simple avec Docker

```bash
# Windows : Double-cliquez sur
docker-build.bat

# Linux/Mac :
chmod +x docker-build.sh
./docker-build.sh

# Ou directement :
docker-compose up -d
```

**Application accessible sur** : http://localhost:3000

📖 **Documentation complète** : Voir [`docs/DOCKER-QUICKSTART.md`](docs/DOCKER-QUICKSTART.md) et [`docs/DOCKER.md`](docs/DOCKER.md)

## 🚀 Installation Traditionnelle

### 1. Transférer le projet sur le serveur

```bash
# Sur ton serveur Kaflow, clone ou upload le projet
scp -r neguslunar-app/ user@kaflow:/var/www/
```

### 2. Installer Node.js (si pas déjà installé)

```bash
# Vérifier si Node.js est installé
node --version

# Si pas installé, installer Node.js 18+ :
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 3. Installer les dépendances

```bash
cd neguslunar-app
npm install
```

### 4. Développement local

Pour tester en local :

```bash
npm run dev
```

L'app sera accessible sur `http://localhost:3000`

### 5. Build pour production

```bash
npm run build
```

Cela créera un dossier `dist/` avec les fichiers optimisés.

### 6. Déploiement sur serveur web

#### Option A : Avec Nginx

```bash
# Copier les fichiers buildés
sudo cp -r dist/* /var/www/neguslunar/

# Configuration Nginx (créer un fichier /etc/nginx/sites-available/neguslunar)
server {
    listen 80;
    server_name neguslunar.kaflow.com;  # ou ton domaine
    
    root /var/www/neguslunar;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache pour les assets
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}

# Activer le site
sudo ln -s /etc/nginx/sites-available/neguslunar /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### Option B : Avec PM2 (serveur Node)

```bash
# Installer PM2
npm install -g pm2

# Lancer le serveur de preview
pm2 start npm --name "neguslunar" -- run serve

# Sauvegarder la config PM2
pm2 save
pm2 startup
```

#### Option C : Avec Apache

```bash
# Copier les fichiers
sudo cp -r dist/* /var/www/html/neguslunar/

# Configuration Apache (.htaccess dans le dossier)
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /neguslunar/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /neguslunar/index.html [L]
</IfModule>
```

### 7. SSL/HTTPS avec Certbot (recommandé)

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d neguslunar.kaflow.com
```

## 📁 Structure du projet

```
neguslunar-app/
├── docs/             # 📚 Toute la documentation (57 fichiers)
├── public/           # 📦 Fichiers statiques & documents BODY DREVM
├── src/
│   ├── components/   # ⚛️ Composants React (15+)
│   ├── data/         # 📊 Données (recettes, ingrédients, lune)
│   ├── hooks/        # 🎣 Hooks personnalisés
│   ├── utils/        # 🛠️ Utilitaires (database, etc.)
│   ├── App.jsx       # Composant principal
│   ├── main.jsx      # Point d'entrée
│   └── index.css     # Styles globaux
├── index.html        # Template HTML
├── package.json      # Dépendances
├── vite.config.js    # Configuration Vite
└── tailwind.config.js # Configuration Tailwind
```

📖 **Voir [docs/PROJECT-ORGANIZATION.md](docs/PROJECT-ORGANIZATION.md) pour l'organisation détaillée**

## 🛠️ Technologies utilisées

- **React 18** : Framework UI
- **Vite** : Build tool ultra-rapide
- **Tailwind CSS** : Framework CSS utility-first
- **Lucide React** : Icônes modernes
- **LocalStorage** : Sauvegarde des notes

## 🎨 Personnalisation

Tu peux modifier les couleurs, polices et recettes dans `/src/components/NegusLunar.jsx`

### Ajouter des recettes :

```javascript
const recipesByMood = {
  nouvelleHumeur: [
    { name: 'Nom Recette', ingredients: 'Liste ingrédients' }
  ]
}
```

## 📱 Support navigateurs

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Tous navigateurs modernes

## 🐛 Debugging

```bash
# Voir les logs en temps réel
npm run dev

# Build avec info détaillée
npm run build -- --debug

# Tester le build production localement
npm run preview
```

## 📚 Documentation

Toute la documentation est disponible dans le dossier [`docs/`](docs/) :

- **[Guide de Démarrage](docs/QUICKSTART.md)** - Démarrer rapidement
- **[Guide Nutrition](docs/SUIVI-NUTRITIONNEL-GUIDE.md)** - Suivi nutritionnel & recettes
- **[Liste de Courses](docs/LISTE-COURSES-GUIDE.md)** - 🆕 Gérer vos courses
- **[Base de Données](docs/DATABASE-GUIDE.md)** - Architecture IndexedDB
- **[Export/Import](docs/EXPORT-IMPORT-GUIDE.md)** - Sauvegarde des données
- **[Index Complet](docs/README.md)** - Toute la documentation

## 📝 Notes importantes

- Les données sont sauvegardées localement (IndexedDB + localStorage) dans le navigateur
- Pas de base de données externe nécessaire
- Application 100% frontend, aucun backend requis
- **Nouveau** : Module de liste de courses avec 70+ ingrédients
- **Nouveau** : Suivi nutritionnel journalier complet

## 🌟 Fonctionnalités Récentes

- [x] Export/Import JSON des notes ✅
- [x] Calendrier lunaire complet 30 jours ✅
- [x] Base de données IndexedDB robuste ✅
- [x] Module de suivi nutritionnel ✅
- [x] Bibliothèque de recettes BODY DREVM ✅
- [x] Liste de courses intelligente ✅
- [x] Filtrage avancé par ingrédient ✅
- [x] Module Work professionnel ✅

## 🚀 Évolutions futures possibles

- [ ] Synchronisation cloud des notes
- [ ] Export PDF des analyses
- [ ] Application mobile native
- [ ] Mode hors ligne avancé
- [ ] Rappels basés sur phases lunaires
- [ ] Partage de recettes entre utilisateurs

## 📄 Licence

Créé pour un usage personnel par Négus Dja

---

Fait avec 🌙 et 🥬 en Guadeloupe
