import React from "react"
import {
  Box,
  Container,
  createStyles,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core"
import { Tasks } from "./features/task/Tasks"
import { InputForm } from "./components/AddTaskForm"
import Auth from "./components/Auth"
import { CustomAppBar } from "./components/Appbar"

import { useSelector } from "react-redux"

import InboxIcon from "@material-ui/icons/Inbox"
import { AppState } from "./app/store"
import { UserAgentButton } from "./components/UserAgentButton"

const drawerWidth = 260

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
)

const App: React.FC = () => {
  const { uid } = useSelector((state: AppState) => state.user)
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {/* <CustomAppBar /> */}
      <div className={classes.drawer}>
        <Drawer
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <List>
            <Box py="3" display="flex" justifyContent="center" alignContent="center">
              <Typography variant="h5">タスク管理アプリ</Typography>
            </Box>
            <ListItem button key={"text"}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"text"} />
            </ListItem>
          </List>
          <UserAgentButton uid={uid} />
        </Drawer>
      </div>
      <div className={classes.content}>
        <Auth>
          <Container maxWidth="sm">
            <InputForm />
            <Tasks />
          </Container>
        </Auth>
      </div>
    </div>
  )
}

export default App
