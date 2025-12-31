# Guía Rápida: Habilitar Firebase

## Paso 1: Crear/Acceder a Firebase Project

1. Ve a: https://console.firebase.google.com/
2. Si no tienes proyecto, haz clic en **"Add project"**
3. Nombre del proyecto: `secure-assets-tax-quote` (o el que prefieras)
4. Sigue los pasos del asistente (puedes desactivar Google Analytics si no lo necesitas)

## Paso 2: Configurar Firebase para Web

1. En el Dashboard de Firebase, haz clic en el icono **</>** (Add app - Web)
2. Nombre de la app: `Tax Quote System`
3. Marca la casilla "Also set up Firebase Hosting" (opcional)
4. Haz clic en **Register app**
5. **IMPORTANTE**: Copia el objeto de configuración que aparece, se verá así:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

## Paso 3: Habilitar Authentication

1. En el menú lateral, ve a **Build** → **Authentication**
2. Haz clic en **Get started**
3. En la pestaña **Sign-in method**, haz clic en **Email/Password**
4. Activa el primer toggle (Enable)
5. Haz clic en **Save**

## Paso 4: Habilitar Firestore Database

1. En el menú lateral, ve a **Build** → **Firestore Database**
2. Haz clic en **Create database**
3. Selecciona **Start in test mode** (por ahora, luego configuraremos las reglas)
4. Selecciona una ubicación (elige la más cercana: `us-central`, `us-east`, etc.)
5. Haz clic en **Enable**

## Paso 5: Configurar Security Rules

1. Ve a **Firestore Database** → **Rules**
2. Reemplaza las reglas con estas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check admin role
    function isAdmin() {
      return request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Users collection
    match /users/{userId} {
      // Users can read their own data
      allow read: if request.auth != null && request.auth.uid == userId;
      // Users can write their own data (including initial creation)
      allow write: if request.auth != null && request.auth.uid == userId;
      // Admins can read all users
      allow read: if isAdmin();
    }
    
    // Admin collection - admin only
    match /admin/{document=**} {
      allow read, write: if isAdmin();
    }
    
    // Clients collection - authenticated users
    match /clients/{clientId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Haz clic en **Publish**

## Paso 6: Actualizar firebase-config.js

1. Abre el archivo `firebase-config.js` en tu proyecto
2. Reemplaza los valores con los que copiaste del Paso 2
3. Guarda el archivo

## Paso 7: Verificar

1. Abre tu aplicación en el navegador
2. Abre la consola del navegador (F12)
3. Deberías ver: `✅ Firebase initialized successfully (Firestore + Auth)`
4. Intenta crear una cuenta haciendo clic en "Login" → "Register"

## Paso 8: Crear Primer Admin

1. En la aplicación, haz clic en **Login**
2. Clic en **"Don't have an account? Register here"**
3. Completa el formulario:
   - Email: tu email de admin
   - Password: (mínimo 6 caracteres)
   - Account Type: **Admin**
4. Haz clic en **Create Account**

5. **IMPORTANTE**: Necesitas verificar el rol de admin en Firestore:
   - Ve a Firebase Console → Firestore Database → Data
   - Busca la colección `users`
   - Encuentra tu usuario (por el email)
   - Edita el documento y asegúrate de que tenga: `role: "admin"`
   - Si no existe el campo `role`, agrégalo manualmente

## ✅ Listo!

Ahora deberías poder:
- ✅ Login/Logout
- ✅ Crear nuevas cuentas
- ✅ Acceder al Admin Panel (si eres admin)
- ✅ Configurar credenciales del IRS
- ✅ Guardar clientes en la base de datos

## Solución de Problemas

### "Firebase Auth not initialized"
- Verifica que los scripts de Firebase estén cargando correctamente
- Revisa la consola del navegador para errores
- Asegúrate de que `firebase-config.js` tenga los valores correctos

### "Permission denied" al guardar
- Verifica las Security Rules en Firestore
- Asegúrate de estar autenticado
- Revisa que las reglas estén publicadas

### No puedo crear cuenta de admin
- Crea la cuenta como "Client" primero
- Luego ve a Firestore y cambia manualmente `role` a `"admin"`
- O usa el código en la consola del navegador:

```javascript
// Ejecutar en la consola del navegador (F12) DESPUÉS de hacer login
firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
  role: 'admin'
}).then(() => {
  console.log('✅ Rol de admin asignado');
  location.reload();
});
```
