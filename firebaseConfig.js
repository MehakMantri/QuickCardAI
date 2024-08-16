// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfY4MDvlDOurFPztadPUSI5C87dtSF2Fw",
  authDomain: "flashcard-saas-11011.firebaseapp.com",
  projectId: "flashcard-saas-11011",
  storageBucket: "flashcard-saas-11011.appspot.com",
  messagingSenderId: "526231242447",
  appId: "1:526231242447:web:b7672ebebd427c50c799ba",
  measurementId: "G-G8TY29ZYM3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);