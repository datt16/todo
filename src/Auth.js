import React, { useState, useEffect } from "react"
import firebase from "./Firebase"

const Auth = () => {
  const [user, setUser] = useState(null)

  const logout = () => {
    firebase.auth().signOut()
    console.log("logout")
  }

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
    console.log(user)
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser( user )
    })
  })

  return (
    <div>
      <p className="App-intro">UID: {user && user.uid}</p>
      {user ? (
        <button onClick={() => logout()}>Google Logout</button>
      ) : (
        <button onClick={() => login()}>Google Login</button>
      )}
    </div>
  )
}

export default Auth
