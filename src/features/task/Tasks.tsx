import React, { useEffect } from "react"
import { Box } from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import { fetchItems } from "./taskSlice"

import styles from "../../App.module.css"
import { TaskItem } from "../../components/TaskItem/taskItem"

import { AppState } from "../../app/store"

export const Tasks: React.FC = () => {
  const dispatch = useDispatch()
  const { tasks, loading, error } = useSelector(
    (state: AppState) => state.tasker
  )

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
            <TaskItem data={task} key={task.id} />
          ))}
        </ul>
      </Box>
    </div>
  )
}
