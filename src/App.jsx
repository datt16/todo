import React from "react"
import { Box } from "@material-ui/core"
import { Tasks } from "./features/task/Tasks"
import { InputForm } from "./components/addTaskForm"
import Auth from "./components/Auth"
import { CustomAppBar } from "./components/Appbar"

const App = () => {
  return (
    <div>
      <CustomAppBar />
      <Auth>
        <div className={"App"}>
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
