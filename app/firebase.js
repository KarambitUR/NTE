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

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider, signInWithPopup, signOut, onAuthStateChanged };
