import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import firebase from "../Firebase"
import PropTypes from "prop-types"

import { Login } from "../features/user/userSlice"

const login = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithRedirect(provider)
}

const Auth = props => {
  const dispatch = useDispatch()
  const signed = useSelector(state => state.user.signed)
  const [, setUser] = useState()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user)
      if (user) {
        dispatch(
          Login({
            uid: user.uid,
            iconUrl: user.photoURL,
            displayName: user.displayName,
          })
        )
      }
    })
  }, [])

  return (
    <div>
      {signed ? <div>{props.children}</div> : <p>ログインしてください</p>}
    </div>
  )
}

Auth.propTypes = {
  children: PropTypes.any,
}

export { login }

export default Auth
