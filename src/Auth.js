import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import firebase from "./Firebase"
import PropTypes from "prop-types"

import { Login, Logout } from "./features/user/userSlice"

const Auth = props => {
  const [user, setUser] = useState()
  const dispatch = useDispatch()
  const signed = useSelector(state => state.user.signed)

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
  }, [])

  return (
    <div>
      <p className="App-intro">UID: {user && user.displayName}</p>
      {user ? (
        <button onClick={() => logout()}>Google Logout</button>
      ) : (
        <button onClick={() => login()}>Google Login</button>
      )}
      {signed ? <div>{props.children}</div> : <p>ログインしてください</p>}
    </div>
  )
}

Auth.propTypes = {
  children: PropTypes.any,
}

export default Auth
