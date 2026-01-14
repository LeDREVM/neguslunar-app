#!/bin/bash

# Script de build et déploiement Docker pour NegusLunar
# Créé par Négus Dja

echo "🌙 NegusLunar - Build Docker"
echo "=============================="
echo ""

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Vérifier que Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez l'installer depuis https://www.docker.com/"
    exit 1
fi

echo -e "${GREEN}✅ Docker est installé${NC}"
echo ""

# Menu
echo "Choisissez une option :"
echo "1) Build l'image Docker"
echo "2) Build et lancer avec Docker"
echo "3) Lancer avec Docker Compose"
echo "4) Arrêter les conteneurs"
echo "5) Supprimer les conteneurs et images"
echo ""
read -p "Votre choix (1-5) : " choice

case $choice in
    1)
        echo -e "${BLUE}🔨 Build de l'image Docker...${NC}"
        docker build -t neguslunar-app .
        ;;
    2)
        echo -e "${BLUE}🔨 Build de l'image...${NC}"
        docker build -t neguslunar-app .
        echo -e "${BLUE}🚀 Lancement du conteneur...${NC}"
        docker run -d -p 3000:80 --name neguslunar neguslunar-app
        echo -e "${GREEN}✅ Application disponible sur http://localhost:3000${NC}"
        ;;
    3)
        echo -e "${BLUE}🚀 Lancement avec Docker Compose...${NC}"
        docker-compose up -d --build
        echo -e "${GREEN}✅ Application disponible sur http://localhost:3000${NC}"
        ;;
    4)
        echo -e "${YELLOW}⏹️  Arrêt des conteneurs...${NC}"
        docker-compose down
        docker stop neguslunar 2>/dev/null || true
        echo -e "${GREEN}✅ Conteneurs arrêtés${NC}"
        ;;
    5)
        echo -e "${YELLOW}🗑️  Suppression des conteneurs et images...${NC}"
        docker-compose down -v
        docker stop neguslunar 2>/dev/null || true
        docker rm neguslunar 2>/dev/null || true
        docker rmi neguslunar-app 2>/dev/null || true
        echo -e "${GREEN}✅ Nettoyage terminé${NC}"
        ;;
    *)
        echo "❌ Choix invalide"
        exit 1
        ;;
esac

echo ""
echo "🌙 Terminé !"
