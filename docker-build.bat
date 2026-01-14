@echo off
REM Script de build et déploiement Docker pour NegusLunar (Windows)
REM Créé par Négus Dja

echo.
echo ========================================
echo     NegusLunar - Build Docker
echo ========================================
echo.

REM Vérifier que Docker est installé
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERREUR] Docker n'est pas installe ou n'est pas demarre
    echo Veuillez installer Docker Desktop depuis https://www.docker.com/
    pause
    exit /b 1
)

echo [OK] Docker est installe et demarre
echo.

echo Choisissez une option :
echo.
echo 1) Build l'image Docker
echo 2) Build et lancer avec Docker
echo 3) Lancer avec Docker Compose
echo 4) Arreter les conteneurs
echo 5) Supprimer les conteneurs et images
echo 6) Voir les logs
echo.

set /p choice="Votre choix (1-6) : "

if "%choice%"=="1" goto build
if "%choice%"=="2" goto buildrun
if "%choice%"=="3" goto compose
if "%choice%"=="4" goto stop
if "%choice%"=="5" goto clean
if "%choice%"=="6" goto logs
goto invalid

:build
echo.
echo [INFO] Build de l'image Docker...
docker build -t neguslunar-app .
if %errorlevel% equ 0 (
    echo.
    echo [OK] Image creee avec succes !
) else (
    echo.
    echo [ERREUR] Erreur lors du build
)
goto end

:buildrun
echo.
echo [INFO] Build de l'image...
docker build -t neguslunar-app .
if %errorlevel% neq 0 goto error
echo.
echo [INFO] Arret du conteneur existant (si present)...
docker stop neguslunar 2>nul
docker rm neguslunar 2>nul
echo.
echo [INFO] Lancement du conteneur...
docker run -d -p 3000:80 --name neguslunar neguslunar-app
if %errorlevel% equ 0 (
    echo.
    echo [OK] Application disponible sur http://localhost:3000
) else (
    echo.
    echo [ERREUR] Erreur lors du lancement
)
goto end

:compose
echo.
echo [INFO] Lancement avec Docker Compose...
docker-compose up -d --build
if %errorlevel% equ 0 (
    echo.
    echo [OK] Application disponible sur http://localhost:3000
) else (
    echo.
    echo [ERREUR] Erreur lors du lancement
)
goto end

:stop
echo.
echo [INFO] Arret des conteneurs...
docker-compose down 2>nul
docker stop neguslunar 2>nul
echo.
echo [OK] Conteneurs arretes
goto end

:clean
echo.
echo [INFO] Suppression des conteneurs et images...
docker-compose down -v 2>nul
docker stop neguslunar 2>nul
docker rm neguslunar 2>nul
docker rmi neguslunar-app 2>nul
echo.
echo [OK] Nettoyage termine
goto end

:logs
echo.
echo Choisir la source des logs :
echo 1) Docker Compose
echo 2) Conteneur neguslunar
set /p logchoice="Votre choix : "
if "%logchoice%"=="1" (
    docker-compose logs -f
) else (
    docker logs -f neguslunar
)
goto end

:invalid
echo.
echo [ERREUR] Choix invalide
goto end

:error
echo.
echo [ERREUR] Une erreur s'est produite
goto end

:end
echo.
echo ========================================
echo        Termine !
echo ========================================
pause
