import { createSlice } from "@reduxjs/toolkit"
import moment from "moment"
import { AppDispatch, AppGetState } from "../../app/store"
import { UIDtype } from "../user/userSlice"
import { db } from "../../plugins/Firebase"

type TaskIDtype = string
type TaskTitleType = string | null

export type LocalTaskItemType = {
  title: TaskTitleType
  completed: boolean
  created?: Date
  limit: Date | null
  id: TaskIDtype
}

type RemoteTaskItemType = {
  title: TaskTitleType
  completed: boolean
  created?: Date
  limit: Date | null
}

interface TaskState {
  tasks: Array<LocalTaskItemType>
  loading: boolean
  error: string | null
  limit?: Date | null
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  limit: undefined,
}

export const slice = createSlice({
  name: "tasker",
  initialState,
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

/* sub-actions : action内で呼び出される関数(Ex: firebaseへのpush) */

interface updatePropsType {
  targetID: string
  task: RemoteTaskItemType
  UID: UIDtype
}

const updateTask = async (prop: updatePropsType) => {
  const data = prop

  Object.fromEntries(
    Object.entries(data.task).filter(([, v]) => v !== undefined)
  )
  const target = data.targetID
  const changedTask = data.task
  const uid = data.UID
  const ref = db.collection("users").doc(uid).collection("tasks").doc(target)
  await ref.update(changedTask)
}

type removeTask = (Target: TaskIDtype, UID: UIDtype) => void
export const RemoveTask: removeTask = async (
  Target: TaskIDtype,
  UID: UIDtype
) => {
  const target = Target,
    uid = UID
  const ref = db.collection("users").doc(uid).collection("tasks").doc(target)
  await ref.delete()
}

const getTasks = async (uid: UIDtype) => {
  const colRef = db
    .collection("users")
    .doc(uid)
    .collection("tasks")
    .orderBy("created")
  const snapshots = await colRef.get()

  const docs: Array<LocalTaskItemType> = []

  snapshots.docs.forEach(doc => {
    const data = doc.data()
    docs.push({
      title: data.title,
      completed: data.completed,
      created: data.created.toDate(),
      limit: data.limit ? data.limit.toDate() : null,
      id: doc.id,
    })
  })
  return docs
}

/* --- actions : 外部からstateに変更を加えるときに呼び出される ---*/

type FetchItems = () => (dispatch: AppDispatch, getState: AppGetState) => void

type ToggleTaskCompleted = (
  target: UIDtype
) => (dispatch: AppDispatch, getState: AppGetState) => void

type RemoveTaskItem = (
  target: TaskIDtype
) => (dispatch: AppDispatch, getState: AppGetState) => void

type UpdateTask = (
  updatedTaskItem: LocalTaskItemType
) => (dispatch: AppDispatch, getState: AppGetState) => void

type CreateNewTask = (
  title: TaskTitleType
) => (dispatch: AppDispatch, getState: AppGetState) => void

export const fetchItems: FetchItems = () => async (dispatch, getState) => {
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

export const updateTaskItem: UpdateTask =
  (After: LocalTaskItemType) => async (dispatch, getState) => {
    const uid: UIDtype = getState().user.uid
    const data: {
      UID: UIDtype
      targetID: TaskIDtype
      task: RemoteTaskItemType
    } = {
      UID: uid,
      targetID: After.id,
      task: {
        title: After.title,
        completed: After.completed,
        created: After.created,
        limit: After.limit,
      },
    }
    try {
      await updateTask(data)
      dispatch(fetchItems())
    } catch (error) {
      dispatch(fetchFailure(error.stack))
    }
  }

export const toggleTaskCompleted: ToggleTaskCompleted =
  target => async (dispatch, getState) => {
    dispatch(toggleComplete(target))
    const uid: UIDtype = getState().user.uid
    const state = getState().tasker

    const targetItem = state.tasks.find(item => item.id === target)

    const task =
      targetItem == undefined
        ? {
            title: "",
            completed: false,
            created: undefined,
            limit: null,
          }
        : {
            title: targetItem.title,
            completed: targetItem.completed,
            created: targetItem.created,
            limit: targetItem.limit,
          }

    const data: {
      UID: UIDtype
      targetID: TaskIDtype
      task: RemoteTaskItemType
    } = {
      UID: uid,
      targetID: target,
      task,
    }

    try {
      await updateTask(data)
    } catch (error) {
      dispatch(fetchFailure(error.stack))
    }
  }

export const removeTaskItem: RemoveTaskItem =
  target => async (dispatch, getState) => {
    const uid: UIDtype = getState().user.uid
    try {
      dispatch(actionStart())
      await RemoveTask(target, uid)
      dispatch(actionSuccess())
      dispatch(fetchItems())
    } catch (error) {
      dispatch(fetchFailure(error.stack))
    }
  }

export const createNewTask: CreateNewTask =
  title => async (dispatch, getState) => {
    const uid = getState().user.uid
    const createdDate = moment().toDate()
    db.collection("users").doc(uid).collection("tasks").add({
      title: title,
      completed: false,
      created: createdDate,
    })
    dispatch(fetchItems())
  }

export const {
  toggleComplete,
  fetchStart,
  fetchSuccess,
  fetchFailure,
  actionSuccess,
  actionStart,
} = slice.actions

export default slice.reducer
