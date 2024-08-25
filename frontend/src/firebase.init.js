// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCtXL4BHE_-MqUOuTYVvTbzCryIIZBERM",
  authDomain: "tabletalk-ac435.firebaseapp.com",
  projectId: "tabletalk-ac435",
  storageBucket: "tabletalk-ac435.appspot.com",
  messagingSenderId: "453439443763",
  appId: "1:453439443763:web:f7ad174dc20fa2405be446",
  measurementId: "G-VR3RGY3CH2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
export default auth;
