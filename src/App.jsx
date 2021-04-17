import React, { useState } from 'react'
import './App.css'

const Main = () => {
  const [newTaskTitle, setTaskTitle] = useState("")
  const [tasks, setTasks] = useState([])
  const [doneTasks, setDoneTasks] = useState([])

  const AddTask = (title) => {
    setTasks(previousTasks => [
      ...previousTasks, {
        "title": title,
        "id": parseInt(Date.now() * Math.random()).toString()
      }
    ])
  }

  const FinishTask = (task) => {
    setDoneTasks(ts => [
      ...ts, task
    ])
    const target = task.id
    setTasks(ts => ts.filter(item => item.id !== target))
  }

  const RevertTask = (task) => {
    const target = task.id
    setDoneTasks(ts => ts.filter(item => item.id !== target))
    setTasks(ts => [
      ...ts, task
    ])
  }

  return (
    <>
      <h2>新規タスク</h2>
      <form onSubmit={e => e.preventDefault()}>
        <input placeholder="ここにタスク名を入力" name="newTaskTitle" value={newTaskTitle} onChange={(event) => setTaskTitle(event.target.value)}></input>
        <button type="button" onClick={() => AddTask(newTaskTitle)}>追加</button>
      </form>
      <div className="incomplete-items">
        <h2>未完了</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <input type="checkbox" onClick={() => FinishTask(task)}></input>
              <span>{task.title}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="done-items">
        <h2>完了</h2>
        <ul>
          {doneTasks.map((task) => (
            <li key={task.id}>
              <input type="checkbox" defaultChecked onClick={() => RevertTask(task)}></input>
              <span>{task.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>Todo</p>
      </header>
      <Main />
    </div>
  )
}

export default App
