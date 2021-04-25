import React from "react"
import { Checkbox, Box } from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import { toggleComplete } from "./taskSlice"

import styles from "../../index.css"

export const Tasks = () => {
  const taskList = useSelector(state => state.tasker.tasks)
  const dispatch = useDispatch()

  return (
    <div>
      <Box display="block" className="incomplete-items">
        <h2>未完了</h2>
        <ul className={styles.taskList}>
          {taskList.map(task => (
            <li key={task.id}>
              <Checkbox
                onChange={() => dispatch(toggleComplete(task.id))}
                checked={task.completed}
              ></Checkbox>
              <span>{task.title}</span>
            </li>
          ))}
        </ul>
      </Box>
    </div>
  )
}
