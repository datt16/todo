import { createSlice } from "@reduxjs/toolkit"
import { db } from "../../Firebase"

export const slice = createSlice({
  name: "tasker",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    add: (state, action) => {
      const title = action.payload
      const docId = db.collection("tasks").doc().id
      const createdDate = Date.now().toString()
      const task = {
        title: title,
        completed: false,
        id: docId,
        created: createdDate,
      }
      state.tasks.push(task)

      db.collection("tasks").doc(docId).set({
        title: title,
        completed: false,
        created: createdDate,
        id: docId,
      })
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
    fetchStart: state => {
      state.loading = true
      state.error = null
    },
    fetchFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    fetchSuccess: (state, action) => {
      state.loading = false
      state.error = null
      state.tasks = action.payload
    },
  },
})

const getTasks = async () => {
  const colRef = db.collection("tasks").orderBy("title")
  const snapshots = await colRef.get()
  const docs = snapshots.docs.map(doc => doc.data())
  return docs
}

export const {
  add,
  remove,
  toggleComplete,
  fetchStart,
  fetchSuccess,
  fetchFailure,
} = slice.actions

export const selectTask = ({ tasker }) => tasker

export const fetchItems = () => async dispatch => {
  try {
    dispatch(fetchStart())
    dispatch(fetchSuccess(await getTasks()))
  } catch (error) {
    dispatch(fetchFailure(error.stack))
  }
}

export default slice.reducer
