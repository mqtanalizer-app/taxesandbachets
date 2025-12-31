@echo off
echo ========================================
echo HABILITAR FIREBASE - GUIA PASO A PASO
echo ========================================
echo.
echo PASO 1: Ve a Firebase Console
echo https://console.firebase.google.com/
echo.
echo PASO 2: Crea un proyecto o selecciona uno existente
echo.
echo PASO 3: Agrega una app Web (icono ^<^/^>)
echo         - Copia las credenciales que aparecen
echo.
echo PASO 4: Habilita Authentication
echo         Build ^> Authentication ^> Get started
echo         Sign-in method ^> Email/Password ^> Enable
echo.
echo PASO 5: Habilita Firestore Database
echo         Build ^> Firestore Database ^> Create database
echo         Start in test mode ^> Selecciona ubicacion ^> Enable
echo.
echo PASO 6: Actualiza firebase-config.js con tus credenciales
echo.
echo PASO 7: Configura Security Rules en Firestore
echo         (Ver archivo habilitar-firebase.md para las reglas)
echo.
echo ========================================
echo.
echo Presiona cualquier tecla para abrir la guia completa...
pause >nul
start notepad habilitar-firebase.md
echo.
echo Abriendo Firebase Console...
start https://console.firebase.google.com/
echo.
pause
