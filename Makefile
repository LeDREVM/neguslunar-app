# Makefile pour NegusLunar
# Simplifie les commandes Docker courantes

.PHONY: help build up down restart logs shell clean test dev

# Variables
IMAGE_NAME = neguslunar-app
CONTAINER_NAME = neguslunar
PORT = 3000

help: ## Affiche l'aide
	@echo "🌙 NegusLunar - Commandes Make disponibles :"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'
	@echo ""

build: ## Build l'image Docker
	@echo "🔨 Build de l'image Docker..."
	docker build -t $(IMAGE_NAME) .
	@echo "✅ Build terminé !"

up: ## Démarre l'application avec Docker Compose
	@echo "🚀 Démarrage de l'application..."
	docker-compose up -d
	@echo "✅ Application disponible sur http://localhost:$(PORT)"

down: ## Arrête l'application
	@echo "⏹️  Arrêt de l'application..."
	docker-compose down
	@echo "✅ Application arrêtée"

restart: down up ## Redémarre l'application

logs: ## Affiche les logs en temps réel
	docker-compose logs -f

shell: ## Ouvre un shell dans le conteneur
	docker exec -it $(CONTAINER_NAME)-app sh

clean: ## Nettoie tout (conteneurs + images)
	@echo "🗑️  Nettoyage..."
	docker-compose down -v
	docker stop $(CONTAINER_NAME) 2>/dev/null || true
	docker rm $(CONTAINER_NAME) 2>/dev/null || true
	docker rmi $(IMAGE_NAME) 2>/dev/null || true
	@echo "✅ Nettoyage terminé"

rebuild: clean build up ## Rebuild complet + redémarrage

test: ## Vérifie que l'application répond
	@echo "🧪 Test de l'application..."
	@curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:$(PORT) || echo "❌ L'application ne répond pas"

dev: ## Lance le serveur de développement (npm)
	@echo "🔧 Démarrage du serveur de développement..."
	npm run dev

install: ## Installe les dépendances npm
	@echo "📦 Installation des dépendances..."
	npm install
	@echo "✅ Dépendances installées"

prod-build: ## Build pour production (npm)
	@echo "📦 Build de production..."
	npm run build
	@echo "✅ Build terminé (voir dossier dist/)"

stats: ## Affiche les statistiques du conteneur
	docker stats $(CONTAINER_NAME)-app --no-stream

ps: ## Liste les conteneurs en cours
	docker ps -a | grep $(IMAGE_NAME) || echo "Aucun conteneur trouvé"

images: ## Liste les images Docker
	docker images | grep $(IMAGE_NAME) || echo "Aucune image trouvée"

# Commandes avancées

docker-run: build ## Build et lance avec docker run (sans compose)
	@echo "🚀 Lancement avec docker run..."
	docker stop $(CONTAINER_NAME) 2>/dev/null || true
	docker rm $(CONTAINER_NAME) 2>/dev/null || true
	docker run -d -p $(PORT):80 --name $(CONTAINER_NAME) $(IMAGE_NAME)
	@echo "✅ Application disponible sur http://localhost:$(PORT)"

push: ## Push l'image vers Docker Hub (nécessite login)
	@read -p "Docker Hub username: " username; \
	docker tag $(IMAGE_NAME) $$username/$(IMAGE_NAME):latest; \
	docker push $$username/$(IMAGE_NAME):latest

pull: ## Pull l'image depuis Docker Hub
	@read -p "Docker Hub username: " username; \
	docker pull $$username/$(IMAGE_NAME):latest

backup: ## Sauvegarde l'image Docker
	@echo "💾 Sauvegarde de l'image..."
	docker save $(IMAGE_NAME) | gzip > $(IMAGE_NAME)-backup-$$(date +%Y%m%d).tar.gz
	@echo "✅ Sauvegarde créée : $(IMAGE_NAME)-backup-$$(date +%Y%m%d).tar.gz"

restore: ## Restaure l'image depuis un backup
	@read -p "Fichier de backup: " file; \
	docker load < $$file

# Installation Docker (pour serveurs neufs)

install-docker: ## Installe Docker (Linux uniquement)
	@echo "🐳 Installation de Docker..."
	curl -fsSL https://get.docker.com -o get-docker.sh
	sudo sh get-docker.sh
	sudo usermod -aG docker $$USER
	@echo "✅ Docker installé ! Redémarrez votre session."

install-compose: ## Installe Docker Compose (Linux uniquement)
	@echo "🐳 Installation de Docker Compose..."
	sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$$(uname -s)-$$(uname -m)" -o /usr/local/bin/docker-compose
	sudo chmod +x /usr/local/bin/docker-compose
	@echo "✅ Docker Compose installé !"

# Par défaut, afficher l'aide
.DEFAULT_GOAL := help
