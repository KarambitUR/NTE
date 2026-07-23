import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCS4oakB81BaFV1WfuNEHxI0TK2mrHHlf8",
  authDomain: "ntegames.firebaseapp.com",
  projectId: "ntegames",
  storageBucket: "ntegames.firebasestorage.app",
  messagingSenderId: "208628827847",
  appId: "1:208628827847:web:ce19738d081f97c4ffa0e2",
  measurementId: "G-BVFR9F9SRH"
};

let app = null;
let auth = null;
let db = null;
let googleProvider = null;

if (typeof window !== 'undefined') {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
  } catch (e) {
    console.error('Firebase init error:', e);
  }
}

export { app, auth, db, googleProvider, signInWithPopup, signOut, onAuthStateChanged };
