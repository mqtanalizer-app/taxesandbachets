# Authentication & IRS Access Setup Guide

This system provides secure authentication with role-based access control (Admin/Client) and secure management of IRS credentials for official site access.

## Features

### 1. User Authentication
- **Login/Register**: Users can create accounts and login
- **Role-Based Access**: Two roles available:
  - **Admin**: Full access including IRS credentials management
  - **Client**: Standard user access to quote and forms

### 2. IRS Credentials Management
- Secure storage of company credentials (PTIN, EIN, etc.)
- Admin-only access to credentials
- Test connection to official IRS sites
- Integration with IRS e-Services

### 3. Protected Features
- Admin Panel (Admin only)
- IRS Credentials Configuration (Admin only)
- Client Database (All authenticated users)
- Forms Library (All authenticated users)

## Setup Instructions

### Step 1: Enable Firebase Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Build** > **Authentication**
4. Click **Get Started**
5. Enable **Email/Password** provider:
   - Click on "Email/Password"
   - Enable "Email/Password" (first toggle)
   - Click **Save**

### Step 2: Configure Firestore Security Rules

Update your Firestore security rules to protect admin data:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can read their own data
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Admin collection - admin only
    match /admin/{document=**} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Clients collection - authenticated users
    match /clients/{clientId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Step 3: Create First Admin Account

1. Open the application
2. Click **Login** button
3. Click **"Don't have an account? Register here"**
4. Fill in:
   - Email: your admin email
   - Password: (min. 6 characters)
   - Account Type: **Admin**
5. Click **Create Account**

**Important**: The first admin account may need manual verification in Firestore:
1. Go to Firestore Console
2. Navigate to `users/{userId}`
3. Set `role: "admin"` manually if needed

### Step 4: Configure IRS Credentials (Admin Only)

1. Login as admin
2. Click **Admin Panel** button
3. Click **Configure Credentials**
4. Enter your company credentials:
   - **PTIN**: P03429037 (your PTIN)
   - **EIN**: Your company EIN
   - **IRS Username**: Your IRS e-Services username (if applicable)
   - **Company Name**: SECURE ASSETS HOLDING LLC
5. Click **Save Credentials**

### Step 5: Test IRS Access

1. In Admin Panel, click **Test Connection**
2. Verify that credentials are working
3. You should see a success message with your PTIN

## User Roles

### Admin Role
- ✅ Full access to all features
- ✅ Access to Admin Panel
- ✅ Configure IRS credentials
- ✅ Test IRS site access
- ✅ Manage all client data
- ✅ Access Forms Library
- ✅ Download forms from official IRS sites

### Client Role
- ✅ Create and manage quotes
- ✅ Access Forms Library
- ✅ View and download forms
- ✅ Use auto-fill features
- ❌ Cannot access Admin Panel
- ❌ Cannot configure IRS credentials

## Security Features

### 1. Authentication
- Firebase Authentication for secure login
- Password hashing (handled by Firebase)
- Session management
- Automatic logout on token expiration

### 2. Role-Based Access Control
- Roles stored in Firestore
- UI elements hidden/shown based on role
- Server-side validation (Firestore rules)
- Client-side validation for UX

### 3. Credential Storage
- Admin credentials stored in Firestore `admin` collection
- Only accessible by admin users
- Encrypted in transit (HTTPS)
- Access logged with timestamps

## Using IRS Official Sites

Once credentials are configured, admins can:

1. **Access IRS e-Services**:
   - Use credentials to authenticate with IRS
   - Download forms directly from official sources
   - Submit forms electronically (if integrated)

2. **Form Downloads**:
   - Forms are downloaded from: `https://www.irs.gov/pub/irs-pdf/`
   - Uses company PTIN for authentication
   - Automatic updates via GitHub Actions

3. **Test Access**:
   - Use "Test Connection" in Admin Panel
   - Verifies PTIN and credentials
   - Confirms access to IRS systems

## Troubleshooting

### "Firebase Auth not initialized"
- Check that Firebase Auth SDK is loaded
- Verify `firebase-config.js` has correct credentials
- Check browser console for errors

### "Admin access required" error
- Verify your account has `role: "admin"` in Firestore
- Check Firestore security rules allow admin access
- Try logging out and back in

### Credentials not saving
- Verify you're logged in as admin
- Check Firestore security rules for `admin` collection
- Check browser console for errors

### Cannot access IRS sites
- Verify credentials are configured in Admin Panel
- Check PTIN is correct (P03429037)
- Ensure company has active IRS registration
- Test connection using "Test Connection" button

## Best Practices

1. **Admin Accounts**:
   - Limit number of admin accounts
   - Use strong passwords
   - Regularly review admin access

2. **Credentials**:
   - Keep IRS credentials secure
   - Don't share admin passwords
   - Rotate credentials periodically

3. **Security**:
   - Always use HTTPS in production
   - Keep Firebase security rules updated
   - Monitor Firestore access logs

## API Reference

### AuthService Methods

```javascript
// Login
await authService.login(email, password);

// Register
await authService.register(email, password, role);

// Logout
await authService.logout();

// Check if admin
authService.isAdmin();

// Check if authenticated
authService.isAuthenticated();

// Require admin (shows error if not admin)
authService.requireAdmin();
```

### IRSCredentialsManager Methods

```javascript
// Load credentials (admin only)
await irsCredentialsManager.loadCredentials();

// Save credentials (admin only)
await irsCredentialsManager.initializeCredentials(credentials);

// Test IRS access (admin only)
await irsCredentialsManager.testIRSAccess();

// Access IRS e-Services
await irsCredentialsManager.accessIRSEservices('efile');
```

## Support

For authentication issues:
1. Check Firebase Console > Authentication
2. Review Firestore security rules
3. Check browser console for errors
4. Verify Firebase configuration

For IRS access issues:
1. Verify credentials in Admin Panel
2. Test connection using "Test Connection"
3. Check IRS website status
4. Verify PTIN is active
