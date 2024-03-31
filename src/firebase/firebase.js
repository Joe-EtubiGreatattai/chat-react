import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAfB_cFXD46uLNzU1mQgcJsjdEVjqwITp4",
  authDomain: "chat-1b105.firebaseapp.com",
  databaseURL: "https://chat-1b105-default-rtdb.firebaseio.com",
  projectId: "chat-1b105",
  storageBucket: "chat-1b105.appspot.com",
  messagingSenderId: "539587400113",
  appId: "1:539587400113:web:cd53adee65e18ee5c06d90",
  measurementId: "G-J00NJ415PG"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);


export { auth, firestore, analytics };