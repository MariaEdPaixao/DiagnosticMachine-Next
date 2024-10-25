import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDDDfX3cW2ubMWYA6qa2njSNZpeWi6rN4s",
  authDomain: "uploadsprofile.firebaseapp.com",
  projectId: "uploadsprofile",
  storageBucket: "uploadsprofile.appspot.com",
  messagingSenderId: "713837786647",
  appId: "1:713837786647:web:d6ef145e485c464f7a0e52",
  measurementId: "G-19D6KGWN2C"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
