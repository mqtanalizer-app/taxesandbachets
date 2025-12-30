@echo off
chcp 65001 >nul
echo ========================================
echo   SUBIR PROYECTO A GITHUB
echo   SECURE ASSETS HOLDING LLC
echo ========================================
echo.

REM Verificar Git
where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git no está instalado.
    echo.
    echo Por favor instala Git desde: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo [✓] Git encontrado
git --version
echo.

REM Navegar al proyecto
cd /d "%~dp0"
echo [✓] Directorio: %CD%
echo.

REM Verificar si ya es un repositorio Git
if exist ".git" (
    echo [INFO] Ya es un repositorio Git
    echo.
) else (
    echo [INFO] Inicializando repositorio Git...
    git init
    echo.
)

REM Verificar configuración de Git
echo Verificando configuración de Git...
git config user.name >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ADVERTENCIA] Git no está configurado.
    echo.
    set /p gitname="Ingresa tu nombre para Git: "
    set /p gitemail="Ingresa tu email para Git: "
    git config --global user.name "%gitname%"
    git config --global user.email "%gitemail%"
    echo.
)

echo [✓] Git configurado
git config user.name
git config user.email
echo.

REM Agregar archivos
echo Agregando archivos al repositorio...
git add .
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] No se pudieron agregar los archivos
    pause
    exit /b 1
)
echo [✓] Archivos agregados
echo.

REM Verificar si hay cambios para commit
git diff --cached --quiet
if %ERRORLEVEL% EQU 0 (
    echo [INFO] No hay cambios nuevos para commitear
    echo.
) else (
    echo Creando commit...
    git commit -m "Update: SECURE ASSETS HOLDING LLC Tax Quote System"
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] No se pudo crear el commit
        pause
        exit /b 1
    )
    echo [✓] Commit creado
    echo.
)

REM Verificar si el remote existe
git remote get-url origin >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Agregando repositorio remoto de GitHub...
    git remote add origin https://github.com/mqtanalizer-app/taxesandbachets.git
    echo [✓] Repositorio remoto agregado
    echo.
) else (
    echo [INFO] Repositorio remoto ya configurado
    git remote -v
    echo.
)

REM Cambiar a rama main
git branch -M main >nul 2>&1

REM Subir a GitHub
echo ========================================
echo   SUBIENDO A GITHUB
echo ========================================
echo.
echo Si te pide credenciales:
echo - Usuario: mqtanalizer-app
echo - Contraseña: Usa un Personal Access Token
echo   (Crear en: https://github.com/settings/tokens)
echo.
pause

echo.
echo Subiendo cambios a GitHub...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   ✓ PROYECTO SUBIDO A GITHUB EXITOSAMENTE
    echo ========================================
    echo.
    echo Repositorio: https://github.com/mqtanalizer-app/taxesandbachets
    echo.
    echo Próximo paso: Conectar con Vercel
    echo 1. Ve a: https://vercel.com/dashboard
    echo 2. Click en "Add New Project"
    echo 3. Selecciona: mqtanalizer-app/taxesandbachets
    echo 4. Click en "Deploy"
    echo.
) else (
    echo.
    echo ========================================
    echo   ✗ ERROR AL SUBIR A GITHUB
    echo ========================================
    echo.
    echo Posibles causas:
    echo - Credenciales incorrectas
    echo - No tienes acceso al repositorio
    echo - Necesitas un Personal Access Token
    echo.
    echo Crea un token en: https://github.com/settings/tokens
    echo.
)

pause


