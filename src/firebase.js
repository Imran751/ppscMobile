import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence, getAuth, initializeAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDbDcEc6stPu2jumcUi50LspIoNoJwOHG0",
  authDomain: "ppsc-pre.firebaseapp.com",
  projectId: "ppsc-pre",
  storageBucket: "ppsc-pre.appspot.com", // Corrected storageBucket URL
  messagingSenderId: "1017974693436",
  appId: "1:1017974693436:web:a34ed30a0d09045f76ad39",
};

// Initialize Firebase App
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // Use the already initialized app
}

// Initialize Auth with React Native persistence
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  // If already initialized, use the existing auth instance
  if (e.code === "auth/already-initialized") {
    auth = getAuth(app);
  } else {
    throw e; // Re-throw any other errors
  }
}

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
