@echo off
echo ========================================
echo   DEPLOY A VERCEL - SECURE ASSETS HOLDING LLC
echo ========================================
echo.

REM Verificar si Vercel CLI está instalado
where vercel >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Vercel CLI no está instalado.
    echo.
    echo Instalando Vercel CLI...
    npm install -g vercel
    echo.
)

echo Verificando archivos...
if not exist "presupuestopagodeimpuestos.html" (
    echo [ERROR] No se encuentra el archivo principal!
    pause
    exit /b 1
)

echo.
echo Iniciando deployment a Vercel...
echo.

vercel --prod

echo.
echo ========================================
echo   Deployment completado!
echo ========================================
echo.
pause


