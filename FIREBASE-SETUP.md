# Firebase Firestore Setup Guide

This application uses Firebase Firestore to store client data and completed forms in a real database.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard:
   - Enter project name (e.g., "secure-assets-tax-quotes")
   - Enable Google Analytics (optional)
   - Click "Create project"

## Step 2: Enable Firestore Database

1. In your Firebase project, go to **Build** > **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (for development) or **Start in production mode** (for production)
4. Select a location for your database (choose closest to your users)
5. Click **Enable**

**Important for Production:** Update Firestore security rules after setup:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /clients/{document=**} {
      allow read, write: if true; // For testing only - UPDATE THIS FOR PRODUCTION
    }
  }
}
```

**Production Security Rules (Recommended):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /clients/{document=**} {
      // Only allow authenticated admin users
      allow read, write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

## Step 3: Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. Click **Web app** icon (`</>`) to add a web app
4. Register your app:
   - App nickname: "Secure Assets Tax Quotes"
   - (Optional) Check "Also set up Firebase Hosting"
   - Click **Register app**
5. Copy the `firebaseConfig` object values

## Step 4: Update Configuration File

1. Open `firebase-config.js` in your project
2. Replace the placeholder values with your Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",           // Replace with your apiKey
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",  // Replace with your authDomain
    projectId: "YOUR_PROJECT_ID",          // Replace with your projectId
    storageBucket: "YOUR_PROJECT_ID.appspot.com",   // Replace with your storageBucket
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",  // Replace with your messagingSenderId
    appId: "YOUR_APP_ID"                   // Replace with your appId
};
```

## Step 5: Deploy Files

1. Upload `firebase-config.js` and `database.js` to your server
2. Make sure they are in the same directory as `presupuestopagodeimpuestos.html`
3. The HTML file already includes references to these files

## Step 6: Test the Setup

1. Open your application in a browser
2. Fill out a form and click "Save Data"
3. Click "Client Database" button
4. You should see your saved client data in the list

If you see "Using localStorage (Firebase not configured)" in the database status, check:
- Firebase SDK is loading correctly
- `firebase-config.js` has correct configuration values
- Browser console for any errors

## Firestore Data Structure

The application stores data in the following structure:

**Collection: `clients`**
- **Document ID**: Quote ID (e.g., "et-2025-001")
- **Fields**:
  - All form fields (firstName1, lastName1, email, etc.)
  - `clientPassword`: Unique password for client access
  - `quoteNumber`: Quote number
  - `quoteId`: Document ID
  - `createdAt`: Timestamp (server timestamp)
  - `updatedAt`: Timestamp (server timestamp)
  - `deleted`: Boolean (soft delete flag)
  - `deletedAt`: Timestamp (if deleted)

## Firebase Free Tier Limits

Firebase Spark (Free) Plan includes:
- **50K reads/day**
- **20K writes/day**
- **20K deletes/day**
- **1 GB storage**
- **10 GB network egress**

For most small to medium tax preparation businesses, the free tier is sufficient.

## Troubleshooting

### "Firebase SDK not loaded" error
- Check that Firebase scripts are loaded before `firebase-config.js`
- Verify internet connection (Firebase SDK loads from CDN)
- Check browser console for loading errors

### "Firestore not available" error
- Verify `firebase-config.js` has correct configuration
- Check Firestore is enabled in Firebase Console
- Verify security rules allow read/write operations

### Data not saving to Firestore
- Check browser console for errors
- Verify Firestore security rules allow writes
- Check network tab for failed requests

## Security Best Practices

1. **Update Security Rules**: Never use test mode in production
2. **Enable Authentication**: Consider adding Firebase Authentication for admin access
3. **Use Environment Variables**: For production, consider using environment-specific configs
4. **Regular Backups**: Export Firestore data regularly
5. **Monitor Usage**: Set up alerts for quota limits

## Support

For Firebase-specific issues, refer to:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Support](https://firebase.google.com/support)
