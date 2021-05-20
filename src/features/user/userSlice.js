import { createSlice } from "@reduxjs/toolkit"

export const slice = createSlice({
  name: "user",
  initialState: {
    uid: null,
    signed: false,
    iconURL: null,
  },
  reducers: {
    Login: (state, action) => {
      const data = action.payload
      state.uid = data.uid
      state.signed = true
      state.iconURL = data.iconUrl
    },
    Logout: state => {
      state.uid = null
      state.signed = false
      state.iconURL = null
    },
  },
})

export const { Login, Logout } = slice.actions

export const selectUser = ({ user }) => user

export default slice.reducer
