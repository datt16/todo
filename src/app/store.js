import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import taskerReducer from "../features/task/taskSlice"

export default configureStore({
  reducer: {
    tasker: taskerReducer,
    counter: counterReducer,
  },
})
