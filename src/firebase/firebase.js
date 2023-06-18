// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAL0UMj7dOU3rXFcGREbq2KuHMl2j3LyRY",
  authDomain: "react-ig-clone-91d4a.firebaseapp.com",
  projectId: "react-ig-clone-91d4a",
  storageBucket: "react-ig-clone-91d4a.appspot.com",
  messagingSenderId: "832341734959",
  appId: "1:832341734959:web:1da7bb4619f68922d3f8da",
  measurementId: "G-RYSSKMMXZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;