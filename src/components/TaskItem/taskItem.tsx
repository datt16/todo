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
import DeleteIcon from "@material-ui/icons/Delete"
import CreateIcon from "@material-ui/icons/Create"
import LimitIcon from "@material-ui/icons/Schedule"
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
import { InlineDatePicker } from "./inlineDatePicker"
import { LocalTaskItemType } from "../../features/task/taskSlice"

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
})

type propType = {
  data: LocalTaskItemType
}

export const TaskItem: React.FC<propType> = props => {
  const dispatch = useDispatch()
  const data = props.data
  const classes = useStyles()
  const [titleFormOpen, setTitleFormOpen] = useState(false)
  const [dateFormOpen, setDateFormOpen] = useState(false)
  const [newTaskTitle, setTaskTitle] = useState("")
  // const [newTaskLimit, setTaskLimit] = useState<Date | null>(null)

  const intoTitleEditMode = () => {
    let title = ""
    if (data.title) {
      title = data.title
    }
    setTaskTitle(title)
    setTitleFormOpen(true)
  }

  const intoDateEditMode = () => {
    setDateFormOpen(true)
  }

  const submit = () => {
    const After: LocalTaskItemType = {
      title: newTaskTitle,
      completed: data.completed,
      id: data.id,
      created: data.created,
    }
    dispatch(updateTaskItem(After))
    setTitleFormOpen(false)
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

              <Box flexGrow={1} onBlur={() => setTitleFormOpen(false)}>
                {titleFormOpen ? (
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

                <Typography color="textSecondary">{data.created?.toString()}</Typography>
              </Box>
            </Box>

            <Divider />

            {dateFormOpen ? (
              <Box display="flex" mt={1}>
                <Box flexGrow={1}>
                  <InlineDatePicker
                    backCB={() => setDateFormOpen(false)}
                    forwardCB={() => {
                      setDateFormOpen(false)
                    }}
                  />
                </Box>
              </Box>
            ) : (
              <Box display="flex" mt={1}>
                <Box ml={1}>
                  <TaskItemBtn
                    label="削除"
                    onClick={() => {
                      dispatch(removeTaskItem(data.id))
                    }}
                  >
                    <DeleteIcon />
                  </TaskItemBtn>
                </Box>
                <Box ml={3}>
                  <TaskItemBtn
                    label="名前変更"
                    onClick={() => {
                      intoTitleEditMode()
                    }}
                  >
                    <CreateIcon />
                  </TaskItemBtn>
                </Box>
                <Box ml={3}>
                  <TaskItemBtn
                    label="期限"
                    onClick={() => {
                      intoDateEditMode()
                    }}
                  >
                    <LimitIcon />
                  </TaskItemBtn>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </li>
    </Box>
  )
}

TaskItem.propTypes = {
  data: PropTypes.any,
}
