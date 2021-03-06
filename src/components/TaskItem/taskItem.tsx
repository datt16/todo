import {
  Box,
  Checkbox,
  makeStyles,
  Typography,
  Divider,
  TextField,
  Accordion,
  AccordionDetails,
  FormControlLabel,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import CreateIcon from "@material-ui/icons/Create"
import LimitIcon from "@material-ui/icons/Schedule"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
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
import { CustomSnackbar } from "../snackbar"
import "./taskItemStyle.css"
import useStateWithCallback from "use-state-with-callback"

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
})

import { withStyles } from "@material-ui/core/styles"
import MuiAccordionSummary from "@material-ui/core/AccordionSummary"
const AccordionSummary = withStyles({
  content: {
    paddingLeft: 6,
    flexGrow: 2,
  },
})(MuiAccordionSummary)

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
  const [newTaskLimit, setTaskLimit] = useStateWithCallback<Date | null>(
    null,
    () => {
      if (newTaskLimit != null) {
        submitDateForm()
      }
    }
  )
  const [openSnackbar, setOpenSnackbar] = useState(false)

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

  const submitDateForm = () => {
    const After: LocalTaskItemType = {
      title: data.title,
      completed: data.completed,
      id: data.id,
      created: data.created,
      limit: newTaskLimit,
    }
    dispatch(updateTaskItem(After))
    setTitleFormOpen(false)
    setTaskLimit(null)
  }

  const submit = () => {
    const After: LocalTaskItemType = {
      title: newTaskTitle,
      completed: data.completed,
      id: data.id,
      created: data.created,
      limit: newTaskLimit,
    }
    dispatch(updateTaskItem(After))
    setOpenSnackbar(true)
    setTitleFormOpen(false)
    setTaskTitle("")
    setTaskLimit(null)
  }

  return (
    <Box mb={2}>
      <CustomSnackbar text="_" open={openSnackbar} />
      <li>
        <Accordion
          className={classes.root}
          elevation={1}
          id={`additional-${data.id}-header`}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label={data.id}
            aria-controls={`additional-actions-content-${data.id}`}
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
            className="MuiAccordionSummary-content"
          >
            <FormControlLabel
              aria-label="Acknowledge"
              onClick={event => event.stopPropagation()}
              onFocus={event => event.stopPropagation()}
              control={<Checkbox />}
              onChange={() => dispatch(toggleTaskCompleted(data.id))}
              checked={data.completed}
              label=""
            />
            <Box display="flex" alignItems="center">
              <Box onBlur={() => setTitleFormOpen(false)}>
                {titleFormOpen ? (
                  <TextField
                    autoFocus
                    placeholder="??????????????????????????????"
                    name="newTaskTitle"
                    value={newTaskTitle}
                    onChange={e => setTaskTitle(e.target.value)}
                    onBlur={() => submit()}
                    onSubmit={() => submit()}
                    fullWidth
                    type="text"
                  ></TextField>
                ) : data.completed ? (
                  <Typography variant="h6" className={styles.completed}>
                    {data.title}
                  </Typography>
                ) : (
                  <Typography variant="h6">{data.title}</Typography>
                )}

                {data.limit ? (
                  <Box display="flex" alignItems="center">
                    <LimitIcon color="action" fontSize="small" />
                    <Box ml={1}>
                      <Typography color="textSecondary">
                        {data.limit?.toLocaleString("ja-JP")}
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <></>
                )}
              </Box>
              <Box></Box>
            </Box>
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            <Box display="flex" alignItems="center" flexGrow={1}>
              {dateFormOpen ? (
                <Box display="flex" mt={1}>
                  <Box flexGrow={1}>
                    <InlineDatePicker
                      backCB={() => setDateFormOpen(false)}
                      forwardCB={e => {
                        setTaskLimit(e)
                      }}
                      value={data.limit}
                    />
                  </Box>
                </Box>
              ) : (
                <Box display="flex" mt={1}>
                  <Box ml={1}>
                    <TaskItemBtn
                      label="??????"
                      onClick={() => {
                        dispatch(removeTaskItem(data.id))
                      }}
                    >
                      <DeleteIcon />
                    </TaskItemBtn>
                  </Box>
                  <Box ml={3}>
                    <TaskItemBtn
                      label="????????????"
                      onClick={() => {
                        intoTitleEditMode()
                      }}
                    >
                      <CreateIcon />
                    </TaskItemBtn>
                  </Box>
                  <Box ml={3}>
                    <TaskItemBtn
                      label="??????"
                      onClick={() => {
                        intoDateEditMode()
                      }}
                    >
                      <LimitIcon />
                    </TaskItemBtn>
                  </Box>
                </Box>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      </li>
    </Box>
  )
}

TaskItem.propTypes = {
  data: PropTypes.any,
}
