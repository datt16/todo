import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { add } from "../features/task/taskSlice"

export const InputForm = () => {
  const [newTaskTitle, setTaskTitle] = useState("")
  const dispatch = useDispatch()

  const submit = e => {
    const target = e.target
    dispatch(add(newTaskTitle))
    setTaskTitle("")
    target.value = ""
  }

  return (
    <div>
      <h2>新規タスク</h2>
      <form onSubmit={e => e.preventDefault()}>
        <input
          placeholder="ここにタスク名を入力"
          name="newTaskTitle"
          value={newTaskTitle}
          onChange={event => setTaskTitle(event.target.value)}
        ></input>
        <button type="button" onClick={e => submit(e)}>
          追加
        </button>
      </form>
    </div>
  )
}
