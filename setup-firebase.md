# Setup Firebase con npm - Guía Completa

Ya tienes las credenciales de Firebase configuradas. Ahora necesitas instalar Firebase via npm y configurar el proyecto.

## Paso 1: Instalar Firebase

Ejecuta en la terminal:

```bash
npm install firebase
```

## Paso 2: Verificar instalación

Verifica que Firebase se instaló correctamente:

```bash
npm list firebase
```

## Paso 3: Opciones de uso

Tienes dos opciones para usar Firebase:

### Opción A: Usar módulos ES6 directamente (Recomendado para desarrollo)

Los archivos ya están configurados para usar módulos ES6. Solo necesitas:

1. Servir la aplicación con un servidor que soporte módulos ES6
2. Asegurarte de que los archivos HTML usen `type="module"`

### Opción B: Usar un bundler (Webpack, Vite, etc.) para producción

Si quieres optimizar para producción, puedes usar un bundler. Ya incluí un `webpack.config.js` básico.

Para usar Webpack:

```bash
npm install --save-dev webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env
```

Luego ejecuta:

```bash
npx webpack serve
```

## Configuración Actual

✅ `firebase-config.js` - Configurado con tus credenciales
✅ `database.js` - Actualizado para usar SDK modular
✅ `auth-service.js` - Actualizado para usar SDK modular
✅ `irs-credentials-manager.js` - Actualizado para usar SDK modular

## Credenciales Configuradas

Tu Firebase está configurado con:
- **Project ID**: taxesapp-9f5c2
- **Auth Domain**: taxesapp-9f5c2.firebaseapp.com
- **Storage**: taxesapp-9f5c2.firebasestorage.app

## Próximos Pasos

1. **Instala Firebase**:
   ```bash
   npm install firebase
   ```

2. **Habilita Authentication en Firebase Console**:
   - Ve a: https://console.firebase.google.com/project/taxesapp-9f5c2/authentication
   - Habilita "Email/Password" provider

3. **Habilita Firestore**:
   - Ve a: https://console.firebase.google.com/project/taxesapp-9f5c2/firestore
   - Crea la base de datos si no existe

4. **Configura Security Rules** (ver `habilitar-firebase.md`)

5. **Servir la aplicación**:
   ```bash
   npm start
   ```
   O usa cualquier servidor HTTP local que soporte módulos ES6.

## Nota sobre Módulos ES6

Los archivos JavaScript ahora usan `import`/`export` que requieren:
- Servidor HTTP (no `file://`)
- Soporte para módulos ES6 en el navegador
- O un bundler para producción

Para desarrollo rápido, puedes usar:
```bash
npx serve . -l 3000
```

O cualquier otro servidor HTTP simple.
