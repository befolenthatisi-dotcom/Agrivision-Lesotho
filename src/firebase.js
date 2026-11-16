
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfBS95Pkz1HsYWph2JtRSXgDMJPrhQUl4",
  authDomain: "agrivision-8a2b4.firebaseapp.com",
  projectId: "agrivision-8a2b4",
  storageBucket: "agrivision-8a2b4.firebasestorage.app",
  messagingSenderId: "98708619265",
  appId: "1:98708619265:web:cdf1cdaf9e55081b4a0000"
};

const app = initializeApp(firebaseConfig);

// Firestore database
export const db = getFirestore(app);

// Firebase Authentication
export const auth = getAuth(app);
