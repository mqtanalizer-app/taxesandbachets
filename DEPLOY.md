# 🚀 Guía de Deployment - SECURE ASSETS HOLDING LLC

## Opción 1: Vercel (Recomendado - Más Fácil)

### Método A: Desde la Web (Sin código)

1. Ve a [vercel.com](https://vercel.com)
2. Crea una cuenta gratuita (puedes usar GitHub, Google, o email)
3. Haz clic en "Add New Project"
4. Conecta tu repositorio de GitHub (si lo tienes) o:
5. **Arrastra y suelta** la carpeta `taxesandbachets` directamente en Vercel
6. Vercel detectará automáticamente que es un proyecto estático
7. Haz clic en "Deploy"
8. ¡Listo! Tu sitio estará en línea en menos de 1 minuto

### Método B: Desde la Terminal (Más Rápido)

```bash
# 1. Instala Vercel CLI globalmente
npm install -g vercel

# 2. Navega a la carpeta del proyecto
cd C:\Users\Luis888\Desktop\taxesandbachets

# 3. Inicia el deployment
vercel

# 4. Sigue las instrucciones:
#    - ¿Set up and deploy? Y
#    - ¿Which scope? (selecciona tu cuenta)
#    - ¿Link to existing project? N
#    - ¿What's your project's name? secure-assets-tax-quote
#    - ¿In which directory is your code located? ./
#    - Vercel desplegará automáticamente
```

**URL resultante:** `https://secure-assets-tax-quote.vercel.app` (o el nombre que elijas)

---

## Opción 2: Netlify (Alternativa Excelente)

### Método A: Drag & Drop (Más Fácil)

1. Ve a [app.netlify.com/drop](https://app.netlify.com/drop)
2. Arrastra la carpeta `taxesandbachets` completa
3. Netlify la subirá y desplegará automáticamente
4. Obtendrás una URL como: `https://random-name-123.netlify.app`

### Método B: Netlify CLI

```bash
# 1. Instala Netlify CLI
npm install -g netlify-cli

# 2. Navega al proyecto
cd C:\Users\Luis888\Desktop\taxesandbachets

# 3. Inicia sesión
netlify login

# 4. Despliega
netlify deploy --prod
```

---

## Opción 3: GitHub Pages (Gratis con Repositorio)

1. Crea un repositorio en GitHub llamado `secure-assets-tax-quote`
2. Sube los archivos:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/TU_USUARIO/secure-assets-tax-quote.git
   git push -u origin main
   ```
3. Ve a Settings > Pages en tu repositorio
4. Selecciona la rama `main` y carpeta `/ (root)`
5. Guarda
6. Tu sitio estará en: `https://TU_USUARIO.github.io/secure-assets-tax-quote`

---

## 📝 Configuración Post-Deployment

### Agregar Dominio Personalizado (Opcional)

**Vercel:**
- Settings > Domains > Add Domain
- Ingresa tu dominio (ej: `taxes.secureassets.com`)
- Sigue las instrucciones de DNS

**Netlify:**
- Site settings > Domain management > Add custom domain
- Configura los registros DNS según las instrucciones

### Agregar Logo

1. Coloca tu logo en `assets/logo.png` o `assets/logo.svg`
2. El HTML ya está preparado para mostrarlo automáticamente
3. Haz un nuevo deploy para que se actualice

---

## 🔄 Actualizar el Sitio

Cada vez que hagas cambios:

**Vercel:**
```bash
vercel --prod
```

**Netlify:**
```bash
netlify deploy --prod
```

O simplemente arrastra la carpeta de nuevo a la plataforma.

---

## ✅ Checklist Pre-Deployment

- [x] Archivo HTML principal listo
- [x] package.json creado
- [x] vercel.json configurado
- [x] README.md con instrucciones
- [ ] Logo agregado en `assets/logo.png` (opcional)
- [ ] Probar localmente antes de deploy

---

## 🆘 Solución de Problemas

**Error: "Cannot find module"**
- No es necesario instalar dependencias, es un proyecto estático

**El sitio no carga**
- Verifica que el archivo principal se llame `presupuestopagodeimpuestos.html`
- Asegúrate de que todos los archivos estén en la raíz del proyecto

**Firma digital no funciona**
- Verifica que estés usando HTTPS (Vercel y Netlify lo proporcionan automáticamente)

---

## 📞 Soporte

Para ayuda con el deployment, contacta a: janinehubner@secureassetshldg.com

---

**Recomendación:** Usa **Vercel** - es el más rápido y fácil para este tipo de proyectos.


