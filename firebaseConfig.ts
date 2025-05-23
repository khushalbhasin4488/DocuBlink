// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { enableIndexedDbPersistence, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "docublink-74af3.firebaseapp.com",
  projectId: "docublink-74af3",
  storageBucket: "docublink-74af3.firebasestorage.app",
  messagingSenderId: "398914352528",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-W78E24113W"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

// Enable offline persistence
enableIndexedDbPersistence(FIREBASE_DB)
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled in one tab at a time
      console.warn('Firestore persistence failed: Multiple tabs open');
    } else if (err.code === 'unimplemented') {
      // The current browser doesn't support persistence
      console.warn('Firestore persistence not supported by this browser');
    }
  });