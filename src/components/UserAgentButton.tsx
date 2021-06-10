import React, { useState } from "react"
import {
  Avatar,
  Box,
  Button,
  createStyles,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Typography,
} from "@material-ui/core"
import MoreDetailIcon from "@material-ui/icons/ArrowDropDown"
import { useDispatch, useSelector } from "react-redux"
import { Logout } from "../features/user/userSlice"
import { login } from "./Auth"
import { AppState } from "../app/store"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avater: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  })
)

type PropType = {
  uid: string
  showType: "icon" | "board"
}

export const UserAgentButton: React.FC<PropType> = (props: PropType) => {
  const classes = useStyles()
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

  const { iconURL, displayName } = useSelector((state: AppState) => state.user)

  return uid !== "" ? (
    <div>
      {props.showType === "icon" ? (
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={e => handleMenu(e)}
            color="inherit"
            size="small"
          >
            <Avatar sizes="small" alt={displayName} src={iconURL}></Avatar>
          </IconButton>
        </div>
      ) : (
        <div>
          <Avatar
            sizes="small"
            alt={displayName}
            src={iconURL}
            className={classes.avater}
          ></Avatar>
          <Box display="flex" justifyContent="center" mt={1}>
            <Box display="flex" alignContent="center">
              <Typography variant="h6">{displayName}</Typography>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={e => handleMenu(e)}
                color="inherit"
                size="small"
              >
                <MoreDetailIcon fontSize="inherit" />
              </IconButton>
            </Box>
          </Box>
        </div>
      )}

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
