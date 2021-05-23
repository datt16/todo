import {
  Box,
  Card,
  CardContent,
  Checkbox,
  makeStyles,
  Typography,
} from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import PropTypes from "prop-types"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import styles from "../../App.module.css"
import {
  RemoveTaskItem,
  toggleTaskCompleted,
} from "../../features/task/taskSlice"

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
  const [, setEM] = useState(false)

  const intoEditMode = () => {
    setEM(true)
  }

  return (
    <Box mb={2}>
      <li>
        <Card className={classes.root} elevation={1}>
          <CardContent onBlur={() => setEM(false)}>
            <Box display="flex" alignItems="center">
              <Box mr={2}>
                <Checkbox
                  onChange={() => dispatch(toggleTaskCompleted(data.id))}
                  checked={data.completed}
                />
              </Box>

              <Box flexGrow={1} onClick={() => intoEditMode()}>
                {data.completed ? (
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
