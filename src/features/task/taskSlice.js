import { createSlice } from "@reduxjs/toolkit"

export const slice = createSlice({
  name: "counter",
  initialState: {
    tasks: [],
  },
  reducers: {
    add: (state, title) => {
      state.tasks.push({
        title: title.payload,
        done: false,
        id: parseInt(Date.now() * Math.random()).toString(),
      })
    },
    remove: (state, target) => {
      state.tasks = state.tasks.filter(item => item.id !== target.payload)
      console.log(state.tasks.value)
    },
  },
})

export const { add, remove } = slice.actions

export default slice.reducer
