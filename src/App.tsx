import React, { useState } from "react"
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
  Typography,
  Link,
  Divider,
} from "@material-ui/core"
import { Tasks } from "./features/task/Tasks"
import { InputForm } from "./components/AddTaskForm"
import Auth from "./components/Auth"

import { useSelector } from "react-redux"
import { AppState } from "./app/store"

import InfoIcon from "@material-ui/icons/Info"

import { UserAgentButton } from "./components/UserAgentButton"
import { CustomAppBar } from "./components/Appbar"
import { CustomDialog } from "./components/dialog"

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
      height: document.documentElement.clientHeight - 100,
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
  const [open, setOpen] = useState(false)
  const { uid } = useSelector((state: AppState) => state.user)
  const classes = useStyles()
  return (
    <div>
      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        title="このアプリについて"
        key="About-Dialog"
      >
        <Container>
          <Box display="flex" justifyContent="center" my={2}>
            <Typography variant="h5">todo(仮称)</Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Box pr={3}>
              <Typography variant="body2">作成者 : datt16</Typography>
            </Box>
            <Box>
              <Typography variant="body2">
                リポジトリ :
                <Link href="https://github.com/datt16/todo"> GitHub</Link>
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="start" my={2}>
            <Typography variant="body2">
              利用にはGoogleアカウントが必要になります
              <br />
              このアプリはまだ開発中のため、入力情報は開発者によって
              <b>読み取り・削除・変更</b>が行われる可能性があります。
              <br />
              アカウント情報は
              <u>名前・アイコン・識別 IDの取得以外の用途には使用しません</u>
            </Typography>
          </Box>
        </Container>
      </CustomDialog>

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
                <ListItem
                  button
                  key="infoThisApp"
                  onClick={() => setOpen(true)}
                >
                  <ListItemIcon>
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText primary="このアプリについて" />
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
                  <Box>
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
