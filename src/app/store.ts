import { combineReducers, configureStore } from "@reduxjs/toolkit"
import taskerReducer from "../features/task/taskSlice"
import UserReducer from "../features/user/userSlice"

export type AppState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch
export type AppGetState = typeof store.getState

const reducer = combineReducers({
  tasker: taskerReducer,
  user: UserReducer,
})

const store = configureStore({
  reducer,
})

export default store
