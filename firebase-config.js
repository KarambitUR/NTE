// Firebase Configuration for Eibon Terminal
// ============================================
// ІНСТРУКЦІЯ:
// 1. Перейди на https://console.firebase.google.com/
// 2. Створи новий проект (або використай існуючий)
// 3. Додай веб-додаток (Web App) у Project Settings
// 4. Скопіюй firebaseConfig нижче
// 5. Увімкни Firestore Database у консолі Firebase (Cloud Firestore → Create Database → Start in test mode)
// 6. Увімкни Authentication → Sign-in method → Google (для адмін-панелі)

const firebaseConfig = {
    apiKey: "AIzaSyCS4oakB81BaFV1WfuNEHxI0TK2mrHHLf8",
    authDomain: "ntegames.firebaseapp.com",
    projectId: "ntegames",
    storageBucket: "ntegames.firebasestorage.app",
    messagingSenderId: "208628827847",
    appId: "1:208628827847:web:ce19738d081f97c4ffa0e2",
    measurementId: "G-BVFR9F9SRH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Enable offline persistence for better performance
db.enablePersistence({ synchronizeTabs: true }).catch((err) => {
    if (err.code === 'failed-precondition') {
        console.warn('Firestore persistence failed: Multiple tabs open');
    } else if (err.code === 'unimplemented') {
        console.warn('Firestore persistence not available in this browser');
    }
});

console.log('🔥 Firebase Firestore initialized');
