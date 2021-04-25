import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { add, remove } from "./taskSlice"

export const Tasks = () => {
  const taskList = useSelector(state => state.tasker.tasks)
  const dispatch = useDispatch()

  return (
    <div>
      <button aria-label="AddTask" onClick={() => dispatch(add("a"))}>
        Add
      </button>
      <ul>
        {taskList.map(task => (
          <li key={task.id}>
            <button
              aria-label="Remove Task"
              onClick={() => dispatch(remove(task.id))}
            >
              remove
            </button>
            <span>{task.title}</span>
            <span>{task.id}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
