import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { add, decrement, increment, remove } from "./counterSlice"

export const Counter = () => {
  const count = useSelector(state => state.counter.value)
  const taskList = useSelector(state => state.counter.test)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      <br></br>
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
    </div>
  )
}
