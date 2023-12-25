// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfvLTUwnQUWtN-yttvsJUJTpW-jmle2C8",
  authDomain: "task-management-client-dad2d.firebaseapp.com",
  projectId: "task-management-client-dad2d",
  storageBucket: "task-management-client-dad2d.appspot.com",
  messagingSenderId: "461949712761",
  appId: "1:461949712761:web:2c037621d2c5f8510657a8",
  measurementId: "G-RFBQCCLSM7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;