import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDj9qIWVEfxU3vv9Zl4nAcFBCqcD_lt_Us",
    authDomain: "todo-list-7edf0.firebaseapp.com",
    projectId: "todo-list-7edf0",
    storageBucket: "todo-list-7edf0.appspot.com",
    messagingSenderId: "534469773572",
    appId: "1:534469773572:web:a4a9037a15b236afbe6851"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);