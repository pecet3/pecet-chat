// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsC0mV0AsdVkuebK4CPMmVtwkTSRQHPTU",
  authDomain: "pecetchat.firebaseapp.com",
  projectId: "pecetchat",
  storageBucket: "pecetchat.appspot.com",
  messagingSenderId: "570619898052",
  appId: "1:570619898052:web:618ebbaa4b9b3173c50191",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const storage = getStorage();

export const db = getFirestore(app);
