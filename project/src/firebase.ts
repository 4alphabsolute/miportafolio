import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5VqLtX7QWf4vx0mKqO972U5oej1qSKv4",
  authDomain: "andresalmeida-portafolio.firebaseapp.com",
  projectId: "andresalmeida-portafolio",
  storageBucket: "andresalmeida-portafolio.firebasestorage.app",
  messagingSenderId: "251958615847",
  appId: "1:251958615847:web:d852a74989715fb1a0d302"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();