// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "@firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKrWAHlmRnVil8p1H4efXpeDVZnaZu6zE",
  authDomain: "final-hackathon-ec891.firebaseapp.com",
  projectId: "final-hackathon-ec891",
  storageBucket: "final-hackathon-ec891.appspot.com",
  messagingSenderId: "615486148541",
  appId: "1:615486148541:web:34c49f11d0e3a28b930cd4",
  measurementId: "G-Z4BE5DCRHD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore()
export const auth = getAuth(app)