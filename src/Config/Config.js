import { initializeApp } from "firebase/app";
import { getDatabase  } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAf___3vzI1qmgf2wmOxmKsgECV0i7j2Fs",
  authDomain: "growth-todo.firebaseapp.com",
  projectId: "growth-todo",
  storageBucket: "growth-todo.appspot.com",
  messagingSenderId: "269941203378",
  appId: "1:269941203378:web:fb0bddbd3872d0189344ab"
};
// initialise firebase app
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();