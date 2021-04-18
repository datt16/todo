import React, { useState } from "react"
import { Box, Checkbox } from "@material-ui/core"
import styles from "./App.module.css"

const Main = () => {
  const [newTaskTitle, setTaskTitle] = useState("")
  const [tasks, setTasks] = useState([])
  const [doneTasks, setDoneTasks] = useState([])

  const AddTask = title => {
    setTasks(previousTasks => [
      ...previousTasks,
      {
        title: title,
        id: parseInt(Date.now() * Math.random()).toString(),
  },
    ])
  }

  const FinishTask = task => {
    setDoneTasks(ts => [...ts, task])
    const target = task.id
    setTasks(ts => ts.filter(item => item.id !== target))
  }

  const RevertTask = task => {
    const target = task.id
    setDoneTasks(ts => ts.filter(item => item.id !== target))
    setTasks(ts => [...ts, task])
  }

  return (
    <>
      <h2>新規タスク</h2>
      <form onSubmit={e => e.preventDefault()}>
        <input
          placeholder="ここにタスク名を入力"
          name="newTaskTitle"
          value={newTaskTitle}
          onChange={event => setTaskTitle(event.target.value)}
        ></input>
        <button type="button" onClick={() => AddTask(newTaskTitle)}>
          追加
        </button>
      </form>
      <Box display="block" className="incomplete-items">
        <h2>未完了</h2>
        <ul className={styles.taskList}>
          {tasks.length ? (
            tasks.map(task => (
              <li key={task.id}>
                <Checkbox onChange={() => FinishTask(task)} />
                <span>{task.title}</span>
              </li>
            ))
          ) : (
            <p>未完了タスクはありません</p>
          )}
        </ul>
      </Box>
      {doneTasks.length ? (
        <Box display="block" className="complete-items">
          <h2>完了</h2>
          <ul className={styles.taskList}>
            {doneTasks.map(task => (
              <li key={task.id}>
                <Checkbox onChange={() => RevertTask(task)} checked />
                <span>{task.title}</span>
              </li>
            ))}
          </ul>
        </Box>
      ) : (
        <Box display="none"></Box>
      )}
    </>
  )
}

const App = () => {
  return (
    <div className="App">
      <header className={styles.appHeader}>
        <p>Todo</p>
      </header>
      <Box display="container" p={1}>
        <Main />
      </Box>
    </div>
  )
}

export default App
