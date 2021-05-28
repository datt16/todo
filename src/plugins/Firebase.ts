import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAtTZqK4gYPJlPnYg7AYncYVzIYCM67qr0",
  authDomain: "datt-todo-0415.firebaseapp.com",
  projectId: "datt-todo-0415",
  storageBucket: "datt-todo-0415.appspot.com",
  messagingSenderId: "800816684159",
  appId: "1:800816684159:web:2b48a2209e969644c1734a",
  measurementId: "G-EW3D7B6WXN",
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
export default firebase
