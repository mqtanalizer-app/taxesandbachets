@echo off
chcp 65001 >nul
echo ========================================
echo   SUBIR A GITHUB - VERSION SIMPLE
echo   SECURE ASSETS HOLDING LLC
echo ========================================
echo.

cd /d "%~dp0"
echo Directorio: %CD%
echo.

REM Paso 1: Verificar Git
echo [1/7] Verificando Git...
where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Git no esta instalado
    echo Descarga desde: https://git-scm.com/download/win
    pause
    exit /b 1
)
echo OK - Git encontrado
echo.

REM Paso 2: Inicializar Git
echo [2/7] Inicializando Git...
if not exist ".git" (
    git init
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: No se pudo inicializar Git
        pause
        exit /b 1
    )
    echo OK - Git inicializado
) else (
    echo OK - Git ya estaba inicializado
)
echo.

REM Paso 3: Configurar Git (si no esta configurado)
echo [3/7] Verificando configuracion de Git...
git config user.name >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Git no esta configurado. Necesito tu informacion:
    set /p gitname="Tu nombre: "
    set /p gitemail="Tu email: "
    git config --global user.name "%gitname%"
    git config --global user.email "%gitemail%"
    echo OK - Git configurado
) else (
    echo OK - Git ya esta configurado
    git config user.name
    git config user.email
)
echo.

REM Paso 4: Agregar archivos
echo [4/7] Agregando archivos...
git add .
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: No se pudieron agregar archivos
    pause
    exit /b 1
)
echo OK - Archivos agregados
echo.

REM Paso 5: Crear commit
echo [5/7] Creando commit...
git commit -m "Initial commit - SECURE ASSETS HOLDING LLC Tax Quote System" 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ADVERTENCIA: No hay cambios nuevos para commitear
    echo (Esto es normal si ya hiciste commit antes)
) else (
    echo OK - Commit creado
)
echo.

REM Paso 6: Agregar remote
echo [6/7] Configurando repositorio remoto...
git remote remove origin 2>nul
git remote add origin https://github.com/mqtanalizer-app/taxesandbachets.git
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: No se pudo agregar el repositorio remoto
    pause
    exit /b 1
)
echo OK - Repositorio remoto configurado
git remote -v
echo.

REM Paso 7: Subir a GitHub
echo [7/7] Subiendo a GitHub...
echo.
echo IMPORTANTE: Te pedira credenciales
echo - Usuario: mqtanalizer-app
echo - Contrasena: Usa un Personal Access Token
echo   (Crear en: https://github.com/settings/tokens)
echo.
pause

git branch -M main
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   EXITO! PROYECTO SUBIDO A GITHUB
    echo ========================================
    echo.
    echo Repositorio: https://github.com/mqtanalizer-app/taxesandbachets
    echo.
    echo Proximo paso: Conectar con Vercel
    echo 1. Ve a: https://vercel.com/dashboard
    echo 2. Click en "Add New Project"
    echo 3. Selecciona: mqtanalizer-app/taxesandbachets
    echo 4. Click en "Deploy"
    echo.
) else (
    echo.
    echo ========================================
    echo   ERROR AL SUBIR A GITHUB
    echo ========================================
    echo.
    echo Posibles causas:
    echo 1. Credenciales incorrectas
    echo 2. Necesitas un Personal Access Token
    echo 3. No tienes acceso al repositorio
    echo.
    echo Crea un token en: https://github.com/settings/tokens
    echo.
)

pause

