import * as firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZAGB2EbRMynVz48XwG8l8ajoCP4pGQ14",
  authDomain: "gobook-2352.firebaseapp.com",
  projectId: "gobook-2352",
  storageBucket: "gobook-2352.appspot.com",
  messagingSenderId: "155539312675",
  appId: "1:155539312675:web:f226230801ef15201c6196",
  measurementId: "G-2S2FTY3DZJ",
};

// eslint-disable-next-line no-unused-vars
let app;

if (firebase.default.apps.length === 0) {
  app = firebase.default.initializeApp(firebaseConfig);
} else {
  // eslint-disable-next-line no-unused-vars
  app = firebase.default.app();
}

const db = firebase.default.firestore();
const storage = firebase.default.storage();

export { db, storage };
