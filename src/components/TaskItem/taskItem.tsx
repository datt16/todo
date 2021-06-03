import {
  Box,
  Card,
  CardContent,
  Checkbox,
  makeStyles,
  Typography,
  Divider,
  TextField,
} from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import CreateIcon from "@material-ui/icons/Create"
import PropTypes from "prop-types"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import styles from "../../App.module.css"
import {
  removeTaskItem,
  toggleTaskCompleted,
  updateTaskItem,
} from "../../features/task/taskSlice"
import { TaskItemBtn } from "./taskItemButton"
import { LocalTaskItemType } from "../../features/task/taskSlice"

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
})

type propType = {
  data: LocalTaskItemType
}

export const TaskItem: React.FC<propType> = (props: propType) => {
  const dispatch = useDispatch()
  const data = props.data
  const classes = useStyles()
  const [formOpen, setFormOpen] = useState(false)
  const [newTaskTitle, setTaskTitle] = useState("")

  const intoEditMode = () => {
    setFormOpen(true)
  }

  const submit = () => {
    const After: LocalTaskItemType = {
      title: newTaskTitle,
      completed: data.completed,
      id: data.id,
      created: data.created,
    }
    dispatch(updateTaskItem(After))
    setFormOpen(false)
    setTaskTitle("")
  }

  return (
    <Box mb={2}>
      <li>
        <Card className={classes.root} elevation={1}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={1}>
              <Box mr={2}>
                <Checkbox
                  onChange={() => dispatch(toggleTaskCompleted(data.id))}
                  checked={data.completed}
                />
              </Box>

              <Box flexGrow={1} onBlur={() => setFormOpen(false)}>
                {formOpen ? (
                  <TextField
                    placeholder="ここにタスク名を入力"
                    name="newTaskTitle"
                    value={newTaskTitle}
                    onChange={e => setTaskTitle(e.target.value)}
                    onBlur={() => submit()}
                    fullWidth
                  ></TextField>
                ) : data.completed ? (
                  <Typography variant="h6" className={styles.completed}>
                    {data.title}
                  </Typography>
                ) : (
                  <Typography variant="h6">{data.title}</Typography>
                )}

                <Typography color="textSecondary">
                  {"// ここに期限を表示"}
                </Typography>
              </Box>

              <Box>
                <div>
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      dispatch(removeTaskItem(data.id))
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </Box>
            </Box>

            <Divider />

            <Box display="flex" mt={1}>
              <Box ml={2}>
                <TaskItemBtn
                  label="Remove"
                  onClick={() => {
                    dispatch(removeTaskItem(data.id))
                  }}
                >
                  <DeleteIcon />
                </TaskItemBtn>
              </Box>
              <Box ml={3}>
                <TaskItemBtn
                  label="Rename"
                  onClick={() => {
                    intoEditMode()
                  }}
                >
                  <CreateIcon />
                </TaskItemBtn>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </li>
    </Box>
  )
}

TaskItem.propTypes = {
  data: PropTypes.any,
}
