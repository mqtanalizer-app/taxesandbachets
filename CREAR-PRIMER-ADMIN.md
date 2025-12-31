# 🚀 Cómo Crear el Primer Usuario Administrador

Tienes **3 opciones** para crear el primer usuario administrador:

---

## ✅ **OPCIÓN 1: Desde Firebase Console (RECOMENDADO - Más Fácil)**

### Paso 1: Ir a Firebase Console
1. Ve a: https://console.firebase.google.com/
2. Selecciona tu proyecto: **taxesapp-9f5c2**

### Paso 2: Ir a Authentication
1. En el menú lateral, haz clic en **"Authentication"**
2. Haz clic en la pestaña **"Users"**

### Paso 3: Crear Usuario
1. Haz clic en el botón **"Add user"** o **"Agregar usuario"**
2. Ingresa:
   - **Email**: tu email de administrador (ej: admin@tudominio.com)
   - **Password**: una contraseña segura (mínimo 6 caracteres)
3. Haz clic en **"Add user"**

### Paso 4: Asignar Rol de Admin en Firestore
1. En Firebase Console, ve a **"Firestore Database"**
2. Haz clic en **"Start collection"** o selecciona la colección **"users"** si ya existe
3. Crea un documento con:
   - **Document ID**: El UID del usuario que acabas de crear (lo puedes ver en Authentication > Users)
   - **Campos**:
     - `email`: (string) - el email del usuario
     - `role`: (string) - `admin`
     - `active`: (boolean) - `true`
     - `createdAt`: (timestamp) - fecha actual

**O más fácil**: Usa la consola del navegador en tu aplicación después de crear el usuario en Authentication.

---

## ✅ **OPCIÓN 2: Desde la Aplicación (Temporal)**

He modificado el código para que si no hay usuarios, puedas crear el primer admin directamente desde el login.

### Pasos:
1. Abre tu aplicación
2. En el modal de login, verás un botón especial **"Create First Admin"** (solo aparece si no hay usuarios)
3. Completa el formulario:
   - Email
   - Password
   - Confirma password
4. Haz clic en **"Create Admin"**
5. ¡Listo! Ya puedes hacer login

**Nota**: Este botón desaparece una vez que hay al menos un usuario en el sistema.

---

## ✅ **OPCIÓN 3: Usando Firebase CLI (Avanzado)**

Si tienes Firebase CLI instalado:

```bash
# Instalar Firebase CLI (si no lo tienes)
npm install -g firebase-tools

# Login
firebase login

# Crear usuario
firebase auth:import users.json
```

Necesitarías crear un archivo `users.json` con el formato:
```json
{
  "users": [
    {
      "localId": "uid-del-usuario",
      "email": "admin@tudominio.com",
      "passwordHash": "hash-de-la-contraseña",
      "emailVerified": true
    }
  ]
}
```

---

## 🎯 **Recomendación**

**Usa la OPCIÓN 1** (Firebase Console) porque es:
- ✅ Más fácil
- ✅ Más segura
- ✅ No requiere modificar código
- ✅ Puedes verificar que todo funciona correctamente

---

## 📝 **Después de Crear el Admin**

1. **Cierra sesión** si estás logueado
2. **Abre la aplicación** de nuevo
3. **Haz login** con las credenciales del admin
4. **Ve al Admin Panel** (botón en el header)
5. **Clic en "User Management"**
6. **Crea tus clientes** desde ahí

---

## ❓ **¿Problemas?**

Si tienes problemas:
1. Verifica que el email esté correcto
2. Verifica que la contraseña tenga al menos 6 caracteres
3. Verifica que el documento en Firestore tenga el campo `role: "admin"`
4. Recarga la página después de crear el usuario

---

## 🔐 **Seguridad**

- **Nunca compartas** las credenciales del admin
- Usa una **contraseña fuerte**
- Considera crear **múltiples admins** para respaldo
- Los clientes solo pueden ser creados por admins desde el panel
