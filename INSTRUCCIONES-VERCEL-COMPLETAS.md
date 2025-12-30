# 🚀 GUÍA COMPLETA: Crear Cuenta en Vercel y Desplegar desde Terminal

## 📋 ÍNDICE
1. [Crear Cuenta en Vercel](#1-crear-cuenta-en-vercel)
2. [Instalar Vercel CLI](#2-instalar-vercel-cli)
3. [Autenticarse desde Terminal](#3-autenticarse-desde-terminal)
4. [Desplegar el Proyecto](#4-desplegar-el-proyecto)
5. [Comandos Rápidos](#5-comandos-rápidos)
6. [Solución de Problemas](#6-solución-de-problemas)

---

## 1. CREAR CUENTA EN VERCEL

### Opción A: Crear cuenta desde el navegador (Recomendado)

1. **Abre tu navegador** y ve a: https://vercel.com/signup

2. **Elige un método de registro:**
   - **GitHub** (Recomendado si tienes cuenta)
   - **GitLab**
   - **Bitbucket**
   - **Email** (si no tienes cuenta de Git)

3. **Si eliges GitHub/GitLab/Bitbucket:**
   - Haz clic en el botón correspondiente
   - Autoriza a Vercel a acceder a tu cuenta
   - ¡Listo! Tu cuenta estará creada

4. **Si eliges Email:**
   - Ingresa tu email
   - Crea una contraseña (mínimo 8 caracteres)
   - Verifica tu email
   - ¡Listo!

### Opción B: Crear cuenta desde terminal (Después de instalar CLI)

La cuenta se creará automáticamente cuando ejecutes `vercel login` (ver paso 3)

---

## 2. INSTALAR VERCEL CLI

### Windows (PowerShell o CMD)

```powershell
# Abre PowerShell o CMD como Administrador
# Presiona Windows + X y selecciona "Windows PowerShell (Administrador)"

# Verifica que Node.js esté instalado
node --version
npm --version

# Si no tienes Node.js, descárgalo de: https://nodejs.org/

# Instala Vercel CLI globalmente
npm install -g vercel

# Verifica la instalación
vercel --version
```

### Si tienes problemas de permisos en Windows:

```powershell
# Ejecuta PowerShell como Administrador y luego:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
npm install -g vercel
```

### Alternativa: Instalar sin permisos de administrador

```powershell
# Instala solo para tu usuario (no requiere admin)
npm install -g vercel --prefix %APPDATA%\npm
```

---

## 3. AUTENTICARSE DESDE TERMINAL

### Paso 1: Navegar a la carpeta del proyecto

```powershell
# Abre PowerShell o CMD
cd C:\Users\Luis888\Desktop\taxesandbachets

# Verifica que estás en la carpeta correcta
dir
# Deberías ver: presupuestopagodeimpuestos.html, package.json, etc.
```

### Paso 2: Iniciar sesión en Vercel

```powershell
# Ejecuta el comando de login
vercel login

# Se abrirá tu navegador automáticamente
# Si no se abre, copia la URL que aparece en la terminal
# Sigue las instrucciones en el navegador para autorizar
```

**Lo que verás:**
```
Vercel CLI
> Logging in...
> Opening browser...
> Success! Authentication complete.
```

### Si el navegador no se abre automáticamente:

1. Verás una URL como: `https://vercel.com/cli/login?token=xxxxx`
2. Copia esa URL y ábrela en tu navegador
3. Autoriza la aplicación
4. Vuelve a la terminal

---

## 4. DESPLEGAR EL PROYECTO

### Opción A: Deployment Interactivo (Primera vez)

```powershell
# Asegúrate de estar en la carpeta del proyecto
cd C:\Users\Luis888\Desktop\taxesandbachets

# Ejecuta el comando de deploy
vercel

# Sigue las preguntas:
# ? Set up and deploy "C:\Users\Luis888\Desktop\taxesandbachets"? [Y/n] 
#   → Presiona Enter (Y)

# ? Which scope do you want to deploy to?
#   → Selecciona tu cuenta (usualmente tu email o nombre de usuario)

# ? Link to existing project? [y/N]
#   → Presiona Enter (N) - Es la primera vez

# ? What's your project's name?
#   → Escribe: secure-assets-tax-quote
#   → O presiona Enter para usar el nombre por defecto

# ? In which directory is your code located? [./]
#   → Presiona Enter (usará la carpeta actual)

# ? Want to override the settings? [y/N]
#   → Presiona Enter (N) - Usará la configuración de vercel.json
```

**Resultado esperado:**
```
✅ Production: https://secure-assets-tax-quote.vercel.app
✅ Preview: https://secure-assets-tax-quote-xxxxx.vercel.app
```

### Opción B: Deployment Directo a Producción

```powershell
# Despliega directamente a producción (sin preview)
vercel --prod

# O con el alias corto:
vercel -p
```

### Opción C: Deployment con Confirmación Automática

```powershell
# Despliega sin preguntas (usa configuración guardada)
vercel --prod --yes
```

---

## 5. COMANDOS RÁPIDOS

### Comandos esenciales de Vercel CLI

```powershell
# Ver ayuda
vercel --help

# Ver información del proyecto actual
vercel inspect

# Ver todos los deployments
vercel list

# Ver logs del último deployment
vercel logs

# Remover un deployment
vercel remove

# Ver información de tu cuenta
vercel whoami

# Cerrar sesión
vercel logout

# Ver variables de entorno
vercel env ls

# Agregar dominio personalizado
vercel domains add tu-dominio.com
```

### Scripts útiles para agregar a package.json

Ya tienes estos scripts, pero aquí están los comandos:

```powershell
# Iniciar servidor local
npm start
# O
npm run dev

# Desplegar a producción
vercel --prod
```

---

## 6. SOLUCIÓN DE PROBLEMAS

### Error: "vercel: command not found"

**Solución:**
```powershell
# Reinstala Vercel CLI
npm uninstall -g vercel
npm install -g vercel

# Verifica la instalación
where vercel
vercel --version
```

### Error: "You are not logged in"

**Solución:**
```powershell
# Vuelve a iniciar sesión
vercel login

# O verifica tu sesión
vercel whoami
```

### Error: "Project not found"

**Solución:**
```powershell
# Elimina la configuración local y vuelve a desplegar
del .vercel
vercel
```

### Error: "Build failed"

**Solución:**
```powershell
# Este proyecto no necesita build, pero si aparece el error:
# Verifica que vercel.json esté correcto
# Asegúrate de que todos los archivos estén en la raíz
```

### El sitio no carga correctamente

**Solución:**
```powershell
# Verifica que el archivo vercel.json tenga las rutas correctas
# Asegúrate de que presupuestopagodeimpuestos.html existe
# Revisa los logs:
vercel logs
```

### Problemas con permisos en Windows

**Solución:**
```powershell
# Ejecuta PowerShell como Administrador
# O instala sin permisos globales:
npm install -g vercel --prefix %APPDATA%\npm

# Luego agrega a PATH (si es necesario):
$env:Path += ";$env:APPDATA\npm"
```

---

## 📝 SECUENCIA COMPLETA DE COMANDOS (COPIA Y PEGA)

### Para la primera vez (completo):

```powershell
# 1. Abre PowerShell como Administrador
# 2. Navega al proyecto
cd C:\Users\Luis888\Desktop\taxesandbachets

# 3. Instala Vercel CLI (si no está instalado)
npm install -g vercel

# 4. Verifica instalación
vercel --version

# 5. Inicia sesión
vercel login

# 6. Despliega (primera vez - interactivo)
vercel

# 7. Para deployments futuros (directo a producción)
vercel --prod
```

### Para deployments futuros (rápido):

```powershell
cd C:\Users\Luis888\Desktop\taxesandbachets
vercel --prod
```

---

## 🎯 CONFIGURACIÓN ADICIONAL

### Agregar variables de entorno (si las necesitas)

```powershell
# Agregar variable
vercel env add VARIABLE_NAME production

# Ver variables
vercel env ls

# Eliminar variable
vercel env rm VARIABLE_NAME production
```

### Configurar dominio personalizado

```powershell
# Agregar dominio
vercel domains add tu-dominio.com

# Ver dominios
vercel domains ls

# Eliminar dominio
vercel domains rm tu-dominio.com
```

### Ver información del proyecto

```powershell
# Ver detalles del proyecto
vercel inspect

# Ver todos los deployments
vercel list

# Ver logs en tiempo real
vercel logs --follow
```

---

## ✅ CHECKLIST DE DEPLOYMENT

Antes de desplegar, verifica:

- [ ] Tienes cuenta en Vercel creada
- [ ] Vercel CLI está instalado (`vercel --version`)
- [ ] Estás autenticado (`vercel whoami`)
- [ ] Estás en la carpeta correcta del proyecto
- [ ] El archivo `vercel.json` existe y está correcto
- [ ] El archivo `presupuestopagodeimpuestos.html` existe
- [ ] Has probado el sitio localmente (`npm start`)

---

## 🔗 ENLACES ÚTILES

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Documentación Vercel CLI:** https://vercel.com/docs/cli
- **Crear cuenta:** https://vercel.com/signup
- **Soporte Vercel:** https://vercel.com/support

---

## 📞 CONTACTO

Si tienes problemas con el deployment:
- **Email:** janinehubner@secureassetshldg.com
- **Documentación Vercel:** https://vercel.com/docs

---

## 🎉 ¡LISTO!

Una vez desplegado, tu sitio estará disponible en:
- **URL de producción:** `https://secure-assets-tax-quote.vercel.app`
- **URL personalizada:** Puedes configurar un dominio personalizado desde el dashboard

**Nota:** Cada vez que hagas cambios, simplemente ejecuta `vercel --prod` para actualizar el sitio.

