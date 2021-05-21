import React from "react"
import { useDispatch } from "react-redux"
import {
  toggleTaskCompleted,
  RemoveTaskItem,
} from "../../features/task/taskSlice"
import PropTypes from "prop-types"

import {
  Box,
  Checkbox,
  Typography,
  Card,
  makeStyles,
  CardContent,
} from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"

import styles from "../../App.module.css"

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
})

export const TaskItem = props => {
  const dispatch = useDispatch()
  const data = props.data
  const classes = useStyles()

  return (
    <Box mb={2}>
      <li>
        <Card className={classes.root} elevation={1}>
          <CardContent>
            <Box display="flex" alignItems="center">
              <Box mr={2}>
                <Checkbox
                  onChange={() => dispatch(toggleTaskCompleted(data.id))}
                  checked={data.completed}
                />
              </Box>

              <Box flexGrow={1}>
                {data.completed ? (
                  <Typography
                    variant="h6"
                    className={(styles.completed, classes.taskItem)}
                  >
                    {data.title}
                  </Typography>
                ) : (
                  <Typography variant="h6" className={classes.taskItem}>
                    {data.title}
                  </Typography>
                )}
                <Typography color="textSecondary">{data.created}</Typography>
              </Box>

              <Box>
                <div>
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      dispatch(RemoveTaskItem(data.id))
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
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
