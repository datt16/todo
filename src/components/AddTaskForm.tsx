import { TextField, Button, Box } from "@material-ui/core"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createNewTask } from "../features/task/taskSlice"

export const InputForm: React.FC = () => {
  const [newTaskTitle, setTaskTitle] = useState("")
  const dispatch = useDispatch()

  const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.currentTarget
    dispatch(createNewTask(newTaskTitle))
    setTaskTitle("")
    target.value = ""
  }

  return (
    <div>
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
          <Box ml={1}>
            <Button type="button" onClick={e => submit(e)} variant="outlined">
              追加
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  )
}
