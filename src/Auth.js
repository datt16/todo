import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import firebase from "./Firebase"

import { Login, Logout } from "./features/user/userSlice"

const Auth = () => {
  const [user, setUser] = useState()
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(Logout())
    firebase.auth().signOut()
  }

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user)
      if (user) {
        dispatch(Login(user.uid))
      }
    })
  })

  return (
    <div>
      <p className="App-intro">UID: {user && user.displayName}</p>
      {user ? (
        <button onClick={() => logout()}>Google Logout</button>
      ) : (
        <button onClick={() => login()}>Google Login</button>
      )}
    </div>
  )
}

export default Auth
