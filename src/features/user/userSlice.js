import { createSlice } from "@reduxjs/toolkit"
import firebase from "../../Firebase"

export const slice = createSlice({
  name: "user",
  initialState: {
    uid: null,
    signed: false,
    iconURL: null,
    displayName: null,
  },
  reducers: {
    Login: (state, action) => {
      const data = action.payload
      state.uid = data.uid
      state.signed = true
      state.iconURL = data.iconUrl
      state.displayName = data.displayName
    },
    Logout: state => {
      state.uid = null
      state.signed = false
      state.iconURL = null
      state.displayName = null
      firebase.auth().signOut()
    },
  },
})

export const { Login, Logout } = slice.actions

export const selectUser = ({ user }) => user

export default slice.reducer
