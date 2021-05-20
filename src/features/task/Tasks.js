import React, { useEffect } from "react"
import { Checkbox, Box, Typography } from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import {
  toggleTaskCompleted,
  fetchItems,
  selectTask,
  RemoveTaskItem,
} from "./taskSlice"

import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"

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
                <Typography
                  variant="h6"
                  className={(styles.completed, styles.taskItem)}
                >
                  {task.title}
                </Typography>
              ) : (
                <span className={(styles.taskItem, styles.taskTitle)}>
                  {task.title}
                </span>
              )}
              <span className={styles.taskItem}>{task.created}</span>
              <div className={styles.taskItem}>
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    dispatch(RemoveTaskItem(task.id))
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </li>
          ))}
        </ul>
      </Box>
    </div>
  )
}
