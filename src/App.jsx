import React from "react"
import { Container } from "@material-ui/core"
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
          <Container maxWidth="sm">
            <InputForm />
            <Tasks />
          </Container>
        </div>
      </Auth>
    </div>
  )
}

export default App
