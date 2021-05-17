import React from "react"
import { Box } from "@material-ui/core"
import styles from "./App.module.css"
import { Tasks } from "./features/task/Tasks"
import { InputForm } from "./components/addTaskForm"
import Auth from "./Auth"

const App = () => {
  return (
    <div>
      <Auth>
        <div className="App">
          <header className={styles.appHeader}>
            <p>Todo</p>
          </header>
          <Box display="container" p={1}>
            <InputForm />
            <Tasks />
          </Box>
        </div>
      </Auth>
    </div>
  )
}

export default App
