import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyARqwT72dRX5kFBjch4qHpNVbkuQyWp0ZI",
  authDomain: "students-271ed.firebaseapp.com",
  databaseURL: "https://students-271ed.firebaseio.com",
  projectId: "students-271ed",
  storageBucket: "students-271ed.appspot.com",
  messagingSenderId: "674205294508",
  appId: "1:674205294508:web:4c61bc9846838a3712a409",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
export { storage, firebase as default };
