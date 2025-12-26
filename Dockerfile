# Étape 1 : Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copier les fichiers package
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source
COPY . .

# Build l'app
RUN npm run build

# Étape 2 : Runtime (Nginx)
FROM nginx:alpine

# Copier la config nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers buildés depuis l'étape 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Port
EXPOSE 80

# Lancer nginx
CMD ["nginx", "-g", "daemon off;"]
