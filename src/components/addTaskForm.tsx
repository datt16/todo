import { TextField, Button, Box } from "@material-ui/core"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { CreateNewTask } from "../features/task/taskSlice"

export const InputForm: React.FC = () => {
  const [newTaskTitle, setTaskTitle] = useState("")
  const dispatch = useDispatch()

  const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.currentTarget
    dispatch(CreateNewTask(newTaskTitle))
    setTaskTitle("")
    target.value = ""
  }

  return (
    <div>
      <h2>新規タスク</h2>
      <form onSubmit={e => e.preventDefault()}>
        <Box display="flex">
          <Box flexGrow={1}>
            <TextField
              placeholder="ここにタスク名を入力"
              name="newTaskTitle"
              value={newTaskTitle}
              onChange={e => setTaskTitle(e.target.value)}
              fullWidth
            ></TextField>
          </Box>
          <Box>
            <Button type="button" onClick={e => submit(e)}>
              追加
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  )
}
