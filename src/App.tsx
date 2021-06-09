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
  Paper,
} from "@material-ui/core"
import { Tasks } from "./features/task/Tasks"
import { InputForm } from "./components/AddTaskForm"
import Auth from "./components/Auth"

import { useSelector } from "react-redux"

import InboxIcon from "@material-ui/icons/Inbox"
import { AppState } from "./app/store"
import { UserAgentButton } from "./components/UserAgentButton"
import { CustomAppBar } from "./components/Appbar"

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
    header: {
      display: "block",
    },
    taskArea: {
      height: document.documentElement.clientHeight * 0.8,
      overflowY: "auto",
    },
    InputArea: {
      position: "absolute",
      bottom: 20,
      zIndex: 1000,
    },
  })
)

const App: React.FC = () => {
  const { uid } = useSelector((state: AppState) => state.user)
  const classes = useStyles()
  return (
    <div>
      <Hidden smUp>
        <CustomAppBar />
      </Hidden>
      <div className={classes.root}>
        <Hidden xsDown>
          <div className={classes.drawer}>
            <Drawer
              variant="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <Box
                py={6}
                display="flex"
                justifyContent="center"
                alignContent="center"
              >
                <UserAgentButton uid={uid} showType="board" />
              </Box>
              <List>
                <ListItem button key={"text"}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"text"} />
                </ListItem>
              </List>
            </Drawer>
          </div>
        </Hidden>
        <div className={classes.content}>
          <Auth>
            <Container maxWidth="lg" className={classes.taskArea}>
              <Tasks />
            </Container>
            <Box display="flex" justifyContent="center" flexGrow={1}>
              <Container maxWidth="sm" className={classes.InputArea}>
                <Paper elevation={0}>
                  <Box >
                    <InputForm />
                  </Box>
                </Paper>
              </Container>
            </Box>
          </Auth>
        </div>
      </div>
    </div>
  )
}

export default App
