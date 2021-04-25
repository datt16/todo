import { createSlice } from "@reduxjs/toolkit"

export const slice = createSlice({
  name: "counter",
  initialState: {
    tasks: [],
  },
  reducers: {
    add: (state, action) => {
      const title = action.payload
      state.tasks.push({
        title: title,
        completed: false,
        id: parseInt(Date.now() * Math.random()).toString(),
      })
    },
    remove: (state, action) => {
      const target = action.payload
      state.tasks = state.tasks.filter(item => item.id !== target)
    },
  },
})

export const { add, remove } = slice.actions

export default slice.reducer
