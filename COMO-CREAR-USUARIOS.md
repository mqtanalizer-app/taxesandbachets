# 👥 CÓMO CREAR USUARIOS (Administradores y Clientes)

## 🎯 PASOS SIMPLES:

### 1️⃣ **Abre el Admin Panel**
- Si eres **administrador**, busca el botón **"⚙️ Admin Panel"** en la parte superior de la página
- Si no ves el botón, presiona **F12** en tu navegador y escribe en la consola:
  ```javascript
  document.getElementById('adminPanelModal').style.display = 'block';
  ```

### 2️⃣ **Ve a "User Management"**
- En el Admin Panel, verás 3 botones:
  - 🔑 IRS Credentials
  - 🧪 Test IRS Access
  - **👥 User Management** ← **CLIC AQUÍ**

### 3️⃣ **Crea un Nuevo Usuario**
- Haz clic en el botón **"➕ Create New User"** o **"Create User"**
- Completa el formulario:
  - **Email**: El email del usuario (ej: `cliente@example.com`)
  - **Password**: Una contraseña (mínimo 6 caracteres)
  - **Role**: Selecciona:
    - **"admin"** → Para crear otro administrador
    - **"client"** → Para crear un cliente

### 4️⃣ **Guarda el Usuario**
- Haz clic en **"Create User"** o **"Save"**
- Verás un mensaje de confirmación: ✅ "User created successfully!"

### 5️⃣ **Listo!**
- El usuario ya puede iniciar sesión con su email y contraseña

---

## 📋 RESUMEN RÁPIDO:

```
1. Abre Admin Panel (botón ⚙️ en la parte superior)
2. Clic en "👥 User Management"
3. Clic en "➕ Create New User"
4. Completa: Email, Password, Role (admin/client)
5. Clic en "Create User"
6. ✅ Listo!
```

---

## 🔍 ¿DÓNDE ESTÁ EL BOTÓN DEL ADMIN PANEL?

El botón debería estar en la parte superior de la página, cerca de donde dice tu email y rol.

Si **NO lo ves**, puede ser porque:
- No estás logueado como administrador
- El botón está oculto

**Solución rápida:**
1. Presiona **F12** en tu navegador
2. Ve a la pestaña **"Console"**
3. Escribe esto y presiona Enter:
   ```javascript
   document.getElementById('adminPanelModal').style.display = 'block';
   ```
4. El Admin Panel se abrirá

---

## ⚠️ IMPORTANTE:

- Solo los **administradores** pueden crear usuarios
- Los **clientes** NO pueden crear otros usuarios
- Cada usuario necesita un **email único**
- La contraseña debe tener **mínimo 6 caracteres**

---

## 🆘 ¿PROBLEMAS?

Si no puedes crear usuarios:
1. Verifica que estés logueado como **administrador**
2. Verifica que Firebase esté funcionando (sin errores en la consola)
3. Recarga la página (F5)
4. Intenta de nuevo
