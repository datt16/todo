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
    toggleComplete: (state, action) => {
      const targetID = action.payload
      const item = state.tasks.find(item => item.id === targetID)
      if (item) {
        item.completed = !item.completed
      }
    },
    fetchStart: state => {
      state.loading = true
      state.error = null
      state.tasks = []
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

const updateTask = async action => {
  const data = action
  const targetID = data.targetID
  const changedTask = data.task
  const ref = db.collection("tasks").doc(targetID)
  await ref.update(changedTask)
}

export const RemoveTask = async target => {
  const targetID = target
  const ref = db.collection("tasks").doc(targetID)
  await ref.delete()
}

const getTasks = async () => {
  const colRef = db
    .collection("users")
    .doc("mj6aaeHKFRQ80DYkdf9xoYq8X6t1")
    .collection("tasks")
    .orderBy("title")
  const snapshots = await colRef.get()
  const docs = snapshots.docs.map(doc => doc.data())
  return docs
}

export const fetchItems = () => async dispatch => {
  try {
    dispatch(fetchStart())
    dispatch(fetchSuccess(await getTasks()))
  } catch (error) {
    dispatch(fetchFailure(error.stack))
  }
}

export const toggleTaskCompleted = target => async (dispatch, getState) => {
  dispatch(toggleComplete(target))
  const state = getState().tasker
  const data = {
    targetID: target,
    task: state.tasks.find(item => item.id === target),
  }
  try {
    dispatch(fetchStart())
    await updateTask(data)
    dispatch(fetchSuccess(await getTasks()))
  } catch (error) {
    dispatch(fetchFailure(error.stack))
  }
}

export const RemoveTaskItem = target => async dispatch => {
  try {
    dispatch(fetchStart())
    await RemoveTask(target)
    dispatch(fetchSuccess(await getTasks()))
  } catch (error) {
    dispatch(fetchFailure(error.stack))
  }
}

export const {
  add,
  remove,
  toggleComplete,
  fetchStart,
  fetchSuccess,
  fetchFailure,
  updateTaskSuccess,
} = slice.actions

export const selectTask = ({ tasker }) => tasker

export default slice.reducer
