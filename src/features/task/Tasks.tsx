import React, { useEffect } from "react"
import { Box, Typography } from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import { fetchItems } from "./taskSlice"

import styles from "../../App.module.css"
import { TaskItem } from "../../components/TaskItem/taskItem"

import { AppState } from "../../app/store"
import { Skeleton } from "@material-ui/lab"

export const Tasks: React.FC = () => {
  const dispatch = useDispatch()
  const { tasks, loading, error } = useSelector(
    (state: AppState) => state.tasker
  )

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])

  if (loading) {
    return (
      <div>
        <Skeleton height={80} variant="rect" animation="wave"></Skeleton>
        <Typography variant="body2">
          <Skeleton variant="text" animation="wave"></Skeleton>
          <Skeleton variant="text" animation="wave" width="60%"></Skeleton>
        </Typography>
      </div>
    )
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
            <TaskItem data={task} key={task.id} />
          ))}
        </ul>
      </Box>
    </div>
  )
}
