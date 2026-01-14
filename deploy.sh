#!/bin/bash

# Script de déploiement NegusLunar
# Usage: ./deploy.sh

echo "🌙 Déploiement de NegusLunar..."

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Vérifier si node_modules existe
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}📦 Installation des dépendances...${NC}"
    npm install
fi

# Build de production
echo -e "${BLUE}🔨 Build de production...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build réussi !${NC}"
    echo -e "${GREEN}📁 Les fichiers sont dans le dossier 'dist/'${NC}"
    echo ""
    echo -e "${BLUE}Pour déployer sur ton serveur :${NC}"
    echo "1. Copie le dossier dist/ sur ton serveur"
    echo "   scp -r dist/* user@kaflow:/var/www/neguslunar/"
    echo ""
    echo "2. Ou utilise rsync pour une synchro intelligente :"
    echo "   rsync -avz --delete dist/ user@kaflow:/var/www/neguslunar/"
    echo ""
    echo "3. Configure Nginx ou Apache (voir README.md)"
else
    echo -e "${RED}❌ Erreur lors du build${NC}"
    exit 1
fi
