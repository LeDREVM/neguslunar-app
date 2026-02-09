# 📱 Guide d'Accès Mobile - NegusLunar

## 🎯 Problème : Les modifications ne sont pas visibles sur mobile

---

## ✅ Solution Rapide (3 étapes)

### 1️⃣ Vérifiez votre connexion WiFi

**Sur votre mobile ET votre ordinateur** :
- Connectez-vous au **même réseau WiFi**
- Vérifiez que vous n'êtes pas en données mobiles

### 2️⃣ Accédez à l'application via l'IP réseau

Sur votre **mobile**, ouvrez le navigateur et allez à :

```
http://172.20.10.2:3000/
```

### 3️⃣ Videz le cache

Si l'ancienne version s'affiche encore :

**Chrome/Safari mobile** :
1. Appuyez longuement sur le bouton de rafraîchissement 🔄
2. Sélectionnez "Vider le cache et actualiser"

**Ou utilisez le mode privé** :
1. Ouvrez un onglet navigation privée/incognito
2. Allez à `http://172.20.10.2:3000/`

---

## 🔍 Vérifications Détaillées

### ✅ Checklist Réseau

- [ ] Mobile et PC sur le même WiFi
- [ ] Pas de VPN actif
- [ ] Pare-feu Windows autorise le port 3000
- [ ] L'adresse IP est correcte : `172.20.10.2`

### ✅ Checklist Application

- [ ] Le serveur est lancé (`npm run dev`)
- [ ] Aucune erreur dans le terminal
- [ ] Les nouveaux onglets apparaissent sur PC
- [ ] Le cache mobile est vidé

---

## 🛠️ Solutions Avancées

### Solution 1 : Redémarrer le serveur

```bash
# Dans le terminal, arrêtez le serveur (Ctrl+C)
# Puis relancez :
npm run dev
```

### Solution 2 : Vérifier l'adresse IP

```bash
# Sur Windows :
ipconfig | findstr "IPv4"

# L'adresse devrait être : 172.20.10.2
```

### Solution 3 : Autoriser le port dans le pare-feu

**Windows** :
1. Ouvrir "Pare-feu Windows Defender"
2. "Paramètres avancés"
3. "Règles de trafic entrant"
4. "Nouvelle règle..."
5. Port TCP 3000
6. Autoriser la connexion

### Solution 4 : Mode Avion puis reconnexion

Sur le mobile :
1. Activez le mode avion
2. Attendez 5 secondes
3. Désactivez le mode avion
4. Reconnectez-vous au WiFi
5. Réessayez `http://172.20.10.2:3000/`

---

## 📱 Test de Connectivité

### Étape 1 : Ping depuis le mobile

Sur votre mobile, installez une app de "Network Tools" ou "Ping" et testez :
```
ping 172.20.10.2
```

Si ça répond → Le réseau fonctionne ✅
Si ça ne répond pas → Problème réseau ❌

### Étape 2 : Vérifier le port

Essayez d'accéder à :
```
http://172.20.10.2:3000/
```

Si vous voyez l'application → Succès ✅
Si erreur "Impossible de se connecter" → Problème de port/pare-feu ❌

---

## 🎨 Vérifier les Nouveaux Onglets

Une fois connecté, vous devriez voir **3 nouveaux onglets** dans la navigation :

```
🌙 Phase Lunaire
📅 Calendrier
📝 Notes
🍃 Recettes
🌙 Rituel
📖 Recettes Semaine
💪 Programme Sport
📷 Scanner          ← NOUVEAU
⏱️  Jeûne           ← NOUVEAU
🎯 Plans Repas      ← NOUVEAU
```

---

## 🔄 Forcer le Rechargement

### Sur Chrome Mobile
1. Ouvrir le menu (⋮)
2. Paramètres
3. Confidentialité et sécurité
4. Effacer les données de navigation
5. Cocher "Images et fichiers en cache"
6. Effacer les données
7. Retourner à `http://172.20.10.2:3000/`

### Sur Safari Mobile (iOS)
1. Réglages
2. Safari
3. Effacer historique et données de sites
4. Confirmer
5. Retourner à `http://172.20.10.2:3000/`

---

## 🚨 Problèmes Courants

### Problème 1 : "Impossible de se connecter au serveur"

**Cause** : Mobile pas sur le même WiFi ou serveur arrêté

**Solution** :
1. Vérifiez le WiFi
2. Vérifiez que le serveur tourne (terminal doit afficher "ready")
3. Essayez de redémarrer le serveur

### Problème 2 : "Ancienne version s'affiche"

**Cause** : Cache du navigateur

**Solution** :
1. Mode navigation privée
2. Ou vider le cache (voir ci-dessus)
3. Ou utiliser un autre navigateur mobile

### Problème 3 : "Les onglets sont coupés"

**Cause** : Navigation horizontale sur petit écran

**Solution** :
1. Faites défiler horizontalement la barre de navigation
2. Les nouveaux onglets sont à droite
3. C'est normal, le design est responsive

### Problème 4 : "Erreur 404"

**Cause** : Mauvaise URL ou serveur arrêté

**Solution** :
1. Vérifiez l'URL : `http://172.20.10.2:3000/`
2. Pas de `https://` (avec 's')
3. Port 3000 bien présent

---

## 💡 Astuces

### Astuce 1 : Ajouter à l'écran d'accueil

**Sur mobile** :
1. Ouvrez `http://172.20.10.2:3000/`
2. Menu → "Ajouter à l'écran d'accueil"
3. L'app sera accessible comme une vraie app !

### Astuce 2 : Utiliser un QR Code

Générez un QR code pour `http://172.20.10.2:3000/` et scannez-le avec votre mobile.

### Astuce 3 : Marquer en favori

Ajoutez l'URL en favori sur votre mobile pour un accès rapide.

---

## 🔧 Dépannage Avancé

### Si rien ne fonctionne

1. **Redémarrez tout** :
   ```bash
   # Arrêtez le serveur (Ctrl+C)
   # Fermez le terminal
   # Rouvrez et relancez :
   npm run dev
   ```

2. **Vérifiez les logs du serveur** :
   - Regardez le terminal
   - Cherchez des erreurs en rouge
   - Vérifiez que "Network: http://172.20.10.2:3000/" s'affiche

3. **Testez sur PC d'abord** :
   - Ouvrez `http://localhost:3000/` sur PC
   - Vérifiez que les 3 nouveaux onglets sont là
   - Si oui → Problème réseau mobile
   - Si non → Problème code/serveur

4. **Changez de réseau WiFi** :
   - Essayez un autre réseau
   - Ou créez un hotspot depuis votre PC

---

## 📞 Besoin d'Aide ?

### Informations à fournir

Si vous avez encore des problèmes, notez :
1. Le message d'erreur exact
2. Le navigateur mobile utilisé (Chrome, Safari, etc.)
3. Le système d'exploitation mobile (Android, iOS)
4. Ce qui s'affiche dans le terminal du serveur
5. Si ça fonctionne sur PC

### Vérification Finale

Exécutez cette commande sur PC :
```bash
npm run dev
```

Vous devriez voir :
```
VITE v5.4.21  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  Network: http://172.20.10.2:3000/
```

Si "Network" ne s'affiche pas → Problème de configuration Vite

---

## ✅ Checklist Finale

Avant de demander de l'aide, vérifiez :

- [ ] Serveur lancé (`npm run dev`)
- [ ] Aucune erreur dans le terminal
- [ ] Mobile sur le même WiFi que le PC
- [ ] URL correcte : `http://172.20.10.2:3000/`
- [ ] Cache mobile vidé
- [ ] Mode navigation privée testé
- [ ] Fonctionne sur PC (`http://localhost:3000/`)
- [ ] Pare-feu autorise le port 3000

---

## 🎉 Ça Marche !

Si vous voyez les 3 nouveaux onglets (📷 Scanner, ⏱️ Jeûne, 🎯 Plans Repas), félicitations !

Consultez maintenant :
- [QUICKSTART-NUTRITION.md](QUICKSTART-NUTRITION.md) pour démarrer
- [GUIDE-NUTRITION.md](GUIDE-NUTRITION.md) pour le guide complet

---

**Bonne navigation mobile ! 🌙📱**

*Créé avec 🌙 par Négus Dja • Guadeloupe*
