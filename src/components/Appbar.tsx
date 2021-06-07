import React, { useState } from "react"
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import { useSelector } from "react-redux"
import { AppState } from "../app/store"

import { UserAgentButton } from "./UserAgentButton"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" className={classes.title}>
          タスク管理アプリ
        </Typography>

        <UserAgentButton uid={uid} />
      </Toolbar>
    </AppBar>
  )
}
