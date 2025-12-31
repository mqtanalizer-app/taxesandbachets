// Firebase Configuration
// Using Firebase JS SDK v9+ (Modular SDK)

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqjdInEpXf1NRf1o7dl1QHYNf4GGZHXG8",
    authDomain: "taxesapp-9f5c2.firebaseapp.com",
    projectId: "taxesapp-9f5c2",
    storageBucket: "taxesapp-9f5c2.firebasestorage.app",
    messagingSenderId: "173841214106",
    appId: "1:173841214106:web:ef3113402006ba3e1b0d23",
    measurementId: "G-JGV2GWV20V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);
const auth = getAuth(app);

// Export for use in other modules
export { app, db, auth };
