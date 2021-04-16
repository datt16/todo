import React, { useState } from 'react'
import './App.css'

const Main = () => {
  const [newTaskTitle, setTaskTitle] = useState("")
  const [tasks, setTasks] = useState([])

  const AddTask = (title) => {
    setTasks([
      ...tasks, {
        "title": title,
        "id": parseInt(Date.now() * Math.random()).toString()
      }
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
              <input type="checkbox"></input>
              <span>{task.title}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="done-items">
        <h2>完了</h2>
        <ul>

        </ul>
      </div>
    </>
  )
}


function App() {
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
