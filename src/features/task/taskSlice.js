import { createSlice } from "@reduxjs/toolkit"

export const slice = createSlice({
  name: "tasker",
  initialState: {
    tasks: [],
  },
  reducers: {
    add: (state, action) => {
      const title = action.payload
      const task = {
        title: title,
        completed: false,
        id: parseInt(Date.now() * Math.random()).toString(),
        created: Date.now().toString(),
      }
      state.tasks.push(task)
    },
    remove: (state, action) => {
      const target = action.payload
      state.tasks = state.tasks.filter(item => item.id !== target)
    },
    toggleComplete: (state, action) => {
      const target = action.payload
      const item = state.tasks.find(item => item.id === target)
      if (item) {
        item.completed = !item.completed
      }
    },
  },
})

export const { add, remove, toggleComplete } = slice.actions

export default slice.reducer
