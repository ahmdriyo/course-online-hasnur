import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; 
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyBSSAk9ANIS8KNPKivf-2naLQ1D0EATvLY",
  authDomain: "course-online-96b96.firebaseapp.com",
  projectId: "course-online-96b96",
  storageBucket: "course-online-96b96.appspot.com",
  messagingSenderId: "706838022220",
  appId: "1:706838022220:web:fd148473313712ea008ce9"
};
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export { app,auth, firestore, storage};