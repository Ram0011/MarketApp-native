// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBWR4Z7OX6v4ePL3wZr5_6QjEGFa5H7T9Y",
    authDomain: "market-b3a06.firebaseapp.com",
    projectId: "market-b3a06",
    storageBucket: "market-b3a06.appspot.com",
    messagingSenderId: "601288853846",
    appId: "1:601288853846:web:ccbab5939f0fe21bd0aef7",
    measurementId: "G-JBZK2Y0GX3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
