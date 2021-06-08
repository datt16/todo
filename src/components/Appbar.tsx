import React from "react"
import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core"
import { useSelector } from "react-redux"
import { AppState } from "../app/store"

import { UserAgentButton } from "./UserAgentButton"

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}))

export const CustomAppBar: React.FC = () => {
  const { uid } = useSelector((state: AppState) => state.user)

  const classes = useStyles()
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          タスク管理アプリ
        </Typography>

        <UserAgentButton uid={uid} showType="icon" />
      </Toolbar>
    </AppBar>
  )
}
