import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMZMQOhYDAwvlHmM2W7ObQgFSuBo_tnAQ",
  authDomain: "prime-pass-b11ec.firebaseapp.com",
  projectId: "prime-pass-b11ec",
  storageBucket: "prime-pass-b11ec.firebasestorage.app",
  messagingSenderId: "356078412302",
  appId: "1:356078412302:web:755e528aac7e99902bd25f",
  measurementId: "G-0DPYNLLTDZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);