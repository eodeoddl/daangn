import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // appId: process.env.FIREBASE_APP_ID,
};

// my App with firebase
const firebaseApp = initializeApp(firebaseConfig);

// for login appAuth & auth provider
export const firebaseAuth = getAuth(firebaseApp);

// for firebase storage
export const firebaseStorage = getStorage(firebaseApp);

// for firebase store
export const firebaseStore = getFirestore(firebaseApp);
