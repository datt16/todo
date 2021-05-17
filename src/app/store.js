import { configureStore } from "@reduxjs/toolkit"
import taskerReducer from "../features/task/taskSlice"
import UserReducer from "../features/user/userSlice"

export default configureStore({
  reducer: {
    tasker: taskerReducer,
    user: UserReducer,
  },
})
