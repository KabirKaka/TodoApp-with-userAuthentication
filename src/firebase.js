import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKQYo9DuyJH1Nubck7pvvUmGY0fycOCNg",
  authDomain: "todoapp-userauthentication.firebaseapp.com",
  projectId: "todoapp-userauthentication",
  storageBucket: "todoapp-userauthentication.appspot.com",
  messagingSenderId: "726872132863",
  appId: "1:726872132863:web:a8f972914f2759058c90ca"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth();

export {auth, db};