// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD09wxMJJ6HMQI5_9ZBe4a7SLOL_39b92c",
  authDomain: "greencommerce-95948.firebaseapp.com",
  projectId: "greencommerce-95948",
  storageBucket: "greencommerce-95948.appspot.com",
  messagingSenderId: "585380526147",
  appId: "1:585380526147:web:eddbd5786ccbd5256c3cf6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
