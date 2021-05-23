import { createSlice } from "@reduxjs/toolkit"
import firebase from "../../plugins/Firebase"

export type UIDtype = string

interface UserState {
  uid: UIDtype
  signed: boolean
  iconURL: string
  displayName: string
}

const initialState: UserState = {
  uid: "",
  signed: false,
  iconURL: "",
  displayName: "",
}

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Login: (state, action) => {
      const data = action.payload
      state.uid = data.uid
      state.signed = true
      state.iconURL = data.iconUrl
      state.displayName = data.displayName
    },
    Logout: state => {
      state.uid = ""
      state.signed = false
      state.iconURL = ""
      state.displayName = ""
      firebase.auth().signOut()
    },
  },
})

export const { Login, Logout } = slice.actions

export default slice.reducer
