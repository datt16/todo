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
  CardContent,
  makeStyles,
} from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"

import styles from "../../App.module.css"

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  taskItem: {
    marginRight: 10,
    display: "inline",
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
            <Checkbox
              onChange={() => dispatch(toggleTaskCompleted(data.id))}
              checked={data.completed}
            ></Checkbox>
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
            <Typography
              className={styles.taskItem}
              color="textSecondary"
              gutterBottom
            >
              {data.created}
            </Typography>
            <div className={styles.taskItem}>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  dispatch(RemoveTaskItem(data.id))
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </CardContent>
        </Card>
      </li>
    </Box>
  )
}

TaskItem.propTypes = {
  data: PropTypes.any,
}
