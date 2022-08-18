// Import the functions you need from the SDKs you need

import {getFirestore} from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAR-qee74S_udgMExZCSwjtWIdmXVkusck",
  authDomain: "admindashboard-adfd3.firebaseapp.com",
  projectId: "admindashboard-adfd3",
  storageBucket: "admindashboard-adfd3.appspot.com",
  messagingSenderId: "108491565372",
  appId: "1:108491565372:web:50a2b7598f59d6be151639"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyDcXaIZfczE_iyoYlB_C_J8uA3FnIxFpI0",
//   authDomain: "first-project-iti.firebaseapp.com",
//   databaseURL: "https://first-project-iti-default-rtdb.firebaseio.com",
//   projectId: "first-project-iti",
//   storageBucket: "first-project-iti.appspot.com",
//   messagingSenderId: "725297701412",
//   appId: "1:725297701412:web:a73923bb4d9ccf285deeb1"
// };

// Initialize Firebase
let app;

app = initializeApp(firebaseConfig);

const auth = getAuth(app);

//initialize firestore

const db = getFirestore(app);

export { auth };
export { db };
