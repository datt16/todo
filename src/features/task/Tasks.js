import React, { useEffect } from "react"
import { Checkbox, Box } from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import {
  toggleTaskCompleted,
  fetchItems,
  selectTask,
  RemoveTaskItem,
} from "./taskSlice"

import styles from "../../App.module.css"

export const Tasks = () => {
  const dispatch = useDispatch()
  const { tasks, loading, error } = useSelector(selectTask)

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])

  if (loading) {
    return <p>Now loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <Box display="block" className="incomplete-items">
        <h2>タスクリスト</h2>
        <ul className={styles.taskList}>
          {tasks.map(task => (
            <li key={task.id}>
              <Checkbox
                onChange={() => dispatch(toggleTaskCompleted(task.id))}
                checked={task.completed}
              ></Checkbox>
              {task.completed ? (
                <span className={styles.completed}>{task.title}</span>
              ) : (
                <span>{task.title}</span>
              )}
              <button
                onClick={() => {
                  dispatch(RemoveTaskItem(task.id))
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </Box>
    </div>
  )
}
