import React from "react"
import { Box } from "@material-ui/core"
import styles from "./App.module.css"
import { Tasks } from "./features/task/Tasks"
import { Counter } from "./features/counter/Counter"
import { InputForm } from "./components/addTaskForm"

const App = () => {
  return (
    <div className="App">
      <header className={styles.appHeader}>
        <p>Todo</p>
      </header>
      <Box display="container" p={1}>
        <InputForm />
        <Tasks />
        <Counter />
      </Box>
    </div>
  )
}

export default App
