import { createSlice } from "@reduxjs/toolkit"

export const slice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    test: [],
  },
  reducers: {
    add: (state, title) => {
      state.test.push({
        title: title.payload,
        done: false,
        id: parseInt(Date.now() * Math.random()).toString(),
      })
      console.log(state.test.value)
    },
    // target: 削除する対象のid
    remove: (state, target) => {
      state.test = state.test.filter(item => item.id !== target.payload)
      console.log(state.test.value)
    },
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

export const {
  increment,
  decrement,
  incrementByAmount,
  remove,
  add,
} = slice.actions

export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1000)
}

export const selectCount = state => state.counter.value
export const selectTask = state => state.test.value

export default slice.reducer
