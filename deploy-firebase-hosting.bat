@echo off
echo ========================================
echo DEPLOY A FIREBASE HOSTING
echo ========================================
echo.

REM Verificar si firebase-tools está instalado
where firebase >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Firebase CLI no encontrado. Instalando...
    npm install -g firebase-tools
    if %ERRORLEVEL% NEQ 0 (
        echo Error instalando Firebase CLI
        pause
        exit /b 1
    )
    echo Firebase CLI instalado correctamente.
    echo.
)

echo Verificando login...
firebase login --no-localhost

echo.
echo Inicializando Firebase Hosting (solo primera vez)...
firebase init hosting

echo.
echo ========================================
echo HACIENDO DEPLOY...
echo ========================================
echo.

firebase deploy --only hosting

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo DEPLOY EXITOSO!
    echo ========================================
    echo.
    echo Tu aplicacion esta disponible en:
    echo https://taxesapp-9f5c2.web.app
    echo https://taxesapp-9f5c2.firebaseapp.com
    echo.
) else (
    echo.
    echo Error durante el deploy
    echo.
)

pause
