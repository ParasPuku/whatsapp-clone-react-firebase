import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBFbpnWzDGBIhIP6Kdu1Hl_banmzyoo2X8",
  authDomain: "whatsapp-clone-42435.firebaseapp.com",
  projectId: "whatsapp-clone-42435",
  storageBucket: "whatsapp-clone-42435.appspot.com",
  messagingSenderId: "713474778025",
  appId: "1:713474778025:web:4f26e82f01f114e5b95ab8",
  measurementId: "G-QPVVYSD3ZW",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleProvider };

export default db;
