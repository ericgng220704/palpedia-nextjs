// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
     apiKey: "AIzaSyDaw6PSP9RtEatHpFbLtBUwzVHF-A6QlTY",
     authDomain: "palpedia-nextjs.firebaseapp.com",
     projectId: "palpedia-nextjs",
     storageBucket: "palpedia-nextjs.appspot.com",
     messagingSenderId: "862298768031",
     appId: "1:862298768031:web:0caf76333d0b2b4fce58aa",
     measurementId: "G-KNC00Z4KM4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
