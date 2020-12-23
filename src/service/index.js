import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCK01SJx8pksyIL9pWLX0E_gXHoD8FF-vA",
    authDomain: "webchat-93f76.firebaseapp.com",
    projectId: "webchat-93f76",
    storageBucket: "webchat-93f76.appspot.com",
    messagingSenderId: "71210794104",
    appId: "1:71210794104:web:74110237eead1da44cc18d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
export const db = firebase.firestore();