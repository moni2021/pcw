'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: 'maruti-service-estimator',
  appId: '1:672968598920:web:436ff605b78db96db6463d',
  storageBucket: 'maruti-service-estimator.firebasestorage.app',
  apiKey: 'AIzaSyDKK6PfyXL3ybdk5maFovqpIuVa4G72F6M',
  authDomain: 'maruti-service-estimator.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '672968598920',
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);

export { app, auth };
