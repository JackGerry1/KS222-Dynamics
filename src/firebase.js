// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDos87yLmTDTqj3RBGXbIrwqzwNCBPcJiI",
  authDomain: "ks222-dynamics-chat-app.firebaseapp.com",
  databaseURL: "https://ks222-dynamics-chat-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ks222-dynamics-chat-app",
  storageBucket: "ks222-dynamics-chat-app.appspot.com",
  messagingSenderId: "391831164512",
  appId: "1:391831164512:web:76a5df80b1a87aaf155505"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };