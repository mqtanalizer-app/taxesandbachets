@echo off
chcp 65001 >nul
echo ========================================
echo   DEPLOY COMPLETO A VERCEL
echo   SECURE ASSETS HOLDING LLC
echo ========================================
echo.

REM Verificar Node.js
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js no está instalado.
    echo.
    echo Por favor instala Node.js desde: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [✓] Node.js encontrado
node --version
echo.

REM Verificar npm
where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm no está disponible.
    pause
    exit /b 1
)

echo [✓] npm encontrado
npm --version
echo.

REM Verificar si Vercel CLI está instalado
where vercel >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Vercel CLI no está instalado. Instalando...
    echo.
    npm install -g vercel
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [ERROR] No se pudo instalar Vercel CLI.
        echo.
        echo Intenta ejecutar como Administrador:
        echo 1. Cierra esta ventana
        echo 2. Click derecho en este archivo
        echo 3. Selecciona "Ejecutar como administrador"
        echo.
        pause
        exit /b 1
    )
    echo.
    echo [✓] Vercel CLI instalado correctamente
    echo.
) else (
    echo [✓] Vercel CLI ya está instalado
    vercel --version
    echo.
)

REM Verificar archivos del proyecto
echo Verificando archivos del proyecto...
if not exist "presupuestopagodeimpuestos.html" (
    echo [ERROR] No se encuentra presupuestopagodeimpuestos.html
    echo.
    echo Asegúrate de estar en la carpeta correcta del proyecto.
    pause
    exit /b 1
)

if not exist "vercel.json" (
    echo [ADVERTENCIA] No se encuentra vercel.json
    echo Se usará la configuración por defecto.
    echo.
)

echo [✓] Archivos del proyecto verificados
echo.

REM Verificar autenticación
echo Verificando autenticación en Vercel...
vercel whoami >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [INFO] No estás autenticado en Vercel.
    echo.
    echo Se abrirá el navegador para iniciar sesión...
    echo Si no se abre, copia la URL que aparece.
    echo.
    pause
    vercel login
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [ERROR] No se pudo completar el login.
        pause
        exit /b 1
    )
) else (
    echo [✓] Autenticado en Vercel
    vercel whoami
    echo.
)

echo ========================================
echo   INICIANDO DEPLOYMENT
echo ========================================
echo.
echo Opciones:
echo 1. Deployment interactivo (primera vez)
echo 2. Deployment directo a producción
echo.
set /p opcion="Selecciona opción (1 o 2): "

if "%opcion%"=="1" (
    echo.
    echo Iniciando deployment interactivo...
    echo.
    vercel
) else if "%opcion%"=="2" (
    echo.
    echo Iniciando deployment a producción...
    echo.
    vercel --prod
) else (
    echo.
    echo Opción no válida. Iniciando deployment interactivo...
    echo.
    vercel
)

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   ✓ DEPLOYMENT COMPLETADO EXITOSAMENTE
    echo ========================================
    echo.
    echo Tu sitio está en línea!
    echo.
    echo Para ver tus deployments:
    echo   vercel list
    echo.
    echo Para ver logs:
    echo   vercel logs
    echo.
    echo Para actualizar en el futuro:
    echo   vercel --prod
    echo.
) else (
    echo.
    echo ========================================
    echo   ✗ ERROR EN EL DEPLOYMENT
    echo ========================================
    echo.
    echo Revisa los mensajes de error arriba.
    echo.
)

pause


