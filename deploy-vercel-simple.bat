@echo off
echo ========================================
echo DEPLOY A VERCEL (MEJOR OPCION)
echo ========================================
echo.

REM Verificar si vercel está instalado
where vercel >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Vercel CLI no encontrado. Instalando...
    npm install -g vercel
    if %ERRORLEVEL% NEQ 0 (
        echo Error instalando Vercel CLI
        pause
        exit /b 1
    )
    echo Vercel CLI instalado correctamente.
    echo.
)

echo Verificando login...
vercel whoami >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo No estas logeado. Iniciando login...
    vercel login
)

echo.
echo ========================================
echo HACIENDO DEPLOY A PRODUCCION...
echo ========================================
echo.

vercel --prod

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo DEPLOY EXITOSO!
    echo ========================================
    echo.
    echo Tu aplicacion esta disponible en Vercel.
    echo Revisa la URL que aparecio arriba.
    echo.
    echo Tambien puedes verla en:
    echo https://vercel.com/dashboard
    echo.
) else (
    echo.
    echo Error durante el deploy
    echo.
)

pause
