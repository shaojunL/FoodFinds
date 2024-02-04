// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDRDqUSpHuN9glqowoMkdrdI0WKc-MwGKs",
    authDomain: "techfest-hackathon-2024.firebaseapp.com",
    databaseURL: "https://techfest-hackathon-2024-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "techfest-hackathon-2024",
    storageBucket: "techfest-hackathon-2024.appspot.com",
    messagingSenderId: "152257098874",
    appId: "1:152257098874:web:747d3a6a0caf5e672eb7c3"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);