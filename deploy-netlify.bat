@echo off
echo ========================================
echo   DEPLOY A NETLIFY - SECURE ASSETS HOLDING LLC
echo ========================================
echo.

REM Verificar si Netlify CLI está instalado
where netlify >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Netlify CLI no está instalado.
    echo.
    echo Instalando Netlify CLI...
    npm install -g netlify-cli
    echo.
)

echo Verificando archivos...
if not exist "presupuestopagodeimpuestos.html" (
    echo [ERROR] No se encuentra el archivo principal!
    pause
    exit /b 1
)

echo.
echo Iniciando deployment a Netlify...
echo.

netlify deploy --prod

echo.
echo ========================================
echo   Deployment completado!
echo ========================================
echo.
pause

