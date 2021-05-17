import { combineReducers, configureStore } from "@reduxjs/toolkit"
import taskerReducer from "../features/task/taskSlice"
import UserReducer from "../features/user/userSlice"

const reducer = combineReducers({
  tasker: taskerReducer,
  user: UserReducer,
})

export default configureStore({
  reducer,
})
