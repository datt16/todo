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
import { selectUser } from "../features/user/userSlice"

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

export const CustomAppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)

  const { uid, iconURL, displayName } = useSelector(selectUser)
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
        {uid ? (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={e => handleMenu(e)}
              color="inherit"
            >
              <Avatar alt={displayName} src={iconURL}></Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={e => handleClose(e)}
            >
              <MenuItem onClick={e => handleClose(e)}>Profile</MenuItem>
              <MenuItem onClick={e => handleClose(e)}>My account</MenuItem>
            </Menu>
          </div>
        ) : (
          <Button color="inherit">ログイン</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
