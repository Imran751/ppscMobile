

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDbDcEc6stPu2jumcUi50LspIoNoJwOHG0",
    authDomain: "ppsc-pre.firebaseapp.com",
    projectId: "ppsc-pre",
    storageBucket: "ppsc-pre.firebasestorage.app",
    messagingSenderId: "1017974693436",
    appId: "1:1017974693436:web:a34ed30a0d09045f76ad39"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth, Firestore, and Storage
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
