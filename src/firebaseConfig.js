// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBo2QfT6QVkMK0H6ctt1AgSPQA20AKw84M",
  authDomain: "employee-dashboard-d8994.firebaseapp.com",
  projectId: "employee-dashboard-d8994",
  storageBucket: "employee-dashboard-d8994.firebasestorage.app",
  messagingSenderId: "569081479593",
  appId: "1:569081479593:web:a2b3fc071de290e9fd84b8",
  measurementId: "G-BTQWL2QTKG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);