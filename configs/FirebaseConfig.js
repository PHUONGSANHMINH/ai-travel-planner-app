// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRySHh6WWNieKopRlmOo6jAZguval8Pa8",
  authDomain: "meobeo-b8cd9.firebaseapp.com",
  projectId: "meobeo-b8cd9",
  storageBucket: "meobeo-b8cd9.firebasestorage.app",
  messagingSenderId: "382176704209",
  appId: "1:382176704209:web:fdae6d210a1c8ae52ff7f0",
  measurementId: "G-89QTSFHQPE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
