@echo off
chcp 65001 >nul
echo ========================================
echo   VERIFICACION DEL ESTADO DE GIT
echo ========================================
echo.

cd /d "%~dp0"

echo Verificando Git...
where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [X] Git NO esta instalado
    echo.
    echo Instala Git desde: https://git-scm.com/download/win
    pause
    exit /b 1
) else (
    echo [OK] Git esta instalado
    git --version
    echo.
)

echo Verificando si Git esta inicializado...
if exist ".git" (
    echo [OK] Git esta inicializado
    echo.
    echo Estado del repositorio:
    git status
    echo.
    echo.
    echo Repositorios remotos:
    git remote -v
    echo.
    echo.
    echo Ultimos commits:
    git log --oneline -5 2>nul
    if %ERRORLEVEL% NEQ 0 (
        echo [INFO] No hay commits aun
    )
) else (
    echo [X] Git NO esta inicializado
    echo.
    echo El script subir-github.bat no se ejecuto correctamente
    echo o se detuvo antes de inicializar Git.
    echo.
    echo Para inicializar Git manualmente, ejecuta:
    echo   git init
    echo.
)

echo.
pause


