
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// IMPORTANT: Replace this with the configuration from your new Firebase project.
// You can find this in your Firebase project settings under "General".
const firebaseConfig = {
  apiKey: "AIzaSyDKK6PfyXL3ybdk5maFovqpIuVa4G72F6M",
  authDomain: "maruti-service-estimator.firebaseapp.com",
  projectId: "maruti-service-estimator",
  storageBucket: "maruti-service-estimator.appspot.com",
  messagingSenderId: "672968598920",
  appId: "1:672968598920:web:436ff605b78db96db6463d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
