import { useEffect, useState } from 'react'
import Task from './Task'
import './App.css';

function App() {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState("")

  useEffect(() => {
    async function load() {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos")
      const data = await response.json()
      setTasks(data)
    }

    load()
  }, [])

  const updateTask = e => {
    setTask(e.target.value)
  }

  const createTask = async (e) => {
    if (e.key === 'Enter') {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: task, completed: false })
      })
      const data = await response.json()
      setTasks(tasks => [ data, ...tasks])
      setTask("")
    }
  }

  const toggleTask = async (task) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: { completed: !task.completed }
    })
    setTasks(tasks => tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t ))
  }

  const deleteTask = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE"
    })
    setTasks(tasks => tasks.filter(t => t.id !== id))
  }

  return (
    <div className="wrapper">
      <div className="list" data-testid="todo">
        <h3>Por hacer:</h3>
        <input type="text" onKeyPress={createTask} onChange={updateTask} value={task} placeholder="Ingresa una tarea y oprime Enter"></input>
        <ul className="todo">
          { tasks.filter(task => !task.completed).map(task => <Task key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />)}
        </ul>
      </div>

      <div className="list" data-testid="done">
        <h3>Hecho:</h3>
        <ul className="done">
        { tasks.filter(task => task.completed).map(task => <Task key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />)}
        </ul>
      </div>
    </div>
  );
}

export default App;
