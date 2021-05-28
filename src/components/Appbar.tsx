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
import { useDispatch, useSelector } from "react-redux"
import { Logout } from "../features/user/userSlice"
import { login } from "./Auth"
import { AppState } from "../app/store"

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

export const CustomAppBar:React.FC = () => {
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)

  const { uid, iconURL, displayName } = useSelector(
    (state: AppState) => state.user
  )

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
        {uid !== "" ? (
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
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleClose
                  dispatch(Logout())
                }}
              >
                ログアウト
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Button
            color="inherit"
            onClick={() => {
              login()
            }}
          >
            ログイン
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
