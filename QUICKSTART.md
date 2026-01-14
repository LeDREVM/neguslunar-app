# 🚀 Démarrage Rapide - NegusLunar

## Pour tester localement (en 3 commandes)

```bash
cd neguslunar-app
npm install
npm run dev
```

Ouvre ton navigateur sur `http://localhost:3000` 🌙

## Pour déployer sur Kaflow (méthode simple)

### 1. Build le projet

```bash
npm run build
```

### 2. Upload sur le serveur

```bash
# Méthode A : SCP
scp -r dist/* user@kaflow.com:/var/www/neguslunar/

# Méthode B : RSYNC (plus rapide pour les mises à jour)
rsync -avz --delete dist/ user@kaflow.com:/var/www/neguslunar/

# Méthode C : Script automatique
./deploy.sh
```

### 3. Configure le serveur web

**Avec Nginx :**
```bash
# Sur le serveur
sudo cp nginx.conf.example /etc/nginx/sites-available/neguslunar
sudo ln -s /etc/nginx/sites-available/neguslunar /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

**Avec Apache :**
```bash
# Crée un fichier .htaccess dans /var/www/neguslunar/
# (voir exemple dans README.md)
```

### 4. SSL (optionnel mais recommandé)

```bash
sudo certbot --nginx -d neguslunar.kaflow.com
```

## C'est tout ! 🎉

Ton app est maintenant live sur ton serveur Kaflow.

## Besoin d'aide ?

- Consulte le `README.md` complet pour plus de détails
- Vérifie les logs : `sudo tail -f /var/log/nginx/neguslunar_error.log`
- Teste la config Nginx : `sudo nginx -t`

---

Créé avec 🌙 par Négus Dja
