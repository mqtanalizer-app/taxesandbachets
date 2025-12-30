# 📤 GUÍA PASO A PASO: Subir Proyecto a GitHub y Desplegar en Vercel

## 🎯 OBJETIVO
Subir tu proyecto local a GitHub y luego desplegarlo automáticamente en Vercel.

---

## 📋 PASO 1: Verificar que Git está instalado

Abre PowerShell o CMD y ejecuta:

```powershell
git --version
```

**Si NO está instalado:**
1. Descarga Git desde: https://git-scm.com/download/win
2. Instala con las opciones por defecto
3. Reinicia la terminal

---

## 📋 PASO 2: Configurar Git (Solo primera vez)

```powershell
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"
```

**Ejemplo:**
```powershell
git config --global user.name "Luis888"
git config --global user.email "janinehubner@secureassetshldg.com"
```

---

## 📋 PASO 3: Navegar a tu proyecto

```powershell
cd C:\Users\Luis888\Desktop\taxesandbachets
```

---

## 📋 PASO 4: Inicializar Git en tu proyecto

```powershell
git init
```

**Resultado esperado:** `Initialized empty Git repository in C:/Users/Luis888/Desktop/taxesandbachets/.git/`

---

## 📋 PASO 5: Agregar todos los archivos

```powershell
git add .
```

Este comando agrega todos los archivos de tu proyecto a Git.

---

## 📋 PASO 6: Hacer el primer commit

```powershell
git commit -m "Initial commit - SECURE ASSETS HOLDING LLC Tax Quote System"
```

**Resultado esperado:** Verás algo como `[main (root-commit) xxxxx] Initial commit...`

---

## 📋 PASO 7: Conectar con GitHub

```powershell
git remote add origin https://github.com/mqtanalizer-app/taxesandbachets.git
```

---

## 📋 PASO 8: Verificar la conexión

```powershell
git remote -v
```

**Deberías ver:**
```
origin  https://github.com/mqtanalizer-app/taxesandbachets.git (fetch)
origin  https://github.com/mqtanalizer-app/taxesandbachets.git (push)
```

---

## 📋 PASO 9: Subir a GitHub

```powershell
git branch -M main
git push -u origin main
```

**IMPORTANTE:** Te pedirá credenciales de GitHub:
- **Usuario:** Tu nombre de usuario de GitHub (mqtanalizer-app)
- **Contraseña:** NO uses tu contraseña normal, usa un **Personal Access Token**

### Si te pide contraseña:

1. Ve a: https://github.com/settings/tokens
2. Click en "Generate new token" > "Generate new token (classic)"
3. Nombre: `Vercel Deployment`
4. Selecciona el scope: `repo` (marca la casilla completa)
5. Click en "Generate token"
6. **COPIA EL TOKEN** (solo se muestra una vez)
7. Úsalo como contraseña cuando Git te la pida

---

## 📋 PASO 10: Verificar en GitHub

Ve a: https://github.com/mqtanalizer-app/taxesandbachets

Deberías ver todos tus archivos subidos.

---

## 🚀 PASO 11: Conectar GitHub con Vercel

### Opción A: Desde Vercel Dashboard (Más Fácil)

1. Ve a: https://vercel.com/dashboard
2. Click en "Add New Project"
3. Click en "Import Git Repository"
4. Selecciona: `mqtanalizer-app/taxesandbachets`
5. Click en "Import"
6. Vercel detectará automáticamente la configuración
7. Click en "Deploy"
8. ¡Listo! Tu sitio estará en línea en menos de 1 minuto

### Opción B: Desde Terminal

```powershell
# Asegúrate de estar autenticado
vercel login

# Conectar con GitHub
vercel link

# Sigue las instrucciones:
# - Set up and deploy? → Y
# - Which scope? → Tu cuenta
# - Link to existing project? → Y
# - What's the name of your existing project? → taxesandbachets
# - In which directory is your code located? → ./
```

---

## 📋 PASO 12: Desplegar

```powershell
vercel --prod
```

O desde el dashboard de Vercel, cada vez que hagas `git push`, se desplegará automáticamente.

---

## 🔄 ACTUALIZAR EL PROYECTO (Futuro)

Cada vez que hagas cambios:

```powershell
cd C:\Users\Luis888\Desktop\taxesandbachets
git add .
git commit -m "Descripción de los cambios"
git push
```

Vercel desplegará automáticamente si está conectado con GitHub.

---

## ✅ CHECKLIST COMPLETO

- [ ] Git instalado (`git --version`)
- [ ] Git configurado (nombre y email)
- [ ] En la carpeta del proyecto
- [ ] `git init` ejecutado
- [ ] `git add .` ejecutado
- [ ] `git commit` ejecutado
- [ ] Repositorio remoto agregado
- [ ] Archivos subidos a GitHub (`git push`)
- [ ] Proyecto conectado en Vercel
- [ ] Sitio desplegado y funcionando

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### Error: "fatal: not a git repository"
**Solución:** Ejecuta `git init` primero

### Error: "remote origin already exists"
**Solución:**
```powershell
git remote remove origin
git remote add origin https://github.com/mqtanalizer-app/taxesandbachets.git
```

### Error: "Authentication failed"
**Solución:** Usa un Personal Access Token en lugar de contraseña

### Error: "Permission denied"
**Solución:** Verifica que tengas acceso al repositorio en GitHub

---

## 📞 AYUDA

Si tienes problemas, revisa:
- Documentación Git: https://git-scm.com/doc
- Documentación Vercel: https://vercel.com/docs

