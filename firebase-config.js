// Firebase Configuration
// IMPORTANT: Replace these values with your Firebase project credentials
// To get your credentials:
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project or select an existing one
// 3. Go to Project Settings > General > Your apps
// 4. Add a web app and copy the config values

const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
// Note: Firebase SDK must be loaded before this file
let db = null;
let firebaseApp = null;

if (typeof firebase !== 'undefined' && firebase.apps.length === 0) {
    firebaseApp = firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    console.log('✅ Firebase initialized successfully');
} else if (typeof firebase !== 'undefined') {
    firebaseApp = firebase.app();
    db = firebase.firestore();
    console.log('✅ Firebase already initialized');
} else {
    console.warn('⚠️ Firebase SDK not loaded. Using localStorage fallback.');
}
