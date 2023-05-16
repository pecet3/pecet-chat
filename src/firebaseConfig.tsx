// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "pecetchat.firebaseapp.com",
  projectId: "pecetchat",
  storageBucket: "pecetchat.appspot.com",
  messagingSenderId: import.meta.env.SENDER_ID,
  appId: import.meta.env.APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const storage = getStorage();

export const db = getFirestore(app);
