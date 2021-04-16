import React from 'react'
import './App.css'

let tasks = [
  {
    "title": "新しいタスク",
  }
]

let doneTasks = [
  {
    "title": "終了したタスク",
  }
]

function App() {
  var incompleteItems = []
  for (var i in tasks) {
    incompleteItems.push(
      <div className="task-item">
        <input type="checkbox"></input>
        <span>{tasks[i].title}</span>
      </div>)
  }

  var completeItems = []
  for (var j in doneTasks) {
    completeItems.push(
      <div className="task-item">
        <input type="checkbox" checked></input>
        <span>{doneTasks[j].title}</span>
      </div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Todo</p>
      </header>
      <main>
        <form>
          <input placeholder="ここにタスク名を入力"></input>
          <button>追加</button>
        </form>
        <div className="incomplete-items">
          <h2>未完了</h2>
          <ul>
            {incompleteItems}
          </ul>
        </div>
        <div className="done-items">
          <h2>完了</h2>
          <ul>
            {completeItems}
          </ul>
        </div>
      </main>
    </div>
  )
}

export default App
