import React, { useState, useEffect, ReactNode } from "react"
import { useDispatch, useSelector } from "react-redux"
import firebase from "../plugins/Firebase"

import { Login } from "../features/user/userSlice"
import { AppState } from "../app/store"

type AuthPropsType = {
  children: ReactNode
}

const login = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithRedirect(provider)
}

const Auth: React.FC<AuthPropsType> = (props: AuthPropsType) => {
  const dispatch = useDispatch()
  const signed = useSelector((state: AppState) => state.user.signed)
  const [, setUser]: [undefined, any] = useState()

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

export { login }

export default Auth
