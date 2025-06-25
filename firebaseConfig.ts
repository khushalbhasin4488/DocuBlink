// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { enableIndexedDbPersistence, getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./credentials";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


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
