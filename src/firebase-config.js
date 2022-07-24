import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDhhjYKU24vaIx9kfr0AEhVoU7EEHZFsJI",
    authDomain: "to-do-list-47c98.firebaseapp.com",
    projectId: "to-do-list-47c98",
    storageBucket: "to-do-list-47c98.appspot.com",
    messagingSenderId: "148896606623",
    appId: "1:148896606623:web:3f377121fface37bc5b5aa",
    measurementId: "G-CK56TRRPY9"
  };
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);