import React, { useState, useEffect, ReactNode } from "react"
import { useDispatch, useSelector } from "react-redux"
import firebase from "../plugins/Firebase"

import { Login } from "../features/user/userSlice"
import { AppState } from "../app/store"

import { Box, Container, Link, Typography } from "@material-ui/core"

type AuthPropsType = {
  children: ReactNode
}

type Login = () => void
export const login: Login = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithRedirect(provider)
}

const Auth: React.FC<AuthPropsType> = (props: AuthPropsType) => {
  const dispatch = useDispatch()
  const signed = useSelector((state: AppState) => state.user.signed)
  const [, setUser] = useState<firebase.User | null>()

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
      {signed ? (
        <div>{props.children}</div>
      ) : (
        <div>
          <Container>
            <Box alignContent="center">
              <Box display="flex" justifyContent="center" my={2}>
                <Typography variant="h1">Todo</Typography>
              </Box>
              <Box display="flex" justifyContent="center">
                <Box pr={3}>
                  <Typography variant="body1">作成者 : datt16</Typography>
                </Box>
                <Box>
                  <Typography variant="body1">
                    リポジトリ :
                    <Link href="https://github.com/datt16/todo"> GitHub</Link>
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" justifyContent="center" my={2}>
                <Typography variant="body1">
                  利用にはGoogleアカウントが必要になります
                  <br />
                  このアプリはまだ開発中のため、開発者によって入力情報の
                  <b>読み取り・削除・変更</b>が行われる可能性があります
                  <br />
                  アカウント情報は、
                  <u>名前・アイコン・識別 IDの取得以外の用途には使用しません</u>
                </Typography>
              </Box>
            </Box>
          </Container>
        </div>
      )}
    </div>
  )
}

export default Auth
