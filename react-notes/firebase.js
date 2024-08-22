import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBFO7-1cZSGMAHsXxrfDj9EgWZLhHnLJuA",
  authDomain: "react-notes-ab8b1.firebaseapp.com",
  projectId: "react-notes-ab8b1",
  storageBucket: "react-notes-ab8b1.appspot.com",
  messagingSenderId: "458655906042",
  appId: "1:458655906042:web:3f0a7fe1a88d20a3c0f143"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const notesCollection = collection(db, "notes")