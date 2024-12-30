// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDyUtCWziYa1OdDEZi2rW9vscWlV0tlDG4',
  authDomain: 'user-pass-input.firebaseapp.com',
  projectId: 'user-pass-input',
  storageBucket: 'user-pass-input.firebasestorage.app',
  messagingSenderId: '710877708639',
  appId: '1:710877708639:web:e4e01b515f6fb7debb76ea',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
