// firebase.js

// Import necessary Firebase methods from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration obtained from environment variables for security
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase app with the provided configuration
const app = initializeApp(firebaseConfig);

// Get the authentication instance using the initialized app
const auth = getAuth(app);

// Get the Firestore database instance using the initialized app
const db = getFirestore(app);

// Export authentication and Firestore database instances for usage in other modules
export { auth, db };
