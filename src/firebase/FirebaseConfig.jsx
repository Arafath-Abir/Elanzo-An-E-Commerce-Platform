// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCOvPQGeA1W1aZ9xEoUxK58KnKwremdOZw",
  authDomain: "organicahub.firebaseapp.com",
  projectId: "organicahub",
  storageBucket: "organicahub.appspot.com",
  messagingSenderId: "570447578793",
  appId: "1:570447578793:web:64043ff660d6a545400bb8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { fireDB, auth, storage }