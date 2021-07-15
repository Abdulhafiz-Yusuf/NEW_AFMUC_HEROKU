import firebase from 'firebase';
import 'firebase/firestore'

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  apiKey: "AIzaSyByfc_A8BAy-PIQ3KKTo8yn2RyLE7Hxx-I",
  authDomain: "afmucresultmgtsystem.firebaseapp.com",
  projectId: "afmucresultmgtsystem",
  storageBucket: "afmucresultmgtsystem.appspot.com",
  messagingSenderId: "183884605093",
  appId: "1:183884605093:web:824e3f31a4ad802e0fcf4c",
  measurementId: "G-3T80NR9BP1"


};
// Initialize Firebase
let Firebase = firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()

// avoid deprecated warnings
db.settings({
  timestampsInSnapshots: true
})

export default Firebase