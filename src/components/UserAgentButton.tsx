import React, { useState } from "react"
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { Logout } from "../features/user/userSlice"
import { login } from "./Auth"
import { AppState } from "../app/store"

type PropType = {
  uid: string
}

export const UserAgentButton: React.FC<PropType> = (props: PropType) => {
  const uid = props.uid
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)

  const { iconURL, displayName } = useSelector(
    (state: AppState) => state.user
  )

  return uid !== "" ? (
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
  )
}
