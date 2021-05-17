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
    // firestoreにデータを追加するだけ
    add: action => {
      const prop = action.payload
      const title = prop.Title
      const uid = prop.UID
      const createdDate = Date.now().toString()

      db.collection("users").doc(uid).collection("tasks").add({
        title: title,
        completed: false,
        created: createdDate,
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

// uid対応済み
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
      created: data.createdDate,
      id: doc.id,
    })
  })
  return docs
}

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

// uid対応
export const CreateNewTask = title => (dispatch, getState) => {
  const uid = getState().user.uid
  const prop = {
    Title: title,
    UID: uid,
  }
  dispatch(add(prop))
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
