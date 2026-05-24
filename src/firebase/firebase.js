// Firebase compatibility handles referencing the globally initialized SDK
export const db = window.firebase ? window.firebase.firestore() : null;
export const auth = window.firebase ? window.firebase.auth() : null;
export const googleProvider = window.firebase ? new window.firebase.auth.GoogleAuthProvider() : null;
