// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDts6UvYzKuK_dAS5G12Tz8zAlRtF51i7M",
  authDomain: "scrape-254.firebaseapp.com",
  projectId: "scrape-254",
  storageBucket: "scrape-254.appspot.com",
  messagingSenderId: "1093210057950",
  appId: "1:1093210057950:web:e375c97232c02ec8e9664f"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export {
  app, db
}