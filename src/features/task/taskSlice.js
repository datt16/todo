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
    actionStart: state => {
      state.loading = true
      state.error = null
    },
    actionSuccess: state => {
      state.loading = false
      state.error = null
    },
  },
})

/* sub-actions */

const updateTask = async action => {
  const data = action
  const target = data.targetID
  const changedTask = data.task
  const uid = data.UID
  const ref = db.collection("users").doc(uid).collection("tasks").doc(target)
  await ref.update(changedTask)
}

export const RemoveTask = async (Target, UID) => {
  const target = Target,
    uid = UID
  const ref = db.collection("users").doc(uid).collection("tasks").doc(target)
  await ref.delete()
}

const getTasks = async uid => {
  const colRef = db
    .collection("users")
    .doc(uid)
    .collection("tasks")
    .orderBy("title")
  const snapshots = await colRef.get()
  var docs = []
  snapshots.docs.forEach(doc => {
    const data = doc.data()
    docs.push({
      title: data.title,
      completed: data.completed,
      created: data.created,
      id: doc.id,
    })
  })
  return docs
}


/* --- actions ---*/

export const fetchItems = () => async (dispatch, getState) => {
  const uid = getState().user.uid
  try {
    dispatch(fetchStart())
    if (uid) {
      dispatch(fetchSuccess(await getTasks(uid)))
    } else {
      dispatch(fetchFailure("ログインされていません"))
    }
  } catch (error) {
    dispatch(fetchFailure(error.stack))
  }
}

export const toggleTaskCompleted = target => async (dispatch, getState) => {
  dispatch(toggleComplete(target))
  const uid = getState().user.uid
  const state = getState().tasker
  const targetItem = state.tasks.find(item => item.id === target)
  const data = {
    UID: uid,
    targetID: target,
    task: {
      title: targetItem.title,
      completed: targetItem.completed,
      created: targetItem.created,
    },
  }
  try {
    await updateTask(data)
  } catch (error) {
    dispatch(fetchFailure(error.stack))
  }
}

export const RemoveTaskItem = target => async (dispatch, getState) => {
  const uid = getState().user.uid
  try {
    dispatch(actionStart())
    dispatch(actionSuccess(await RemoveTask(target, uid)))
    dispatch(fetchItems())
  } catch (error) {
    dispatch(fetchFailure(error.stack))
  }
}

export const CreateNewTask = title => async (dispatch, getState) => {
  const uid = getState().user.uid
  const createdDate = Date.now().toString()
  db.collection("users").doc(uid).collection("tasks").add({
    title: title,
    completed: false,
    created: createdDate,
  })
  dispatch(fetchItems())
}

export const {
  add,
  remove,
  toggleComplete,
  fetchStart,
  fetchSuccess,
  fetchFailure,
  updateTaskSuccess,
  actionSuccess,
  actionStart,
} = slice.actions

export const selectTask = ({ tasker }) => tasker

export default slice.reducer
