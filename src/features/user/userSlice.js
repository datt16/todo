import { createSlice } from "@reduxjs/toolkit"

export const slice = createSlice({
  name: "user",
  initialState: {
    uid: null,
    signed: false,
  },
  reducers: {
    Login: (state, action) => {
      const UID = action.payload
      state.uid = UID
      state.signed = true
    },
    Logout: state => {
      state.uid = null
      state.signed = false
    },
  },
})

export const { Login, Logout } = slice.actions

export const selectUser = ({ user }) => user

export default slice.reducer
