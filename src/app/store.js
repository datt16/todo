import { configureStore } from "@reduxjs/toolkit"
import taskerReducer from "../features/task/taskSlice"

export default configureStore({
  reducer: {
    tasker: taskerReducer,
  },
})
