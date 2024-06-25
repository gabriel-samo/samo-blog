// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "samo-blog.firebaseapp.com",
  projectId: "samo-blog",
  storageBucket: "samo-blog.appspot.com",
  messagingSenderId: "998380911245",
  appId: "1:998380911245:web:18bfa9d39229872ac600c4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
